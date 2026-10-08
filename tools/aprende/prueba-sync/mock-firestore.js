// Firestore simulado (solo para pruebas). Polling para onSnapshot; transacciones con control de versión.
const BASE='http://127.0.0.1:8799/doc/';
export function getFirestore(){return {};}
export function doc(db,col,id){return {id};}
export function serverTimestamp(){return {__ts:Date.now()};}
async function leer(ref){const r=await fetch(BASE+ref.id);return r.json();}
function snap(j){return {exists:()=>j.exists,data:()=>j.data,metadata:{hasPendingWrites:false},_v:j.version};}
export async function getDoc(ref){if(window.__sinRed)throw new Error('offline');return snap(await leer(ref));}
export async function setDoc(ref,data,opt){if(window.__sinRed)throw new Error('offline');const r=await fetch(BASE+ref.id,{method:'POST',body:JSON.stringify({data,merge:!!(opt&&opt.merge)})});return r.json();}
export function onSnapshot(ref,cb,err){let ult=-1,vivo=true;(async function t(){while(vivo){try{if(!window.__sinRed){const j=await leer(ref);if(j.version!==ult){ult=j.version;cb(snap(j));}}}catch(e){err&&err(e);}await new Promise(r=>setTimeout(r,250));}})();return ()=>{vivo=false;};}
export async function runTransaction(db,fn){
  for(let i=0;i<8;i++){
    if(window.__sinRed)throw new Error('offline');
    const lecturas={};const escrituras=[];
    const tx={get:async ref=>{const j=await leer(ref);lecturas[ref.id]=j.version;return snap(j);},
      set:(ref,data)=>escrituras.push({ref,data,merge:false}),update:(ref,data)=>escrituras.push({ref,data,merge:true}),delete:ref=>escrituras.push({ref,del:true})};
    await fn(tx);
    if(window.__retrasoTx)await new Promise(r=>setTimeout(r,window.__retrasoTx));
    let conflicto=false;
    for(const w of escrituras){
      if(w.del){await fetch(BASE+w.ref.id,{method:'DELETE'});continue;}
      const r=await (await fetch(BASE+w.ref.id,{method:'POST',body:JSON.stringify({data:w.data,merge:w.merge,expected:lecturas[w.ref.id]})})).json();
      if(!r.ok){conflicto=true;break;}
    }
    if(!conflicto)return;
  }
  throw new Error('transacción con demasiados conflictos');
}
