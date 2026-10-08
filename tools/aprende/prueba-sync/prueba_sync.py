# Prueba de sincronización con dos "dispositivos" (dos contextos del navegador) y un Firestore simulado.
import json, subprocess, sys, time, os, pathlib
from playwright.sync_api import sync_playwright
AQUI=pathlib.Path(__file__).parent
srv=subprocess.Popen([sys.executable,str(AQUI/'servidor_mock.py')]); time.sleep(0.6)
MOCK={'firebase-app.js':'mock-app.js','firebase-auth.js':'mock-auth.js','firebase-firestore.js':'mock-firestore.js'}
URL='http://localhost:8765/index.html'
CODIGO='PruebaSync01'
fallos=[]
def ok(c,m):
    print(('  ✓ ' if c else '  ✗ ')+m)
    if not c: fallos.append(m)
def preparar(ctx):
    for k,v in MOCK.items():
        ctx.route('https://www.gstatic.com/firebasejs/12.18.0/'+k, lambda r,req,v=v: r.fulfill(path=str(AQUI/v), content_type='application/javascript'))
    ctx.add_init_script("try{localStorage.setItem('pc_tutorial_visto_v1','1');localStorage.setItem('aa_tour_visto_v1','1')}catch(e){}")
def entrar(pg,nuevo):
    pg.goto(URL); pg.wait_for_selector('#pc-sync-code-input',timeout=8000)
    pg.fill('#pc-sync-code-input',CODIGO); pg.click('#pc-sync-continue')
    if nuevo:
        pg.wait_for_selector('#pc-sync-keep'); pg.click('#pc-sync-keep')
    pg.wait_for_function("document.getElementById('pc-sync-fab').dataset.state==='ok'",timeout=8000)
def abrir_aa(pg):
    pg.click('#menu-button'); pg.click('.app-choice[data-app="3"]')
    pg.wait_for_function("(()=>{try{return !!document.getElementById('app-frame-3').contentWindow.AAApp}catch(e){return false}})()",timeout=10000)
    return pg.frame_locator('#app-frame-3')
def frame3(pg):
    return [f for f in pg.frames if f.url.find('index3.html')>=0][0]
def favs(pg):
    return pg.evaluate("(()=>{const f=JSON.parse(localStorage.getItem('aa_favoritos_v1')||'{}');const c={};Object.keys(f.carpetas||{}).forEach(k=>{if(!f.carpetas[k].borrada)c[k]=f.carpetas[k].nombre});const it=Object.keys(f.items||{}).filter(k=>!f.items[k].borrado).sort();return {c,it}})()")
def esperar(cond,seg=8):
    t=time.time()
    while time.time()-t<seg:
        if cond(): return True
        time.sleep(0.25)
    return False
try:
  with sync_playwright() as p:
    b=p.chromium.launch()
    A=b.new_context(); preparar(A); pa=A.new_page()
    B=b.new_context(); preparar(B); pb=B.new_page()
    errs=[]; pa.on('pageerror',lambda e:errs.append('A '+str(e))); pb.on('pageerror',lambda e:errs.append('B '+str(e)))
    print('1. El dispositivo A crea el perfil y guarda un favorito en Aprende Ajedrez')
    entrar(pa,True); abrir_aa(pa); fa=frame3(pa)
    pa.evaluate("localStorage.setItem('wp_solved','[1,2,3]')")  # progreso de PC1 (desde la página principal no dispara storage: lo forzamos con la subida normal)
    fa.evaluate("AADatos.fijarCarpetasDeLeccion('N2-005',['nivel-2'])")
    fa.evaluate("AADatos.actualizarLeccion('N2-005',r=>{r.estado='completada';r.completadaEn=Date.now()})")
    time.sleep(1.5)
    doc=json.loads(pa.evaluate("fetch('http://127.0.0.1:8799/doc/pruebasync01').then(r=>r.text())"))
    ok(doc['exists'] and 'aa' in doc['data'],'la nube tiene el ámbito aa')
    ok('l1' in doc['data'] and 'l2' in doc['data'],'la nube conserva l1 y l2')
    aa_st=doc['data']['aa']['storage']
    ok('nivel-2|N2-005' in json.loads(aa_st.get('aa_favoritos_v1','{}')).get('items',{}),'el favorito está en la nube')
    ok(not any(k.startswith('wp') for k in aa_st),'aa no contiene claves de PC1/PC2')
    print('2. El dispositivo B entra con el mismo código')
    entrar(pb,False)
    ok(esperar(lambda: 'nivel-2|N2-005' in favs(pb)['it']),'B recibe el favorito')
    ok(pb.evaluate("JSON.parse(localStorage.aa_progreso_v1).lecciones['N2-005'].estado")=='completada','B recibe el progreso')
    abrir_aa(pb); fb=frame3(pb)
    print('3. Cambios simultáneos en A y B (transacciones que se cruzan)')
    pa.evaluate("window.__retrasoTx=400"); pb.evaluate("window.__retrasoTx=400")
    fa.evaluate("(()=>{const id=AADatos.crearCarpeta('Para repasar');AADatos.fijarCarpetasDeLeccion('N2-005',['nivel-2',id]);})()")
    fb.evaluate("(()=>{AADatos.renombrarCarpeta('nivel-3','Tácticas');AADatos.fijarCarpetasDeLeccion('N1-001',['nivel-1']);})()")
    def convergen():
        x,y=favs(pa),favs(pb)
        return x==y and 'Para repasar' in x['c'].values() and x['c'].get('nivel-3')=='Tácticas' and 'nivel-1|N1-001' in x['it']
    ok(esperar(convergen,15),'A y B convergen con TODOS los cambios (ninguno se pierde)')
    print('   A:',favs(pa)); print('   B:',favs(pb))
    print('4. B sin conexión borra una carpeta; A agrega otra cosa; B vuelve')
    pb.evaluate("window.__sinRed=true")
    fb.evaluate("AADatos.eliminarCarpeta('nivel-1')")
    fa.evaluate("AADatos.fijarCarpetasDeLeccion('N2-001',['nivel-4'])")
    time.sleep(1.5)
    ok('nivel-1' in favs(pa)['c'],'mientras B está sin red, A todavía ve nivel-1')
    pb.evaluate("window.__sinRed=false; window.dispatchEvent(new Event('online'))")
    def conv2():
        x,y=favs(pa),favs(pb)
        return x==y and 'nivel-1' not in x['c'] and 'nivel-4|N2-001' in x['it'] and 'nivel-1|N1-001' not in x['it']
    ok(esperar(conv2,15),'al volver la conexión, el borrado de B y el cambio de A quedan en ambos')
    print('5. Las carpetas predeterminadas no reaparecen tras borrarlas')
    fa.evaluate("AADatos.favoritos()")
    time.sleep(1)
    ok('nivel-1' not in favs(pa)['c'] and 'nivel-1' not in favs(pb)['c'],'nivel-1 sigue eliminada en ambos')
    print('6. PC1 y PC2 no se tocan')
    ok(pa.evaluate("localStorage.getItem('wp_solved')")=='[1,2,3]','el progreso de PC1 de A sigue intacto')
    doc=json.loads(pa.evaluate("fetch('http://127.0.0.1:8799/doc/pruebasync01').then(r=>r.text())"))
    ok(all(not k.startswith('aa_') for k in doc['data']['l1']['storage']) and all(not k.startswith('aa_') for k in doc['data']['l2']['storage']),'l1 y l2 no contienen datos de Aprende Ajedrez')
    ok(not errs,'sin errores de JavaScript '+('; '.join(errs[:3])))
    b.close()
finally:
    srv.terminate()
print('\nRESULTADO:', 'TODO CORRECTO' if not fallos else str(len(fallos))+' fallos')
sys.exit(1 if fallos else 0)
