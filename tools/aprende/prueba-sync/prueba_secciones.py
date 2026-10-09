# Prueba: sección inicial (nuevo / con avance / guardada) y sincronización de la sección
# y de la lección abierta entre dos "dispositivos" con el mismo código (Firestore simulado).
# Requiere: python3 -m http.server 8765 en la raíz del repositorio.
import json, subprocess, sys, time, pathlib
from playwright.sync_api import sync_playwright
AQUI=pathlib.Path(__file__).parent
srv=subprocess.Popen([sys.executable,str(AQUI/'servidor_mock.py')]); time.sleep(0.6)
MOCK={'firebase-app.js':'mock-app.js','firebase-auth.js':'mock-auth.js','firebase-firestore.js':'mock-firestore.js'}
URL='http://localhost:8765/index.html'
CODIGO='PruebaSecc01'
fallos=[]
def ok(c,m):
    print(('  ✓ ' if c else '  ✗ ')+m)
    if not c: fallos.append(m)
def preparar(ctx,init=''):
    for k,v in MOCK.items():
        ctx.route('https://www.gstatic.com/firebasejs/12.18.0/'+k, lambda r,req,v=v: r.fulfill(path=str(AQUI/v), content_type='application/javascript'))
    if init: ctx.add_init_script(init)
def activa(pg):
    return pg.evaluate("(document.querySelector('.app-frame.active')||{}).id||''")
def esperar(cond,seg=10):
    t=time.time()
    while time.time()-t<seg:
        try:
            if cond(): return True
        except Exception: pass
        time.sleep(0.25)
    return False
def cerrar_modal_codigo(pg):
    # Con «Mi ID» ya no aparece ninguna ventana al entrar: el ID es opcional.
    pass
def entrar(pg,nuevo):
    # «Mi ID» (menú): Crear la primera vez, Entrar en el otro dispositivo
    pg.goto(URL); pg.wait_for_function("!!window.PCSync",timeout=8000)
    pg.click('#menu-button'); pg.click('.app-choice[data-app="id"]')
    pg.fill('#mi-id-input',CODIGO); pg.click('.mi-id-form [data-modo="%s"]'%('crear' if nuevo else 'entrar'))
    pg.wait_for_function("window.PCSync.estado==='ok'&&!!window.PCSync.id",timeout=8000)
def elegir(pg,n):
    pg.click('#menu-button'); pg.click('.app-choice[data-app="%s"]'%n)
def frame3(pg):
    fs=[f for f in pg.frames if 'index3.html' in f.url]
    return fs[0] if fs else None
VISTO="try{localStorage.setItem('pc_tutorial_visto_v1','1');localStorage.setItem('aa_tour_visto_v1','1')}catch(e){}"
try:
  with sync_playwright() as p:
    b=p.chromium.launch(); errs=[]
    print('1. Persona nueva: abre Aprende Ajedrez y ve un solo tutorial')
    N=b.new_context(viewport={'width':390,'height':844}); preparar(N); pn=N.new_page(); pn.on('pageerror',lambda e:errs.append('N '+str(e)))
    pn.goto(URL); time.sleep(1.5)
    ok(activa(pn)=='app-frame-3','la sección abierta es Aprende Ajedrez')
    orden=pn.evaluate("[...document.querySelectorAll('.app-choice')].map(b=>b.textContent.trim())")
    ok(orden[0].startswith('Mi ID') and orden[1].startswith('Aprende Ajedrez') and orden[2].startswith('Método PC1 (Avanzado)') and orden[3].startswith('Método PC2 (Muy avanzado)'),'orden del menú: '+' | '.join(orden))
    cerrar_modal_codigo(pn)
    ok(esperar(lambda: pn.evaluate("document.getElementById('tuto').classList.contains('open')"),12),'aparece el tutorial de bienvenida')
    ok(pn.evaluate("document.getElementById('tuto-titulo')?document.getElementById('tuto-titulo').textContent:document.querySelector('#tuto h3,#tuto h2').textContent").startswith('Bienvenido a Aprende'),'el tutorial es el de Aprende Ajedrez')
    f3=frame3(pn)
    ok(f3 is not None and not f3.evaluate("!!document.querySelector('.aa-tour.open')"),'el recorrido propio de la sección no se abre encima')
    ok(frame3(pn).evaluate("document.getElementById('v-levels').classList.contains('active')"),'la persona nueva empieza en el Temario')
    pn.evaluate("PCTutorial.cerrar()"); time.sleep(3)
    ok(not frame3(pn).evaluate("!!document.querySelector('.aa-tour.open')"),'en el Temario no aparece un segundo tutorial')
    frame3(pn).evaluate("document.querySelector('#aa-niveles [data-leccion=\"N1-001\"]').click()")
    ok(esperar(lambda: frame3(pn).evaluate("!!document.querySelector('.aa-tour.open')"),8),'al abrir su primera lección aparece el recorrido de la lección')
    N.close()

    print('2. Quien ya tenía avance (sin sección guardada) sigue entrando al Método PC1')
    E=b.new_context(); preparar(E,VISTO+"try{if(!localStorage.getItem('__x')){localStorage.setItem('__x','1');localStorage.setItem('wp_solved','[1,2,3]')}}catch(e){}"); pe=E.new_page()
    pe.goto(URL); time.sleep(1.5); ok(activa(pe)=='app-frame-1','abre el Método PC1'); E.close()

    print('3. Con una sección guardada, abre esa')
    G=b.new_context(); preparar(G,VISTO+"try{if(!localStorage.getItem('__x')){localStorage.setItem('__x','1');localStorage.setItem('pc_l3_active_app','2')}}catch(e){}"); pg=G.new_page()
    pg.goto(URL); time.sleep(1.5); ok(activa(pg)=='app-frame-2','abre el Método PC2'); G.close()

    print('4. Mismo código en dos dispositivos: la sección y la lección se siguen')
    A=b.new_context(); preparar(A,VISTO); pa=A.new_page(); pa.on('pageerror',lambda e:errs.append('A '+str(e)))
    B=b.new_context(); preparar(B,VISTO); pb=B.new_page(); pb.on('pageerror',lambda e:errs.append('B '+str(e)))
    entrar(pa,True); elegir(pa,'2'); time.sleep(1.5)
    entrar(pb,False)
    ok(esperar(lambda: activa(pb)=='app-frame-2'),'B entra con el código y queda en el Método PC2 (donde estaba A)')
    if activa(pb)!='app-frame-2':
        doc=json.loads(pa.evaluate("fetch('http://127.0.0.1:8799/doc/pruebasecc01').then(r=>r.text())"))
        print('    depuración: B en',activa(pb),'| B guarda',pb.evaluate("localStorage.getItem('pc_l3_active_app')"),'| A guarda',pa.evaluate("localStorage.getItem('pc_l3_active_app')"),'| nube',(doc.get('data') or {}).get('l1',{}).get('storage',{}).get('pc_l3_active_app'))
    elegir(pa,'3')
    ok(esperar(lambda: frame3(pa) is not None and frame3(pa).evaluate("!!window.AAApp")),'A abre Aprende Ajedrez')
    frame3(pa).evaluate("AAApp.abrirLeccion('N2-010',{etapa:'practica'})"); time.sleep(0.4)
    frame3(pa).evaluate("document.dispatchEvent(new PointerEvent('pointerup'))")
    ok(esperar(lambda: activa(pb)=='app-frame-3'),'B pasa solo a Aprende Ajedrez')
    ok(esperar(lambda: frame3(pb) is not None and frame3(pb).evaluate("window.AAApp&&AAApp.estado.id")=='N2-010',12),'B abre la misma lección (N2-010)')
    ok(esperar(lambda: frame3(pb).evaluate("AAApp.estado.etapa")=='practica'),'B queda en la misma etapa (Práctica)')
    if frame3(pb) and frame3(pb).evaluate("AAApp.estado.id")!='N2-010':
        print('    depuración: B id',frame3(pb).evaluate("AAApp.estado.id+' '+AAApp.estado.etapa"),'| B ultimo',pb.evaluate("localStorage.getItem('aa_ultimo_v1')"),'| A ultimo',pa.evaluate("localStorage.getItem('aa_ultimo_v1')"))
    print('5. Con la sincronización activa, las etapas elegidas no «se corren» y no se salta de pestaña')
    fa,fb=frame3(pa),frame3(pb)
    fa.evaluate("AAApp.estado.auto&&document.getElementById('aa-pausa').click()")   # sin reproducción automática: se prueba la elección manual
    tocar_paso="e=>document.querySelector('#aa-etapas [data-paso=\"'+AAApp.pasos().findIndex(p=>p.etapa===e)+'\"]').click()"
    for e in ['descubre','comprueba','descubre','practica']:
        fa.evaluate(tocar_paso,e); time.sleep(3)
        ok(fa.evaluate("AAApp.estado.etapa")==e,'A sigue en el paso que eligió (%s)'%e)
    ok(esperar(lambda: fb.evaluate("AAApp.estado.etapa")=='practica',8),'B sigue a A hasta la última etapa elegida')
    fa.evaluate("document.querySelector('#tabs .tab[data-v=\"levels\"]').click()"); time.sleep(.5)
    fb.evaluate(tocar_paso,'comprueba'); time.sleep(3.5)
    ok(fa.evaluate("document.getElementById('v-levels').classList.contains('active')"),'A, mirando el Temario, no es devuelta a la lección cuando B avanza')
    fb.evaluate("window.scrollTo(0,document.body.scrollHeight)"); y=fb.evaluate("scrollY")
    fa.evaluate("AADatos.fijarCarpetasDeLeccion('N2-010',['nivel-2'])"); time.sleep(3.5)
    ok(abs(fb.evaluate("scrollY")-y)<2,'en B la página no salta hacia arriba cuando llegan cambios (%s → %s)'%(y,fb.evaluate("scrollY")))
    elegir(pb,'1')
    ok(esperar(lambda: activa(pa)=='app-frame-1'),'si B vuelve al Método PC1, A también')
    ok(not errs,'sin errores de JavaScript '+(' | '.join(errs[:3]) if errs else ''))
    b.close()
finally:
    srv.terminate()
print('\nRESULTADO: '+('TODO CORRECTO' if not fallos else 'FALLOS: '+str(len(fallos))))
