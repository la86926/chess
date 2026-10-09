# Recorre en el navegador cada lección con contenido COMO LO HARÍA UN ALUMNO:
# usa los controles del tutor (‹ · Pausar · ›) y las etapas, responde tocando las opciones,
# mueve las piezas tocando la casilla de origen y la de destino, y vuelve atrás con ‹ a mitad
# de la lección para comprobar que después todo sigue respondiendo.
# En la primera lección deja la reproducción automática encendida y comprueba que avanza sola.
# Uso: python3 -m http.server 8765 (en la raíz) y luego
#      python3 tools/aprende/prueba_lecciones.py [ID ...]
import sys, time
from playwright.sync_api import sync_playwright
URL='http://127.0.0.1:8765/index3.html'
pedidas=[a.upper() for a in sys.argv[1:]]
fallos=[]
def ok(c,m):
    if not c: fallos.append(m); print('  ✗ '+m)
    return c
def esperar(pg,expr,seg=6,arg=None):
    t=time.time()
    while time.time()-t<seg:
        try:
            if pg.evaluate(expr,arg): return True
        except Exception: pass
        time.sleep(0.1)
    return False
def sin_mascota(pg):
    pg.evaluate("try{window.pcMascota&&pcMascota.quitar()}catch(e){}")
def tocar(pg,sq):
    sin_mascota(pg)
    loc=pg.locator('#board .sq[data-sq="%s"]'%sq); loc.scroll_into_view_if_needed()
    bb=loc.bounding_box(); pg.mouse.click(bb['x']+bb['width']/2, bb['y']+bb['height']/2)
def boton(pg,sel):
    pg.locator(sel).scroll_into_view_if_needed(); pg.click(sel); time.sleep(0.35)
def adelante(pg): boton(pg,'#aa-adelante')
def atras(pg): boton(pg,'#aa-atras')
def pausar(pg):
    if pg.evaluate("AAApp.estado.auto"): boton(pg,'#aa-pausa')
def deshabilitado(pg,sel): return pg.evaluate("s=>document.querySelector(s).disabled",sel)
GRUPO={'descubre':'teoria','observa':'teoria','comprende':'preguntas','practica':'preguntas','hazlo':'practica','comprueba':'repaso'}
def etapa_nav(pg,e):
    sel='#aa-etapas [data-grupo="%s"]'%GRUPO[e]
    pg.locator(sel).scroll_into_view_if_needed(); pg.click(sel); time.sleep(0.35)
def opcion(pg,i):
    pg.locator('#aa-opciones .aa-opcion[data-i="%d"]'%i).scroll_into_view_if_needed()
    pg.click('#aa-opciones .aa-opcion[data-i="%d"]'%i); time.sleep(0.25)
def resolver(pg,lid,etapa,t):
    tipo=t.get('tipo','jugada')
    if tipo=='pregunta':
        malas=[i for i in range(len(t['opciones'])) if i!=t['correcta']]
        if malas:
            opcion(pg,malas[0])
            ok(pg.evaluate("document.querySelector('#aa-dice .aa-consigna')!==null"),'%s %s: tras una respuesta equivocada se perdió la pregunta'%(lid,etapa))
        opcion(pg,t['correcta'])
    elif tipo=='casilla':
        for k,s in enumerate(t['casillas']):
            tocar(pg,s); time.sleep(0.1)
            if k<len(t['casillas'])-1:
                ok(pg.evaluate("document.querySelector('#aa-dice .aa-consigna')!==null"),'%s %s: tras una casilla correcta se perdió la consigna'%(lid,etapa))
    else:
        linea=t['linea']
        for k in range(0,len(linea),2):
            if not ok(esperar(pg,"k=>state.step===k&&!state.freemode&&!state.busy",8,k),'%s %s: el rival no respondió (paso %d)'%(lid,etapa,k)): return
            u=linea[k]; tocar(pg,u[:2]); time.sleep(0.15); tocar(pg,u[2:4]); time.sleep(0.2)
            if pg.evaluate("(()=>{const m=document.getElementById('promo-modal');return !!(m&&m.classList.contains('open'))})()"):
                pg.click('#promo-modal button'); time.sleep(0.2)
    ok(esperar(pg,"AAApp.estado.resuelta===true",6),'%s %s: tocando el tablero/opciones, la tarea no se resolvió'%(lid,etapa))
with sync_playwright() as p:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':390,'height':844},has_touch=True)
    c.add_init_script("try{localStorage.setItem('pc_tutorial_visto_v1','1');localStorage.setItem('aa_tour_visto_v1','1')}catch(e){}")
    c.route('https://www.gstatic.com/**', lambda r: r.abort())
    pg=c.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(URL); pg.wait_for_function("!!window.AAApp",timeout=15000)
    ids=pg.evaluate("Object.keys(window.AA_LECCIONES).sort()")
    if pedidas: ids=[i for i in ids if i in pedidas]
    primera=True
    for lid in ids:
        n0=len(errs); L=pg.evaluate("id=>AA_LECCIONES[id]",lid)
        pg.evaluate("id=>AAApp.abrirLeccion(id,{etapa:'descubre'})",lid); time.sleep(0.3)
        ok(pg.evaluate("AAApp.estado.auto")==True,lid+': la lección no empezó reproduciéndose sola')
        ok(pg.evaluate("document.getElementById('aa-continuar').hidden&&document.getElementById('aa-otra-vez').hidden"),lid+': siguen visibles «Continuar» o «Explícame otra vez»')
        ok(deshabilitado(pg,'#aa-atras') and not deshabilitado(pg,'#aa-adelante'),lid+': en Teoría «‹» debe estar apagado y «›» encendido')
        if primera:
            # reproducción automática: Teoría -> demostración -> Preguntas sin tocar nada
            ok(esperar(pg,"AAApp.estado.etapa==='observa'",14),lid+': la Teoría no pasó sola a la demostración')
            ok(esperar(pg,"AAApp.estado.etapa==='observa'&&AAApp.estado.paso>=1",14),lid+': la demostración no avanzó sola')
            ok(esperar(pg,"AAApp.estado.etapa==='comprende'",60),lid+': la demostración no terminó sola en Preguntas')
        else:
            pausar(pg)
            ok(pg.evaluate("document.getElementById('aa-pausa-txt').textContent")=='Reproducir',lid+': el botón no cambió a «Reproducir»')
            adelante(pg)                                          # Descubre -> demostración
            ok(pg.evaluate("AAApp.estado.etapa")=='observa',lid+': «›» no llevó a la demostración')
            ok(deshabilitado(pg,'#aa-atras'),lid+': en la demostración (Teoría) «‹» debe estar apagado')
            adelante(pg)                                          # demostración -> Preguntas
        ok(pg.evaluate("AAApp.estado.etapa")=='comprende',lid+': no llegó a Comprende')
        if primera: pausar(pg)
        q=L['comprende'].get('pregunta')
        atras(pg)                                                 # desvío: «‹» vuelve a la Teoría
        ok(pg.evaluate("AAApp.estado.etapa")=='descubre',lid+': «‹» no volvió a la Teoría')
        etapa_nav(pg,'comprende')
        if q:
            malas=[i for i in range(len(q['opciones'])) if i!=q['correcta']]
            if malas: opcion(pg,malas[0])
            opcion(pg,q['correcta'])
            ok(esperar(pg,"document.querySelector('#aa-opciones .aa-opcion.bien')!==null",3),lid+': comprende: la opción correcta no respondió tras volver con «‹»')
        adelante(pg)                                              # Comprende -> Practica
        for etapa in ['practica','hazlo','comprueba']:
            ok(pg.evaluate("AAApp.estado.etapa")==etapa,'%s: se esperaba la etapa %s y está en %s'%(lid,etapa,pg.evaluate("AAApp.estado.etapa")))
            if etapa!=pg.evaluate("AAApp.estado.etapa"): etapa_nav(pg,etapa)
            if etapa=='hazlo':
                atras(pg); ok(pg.evaluate("AAApp.estado.etapa")=='practica',lid+': «‹» en Práctica no volvió a Preguntas')
                etapa_nav(pg,'hazlo')                             # desvío a mitad de los ejercicios
            ok(pg.evaluate("document.getElementById('aa-continuar').hidden"),'%s %s: el botón negro aparece antes de terminar el Repaso'%(lid,etapa))
            if primera and etapa=='practica': boton(pg,'#aa-pausa')   # vuelve a reproducir
            resolver(pg,lid,etapa,L[etapa])
            if primera and etapa=='practica':
                ok(esperar(pg,"AAApp.estado.etapa==='hazlo'",12),lid+': tras resolver, la lección no avanzó sola')
                pausar(pg)
            elif etapa!='comprueba': adelante(pg)
        ok(deshabilitado(pg,'#aa-adelante'),lid+': en Repaso «›» debe estar apagado')
        ok(pg.evaluate("(()=>{const b=document.getElementById('aa-continuar');return !b.hidden&&b.textContent.trim()==='Siguiente lección'&&b.classList.contains('principal')})()"),lid+': al terminar el Repaso no apareció «Siguiente lección»')
        primera=False
        ok(pg.evaluate("id=>JSON.parse(localStorage.aa_progreso_v1).lecciones[id].estado",lid)=='completada',lid+': la lección no quedó completada')
        ok(pg.evaluate("document.querySelector('#aa-etapas .activa').dataset.grupo")=='repaso',lid+': la última etapa no es Repaso')
        ok(pg.evaluate("[...document.querySelectorAll('#aa-etapas .aa-etapa i')].map(i=>i.textContent).join('')")=='1234',lid+': los números de las etapas no se ven siempre')
        ok(len(errs)==n0,lid+': errores JS '+' | '.join(errs[n0:n0+2]))
        print(('✓ ' if not any(f.startswith(lid) for f in fallos) else '✗ ')+lid)
    b.close()
print('\nLecciones recorridas: %d · %s'%(len(ids),'TODO CORRECTO' if not fallos else 'FALLOS: %d'%len(fallos)))
