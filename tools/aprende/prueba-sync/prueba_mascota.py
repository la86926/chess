# Prueba: la mascota elegida se sigue en tiempo real entre dos "dispositivos" con el mismo ID
# (Firestore simulado), en el Método PC1 y en Aprende Ajedrez, en ambos sentidos.
# Requiere: python3 -m http.server 8765 en la raíz del repositorio.
import subprocess, sys, time, pathlib
from playwright.sync_api import sync_playwright
AQUI=pathlib.Path(__file__).parent
srv=subprocess.Popen([sys.executable,str(AQUI/'servidor_mock.py')]); time.sleep(0.6)
MOCK={'firebase-app.js':'mock-app.js','firebase-auth.js':'mock-auth.js','firebase-firestore.js':'mock-firestore.js'}
URL='http://localhost:8765/index.html'
CODIGO='PruebaMasc01'
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
try:
  with sync_playwright() as p:
    b=p.chromium.launch(); errs=[]
    A=b.new_context(viewport={'width':1280,'height':860}); preparar(A,VISTO); pa=A.new_page(); pa.on('pageerror',lambda e:errs.append('A '+str(e)))
    B=b.new_context(viewport={'width':390,'height':844}); preparar(B,VISTO); pb=B.new_page(); pb.on('pageerror',lambda e:errs.append('B '+str(e)))
    entrar(pa,True); elegir(pa,'1'); time.sleep(1.5)
    entrar(pb,False); elegir(pb,'1'); time.sleep(1.5)
    print('1. A elige una mascota en el Método PC1: B la ve sin recargar')
    elegir_mascota(pa,'index1','gato')
    ok(esperar(lambda: pb.evaluate("localStorage.getItem('pc_mascota_elegida')")=='gato'),'B recibe la mascota elegida por A')
    ok(esperar(lambda: 'gato' in cara_boton(pb,'index1')),'el botón de la mascota de B cambia a la de A')
    print('2. B elige otra en Aprende Ajedrez: A la ve en el Método PC1 y en Aprende Ajedrez')
    elegir(pb,'3'); ok(esperar(lambda: marco(pb,'index3') is not None and marco(pb,'index3').evaluate("!!(window.AAApp&&AAApp.listo)")),'B abre Aprende Ajedrez')
    elegir_mascota(pb,'index3','panda')
    ok(esperar(lambda: pa.evaluate("localStorage.getItem('pc_mascota_elegida')")=='panda'),'A recibe la mascota elegida por B')
    ok(esperar(lambda: 'panda' in cara_boton(pa,'index1')),'el botón de la mascota de A cambia')
    elegir(pa,'3'); esperar(lambda: marco(pa,'index3') is not None and marco(pa,'index3').evaluate("!!(window.AAApp&&AAApp.listo)"))
    ok(esperar(lambda: 'panda' in (marco(pa,'index3').evaluate("(document.querySelector('#aa-tutor-cara img')||{}).src||''") or '')),'el tutor de Aprende Ajedrez en A es la misma mascota')
    print('3. Recargar B conserva la mascota')
    pb.goto(URL); pb.wait_for_function("!!window.PCSync&&window.PCSync.estado==='ok'",timeout=8000)
    ok(pb.evaluate("localStorage.getItem('pc_mascota_elegida')")=='panda','B sigue con la misma mascota tras recargar')
    ok(not errs,'sin errores de JavaScript '+' | '.join(errs[:3]))
    b.close()
finally:
    srv.terminate()
print('\nRESULTADO:',('TODO CORRECTO' if not fallos else 'FALLOS: %d'%len(fallos)))
sys.exit(1 if fallos else 0)
