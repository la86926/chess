// Pruebas de la política de fusión (dos dispositivos con el mismo código).
const assert=require('assert');
function memoria(){const m={};return{getItem:k=>k in m?m[k]:null,setItem:(k,v)=>{m[k]=String(v)},removeItem:k=>{delete m[k]},_m:m};}
function dispositivo(){
  global.window=undefined;delete require.cache[require.resolve('../../aa-datos.js')];
  const ls=memoria();globalThis.localStorage=ls;
  const D=require('../../aa-datos.js');return {D,ls};
}
let reloj=1000;const real=Date.now;Date.now=()=>reloj;
const A=dispositivo();
// Siembra y crea carpeta en A
let fa=A.D.favoritos();assert.strictEqual(A.D.carpetasVivas().length,6);
reloj+=10;const cid=A.D.crearCarpeta('Para repasar');
reloj+=10;A.D.fijarCarpetasDeLeccion('N2-005',['nivel-2',cid]);
const mapaA=Object.assign({},A.ls._m);
// B: dispositivo nuevo, siembra por su cuenta y guarda otra lección
const B=dispositivo();
B.D.favoritos();reloj+=10;B.D.fijarCarpetasDeLeccion('N1-001',['nivel-1']);
reloj+=10;B.D.renombrarCarpeta('nivel-3','Tácticas');
const mapaB=Object.assign({},B.ls._m);
const r=B.D.fusionarMapas(mapaA,mapaB,{},{});
const f=JSON.parse(r.mapa.aa_favoritos_v1);
const vivas=Object.keys(f.carpetas).filter(k=>!f.carpetas[k].borrada);
assert.strictEqual(vivas.length,7,'6 predeterminadas + 1 creada, sin duplicados');
assert.strictEqual(f.carpetas['nivel-3'].nombre,'Tácticas');
assert.ok(!f.items['nivel-2|N2-005'].borrado && !f.items[cid+'|N2-005'].borrado && !f.items['nivel-1|N1-001'].borrado);
// A borra la carpeta nivel-1 después; una copia vieja de B no la resucita
const A2=dispositivo();Object.assign(A2.ls._m,r.mapa);reloj+=10;A2.D.eliminarCarpeta('nivel-1');
const r2=A2.D.fusionarMapas(Object.assign({},A2.ls._m),mapaB,{},{});
const f2=JSON.parse(r2.mapa.aa_favoritos_v1);
assert.ok(f2.carpetas['nivel-1'].borrada,'el borrado más reciente gana');
assert.ok(f2.items['nivel-1|N1-001'].borrado,'sus asociaciones quedan retiradas');
// Las predeterminadas no reaparecen tras borrarlas y volver a abrir favoritos
const A3=dispositivo();Object.assign(A3.ls._m,r2.mapa);A3.D.favoritos();
assert.ok(JSON.parse(A3.ls._m.aa_favoritos_v1).carpetas['nivel-1'].borrada,'no se vuelve a sembrar');
// Progreso: completada en un dispositivo queda completada
const p1={v:1,lecciones:{'N1-001':{estado:'completada',completadaEn:500,intentos:2,aciertos:2,errores:0,pistas:0,etapa:'comprueba',etapasHechas:['observa'],t:600}}};
const p2={v:1,lecciones:{'N1-001':{estado:'iniciada',completadaEn:0,intentos:5,aciertos:1,errores:3,pistas:1,etapa:'practica',etapasHechas:['descubre'],t:900}}};
const pm=A.D.fusionarProgreso(p1,p2).lecciones['N1-001'];
assert.strictEqual(pm.estado,'completada');assert.strictEqual(pm.intentos,5);assert.strictEqual(pm.etapa,'practica');assert.deepStrictEqual(pm.etapasHechas.sort(),['descubre','observa']);
// Historial: unión sin duplicados
const h=A.D.fusionarHistorial({eventos:[{id:'a',t:1},{id:'b',t:3}]},{eventos:[{id:'b',t:3},{id:'c',t:2}]});
assert.deepStrictEqual(h.eventos.map(e=>e.id),['b','c','a']);
// Claves sueltas: gana el sello más reciente
const s=A.D.fusionarMapas({aa_sound:'1'},{aa_sound:'0'},{aa_sound:5},{aa_sound:9});
assert.strictEqual(s.mapa.aa_sound,'0');
// Fusión idempotente y conmutativa
const x=A.D.fusionarMapas(mapaA,mapaB).mapa, y=A.D.fusionarMapas(mapaB,mapaA).mapa;
assert.deepStrictEqual(JSON.parse(x.aa_favoritos_v1),JSON.parse(y.aa_favoritos_v1));
const z=A.D.fusionarMapas(x,x).mapa;assert.deepStrictEqual(z,x);
Date.now=real;console.log('Fusión: todas las pruebas pasan');
