# Recorre en el navegador cada lección con contenido COMO LO HARÍA UN ALUMNO:
# toca los botones (Continuar, pasos de la demostración, etapas), responde tocando las
# opciones, mueve las piezas tocando la casilla de origen y la de destino, y usa
# «Explícame otra vez» a mitad de la lección (en Comprende y en Hazlo tú) para comprobar
# que después todo sigue respondiendo.
# Uso: python3 -m http.server 8765 (en la raíz) y luego
#      python3 tools/aprende/prueba_lecciones.py [ID ...]
import sys, time
from playwright.sync_api import sync_playwright
URL='http://localhost:8765/index3.html'
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
def continuar(pg):
    pg.locator('#aa-continuar').scroll_into_view_if_needed(); pg.click('#aa-continuar'); time.sleep(0.35)
GRUPO={'descubre':'teoria','observa':'teoria','comprende':'resolver','practica':'resolver','hazlo':'practica','comprueba':'reforzar','repasa':'repaso'}
def etapa_nav(pg,e):
    sel='#aa-etapas [data-grupo="%s"]'%GRUPO[e]
    pg.locator(sel).scroll_into_view_if_needed(); pg.click(sel); time.sleep(0.35)
def otra_vez(pg):
    pg.locator('#aa-otra-vez').scroll_into_view_if_needed(); pg.click('#aa-otra-vez'); time.sleep(0.6)
def opcion(pg,i):
    pg.locator('#aa-opciones .aa-opcion[data-i="%d"]'%i).scroll_into_view_if_needed()
    pg.click('#aa-opciones .aa-opcion[data-i="%d"]'%i); time.sleep(0.25)
def resolver(pg,lid,etapa,t):
    tipo=t.get('tipo','jugada')
    if tipo=='pregunta':
        malas=[i for i in range(len(t['opciones'])) if i!=t['correcta']]
        if malas: opcion(pg,malas[0])
        opcion(pg,t['correcta'])
    elif tipo=='casilla':
        for s in t['casillas']: tocar(pg,s); time.sleep(0.1)
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
    for lid in ids:
        n0=len(errs); L=pg.evaluate("id=>AA_LECCIONES[id]",lid)
        pg.evaluate("id=>AAApp.abrirLeccion(id,{etapa:'descubre'})",lid); time.sleep(0.3)
        continuar(pg)                                            # Descubre -> Observa
        ok(pg.evaluate("AAApp.estado.etapa")=='observa',lid+': Continuar no llevó a Observa')
        for _ in range(len(L['observa'])+1):
            if pg.evaluate("document.getElementById('aa-paso-sig').disabled"): break
            pg.click('#aa-paso-sig'); time.sleep(0.1)
        continuar(pg)                                            # Observa -> Comprende
        ok(pg.evaluate("AAApp.estado.etapa")=='comprende',lid+': no llegó a Comprende')
        q=L['comprende'].get('pregunta')
        if q:
            otra_vez(pg)                                         # desvío: «Explícame otra vez»
            ok(pg.evaluate("AAApp.estado.etapa")=='observa',lid+': «Explícame otra vez» no volvió a la demostración')
            etapa_nav(pg,'comprende')
            malas=[i for i in range(len(q['opciones'])) if i!=q['correcta']]
            if malas: opcion(pg,malas[0])
            opcion(pg,q['correcta'])
            ok(esperar(pg,"document.querySelector('#aa-opciones .aa-opcion.bien')!==null",3),lid+': comprende: la opción correcta no respondió tras «Explícame otra vez»')
        continuar(pg)                                            # Comprende -> Practica
        for etapa in ['practica','hazlo','comprueba']:
            ok(pg.evaluate("AAApp.estado.etapa")==etapa,'%s: se esperaba la etapa %s y está en %s'%(lid,etapa,pg.evaluate("AAApp.estado.etapa")))
            if etapa!=pg.evaluate("AAApp.estado.etapa"): etapa_nav(pg,etapa)
            if etapa=='hazlo':
                otra_vez(pg); etapa_nav(pg,'hazlo')              # desvío a mitad de los ejercicios
            resolver(pg,lid,etapa,L[etapa])
            if etapa!='comprueba': continuar(pg)
        ok(pg.evaluate("id=>JSON.parse(localStorage.aa_progreso_v1).lecciones[id].estado",lid)=='completada',lid+': la lección no quedó completada')
        continuar(pg)                                            # Reforzar -> Repaso
        ok(pg.evaluate("AAApp.estado.etapa")=='repasa' and pg.evaluate("document.querySelector('#aa-etapas .activa').dataset.grupo")=='repaso',lid+': Continuar no llevó a Repaso')
        ok(pg.evaluate("[...document.querySelectorAll('#aa-etapas .aa-etapa i')].map(i=>i.textContent).join('')")=='12345',lid+': los números de las etapas no se ven siempre')
        ok(len(errs)==n0,lid+': errores JS '+' | '.join(errs[n0:n0+2]))
        print(('✓ ' if not any(f.startswith(lid) for f in fallos) else '✗ ')+lid)
    b.close()
print('\nLecciones recorridas: %d · %s'%(len(ids),'TODO CORRECTO' if not fallos else 'FALLOS: %d'%len(fallos)))
