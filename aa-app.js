/* Aprende Ajedrez · capa educativa sobre el tablero de PC1
   ------------------------------------------------------------------
   index3.html contiene el tablero, los botones, chess.js, Stockfish, flechas,
   sonidos y estilos de PC1 (generados por tools/aprende/construir.py). Este
   archivo añade lo propio de Aprende Ajedrez SIN copiar ese código: envuelve o
   sustituye unas pocas funciones globales del entrenador (load, curr, tryMove,
   onSolved, renderHead, renderRef, renderProgress, renderHistorial…) para que
   el mismo tablero sirva a lecciones, demostraciones y ejercicios.

   Partes:
     1. Utilidades y estado
     2. Capa de señales (flechas y marcas con significado fijo)
     3. Tutor (la mascota de la app como guía)
     4. Lecciones: etapas, demostración, ejercicios, comprobación
     5. Descubre la táctica
     6. Progreso, historial y «Continuar aprendiendo»
     7. Niveles
     8. Favoritos (ventana «Guardar favorito» y gestión de carpetas)
     9. Recorrido inicial con la mano animada
    10. Arranque */
(function(){
'use strict';

/* =====================================================================
   1. Utilidades y estado
   ===================================================================== */
var CAT=window.AA_CATALOGO, D=window.AADatos, LEC=window.AA_LECCIONES||{};
var K=D.CLAVES;
var ETAPAS=[
  {k:'descubre',n:'Teoría'},{k:'observa',n:'Teoría'},{k:'comprende',n:'Teoría'},
  {k:'practica',n:'Práctica'},{k:'hazlo',n:'Práctica'},{k:'comprueba',n:'Repaso'}
];
/* Las etapas que ve la persona (sin preguntas de opción múltiple: todo se hace en el tablero).
   Cada una agrupa etapas internas; al tocarla se abre la primera que tenga la lección. */
var GRUPOS=[
  {k:'teoria',n:'Teoría',etapas:['descubre','observa','comprende']},
  {k:'practica',n:'Práctica',etapas:['practica','hazlo']},
  {k:'repaso',n:'Repaso',etapas:['comprueba']}
];
var TAREAS=['practica','hazlo','comprueba'];
function grupoDe(etapa){for(var i=0;i<GRUPOS.length;i++)if(GRUPOS[i].etapas.indexOf(etapa)>=0)return GRUPOS[i];return GRUPOS[0];}
/* etapas que tiene de verdad la lección abierta (algunas no tienen todos los ejercicios) */
function etapasDe(l){return ETAPAS.map(function(e){return e.k;}).filter(function(k){return TAREAS.indexOf(k)<0||(l&&l[k]);});}
function tareasDe(l){return TAREAS.filter(function(k){return l&&l[k];});}
function gruposDe(l){return GRUPOS.map(function(g){var et=g.etapas.filter(function(k){return etapasDe(l).indexOf(k)>=0;});return {k:g.k,n:g.n,etapas:et,hecha:et[et.length-1]};}).filter(function(g){return g.etapas.length;});}
function ultimaTarea(l){var t=tareasDe(l);return t[t.length-1];}
var ETAPAS_TAREA={practica:1,hazlo:1,comprueba:1};
var NOMBRE_PIEZA={p:'peón',n:'caballo',b:'alfil',r:'torre',q:'dama',k:'rey'};
var VELOCIDADES=[0.5,0.75,1,1.5];
var reducirMov=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function el(id){return document.getElementById(id);}
function esc(t){return String(t==null?'':t).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
/* Texto de lección: admite **negrita** y jugadas en notación (se muestran con figuras). */
function rico(t){
  var s=esc(t);
  s=s.replace(/\*\*(.+?)\*\*/g,'<b>$1</b>');
  /* ⟦…⟧: lo que invita a mover («Mueve en el tablero», «blancas/negras») brilla un momento */
  s=s.replace(/⟦(.+?)⟧/g,'<b class="aa-llamado">$1</b>');
  return s;
}
function plano(t){return String(t||'').replace(/\*\*|⟦|⟧/g,'');}
/* «Mueve en el tablero con las blancas/negras»: siempre se dice qué bando mueve */
function pedirMover(lado,resto){return '⟦Mueve en el tablero⟧ con las ⟦'+ladoTexto(lado)+'⟧'+(resto||'.');}
function tieneContenido(id){var l=LEC[id];return !!(l&&l.observa&&l.observa.length&&tareasDe(l).length);}
function ladoDe(fen){return String(fen||'').split(' ')[1]==='b'?'b':'w';}
function ladoTexto(c){return c==='w'?'blancas':'negras';}
function sanDe(fen,uci){
  try{var g=new Chess(fen);var m=g.move({from:uci.slice(0,2),to:uci.slice(2,4),promotion:uci[4]||'q'});return m?m.san:uci;}catch(e){return uci;}
}
function lineaSan(fen,linea){
  var g=new Chess(fen),out=[];
  (linea||[]).forEach(function(u){var m=g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});out.push(m?m.san:u);});
  return out;
}
function sanEs(s){return String(s||'').replace(/K/g,'R').replace(/Q/g,'D').replace(/R(?=[a-h1-8x])/g,'T').replace(/B(?=[a-h1-8x])/g,'A').replace(/N/g,'C');}
function prefs(){return D.leer(K.prefs);}
function guardarPref(k,v){var p=prefs();p[k]=v;p.t=Date.now();D.guardar(K.prefs,p);}

var A={
  id:null, lec:null, etapa:'descubre', modo:'leccion',
  paso:0, sencillo:false, reproduciendo:false, temporizador:null, revelar:null,
  tarea:null, pistas:0, errores:0, resuelta:false, intentoRegistrado:false,
  casillasElegidas:[], descubreItem:null, volverA:null, bloqueado:false,
  capa:{flechas:[],marcas:[]},
  auto:true, autoT:null   /* reproducción automática de la lección (‹ · Pausar · ›) */
};
A.velocidad=(function(){var v=Number(prefs().velocidad);return VELOCIDADES.indexOf(v)>=0?v:1;})();

/* =====================================================================
   2. Capa de señales sobre el tablero
   Significados fijos en todas las lecciones (y nunca solo por color):
     mov      jugada               dorado, línea continua
     ataque   ataque propio        rojo, línea gruesa
     amenaza  amenaza del rival    rojo, discontinua
     defensa  defensa              verde, punteada
     linea    línea de influencia  azul, trazos largos
   Marcas: amenazada (anillo rojo + «!»), defendida (verde + «✓»),
   indefensa (naranja discontinuo + «?»), clave (rombo dorado),
   jaque (resplandor rojo + «+»), escape (punto azul), bloqueada (× gris).
   ===================================================================== */
var SENAL={
  mov:{n:'Jugada',c:'var(--aa-mov)',w:.17,d:''},
  ataque:{n:'Ataque',c:'var(--aa-ataque)',w:.2,d:''},
  amenaza:{n:'Amenaza',c:'var(--aa-ataque)',w:.15,d:'.28 .18'},
  defensa:{n:'Defensa',c:'var(--aa-defensa)',w:.15,d:'.04 .2'},
  linea:{n:'Línea',c:'var(--aa-linea)',w:.13,d:'.5 .22'}
};
var MARCA={
  amenazada:{n:'Amenazada',g:'!'},defendida:{n:'Defendida',g:'✓'},indefensa:{n:'Sin defensa',g:'?'},
  clave:{n:'Clave',g:''},jaque:{n:'Jaque',g:'+'},escape:{n:'Escape',g:''},bloqueada:{n:'Cerrada',g:'×'}
};
function coord(sq){var f='abcdefgh'.indexOf(sq[0]),r=Number(sq[1]);return state.orient==='w'?{x:f+.5,y:8-r+.5}:{x:7-f+.5,y:r-1+.5};}
function svgFlecha(f,i,animar){
  var tipo=SENAL[f[2]]?f[2]:'mov',S=SENAL[tipo];
  var a=coord(f[0]),b=coord(f[1]);
  var dx=Math.abs(b.x-a.x),dy=Math.abs(b.y-a.y),pts=[a,b];
  if(tipo==='mov'&&((Math.round(dx)===1&&Math.round(dy)===2)||(Math.round(dx)===2&&Math.round(dy)===1)))pts=Math.round(dy)===2?[a,{x:a.x,y:b.y},b]:[a,{x:b.x,y:a.y},b];
  var p0=pts[0],p1=pts[1],ax=p1.x-p0.x,ay=p1.y-p0.y,la=Math.hypot(ax,ay);if(!la)return '';
  var ini={x:p0.x+ax/la*.28,y:p0.y+ay/la*.28};
  var pn=pts[pts.length-1],pm=pts[pts.length-2],bx=pn.x-pm.x,by=pn.y-pm.y,lb=Math.hypot(bx,by);
  var ux=bx/lb,uy=by/lb,L=.4,W=.5,base={x:pn.x-ux*L,y:pn.y-uy*L},qx=-uy*W/2,qy=ux*W/2;
  var d='M'+ini.x+' '+ini.y;for(var k=1;k<pts.length-1;k++)d+=' L'+pts[k].x+' '+pts[k].y;d+=' L'+base.x+' '+base.y;
  var largo=0,prev=ini;pts.slice(1,-1).concat([base]).forEach(function(p){largo+=Math.hypot(p.x-prev.x,p.y-prev.y);prev=p;});
  var anim=animar&&!reducirMov;
  return '<g class="aa-flecha t-'+tipo+(anim?' anim':'')+'" style="--largo:'+largo.toFixed(3)+';animation-delay:'+(anim?0:0)+'s">'+
    '<path d="'+d+'" fill="none" stroke="'+S.c+'" stroke-width="'+S.w+'" stroke-linecap="'+(S.d?'round':'butt')+'" stroke-linejoin="round"'+(S.d?' stroke-dasharray="'+S.d+'"':'')+' opacity=".86"/>'+
    '<polygon points="'+pn.x+','+pn.y+' '+(base.x+qx)+','+(base.y+qy)+' '+(base.x-qx)+','+(base.y-qy)+'" fill="'+S.c+'" opacity=".92"/></g>';
}
function svgMarca(m,animar){
  var tipo=MARCA[m[1]]?m[1]:'clave',c=coord(m[0]),cls='aa-marca t-'+tipo+(animar&&!reducirMov?' anim':'');
  var g='';
  if(tipo==='clave')g='<rect x="'+(c.x-.17)+'" y="'+(c.y-.17)+'" width=".34" height=".34" transform="rotate(45 '+c.x+' '+c.y+')" fill="var(--aa-mov)" opacity=".82"/><rect x="'+(c.x-.47)+'" y="'+(c.y-.47)+'" width=".94" height=".94" rx=".08" fill="none" stroke="var(--aa-mov)" stroke-width=".05" opacity=".75"/>';
  else if(tipo==='escape')g='<circle cx="'+c.x+'" cy="'+c.y+'" r=".13" fill="var(--aa-linea)" opacity=".85"/>';
  else if(tipo==='bloqueada')g='<path d="M'+(c.x-.18)+' '+(c.y-.18)+'L'+(c.x+.18)+' '+(c.y+.18)+'M'+(c.x+.18)+' '+(c.y-.18)+'L'+(c.x-.18)+' '+(c.y+.18)+'" stroke="var(--aa-gris)" stroke-width=".07" stroke-linecap="round"/>';
  else{
    var col=tipo==='defendida'?'var(--aa-defensa)':tipo==='indefensa'?'var(--aa-indefensa)':'var(--aa-ataque)';
    var dash=tipo==='indefensa'?' stroke-dasharray=".14 .09"':'';
    if(tipo==='jaque')g+='<circle cx="'+c.x+'" cy="'+c.y+'" r=".46" fill="url(#aaJaque)"/>';
    g+='<circle cx="'+c.x+'" cy="'+c.y+'" r=".44" fill="none" stroke="'+col+'" stroke-width=".065"'+dash+'/>';
    var glifo=MARCA[tipo].g;
    if(glifo)g+='<circle cx="'+(c.x+.32)+'" cy="'+(c.y-.32)+'" r=".15" fill="'+col+'"/><text x="'+(c.x+.32)+'" y="'+(c.y-.32)+'" text-anchor="middle" dominant-baseline="central" font-size=".2" font-weight="700" fill="#fff" font-family="system-ui,sans-serif">'+glifo+'</text>';
  }
  return '<g class="'+cls+'">'+g+'</g>';
}
function pintarCapa(animar){
  var vieja=boardEl.querySelector('.aa-capa');if(vieja)vieja.remove();
  var F=A.capa.flechas||[],M=A.capa.marcas||[];
  if(F.length||M.length){
    var svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
    svg.setAttribute('viewBox','0 0 8 8');svg.setAttribute('class','aa-capa');svg.setAttribute('aria-hidden','true');
    svg.innerHTML='<defs><radialGradient id="aaJaque"><stop offset="0" stop-color="#e0533d" stop-opacity=".55"/><stop offset="1" stop-color="#e0533d" stop-opacity="0"/></radialGradient></defs>'+
      M.map(function(m){return svgMarca(m,animar);}).join('')+F.map(function(f,i){return svgFlecha(f,i,animar);}).join('');
    boardEl.appendChild(svg);
  }
  pintarLeyenda();
}
function pintarLeyenda(){
  var cont=el('aa-leyenda');if(!cont)return;
  var tipos={},marcas={};
  (A.capa.flechas||[]).forEach(function(f){tipos[SENAL[f[2]]?f[2]:'mov']=1;});
  (A.capa.marcas||[]).forEach(function(m){marcas[MARCA[m[1]]?m[1]:'clave']=1;});
  /* lo mínimo: sin las señales que se entienden solas (jugada, casilla clave, jaque) y como mucho tres */
  delete tipos.mov;delete marcas.clave;delete marcas.jaque;
  var h='',n=0;
  Object.keys(tipos).forEach(function(t){if(++n>3)return;h+='<span class="aa-ley"><svg viewBox="0 0 30 10" aria-hidden="true"><line x1="2" y1="5" x2="22" y2="5" stroke="'+SENAL[t].c+'" stroke-width="'+(SENAL[t].w*14)+'"'+(SENAL[t].d?' stroke-dasharray="'+SENAL[t].d.split(' ').map(function(x){return x*14;}).join(' ')+'" stroke-linecap="round"':'')+'/><polygon points="29,5 21,1 21,9" fill="'+SENAL[t].c+'"/></svg>'+SENAL[t].n+'</span>';});
  Object.keys(marcas).forEach(function(t){if(++n>3)return;h+='<span class="aa-ley"><i class="aa-ley-marca t-'+t+'">'+esc(MARCA[t].g)+'</i>'+MARCA[t].n+'</span>';});
  /* la fila de la leyenda siempre ocupa su lugar (vacía o no): así el globo del tutor no se mueve */
  cont.innerHTML=h;cont.hidden=false;cont.classList.toggle('vacia',!h);
}
function fijarCapa(flechas,marcas,animar){A.capa={flechas:(flechas||[]).slice(),marcas:(marcas||[]).slice()};pintarCapa(animar);}
function limpiarCapa(){fijarCapa([],[]);}

/* Cada vez que el entrenador vuelve a dibujar el tablero, se repinta la capa. */
var renderBoardBase=renderBoard;
renderBoard=function(){var r=renderBoardBase.apply(this,arguments);try{pintarCapa(false);if(A.tarea&&A.tarea.tipo==='casilla')pintarCasillasElegidas();}catch(e){}return r;};

/* En la demostración, la lista de jugadas muestra lo que ya ocurrió en el tablero. */
var renderMovesBase=renderMoves;
renderMoves=function(){
  if(A.bloqueado&&!A.tarea&&state.game){
    var h=state.game.history({verbose:true}),ml=el('movelist');
    if(!h.length){ml.innerHTML='<span style="color:var(--muted2)">Las jugadas de la demostración aparecerán aquí.</span>';return;}
    var html='',num=Number(state.game.fen().split(' ')[5])||1;
    var g=new Chess(state.fen);var n=Number(state.fen.split(' ')[5])||1;
    h.forEach(function(m,k){if(m.color==='w'){html+='<span class="num">'+n+'.</span>';}else if(k===0){html+='<span class="num">'+n+'...</span>';}if(m.color==='b')n++;html+='<span class="ply u'+(k===h.length-1?' now':'')+'">'+figurina(m.san)+'</span> ';});
    ml.innerHTML=html;return;
  }
  return renderMovesBase.apply(this,arguments);
};

/* Muestra una posición en el tablero de PC1. libre=true permite mover las piezas. */
function mostrarPosicion(fen,opc){
  opc=opc||{};
  try{detenerSolucion();}catch(e){}
  try{detenerMotor();}catch(e){}
  var g=new Chess(fen);
  (opc.jugadas||[]).forEach(function(u){g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});});
  state.game=g;state.fen=fen;state.uci=[];state.san=[];state.step=0;
  state.freemode=!!opc.libre;state.busy=!opc.libre;state.sel=null;state.premove=null;state.destPend=null;
  state.anaMoves=opc.libre?g.history({verbose:true}):null;state.anaPtr=state.anaMoves?state.anaMoves.length:0;
  state.viewBack=false;state.liveMoves=null;state.lastMove=null;
  if(opc.orient)state.orient=opc.orient;
  try{stockfishPedido=false;}catch(e){}
  mostrarBarraAnalisis(!!opc.libre);
  anot().lista=[];
  A.bloqueado=!opc.libre;
  if(opc.sinAnimar)state.sinAnimacion=true;
  try{renderBoard();renderMoves();}finally{state.sinAnimacion=false;}
}
/* En demostraciones y preguntas el tablero no admite jugadas (ni premoves). */
boardEl.addEventListener('pointerdown',function(e){
  if(anot().modo)return;
  if(A.tarea&&A.tarea.tipo==='casilla'){e.preventDefault();e.stopImmediatePropagation();tocarCasilla(e);return;}
  if(A.bloqueado){e.preventDefault();e.stopImmediatePropagation();}
},true);

/* =====================================================================
   3. Tutor
   ===================================================================== */
var tutorTexto=el('aa-dice'),tutorCaja=el('aa-tutor');
var dichos=[];
function tutor(texto,tono){
  /* Mientras el ejercicio no esté resuelto, debajo de cada mensaje (acierto parcial, error o pista)
     se repite lo que hay que hacer, para no perder la consigna. */
  var recordar=(A.consigna&&A.tarea&&!A.resuelta&&plano(texto)!==plano(A.consigna))?'<span class="aa-consigna">'+rico(A.consigna)+'</span>':'';
  tutorTexto.innerHTML=rico(texto)+recordar;
  /* el globo tiene siempre 4 renglones (los botones no se mueven): si el recordatorio no cabe, se omite */
  if(recordar&&tutorTexto.scrollHeight>tutorTexto.clientHeight+2)tutorTexto.innerHTML=rico(texto);
  tutorTexto.scrollTop=0;
  tutorCaja.dataset.tono=tono||'';
  tutorCaja.classList.remove('habla');void tutorCaja.offsetWidth;tutorCaja.classList.add('habla');
  var limpio=plano(texto);
  if(limpio&&dichos[0]!==limpio){dichos.unshift(limpio);if(dichos.length>12)dichos.length=12;}
  var full=el('ref-full');if(full)full.innerHTML=dichos.map(function(d){return '<p>'+esc(d)+'</p>';}).join('');
  pintarAyudas();
}
/* secundario=true: el botón queda discreto (p. ej. «Saltar ejercicio») para que lo principal sea mover en el tablero */
function botonContinuar(texto,visible,secundario){
  var b=el('aa-continuar');b.firstChild.nodeValue=texto||'Continuar';
  /* En las lecciones se avanza con ‹ · Pausar · › y, al terminar, con «Lección y» (que brilla):
     el botón del globo no se muestra */
  if(enLeccionConContenido())visible=false;
  b.hidden=visible===false;b.classList.toggle('principal',!secundario);
}
function enLeccionConContenido(){return A.modo==='leccion'&&!!A.lec&&tieneContenido(A.id);}

/* =====================================================================
   4. Lecciones
   ===================================================================== */
function catalogoDe(id){return CAT.porId[id];}
function nombreNivel(n){var nv=CAT.niveles[n-1];return nv?nv.nombre:'';}

/* Objeto «ejercicio» con el formato que espera el tablero de PC1. */
function comoEjercicio(t,id){
  var o=ladoDe(t.fen);
  return {n:id,lv:'F',fen:t.fen,o:t.orient||o,u:(t.linea||[]).slice(),ln:lineaSan(t.fen,t.linea),w:'',b:'',ev:'',tg:[],v:(t.linea&&t.linea.length)?1:0,full:''};
}
var ejercicioActual=PUZZLES[0];
curr=function(){return ejercicioActual;};

/* Cabecera: «NIVEL DOS · LECCIÓN 4» + título + corazón */
renderHead=function(){
  if(A.modo==='descubre'){
    el('aa-eyebrow').textContent='REPASO';
    el('aa-titulo').textContent=A.descubreItem&&A.descubreItem.revelado?A.descubreItem.motivo:'¿Qué táctica esconde?';
    var c=el('chip');c.textContent=A.descubreItem&&A.descubreItem.revelado?'Revelada':'Sin pistas del tema';c.className='chip I';
  }else{
    var cat=catalogoDe(A.id);
    el('aa-eyebrow').textContent=cat?CAT.etiqueta(A.id):'';
    el('aa-titulo').textContent=cat?cat.titulo:'Aprende Ajedrez';
    var chip=el('chip'),est=estadoLeccion(A.id);
    chip.textContent=est==='completada'?'Completada':est==='iniciada'?'En curso':tieneContenido(A.id)?'Por empezar':'En preparación';
    chip.className='chip '+(est==='completada'?'F':est==='iniciada'?'I':'A');
  }
  el('toplay').innerHTML=A.modo==='descubre'||A.tarea?('Juegan: <b>'+(state.orient==='w'?'Blancas':'Negras')+'</b>'):('Mueven: <b>'+(ladoDe(state.game&&state.game.fen())==='w'?'Blancas':'Negras')+'</b>');
  el('exno').textContent=A.id||'';
  actualizarCorazon();
  pintarNavLecciones();
};
/* Botones de abajo: «◂ Lección 1» y «Lección 3 ▸» (la anterior y la siguiente del temario) */
function etiquetaLeccion(id){
  var c=catalogoDe(id),act=catalogoDe(A.id);if(!c)return '';
  /* si cambia de nivel, más corto para que quepa en el móvil: «Nivel II · 38» */
  return act&&act.nivel!==c.nivel?'Nivel '+CAT.romano[c.nivel]+' · '+c.num:'Lección '+c.num;
}
function pintarNavLecciones(){
  var ant=el('b-prev-top'),sig=el('b-next-top');if(!ant||!sig)return;
  /* el símbolo arriba y el nombre de la lección debajo */
  var TRI={'◂':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.5 4.5v15L5 12z"/></svg>','▸':'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 4.5v15L19 12z"/></svg>'};
  function poner(b,simbolo,txt){b.innerHTML='<b aria-hidden="true">'+TRI[simbolo]+'</b><span>'+esc(txt)+'</span>';}
  if(A.modo==='descubre'){sig.classList.toggle('aa-listo',!!(A.descubreItem&&A.descubreItem.resuelto));ant.hidden=true;sig.hidden=false;poner(sig,'▸','Otra posición');sig.setAttribute('aria-label','Otra posición');sig.removeAttribute('title');return;}
  var i=CAT.lista.findIndex(function(c){return c.id===A.id;});
  var a=i>0?CAT.lista[i-1].id:null,b=i>=0&&i<CAT.lista.length-1?CAT.lista[i+1].id:null;
  ant.hidden=!a;sig.hidden=!b;
  if(a){poner(ant,'◂',etiquetaLeccion(a));ant.title=catalogoDe(a).titulo;ant.setAttribute('aria-label','Ir a la '+etiquetaLeccion(a).toLowerCase()+': '+catalogoDe(a).titulo);}
  /* al resolver el último ejercicio, «Lección y» se ilumina para invitar a seguir */
  /* también al volver a una lección ya terminada: está lista para pasar a la siguiente */
  var listo=A.modo==='leccion'&&!!A.lec&&((A.resuelta&&A.etapa===ultimaTarea(A.lec))||estadoLeccion(A.id)==='completada');
  sig.classList.toggle('aa-listo',!!(b&&listo));
  if(b){poner(sig,'▸',etiquetaLeccion(b));sig.title=catalogoDe(b).titulo;sig.setAttribute('aria-label','Ir a la '+etiquetaLeccion(b).toLowerCase()+': '+catalogoDe(b).titulo);}
}
renderRef=function(){
  var l=A.lec,cat=catalogoDe(A.id);
  el('ref-vs').textContent=A.modo==='descubre'?'Repaso':(cat?cat.titulo:'—');
  el('ref-ev').textContent=A.modo==='descubre'?'':(cat?nombreNivel(cat.nivel)+' · '+CAT.niveles[cat.nivel-1].sub:'');
  el('ref-tags').innerHTML='';
  var nota=el('ref-note');
  if(A.modo==='descubre'){nota.textContent=A.descubreItem&&A.descubreItem.revelado?('Era: '+A.descubreItem.motivo+'.'):'La idea se revela al terminar.';nota.style.display='block';}
  else if(l&&l.idea){nota.innerHTML=rico(l.idea);nota.style.display='block';}
  else{nota.textContent='Esta lección está en preparación: pronto tendrá demostración, ejercicios y comprobación.';nota.style.display='block';}
};

function estadoLeccion(id){var p=D.leer(K.progreso).lecciones[id];return p?p.estado:'';}
function etapasHechas(id){var p=D.leer(K.progreso).lecciones[id];return p?p.etapasHechas:[];}
function marcarEtapa(etapa){
  if(A.modo!=='leccion'||!A.id)return;
  var antes=estadoLeccion(A.id);
  var r=D.actualizarLeccion(A.id,function(r){
    if(r.etapasHechas.indexOf(etapa)<0)r.etapasHechas.push(etapa);
    r.etapa=A.etapa;
    if(r.estado!=='completada'&&tareasDe(A.lec).every(function(e){return r.etapasHechas.indexOf(e)>=0;})){r.estado='completada';r.completadaEn=Date.now();}
  });
  if(r.estado==='completada'&&antes!=='completada'){
    D.registrarEvento('completada',A.id);
    lanzarConfeti(110);
  }
  pintarEtapas();renderHead();renderProgress();
}

/* ---- Pasos numerados ----
   Cada número de la columna junto al tablero es UN solo paso de la lección:
   1 exploración, uno por cada paso de la demostración, el resumen y uno por cada ejercicio.
   ‹ y › (y la reproducción automática) avanzan de número en número. */
var NOMBRE_PASO={descubre:'Exploración',comprende:'Resumen',practica:'Ejercicio',hazlo:'Ejercicio',comprueba:'Repaso'};
function pasosDe(l){
  if(!l)return [];
  var out=[{etapa:'descubre',clave:'descubre'}];
  (l.observa||[]).forEach(function(_,i){out.push({etapa:'observa',paso:i,clave:'observa:'+i});});
  out.push({etapa:'comprende',clave:'comprende'});
  tareasDe(l).forEach(function(k){out.push({etapa:k,clave:k});});
  return out;
}
function indicePaso(){
  var ps=pasosDe(A.lec);
  for(var i=0;i<ps.length;i++){if(ps[i].etapa===A.etapa&&(A.etapa!=='observa'||ps[i].paso===A.paso))return i;}
  return -1;
}
function pasoHecho(p,hechas){
  if(hechas.indexOf(p.clave)>=0)return true;
  /* avance guardado antes de numerar cada paso: la demostración entera contaba como «observa» */
  return p.etapa==='observa'&&hechas.indexOf('observa')>=0;
}
function irAPaso(i){
  var ps=pasosDe(A.lec),p=ps[i];if(!p)return;
  if(p.etapa==='observa'&&A.etapa==='observa'&&A.demo){irPasoDemo(p.paso,p.paso===A.paso+1);guardarUltimo();pintarControles();return;}
  irAEtapa(p.etapa,p.etapa==='observa'?{paso:p.paso}:{});
}
/* Un paso de Teoría (exploración, demostración, resumen) queda en verde cuando se miró el tiempo
   suficiente para leerlo; pasar por él con un clic no cuenta. Los ejercicios, solo al resolverlos. */
function programarVisto(clave,ms){
  clearTimeout(A.vistoT);
  var id=A.id,etapa=A.etapa,paso=A.paso;
  A.vistoT=setTimeout(function mirar(){
    if(A.modo!=='leccion'||A.id!==id||A.etapa!==etapa||A.paso!==paso)return;
    if(!leccionALaVista()){A.vistoT=setTimeout(mirar,700);return;}
    marcarEtapa(clave);
  },Math.round(Math.max(1500,ms*0.85)));
}
function pintarEtapas(){
  var nav=el('aa-etapas'),hechas=A.modo==='leccion'?etapasHechas(A.id):[];
  if(A.modo!=='leccion'||!tieneContenido(A.id)){nav.innerHTML='';nav.hidden=true;pintarRuta();return;}
  nav.hidden=false;
  var ps=pasosDe(A.lec),actual=indicePaso(),obs=0;
  nav.innerHTML=ps.map(function(p,i){
    var h=pasoHecho(p,hechas),act=i===actual;
    var nombre=p.etapa==='observa'?('Demostración '+(++obs)):NOMBRE_PASO[p.etapa];
    return '<button type="button" class="aa-etapa'+(act?' activa':'')+(h?' hecha':'')+'" data-paso="'+i+'" aria-current="'+(act?'step':'false')+'" aria-label="Paso '+(i+1)+' de '+ps.length+': '+nombre+(h?' (hecho)':'')+'"><i><b>'+(i+1)+'</b></i></button>';
  }).join('');
  ajustarPasos();
  pintarRuta();
}
/* tamaño de los círculos: caben todos a la altura del tablero (si son muchos, la columna se desplaza) */
function ajustarPasos(){
  var nav=el('aa-etapas');if(!nav||nav.hidden)return;
  var n=nav.children.length;if(!n)return;
  var alto=boardEl.getBoundingClientRect().height;if(!alto)return;
  var ancho=window.innerWidth||800,maxT=ancho<=600?32:36,minT=ancho<=600?24:28,sep=ancho<=600?4:6;
  var t=Math.max(minT,Math.min(maxT,Math.floor((alto-6-(n-1)*sep)/n)));
  nav.style.setProperty('--aa-paso',t+'px');nav.style.setProperty('--aa-sep',sep+'px');
  nav.style.maxHeight=Math.round(alto)+'px';
  /* el paso actual siempre a la vista (solo dentro de la columna: la página no se mueve) */
  var act=nav.querySelector('.activa');
  if(act&&nav.scrollHeight>nav.clientHeight){var y=act.offsetTop-(nav.clientHeight-act.offsetHeight)/2;try{nav.scrollTo({top:Math.max(0,y),behavior:'smooth'});}catch(e){nav.scrollTop=Math.max(0,y);}}
}
window.addEventListener('resize',function(){clearTimeout(ajustarPasos.t);ajustarPasos.t=setTimeout(ajustarPasos,120);});
el('aa-etapas').addEventListener('click',function(e){
  var b=e.target.closest('[data-paso]');if(!b)return;
  /* se abre siempre el paso elegido, aunque no se hayan hecho los anteriores */
  irAPaso(Number(b.dataset.paso));
});

function pintarRuta(){
  var r=el('aa-ruta');if(!r)return;
  if(A.modo!=='leccion'||!tieneContenido(A.id)){r.innerHTML='<li class="aa-ruta-vacia">'+(A.modo==='descubre'?'Estás en Repaso.':'Esta lección todavía no tiene actividades.')+'</li>';return;}
  var hechas=etapasHechas(A.id);
  r.innerHTML=ETAPAS.filter(function(e){return etapasDe(A.lec).indexOf(e.k)>=0;}).map(function(e){var h=hechas.indexOf(e.k)>=0;return '<li class="'+(A.etapa===e.k?'activa ':'')+(h?'hecha':'')+'"><button type="button" data-etapa="'+e.k+'">'+(h?'✓ ':'')+e.n+'</button></li>';}).join('');
}
el('aa-ruta').addEventListener('click',function(e){var b=e.target.closest('[data-etapa]');if(b)irAEtapa(b.dataset.etapa);});

/* ---- Abrir una lección ---- */
function abrirLeccion(id,opc){
  opc=opc||{};
  if(!catalogoDe(id))id=CAT.lista[0].id;
  pararDemo();
  /* cada lección empieza reproduciéndose sola; si solo se sigue a otro dispositivo, queda en pausa
     (así dos pantallas abiertas a la vez no avanzan cada una por su cuenta) */
  A.auto=!opc.seguir;pintarPausa();
  quitarBotonIrLeccion();
  A.modo='leccion';A.id=id;A.lec=LEC[id]||null;A.descubreItem=null;A.tarea=null;
  A.volverA=opc.volverA||null;
  pintarVolver();
  irAPestanaLeccion();
  if(!tieneContenido(id)){
    A.etapa='';
    mostrarPosicion('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',{orient:'w',sinAnimar:true});
    limpiarCapa();
    modoControles('vacia');
    ejercicioActual=PUZZLES[0];
    renderHead();renderRef();pintarEtapas();
    tutor('«'+catalogoDe(id).titulo+'» está en preparación. Pronto tendrá demostración y ejercicios.');
    botonContinuar('Siguiente lección disponible');
    pintarControles();
    guardarUltimo();
    return;
  }
  var p=D.leer(K.progreso).lecciones[id];
  if(!p)D.actualizarLeccion(id,function(r){r.etapa='descubre';});
  registrarVisita(id);
  var etapa=opc.etapa||(p&&p.etapa)||'descubre';
  irAEtapa(etapa,{paso:opc.paso,jugadas:opc.jugadas,restaurando:!!opc.restaurando});
}
window.aaAbrirLeccion=function(id){abrirLeccion(String(id||'').toUpperCase());};

var ultimaVisita={};
function registrarVisita(id){
  var t=Date.now();if(ultimaVisita[id]&&t-ultimaVisita[id]<30*60000)return;
  var h=D.leer(K.historial).eventos;
  for(var i=0;i<h.length&&i<20;i++){if(h[i].leccion===id&&h[i].tipo==='visita'&&t-h[i].t<30*60000){ultimaVisita[id]=h[i].t;return;}}
  ultimaVisita[id]=t;D.registrarEvento('visita',id);
}

/* ---- Mascota en la Sección 1 ----
   La mascota grande sobre el tablero no se usa aquí (se oculta por CSS). La del tutor, junto al globo,
   cobra vida al resolver un ejercicio: baila con la guitarra, suben notas musicales y cada tanto
   levanta la guitarra. Al pasar a otro ítem, lección o pestaña vuelve a quedarse quieta. */
var cara=el('aa-tutor-cara'),festejo={t:[],activo:false};
(function(){
  function nota(c,doble){return doble
    ?'<svg viewBox="0 0 40 40"><path d="M14 30V9l20-5v21" fill="none" stroke="'+c+'" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 13l20-5" stroke="'+c+'" stroke-width="5"/><ellipse cx="10" cy="30" rx="6" ry="5" fill="'+c+'"/><ellipse cx="30" cy="25" rx="6" ry="5" fill="'+c+'"/></svg>'
    :'<svg viewBox="0 0 40 40"><path d="M22 30V6q8 2 10 9" fill="none" stroke="'+c+'" stroke-width="4" stroke-linecap="round"/><ellipse cx="17" cy="30" rx="7" ry="5.5" fill="'+c+'"/></svg>';}
  var n=cara&&cara.querySelector('.aa-cara-notas');
  if(n)n.innerHTML=[['#FF9FB0',0],['#B9A4F2',1],['#8CC4EC',0],['#F5C96A',1]].map(function(x,i){return '<i class="n'+(i+1)+'">'+nota(x[0],x[1])+'</i>';}).join('');
})();
function posarCara(p){if(cara)cara.dataset.pose=String(p);}
function festejarTutor(){
  if(!cara)return;
  calmarTutor();
  festejo.activo=true;tutorCaja.classList.add('festeja');
  /* levanta la guitarra cuadro por cuadro, la tiene en alto 1 s y la baja; se repite */
  (function ciclo(){
    if(!festejo.activo)return;
    var orden=[1,2,3],t=0;
    orden.forEach(function(p){festejo.t.push(setTimeout(function(){posarCara(p);},t+=85));});
    t+=1000;
    [2,1,0].forEach(function(p){festejo.t.push(setTimeout(function(){posarCara(p);},t+=85));});
    festejo.t.push(setTimeout(ciclo,t+1600));
  })();
}
function calmarTutor(){
  festejo.activo=false;festejo.t.forEach(clearTimeout);festejo.t=[];
  if(tutorCaja)tutorCaja.classList.remove('festeja');posarCara(0);
}
function quitarMascota(){calmarTutor();try{if(window.pcMascota)pcMascota.quitar();}catch(e){}}
function irAEtapa(etapa,opc){
  opc=opc||{};
  quitarMascota();
  if(A.modo!=='leccion'||!A.lec)return;
  if(etapa==='repasa')etapa='comprueba'; /* «Reforzar» y «Repaso» ahora son una sola etapa: Repaso */
  if(!ETAPAS.some(function(e){return e.k===etapa;}))etapa='descubre';
  /* si la lección ya no tiene esa etapa (p. ej. se quitó un ejercicio), va a la siguiente que tenga */
  if(etapasDe(A.lec).indexOf(etapa)<0){var orden=ETAPAS.map(function(e){return e.k;}),i0=orden.indexOf(etapa);etapa=orden.slice(i0).filter(function(k){return etapasDe(A.lec).indexOf(k)>=0;})[0]||'descubre';}
  pararDemo();el('aa-reintentar').hidden=true;
  A.etapa=etapa;A.tarea=null;A.sencillo=!!opc.sencillo;A.consigna=null;
  el('aa-opciones').hidden=true;el('aa-opciones').innerHTML='';
  if(etapa==='descubre')etapaDescubre();
  else if(etapa==='observa')etapaObserva(opc.paso||0,opc);
  else if(etapa==='comprende')etapaComprende();
  else iniciarTarea(etapa,A.lec[etapa],opc);
  D.actualizarLeccion(A.id,function(r){r.etapa=etapa;});
  pintarEtapas();renderHead();renderRef();
  guardarUltimo();
  pintarControles();planificarAuto();
}
function siguienteEtapa(){
  var sig=etapaVecina(1);
  if(sig)irAEtapa(sig);
  else irLeccionRelativa(1);
}

/* ---- 1. Descubre ---- */
function etapaDescubre(){
  var d=A.lec.descubre;
  modoControles('libre');
  mostrarPosicion(d.fen,{libre:true,orient:d.orient||ladoDe(d.fen),sinAnimar:true});
  fijarCapa(d.flechas,d.marcas,true);
  ejercicioActual=comoEjercicio({fen:d.fen,orient:d.orient},A.id);
  /* el globo cabe en 4 renglones: el título de la lección ya dice de qué trata */
  tutor(d.di);
  botonContinuar('Ver la demostración');
  programarVisto('descubre',tiempoLectura(plano(tutorTexto.textContent)));
}

/* ---- 2. Observa (demostración paso a paso) ---- */
function posicionesDemo(){
  var pasos=A.lec.observa,fenBase=A.lec.descubre.fen,jug=[],out=[];
  pasos.forEach(function(p){
    if(p.fen){fenBase=p.fen;jug=[];}
    if(p.jugada)jug=jug.concat([p.jugada]);
    out.push({fen:fenBase,jugadas:jug.slice(),paso:p});
  });
  return out;
}
function etapaObserva(paso,opc){
  modoControles('demo');
  A.demo=posicionesDemo();
  A.paso=Math.max(0,Math.min(paso||0,A.demo.length-1));
  var o=A.lec.observa[0].orient||A.lec.descubre.orient||ladoDe(A.lec.descubre.fen);
  var p=A.demo[A.paso];
  mostrarPosicion(p.fen,{jugadas:p.jugadas,orient:o,sinAnimar:true});
  ejercicioActual=comoEjercicio({fen:state.game.fen(),orient:o},A.id);
  mostrarPasoDemo(false);
  if(A.sencillo)reproducirDemo();
}
function mostrarPasoDemo(animarJugada){
  var p=A.demo[A.paso],S=p.paso;
  clearTimeout(A.revelar);
  var texto=(A.sencillo&&S.sencillo)?S.sencillo:S.di;
  var flechas=S.flechas||[],marcas=S.marcas||[];
  if(A.sencillo&&(flechas.length+marcas.length)>1){
    /* Explícame otra vez: cada amenaza y cada flecha aparece por separado */
    var todo=marcas.map(function(m){return {m:m};}).concat(flechas.map(function(f){return {f:f};}));
    var vis={f:[],m:[]},i=0;
    fijarCapa([],[]);
    var espera=Math.round(1150/A.velocidad);
    (function sig(){
      if(i>=todo.length)return;
      var x=todo[i++];if(x.f)vis.f.push(x.f);else vis.m.push(x.m);
      fijarCapa(vis.f,vis.m,true);
      A.revelar=setTimeout(sig,espera);
    })();
  }else fijarCapa(flechas,marcas,true);
  tutor(texto,A.sencillo?'sencillo':'');
  el('aa-paso-n').textContent=(A.paso+1)+' / '+A.demo.length;
  el('aa-paso-ant').disabled=A.paso===0;
  el('aa-paso-sig').disabled=A.paso>=A.demo.length-1;
  var ultimo=A.paso>=A.demo.length-1;
  botonContinuar(ultimo?'Continuar':'Siguiente paso');
  programarVisto('observa:'+A.paso,duracionPaso());
  pintarEtapas();
  renderHead();
  guardarUltimo();
  pintarControles();planificarAuto();
}
function irPasoDemo(n,animado){
  if(!A.demo)return;
  quitarMascota();
  n=Math.max(0,Math.min(n,A.demo.length-1));
  if(n===A.paso&&!animado)return;
  var adelante=n===A.paso+1,p=A.demo[n];
  A.paso=n;
  if(adelante&&p.paso.jugada&&!p.paso.fen){
    var u=p.paso.jugada,mv=state.game.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});
    if(mv){if(mv.captured)sndCapture();else sndMove();}
    renderBoard();renderMoves();
    if(state.game.in_checkmate())marcarReyMate();
  }else{
    var g=new Chess(p.fen);p.jugadas.forEach(function(x){g.move({from:x.slice(0,2),to:x.slice(2,4),promotion:x[4]||'q'});});
    state.game=g;state.sinAnimacion=!adelante;try{renderBoard();renderMoves();}finally{state.sinAnimacion=false;}
    if(g.in_checkmate())marcarReyMate();
  }
  ejercicioActual=comoEjercicio({fen:state.game.fen(),orient:state.orient},A.id);
  mostrarPasoDemo(true);
}
function duracionPaso(){
  var S=A.demo[A.paso].paso,t=plano((A.sencillo&&S.sencillo)?S.sencillo:S.di);
  var base=1700+t.length*48+((S.flechas||[]).length+(S.marcas||[]).length)*(A.sencillo?1150:250);
  return Math.round(base/A.velocidad);
}
/* ---- Reproducción automática ----
   Toda la lección avanza sola: Teoría (lectura + demostración paso a paso + resumen) → Práctica → Repaso.
   En los ejercicios espera a que el alumno mueva o toque en el tablero; al resolverlos, sigue sola.
   El último ejercicio no avanza solo: al terminarlo, «Lección y» (abajo) se ilumina.
   «Pausar» detiene el avance; «‹» y «›» van a la etapa anterior o siguiente. */
/* ‹ y › van al número anterior o siguiente (‹ apagado en el 1; › apagado en el último). */
function pasoVecino(d){var i=indicePaso(),ps=pasosDe(A.lec);if(i<0)return -1;var j=i+d;return (j>=0&&j<ps.length)?j:-1;}
function etapaVecina(d){var j=pasoVecino(d);return j<0?null:pasosDe(A.lec)[j].etapa;}
function tiempoLectura(txt){return Math.round(Math.max(2600,Math.min(9000,1800+String(txt||'').length*45))/A.velocidad);}
/* solo avanza si la lección se está viendo (no en otra sección del menú, ni con una ventana o el recorrido abiertos) */
function leccionALaVista(){
  if(document.visibilityState!=='visible')return false;
  if(!el('v-train').classList.contains('active'))return false;
  if(boardEl.getBoundingClientRect().width<=0)return false;
  if(document.querySelector('.aa-fv-fondo.open,.aa-tour.open,.modal-bg.open,.confirm-bg.open,[role="dialog"][aria-hidden="false"]'))return false;
  try{var P=window.parent;if(P&&P!==window&&P.PCTutorial&&P.PCTutorial.abierto())return false;}catch(e){}
  return true;
}
function cancelarAuto(){clearTimeout(A.autoT);A.autoT=null;pintarCuenta(0);}
function programarAuto(ms,accion){
  cancelarAuto();
  if(!A.auto||!enLeccionConContenido())return;
  var id=A.id,etapa=A.etapa,paso=A.paso;
  pintarCuenta(ms);
  A.autoT=setTimeout(function esperar(){
    if(!A.auto||A.id!==id||A.etapa!==etapa||A.paso!==paso){A.autoT=null;pintarCuenta(0);return;}
    if(!leccionALaVista()){A.autoT=setTimeout(esperar,700);return;}
    A.autoT=null;pintarCuenta(0);accion();
  },ms);
}
function planificarAuto(){
  cancelarAuto();
  if(!A.auto||!enLeccionConContenido())return;
  var e=A.etapa;
  var siguiente=function(){var j=pasoVecino(1);if(j>=0)irAPaso(j);};
  if(pasoVecino(1)<0)return;
  if(e==='descubre'||e==='comprende')programarAuto(tiempoLectura(plano(tutorTexto.textContent)),siguiente);
  else if(e==='observa'&&A.demo)programarAuto(duracionPaso(),siguiente);
  else if(A.resuelta)programarAuto(Math.max(2800,tiempoLectura(plano(tutorTexto.textContent))),siguiente);
}
/* línea fina bajo «Pausar» que se llena mientras falta poco para avanzar */
function pintarCuenta(ms){
  var c=el('aa-cuenta');if(!c)return;
  c.style.transition='none';c.style.transform='scaleX(0)';
  if(ms>0){void c.offsetWidth;c.style.transition='transform '+ms+'ms linear';c.style.transform='scaleX(1)';}
}
function pintarPausa(){
  var b=el('aa-pausa');if(!b)return;
  b.classList.toggle('en-pausa',!A.auto);
  el('aa-pausa-txt').textContent=A.auto?'Pausar':'Reproducir';
  b.setAttribute('aria-label',A.auto?'Pausar':'Reproducir');b.setAttribute('aria-pressed',String(!A.auto));
}
function pintarControles(){
  pintarAyudas();
  var c=el('aa-controles');if(!c)return;
  var ver=enLeccionConContenido();
  c.hidden=!ver;if(!ver)return;
  var e=A.etapa;
  el('aa-atras').disabled=pasoVecino(-1)<0;
  el('aa-adelante').disabled=pasoVecino(1)<0;
  pintarPausa();
}
function navegarEtapa(d){
  var j=pasoVecino(d);
  if(j>=0)irAPaso(j);
}
el('aa-atras').onclick=function(){navegarEtapa(-1);};
/* «›» da por leído el paso de Teoría actual (exploración, demostración o resumen) y lo pinta de verde;
   los ejercicios siguen marcándose solo al resolverlos. Saltar con los números no cuenta como leído. */
el('aa-adelante').onclick=function(){
  if(A.modo==='leccion'&&tieneContenido(A.id)){
    var p=pasosDe(A.lec)[indicePaso()];
    if(p&&(p.etapa==='descubre'||p.etapa==='observa'||p.etapa==='comprende')&&pasoVecino(1)>=0){clearTimeout(A.vistoT);marcarEtapa(p.clave);}
  }
  navegarEtapa(1);
};
el('aa-pausa').onclick=function(){A.auto=!A.auto;pintarPausa();if(A.auto)planificarAuto();else cancelarAuto();};
/* En Teoría el tablero está libre: si el alumno mueve una pieza, la lección se pausa para que explore tranquilo */
boardEl.addEventListener('pointerdown',function(){
  if(A.auto&&A.modo==='leccion'&&A.etapa==='descubre'&&A.autoT){A.auto=false;cancelarAuto();pintarPausa();}
},true);

/* Compatibilidad con los controles antiguos de la demostración (ocultos) */
function reproducirDemo(){A.auto=true;pintarPausa();planificarAuto();}
function pararDemo(){A.reproduciendo=false;clearTimeout(A.temporizador);clearTimeout(A.revelar);cancelarAuto();}
function pintarPlay(){}
el('aa-play').onclick=function(){el('aa-pausa').click();};
el('aa-paso-ant').onclick=function(){irPasoDemo(A.paso-1);};
el('aa-paso-sig').onclick=function(){irPasoDemo(A.paso+1);};
el('aa-repetir').onclick=function(){A.sencillo=false;irPasoDemo(0,true);};
function pintarVelocidad(){el('aa-velocidad').textContent=String(A.velocidad).replace('.',',')+'×';}
el('aa-velocidad').onclick=function(){var i=VELOCIDADES.indexOf(A.velocidad);A.velocidad=VELOCIDADES[(i+1)%VELOCIDADES.length];guardarPref('velocidad',A.velocidad);pintarVelocidad();if(A.reproduciendo){pararDemo();reproducirDemo();}};
pintarVelocidad();

/* «Explícame otra vez»: vuelve al inicio, más lento, todo por separado y con otra explicación */
el('aa-otra-vez').onclick=function(){
  if(A.modo==='descubre'){pistaDescubre(true);return;}
  if(!A.lec||!tieneContenido(A.id)){tutor('Esta lección aún no tiene demostración. Prueba con otra lección del nivel.');return;}
  var mas=Math.min(A.velocidad,0.75);A.velocidadAntes=A.velocidad;A.velocidad=mas;pintarVelocidad();
  irAEtapa('observa',{paso:0,sencillo:true});
  D.registrarEvento('repaso',A.id,'otra-vez');
};

/* ---- 3. Comprende ---- */
function etapaComprende(){
  var c=A.lec.comprende;
  modoControles('pregunta');
  var demo=posicionesDemo(),ult=demo[demo.length-1];
  var fen=c.fen||ult.fen,jug=c.fen?[]:ult.jugadas;
  mostrarPosicion(fen,{jugadas:jug,orient:A.lec.descubre.orient||ladoDe(A.lec.descubre.fen),sinAnimar:true});
  fijarCapa(c.flechas||[],c.marcas||[],true);
  ejercicioActual=comoEjercicio({fen:state.game.fen(),orient:state.orient},A.id);
  A.resuelta=false;A.tarea=null;
  /* cierre de la Teoría: tu tutor resume la idea sobre la última posición (sin preguntas) */
  tutor(c.di);
  botonContinuar('Ahora practica');
  programarVisto('comprende',tiempoLectura(plano(tutorTexto.textContent)));
}

/* ---- 4, 5, 6. Tareas ---- */
function iniciarTarea(etapa,t,opc){
  opc=opc||{};
  A.tarea={tipo:t.tipo||'jugada',def:t,etapa:etapa};A.pistas=0;A.errores=0;A.resuelta=false;A.intentoRegistrado=false;A.casillasElegidas=[];
  if(A.tarea.tipo==='pregunta'){
    modoControles('pregunta');
    if(t.fen){mostrarPosicion(t.fen,{orient:t.orient||ladoDe(t.fen),sinAnimar:true});}
    fijarCapa(t.flechas||[],t.marcas||[],true);
    ejercicioActual=comoEjercicio({fen:state.game.fen(),orient:state.orient},A.id);
    A.consigna=null;tutor('**Elige la respuesta correcta.** '+t.texto);A.consigna=t.texto;
    pintarOpciones(t);botonContinuar('Saltar ejercicio',true,true);
    return;
  }
  if(A.tarea.tipo==='casilla'){
    modoControles('casilla');
    mostrarPosicion(t.fen,{orient:t.orient||ladoDe(t.fen),sinAnimar:true});
    limpiarCapa();
    ejercicioActual=comoEjercicio({fen:t.fen,orient:t.orient},A.id);
    A.consigna=null;tutor((/^toca/i.test(t.di||'')?'':'**Toca en el tablero.** ')+t.di);A.consigna=t.di;botonContinuar('Saltar ejercicio',true,true);
    return;
  }
  modoControles('tarea');
  ejercicioActual=comoEjercicio(t,A.id);
  limpiarCapa();
  /* en los ejercicios de jugada el tablero vuelve a aceptar jugadas
     (la demostración y las preguntas lo dejan bloqueado) */
  A.bloqueado=false;
  load(ejercicioActual);
  /* Recuperar el punto exacto: rehace las jugadas ya hechas en este ejercicio */
  var n=Math.max(0,Math.min(Number(opc.jugadas)||0,ejercicioActual.u.length-1));
  if(n>0){
    for(var i=0;i<n;i++){var u=ejercicioActual.u[i];state.game.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});}
    state.step=n;if(state.step%2===1){/* le tocaba al rival: vuelve a la jugada del alumno */state.game.undo();state.step--;}
    renderBoard();renderMoves();
  }
  /* «Juegas con negras.» ya lo dice la frase de arriba: no se repite */
  var intro=String(t.di||'').replace(/^Juegas con (las )?(negras|blancas)[.:,]\s*/i,'');
  if(intro)intro=intro.charAt(0).toUpperCase()+intro.slice(1);
  /* frase directa y con el bando: hay que mover en el tablero, y con qué color */
  var lado=ladoDe(t.fen);
  var pre=pedirMover(lado,etapa==='hazlo'?', ahora sin ayuda. ':'. ');
  /* la consigna que se repite bajo cada aviso es corta (1 renglón): qué bando mueve */
  A.consigna=null;tutor(pre+intro);A.consigna=pedirMover(lado);
  botonContinuar('Saltar ejercicio',true,true);
  renderHead();
}
function registrarIntento(){
  if(A.intentoRegistrado)return;A.intentoRegistrado=true;
  if(A.modo==='leccion')D.actualizarLeccion(A.id,function(r){r.intentos++;});
}
function registrarError(){
  A.errores++;registrarIntento();
  if(A.modo==='leccion')D.actualizarLeccion(A.id,function(r){r.errores++;});
}
function tareaResuelta(){
  if(A.resuelta)return;
  A.resuelta=true;registrarIntento();
  if(A.modo==='descubre'){descubreResuelto();return;}
  var t=A.tarea,etapa=t.etapa;
  D.actualizarLeccion(A.id,function(r){r.aciertos++;});
  D.registrarEvento('resuelto',A.id,etapa);
  marcarEtapa(etapa);
  var bien=t.def.bien||'¡Exacto!';
  /* último ejercicio de la lección (normalmente el Repaso): se recuerda la idea clave */
  var ultimo=etapa===ultimaTarea(A.lec);
  /* mensaje breve (máximo 4 renglones): la idea clave ya se vio en el resumen de la Teoría */
  var cierre=ultimo?(estadoLeccion(A.id)==='completada'?' **¡Lección completada!**':' Te faltan ejercicios para completar la lección.'):'';
  tutor(bien+cierre,'bien');
  festejarTutor();
  botonContinuar(ultimo?'Siguiente lección':'Continuar');
  planificarAuto();
}

/* Preguntas de opción múltiple */
function pintarOpciones(q){
  var c=el('aa-opciones');
  c.innerHTML=q.opciones.map(function(o,i){return '<button type="button" class="aa-opcion" data-i="'+i+'">'+rico(o)+'</button>';}).join('');
  c.hidden=false;
  c.onclick=function(e){
    var b=e.target.closest('.aa-opcion');if(!b||A.resuelta)return;
    var i=Number(b.dataset.i);
    if(i===q.correcta){
      b.classList.add('bien');b.setAttribute('aria-label',b.textContent+' (correcta)');
      c.querySelectorAll('.aa-opcion').forEach(function(x){x.disabled=true;});
      sndMove();
      if(A.tarea&&A.tarea.etapa==='comprende'&&!A.tarea.def.opciones.__x){
        A.resuelta=true;tutor(q.explica||'¡Bien!','bien');marcarEtapa('comprende');botonContinuar('Ahora practica');planificarAuto();
      }else{
        A.tarea.def.bien=q.explica||A.tarea.def.bien;tareaResuelta();
      }
    }else{
      b.classList.add('mal');b.disabled=true;sndError();registrarError();
      tutor((q.mal&&q.mal[i])||q.pista||'No es esa. Vuelve a mirar el tablero y prueba otra vez.','mal');
    }
  };
}

/* Tareas de tocar casillas */
function tocarCasilla(e){
  var celda=e.target.closest&&e.target.closest('.sq');if(!celda||A.resuelta)return;
  var sq=celda.dataset.sq,t=A.tarea.def;
  if(t.casillas.indexOf(sq)>=0){
    if(A.casillasElegidas.indexOf(sq)<0){A.casillasElegidas.push(sq);sndMove();flash(sq,'good');}
    pintarCasillasElegidas();
    var faltan=t.casillas.length-A.casillasElegidas.length;
    if(faltan<=0)tareaResuelta();
    else tutor('**¡Bien! '+(faltan===1?'Falta una.':'Faltan '+faltan+'.')+'**','bien');
  }else{
    sndError();flash(sq,'bad');registrarError();
    tutor((t.mal&&t.mal[sq])||t.pista||'Esa no. Mira con calma y vuelve a intentarlo.','mal');
  }
}
function pintarCasillasElegidas(){
  if(!A.tarea||A.tarea.tipo!=='casilla')return;
  A.capa.marcas=A.casillasElegidas.map(function(s){return [s,'clave'];});pintarCapa(false);
}

/* Jugadas: acepta alternativas correctas y, si la meta es el mate, cualquier mate. */
var tryMoveBase=tryMove;
tryMove=function(from,to){
  if(state.freemode||!A.tarea||A.tarea.tipo!=='jugada'||state.step>=state.uci.length)return tryMoveBase(from,to);
  var t=A.tarea.def,exp=state.uci[state.step],ultimaPropia=state.step>=state.uci.length-1;
  if(from===exp.slice(0,2)&&to===exp.slice(2,4)){registrarIntento();return tryMoveBase(from,to);}
  var acepta=(t.acepta&&t.acepta[state.step])||[];
  var alternativa=acepta.filter(function(u){return u.slice(0,2)===from&&u.slice(2,4)===to;})[0];
  if(!alternativa&&ultimaPropia&&t.meta==='mate'){
    var prueba=new Chess(state.game.fen());
    var mv=prueba.move({from:from,to:to,promotion:'q'});
    if(mv&&prueba.in_checkmate())alternativa=from+to;
  }
  if(alternativa&&ultimaPropia){
    clearMarks();registrarIntento();
    var m=state.game.move({from:from,to:to,promotion:alternativa[4]||'q'});
    if(m&&m.captured)sndCapture();else sndMove();
    flash(to,'good');state.step=state.uci.length;renderBoard();renderMoves();
    onSolved();return;
  }
  registrarError();
  var r=tryMoveBase(from,to);
  var pista=(t.mal&&t.mal[from+to])||(t.mal&&t.mal['*'])||null;
  tutor(pista||frasesError(),'mal');
  return r;
};
function frasesError(){
  var F=['No es esa. Antes de mover, pregúntate: ¿qué jaques, capturas y amenazas tengo?','Casi. Mira qué piezas del rival están sin defender.','Esa jugada no consigue la idea. Si quieres, pide una pista con la bombilla.'];
  return F[(A.errores-1)%F.length];
}
/* Al terminar la línea (incluye la mascota, que envuelve esta función al cargar) */
onSolved=function(){
  sndSolved();marcarReyMate();
  lanzarConfeti(A.modo==='leccion'&&A.tarea&&A.tarea.etapa===ultimaTarea(A.lec)?70:40);
  state.freemode=true;state.sel=null;state.anaMoves=state.game.history({verbose:true});state.anaPtr=state.anaMoves.length;
  mostrarBarraAnalisis(true);
  tareaResuelta();
};

/* El cuadro de estado de PC1 está oculto: el tutor da la retroalimentación. */
var setStatusBase=setStatus;
setStatus=function(kind,msg){
  var r=setStatusBase.apply(this,arguments);
  try{
    if(!A.tarea||A.tarea.tipo!=='jugada'||A.resuelta)return r;
    if(kind==='ok'&&/rival responde/i.test(msg||''))tutor('¡Correcto! Tu rival responde…','bien');
    else if(kind==='idle'&&/Sigue la línea/i.test(msg||''))tutor('Bien. '+pedirMover((state.game&&state.game.turn())||'w',' otra vez.'),'bien');
    else if(kind==='done'&&/Línea completa/i.test(msg||'')){tutor('Esa era la solución. Ahora inténtalo tú para que cuente.','');el('aa-reintentar').hidden=false;}
  }catch(e){}
  return r;
};

/* Pistas graduales: 1) idea, 2) la pieza, 3) la jugada */
el('b-hint').onclick=function(){
  if(A.modo==='descubre'){pistaDescubre(false);return;}
  if(!A.tarea){tutor('Las pistas están disponibles en los ejercicios de Práctica y Repaso.');return;}
  var t=A.tarea.def;
  if(A.tarea.tipo==='pregunta'){tutor(t.pista||'Lee cada opción y compárala con lo que ves en el tablero.');contarPista();return;}
  if(A.tarea.tipo==='casilla'){
    contarPista();
    var falta=t.casillas.filter(function(s){return A.casillasElegidas.indexOf(s)<0;})[0];
    if(A.pistas>=2&&falta){var c=cellOf(falta);if(c)c.classList.add('sel');tutor('Mira esta casilla.');}
    else tutor(t.pista||'Revisa una por una las piezas del tablero.');
    return;
  }
  if(state.freemode||state.step>=state.uci.length)return;
  contarPista();
  var u=state.uci[state.step],from=u.slice(0,2),pc=state.game.get(from);
  if(A.pistas===1){tutor((t.pistas&&t.pistas[0])||'Busca primero jaques, capturas y amenazas.');}
  else if(A.pistas===2){clearMarks();var c2=cellOf(from);if(c2)c2.classList.add('sel');tutor((t.pistas&&t.pistas[1])||('Mueve el '+(pc?NOMBRE_PIEZA[pc.type]:'')+' de '+from+'.'));}
  else{A.capa={flechas:[[from,u.slice(2,4),'mov']],marcas:[]};pintarCapa(true);tutor('La jugada es '+sanEs(sanDe(state.game.fen(),u))+'. Hazla tú en el tablero.');}
};
function contarPista(){
  A.pistas++;
  if(A.modo==='leccion'&&A.id)D.actualizarLeccion(A.id,function(r){r.pistas++;});
  try{registrarIncidenciaEntrenamiento('hint');}catch(e){}
}

/* Reiniciar: vuelve al inicio de la etapa actual */
el('b-reset').onclick=function(){
  var o=state.orient;el('aa-reintentar').hidden=true;
  if(A.modo==='descubre'){cargarDescubre(A.descubreItem,true);return;}
  if(A.modo!=='leccion'||!A.lec)return;
  if(A.etapa==='observa'){pararDemo();irPasoDemo(0,true);return;}
  if(A.etapa==='descubre'){etapaDescubre();state.orient=o;renderBoard();return;}
  if(A.tarea&&A.tarea.tipo==='jugada'){A.resuelta=false;A.pistas=0;A.intentoRegistrado=false;load(ejercicioActual);state.orient=o;renderBoard();renderMoves();limpiarCapa();tutor('De nuevo desde el principio. '+(A.tarea.def.di||''));return;}
  irAEtapa(A.etapa);
};

/* «Intentar de nuevo» (en la Sección 1 no hay botón Reiniciar): repite el ejercicio desde el principio */
el('aa-reintentar').onclick=function(){el('b-reset').onclick();};

/* Botón Continuar del tutor */
el('aa-continuar').onclick=function(){
  if(A.modo==='descubre'){if(A.descubreItem&&A.descubreItem.revelado)siguienteDescubre();else revelarDescubre(false);return;}
  if(!A.lec||!tieneContenido(A.id)){irLeccionRelativa(1,true);return;}
  if(A.etapa==='observa'&&A.demo&&A.paso<A.demo.length-1){pararDemo();irPasoDemo(A.paso+1);return;}
  if(A.etapa==='observa'&&A.velocidadAntes){A.velocidad=A.velocidadAntes;A.velocidadAntes=null;pintarVelocidad();}
  siguienteEtapa();
};

/* Qué controles se ven en cada momento (los demás siguen existiendo, solo se ocultan) */
function modoControles(modo){
  document.body.dataset.aaModo=modo;
  el('aa-demo').hidden=modo!=='demo';
  /* «Explícame otra vez» queda solo en Explorar (allí da otra pista); en las lecciones están ‹ · Pausar · › */
  el('aa-otra-vez').hidden=true;
  pintarControles();
}

/* Navegación entre lecciones (botones Ant / Sig y flechas del teclado) */
function irLeccionRelativa(delta,soloConContenido){
  var i=CAT.lista.findIndex(function(c){return c.id===A.id;});if(i<0)i=0;
  /* sin dar la vuelta: después de la última lección no se vuelve a la primera */
  for(var j=i+delta;j>=0&&j<CAT.lista.length;j+=delta){
    var id=CAT.lista[j].id;
    if(!soloConContenido||tieneContenido(id)){abrirLeccion(id);return;}
  }
}
go=function(delta){if(A.modo==='descubre'){siguienteDescubre();return;}irLeccionRelativa(delta);};
jumpToNumber=function(n){abrirLeccion(String(n));};
document.addEventListener('keydown',function(e){
  if(e.target&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;
  if(document.querySelector('.aa-fv-fondo.open'))return;
  if(!el('v-train').classList.contains('active'))return;
  if(A.modo==='leccion'&&A.etapa==='observa'&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){
    e.preventDefault();e.stopImmediatePropagation();pararDemo();irPasoDemo(A.paso+(e.key==='ArrowRight'?1:-1));
  }else if(e.key===' '&&enLeccionConContenido()&&!(e.target&&e.target.closest&&e.target.closest('button'))){e.preventDefault();e.stopImmediatePropagation();el('aa-pausa').click();}
},true);

/* Compartir: imagen del tablero + enlace directo a la lección */
window.aaTituloCompartir=function(){return A.modo==='descubre'?'Repaso':CAT.nombreCompleto(A.id);};
compartirTablero=function(){
  var id=A.id||'N1-001';
  var enlace='https://la86926.github.io/chess/?metodo=3&leccion='+encodeURIComponent(id);
  var texto=(A.modo==='descubre'?'Repaso':CAT.nombreCompleto(id))+' · Aprende Ajedrez\n\n'+enlace;
  var nombre='aprende-ajedrez-'+id+'.png';
  return crearBlobTableroCompartible().then(function(blob){
    if(window.PuenteAndroid&&(PuenteAndroid.compartirImagen||PuenteAndroid.guardarImagen)){
      return new Promise(function(res){var r=new FileReader();r.onload=function(){var b64=String(r.result).split(',')[1];if(PuenteAndroid.compartirImagen)PuenteAndroid.compartirImagen(b64,nombre);else PuenteAndroid.guardarImagen(b64,nombre);res();};r.readAsDataURL(blob);});
    }
    var archivo=new File([blob],nombre,{type:'image/png'});
    if(navigator.share&&(!navigator.canShare||navigator.canShare({files:[archivo]})))return navigator.share({files:[archivo],title:'Aprende Ajedrez',text:texto});
    descargarBlob(blob,nombre);
    return pcCopiarTexto(enlace).then(function(ok){pcAviso(ok?'Imagen descargada · enlace de la lección copiado':'Imagen descargada');});
  }).catch(function(err){if(err&&err.name==='AbortError')return;if(err&&err.name==='NotAllowedError'){pcAviso('Toca Compartir otra vez para enviarlo');return;}pcAviso('No se pudo compartir. Inténtalo de nuevo.');});
};
el('b-share').onclick=function(){compartirTablero();};

/* =====================================================================
   5. Descubre la táctica
   ===================================================================== */
function nivelAlcanzado(){
  var p=D.leer(K.progreso).lecciones,max=1;
  Object.keys(p).forEach(function(id){var c=catalogoDe(id);if(c&&p[id].estado==='completada')max=Math.max(max,c.nivel);});
  return max;
}
function poolDescubre(){
  var sel=el('aa-descubre-nivel').value,tope=sel==='auto'?nivelAlcanzado():Number(sel);
  var prog=D.leer(K.progreso).lecciones,pool=[];
  CAT.lista.forEach(function(c){
    var l=LEC[c.id];if(!l||!l.tactica||c.nivel>tope)return;
    var comp=prog[c.id]&&prog[c.id].estado==='completada';
    if(sel==='auto'&&!comp&&c.nivel<tope)return;
    ['practica','hazlo','comprueba'].concat((l.extra||[]).map(function(_,i){return 'extra'+i;})).forEach(function(k){
      var t=k.indexOf('extra')===0?l.extra[Number(k.slice(5))]:l[k];
      if(!t||(t.tipo&&t.tipo!=='jugada')||!t.linea)return;
      pool.push({clave:c.id+':'+k,leccion:c.id,motivo:t.motivo||l.motivo||c.titulo,tarea:t,peso:comp?3:1});
    });
  });
  (window.AA_DESCUBRE_EXTRA||[]).forEach(function(x,i){
    var req=x.requiere||[];
    var ok=req.every(function(id){var c=catalogoDe(id);return c&&c.nivel<=tope&&(sel!=='auto'||(prog[id]&&prog[id].estado==='completada'));});
    if(ok)pool.push({clave:'mix:'+x.id,leccion:x.leccion||req[0],motivo:x.motivo,tarea:x,peso:4});
  });
  return pool;
}
function elegirDescubre(){
  var pool=poolDescubre();if(!pool.length)return null;
  var vistos=D.leer(K.descubre).vistos,ultima=A.descubreItem&&A.descubreItem.clave;
  var cand=pool.filter(function(x){return x.clave!==ultima;});if(!cand.length)cand=pool;
  var total=0;cand.forEach(function(x){var v=vistos[x.clave];x.w=x.peso*(v?(v.aciertos?0.35:0.8):2);total+=x.w;});
  var r=Math.random()*total;for(var i=0;i<cand.length;i++){r-=cand[i].w;if(r<=0)return cand[i];}
  return cand[cand.length-1];
}
function siguienteDescubre(){
  var it=elegirDescubre();
  if(!it){pestana('discover');el('aa-descubre-nota').textContent='Todavía no hay posiciones para este filtro. Completa alguna lección táctica (por ejemplo del Nivel I) o elige un nivel en la lista.';return;}
  cargarDescubre(it);
}
function cargarDescubre(it,reinicio){
  if(!it)return;
  quitarMascota();
  pararDemo();quitarBotonIrLeccion();
  A.modo='descubre';A.descubreItem={clave:it.clave,leccion:it.leccion,motivo:it.motivo,tarea:it.tarea,revelado:false,pistas:0};
  A.lec=null;A.etapa='';A.volverA=null;pintarVolver();
  A.tarea={tipo:'jugada',def:it.tarea,etapa:'descubre'};A.pistas=0;A.errores=0;A.resuelta=false;A.intentoRegistrado=false;
  irAPestanaLeccion();
  modoControles('tarea');
  ejercicioActual=comoEjercicio(it.tarea,'descubre');
  limpiarCapa();A.bloqueado=false;el('aa-reintentar').hidden=true;load(ejercicioActual);
  el('aa-etapas').hidden=true;
  A.consigna=null;tutor(pedirMover(ladoDe(it.tarea.fen),': encuentra la mejor jugada.')+' Si te atascas, toca la bombilla para recibir una pista.');
  A.consigna='Juegan las '+ladoTexto(state.orient)+': encuentra la mejor jugada.';
  botonContinuar('Ver la solución',true,true);
  renderHead();renderRef();pintarRuta();guardarUltimo();
}
function pistaDescubre(otraVez){
  var it=A.descubreItem;if(!it)return;
  if(it.revelado){tutor('Ya sabes cuál era: '+it.motivo+'. Puedes ir a su lección desde el Temario.');return;}
  it.pistas++;contarPista();
  var u=state.uci[state.step]||state.uci[0],from=u.slice(0,2),pc=state.game.get(from);
  if(it.pistas===1)tutor(otraVez?'Otra forma de verlo: haz una lista de todas tus jugadas que dan jaque, que capturan o que amenazan algo. Una de ellas funciona.':'Pista 1: busca jaques, capturas y amenazas. ¿Qué pieza rival está mal defendida o qué casilla es débil?');
  else if(it.pistas===2){clearMarks();var c=cellOf(from);if(c)c.classList.add('sel');tutor('Pista 2: la jugada empieza con el '+(pc?NOMBRE_PIEZA[pc.type]:'')+' de '+from+'.');}
  else{A.capa={flechas:[[from,u.slice(2,4),'mov']],marcas:[]};pintarCapa(true);tutor('Pista 3: juega '+sanEs(sanDe(state.game.fen(),u))+'.');}
}
function descubreResuelto(){
  festejarTutor();
  var it=A.descubreItem;
  var d=D.leer(K.descubre),v=d.vistos[it.clave]||{intentos:0,aciertos:0,t:0};
  v.intentos++;var limpio=it.pistas===0&&A.errores===0;if(limpio)v.aciertos++;v.t=Date.now();d.vistos[it.clave]=v;d.t=v.t;D.guardar(K.descubre,d);
  D.registrarEvento('descubre',it.leccion,limpio?'limpio':'con-ayuda');
  revelarDescubre(true,limpio);
}
function revelarDescubre(resuelto,limpio){
  var it=A.descubreItem;if(!it)return;
  if(!resuelto){
    var d=D.leer(K.descubre),v=d.vistos[it.clave]||{intentos:0,aciertos:0,t:0};v.intentos++;v.t=Date.now();d.vistos[it.clave]=v;d.t=v.t;D.guardar(K.descubre,d);
    D.registrarEvento('descubre',it.leccion,'rendido');
    try{detenerSolucion();}catch(e){}playSolution();
  }
  it.revelado=true;
  var cat=catalogoDe(it.leccion);
  tutor((resuelto?(limpio?'¡Perfecto, sin ayuda! ':'¡Resuelto! '):'Así se resolvía. ')+'La táctica era: **'+it.motivo+'**'+(cat?(' ('+CAT.nombreCompleto(it.leccion)+').'):'.'),resuelto?'bien':'');
  it.resuelto=!!resuelto;
  botonContinuar('Otra posición',false);   /* se sigue con «Otra posición» de abajo, que brilla */
  renderHead();renderRef();
  var acc=el('aa-tutor-acciones');
  if(cat&&!acc.querySelector('.aa-ir-leccion')){
    var b=document.createElement('button');b.type='button';b.className='aa-accion aa-ir-leccion';b.textContent='Ir a la lección';
    b.onclick=function(){b.remove();var ref=refActual();abrirLeccion(it.leccion,ref?opcionesItem(ref):{});};acc.insertBefore(b,el('aa-continuar'));
  }
  pintarStatsDescubre();
}
function pintarStatsDescubre(){
  var d=D.leer(K.descubre),k=Object.keys(d.vistos),res=0,lim=0;
  k.forEach(function(x){if(d.vistos[x].intentos)res++;if(d.vistos[x].aciertos)lim++;});
  el('aa-descubre-stats').innerHTML='<div class="cell"><div class="big">'+res+'</div><div class="lbl">posiciones vistas</div></div><div class="cell"><div class="big">'+lim+'</div><div class="lbl">sin ayuda</div></div><div class="cell"><div class="big">'+poolDescubre().length+'</div><div class="lbl">disponibles</div></div>';
  el('aa-descubre-stats').className='prog aa-descubre-stats';
}
el('aa-descubre-empezar').onclick=function(){el('aa-descubre-nota').textContent='';siguienteDescubre();};
el('aa-descubre-nivel').onchange=pintarStatsDescubre;
function quitarBotonIrLeccion(){var b=document.querySelector('.aa-ir-leccion');if(b)b.remove();}

/* =====================================================================
   6. Progreso, historial y «Continuar aprendiendo»
   ===================================================================== */
var guardarUltimoT=null;
function guardarUltimo(){
  /* Abrir la app (o seguir a otro dispositivo) no es «avanzar»: no se guarda como último punto,
     para no pisar en la nube el punto real del otro dispositivo. */
  if(A.sinGuardarUltimo)return;
  A.ultimaAccionT=Date.now();A.vistaAuto=false;
  clearTimeout(guardarUltimoT);
  guardarUltimoT=setTimeout(function(){
    var u={modo:A.modo,leccion:A.modo==='leccion'?A.id:(A.descubreItem&&A.descubreItem.leccion)||'',etapa:A.etapa||'',paso:A.paso||0,
      jugadas:(A.tarea&&A.tarea.tipo==='jugada'&&!state.freemode)?state.step:0,t:Date.now()};
    if(A.modo==='leccion'||A.modo==='descubre')D.guardar(K.ultimo,u);
  },250);
}
document.addEventListener('pointerup',function(){if(A.tarea&&A.tarea.tipo==='jugada')guardarUltimo();},true);
function continuarAprendiendo(){
  var u=D.leer(K.ultimo);
  if(u.modo==='leccion'&&u.leccion&&catalogoDe(u.leccion)){abrirLeccion(u.leccion,{etapa:u.etapa||undefined,paso:u.paso,jugadas:u.jugadas,restaurando:true});return;}
  var prog=D.leer(K.progreso).lecciones;
  var sig=CAT.lista.filter(function(c){return tieneContenido(c.id)&&!(prog[c.id]&&prog[c.id].estado==='completada');})[0];
  abrirLeccion((sig||CAT.lista[0]).id);
}
el('aa-continuar-aprendiendo-lateral').onclick=continuarAprendiendo;
/* Llega de la nube un «último punto» más reciente (otro dispositivo con el mismo código):
   se abre esa lección en esa etapa, salvo que ya estemos exactamente ahí o haya una ventana abierta. */
function seguirUltimoRemoto(){
  try{
    var u=D.leer(K.ultimo);
    if(!u||u.modo!=='leccion'||!u.leccion||!catalogoDe(u.leccion))return;
    if(document.querySelector('.aa-fv-fondo.open'))return;
    /* lo que llega es más antiguo que lo último que se hizo aquí: no se retrocede */
    if(A.ultimaAccionT&&(u.t||0)<=A.ultimaAccionT)return;
    /* si la persona está mirando el Temario, Explorar, Favoritos o Ayuda, no se la saca de ahí */
    if(!el('v-train').classList.contains('active')&&!A.vistaAuto)return;
    var jug=(A.tarea&&A.tarea.tipo==='jugada'&&!state.freemode)?state.step:0;
    if(A.modo==='leccion'&&A.id===u.leccion&&(A.etapa||'')===(u.etapa||'')&&(A.paso||0)===(u.paso||0)&&jug===(u.jugadas||0))return;
    A.sinGuardarUltimo=true;
    try{abrirLeccion(u.leccion,{etapa:u.etapa||undefined,paso:u.paso,jugadas:u.jugadas,restaurando:true,seguir:true});}finally{A.sinGuardarUltimo=false;}
  }catch(e){}
}

function diasSeguidos(){
  var dias={};D.leer(K.historial).eventos.forEach(function(e){if(e.tipo!=='visita')dias[fechaClave(e.t)]=1;});
  var c=new Date();c.setHours(0,0,0,0);if(!dias[fechaClave(c.getTime())])c.setDate(c.getDate()-1);
  var n=0;while(dias[fechaClave(c.getTime())]){n++;c.setDate(c.getDate()-1);}return n;
}
function resumenProgreso(){
  var p=D.leer(K.progreso).lecciones,comp=0,porNivel=CAT.niveles.map(function(){return 0;});
  Object.keys(p).forEach(function(id){var c=catalogoDe(id);if(c&&p[id].estado==='completada'){comp++;porNivel[c.nivel-1]++;}});
  return {comp:comp,pct:Math.round(comp/CAT.total*100),porNivel:porNivel};
}
renderProgress=function(){
  var r=resumenProgreso();
  el('p-num').textContent=r.comp;el('p-pct').textContent=r.pct+'%';el('p-streak').textContent=diasSeguidos();el('p-bar').style.width=r.pct+'%';
  el('aa-niveles-mini').innerHTML=CAT.niveles.map(function(nv,i){var pc=Math.round(r.porNivel[i]/nv.t.length*100);return '<div class="aa-nmini"><span>'+nv.nombre.replace('NIVEL ','')+'</span><i><b style="width:'+pc+'%"></b></i><em>'+r.porNivel[i]+'/'+nv.t.length+'</em></div>';}).join('');
  renderHistorial();
};
/* El historial reutiliza la ventana y la gráfica de actividad de PC1. */
var NOMBRE_EVENTO={completada:'Lección completada',resuelto:'Ejercicio resuelto',visita:'Lección abierta',repaso:'Explícame otra vez',descubre:'Repaso'};
var ETAPA_TXT={practica:'Práctica',hazlo:'Práctica',comprueba:'Repaso',comprende:'Teoría'};
renderHistorial=function(){
  var ev=D.leer(K.historial).eventos;
  histLog=ev.filter(function(e){return e.tipo==='resuelto'||e.tipo==='completada'||e.tipo==='descubre';}).map(function(e){return {n:e.leccion,t:e.t};});
  var cont=el('hist-list');if(!cont)return;
  if(!ev.length){cont.innerHTML='<span class="hist-empty">Aún no hay actividad. Abre una lección para empezar.</span>';return;}
  var vis=state.histTodo?ev:ev.slice(0,20),h='';
  vis.forEach(function(e){
    var f=new Date(e.t),fecha=f.toLocaleDateString('es-PE',{day:'2-digit',month:'short',year:'numeric'})+' · '+f.toLocaleTimeString('es-PE',{hour:'2-digit',minute:'2-digit'});
    var c=catalogoDe(e.leccion),det=e.tipo==='resuelto'&&ETAPA_TXT[e.detalle]?' · '+ETAPA_TXT[e.detalle]:(e.tipo==='descubre'&&e.detalle?' · '+({limpio:'sin ayuda','con-ayuda':'con ayuda',rendido:'vista la solución'}[e.detalle]||''):'');
    h+='<div class="hist-row aa-hist-row" data-n="'+esc(e.leccion)+'" data-t="'+e.t+'"><span class="hist-n">'+(c?esc(CAT.romano[c.nivel]+'·'+c.num):'—')+'</span><span class="hist-d"><b>'+esc(NOMBRE_EVENTO[e.tipo]||e.tipo)+det+'</b>'+(c?' — '+esc(CAT.nombreCompleto(e.leccion)):'')+'<br>'+fecha+'</span><button class="hist-x" data-del="'+esc(e.id)+'" title="Borrar del historial" aria-label="Borrar del historial">✕</button></div>';
  });
  if(!state.histTodo&&ev.length>20)h+='<button class="btn" id="b-hist-todo" style="justify-content:center;margin-top:.3rem">Mostrar todas ('+ev.length+')</button>';
  cont.innerHTML=h;
};
el('hist-list').onclick=function(e){
  var x=e.target.closest('.hist-x');
  if(x){var id=x.dataset.del,h=D.leer(K.historial);h.eventos=h.eventos.filter(function(v){return v.id!==id;});D.guardar(K.historial,h);renderHistorial();renderGrafica();return;}
  var fila=e.target.closest('.hist-row');
  if(fila&&catalogoDe(fila.dataset.n)){el('hist-modal').classList.remove('open');abrirLeccion(fila.dataset.n);}
};
/* Resetear / recuperar el historial: misma idea que en PC1, sobre los datos de Aprende Ajedrez */
el('hist-modal').addEventListener('click',function(e){
  var b=e.target.closest('button');if(!b)return;
  if(b.id==='b-hist-reset'){
    e.stopImmediatePropagation();
    pedirConfirmacion('¿Vaciar el historial de actividad? Tu progreso y tus favoritos se mantienen.',function(){
      try{localStorage.setItem('aa_historial_copia',localStorage.getItem(K.historial)||'');}catch(err){}
      D.guardar(K.historial,{eventos:[]});renderHistorial();renderGrafica();
    });
  }else if(b.id==='b-hist-recover'){
    e.stopImmediatePropagation();
    var copia=null;try{copia=JSON.parse(localStorage.getItem('aa_historial_copia')||'null');}catch(err){}
    if(!copia||!copia.eventos||!copia.eventos.length){pcAviso('No hay ninguna copia de historial para recuperar.');return;}
    pedirConfirmacion('¿Recuperar el historial desde la última copia?',function(){D.guardar(K.historial,D.fusionarHistorial(D.leer(K.historial),copia));renderHistorial();renderGrafica();});
  }
},true);

/* =====================================================================
   7. Niveles
   ===================================================================== */
var ICONO_ESTADO={completada:'✓',iniciada:'◐',disponible:'○',preparacion:'…'};
function estadoVisible(id){var e=estadoLeccion(id);if(e)return e;return tieneContenido(id)?'disponible':'preparacion';}
var TEXTO_ESTADO={completada:'Completada',iniciada:'En curso',disponible:'Por empezar',preparacion:'En preparación'};
function pintarNiveles(){
  var r=resumenProgreso(),favs=lecturaFavsPorLeccion(),u=D.leer(K.ultimo);
  var cont=u.leccion&&catalogoDe(u.leccion);
  el('aa-continuar-bloque').innerHTML='<button class="plan-primary aa-continuar-aprendiendo" type="button" id="aa-continuar-aprendiendo">Continuar donde me quedé</button>'+
    '<span class="aa-continuar-donde">'+(cont?('Última lección: <b>'+esc(CAT.nombreCompleto(u.leccion))+'</b>'):'Empezarás por el Nivel I.')+'</span>';
  el('aa-continuar-aprendiendo').onclick=continuarAprendiendo;
  /* niveles abiertos: se recuerdan mientras la página esté abierta; al principio, el de la última lección */
  if(!A.nivelesAbiertos){A.nivelesAbiertos={};A.nivelesAbiertos[cont?cont.nivel:1]=true;}
  /* la última lección abierta queda sombreada y su nivel desplegado, para saber dónde te quedaste */
  var marca=cont?u.leccion:'';if(cont)A.nivelesAbiertos[cont.nivel]=true;
  el('aa-niveles').innerHTML=CAT.niveles.map(function(nv,i){
    var hechos=r.porNivel[i],pc=Math.round(hechos/nv.t.length*100),listos=nv.ids.filter(tieneContenido).length,ab=!!A.nivelesAbiertos[i+1];
    return '<section class="aa-nivel panel-card'+(ab?' abierto':'')+'" data-nivel="'+(i+1)+'"><button type="button" class="aa-nivel-cab" aria-expanded="'+ab+'" aria-controls="aa-nivel-c'+(i+1)+'"><span class="aa-nivel-n">'+nv.nombre+'</span><span class="aa-nivel-sub">'+nv.sub+'</span>'+
      '<span class="aa-nivel-cuenta">'+hechos+'/'+nv.t.length+(listos<nv.t.length?' · '+listos+' listas':'')+'</span><span class="aa-nivel-flecha" aria-hidden="true"></span>'+
      '<span class="aa-nivel-barra" aria-label="'+pc+'% completado"><i style="width:'+pc+'%"></i></span></button>'+
      '<div class="aa-nivel-cuerpo" id="aa-nivel-c'+(i+1)+'"><div class="aa-nivel-interior">'+
      '<p class="aa-nivel-proposito">'+esc(nv.proposito)+'</p><ol class="aa-lista-lecciones">'+
      nv.ids.map(function(id,j){var c=catalogoDe(id),e=estadoVisible(id);
        return '<li style="--i:'+Math.min(j,24)+'"><button type="button" class="aa-fila-leccion e-'+e+(id===marca?' aa-ultima':'')+'" data-leccion="'+id+'"'+(id===marca?' aria-current="true"':'')+'><span class="aa-fl-num">'+c.num+'</span><span class="aa-fl-tit">'+esc(c.titulo)+'</span>'+
          (favs[id]?'<span class="aa-fl-fav" title="En favoritos" aria-label="En favoritos">♥</span>':'')+
          '<span class="aa-fl-est" title="'+TEXTO_ESTADO[e]+'"><i aria-hidden="true">'+ICONO_ESTADO[e]+'</i>'+TEXTO_ESTADO[e]+'</span></button></li>';}).join('')+
      '</ol></div></div></section>';
  }).join('');
}
el('aa-niveles').addEventListener('click',function(e){
  var b=e.target.closest('[data-leccion]');if(b){A.temario={y:window.scrollY,id:b.dataset.leccion};abrirLeccion(b.dataset.leccion);window.scrollTo({top:0});return;}
  var cab=e.target.closest('.aa-nivel-cab');if(!cab)return;
  /* persiana: el nivel se despliega (o se recoge) con su lista de lecciones */
  var sec=cab.parentNode,n=sec.dataset.nivel,ab=!sec.classList.contains('abierto');
  sec.classList.toggle('abierto',ab);cab.setAttribute('aria-expanded',String(ab));
  if(ab)A.nivelesAbiertos[n]=true;else delete A.nivelesAbiertos[n];
});

/* =====================================================================
   8. Favoritos
   ===================================================================== */
var SVG_CARPETA='<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2Z"/></svg>';
var SVG_OK='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m8 12 2.5 2.5L16 9"/></svg>';
var SVG_LAPIZ='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>';
var SVG_PAPELERA='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="M19 6l-1 14H6L5 6"/></svg>';
var SVG_CHECK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7"/></svg>';

/* Un favorito guarda el nivel, la lección y el ítem (el número del paso): se registra como «N1-007@3».
   Los favoritos antiguos (solo la lección) se pasan al ítem 1 al arrancar. */
function refFav(id,item){return item?id+'@'+item:id;}
function partesFav(ref){var m=/^([^@]+)(?:@(\d+))?$/.exec(String(ref||''));return m?{id:m[1],item:m[2]?Number(m[2]):0}:{id:String(ref||''),item:0};}
function refActual(){
  if(A.modo==='descubre'){
    var it=A.descubreItem;if(!it)return null;
    var k=String(it.clave||'').split(':'),l=LEC[it.leccion],i=(l&&k[0]===it.leccion)?pasosDe(l).map(function(p){return p.etapa;}).indexOf(k[1]):-1;
    return refFav(it.leccion,i>=0?i+1:1);
  }
  if(!A.id)return null;
  var j=tieneContenido(A.id)?indicePaso():-1;
  return refFav(A.id,j>=0?j+1:1);
}
function etiquetaFav(ref){var p=partesFav(ref);return CAT.etiqueta(p.id)+(p.item?' · ÍTEM '+p.item:'');}
/* abre exactamente ese ítem */
function opcionesItem(ref){
  var p=partesFav(ref),ps=pasosDe(LEC[p.id]);if(!p.item||!ps.length)return {};
  var x=ps[Math.min(p.item,ps.length)-1];return {etapa:x.etapa,paso:x.paso||0};
}
function migrarFavoritosAItems(){
  try{
    var f=D.favoritos(),t=Date.now(),cambio=false;
    Object.keys(f.items).forEach(function(k){
      var it=f.items[k];if(it.borrado||it.leccion.indexOf('@')>=0)return;
      var ref=refFav(it.leccion,1),k2=it.carpeta+'|'+ref,n=f.items[k2];
      if(!(n&&!n.borrado))f.items[k2]={carpeta:it.carpeta,leccion:ref,agregado:it.agregado,t:t,borrado:false};
      it.borrado=true;it.t=t;cambio=true;
    });
    if(cambio)D.guardar(K.favoritos,f);
  }catch(e){}
}
function lecturaFavsPorLeccion(){var m={};D.itemsVivos(D.favoritos()).forEach(function(it){m[partesFav(it.leccion).id]=1;});return m;}
function actualizarCorazon(){
  var b=el('aa-corazon'),ref=refActual();
  b.hidden=!ref;if(!ref)return;
  var n=D.carpetasDeLeccion(ref).length,item=partesFav(ref).item;
  b.classList.toggle('lleno',n>0);
  b.setAttribute('aria-pressed',n>0?'true':'false');
  b.setAttribute('aria-label',n>0?('Ítem '+item+' en favoritos ('+n+' carpeta'+(n===1?'':'s')+'). Cambiar carpetas'):('Guardar el ítem '+item+' en favoritos'));
  b.title=n>0?'Ítem '+item+' · en '+n+' carpeta'+(n===1?'':'s'):'Guardar el ítem '+item;
}
var fv={leccion:null,sel:{},inicial:{},volverFoco:null};
function abrirModalFavorito(leccion){
  fv.leccion=leccion;fv.volverFoco=document.activeElement;
  var f=D.favoritos();
  fv.inicial={};D.carpetasDeLeccion(leccion,f).forEach(function(c){fv.inicial[c]=1;});
  fv.sel=Object.assign({},fv.inicial);
  if(leccion.indexOf('@')<0&&leccion===A.id)leccion=fv.leccion=refActual()||leccion;
  var c=catalogoDe(partesFav(leccion).id);
  if(A.modo==='descubre'&&A.descubreItem&&!A.descubreItem.revelado)
    el('aa-fv-leccion').innerHTML='<span>REPASO</span>Esta posición (su lección se revela al terminarla)';
  else el('aa-fv-leccion').innerHTML='<span>'+esc(etiquetaFav(leccion))+'</span>'+esc(c?c.titulo:leccion);
  pintarListaFav();
  abrirFondo('aa-fav-modal');
  setTimeout(function(){var p=el('aa-fv-lista').querySelector('[role="checkbox"]');(p||el('aa-fv-guardar')).focus();},60);
}
function pintarListaFav(){
  var lista=D.carpetasVivas();
  el('aa-fv-lista').innerHTML=lista.length?lista.map(function(c){
    var on=!!fv.sel[c.id];
    return '<li><div class="aa-fv-fila'+(on?' on':'')+'" role="checkbox" tabindex="0" aria-checked="'+on+'" data-carpeta="'+esc(c.id)+'">'+
      '<span class="aa-fv-ico">'+SVG_CARPETA+'</span><span class="aa-fv-nombre">'+esc(c.nombre)+'</span>'+
      '<span class="aa-fv-check" aria-hidden="true">'+SVG_CHECK+'</span></div></li>';
  }).join(''):'<li class="aa-fv-vacio">No tienes carpetas. Crea una con «Nueva carpeta».</li>';
  avisoFav();
}
function avisoFav(){
  var habia=Object.keys(fv.inicial).length,ahora=Object.keys(fv.sel).filter(function(k){return fv.sel[k];}).length;
  var a=el('aa-fv-aviso');
  if(habia&&!ahora){a.textContent='Al guardar, este ítem se quitará de favoritos.';a.className='aa-fv-aviso alerta';}
  else{a.textContent='';a.className='aa-fv-aviso';}
}
function alternarCarpeta(fila){
  var id=fila.dataset.carpeta;fv.sel[id]=!fv.sel[id];
  fila.classList.toggle('on',fv.sel[id]);fila.setAttribute('aria-checked',String(!!fv.sel[id]));avisoFav();
}
el('aa-fv-lista').addEventListener('click',function(e){var f=e.target.closest('[role="checkbox"]');if(f)alternarCarpeta(f);});
el('aa-fv-lista').addEventListener('keydown',function(e){
  var f=e.target.closest('[role="checkbox"]');if(!f)return;
  if(e.key===' '||e.key==='Enter'){e.preventDefault();alternarCarpeta(f);}
  else if(e.key==='ArrowDown'||e.key==='ArrowUp'){e.preventDefault();var t=[].slice.call(el('aa-fv-lista').querySelectorAll('[role="checkbox"]')),i=t.indexOf(f);var n=t[i+(e.key==='ArrowDown'?1:-1)];if(n)n.focus();}
});
el('aa-fv-guardar').onclick=function(){
  var elegidas=Object.keys(fv.sel).filter(function(k){return fv.sel[k];});
  var r=D.fijarCarpetasDeLeccion(fv.leccion,elegidas);
  cerrarFondo('aa-fav-modal');
  actualizarCorazon();
  var heart=el('aa-corazon');heart.classList.remove('late');void heart.offsetWidth;heart.classList.add('late');
  var nombres=D.carpetasVivas().filter(function(c){return elegidas.indexOf(c.id)>=0;}).map(function(c){return c.nombre;});
  if(elegidas.length)confirmar('Favorito guardado en '+elegidas.length+' carpeta'+(elegidas.length===1?'':'s'),nombres.join(' · '));
  else if(r.quitadas.length)confirmar('Quitado de favoritos','Tu historial y tu progreso no cambian.');
  if(r.agregadas.length||r.quitadas.length)D.registrarEvento('favorito',partesFav(fv.leccion).id,elegidas.length?'guardado':'quitado');
  pintarFavoritos();
};
el('aa-fv-cancelar').onclick=function(){cerrarFondo('aa-fav-modal');};
el('aa-fv-cerrar').onclick=function(){cerrarFondo('aa-fav-modal');};
el('aa-fv-nueva').onclick=function(){
  pedirNombreCarpeta({titulo:'Nueva carpeta',boton:'Crear'},function(nombre){
    var id=D.crearCarpeta(nombre);fv.sel[id]=true;pintarListaFav();
    var f=el('aa-fv-lista').querySelector('[data-carpeta="'+id+'"]');if(f){f.focus();f.scrollIntoView({block:'nearest'});}
  });
};
el('aa-corazon').onclick=function(){
  var ref=refActual();
  if(ref)abrirModalFavorito(ref);
};

var confirmarT=null;
function confirmar(titulo,detalle){
  var c=el('aa-confirmado');
  c.innerHTML='<span class="aa-cf-ico">'+SVG_OK+'</span><span><b>'+esc(titulo)+'</b>'+(detalle?'<small>'+esc(detalle)+'</small>':'')+'</span>';
  /* siempre abajo al centro (arriba tapaba las pestañas) */
  c.classList.remove('bajo','yendo');c.style.top='';c.style.right='';c.style.transform='';c.style.opacity='';
  c.classList.remove('ver');void c.offsetWidth;c.classList.add('ver');
  clearTimeout(confirmarT);confirmarT=setTimeout(function(){despedirAviso(0,0);},2200);
}
/* se va desvaneciéndose; si se lanzó con el dedo, sigue hacia ese lado */
function despedirAviso(dx,dy){
  var c=el('aa-confirmado');clearTimeout(confirmarT);
  if(!c.classList.contains('ver'))return;
  var d=Math.hypot(dx,dy)||1,lejos=dx||dy?120:0;
  c.classList.add('yendo');
  c.style.transform='translate(calc(-50% + '+(dx+dx/d*lejos)+'px),'+(dy+dy/d*lejos)+'px)';
  c.style.opacity='0';
  setTimeout(function(){c.classList.remove('ver','yendo');c.style.transform='';c.style.opacity='';},320);
}
(function(){
  var c=el('aa-confirmado');if(!c)return;
  var x0=0,y0=0,arrastra=false,dx=0,dy=0;
  c.addEventListener('pointerdown',function(e){if(!c.classList.contains('ver'))return;arrastra=true;x0=e.clientX;y0=e.clientY;dx=dy=0;clearTimeout(confirmarT);c.classList.add('arrastrando');try{c.setPointerCapture(e.pointerId);}catch(_){}});
  c.addEventListener('pointermove',function(e){
    if(!arrastra)return;dx=e.clientX-x0;dy=e.clientY-y0;
    c.style.transform='translate(calc(-50% + '+dx+'px),'+dy+'px)';
    c.style.opacity=String(Math.max(.15,1-Math.hypot(dx,dy)/160));
  });
  function soltar(){
    if(!arrastra)return;arrastra=false;c.classList.remove('arrastrando');
    if(Math.hypot(dx,dy)>40)despedirAviso(dx,dy);
    else{c.style.transform='';c.style.opacity='';confirmarT=setTimeout(function(){despedirAviso(0,0);},1600);}
  }
  c.addEventListener('pointerup',soltar);c.addEventListener('pointercancel',soltar);
})();

/* Ventanas propias: apertura suave, foco atrapado y devuelto al cerrar */
var pilaFondos=[];
function abrirFondo(id){
  var f=el(id);f.classList.add('open');f.setAttribute('aria-hidden','false');
  pilaFondos.push({id:id,foco:document.activeElement});
}
function cerrarFondo(id){
  var f=el(id);if(!f.classList.contains('open'))return;
  f.classList.remove('open');f.setAttribute('aria-hidden','true');
  var i=pilaFondos.map(function(x){return x.id;}).lastIndexOf(id);
  var foco=i>=0?pilaFondos[i].foco:null;if(i>=0)pilaFondos.splice(i,1);
  if(foco&&foco.focus&&document.contains(foco))setTimeout(function(){try{foco.focus();}catch(e){}},30);
}
document.addEventListener('keydown',function(e){
  var top=pilaFondos[pilaFondos.length-1];if(!top)return;
  var f=el(top.id);
  if(e.key==='Escape'){e.preventDefault();e.stopPropagation();cerrarFondo(top.id);return;}
  if(e.key==='Tab'){
    var foc=[].slice.call(f.querySelectorAll('button:not([disabled]):not([hidden]),[tabindex="0"],input:not([type="hidden"]),select')).filter(function(x){return x.offsetParent!==null;});
    if(!foc.length)return;
    var p=foc[0],u=foc[foc.length-1];
    if(e.shiftKey&&document.activeElement===p){e.preventDefault();u.focus();}
    else if(!e.shiftKey&&document.activeElement===u){e.preventDefault();p.focus();}
  }
},true);
['aa-fav-modal','aa-carpeta-modal','aa-elegir-modal'].forEach(function(id){el(id).addEventListener('click',function(e){if(e.target.id===id)cerrarFondo(id);});});

/* Pedir nombre (crear / renombrar) con validación de vacíos y duplicados */
var cm={alAceptar:null,excepto:null};
function pedirNombreCarpeta(opc,alAceptar){
  cm.alAceptar=alAceptar;cm.excepto=opc.excepto||null;
  el('aa-cm-titulo').textContent=opc.titulo;el('aa-cm-sub').textContent=opc.sub||'Escribe un nombre para tu carpeta';
  el('aa-cm-aceptar').textContent=opc.boton;el('aa-cm-nombre').value=opc.valor||'';el('aa-cm-error').textContent='';
  abrirFondo('aa-carpeta-modal');
  setTimeout(function(){var i=el('aa-cm-nombre');i.focus();i.select();},60);
}
function aceptarNombre(){
  var v=el('aa-cm-nombre').value.trim();
  if(!v){el('aa-cm-error').textContent='Escribe un nombre para la carpeta.';return;}
  if(!D.nombreLibre(v,cm.excepto)){el('aa-cm-error').textContent='Ya tienes una carpeta con ese nombre.';return;}
  try{var fn=cm.alAceptar;cerrarFondo('aa-carpeta-modal');fn&&fn(v);}catch(err){abrirFondo('aa-carpeta-modal');el('aa-cm-error').textContent=err.message||'No se pudo guardar.';}
}
el('aa-cm-aceptar').onclick=aceptarNombre;
el('aa-cm-nombre').addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();aceptarNombre();}});
el('aa-cm-nombre').addEventListener('input',function(){el('aa-cm-error').textContent='';});
el('aa-cm-cancelar').onclick=function(){cerrarFondo('aa-carpeta-modal');};
el('aa-cm-cerrar').onclick=function(){cerrarFondo('aa-carpeta-modal');};

/* Elegir una carpeta de destino (mover / copiar) */
var em={alAceptar:null,elegida:null};
function elegirCarpeta(opc,alAceptar){
  em.alAceptar=alAceptar;em.elegida=null;
  el('aa-em-titulo').textContent=opc.titulo;el('aa-em-sub').textContent=opc.sub||'';el('aa-em-aceptar').textContent=opc.boton;
  var lista=D.carpetasVivas().filter(function(c){return c.id!==opc.excepto;});
  el('aa-em-lista').innerHTML=lista.length?lista.map(function(c){return '<li><div class="aa-fv-fila" role="radio" tabindex="0" aria-checked="false" data-carpeta="'+esc(c.id)+'"><span class="aa-fv-ico">'+SVG_CARPETA+'</span><span class="aa-fv-nombre">'+esc(c.nombre)+'</span><span class="aa-fv-check radio" aria-hidden="true">'+SVG_CHECK+'</span></div></li>';}).join(''):'<li class="aa-fv-vacio">No hay otra carpeta. Crea una primero.</li>';
  el('aa-em-aceptar').disabled=true;
  abrirFondo('aa-elegir-modal');
  setTimeout(function(){var p=el('aa-em-lista').querySelector('[role="radio"]');(p||el('aa-em-cancelar')).focus();},60);
}
function marcarRadio(f){
  el('aa-em-lista').querySelectorAll('[role="radio"]').forEach(function(x){x.classList.remove('on');x.setAttribute('aria-checked','false');});
  f.classList.add('on');f.setAttribute('aria-checked','true');em.elegida=f.dataset.carpeta;el('aa-em-aceptar').disabled=false;
}
el('aa-em-lista').addEventListener('click',function(e){var f=e.target.closest('[role="radio"]');if(f)marcarRadio(f);});
el('aa-em-lista').addEventListener('keydown',function(e){var f=e.target.closest('[role="radio"]');if(f&&(e.key===' '||e.key==='Enter')){e.preventDefault();marcarRadio(f);}});
el('aa-em-aceptar').onclick=function(){if(!em.elegida)return;var fn=em.alAceptar,d=em.elegida;cerrarFondo('aa-elegir-modal');try{fn&&fn(d);}catch(err){pcAviso(err.message||'No se pudo completar.');}};
el('aa-em-cancelar').onclick=function(){cerrarFondo('aa-elegir-modal');};
el('aa-em-cerrar').onclick=function(){cerrarFondo('aa-elegir-modal');};

/* Vista Favoritos */
var vf={carpeta:null};
/* posición del tablero en un ítem (para la miniatura del favorito) */
function posicionDeItem(l,item){
  if(!l||!l.descubre)return null;
  var ps=pasosDe(l),p=ps[Math.max(1,Math.min(item||1,ps.length))-1],oD=l.descubre.orient||ladoDe(l.descubre.fen);
  if(!p||p.etapa==='descubre')return {fen:l.descubre.fen,o:oD};
  if(p.etapa==='observa'||p.etapa==='comprende'){
    if(p.etapa==='comprende'&&l.comprende&&l.comprende.fen)return {fen:l.comprende.fen,o:oD};
    var hasta=p.etapa==='observa'?p.paso:l.observa.length-1,base=l.descubre.fen,jug=[];
    for(var i=0;i<=hasta;i++){var x=l.observa[i];if(x.fen){base=x.fen;jug=[];}if(x.jugada)jug.push(x.jugada);}
    try{var g=new Chess(base);jug.forEach(function(u){g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});});return {fen:g.fen(),o:(l.observa[0]&&l.observa[0].orient)||oD};}catch(e){return {fen:base,o:oD};}
  }
  var t=l[p.etapa];return t&&t.fen?{fen:t.fen,o:t.orient||ladoDe(t.fen)}:{fen:l.descubre.fen,o:oD};
}
function miniTablero(ref){
  var pr=partesFav(ref),l=LEC[pr.id],pos=posicionDeItem(l,pr.item),fen=pos&&pos.fen;
  if(!fen)return '<span class="aa-mini vacio" aria-hidden="true"></span>';
  var g;try{g=new Chess(fen);}catch(e){return '<span class="aa-mini vacio"></span>';}
  var b=g.board(),o=pos.o,h='';
  for(var r=0;r<8;r++)for(var f=0;f<8;f++){
    var rr=o==='w'?r:7-r,ff=o==='w'?f:7-f,pc=b[rr][ff];
    h+='<i class="'+((rr+ff)%2?'d':'l')+'">'+(pc?PIECES[(pc.color==='w'?'w':'b')+pc.type.toUpperCase()]:'')+'</i>';
  }
  return '<span class="aa-mini" aria-hidden="true">'+h+'</span>';
}
function pintarFavoritos(){
  var cont=el('aa-fav-contenido');if(!cont)return;
  var f=D.favoritos(),carpetas=D.carpetasVivas(f),items=D.itemsVivos(f);
  var q=el('aa-fav-buscar').value.trim().toLocaleLowerCase('es'),orden=el('aa-fav-orden').value;
  if(vf.carpeta&&!carpetas.some(function(c){return c.id===vf.carpeta;}))vf.carpeta=null;
  el('aa-fav-atras').hidden=!vf.carpeta;
  function ordenar(lista){
    return lista.sort(function(a,b){
      var pa=partesFav(a.leccion),pb=partesFav(b.leccion),ca=catalogoDe(pa.id),cb=catalogoDe(pb.id);
      if(orden==='nombre')return (ca?ca.titulo:'').localeCompare(cb?cb.titulo:'','es')||pa.item-pb.item;
      if(orden==='nivel')return ((ca?ca.orden:0)-(cb?cb.orden:0))||pa.item-pb.item;
      return b.agregado-a.agregado;
    });
  }
  function fila(it,mostrarCarpeta){
    var c=catalogoDe(partesFav(it.leccion).id);if(!c)return '';var e=estadoVisible(partesFav(it.leccion).id);
    var nomC=mostrarCarpeta?((carpetas.filter(function(x){return x.id===it.carpeta;})[0]||{}).nombre||''):'';
    return '<li class="aa-fav-item" data-leccion="'+it.leccion+'" data-carpeta="'+esc(it.carpeta)+'">'+
      '<button type="button" class="aa-fav-abrir" data-accion="abrir">'+miniTablero(it.leccion)+'<span class="aa-fav-txt"><small>'+esc(etiquetaFav(it.leccion))+(nomC?' · '+esc(nomC):'')+'</small><b>'+esc(c.titulo)+'</b><span class="aa-fl-est e-'+e+'"><i aria-hidden="true">'+ICONO_ESTADO[e]+'</i>'+TEXTO_ESTADO[e]+'</span></span></button>'+
      '<span class="aa-fav-acciones"><button type="button" class="aa-fv-mini" data-accion="mover">Mover</button><button type="button" class="aa-fv-mini" data-accion="copiar">Copiar a…</button><button type="button" class="aa-fv-mini peligro" data-accion="quitar">Quitar</button></span></li>';
  }
  if(q){
    var res=ordenar(items.filter(function(it){var c=catalogoDe(partesFav(it.leccion).id);return c&&(c.titulo.toLocaleLowerCase('es').indexOf(q)>=0||it.leccion.toLowerCase().indexOf(q)>=0)&&(!vf.carpeta||it.carpeta===vf.carpeta);}));
    el('aa-fav-titulo').textContent='Resultados';
    el('aa-fav-lead').textContent=res.length?(res.length+' resultado'+(res.length===1?'':'s')+' para «'+el('aa-fav-buscar').value.trim()+'».'):'No hay favoritos que coincidan.';
    cont.innerHTML='<ul class="aa-fav-items">'+res.map(function(it){return fila(it,true);}).join('')+'</ul>';
    return;
  }
  if(!vf.carpeta){
    el('aa-fav-titulo').textContent='Mis favoritos';
    el('aa-fav-lead').textContent='Guarda cualquier ítem de una lección con el corazón y organízalo en carpetas para repasarlo cuando quieras.';
    cont.innerHTML=carpetas.length?'<ul class="aa-carpetas">'+carpetas.map(function(c){
      var n=items.filter(function(it){return it.carpeta===c.id;}).length;
      return '<li class="aa-carpeta" data-carpeta="'+esc(c.id)+'"><button type="button" class="aa-carpeta-abrir" data-accion="ver"><span class="aa-fv-ico">'+SVG_CARPETA+'</span><span class="aa-carpeta-nombre">'+esc(c.nombre)+'</span><span class="aa-carpeta-n">'+n+' favorito'+(n===1?'':'s')+'</span></button>'+
        '<span class="aa-carpeta-acc"><button type="button" class="aa-icono" data-accion="renombrar" aria-label="Renombrar '+esc(c.nombre)+'" title="Renombrar">'+SVG_LAPIZ+'</button><button type="button" class="aa-icono" data-accion="eliminar" aria-label="Eliminar '+esc(c.nombre)+'" title="Eliminar">'+SVG_PAPELERA+'</button></span></li>';
    }).join('')+'</ul>':'<p class="aa-vacio">No tienes carpetas. Crea una con «Nueva carpeta».</p>';
    return;
  }
  var cc=carpetas.filter(function(c){return c.id===vf.carpeta;})[0];
  var suyos=ordenar(items.filter(function(it){return it.carpeta===vf.carpeta;}));
  el('aa-fav-titulo').textContent=cc.nombre;
  el('aa-fav-lead').textContent=suyos.length?(suyos.length+' favorito'+(suyos.length===1?'':'s')+'. Toca uno para abrir ese ítem.'):'Esta carpeta está vacía. Usa el corazón de cualquier ítem para guardarlo aquí.';
  cont.innerHTML=(suyos.length?'<div class="aa-fav-herr"><button type="button" class="aa-fv-mini" data-accion="copiar-todo">Copiar todo a otra carpeta</button></div>':'')+'<ul class="aa-fav-items">'+suyos.map(function(it){return fila(it,false);}).join('')+'</ul>';
}
el('aa-fav-contenido').addEventListener('click',function(e){
  var b=e.target.closest('[data-accion]');if(!b)return;
  var acc=b.dataset.accion,car=b.closest('[data-carpeta]'),it=b.closest('.aa-fav-item');
  var cid=car&&car.dataset.carpeta;
  if(acc==='ver'){vf.carpeta=cid;pintarFavoritos();window.scrollTo({top:0});return;}
  if(acc==='renombrar'){var c=D.carpetasVivas().filter(function(x){return x.id===cid;})[0];
    pedirNombreCarpeta({titulo:'Renombrar carpeta',boton:'Guardar',valor:c.nombre,excepto:cid},function(n){D.renombrarCarpeta(cid,n);pintarFavoritos();confirmar('Carpeta renombrada',n);});return;}
  if(acc==='eliminar'){var c2=D.carpetasVivas().filter(function(x){return x.id===cid;})[0];
    pedirConfirmacion('¿Eliminar la carpeta «'+c2.nombre+'»? Se borra solo esta organización: las lecciones originales, tu progreso y tus otras carpetas no cambian.',function(){D.eliminarCarpeta(cid);if(vf.carpeta===cid)vf.carpeta=null;pintarFavoritos();actualizarCorazon();confirmar('Carpeta eliminada',c2.nombre);});return;}
  if(acc==='copiar-todo'){elegirCarpeta({titulo:'Copiar a otra carpeta',sub:'Los favoritos seguirán también en esta carpeta.',boton:'Copiar',excepto:vf.carpeta},function(d){var n=D.copiarCarpeta(vf.carpeta,d);pintarFavoritos();confirmar(n?('Copiado'+(n===1?'':'s')+' '+n+' favorito'+(n===1?'':'s')):'Ya estaban todos en esa carpeta');});return;}
  if(!it)return;
  var lid=it.dataset.leccion,origen=it.dataset.carpeta;
  if(acc==='abrir'){var cn=(D.carpetasVivas().filter(function(x){return x.id===origen;})[0]||{}).nombre||'Mis favoritos';
    /* lleva exactamente al nivel, la lección y el ítem guardados */
    var op=opcionesItem(lid);op.volverA={carpeta:vf.carpeta||null,nombre:vf.carpeta?cn:'Mis favoritos'};
    abrirLeccion(partesFav(lid).id,op);return;}
  if(acc==='quitar'){D.quitarDeCarpeta(lid,origen);pintarFavoritos();actualizarCorazon();confirmar('Quitado de la carpeta','El historial de la lección se conserva.');return;}
  if(acc==='mover'){elegirCarpeta({titulo:'Mover a otra carpeta',sub:etiquetaFav(lid)+' · '+(catalogoDe(partesFav(lid).id)||{}).titulo,boton:'Mover',excepto:origen},function(d){D.moverA(lid,origen,d);pintarFavoritos();confirmar('Favorito movido');});return;}
  if(acc==='copiar'){elegirCarpeta({titulo:'Copiar a otra carpeta',sub:etiquetaFav(lid)+' · '+(catalogoDe(partesFav(lid).id)||{}).titulo,boton:'Copiar',excepto:origen},function(d){var ok=D.copiarA(lid,d);pintarFavoritos();confirmar(ok?'Favorito copiado':'Ya estaba en esa carpeta');});return;}
});
el('aa-fav-atras').onclick=function(){vf.carpeta=null;pintarFavoritos();};
el('aa-fav-nueva').onclick=function(){pedirNombreCarpeta({titulo:'Nueva carpeta',boton:'Crear'},function(n){D.crearCarpeta(n);pintarFavoritos();confirmar('Carpeta creada',n);});};
el('aa-fav-buscar').addEventListener('input',pintarFavoritos);
el('aa-fav-orden').addEventListener('change',function(){guardarPref('ordenFavoritos',this.value);pintarFavoritos();});
(function(){var o=prefs().ordenFavoritos;if(o&&/^(fecha|nombre|nivel)$/.test(o))el('aa-fav-orden').value=o;})();

/* Sin botón «Volver»: la pestaña de arriba (Temario, Mis favoritos o Explorar) lleva de vuelta a la lista.
   Si la lección se abrió desde una carpeta de favoritos, la pestaña Mis favoritos vuelve a esa carpeta. */
function pintarVolver(){}

/* =====================================================================
   Pestañas
   ===================================================================== */
/* Pestañas: Temario, Mis favoritos, Explorar y Ayuda. La lección (vista «train») no tiene pestaña
   propia: se abre dentro del Temario (o de Explorar / Mis favoritos) y esa pestaña queda marcada. */
function pestanaMarcada(v){
  if(v!=='train')return v;
  if(A.modo==='descubre')return 'discover';
  return A.volverA?'favs':'levels';
}
function pestana(v){
  var m=pestanaMarcada(v);
  document.querySelectorAll('#tabs .tab').forEach(function(t){t.classList.toggle('active',t.dataset.v===m);});
  document.querySelectorAll('.view').forEach(function(x){x.classList.toggle('active',x.id==='v-'+v);});
  document.body.classList.toggle('aa-en-leccion',v==='train');
  if(v==='levels')pintarNiveles();
  if(v==='favs')pintarFavoritos();
  if(v==='discover')pintarStatsDescubre();
  if(v!=='train'){pararDemo();quitarMascota();}
}
function irAPestanaLeccion(){pestana('train');}
function volverAlTemario(){
  var fila=document.querySelector('#aa-niveles .aa-ultima'),t=A.temario;
  if(t&&fila&&fila.dataset.leccion===t.id){window.scrollTo(0,t.y);return;}
  if(fila){var r=fila.getBoundingClientRect();window.scrollTo(0,Math.max(0,window.scrollY+r.top-(window.innerHeight-r.height)/2));return;}
  window.scrollTo(0,0);
}

/* Fila bajo el tutor: Historial · Pista · Solución a la izquierda; lección anterior y siguiente a la derecha.
   Historial solo con su icono, del mismo tamaño que la bombilla. */
var ICONO_SOL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
var ICONO_PAUSA_SOL='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M9 6v12M15 6v12"/></svg>';
/* el botón Solución conserva su forma (icono + texto que se oculta en pantallas estrechas) */
actualizarBotonSolucion=function(rep){
  var b=el('b-sol');if(!b)return;
  b.innerHTML=(rep?ICONO_PAUSA_SOL:ICONO_SOL)+'<span class="aa-sol-txt">'+(rep?'Pausar':'Solución')+'</span>';
  b.title=rep?'Pausar la solución':'Solución';b.setAttribute('aria-label',b.title);
};
(function(){
  var izq=el('aa-fila-nav-izq');if(!izq)return;
  var h=el('b-hist-open');
  if(h){
    h.className='btn aa-btn-icono aa-btn-historial';h.type='button';h.title='Historial';h.setAttribute('aria-label','Historial');
    h.innerHTML='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
    izq.appendChild(h);
  }
  var p=el('b-hint');if(p){p.className='btn aa-btn-icono';izq.appendChild(p);}
  var so=el('b-sol');if(so){so.className='btn aa-btn-sol';so.type='button';izq.appendChild(so);actualizarBotonSolucion(false);}
})();
/* En los ejercicios de tocar casillas, «Solución» marca las casillas correctas */
(function(){
  var so=el('b-sol');if(!so)return;var base=so.onclick;
  so.onclick=function(){
    if(A.modo==='leccion'&&A.tarea&&A.tarea.tipo==='casilla'&&!A.resuelta){
      contarPista();
      A.capa.marcas=A.tarea.def.casillas.map(function(x){return [x,'clave'];});pintarCapa(false);
      tutor('Son '+A.tarea.def.casillas.join(', ')+'. Ahora tócalas tú en el tablero.');
      return;
    }
    if(base)return base.apply(this,arguments);
  };
})();
/* Pista y Solución se encienden solo cuando hay un ejercicio sin resolver; si no, quedan apagadas */
function pintarAyudas(){
  var h=el('b-hint'),so=el('b-sol');if(!h||!so)return;
  var activo=!!A.tarea&&!A.resuelta&&(A.modo==='leccion'||A.modo==='descubre');
  if(A.modo==='descubre'&&A.descubreItem&&A.descubreItem.revelado)activo=false;
  var sonando=false;try{sonando=!!reproduciendoSolucion;}catch(e){}
  h.disabled=!activo;so.disabled=!activo&&!sonando;
}
document.querySelectorAll('#tabs .tab').forEach(function(t){
  t.onclick=function(){A.vistaAuto=false;var desde=document.body.classList.contains('aa-en-leccion');if(t.dataset.v==='favs'&&A.volverA&&desde)vf.carpeta=A.volverA.carpeta;pestana(t.dataset.v);
    /* Temario: vuelve justo adonde estabas al abrir la lección (o a la última lección, sombreada) */
    if(t.dataset.v==='levels'&&desde){volverAlTemario();return;}
    window.scrollTo({top:0,behavior:'smooth'});};
});
el('b-home').onclick=function(){A.vistaAuto=false;pestana('levels');};

/* El libro (Explicación): análisis automático de la posición actual, como en PC1,
   precedido de la idea de la lección. */
var exRenderBase=exRender;
exRender=function(){
  exRenderBase.apply(this,arguments);
  try{
    var cat=catalogoDe(A.id);
    if(A.modo==='leccion'&&cat){
      el('explain-kicker').textContent=CAT.etiqueta(A.id);
      el('explain-subtitle').textContent=cat.titulo+(A.lec&&A.lec.idea?' — '+plano(A.lec.idea):'');
    }else if(A.modo==='descubre'){
      el('explain-kicker').textContent='DESCUBRE LA TÁCTICA';
      el('explain-subtitle').textContent=A.descubreItem&&A.descubreItem.revelado?'Era: '+A.descubreItem.motivo:'La explicación revela la jugada clave.';
    }
  }catch(e){}
};

/* Atrás en Android: cierra ventanas propias primero */
var atrasBase=window.PC_ANDROID_BACK;
window.PC_ANDROID_BACK=function(){
  var top=pilaFondos[pilaFondos.length-1];if(top){cerrarFondo(top.id);return true;}
  return typeof atrasBase==='function'?atrasBase():true;
};

/* Cambios llegados de la nube (otro dispositivo): se repinta lo visible */
window.addEventListener('storage',function(e){
  if(!e||!e.key||e.key.indexOf('aa_')!==0)return;
  /* Mismo código en otro dispositivo: si allí se avanzó después, se continúa donde se quedó
     (como en los métodos PC1 y PC2). Este marco nunca recibe sus propias escrituras. */
  if(e.key===D.CLAVES.ultimo){clearTimeout(window.__aaSeguir);window.__aaSeguir=setTimeout(seguirUltimoRemoto,120);}
  clearTimeout(window.__aaRepintar);
  window.__aaRepintar=setTimeout(function(){
    try{renderProgress();actualizarCorazon();pintarEtapas();renderHead();
      if(el('v-levels').classList.contains('active'))pintarNiveles();
      if(el('v-favs').classList.contains('active')&&!document.querySelector('.aa-fv-fondo.open'))pintarFavoritos();
      if(el('v-discover').classList.contains('active'))pintarStatsDescubre();
    }catch(err){}
  },60);
});

/* =====================================================================
   9. Recorrido inicial (mano animada), solo la primera vez
   ===================================================================== */
var TOUR=[
  {t:'Tu lección',x:'Así se ve una lección. Te muestro en un momento qué tocar.',sel:null},
  {t:'Los pasos',x:'Cada número a la derecha del tablero es un paso de la lección. Se pone verde cuando lo terminas. Toca cualquiera para ir a él.',sel:'#aa-etapas'},
  {t:'Mueve en el tablero',x:'Cuando tu tutor diga «Mueve en el tablero», arrastra la pieza o tócala y luego toca la casilla.',sel:'#board',arrastre:true},
  {t:'Tu tutor',x:'La mascota te explica cada paso y la lección avanza sola.',sel:'#aa-tutor'},
  {t:'Pausa y avanza',x:'«Pausar» detiene la lección. Con ‹ y › pasas al número anterior o al siguiente. Al terminar la lección, el botón de la lección siguiente se ilumina.',sel:'#aa-controles'},
  {t:'Tus botones',x:'El reloj abre tu historial. La bombilla da pistas poco a poco y «Solución» muestra la respuesta: se encienden cuando hay un ejercicio.',sel:'#aa-fila-nav-izq'},
  {t:'Otras lecciones',x:'Aquí pasas a la lección anterior o a la siguiente.',sel:'.aa-fila-nav-der'},
  {t:'Guarda tus favoritos',x:'El corazón guarda el ítem que estás viendo (nivel, lección y número) en una o varias carpetas. Desde Mis favoritos vuelves justo a ese ítem.',sel:'#aa-corazon'},
  {t:'Siempre a mano',x:'Las pestañas quedan arriba aunque bajes por la página. Toca «Temario» para volver a la lista de lecciones.',sel:'#tabs'},
  {t:'Tu tablero',x:'Aquí eliges el tablero. Tus tableros favoritos y personalizados son los mismos en el Método PC1 y el Método PC2.',sel:'#pc-tablero-btn'},
  {t:'¡A aprender!',x:'Tu avance se guarda solo y, con tu ID, se sincroniza en tus dispositivos. Puedes volver a ver este recorrido desde Ayuda.',sel:null,fin:true}
];
var tour={i:0,nodo:null};
function crearTour(){
  if(tour.nodo)return tour.nodo;
  var n=document.createElement('div');n.className='aa-tour';n.innerHTML='<div class="aa-tour-foco"></div><span class="aa-tour-mano" aria-hidden="true">👆</span><section class="aa-tour-card" role="dialog" aria-modal="false" aria-labelledby="aa-tour-t"><span class="aa-tour-paso"></span><h3 id="aa-tour-t"></h3><p></p><div class="aa-tour-acc"><button type="button" class="aa-tour-cerrar">Cerrar</button><button type="button" class="aa-tour-atras">Atrás</button><button type="button" class="aa-tour-sig">Siguiente</button></div></section>';
  document.body.appendChild(n);tour.nodo=n;
  n.querySelector('.aa-tour-cerrar').onclick=cerrarTour;
  n.querySelector('.aa-tour-atras').onclick=function(){tour.i=Math.max(0,tour.i-1);pintarTour();};
  n.querySelector('.aa-tour-sig').onclick=function(){if(TOUR[tour.i].fin){cerrarTour();return;}tour.i++;pintarTour();};
  window.addEventListener('resize',function(){if(n.classList.contains('open'))pintarTour();});
  return n;
}
function colorTour(n){
  /* color de la plantilla (tablero) elegida; por defecto, Cielo */
  var col=(getComputedStyle(document.documentElement).getPropertyValue('--dark')||'').trim(),m=/^#?([0-9a-f]{6})$/i.exec(col);
  if(!m){col='#7AA4BB';m=['','7AA4BB'];}
  var x=parseInt(m[1],16),c=[x>>16&255,x>>8&255,x&255].map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);}),L=.2126*c[0]+.7152*c[1]+.0722*c[2];
  n.style.setProperty('--aa-tour-sig-txt',L>.4?'#16181b':'#fff');
  n.style.setProperty('--aa-tour-etiqueta',L>.45?'var(--muted)':col);
}
function pintarTour(){
  var n=crearTour(),p=TOUR[tour.i],card=n.querySelector('.aa-tour-card'),foco=n.querySelector('.aa-tour-foco'),mano=n.querySelector('.aa-tour-mano');
  colorTour(n);
  n.querySelector('.aa-tour-paso').textContent='Paso '+(tour.i+1)+' de '+TOUR.length;
  n.querySelector('h3').textContent=p.t;n.querySelector('p').textContent=p.x;
  n.querySelector('.aa-tour-atras').disabled=tour.i===0;
  n.querySelector('.aa-tour-sig').textContent=p.fin?'Empezar':'Siguiente';
  var obj=p.sel?document.querySelector(p.sel):null;
  if(obj&&obj.offsetParent!==null){
    try{obj.scrollIntoView({block:'center'});}catch(e){}
    var r=obj.getBoundingClientRect(),m=6;
    foco.style.cssText='left:'+(r.left-m)+'px;top:'+(r.top-m)+'px;width:'+(r.width+2*m)+'px;height:'+(r.height+2*m)+'px';
    n.classList.add('con-foco');
    var cy=r.top+r.height/2;card.className='aa-tour-card '+(cy>innerHeight*.55?'arriba':'abajo');
    mano.className='aa-tour-mano ver '+(p.arrastre?'arrastre':'toque');
    mano.style.setProperty('--x',(r.left+r.width*(p.arrastre?.38:.5))+'px');
    mano.style.setProperty('--y',(r.top+r.height*(p.arrastre?.72:.55))+'px');
    mano.style.setProperty('--y2',(r.top+r.height*.45)+'px');
  }else{
    n.classList.remove('con-foco');card.className='aa-tour-card centro';
    mano.className='aa-tour-mano ver saludo';mano.style.setProperty('--x',(innerWidth/2)+'px');mano.style.setProperty('--y',Math.max(40,innerHeight/2-150)+'px');
  }
}
function abrirTour(){if(!A.id||A.modo!=='leccion')continuarAprendiendo();else pestana('train');tour.i=0;crearTour().classList.add('open');pintarTour();}
function cerrarTour(){if(tour.nodo)tour.nodo.classList.remove('open');try{localStorage.setItem('aa_tour_visto_v1','1');}catch(e){}}
window.aaAbrirTour=abrirTour;

/* =====================================================================
   10. Arranque
   ===================================================================== */
/* Las carpetas iniciales se llamaban «Nivel 1»…«Nivel 6»: ahora usan números romanos.
   Solo se renombran las que conservan el nombre original (las que la persona cambió, no). */
function carpetasEnRomanos(){
  try{D.carpetasVivas().forEach(function(c){
    var m=/^nivel-([1-6])$/.exec(c.id);if(!m||c.nombre!=='Nivel '+m[1])return;
    try{D.renombrarCarpeta(c.id,'Nivel '+CAT.romano[+m[1]]);}catch(e){}
  });}catch(e){}
}
function arrancar(){
  carpetasEnRomanos();
  migrarFavoritosAItems();
  renderProgress();
  var u=D.leer(K.ultimo);
  A.sinGuardarUltimo=true;
  try{
    if(u.modo==='leccion'&&u.leccion&&catalogoDe(u.leccion))abrirLeccion(u.leccion,{etapa:u.etapa||undefined,paso:u.paso,jugadas:u.jugadas,restaurando:true});
    else{A.vistaAuto=true;pestana('levels');}
  }finally{A.sinGuardarUltimo=false;}
  var visto=false;try{visto=localStorage.getItem('aa_tour_visto_v1')==='1';}catch(e){}
  if(!visto){
    /* espera a que la sección esté visible (está dentro de un marco del menú) */
    var vigia=setInterval(function(){
      try{visto=localStorage.getItem('aa_tour_visto_v1')==='1';}catch(e){}
      if(visto){clearInterval(vigia);return;}
      /* Dentro de la app: si el tutorial general aún no se vio (o está abierto), manda ese. */
      try{var P=window.parent;if(P&&P!==window&&P.PCTutorial&&(P.PCTutorial.abierto()||localStorage.getItem('pc_tutorial_visto_v1')!=='1'))return;}catch(e){}
      if(document.visibilityState==='visible'&&boardEl.getBoundingClientRect().width>0&&!document.querySelector('.aa-fv-fondo.open')){clearInterval(vigia);setTimeout(abrirTour,500);}
    },600);
  }
}
var bGuia=document.createElement('button');bGuia.type='button';bGuia.className='btn';bGuia.textContent='Ver el recorrido de nuevo';bGuia.onclick=abrirTour;
var guia=el('v-guide').querySelector('.reading');if(guia)guia.appendChild(bGuia);

window.AAApp={pasos:function(){return pasosDe(A.lec);},paso:function(){return indicePaso();},abrirLeccion:abrirLeccion,continuar:continuarAprendiendo,pestana:pestana,estado:A,abrirModalFavorito:abrirModalFavorito,abrirTour:abrirTour};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',arrancar,{once:true});else arrancar();
})();
