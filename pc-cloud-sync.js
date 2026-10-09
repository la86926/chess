import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js';
import { getAuth, signInAnonymously } from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js';
import {
  getFirestore, doc, getDoc, setDoc, onSnapshot, serverTimestamp, runTransaction
} from 'https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyCGcl98D7288m_iyOWlc_ffTISg85-LVpw',
  authDomain: 'chess86926.firebaseapp.com',
  projectId: 'chess86926',
  storageBucket: 'chess86926.firebasestorage.app',
  messagingSenderId: '341510503521',
  appId: '1:341510503521:web:b2afc3127bcd78326a7e20',
  measurementId: 'G-KVZQ4ET5KH'
};

const COLLECTION = 'progresos';
const SYNC_CODE_KEY = 'pc_cloud_sync_code_v1';
const CLIENT_KEY = 'pc_cloud_sync_client_v1';
const DEVICE_MODE_KEY = 'pc_modo_dispositivo_v1';
const PAGE1_KEY = 'pc_backup_page_state_v2:index1.html';
const PAGE2_KEY = 'pc_backup_page_state_v2:index2.html';
const CODE_RE = /^[A-Za-z0-9]{4,32}$/;
// Los códigos NUEVOS (crear o renombrar) deben tener al menos 8 caracteres: así es difícil adivinarlos.
// Los perfiles que ya existen con códigos más cortos siguen funcionando igual.
const NEW_CODE_RE = /^[A-Za-z0-9]{8,32}$/;
// Aprende Ajedrez (index3.html) guarda sus datos con claves «aa_»: es el tercer ámbito,
// independiente de PC1 (l1) y PC2 (l2). Se FUSIONA registro por registro (ver aa-datos.js)
// en lugar de sobrescribirse, para que dos dispositivos no se pisen los favoritos.
const AA_SELLOS_KEY = 'pc_cloud_sync_aa_sellos';

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentCode = '';
let currentRef = null;
let stopSnapshot = null;
let applyingRemote = false;
let uploadTimer = null;
let pendingScopes = new Set();
let lastUploadAt = 0;
let statusState = 'busy';
let statusText = 'Conectando…';

function makeClientId(){
  try{
    let id=localStorage.getItem(CLIENT_KEY);
    if(id)return id;
    id=(crypto&&crypto.randomUUID)?crypto.randomUUID():'c-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
    localStorage.setItem(CLIENT_KEY,id);
    return id;
  }catch(e){return 'c-'+Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);}
}
const clientId=makeClientId();

function escapeHtml(value){
  return String(value??'').replace(/[&<>"']/g,function(ch){return({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[ch];});
}
function cleanCode(value){return String(value||'').trim();}
function codeId(value){return cleanCode(value).toLowerCase();}
function validCode(value){return CODE_RE.test(cleanCode(value));}
function validNewCode(value){return NEW_CODE_RE.test(cleanCode(value));}
const NEW_CODE_MSG='Para un ID nuevo usa solo letras y números, entre 8 y 32 caracteres: así nadie puede adivinarlo.';
function randomCode(){
  const alphabet='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes=new Uint8Array(12);
  try{crypto.getRandomValues(bytes);}catch(e){for(let i=0;i<bytes.length;i++)bytes[i]=Math.floor(Math.random()*256);}
  return Array.from(bytes,b=>alphabet[b%alphabet.length]).join('');
}
function wait(ms){return new Promise(resolve=>setTimeout(resolve,ms));}

function isExcludedKey(key){
  return !key || key===SYNC_CODE_KEY || key===CLIENT_KEY || key===DEVICE_MODE_KEY || key.indexOf('pc_cloud_sync_')===0;
}
function isAaKey(key){
  return !isExcludedKey(key) && key.indexOf('aa_')===0;
}
function isL2Key(key){
  return !isExcludedKey(key) && (key.indexOf('wp2_')===0 || key===PAGE2_KEY);
}
function isL1Key(key){
  if(isExcludedKey(key)||isL2Key(key))return false;
  return key.indexOf('wp_')===0 || key.indexOf('pc_')===0;
}
function scopeForKey(key){
  if(isAaKey(key))return 'aa';
  if(isL2Key(key))return 'l2';
  if(isL1Key(key))return 'l1';
  return null;
}
function captureStorage(scope){
  const out={};
  try{
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      const include=scope==='aa'?isAaKey(key):scope==='l2'?isL2Key(key):isL1Key(key);
      if(include)out[key]=localStorage.getItem(key);
    }
  }catch(e){}
  return out;
}
function readPage(scope){
  const key=scope==='l2'?PAGE2_KEY:PAGE1_KEY;
  try{
    const raw=localStorage.getItem(key);
    const obj=raw?JSON.parse(raw):null;
    return obj&&typeof obj==='object'&&!Array.isArray(obj)?obj:{};
  }catch(e){return {};}
}
function captureScope(scope){
  return {storage:captureStorage(scope),page:readPage(scope),updatedAt:localStamp(scope)||Date.now()};
}
/* Cuándo cambió por última vez cada sección (L1 / L2) en ESTE dispositivo.
   Sirve para que al sincronizar gane siempre el cambio más reciente. */
const STAMP_PREFIX='pc_cloud_sync_ts_';
function localStamp(scope){
  try{const n=Number(localStorage.getItem(STAMP_PREFIX+scope));return Number.isFinite(n)?n:0;}catch(e){return 0;}
}
function setLocalStamp(scope,value){
  try{localStorage.setItem(STAMP_PREFIX+scope,String(value));}catch(e){}
}
function remoteStamp(part){
  const n=Number(part&&part.updatedAt);
  return Number.isFinite(n)?n:0;
}
function captureProfile(){
  return {l1:captureScope('l1'),l2:captureScope('l2'),aa:captureAa()};
}
/* ---------- Aprende Ajedrez (ámbito aa) ---------- */
function aaSellos(){
  try{const o=JSON.parse(localStorage.getItem(AA_SELLOS_KEY)||'{}');return o&&typeof o==='object'&&!Array.isArray(o)?o:{};}catch(e){return {};}
}
function sellarAa(key){
  if(!isAaKey(key))return;
  const s=aaSellos();s[key]=Date.now();
  try{localStorage.setItem(AA_SELLOS_KEY,JSON.stringify(s));}catch(e){}
}
function captureAa(){
  return {storage:captureStorage('aa'),sellos:aaSellos(),updatedAt:Date.now()};
}
function fusionAa(local,remoto){
  const D=window.AADatos;
  if(!D)return {mapa:local.storage,sellos:local.sellos};
  return D.fusionarMapas(local.storage,(remoto&&remoto.storage)||{},local.sellos,(remoto&&remoto.sellos)||{});
}
function mismoMapa(a,b){
  const ka=Object.keys(a||{}),kb=Object.keys(b||{});
  if(ka.length!==kb.length)return false;
  return ka.every(k=>Object.prototype.hasOwnProperty.call(b,k)&&String(a[k])===String(b[k]));
}
/* Aplica la nube a este dispositivo SIN perder lo local: fusiona y escribe solo lo que cambió.
   Las claves escritas aquí disparan el evento «storage» dentro de Aprende Ajedrez,
   que repinta lo que se ve. Devuelve true si la nube quedó atrasada respecto de lo fusionado. */
function aplicarAa(remoto){
  const local=captureAa();
  const f=fusionAa(local,remoto);
  Object.keys(f.mapa).forEach(k=>{
    if(!isAaKey(k))return;
    const v=String(f.mapa[k]);
    try{if(localStorage.getItem(k)!==v)localStorage.setItem(k,v);}catch(e){}
  });
  try{localStorage.setItem(AA_SELLOS_KEY,JSON.stringify(f.sellos||{}));}catch(e){}
  return !mismoMapa(f.mapa,(remoto&&remoto.storage)||{});
}

function clearCookie(name){
  try{document.cookie=encodeURIComponent(name)+'=;Max-Age=0;path=/;SameSite=Lax';}catch(e){}
  try{
    const base=location.pathname.replace(/[^/]*$/,'')||'/';
    document.cookie=encodeURIComponent(name)+'=;Max-Age=0;path='+base+';SameSite=Lax';
  }catch(e){}
}
function clearAllAppState(){
  const keys=[];
  try{for(let i=0;i<localStorage.length;i++)keys.push(localStorage.key(i));}catch(e){}
  keys.forEach(key=>{
    if(isL1Key(key)||isL2Key(key)||isAaKey(key)){
      try{localStorage.removeItem(key);}catch(e){}
      clearCookie(key);
    }
  });
  try{
    (document.cookie||'').split(/;\s*/).forEach(part=>{
      const idx=part.indexOf('=');
      const key=decodeURIComponent(idx>=0?part.slice(0,idx):part);
      if(isL1Key(key)||isL2Key(key))clearCookie(key);
    });
  }catch(e){}
  try{localStorage.removeItem(AA_SELLOS_KEY);}catch(e){}
  try{window.dispatchEvent(new StorageEvent('storage',{key:'pc_modo',newValue:null}));}catch(e){}
}

function applyStorage(scope,remote){
  const changed=[];
  const map=(remote&&typeof remote==='object'&&!Array.isArray(remote))?remote:{};
  const existing=[];
  try{
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i);
      if((scope==='l2'?isL2Key(key):isL1Key(key)))existing.push(key);
    }
  }catch(e){}
  existing.forEach(key=>{
    if(!Object.prototype.hasOwnProperty.call(map,key)){
      try{localStorage.removeItem(key);changed.push(key);}catch(e){}
    }
  });
  Object.keys(map).forEach(key=>{
    if(!(scope==='l2'?isL2Key(key):isL1Key(key)))return;
    const value=map[key]==null?'':String(map[key]);
    try{
      if(localStorage.getItem(key)!==value){localStorage.setItem(key,value);changed.push(key);}
    }catch(e){}
  });
  return changed;
}

function injectBridge(frame){
  try{
    const docu=frame&&frame.contentDocument;
    if(!docu||!docu.head||docu.getElementById('pc-cloud-frame-bridge'))return;
    // no instalar el puente en la página vacía inicial del marco (antes de cargar L1/L2)
    const ruta=String(frame.contentWindow&&frame.contentWindow.location&&frame.contentWindow.location.pathname||'');
    if(!/index[12]\.html$/i.test(ruta))return;
    const script=docu.createElement('script');
    script.id='pc-cloud-frame-bridge';
    script.src=new URL('pc-frame-cloud-bridge.js',location.href).href+'?v=5';
    docu.head.appendChild(script);
  }catch(e){}
}
function installFrameBridges(){
  document.querySelectorAll('.app-frame').forEach(frame=>{
    frame.addEventListener('load',()=>setTimeout(()=>injectBridge(frame),0));
    try{if(frame.contentDocument&&frame.contentDocument.readyState!=='loading')injectBridge(frame);}catch(e){}
  });
}
function callBridge(frameId,payload,method='apply'){
  const frame=document.getElementById(frameId);
  const run=()=>{
    try{
      injectBridge(frame);
      const bridge=frame&&frame.contentWindow&&frame.contentWindow.PCCloudFrameBridge;
      if(bridge&&typeof bridge[method]==='function'){bridge[method](payload);return true;}
    }catch(e){}
    return false;
  };
  if(!run())setTimeout(run,140);
}
function resetFrames(){
  callBridge('app-frame-1',null,'reset');
  callBridge('app-frame-2',null,'reset');
  // Aprende Ajedrez no tiene puente: se recarga para empezar limpio.
  try{const f3=document.getElementById('app-frame-3');if(f3&&f3.contentWindow&&f3.getAttribute('src'))f3.contentWindow.location.reload();}catch(e){}
}

async function applyRemote(data,force){
  if(!data||typeof data!=='object')return;
  applyingRemote=true;
  clearTimeout(uploadTimer);
  const keepPending=new Set(pendingScopes);
  pendingScopes.clear();
  // Una sección se toma de la nube solo si allí es más reciente que en este dispositivo
  // (o si la persona acaba de escribir su código para recuperar el avance).
  const usar={};
  ['l1','l2'].forEach(scope=>{
    const local=localStamp(scope), remoto=remoteStamp(data[scope]);
    usar[scope]=!!data[scope]&&(force||!local||remoto>local);
  });
  let subirAaDespues=false;
  const subirDespues=['l1','l2'].filter(scope=>!usar[scope]&&(keepPending.has(scope)||localStamp(scope)>remoteStamp(data[scope])));
  try{
    const c1=usar.l1?applyStorage('l1',data.l1.storage):[];
    const c2=usar.l2?applyStorage('l2',data.l2.storage):[];
    if(usar.l1)setLocalStamp('l1',remoteStamp(data.l1)||Date.now());
    if(usar.l2)setLocalStamp('l2',remoteStamp(data.l2)||Date.now());
    const changed=[...new Set(c1.concat(c2))];

    // Aprende Ajedrez: siempre se fusiona (no hay «gana el más reciente» para todo el ámbito).
    if(aplicarAa(data.aa))subirAaDespues=true;

    // Sección abierta: se sigue la que trae la nube para este código. Si la copia de la nube
    // no guarda ninguna (avances de antes de que existiera Aprende Ajedrez), esa persona
    // siempre estuvo en el Método PC1, así que se abre el PC1.
    let active=localStorage.getItem('pc_l3_active_app');
    if(!(active==='1'||active==='2'||active==='3')&&usar.l1)active='1';
    // En «Mi ID» no se saca a la persona de la página, salvo justo al entrar con su ID (force):
    // entonces se la lleva a la sección donde se quedó.
    const enMiId=!force&&!!document.querySelector('.app-choice.active[data-app="id"]');
    if(!enMiId&&(active==='1'||active==='2'||active==='3')){
      const button=document.querySelector('.app-choice[data-app="'+active+'"]');
      if(button&&!button.classList.contains('active'))button.click();
    }

    if(usar.l1)callBridge('app-frame-1',{page:(data.l1&&data.l1.page)||{},changedKeys:changed});
    if(usar.l2)callBridge('app-frame-2',{page:(data.l2&&data.l2.page)||{},changedKeys:changed});
    setStatus('Sincronizado','ok');
  }finally{
    setTimeout(()=>{
      applyingRemote=false;
      // lo de este dispositivo era más nuevo: se sube para que la nube quede al día
      if(subirAaDespues||keepPending.has('aa'))subirDespues.push('aa');
      if(subirDespues.length&&currentRef){
        subirDespues.forEach(scope=>pendingScopes.add(scope));
        clearTimeout(uploadTimer);
        uploadTimer=setTimeout(pushPending,200);
      }
    },650);
  }
}

function setStatus(text,state){
  statusText=text;
  statusState=state||'busy';
  try{pintarMiId();}catch(e){}
}

function queueUpload(scope,marcar){
  if(applyingRemote||!scope)return;
  if(marcar!==false)setLocalStamp(scope,Date.now());
  if(!currentRef)return;
  pendingScopes.add(scope);
  clearTimeout(uploadTimer);
  setStatus('Guardando…','busy');
  uploadTimer=setTimeout(pushPending,420);
}
async function pushPending(){
  if(!currentRef||applyingRemote||!pendingScopes.size)return;
  const scopes=[...pendingScopes];
  pendingScopes.clear();
  const patch={timestamp:serverTimestamp(),updatedBy:clientId,schemaVersion:1};
  if(scopes.includes('l1'))patch.l1=captureScope('l1');
  if(scopes.includes('l2'))patch.l2=captureScope('l2');
  try{
    lastUploadAt=Date.now();
    if(patch.l1||patch.l2)await setDoc(currentRef,patch,{merge:true});
    if(scopes.includes('aa'))await subirAa();
    setStatus('Sincronizado','ok');
  }catch(e){
    console.error('PC cloud sync:',e);
    // se reintenta al recuperar la conexión; lo local nunca se pierde
    scopes.forEach(s=>pendingScopes.add(s));
    setStatus(navigator.onLine===false?'Sin conexión':'Error al guardar','error');
  }
}
/* Sube Aprende Ajedrez dentro de una transacción: lee lo que hay en la nube, lo fusiona
   con este dispositivo y escribe el resultado. Si otro dispositivo escribió a la vez,
   Firestore repite la transacción con el dato nuevo: ningún cambio se pierde. */
async function subirAa(){
  const ref=currentRef;if(!ref)return;
  let fusion=null;
  await runTransaction(db,async tx=>{
    const snap=await tx.get(ref);
    if(!snap.exists())throw new Error('El perfil ya no existe.');
    const remoto=(snap.data()||{}).aa||null;
    fusion=fusionAa(captureAa(),remoto);
    tx.update(ref,{aa:{storage:fusion.mapa,sellos:fusion.sellos,updatedAt:Date.now()},timestamp:serverTimestamp(),updatedBy:clientId,schemaVersion:1});
  });
  lastUploadAt=Date.now();
  if(fusion){
    applyingRemote=true;
    try{aplicarAa({storage:fusion.mapa,sellos:fusion.sellos});}finally{setTimeout(()=>{applyingRemote=false;},80);}
  }
}

function stopListening(){
  if(stopSnapshot){try{stopSnapshot();}catch(e){}stopSnapshot=null;}
}
function startListening(){
  stopListening();
  if(!currentRef)return;
  stopSnapshot=onSnapshot(currentRef,snapshot=>{
    if(!snapshot.exists()){
      setStatus('Perfil no disponible','error');
      return;
    }
    if(snapshot.metadata&&snapshot.metadata.hasPendingWrites){
      setStatus('Guardando…','busy');
      return;
    }
    const data=snapshot.data();
    // El ID cambió en otro dispositivo: este dispositivo se pasa solo al ID nuevo.
    const moved=movedTo(data);
    if(moved){
      if(data.updatedBy!==clientId){
        stopListening();
        seguirIdNuevo(moved.code).then(()=>toast('Tu ID cambió a «'+moved.code+'» en otro dispositivo')).catch(e=>{console.error('PC cloud sync:',e);setStatus('Sin conexión','error');});
      }
      return;
    }
    if(data&&data.updatedBy===clientId&&Date.now()-lastUploadAt<1800){
      setStatus('Sincronizado','ok');
      return;
    }
    applyRemote(data);
  },error=>{
    console.error('PC cloud sync listener:',error);
    setStatus('Sin conexión','error');
  });
}

/* ---------- Mi ID ----------
   Igual que en Círculos Music: el ID es opcional. Sin ID, todo queda en este dispositivo.
   Con ID, el avance de Aprende Ajedrez, el Método PC1 y el Método PC2 viaja a todos los
   dispositivos donde se escriba el mismo ID. «Cambiar ID» deja el ID viejo como aviso que
   apunta al nuevo, para que los demás dispositivos se cambien solos. */
const MOVED_KEY='pc_cloud_moved_to';
const MOVED_CODE_KEY='pc_cloud_moved_code';
const LAST_ID_KEY='pc_cloud_sync_ultimo_id';
function movedTo(data){
  const st=data&&data.l1&&data.l1.storage;
  return st&&st[MOVED_KEY]?{id:st[MOVED_KEY],code:st[MOVED_CODE_KEY]||st[MOVED_KEY]}:null;
}
function vivo(snap){return !!(snap&&snap.exists()&&!movedTo(snap.data()));}
async function refFor(code){return doc(db,COLLECTION,codeId(code));}
function recordar(code){
  try{localStorage.setItem(SYNC_CODE_KEY,code);localStorage.setItem(LAST_ID_KEY,codeId(code));}catch(e){}
}
async function connectExisting(code,snapshot,force){
  code=cleanCode(code);
  const ref=await refFor(code);
  const snap=snapshot||await getDoc(ref);
  if(!snap.exists())throw new Error('No existe el ID «'+code+'». Si es la primera vez, toca Crear.');
  const moved=movedTo(snap.data());
  if(moved)return connectExisting(moved.code,null,force);
  stopListening();
  applyingRemote=true;
  currentCode=code;
  currentRef=ref;
  recordar(currentCode);
  await applyRemote(snap.data(),!!force);
  startListening();
  closeModal();
  setStatus('Sincronizado','ok');
  if(Object.keys(captureStorage('aa')).length){pendingScopes.add('aa');clearTimeout(uploadTimer);uploadTimer=setTimeout(pushPending,900);}
}
/* Crea el ID con todo lo que hay en este dispositivo */
async function createCurrentProfile(code){
  code=cleanCode(code);
  const ref=await refFor(code);
  const state=captureProfile();
  await setDoc(ref,{...state,timestamp:serverTimestamp(),updatedBy:clientId,schemaVersion:1});
  stopListening();
  currentCode=code;
  currentRef=ref;
  recordar(currentCode);
  startListening();
  closeModal();
  setStatus('Sincronizado','ok');
}
/* «Lo de tu ID»: este dispositivo se reemplaza por lo que guarda el ID */
async function usarLoDelId(code,snap){
  stopListening();
  applyingRemote=true;
  clearAllAppState();
  currentCode=cleanCode(code);
  currentRef=await refFor(code);
  recordar(currentCode);
  await applyRemote(snap.data(),true);
  startListening();
  setStatus('Sincronizado','ok');
}
async function seguirIdNuevo(code){
  const ref=await refFor(code);
  const snap=await getDoc(ref);
  if(!vivo(snap))throw new Error('El ID nuevo no está disponible.');
  stopListening();
  currentCode=cleanCode(code);currentRef=ref;recordar(currentCode);
  startListening();
  setStatus('Sincronizado','ok');
}

/* Resumen de lo guardado (para la ventana «¿Qué quieres usar?» y la página Mi ID) */
function contarLista(raw){
  try{const v=JSON.parse(raw||'null');if(Array.isArray(v))return v.length;if(v&&typeof v==='object')return Object.keys(v).length;}catch(e){}
  return 0;
}
function contarAa(raw){
  try{const p=JSON.parse(raw||'null'),l=p&&p.lecciones;if(!l)return 0;return Object.keys(l).filter(k=>l[k]&&l[k].estado==='completada').length;}catch(e){return 0;}
}
function resumenLocal(){
  const g=k=>{try{return localStorage.getItem(k);}catch(e){return null;}};
  return {aa:contarAa(g('aa_progreso_v1')),pc1:contarLista(g('wp_solved')),pc2:contarLista(g('wp2_solved'))};
}
function resumenRemoto(data){
  const st=(scope)=>(data&&data[scope]&&data[scope].storage)||{};
  return {aa:contarAa(st('aa')['aa_progreso_v1']),pc1:contarLista(st('l1')['wp_solved']),pc2:contarLista(st('l2')['wp2_solved'])};
}
function hayAvanceLocal(){
  const r=resumenLocal();if(r.aa||r.pc1||r.pc2)return true;
  try{
    const p=JSON.parse(localStorage.getItem('aa_progreso_v1')||'null'),l=p&&p.lecciones;
    if(l)for(const k in l){const x=l[k]||{};if(x.intentos>0||x.aciertos>0)return true;}
    if(contarLista(localStorage.getItem('wp_hist_log'))||contarLista(localStorage.getItem('wp2_hist_log')))return true;
  }catch(e){}
  return false;
}
function hayAvanceRemoto(data){const r=resumenRemoto(data);return !!(r.aa||r.pc1||r.pc2);}
function textoResumen(r){
  const t=[];
  if(r.aa)t.push(r.aa+(r.aa===1?' lección':' lecciones'));
  if(r.pc1)t.push('PC1: '+r.pc1);
  if(r.pc2)t.push('PC2: '+r.pc2);
  return t.join(' · ')||'Sin avance';
}

/* Entrar con un ID que ya existe */
/* La sesión anónima de Firebase se abre cuando hace falta (al entrar o crear un ID) */
let sesion=null;
function asegurarSesion(){if(!sesion)sesion=signInAnonymously(auth).catch(e=>{sesion=null;throw e;});return sesion;}
async function entrar(code){
  await asegurarSesion();
  code=cleanCode(code);
  if(!validCode(code))throw new Error('Usa solo letras y números, entre 4 y 32 caracteres.');
  setStatus('Conectando…','busy');
  let ref=await refFor(code),snap=await getDoc(ref);
  const moved=snap.exists()?movedTo(snap.data()):null;
  if(moved){code=moved.code;ref=await refFor(code);snap=await getDoc(ref);}
  if(!vivo(snap)){setStatus(currentCode?statusText:'Sin ID',currentCode?statusState:'off');throw new Error('No existe el ID «'+code+'». Si es la primera vez, toca Crear.');}
  const data=snap.data();
  const yaEstuvo=(()=>{try{return localStorage.getItem(LAST_ID_KEY)===codeId(code);}catch(e){return false;}})();
  /* Primera vez con este ID en este dispositivo y hay avance en los dos lados: la persona elige */
  if(!yaEstuvo&&hayAvanceLocal()&&hayAvanceRemoto(data)){
    const elegido=await preguntarQueUsar(code,resumenLocal(),resumenRemoto(data));
    if(!elegido){setStatus(currentCode?'Sincronizado':'Sin ID',currentCode?'ok':'off');throw Object.assign(new Error(''),{cancelado:true});}
    if(elegido==='id'){await usarLoDelId(code,snap);toast('¡Hola, '+code+'! Todo quedó sincronizado.');return;}
    await createCurrentProfile(code);          // lo de este dispositivo reemplaza lo del ID
    toast('Listo: lo de este dispositivo quedó guardado en «'+code+'».');
    return;
  }
  if(yaEstuvo)await connectExisting(code,snap,false);                       // vuelve a su ID: gana lo más reciente
  else if(hayAvanceLocal()&&!hayAvanceRemoto(data))await createCurrentProfile(code);  // el ID estaba vacío: se guarda lo de aquí
  else await connectExisting(code,snap,true);                             // dispositivo sin avance: se trae lo del ID
  toast('¡Hola, '+code+'! Todo quedó sincronizado.');
}
/* Crear un ID nuevo con lo de este dispositivo */
async function crear(code){
  await asegurarSesion();
  code=cleanCode(code);
  if(!validNewCode(code))throw new Error(NEW_CODE_MSG);
  setStatus('Conectando…','busy');
  const snap=await getDoc(await refFor(code));
  if(vivo(snap)){setStatus(currentCode?'Sincronizado':'Sin ID',currentCode?'ok':'off');throw new Error('El ID «'+code+'» ya existe. Si es tuyo, toca Entrar; si no, elige otro.');}
  await createCurrentProfile(code);
  toast('Listo, creaste el ID «'+code+'». Tu avance de este dispositivo quedó guardado en él.');
}
/* Cambiar el ID: el avance pasa al ID nuevo y el viejo queda como aviso que apunta al nuevo */
async function renameCode(oldCode,nextCode){
  await asegurarSesion();
  oldCode=cleanCode(oldCode);nextCode=cleanCode(nextCode);
  if(!validCode(oldCode))throw new Error('Escribe tu ID actual (solo letras y números).');
  if(!validNewCode(nextCode))throw new Error(NEW_CODE_MSG);
  if(codeId(nextCode)===codeId(oldCode))throw new Error('El ID nuevo es igual al actual.');
  const oldRef=await refFor(oldCode),newRef=await refFor(nextCode);
  await runTransaction(db,async tx=>{
    const oldSnap=await tx.get(oldRef);
    if(!vivo(oldSnap))throw new Error('No existe el ID «'+oldCode+'». Revisa cómo lo escribiste.');
    const newSnap=await tx.get(newRef);
    if(vivo(newSnap))throw new Error('El ID «'+nextCode+'» ya lo usa alguien. Elige otro.');
    const data=oldSnap.data(),meta={timestamp:serverTimestamp(),updatedBy:clientId,schemaVersion:1};
    tx.set(newRef,{...data,...meta});
    const l1=data.l1||{storage:{},page:{}};
    tx.set(oldRef,{...data,l1:{...l1,storage:{...(l1.storage||{}),[MOVED_KEY]:codeId(nextCode),[MOVED_CODE_KEY]:nextCode}},...meta});
  });
  if(currentCode&&codeId(currentCode)===codeId(oldCode)){
    stopListening();
    currentCode=nextCode;currentRef=newRef;recordar(currentCode);
    startListening();
  }
  setStatus(currentCode?'Sincronizado':'Sin ID',currentCode?'ok':'off');
  toast('Listo, ahora tu ID es «'+nextCode+'»');
}
function salir(){
  stopListening();
  clearTimeout(uploadTimer);pendingScopes.clear();
  currentCode='';currentRef=null;
  try{localStorage.removeItem(SYNC_CODE_KEY);}catch(e){}
  setStatus('Sin ID','off');
  toast('Saliste. Tu avance sigue en este dispositivo.');
}

/* ---------- Ventanas ---------- */
function ensureUi(){
  if(document.getElementById('pc-sync-root'))return;
  const root=document.createElement('div');
  root.id='pc-sync-root';
  root.innerHTML=`
    <div id="pc-sync-modal-bg" class="pc-sync-modal-bg" aria-hidden="true"><div id="pc-sync-modal" class="pc-sync-modal" role="dialog" aria-modal="true"></div></div>
    <div id="pc-sync-toast" class="pc-sync-toast" role="status" aria-live="polite"></div>`;
  document.body.appendChild(root);
  document.getElementById('pc-sync-modal-bg').addEventListener('click',e=>{if(e.target.id==='pc-sync-modal-bg'&&!document.querySelector('#pc-sync-modal .idc'))closeModal();});
}
let toastT=null;
function toast(text){
  ensureUi();
  const t=document.getElementById('pc-sync-toast');if(!t||!text)return;
  t.textContent=text;t.classList.add('ver');
  clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('ver'),3400);
}
function openModal(html,clase){
  ensureUi();
  const modal=document.getElementById('pc-sync-modal');
  modal.className='pc-sync-modal'+(clase?' '+clase:'');
  modal.innerHTML=html;
  const bg=document.getElementById('pc-sync-modal-bg');
  bg.classList.add('open');bg.setAttribute('aria-hidden','false');
  modal.querySelectorAll('[data-pc-sync-close]').forEach(b=>b.addEventListener('click',closeModal));
}
function closeModal(){
  const bg=document.getElementById('pc-sync-modal-bg');
  if(bg){bg.classList.remove('open');bg.setAttribute('aria-hidden','true');}
}
function head(title,subtitle,closable=true){
  return `<div class="pc-sync-head"><div class="pc-sync-head-text"><h3>${escapeHtml(title)}</h3>${subtitle?`<p>${escapeHtml(subtitle)}</p>`:''}</div>${closable?'<button class="pc-sync-x" type="button" data-pc-sync-close aria-label="Cerrar">×</button>':''}</div>`;
}
function message(el,text,type=''){
  if(!el)return;
  el.className='pc-sync-msg '+type;
  el.textContent=text||'';
}
const ICON_NUBE='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18.5h10.2a4 4 0 0 0 .6-7.95A5.5 5.5 0 0 0 7.2 9.5 4.5 4.5 0 0 0 7 18.5Z"/></svg>';
const ICON_TEL='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6.5" y="2.5" width="11" height="19" rx="2.6"/><path d="M10.5 18.5h3"/></svg>';
const ICON_AVISO='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 2.8 19.5h18.4Z"/><path d="M12 10v4.5M12 17.2v.1"/></svg>';
/* ¿Lo de tu ID o lo de este dispositivo? (con confirmación si se reemplaza lo del ID) */
function preguntarQueUsar(code,mio,suyo){
  return new Promise(listo=>{
    const paso1=`<div class="idc"><div class="idc-box"><h3>¿Qué quieres usar?</h3></div>
      <button class="idc-opt" type="button" data-elegir="id"><span class="idc-ic nube">${ICON_NUBE}</span><span class="idc-txt"><strong>Lo de tu ID «${escapeHtml(code)}»</strong><small>${escapeHtml(textoResumen(suyo))}</small></span></button>
      <button class="idc-opt" type="button" data-elegir="dispositivo"><span class="idc-ic">${ICON_TEL}</span><span class="idc-txt"><strong>Lo de este dispositivo</strong><small>${escapeHtml(textoResumen(mio))}</small></span></button>
      <button class="idc-cancelar" type="button" data-elegir="">Cancelar</button></div>`;
    const paso2=`<div class="idc"><div class="idc-box"><span class="idc-aviso">${ICON_AVISO}</span><h3>¿Reemplazar lo de tu ID?</h3><p>Se borra lo que tenía «${escapeHtml(code)}».</p></div>
      <button class="idc-peligro" type="button" data-elegir="dispositivo!">Reemplazar</button>
      <button class="idc-cancelar" type="button" data-volver>Volver</button></div>`;
    openModal(paso1,'transparente');
    const modal=document.getElementById('pc-sync-modal');
    const fin=v=>{modal.onclick=null;closeModal();listo(v);};
    modal.onclick=e=>{
      if(e.target.closest('[data-volver]')){modal.innerHTML=paso1;return;}
      const b=e.target.closest('[data-elegir]');if(!b)return;
      const v=b.dataset.elegir;
      if(v==='dispositivo'){modal.innerHTML=paso2;return;}
      fin(v==='dispositivo!'?'dispositivo':v);
    };
  });
}
/* Ventana «Cambiar ID»: ID actual e ID nuevo */
function abrirCambiarId(){
  openModal(head('Cambiar ID','')+`
    <label class="pc-sync-field"><span>ID ACTUAL</span><input id="pc-id-viejo" class="pc-sync-input" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="32" placeholder="Tu ID de ahora" value="${escapeHtml(currentCode)}"></label>
    <label class="pc-sync-field"><span>ID NUEVO</span><input id="pc-id-nuevo" class="pc-sync-input" autocomplete="off" autocapitalize="off" spellcheck="false" maxlength="32" placeholder="El que quieres usar"></label>
    <p class="pc-sync-note">Solo letras y números, de 8 a 32. Tu avance pasa al ID nuevo en todos tus dispositivos.</p>
    <div id="pc-id-cambio-msg" class="pc-sync-msg"></div>
    <button id="pc-id-cambiar" class="pc-sync-btn primary" style="width:100%" type="button">Cambiar ID</button>`);
  const btn=document.getElementById('pc-id-cambiar'),msg=document.getElementById('pc-id-cambio-msg');
  btn.onclick=async()=>{
    btn.disabled=true;btn.textContent='Cambiando…';message(msg,'');
    try{await renameCode(document.getElementById('pc-id-viejo').value,document.getElementById('pc-id-nuevo').value);closeModal();}
    catch(e){console.error('Mi ID:',e);message(msg,e&&e.message?e.message:'No se pudo cambiar el ID.','error');}
    finally{btn.disabled=false;btn.textContent='Cambiar ID';}
  };
  setTimeout(()=>document.getElementById(currentCode?'pc-id-nuevo':'pc-id-viejo').focus(),60);
}

/* ---------- Página «Mi ID» (sección del menú) ---------- */
const ICON_ENTRAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 16l4-4-4-4M14 12H4"/></svg>';
const ICON_CREAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>';
const ICON_EDITAR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="M13.5 6.5l4 4"/></svg>';
const ICON_SALIR='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4"/><path d="M15 16l4-4-4-4M19 12H9"/></svg>';
function pintarMiId(){
  const cuenta=document.getElementById('mi-id-cuenta');
  const sub=document.getElementById('mi-id-sub');
  if(sub)sub.textContent=currentCode?('Tu ID: '+currentCode):'Crea tu ID y sincroniza tus dispositivos';
  if(!cuenta)return;
  if(currentCode){
    const etiqueta={ok:'Sincronizado · se actualiza solo en tus dispositivos',busy:statusText||'Conectando…',error:statusText||'Sin conexión: guardado en este dispositivo',off:''}[statusState]||statusText;
    cuenta.innerHTML=`<div class="mi-id-usuario"><span class="mi-id-punto ${statusState}"></span><div><small class="mi-id-etq">Tu ID</small><strong>${escapeHtml(currentCode)}</strong><small>${escapeHtml(etiqueta)}</small></div></div>
      <div class="mi-id-acciones dos"><button type="button" class="mi-id-btn" data-id-accion="cambiar">${ICON_EDITAR}Cambiar ID</button><button type="button" class="mi-id-btn" data-id-accion="salir">${ICON_SALIR}Salir</button></div>`;
  }else if(!cuenta.querySelector('form')){
    cuenta.innerHTML=`<form class="mi-id-form" autocomplete="off"><label for="mi-id-input">Escribe tu ID para ver tu avance en cualquier dispositivo. ¿Primera vez? Toca <b>Crear</b>.</label>
      <input class="mi-id-input" id="mi-id-input" maxlength="32" placeholder="Tu ID" autocapitalize="off" autocomplete="off" spellcheck="false">
      <div class="mi-id-acciones"><button type="submit" class="mi-id-btn" data-modo="entrar">${ICON_ENTRAR}Entrar</button><button type="submit" class="mi-id-btn" data-modo="crear">${ICON_CREAR}Crear</button><button type="button" class="mi-id-btn" data-id-accion="cambiar">${ICON_EDITAR}Cambiar ID</button></div>
      <p class="mi-id-error" role="alert"></p></form>`;
  }
}
function instalarMiId(){
  const pagina=document.getElementById('mi-id');if(!pagina)return;
  pagina.addEventListener('submit',async e=>{
    if(!e.target.closest('.mi-id-form'))return;
    e.preventDefault();
    const input=document.getElementById('mi-id-input'),msg=pagina.querySelector('.mi-id-error');
    const modo=(e.submitter&&e.submitter.dataset.modo)||'entrar';
    const botones=pagina.querySelectorAll('.mi-id-form button');botones.forEach(b=>b.disabled=true);
    try{msg.textContent='';if(modo==='crear')await crear(input.value);else await entrar(input.value);}
    catch(err){if(!err.cancelado){console.error('Mi ID:',err);msg.textContent=err&&err.message?err.message:'No se pudo conectar. Revisa tu internet.';}}
    finally{botones.forEach(b=>b.disabled=false);pintarMiId();}
  });
  pagina.addEventListener('click',e=>{
    const a=e.target.closest('[data-id-accion]');
    if(a&&a.dataset.idAccion==='cambiar'){abrirCambiarId();return;}
    if(a&&a.dataset.idAccion==='salir'){salir();return;}
  });
  // al abrir la página se actualizan los números
  document.addEventListener('click',e=>{if(e.target.closest&&e.target.closest('.app-choice[data-app="id"]'))setTimeout(pintarMiId,0);},true);
  pintarMiId();
}

function installChangeWatchers(){
  // Espera a que termine de aplicarse lo que llegó de la nube antes de subir
  const cuandoLibre=fn=>{if(!applyingRemote)fn();else setTimeout(()=>cuandoLibre(fn),200);};
  window.addEventListener('storage',e=>{
    if(!e||!e.key)return;
    const scope=scopeForKey(e.key);
    // Aprende Ajedrez se fusiona clave por clave: un cambio hecho mientras llega la nube
    // (por ejemplo, abrir otra lección) se sella y se sube después; nunca se pierde.
    if(scope==='aa'){sellarAa(e.key);cuandoLibre(()=>queueUpload('aa'));return;}
    if(applyingRemote)return;
    // la foto de página se guarda sola al cargar: se sube, pero no cuenta como cambio de la persona
    if(scope)queueUpload(scope,e.key!==PAGE1_KEY&&e.key!==PAGE2_KEY);
  });
  window.addEventListener('online',()=>{if(currentRef&&pendingScopes.size){clearTimeout(uploadTimer);uploadTimer=setTimeout(pushPending,300);}});
  // Cambio de sección o de apariencia hecho por la persona. Si coincide con la llegada de datos de
  // la nube (applyingRemote), no se pierde: se sube en cuanto termina de aplicarse.
  // Los clics que hace el propio código al aplicar la nube (isTrusted=false) no se suben.
  // «Mi ID» no es una sección de avance: abrirla no se sincroniza.
  document.addEventListener('click',e=>{
    if(!currentRef)return;
    if(applyingRemote&&!e.isTrusted)return;
    const t=e.target.closest?e.target:null;if(!t)return;
    if(t.closest('.app-choice[data-app="id"]'))return;
    if(t.closest('.app-choice')||t.closest('#tema button'))setTimeout(()=>cuandoLibre(()=>queueUpload('l1')),10);
  },true);
  window.addEventListener('pagehide',()=>{
    if(currentRef&&!applyingRemote&&pendingScopes.size){clearTimeout(uploadTimer);pushPending();}
  });
}

async function boot(){
  ensureUi();
  installFrameBridges();
  installChangeWatchers();
  instalarMiId();
  let stored='';
  try{stored=cleanCode(localStorage.getItem(SYNC_CODE_KEY));}catch(e){}
  if(stored&&!validCode(stored)){
    try{localStorage.removeItem(SYNC_CODE_KEY);}catch(e){}
    stored='';
  }
  // Sin ID: todo queda en este dispositivo (el ID se crea cuando la persona quiera, en «Mi ID»)
  if(!stored){currentCode='';currentRef=null;setStatus('Sin ID','off');return;}
  currentCode=stored;setStatus('Conectando…','busy');
  try{
    await asegurarSesion();
  }catch(e){
    console.error('PC cloud auth:',e);
    setStatus('Sin conexión','error');
    return;
  }
  try{
    const ref=await refFor(stored);
    const snap=await getDoc(ref);
    if(snap.exists())await connectExisting(stored,snap);
    else{currentCode='';currentRef=null;try{localStorage.removeItem(SYNC_CODE_KEY);}catch(e){}setStatus('Sin ID','off');toast('Tu ID «'+stored+'» ya no existe. Entra con otro desde «Mi ID».');}
  }catch(e){
    console.error('PC cloud boot:',e);
    setStatus('Sin conexión','error');
  }
}
window.PCSync={
  get id(){return currentCode;},get estado(){return statusState;},
  entrar,crear,cambiar:renameCode,salir,pintar:pintarMiId
};

boot();
