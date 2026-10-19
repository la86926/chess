/* Aprende Ajedrez · lectura en voz alta del globo del tutor
   ------------------------------------------------------------------
   - Lee en español (de México si el dispositivo tiene esa voz) cada texto nuevo del globo.
   - Entiende la notación de ajedrez: «Cxg4+» se lee «caballo por ge cuatro, jaque».
   - Se calla al instante si cambia la lección, si se sale de la lección o de la sección.
   - La bocina (entre «Solución» y «Compartir») la silencia para siempre; tocarla otra vez
     vuelve a leer lo que dice el globo. La preferencia se guarda con clave «aa_» (viaja con el ID).
   - Web, iPhone, iPad y Mac: Web Speech API. App Android: voz nativa del teléfono (PuenteVoz). */
(function(){
  'use strict';
  var CLAVE='aa_voz_v1';
  var texto=document.getElementById('aa-dice'),caja=document.getElementById('aa-tutor');
  if(!texto||!caja)return;

  /* ---------- motor de voz ---------- */
  var puente=null;
  try{if(window.PuenteVoz&&typeof window.PuenteVoz.hablar==='function')puente=window.PuenteVoz;}catch(e){}
  var sintesis=null;
  try{if(!puente&&window.speechSynthesis&&window.SpeechSynthesisUtterance)sintesis=window.speechSynthesis;}catch(e){}
  if(!puente&&!sintesis)return;

  var voz=null;
  function puntaje(v){
    var l=String(v.lang||'').toLowerCase().replace('_','-'),n=String(v.name||'');
    var p=0;
    if(l==='es-mx')p=100;else if(l==='es-us')p=80;else if(l==='es-419')p=75;else if(l.indexOf('es')===0)p=l==='es-es'?40:60;else return -1;
    if(/premium|enhanced|mejorad|natural|neural/i.test(n))p+=12;
    if(/paulina|juan|mónica|monica/i.test(n))p+=4;
    if(v.localService)p+=3;
    return p;
  }
  function elegirVoz(){
    if(!sintesis)return;
    var vs=sintesis.getVoices()||[],mejor=null,pm=-1;
    for(var i=0;i<vs.length;i++){var p=puntaje(vs[i]);if(p>pm){pm=p;mejor=vs[i];}}
    voz=mejor;
  }
  if(sintesis){elegirVoz();try{sintesis.addEventListener('voiceschanged',elegirVoz);}catch(e){sintesis.onvoiceschanged=elegirVoz;}}

  /* ---------- notación de ajedrez → español hablado ---------- */
  var LETRA={a:'a',b:'be',c:'ce',d:'de',e:'e',f:'efe',g:'ge',h:'hache'};
  var PIEZA={R:'rey',D:'dama',T:'torre',A:'alfil',C:'caballo',P:'peón'};
  var CORONA={D:'dama',T:'torre',A:'alfil',C:'caballo'};
  var SIGNO={'!!':'jugada brillante','!':'buena jugada','??':'error grave','?':'error','!?':'jugada interesante','?!':'jugada dudosa'};
  var FIGURA={'♔':'R','♚':'R','♕':'D','♛':'D','♖':'T','♜':'T','♗':'A','♝':'A','♘':'C','♞':'C','♙':'P','♟':'P'};
  function casilla(f,r){return LETRA[f]+' '+r;}
  var SAN=/(^|[\s(\[«"“¿¡,;:—–\/])([RDTACP])?([a-h])?([1-8])?(x)?([a-h])([1-8])(?:=?([DTAC])(?![a-z]))?(\s?e\.\s?p\.|\s?a\.\s?p\.)?([+#])?(!!|\?\?|!\?|\?!|!|\?)?(?=$|[\s).,;:!?»"”\]—–\/])/g;
  function jugada(m,ante,pz,cf,cr,x,f,r,cor,paso,jaque,signo){
    var t='';
    var esCaptura=!!x;
    if(pz){
      t=PIEZA[pz];
      if(cf||cr)t+=' de '+(cf?LETRA[cf]:'')+(cf&&cr?' ':'')+(cr||'')+(esCaptura?' por ':', a ');
      else t+=esCaptura?' por ':' ';
    }else if(cf&&esCaptura){
      t='peón de '+LETRA[cf]+' por ';
    }else if(cf||cr){
      /* sin pieza y con origen: «e2e4» */
      t=(cf?LETRA[cf]:'')+(cr?' '+cr:'')+' a ';
    }
    t+=casilla(f,r);
    if(cor)t+=', y corona '+CORONA[cor];
    if(paso)t+=', al paso';
    if(jaque)t+=jaque==='#'?', jaque mate':', jaque';
    if(signo)t+=', '+SIGNO[signo];
    return ante+t+'\u2063';
  }
  function hablado(s){
    s=String(s||'');
    s=s.replace(/[♔♚♕♛♖♜♗♝♘♞♙♟]/g,function(c){return FIGURA[c];});
    s=s.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE0F}]/gu,'');
    s=s.replace(/\b1\s*[-–]\s*0\b/g,'ganan las blancas').replace(/\b0\s*[-–]\s*1\b/g,'ganan las negras').replace(/½\s*[-–]\s*½|1\/2\s*[-–]\s*1\/2/g,'tablas');
    s=s.replace(/\b([O0])-\1-\1([+#])?/g,function(m,o,j){return 'enroque largo'+(j?(j==='#'?', jaque mate':', jaque'):'')+'\u2063';});
    s=s.replace(/\b([O0])-\1([+#])?/g,function(m,o,j){return 'enroque corto'+(j?(j==='#'?', jaque mate':', jaque'):'')+'\u2063';});
    s=s.replace(/±/g,' ventaja de las blancas ').replace(/∓/g,' ventaja de las negras ').replace(/\+\s?[−-](?=\s|$)/g,' ventaja decisiva de las blancas ').replace(/[−-]\s?\+(?=\s|$)/g,' ventaja decisiva de las negras ').replace(/∞/g,' posición poco clara ');
    /* números de jugada: «12...Cd7» y «12.Cf3» */
    s=s.replace(/(\d+)\s*\.\s*(?:\.\s*){1,2}\s*(?=[RDTACP]?[a-h]?[1-8]?x?[a-h][1-8]|enroque)/g,'$1, las negras: ');
    s=s.replace(/(\d+)\s*\.\s*(?=[RDTACP]?[a-h]?[1-8]?x?[a-h][1-8]|enroque)/g,'$1, ');
    s=s.replace(SAN,jugada);s=s.replace(SAN,jugada);
    /* pausas naturales entre jugadas seguidas */
    s=s.replace(/\u2063\s+(?=\d+, |enroque|(?:rey|dama|torre|alfil|caballo|peón|[a-h]|be|ce|de|efe|ge|hache) [^\s]*)/g,', ').replace(/\u2063/g,'');
    s=s.replace(/\s{2,}/g,' ').replace(/\s+([,.;:!?])/g,'$1');
    return s.trim();
  }

  /* ---------- lectura ---------- */
  var activa=true;try{activa=localStorage.getItem(CLAVE)!=='no';}catch(e){}
  var ultimo='',ultimoT=0,espera=null,desbloqueada=false;
  function trozos(t){
    var partes=t.match(/[^.!?;:]+[.!?;:]*|[.!?;:]+/g)||[t],out=[],cur='';
    for(var i=0;i<partes.length;i++){
      if((cur+partes[i]).length>180&&cur){out.push(cur.trim());cur='';}
      cur+=partes[i];
    }
    if(cur.trim())out.push(cur.trim());
    return out;
  }
  function callar(){
    clearTimeout(espera);
    try{if(puente)puente.callar();else if(sintesis)sintesis.cancel();}catch(e){}
  }
  function hablando(){
    try{if(puente)return typeof puente.hablando==='function'?!!puente.hablando():false;return !!(sintesis&&(sintesis.speaking||sintesis.pending));}catch(e){return false;}
  }
  function decir(t){
    callar();
    if(!t)return;
    if(puente){try{puente.hablar(t);}catch(e){}return;}
    var ps=trozos(t);
    for(var i=0;i<ps.length;i++){
      var u=new SpeechSynthesisUtterance(ps[i]);
      u.lang=voz?voz.lang:'es-MX';if(voz)u.voice=voz;
      u.rate=1;u.pitch=1;u.volume=1;
      sintesis.speak(u);
    }
  }
  function aLaVista(){
    if(document.visibilityState!=='visible')return false;
    var r=caja.getBoundingClientRect();if(!(r.width>0&&r.height>0))return false;
    var v=document.getElementById('v-train');if(v&&!v.classList.contains('active'))return false;
    if(document.querySelector('.aa-tour.open'))return false;
    try{var P=window.parent;if(P&&P!==window&&P.PCTutorial&&P.PCTutorial.abierto())return false;}catch(e){}
    return true;
  }
  function textoGlobo(){
    var c=texto.cloneNode(true),q=c.querySelectorAll('.aa-consigna');
    for(var i=0;i<q.length;i++)q[i].remove();
    return (c.textContent||'').replace(/\s+/g,' ').trim();
  }
  function leer(forzar){
    if(!activa)return;
    if(!aLaVista()){callar();return;}
    var t=textoGlobo();if(!t)return;
    if(!forzar&&t===ultimo&&Date.now()-ultimoT<4000)return;
    ultimo=t;ultimoT=Date.now();
    decir(hablado(t));
  }
  new MutationObserver(function(){clearTimeout(espera);espera=setTimeout(function(){leer(false);},220);})
    .observe(texto,{childList:true,subtree:true,characterData:true});
  /* cambiar de lección: silencio inmediato (el texto nuevo se lee al aparecer) */
  var titulo=document.getElementById('aa-titulo');
  if(titulo)new MutationObserver(function(){callar();ultimo='';}).observe(titulo,{childList:true,subtree:true,characterData:true});
  /* salir de la lección (otra pestaña o ventana) o dejar la página */
  var tabs=document.getElementById('tabs');
  if(tabs)tabs.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.tab');if(b&&b.getAttribute('data-v')!=='train')callar();},true);
  var vt=document.getElementById('v-train');
  if(vt)new MutationObserver(function(){if(!vt.classList.contains('active'))callar();}).observe(vt,{attributes:true,attributeFilter:['class']});
  document.addEventListener('visibilitychange',function(){if(document.visibilityState!=='visible')callar();});
  window.addEventListener('pagehide',callar);
  /* iPhone y iPad solo dejan hablar después de un primer toque */
  document.addEventListener('pointerdown',function(){
    if(desbloqueada||!sintesis)return;desbloqueada=true;
    try{var u=new SpeechSynthesisUtterance(' ');u.volume=0;sintesis.speak(u);}catch(e){}
  },true);

  /* ---------- la bocina ---------- */
  var ICONO_ON='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 9.6c0-.6.5-1.1 1.1-1.1h2.6l4.3-3.6c.5-.4 1.2 0 1.2.6v13c0 .6-.7 1-1.2.6l-4.3-3.6H4.6c-.6 0-1.1-.5-1.1-1.1z"/><path d="M15.6 9.2a4 4 0 0 1 0 5.6"/><path d="M18.4 6.4a8 8 0 0 1 0 11.2"/></svg>';
  var ICONO_OFF='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 9.6c0-.6.5-1.1 1.1-1.1h2.6l4.3-3.6c.5-.4 1.2 0 1.2.6v13c0 .6-.7 1-1.2.6l-4.3-3.6H4.6c-.6 0-1.1-.5-1.1-1.1z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/></svg>';
  var b=document.createElement('button');
  b.type='button';b.id='b-voz';b.className='btn aa-btn-icono aa-btn-voz';
  function pintar(){
    b.innerHTML=activa?ICONO_ON:ICONO_OFF;
    b.classList.toggle('aa-voz-off',!activa);
    b.setAttribute('aria-pressed',activa?'true':'false');
    var t=activa?'Silenciar la lectura':'Leer en voz alta';
    b.title=t;b.setAttribute('aria-label',t);
  }
  b.addEventListener('click',function(){
    activa=!activa;
    try{localStorage.setItem(CLAVE,activa?'si':'no');}catch(e){}
    pintar();
    if(activa)leer(true);else callar();
  });
  function colocar(){
    var izq=document.getElementById('aa-fila-nav-izq'),sh=document.getElementById('b-share');
    if(!izq)return;
    if(sh&&sh.parentNode===izq)izq.insertBefore(b,sh);else izq.appendChild(b);
  }
  pintar();colocar();
  /* si cambia en otro dispositivo (la nube) o en otra pestaña */
  window.addEventListener('storage',function(e){
    if(!e||e.key!==CLAVE)return;
    var v=true;try{v=localStorage.getItem(CLAVE)!=='no';}catch(err){}
    if(v===activa)return;activa=v;pintar();if(!activa)callar();
  });

  window.aaVoz={callar:callar,leer:function(){leer(true);},hablando:hablando,activa:function(){return activa;},hablado:hablado};
})();
