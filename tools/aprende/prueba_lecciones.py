# Recorre en el navegador cada lección con contenido: demostración completa, pregunta de
# «Comprende» y las tres tareas (Practica conmigo, Hazlo tú y Comprueba) resueltas como lo
# haría un alumno. Comprueba que cada tarea se dé por resuelta, que la lección quede
# completada y que no haya errores de JavaScript.
# Uso: python3 -m http.server 8765 (en la raíz) y luego
#      python3 tools/aprende/prueba_lecciones.py [ID ...]
import sys, time
from playwright.sync_api import sync_playwright
URL='http://localhost:8765/index3.html'
pedidas=[a.upper() for a in sys.argv[1:]]
fallos=[]
def ok(c,m):
    if not c: fallos.append(m); print('  ✗ '+m)
with sync_playwright() as p:
    b=p.chromium.launch()
    c=b.new_context(viewport={'width':390,'height':844})
    c.add_init_script("try{localStorage.setItem('pc_tutorial_visto_v1','1');localStorage.setItem('aa_tour_visto_v1','1')}catch(e){}")
    c.route('https://www.gstatic.com/**', lambda r: r.abort())
    pg=c.new_page(); errs=[]
    pg.on('pageerror',lambda e:errs.append(str(e)))
    pg.goto(URL); pg.wait_for_function("!!window.AAApp",timeout=15000)
    ids=pg.evaluate("Object.keys(window.AA_LECCIONES).sort()")
    if pedidas: ids=[i for i in ids if i in pedidas]
    for lid in ids:
        n0=len(errs)
        pg.evaluate("id=>AAApp.abrirLeccion(id,{etapa:'observa'})",lid); time.sleep(0.3)
        pasos=pg.evaluate("AAApp.estado.demo?AAApp.estado.demo.length:0")
        for _ in range(pasos):
            pg.evaluate("document.getElementById('aa-paso-sig').disabled||document.getElementById('aa-paso-sig').click()"); time.sleep(0.12)
        pg.evaluate("id=>AAApp.abrirLeccion(id,{etapa:'comprende'})",lid); time.sleep(0.2)
        if pg.evaluate("id=>!!AA_LECCIONES[id].comprende.pregunta",lid):
            i=pg.evaluate("id=>AA_LECCIONES[id].comprende.pregunta.correcta",lid)
            pg.click('#aa-opciones .aa-opcion[data-i="%d"]'%i)
        for etapa in ['practica','hazlo','comprueba']:
            pg.evaluate("([id,e])=>AAApp.abrirLeccion(id,{etapa:e})",[lid,etapa]); time.sleep(0.35)
            t=pg.evaluate("([id,e])=>AA_LECCIONES[id][e]",[lid,etapa])
            tipo=t.get('tipo','jugada')
            if tipo=='pregunta':
                pg.click('#aa-opciones .aa-opcion[data-i="%d"]'%t['correcta'])
            elif tipo=='casilla':
                pg.evaluate("try{window.pcMascota&&pcMascota.quitar()}catch(e){}")
                for s in t['casillas']: pg.click('#board .sq[data-sq="%s"]'%s); time.sleep(0.1)
            else:
                linea=t['linea']
                for k in range(0,len(linea),2):
                    u=linea[k]
                    pg.wait_for_function("k=>state.step===k&&!state.freemode",arg=k,timeout=6000)
                    pg.evaluate("u=>tryMove(u.slice(0,2),u.slice(2,4))",u)
                    time.sleep(0.15)
            res=False
            for _ in range(40):
                if pg.evaluate("AAApp.estado.resuelta===true"): res=True; break
                time.sleep(0.15)
            ok(res,lid+' '+etapa+': la tarea no se dio por resuelta')
        ok(pg.evaluate("id=>JSON.parse(localStorage.aa_progreso_v1).lecciones[id].estado",lid)=='completada',lid+': la lección no quedó completada')
        ok(len(errs)==n0,lid+': errores JS '+' | '.join(errs[n0:n0+2]))
        print(('✓ ' if not any(f.startswith(lid) for f in fallos) else '✗ ')+lid)
    b.close()
print('\nLecciones recorridas: %d · %s'%(len(ids),'TODO CORRECTO' if not fallos else 'FALLOS: %d'%len(fallos)))
