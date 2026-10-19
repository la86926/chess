# Prueba: «Ocultar/Mostrar» empieza oculto y es de cada dispositivo: no viaja con el ID (Firestore simulado).
# Requiere: python3 -m http.server 8765 en la raíz del repositorio.
import subprocess, sys, time, pathlib, json
from playwright.sync_api import sync_playwright
AQUI=pathlib.Path(__file__).parent
srv=subprocess.Popen([sys.executable,str(AQUI/'servidor_mock.py')]); time.sleep(0.6)
MOCK={'firebase-app.js':'mock-app.js','firebase-auth.js':'mock-auth.js','firebase-firestore.js':'mock-firestore.js'}
URL='http://localhost:8765/index.html'
CODIGO='PruebaBarra01'
fallos=[]
def ok(c,m):
    print(('  ✓ ' if c else '  ✗ ')+m)
    if not c: fallos.append(m)
def preparar(ctx,init=''):
    for k,v in MOCK.items():
        ctx.route('https://www.gstatic.com/firebasejs/12.18.0/'+k, lambda r,req,v=v: r.fulfill(path=str(AQUI/v), content_type='application/javascript'))
    if init: ctx.add_init_script(init)
def esperar(cond,seg=10):
    t=time.time()
    while time.time()-t<seg:
        try:
            if cond(): return True
        except Exception: pass
        time.sleep(0.25)
    return False
def entrar(pg,nuevo):
    pg.goto(URL); pg.wait_for_function("!!window.PCSync",timeout=8000)
    pg.click('#menu-button'); pg.click('.app-choice[data-app="id"]')
    pg.fill('#mi-id-input',CODIGO); pg.click('.mi-id-form [data-modo="%s"]'%('crear' if nuevo else 'entrar'))
    pg.wait_for_function("window.PCSync.estado==='ok'&&!!window.PCSync.id",timeout=8000)
def elegir(pg,n):
    pg.click('#menu-button'); pg.click('.app-choice[data-app="%s"]'%n)
def marco(pg,nombre):
    fs=[f for f in pg.frames if nombre in f.url]
    return fs[0] if fs else None
def cara_boton(pg,nombre):
    return marco(pg,nombre).evaluate("(document.querySelector('.pcm-boton img')||{}).getAttribute?document.querySelector('.pcm-boton img').getAttribute('src'):''")
def elegir_mascota(pg,nombre,id):
    f=marco(pg,nombre)
    f.wait_for_selector('.pcm-boton',timeout=8000)
    f.click('.pcm-boton'); f.wait_for_selector('.pcm-gal-it[data-id="%s"]'%id,timeout=5000)
    f.click('.pcm-gal-it[data-id="%s"]'%id)
VISTO="try{localStorage.setItem('pc_tutorial_visto_v1','1');localStorage.setItem('aa_tour_visto_v1','1')}catch(e){}"
def texto_boton(pg,nombre):
    return marco(pg,nombre).evaluate("document.getElementById('b-banner').textContent")
try:
  with sync_playwright() as p:
    b=p.chromium.launch(); errs=[]
    A=b.new_context(viewport={'width':1280,'height':860}); preparar(A,VISTO); pa=A.new_page(); pa.on('pageerror',lambda e:errs.append('A '+str(e)))
    B=b.new_context(viewport={'width':390,'height':844}); preparar(B,VISTO); pb=B.new_page(); pb.on('pageerror',lambda e:errs.append('B '+str(e)))
    pa.on('dialog',lambda d:d.accept()); pb.on('dialog',lambda d:d.accept())
    entrar(pa,True); elegir(pa,'1'); time.sleep(1.5)
    entrar(pb,False); elegir(pb,'1'); time.sleep(1.5)
    print('1. Por defecto la barra de arriba está oculta («Mostrar» listo)')
    ok(esperar(lambda: texto_boton(pa,'index1')=='Mostrar'),'PC1 en A empieza con «Mostrar»')
    ok(esperar(lambda: texto_boton(pb,'index1')=='Mostrar'),'PC1 en B empieza con «Mostrar»')
    print('2. Mostrar en A no cambia B')
    marco(pa,'index1').click('#b-banner'); time.sleep(4)
    ok(texto_boton(pa,'index1')=='Ocultar','A muestra la barra')
    ok(texto_boton(pb,'index1')=='Mostrar','B sigue con la barra oculta')
    doc=json.loads(pa.evaluate("fetch('http://127.0.0.1:8799/doc/pruebabarra01').then(r=>r.text())"))
    ok('wp_banner' not in json.dumps(doc) and 'aa_banner' not in json.dumps(doc),'la elección no se guarda en la nube')
    print('3. Aprende Ajedrez también empieza oculto y es de cada dispositivo')
    elegir(pb,'3'); ok(esperar(lambda: marco(pb,'index3') is not None and marco(pb,'index3').evaluate("!!(window.AAApp&&AAApp.listo)")),'B abre Aprende Ajedrez')
    ok(esperar(lambda: texto_boton(pb,'index3')=='Mostrar'),'Aprende en B empieza con «Mostrar»')
    print('4. Al recargar A conserva su elección')
    pa.goto(URL); time.sleep(3)
    ok(esperar(lambda: marco(pa,'index1') is not None and texto_boton(pa,'index1')=='Ocultar'),'A sigue con la barra visible tras recargar')
    ok(not errs,'sin errores de JavaScript '+' | '.join(errs[:3]))
    b.close()
finally:
    srv.terminate()
print('\nRESULTADO:',('TODO CORRECTO' if not fallos else 'FALLOS: %d'%len(fallos)))
sys.exit(1 if fallos else 0)
