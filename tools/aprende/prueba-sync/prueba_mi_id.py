# Prueba de «Mi ID» (menú) con tres "dispositivos" y un Firestore simulado:
# crear, entrar (con la elección «¿Qué quieres usar?»), cambiar el ID (los demás lo siguen) y salir.
# Requiere: python3 -m http.server 8765 en la raíz del repositorio.
import json, subprocess, sys, time, pathlib
from playwright.sync_api import sync_playwright
AQUI=pathlib.Path(__file__).parent
srv=subprocess.Popen([sys.executable,str(AQUI/'servidor_mock.py')]); time.sleep(0.6)
MOCK={'firebase-app.js':'mock-app.js','firebase-auth.js':'mock-auth.js','firebase-firestore.js':'mock-firestore.js'}
URL='http://localhost:8765/index.html'
ID1='MiIdPrueba01'; ID2='MiIdNuevo0002'
fallos=[]
def ok(c,m):
    print(('  ✓ ' if c else '  ✗ ')+m)
    if not c: fallos.append(m)
def preparar(ctx,extra=''):
    for k,v in MOCK.items():
        ctx.route('https://www.gstatic.com/firebasejs/12.18.0/'+k, lambda r,req,v=v: r.fulfill(path=str(AQUI/v), content_type='application/javascript'))
    ctx.add_init_script("try{localStorage.setItem('pc_tutorial_visto_v1','1');localStorage.setItem('aa_tour_visto_v1','1');"+extra+"}catch(e){}")
def esperar(cond,seg=8):
    t=time.time()
    while time.time()-t<seg:
        try:
            if cond(): return True
        except Exception: pass
        time.sleep(0.2)
    return False
def abrir_mi_id(pg):
    pg.click('#menu-button'); pg.click('.app-choice[data-app="id"]'); time.sleep(0.3)
def escribir(pg,id_,modo):
    pg.fill('#mi-id-input',id_); pg.click('.mi-id-form [data-modo="%s"]'%modo)
def nube(pg,id_):
    return json.loads(pg.evaluate("id=>fetch('http://127.0.0.1:8799/doc/'+id).then(r=>r.text())",id_.lower()))
try:
  with sync_playwright() as p:
    b=p.chromium.launch(); errs=[]
    print('1. Dispositivo nuevo: sin ventana al entrar, sin nube flotante; crea su ID en «Mi ID»')
    A=b.new_context(viewport={'width':390,'height':844}); preparar(A,"localStorage.setItem('wp_solved','[1,2,3]')"); pa=A.new_page(); pa.on('pageerror',lambda e:errs.append('A '+str(e)))
    pa.goto(URL); pa.wait_for_function("!!window.PCSync",timeout=8000); time.sleep(1)
    ok(not pa.evaluate("!!document.getElementById('pc-sync-fab')"),'no hay nube flotante')
    ok(not pa.evaluate("document.getElementById('pc-sync-modal-bg').classList.contains('open')"),'no aparece ninguna ventana del código al entrar')
    menu=pa.evaluate("[...document.querySelectorAll('.app-choice')].map(b=>b.dataset.app)")
    ok(menu==['id','3','1','2'],'«Mi ID» está arriba de todo en el menú: %s'%menu)
    ok(pa.evaluate("!/favorit/i.test(document.getElementById('app-frame-id').textContent)"),'«Mi ID» no muestra Favoritos')
    abrir_mi_id(pa)
    ok(pa.evaluate("document.getElementById('app-frame-id').classList.contains('active')"),'se abre la página Mi ID')
    ok(pa.evaluate("[...document.querySelectorAll('.mi-id-form button')].map(b=>b.textContent.trim()).join('|')")=='Entrar|Crear|Cambiar ID','botones Entrar · Crear · Cambiar ID')
    escribir(pa,'Corto1','crear'); time.sleep(0.8)
    ok('8' in pa.text_content('.mi-id-error'),'un ID nuevo corto se rechaza: '+pa.text_content('.mi-id-error'))
    escribir(pa,ID1,'crear')
    ok(esperar(lambda: pa.evaluate("PCSync.id")==ID1 and pa.evaluate("PCSync.estado")=='ok'),'A creó el ID')
    ok(pa.evaluate("document.querySelector('.mi-id-usuario strong').textContent")==ID1,'la página muestra «Tu ID»')
    ok(pa.evaluate("document.getElementById('mi-id-sub').textContent")=='Tu ID: '+ID1,'el menú dice «Tu ID: …»')
    ok(nube(pa,ID1)['data']['l1']['storage'].get('wp_solved')=='[1,2,3]','el avance de A quedó en el ID')
    ok(pa.evaluate("localStorage.getItem('pc_l3_active_app')")!='id','abrir «Mi ID» no se guarda como sección')

    print('2. Otro dispositivo con su propio avance entra al ID: elige «Lo de tu ID»')
    B=b.new_context(viewport={'width':390,'height':844}); preparar(B,"localStorage.setItem('wp_solved','[9]')"); pb=B.new_page(); pb.on('pageerror',lambda e:errs.append('B '+str(e)))
    pb.goto(URL); pb.wait_for_function("!!window.PCSync",timeout=8000); time.sleep(0.6)
    abrir_mi_id(pb)
    escribir(pb,'NoExiste1234','entrar'); time.sleep(0.8)
    ok('No existe' in pb.text_content('.mi-id-error'),'un ID que no existe da aviso')
    escribir(pb,ID1,'entrar')
    ok(esperar(lambda: pb.evaluate("!!document.querySelector('.idc-opt[data-elegir=\"id\"]')")),'aparece «¿Qué quieres usar?»')
    ok('3' in pb.text_content('.idc-opt[data-elegir="id"] small') and '1' in pb.text_content('.idc-opt[data-elegir="dispositivo"] small'),'cada opción dice lo que trae')
    pb.click('.idc-opt[data-elegir="id"]')
    ok(esperar(lambda: pb.evaluate("PCSync.id")==ID1 and pb.evaluate("localStorage.getItem('wp_solved')")=='[1,2,3]'),'B tomó lo del ID')

    print('3. Un tercer dispositivo elige «Lo de este dispositivo» (con confirmación)')
    C=b.new_context(viewport={'width':390,'height':844}); preparar(C,"localStorage.setItem('wp2_solved','[5]')"); pc=C.new_page(); pc.on('pageerror',lambda e:errs.append('C '+str(e)))
    pc.goto(URL); pc.wait_for_function("!!window.PCSync",timeout=8000); time.sleep(0.6)
    abrir_mi_id(pc); escribir(pc,ID1,'entrar')
    ok(esperar(lambda: pc.evaluate("!!document.querySelector('.idc-opt[data-elegir=\"dispositivo\"]')")),'aparece la elección')
    pc.click('.idc-opt[data-elegir="dispositivo"]')
    ok(esperar(lambda: pc.evaluate("!!document.querySelector('.idc-peligro')")),'pide confirmar «¿Reemplazar lo de tu ID?»')
    pc.click('.idc-cancelar[data-volver]'); time.sleep(0.2)
    ok(pc.evaluate("!!document.querySelector('.idc-opt[data-elegir=\"id\"]')"),'«Volver» regresa a la elección')
    pc.click('.idc-cancelar[data-elegir=""]'); time.sleep(0.5)
    ok(pc.evaluate("PCSync.id")=='' and not pc.evaluate("document.getElementById('pc-sync-modal-bg').classList.contains('open')"),'«Cancelar» no conecta nada')
    escribir(pc,ID1,'entrar'); esperar(lambda: pc.evaluate("!!document.querySelector('.idc-opt[data-elegir=\"dispositivo\"]')"))
    pc.click('.idc-opt[data-elegir="dispositivo"]'); pc.click('.idc-peligro')
    ok(esperar(lambda: nube(pc,ID1)['data']['l2']['storage'].get('wp2_solved')=='[5]'),'lo de C reemplazó lo del ID')

    print('4. Cambiar ID: los demás dispositivos se cambian solos')
    pa.click('[data-id-accion="cambiar"]')
    ok(pa.evaluate("document.getElementById('pc-id-viejo').value")==ID1,'la ventana trae el ID actual')
    pa.fill('#pc-id-nuevo',ID2); pa.click('#pc-id-cambiar')
    ok(esperar(lambda: pa.evaluate("PCSync.id")==ID2),'A ahora usa el ID nuevo')
    ok(esperar(lambda: pb.evaluate("PCSync.id")==ID2,10),'B se cambió solo al ID nuevo')
    viejo=nube(pa,ID1)['data']['l1']['storage']
    ok(viejo.get('pc_cloud_moved_to')==ID2.lower(),'el ID viejo queda como aviso que apunta al nuevo')

    print('5. Salir')
    antes=pb.evaluate("localStorage.getItem('wp2_solved')")
    abrir_mi_id(pb); pb.click('[data-id-accion="salir"]'); time.sleep(0.4)
    ok(pb.evaluate("PCSync.id")=='' and pb.evaluate("!!document.getElementById('mi-id-input')"),'B salió y vuelve a ver el formulario')
    ok(pb.evaluate("localStorage.getItem('pc_cloud_sync_code_v1')") is None,'B ya no guarda el ID')
    ok(antes=='[5]' and pb.evaluate("localStorage.getItem('wp2_solved')")==antes,'el avance sigue en B al salir (%s)'%antes)
    ok(not pa.evaluate("!!document.querySelector('.ids-row,.ids-head')"),'sin «Se sincroniza con…» ni la lista de secciones')
    ok(not errs,'sin errores de JavaScript '+('; '.join(errs[:3])))
    b.close()
finally:
    srv.terminate()
print('\nRESULTADO:', 'TODO CORRECTO' if not fallos else str(len(fallos))+' fallos')
sys.exit(1 if fallos else 0)
