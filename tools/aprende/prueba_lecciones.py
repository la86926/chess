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
def etapa_nav(pg,e):
    # toca en la columna el número de ese paso (uno por paso)
    i=pg.evaluate("e=>AAApp.pasos().findIndex(p=>p.etapa===e)",e)
    sel='#aa-etapas [data-paso="%d"]'%i
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
        tareas=[k for k in ['practica','hazlo','comprueba'] if L.get(k)]
        ok(len(tareas)>0,lid+': no tiene ejercicios')
        ok(not (L['comprende'].get('pregunta')) and all((L[k].get('tipo') or 'jugada')!='pregunta' for k in tareas),lid+': todavía tiene preguntas de opción múltiple')
        pg.evaluate("id=>AAApp.abrirLeccion(id,{etapa:'descubre'})",lid); time.sleep(0.3)
        ok(pg.evaluate("AAApp.estado.auto")==True,lid+': la lección no empezó reproduciéndose sola')
        ok(pg.evaluate("document.getElementById('aa-continuar').hidden&&document.getElementById('aa-otra-vez').hidden"),lid+': siguen visibles «Continuar» o «Explícame otra vez»')
        ok(deshabilitado(pg,'#aa-atras') and not deshabilitado(pg,'#aa-adelante'),lid+': en el número 1 «‹» debe estar apagado y «›» encendido')
        ok(pg.evaluate("[document.getElementById('b-hint').disabled,document.getElementById('b-sol').disabled]")==[True,True],lid+': Pista y Solución deben estar apagadas en la exploración')
        npasos=pg.evaluate("AAApp.pasos().length")
        ok(npasos==2+len(L['observa'])+len(tareas),lid+': hay %d números y se esperaban %d'%(npasos,2+len(L['observa'])+len(tareas)))
        ok(pg.evaluate("[...document.querySelectorAll('#aa-etapas .aa-etapa')].map(b=>b.textContent).join(',')")==','.join(str(i+1) for i in range(npasos)),lid+': los números de los pasos no son 1, 2, 3…')
        ok(pg.evaluate("document.querySelectorAll('#aa-etapas .aa-etapa span').length")==0,lid+': los pasos todavía muestran nombres')
        if primera:
            # reproducción automática: Teoría -> demostración -> resumen -> primer ejercicio, sin tocar nada
            ok(esperar(pg,"AAApp.estado.etapa==='observa'",14),lid+': la Teoría no pasó sola a la demostración')
            ok(esperar(pg,"AAApp.estado.etapa==='observa'&&AAApp.estado.paso>=1",14),lid+': la demostración no avanzó sola')
            ok(esperar(pg,"AAApp.estado.etapa==='comprende'",60),lid+': la demostración no terminó sola en el resumen')
            ok(esperar(pg,"e=>AAApp.estado.etapa===e",20,tareas[0]),lid+': el resumen no pasó solo al primer ejercicio')
            pausar(pg)
        else:
            pausar(pg)
            ok(pg.evaluate("document.getElementById('aa-pausa-txt').textContent")=='Reproducir',lid+': el botón no cambió a «Reproducir»')
            for k in range(len(L['observa'])):                   # «›»: un número por cada paso de la demostración
                adelante(pg)
                ok(pg.evaluate("AAApp.estado.etapa")=='observa' and pg.evaluate("AAApp.estado.paso")==k,lid+': «›» no llevó al paso %d de la demostración'%(k+1))
                ok(pg.evaluate("AAApp.paso()")==k+1 and pg.evaluate("document.querySelector('#aa-etapas .activa').dataset.paso")==str(k+1),lid+': el número activo no corresponde al paso')
                if k==0: ok(not deshabilitado(pg,'#aa-atras'),lid+': «‹» debe estar encendido desde el número 2')
            adelante(pg); ok(pg.evaluate("AAApp.estado.etapa")=='comprende',lid+': «›» no llevó al resumen')
            ok(pg.evaluate("document.getElementById('aa-opciones').hidden"),lid+': el resumen muestra opciones de respuesta')
            adelante(pg)
        ok(pg.evaluate("AAApp.estado.etapa")==tareas[0],lid+': no llegó al primer ejercicio')
        atras(pg)                                                 # desvío: «‹» vuelve al número anterior (el resumen)
        ok(pg.evaluate("AAApp.estado.etapa")=='comprende',lid+': «‹» no volvió al resumen')
        etapa_nav(pg,tareas[0])
        for n,etapa in enumerate(tareas):
            ok(pg.evaluate("AAApp.estado.etapa")==etapa,'%s: se esperaba la etapa %s y está en %s'%(lid,etapa,pg.evaluate("AAApp.estado.etapa")))
            if etapa!=pg.evaluate("AAApp.estado.etapa"): etapa_nav(pg,etapa)
            if n>0:
                atras(pg); ok(pg.evaluate("AAApp.estado.etapa")==tareas[n-1],lid+': «‹» no volvió al ejercicio anterior')
                adelante(pg)                                      # desvío a mitad de los ejercicios
            ok(pg.evaluate("document.getElementById('aa-continuar').hidden"),'%s %s: el botón negro aparece antes de terminar'%(lid,etapa))
            ultima=n==len(tareas)-1
            ok(pg.evaluate("[document.getElementById('b-hint').disabled,document.getElementById('b-sol').disabled]")==[False,False],'%s %s: Pista y Solución deben estar encendidas en el ejercicio'%(lid,etapa))
            if primera and n==0: boton(pg,'#aa-pausa')        # vuelve a reproducir
            resolver(pg,lid,etapa,L[etapa])
            if primera and n==0 and not ultima:
                ok(esperar(pg,"e=>AAApp.estado.etapa===e",12,tareas[1]),lid+': tras resolver, la lección no avanzó sola')
                pausar(pg)
            elif not ultima: adelante(pg)
        ok(deshabilitado(pg,'#aa-adelante'),lid+': en el último ejercicio «›» debe estar apagado')
        ok(pg.evaluate("(()=>{const b=document.getElementById('aa-continuar');return !b.hidden&&b.textContent.trim()==='Siguiente lección'&&b.classList.contains('principal')})()"),lid+': al terminar no apareció «Siguiente lección»')
        primera=False
        ok(pg.evaluate("id=>JSON.parse(localStorage.aa_progreso_v1).lecciones[id].estado",lid)=='completada',lid+': la lección no quedó completada')
        ok(pg.evaluate("document.querySelectorAll('#aa-etapas .aa-etapa.hecha').length")==npasos,lid+': no todos los números quedaron en verde al terminar')
        ok(pg.evaluate("[document.getElementById('b-hint').disabled,document.getElementById('b-sol').disabled]")==[True,True],lid+': Pista y Solución deben apagarse al terminar')
        ok(len(errs)==n0,lid+': errores JS '+' | '.join(errs[n0:n0+2]))
        print(('✓ ' if not any(f.startswith(lid) for f in fallos) else '✗ ')+lid)
    b.close()
print('\nLecciones recorridas: %d · %s'%(len(ids),'TODO CORRECTO' if not fallos else 'FALLOS: %d'%len(fallos)))
