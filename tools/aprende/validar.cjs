#!/usr/bin/env node
/* Valida el contenido ajedrecístico de las lecciones de Aprende Ajedrez.
   - Posiciones FEN legales (estructura, reyes, peones, bando que no mueve sin jaque).
   - Demostraciones: cada jugada legal; cada flecha y marca corresponde a lo que
     ocurre en el tablero (un «ataque» ataca de verdad esa casilla, una pieza
     «defendida» está defendida, una «indefensa» no lo está, etc.).
   - Ejercicios: líneas legales y, con Stockfish, que la jugada pedida sea la mejor,
     que no existan otras jugadas igual de buenas sin aceptar y que las respuestas
     del rival sean defensas razonables. En las tareas de mate se calculan todas
     las jugadas que dan mate (todas se aceptan).
   Uso:  node tools/aprende/validar.cjs [ID ...]   (requiere tools/aprende/node_modules)
*/
const fs=require('fs'),path=require('path'),vm=require('vm');
const RAIZ=path.resolve(__dirname,'../..');
const {Chess}=require('./chess.cjs');
let SF=null;try{SF=require('./sf.cjs').SF;}catch(e){}

const ctx={window:{},console};ctx.window.window=ctx.window;vm.createContext(ctx);
for(const f of ['aa-catalogo.js','aa-lecciones-n1.js','aa-lecciones-n2.js','aa-lecciones-n3.js','aa-descubre-extra.js']){
  const p=path.join(RAIZ,f);if(fs.existsSync(p))vm.runInContext(fs.readFileSync(p,'utf8'),ctx,{filename:f});
}
const CAT=ctx.window.AA_CATALOGO,LEC=ctx.window.AA_LECCIONES||{},EXTRA=ctx.window.AA_DESCUBRE_EXTRA||[];
const filtro=process.argv.slice(2).filter(a=>!a.startsWith('-'));
const sinMotor=process.argv.includes('--sin-motor');
const errores=[],avisos=[];
const err=(id,m)=>errores.push(id+': '+m), av=(id,m)=>avisos.push(id+': '+m);

function fenLegal(id,fen){
  const g=new Chess();
  const v=g.validate_fen(fen);
  if(!v.valid){err(id,'FEN inválido «'+fen+'»: '+v.error);return null;}
  g.load(fen);
  const b=g.board();let rw=0,rb=0;
  for(let r=0;r<8;r++)for(let f=0;f<8;f++){const p=b[r][f];if(!p)continue;if(p.type==='k'){p.color==='w'?rw++:rb++;}if(p.type==='p'&&(r===0||r===7))err(id,'peón en la primera u octava fila: '+fen);}
  if(rw!==1||rb!==1)err(id,'debe haber exactamente un rey de cada color: '+fen);
  // el bando que NO mueve no puede estar en jaque
  const partes=fen.split(' ');partes[1]=partes[1]==='w'?'b':'w';partes[3]='-';
  const g2=new Chess();if(g2.load(partes.join(' '))&&g2.in_check())err(id,'el bando que no mueve está en jaque: '+fen);
  return g;
}
const FILES='abcdefgh';
function ataca(g,desde,hacia){
  // ¿la pieza de «desde» ataca la casilla «hacia»? (geometría + piezas en medio)
  const p=g.get(desde);if(!p)return false;
  const x=FILES.indexOf(desde[0]),y=+desde[1],tx=FILES.indexOf(hacia[0]),ty=+hacia[1],dx=tx-x,dy=ty-y;
  if(!dx&&!dy)return false;
  if(p.type==='p'){const d=p.color==='w'?1:-1;return Math.abs(dx)===1&&dy===d;}
  if(p.type==='n')return (Math.abs(dx)===1&&Math.abs(dy)===2)||(Math.abs(dx)===2&&Math.abs(dy)===1);
  if(p.type==='k')return Math.max(Math.abs(dx),Math.abs(dy))===1;
  const recta=dx===0||dy===0,diag=Math.abs(dx)===Math.abs(dy);
  if(p.type==='r'&&!recta)return false;if(p.type==='b'&&!diag)return false;if(p.type==='q'&&!recta&&!diag)return false;
  const sx=Math.sign(dx),sy=Math.sign(dy);let cx=x+sx,cy=y+sy;
  while(cx!==tx||cy!==ty){if(g.get(FILES[cx]+cy))return false;cx+=sx;cy+=sy;}
  return true;
}
function atacantes(g,sq,color){const out=[];for(const f of FILES)for(let r=1;r<=8;r++){const s=f+r,p=g.get(s);if(p&&p.color===color&&ataca(g,s,sq))out.push(s);}return out;}
function rayoX(g,desde,hacia){
  // línea de influencia: recta o diagonal del tipo correcto, admitiendo piezas en medio
  const p=g.get(desde);if(!p)return false;
  const x=FILES.indexOf(desde[0]),y=+desde[1],tx=FILES.indexOf(hacia[0]),ty=+hacia[1],dx=tx-x,dy=ty-y;
  const recta=dx===0||dy===0,diag=Math.abs(dx)===Math.abs(dy);
  if(p.type==='r')return recta;if(p.type==='b')return diag;if(p.type==='q')return recta||diag;
  return ataca(g,desde,hacia);
}
function revisarSenales(id,g,flechas,marcas,donde){
  for(const f of flechas||[]){
    const [a,b,t]=f,p=g.get(a);
    if(!/^[a-h][1-8]$/.test(a)||!/^[a-h][1-8]$/.test(b)){err(id,donde+': flecha con casillas inválidas '+f);continue;}
    if(!p){err(id,donde+': flecha '+a+'→'+b+' sin pieza en '+a);continue;}
    if(t==='mov'||!t){
      const legal=new Chess(g.fen()).moves({verbose:true}).some(m=>m.from===a&&m.to===b);
      if(!legal){ // jugada del otro bando: se acepta si sería legal con su turno
        const pr=g.fen().split(' ');pr[1]=pr[1]==='w'?'b':'w';pr[3]='-';const g2=new Chess();
        if(!(g2.load(pr.join(' '))&&g2.moves({verbose:true}).some(m=>m.from===a&&m.to===b)))err(id,donde+': la flecha de jugada '+a+'→'+b+' no es una jugada legal');
      }
    }else if(t==='ataque'||t==='amenaza'){
      if(!ataca(g,a,b))err(id,donde+': '+a+' no ataca '+b+' (flecha de '+t+')');
      const q=g.get(b);if(q&&q.color===p.color)err(id,donde+': flecha de '+t+' hacia una pieza propia en '+b);
    }else if(t==='defensa'){
      if(!ataca(g,a,b))err(id,donde+': '+a+' no defiende '+b);
      const q=g.get(b);if(q&&q.color!==p.color)err(id,donde+': la defensa '+a+'→'+b+' apunta a una pieza rival');
    }else if(t==='linea'){
      if(!rayoX(g,a,b))err(id,donde+': '+a+'→'+b+' no es una línea de influencia de esa pieza');
    }else err(id,donde+': tipo de flecha desconocido '+t);
  }
  for(const m of marcas||[]){
    const [s,t]=m,p=g.get(s);
    if(!/^[a-h][1-8]$/.test(s)){err(id,donde+': marca inválida '+m);continue;}
    if(['amenazada','defendida','indefensa','jaque'].includes(t)&&!p){err(id,donde+': marca '+t+' en '+s+' sin pieza');continue;}
    if(t==='amenazada'&&!atacantes(g,s,p.color==='w'?'b':'w').length)err(id,donde+': '+s+' marcada como amenazada pero nadie la ataca');
    if(t==='defendida'&&!atacantes(g,s,p.color).length)err(id,donde+': '+s+' marcada como defendida pero no la defiende nadie');
    if(t==='indefensa'&&atacantes(g,s,p.color).length)err(id,donde+': '+s+' marcada como indefensa pero está defendida por '+atacantes(g,s,p.color).join(','));
    if(t==='jaque'){if(p.type!=='k')err(id,donde+': marca de jaque en '+s+' que no es un rey');else if(!atacantes(g,s,p.color==='w'?'b':'w').length)err(id,donde+': el rey de '+s+' no está en jaque');}
    if(t==='escape'&&p&&p.color)av(id,donde+': casilla de escape '+s+' ocupada');
  }
}
function jugar(g,u){return g.move({from:u.slice(0,2),to:u.slice(2,4),promotion:u[4]||'q'});}
function puntos(sc,lado){ // a centipeones desde el punto de vista de «lado» (el que mueve en esa posición)
  if(!sc)return 0;if(sc.mate!=null)return sc.mate>0?100000-sc.mate*100:-100000-sc.mate*100;return sc.cp;
}
async function revisarTarea(id,t,donde,sf){
  if(!t){err(id,donde+': falta');return;}
  const tipo=t.tipo||'jugada';
  if(tipo==='pregunta'){
    if(!Array.isArray(t.opciones)||t.opciones.length<2)err(id,donde+': la pregunta necesita opciones');
    if(!(t.correcta>=0&&t.correcta<(t.opciones||[]).length))err(id,donde+': índice de respuesta correcta fuera de rango');
    if(t.fen){const g=fenLegal(id+' '+donde,t.fen);if(g)revisarSenales(id,g,t.flechas,t.marcas,donde);}
    return;
  }
  const g=fenLegal(id+' '+donde,t.fen);if(!g)return;
  if(tipo==='casilla'){
    if(!t.casillas||!t.casillas.length)err(id,donde+': faltan casillas');
    (t.casillas||[]).forEach(s=>{if(!/^[a-h][1-8]$/.test(s))err(id,donde+': casilla inválida '+s);});
    // verificación automática del conjunto de casillas correctas
    if(t.verificar){
      const [tipoV,color]=t.verificar.split(':');const esperado=new Set();
      for(const f of FILES)for(let r=1;r<=8;r++){const s=f+r,p=g.get(s);
        if(tipoV==='casilla'||tipoV==='rey-va'||tipoV==='clavadas')continue;
        if(!p||p.color!==color||p.type==='k')continue;
        const rival=color==='w'?'b':'w';
        if(tipoV==='indefensas'&&!atacantes(g,s,color).length)esperado.add(s);
        if(tipoV==='atacadas'&&atacantes(g,s,rival).length)esperado.add(s);
        if(tipoV==='colgadas'&&atacantes(g,s,rival).length&&!atacantes(g,s,color).length)esperado.add(s);
      }
      if(tipoV==='clavadas'){ // piezas de «color» clavadas a su rey (clavada absoluta)
        for(const f of FILES)for(let r=1;r<=8;r++){const s=f+r,p=g.get(s);
          if(!p||p.color!==color||p.type==='k')continue;
          const pr=t.fen.split(' ');pr[1]=color;pr[3]='-';const g1=new Chess(pr.join(' '));
          if(g1.in_check())continue;g1.remove(s);if(g1.in_check())esperado.add(s);}
      }
      if(tipoV==='rey-va'){ // casillas a las que puede ir el rey de «color» (con su turno)
        const pr=t.fen.split(' ');pr[1]=color;pr[3]='-';const gm=new Chess(pr.join(' '));
        gm.moves({verbose:true}).forEach(m=>{if(m.piece==='k')esperado.add(m.to);});
      }
      if(tipoV==='pueden-jaque'||tipoV==='pueden-capturar'){
        const pr=t.fen.split(' ');pr[1]=color;const gm=new Chess(pr.join(' '));
        gm.moves({verbose:true}).forEach(m=>{
          if(tipoV==='pueden-capturar'&&m.captured)esperado.add(m.from);
          if(tipoV==='pueden-jaque'){const g6=new Chess(pr.join(' '));g6.move(m);if(g6.in_check())esperado.add(m.from);}
        });
      }
      if(tipoV!=='casilla'){const dado=new Set(t.casillas);const igual=dado.size===esperado.size&&[...dado].every(x=>esperado.has(x));
        if(!igual)err(id,donde+': las casillas correctas para «'+t.verificar+'» son '+[...esperado].sort().join(',')+' y la lección dice '+[...dado].sort().join(','));}
    }
    return;
  }
  if(!t.linea||!t.linea.length){err(id,donde+': falta la línea');return;}
  if(t.linea.length%2===0)err(id,donde+': la línea debe terminar con una jugada del alumno (número impar de jugadas)');
  const gg=new Chess(t.fen);
  for(let i=0;i<t.linea.length;i++){
    const fenAntes=gg.fen();const m=jugar(gg,t.linea[i]);
    if(!m){err(id,donde+': jugada ilegal '+t.linea[i]+' en '+fenAntes);return;}
    const esAlumno=i%2===0,ultima=i===t.linea.length-1;
    if(esAlumno&&t.acepta&&t.acepta[i]){
      if(!ultima)err(id,donde+': solo se aceptan alternativas en la última jugada del alumno');
      for(const alt of t.acepta[i]){const g5=new Chess(fenAntes);if(!jugar(g5,alt))err(id,donde+': la alternativa '+alt+' es ilegal');}
    }
    if(t.meta==='mate'&&ultima&&!gg.in_checkmate())err(id,donde+': la meta es mate pero la última jugada no da mate');
    if(!sf||t.regla)continue;
    if(esAlumno){
      const r=await sf.analyse(fenAntes,{depth:t.profundidad||16,multipv:5});
      const esperado=t.linea[i];
      const lineas=r.lines;const mejor=lineas[0];
      const suya=lineas.find(l=>l.uci===esperado);
      const aceptadas=new Set([esperado].concat((t.acepta&&t.acepta[i])||[]));
      if(t.meta==='mate'&&ultima){
        const g3=new Chess(fenAntes);g3.moves({verbose:true}).forEach(mv=>{const g4=new Chess(fenAntes);g4.move(mv);if(g4.in_checkmate())aceptadas.add(mv.from+mv.to+(mv.promotion||''));});
        if(!gg.in_checkmate())err(id,donde+': la meta es mate pero la última jugada no da mate');
        continue;
      }
      if(!suya){err(id,donde+': '+esperado+' no está entre las 5 mejores de Stockfish en '+fenAntes+' (mejor: '+mejor.uci+' '+JSON.stringify(mejor.score)+')');continue;}
      const ps=puntos(suya.score),pm=puntos(mejor.score);
      if(pm-ps>60)err(id,donde+': '+esperado+' ('+JSON.stringify(suya.score)+') es claramente peor que '+mejor.uci+' ('+JSON.stringify(mejor.score)+') en '+fenAntes);
      // otras jugadas igual de buenas y no aceptadas («concepto»: la tarea pide una idea concreta,
      // p. ej. desarrollar atacando; basta con que la jugada pedida sea buena)
      if(!t.concepto)for(const l of lineas){
        if(aceptadas.has(l.uci))continue;
        // en tareas de mate, un mate más lento no compite con el pedido («mate en N»)
        if(t.meta==='mate'&&suya.score&&suya.score.mate>0&&l.score&&l.score.mate>suya.score.mate)continue;
        const pl=puntos(l.score);
        const ganaPocoMenos=(ps>=300)?(pl>=Math.min(ps-150,ps*0.6)&&pl>=250):(pl>=ps-40);
        if(ganaPocoMenos){
          if(ultima)err(id,donde+': la alternativa '+l.uci+' ('+JSON.stringify(l.score)+') es casi igual de buena que '+esperado+' ('+JSON.stringify(suya.score)+'); acéptala en «acepta» o cambia la posición. FEN '+fenAntes);
          else err(id,donde+': jugada no única en la mitad de la línea: '+l.uci+' ('+JSON.stringify(l.score)+') vs '+esperado+' ('+JSON.stringify(suya.score)+'). FEN '+fenAntes);
        }
      }
      if(ps<100&&!t.objetivoEquilibrio)av(id,donde+': la jugada pedida '+esperado+' solo da '+JSON.stringify(suya.score)+' (¿la ventaja es suficiente?) FEN '+fenAntes);
    }else{
      const r=await sf.analyse(fenAntes,{depth:14,multipv:4});
      const resp=t.linea[i],suya=r.lines.find(l=>l.uci===resp),mejor=r.lines[0];
      if(!suya)av(id,donde+': la respuesta del rival '+resp+' no está entre sus 4 mejores (mejor '+mejor.uci+' '+JSON.stringify(mejor.score)+') FEN '+fenAntes);
      else if(puntos(mejor.score)-puntos(suya.score)>150)av(id,donde+': la respuesta '+resp+' ('+JSON.stringify(suya.score)+') es mucho peor que la mejor defensa '+mejor.uci+' ('+JSON.stringify(mejor.score)+')');
    }
  }
}
(async()=>{
  let sf=null;
  if(!sinMotor&&SF){sf=new SF();await sf.init();}
  else if(!sinMotor)console.log('(Stockfish no disponible: solo se valida la legalidad)');
  const ids=Object.keys(LEC).filter(id=>!filtro.length||filtro.includes(id)).sort();
  let n=0;
  for(const id of ids){
    if(!CAT.porId[id]){err(id,'no existe en el catálogo');continue;}
    const l=LEC[id];n++;
    for(const k of ['descubre','observa','comprende','practica','hazlo','comprueba'])if(!l[k])err(id,'falta la etapa '+k);
    if(!l.descubre)continue;
    const g0=fenLegal(id+' descubre',l.descubre.fen);if(!g0)continue;
    revisarSenales(id,g0,l.descubre.flechas,l.descubre.marcas,'descubre');
    // demostración
    let g=new Chess(l.descubre.fen);
    (l.observa||[]).forEach((p,i)=>{
      const donde='observa paso '+(i+1);
      if(!p.di)err(id,donde+': falta el texto');
      if(!p.sencillo)av(id,donde+': falta la explicación sencilla (Explícame otra vez)');
      if(p.fen){const gx=fenLegal(id+' '+donde,p.fen);if(!gx)return;g=gx;}
      if(p.jugada){const m=jugar(g,p.jugada);if(!m){err(id,donde+': jugada ilegal '+p.jugada+' en '+g.fen());return;}}
      revisarSenales(id,g,p.flechas,p.marcas,donde);
    });
    if(l.comprende){
      if(l.comprende.fen){const gc=fenLegal(id+' comprende',l.comprende.fen);if(gc)revisarSenales(id,gc,l.comprende.flechas,l.comprende.marcas,'comprende');}
      else revisarSenales(id,g,l.comprende.flechas,l.comprende.marcas,'comprende');
      if(l.comprende.pregunta){const q=l.comprende.pregunta;if(!(q.correcta>=0&&q.correcta<q.opciones.length))err(id,'comprende: respuesta correcta fuera de rango');}
    }
    for(const k of ['practica','hazlo','comprueba'])await revisarTarea(id,l[k],k,sf);
    for(const [i,x] of (l.extra||[]).entries())await revisarTarea(id,x,'extra '+(i+1),sf);
  }
  for(const x of EXTRA){if(filtro.length&&!filtro.includes('mix'))break;await revisarTarea('mezcla '+x.id,x,'posición',sf);(x.requiere||[]).forEach(r=>{if(!CAT.porId[r])err('mezcla '+x.id,'requiere una lección inexistente '+r);});}
  if(sf)sf.quit();
  console.log('Lecciones revisadas: '+n+(filtro.length?'':(' · con contenido: '+n+' de '+CAT.total)));
  if(avisos.length){console.log('\nAVISOS ('+avisos.length+'):');avisos.forEach(a=>console.log('  · '+a));}
  if(errores.length){console.log('\nERRORES ('+errores.length+'):');errores.forEach(e=>console.log('  ✗ '+e));process.exitCode=1;}
  else console.log('\nSin errores.');
})();
