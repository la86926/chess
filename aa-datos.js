/* Aprende Ajedrez · Datos locales y fusión para la sincronización
   ------------------------------------------------------------------
   Tres estructuras independientes (no se mezclan):
     · Progreso  (aa_progreso_v1)  → lo que el estudiante completó.
     · Historial (aa_historial_v1) → las actividades que realizó.
     · Favoritos (aa_favoritos_v1) → lo que eligió guardar en carpetas.
   Además: último punto de estudio (aa_ultimo_v1), preferencias
   (aa_prefs_v1) y la modalidad «Descubre la táctica» (aa_descubre_v1).

   Todas las claves empiezan por «aa_», así la sincronización las trata
   como un tercer ámbito, separado de PC1 (wp_) y PC2 (wp2_).

   Política de conflictos (dos dispositivos con el mismo código):
     · Cada carpeta y cada asociación técnica↔carpeta es un registro con su
       propia marca de tiempo «t». Gana el cambio más reciente de CADA registro;
       los borrados se guardan como «lápidas» (borrada/borrado = true) para que
       una copia antigua no los resucite. Con empate gana el borrado.
     · Las carpetas predeterminadas tienen identificadores fijos (nivel-1 …
       nivel-6) y marca t=1: si dos dispositivos las crean a la vez no se
       duplican, y cualquier cambio de la persona (renombrar, borrar) gana.
       Una vez «sembradas» en cualquier dispositivo, no se vuelven a crear.
     · Progreso: una lección completada en cualquier dispositivo queda
       completada; los contadores toman el máximo de ambos.
     · Historial: unión de eventos por identificador (sin duplicados).
     · Último punto y preferencias: gana el más reciente.
   Este archivo lo cargan index3.html (para guardar) y la página principal
   (para fusionar con la nube). No depende del DOM. */
(function(raiz){
  'use strict';
  var ESQUEMA=1;
  var K={
    progreso:'aa_progreso_v1',
    historial:'aa_historial_v1',
    ultimo:'aa_ultimo_v1',
    prefs:'aa_prefs_v1',
    favoritos:'aa_favoritos_v1',
    descubre:'aa_descubre_v1'
  };
  var MAX_EVENTOS=600;
  var CARPETAS_INICIALES=[1,2,3,4,5,6].map(function(n){return {id:'nivel-'+n,nombre:'Nivel '+n,orden:n};});

  function plano(v){return !!v&&typeof v==='object'&&!Array.isArray(v);}
  function num(v,d){v=Number(v);return Number.isFinite(v)?v:(d||0);}
  function parse(raw){if(raw==null||raw==='')return null;try{return JSON.parse(raw);}catch(e){return null;}}
  function ahora(){return Date.now();}
  function nuevoId(pref){
    var r='';
    try{var b=new Uint8Array(6);crypto.getRandomValues(b);for(var i=0;i<b.length;i++)r+=('0'+b[i].toString(16)).slice(-2);}
    catch(e){r=Math.random().toString(36).slice(2,14);}
    return (pref||'x')+'-'+ahora().toString(36)+'-'+r;
  }

  /* ---------- normalizadores (versionado del esquema) ---------- */
  function normProgreso(o){
    o=plano(o)?o:{};
    var out={v:ESQUEMA,lecciones:{}};
    var L=plano(o.lecciones)?o.lecciones:{};
    Object.keys(L).forEach(function(id){
      var r=L[id];if(!plano(r))return;
      out.lecciones[id]={
        estado:r.estado==='completada'?'completada':'iniciada',
        completadaEn:r.completadaEn?num(r.completadaEn):0,
        intentos:num(r.intentos),aciertos:num(r.aciertos),errores:num(r.errores),pistas:num(r.pistas),
        etapa:typeof r.etapa==='string'?r.etapa:'',
        etapasHechas:Array.isArray(r.etapasHechas)?r.etapasHechas.filter(function(x){return typeof x==='string';}):[],
        t:num(r.t)
      };
    });
    return out;
  }
  function normHistorial(o){
    o=plano(o)?o:{};
    var ev=Array.isArray(o.eventos)?o.eventos.filter(function(e){return plano(e)&&typeof e.id==='string'&&num(e.t)>0;}):[];
    return {v:ESQUEMA,eventos:ev};
  }
  function normSimple(o){o=plano(o)?o:{};var c={};Object.keys(o).forEach(function(k){c[k]=o[k];});c.v=ESQUEMA;c.t=num(o.t);return c;}
  function normFavoritos(o){
    o=plano(o)?o:{};
    var out={v:ESQUEMA,sembrado:num(o.sembrado),carpetas:{},items:{}};
    var C=plano(o.carpetas)?o.carpetas:{};
    Object.keys(C).forEach(function(id){
      var c=C[id];if(!plano(c))return;
      out.carpetas[id]={nombre:String(c.nombre==null?'':c.nombre).slice(0,60),orden:num(c.orden),creada:num(c.creada),t:num(c.t),borrada:!!c.borrada};
    });
    var I=plano(o.items)?o.items:{};
    Object.keys(I).forEach(function(k){
      var it=I[k];if(!plano(it)||typeof it.carpeta!=='string'||typeof it.leccion!=='string')return;
      out.items[k]={carpeta:it.carpeta,leccion:it.leccion,agregado:num(it.agregado),t:num(it.t),borrado:!!it.borrado};
    });
    return out;
  }
  function normDescubre(o){
    o=plano(o)?o:{};
    var out={v:ESQUEMA,vistos:{},t:num(o.t)};
    var V=plano(o.vistos)?o.vistos:{};
    Object.keys(V).forEach(function(k){var r=V[k];if(!plano(r))return;out.vistos[k]={intentos:num(r.intentos),aciertos:num(r.aciertos),t:num(r.t)};});
    return out;
  }
  var NORM={};
  NORM[K.progreso]=normProgreso;NORM[K.historial]=normHistorial;NORM[K.ultimo]=normSimple;
  NORM[K.prefs]=normSimple;NORM[K.favoritos]=normFavoritos;NORM[K.descubre]=normDescubre;

  /* ---------- fusiones ---------- */
  function masNuevo(a,b,tieBreak){
    var ta=num(a&&a.t),tb=num(b&&b.t);
    if(ta>tb)return a; if(tb>ta)return b;
    return tieBreak?tieBreak(a,b):a;
  }
  function fusionarProgreso(a,b){
    a=normProgreso(a);b=normProgreso(b);
    var out={v:ESQUEMA,lecciones:{}};
    var ids={};Object.keys(a.lecciones).concat(Object.keys(b.lecciones)).forEach(function(k){ids[k]=1;});
    Object.keys(ids).forEach(function(id){
      var x=a.lecciones[id],y=b.lecciones[id];
      if(!x||!y){out.lecciones[id]=x||y;return;}
      var nuevo=masNuevo(x,y);
      var hechas={};x.etapasHechas.concat(y.etapasHechas).forEach(function(e){hechas[e]=1;});
      var comp=(x.estado==='completada'||y.estado==='completada');
      var fechas=[x.completadaEn,y.completadaEn].filter(function(v){return v>0;});
      out.lecciones[id]={
        estado:comp?'completada':'iniciada',
        completadaEn:fechas.length?Math.min.apply(null,fechas):0,
        intentos:Math.max(x.intentos,y.intentos),aciertos:Math.max(x.aciertos,y.aciertos),
        errores:Math.max(x.errores,y.errores),pistas:Math.max(x.pistas,y.pistas),
        etapa:nuevo.etapa,etapasHechas:Object.keys(hechas),t:Math.max(x.t,y.t)
      };
    });
    return out;
  }
  function fusionarHistorial(a,b){
    a=normHistorial(a);b=normHistorial(b);
    var vistos={},ev=[];
    a.eventos.concat(b.eventos).forEach(function(e){if(!vistos[e.id]){vistos[e.id]=1;ev.push(e);}});
    ev.sort(function(x,y){return y.t-x.t;});
    return {v:ESQUEMA,eventos:ev.slice(0,MAX_EVENTOS)};
  }
  function fusionarSimple(a,b){return masNuevo(normSimple(a),normSimple(b));}
  function fusionarFavoritos(a,b){
    a=normFavoritos(a);b=normFavoritos(b);
    var out={v:ESQUEMA,sembrado:Math.max(a.sembrado,b.sembrado),carpetas:{},items:{}};
    function porRegistro(A,B,campoBorrado,dest){
      var ids={};Object.keys(A).concat(Object.keys(B)).forEach(function(k){ids[k]=1;});
      Object.keys(ids).forEach(function(id){
        var x=A[id],y=B[id];
        dest[id]=(!x||!y)?(x||y):masNuevo(x,y,function(p,q){
          if(p[campoBorrado]!==q[campoBorrado])return p[campoBorrado]?p:q;
          return JSON.stringify(p)>=JSON.stringify(q)?p:q;   // empate exacto: elección estable
        });
      });
    }
    porRegistro(a.carpetas,b.carpetas,'borrada',out.carpetas);
    porRegistro(a.items,b.items,'borrado',out.items);
    return out;
  }
  function fusionarDescubre(a,b){
    a=normDescubre(a);b=normDescubre(b);
    var out={v:ESQUEMA,vistos:{},t:Math.max(a.t,b.t)};
    var ids={};Object.keys(a.vistos).concat(Object.keys(b.vistos)).forEach(function(k){ids[k]=1;});
    Object.keys(ids).forEach(function(id){
      var x=a.vistos[id],y=b.vistos[id];
      out.vistos[id]=(!x||!y)?(x||y):{intentos:Math.max(x.intentos,y.intentos),aciertos:Math.max(x.aciertos,y.aciertos),t:Math.max(x.t,y.t)};
    });
    return out;
  }
  var FUSION={};
  FUSION[K.progreso]=fusionarProgreso;FUSION[K.historial]=fusionarHistorial;FUSION[K.ultimo]=fusionarSimple;
  FUSION[K.prefs]=fusionarSimple;FUSION[K.favoritos]=fusionarFavoritos;FUSION[K.descubre]=fusionarDescubre;

  /* Fusiona dos mapas {clave: texto} del ámbito aa.
     Las claves estructuradas usan su fusión propia. Las demás (sonido, tema
     de la explicación, encabezado oculto…) gana la que cambió por última vez,
     según los sellos por clave que guarda la página principal. */
  function fusionarMapas(local,remoto,sellosLocal,sellosRemoto){
    local=plano(local)?local:{};remoto=plano(remoto)?remoto:{};
    sellosLocal=plano(sellosLocal)?sellosLocal:{};sellosRemoto=plano(sellosRemoto)?sellosRemoto:{};
    var out={},sellos={};
    var claves={};Object.keys(local).concat(Object.keys(remoto)).forEach(function(k){if(k.indexOf('aa_')===0)claves[k]=1;});
    Object.keys(claves).forEach(function(k){
      var hl=Object.prototype.hasOwnProperty.call(local,k),hr=Object.prototype.hasOwnProperty.call(remoto,k);
      var sl=num(sellosLocal[k]),sr=num(sellosRemoto[k]);
      if(FUSION[k]){
        if(hl&&hr)out[k]=JSON.stringify(FUSION[k](parse(local[k]),parse(remoto[k])));
        else out[k]=JSON.stringify(NORM[k](parse(hl?local[k]:remoto[k])));
        sellos[k]=Math.max(sl,sr);
        return;
      }
      if(hl&&hr){out[k]=(sr>sl)?String(remoto[k]):String(local[k]);sellos[k]=Math.max(sl,sr);}
      else if(hl){out[k]=String(local[k]);sellos[k]=sl;}
      else{out[k]=String(remoto[k]);sellos[k]=sr;}
    });
    return {mapa:out,sellos:sellos};
  }

  /* ---------- acceso local (solo en el navegador) ---------- */
  function almacen(){try{return raiz.localStorage;}catch(e){return null;}}
  function leer(clave){
    var s=almacen(),raw=null;
    try{raw=s?s.getItem(clave):null;}catch(e){}
    var n=NORM[clave];
    return n?n(parse(raw)):parse(raw);
  }
  function guardar(clave,obj){
    var s=almacen();if(!s)return false;
    try{s.setItem(clave,JSON.stringify(NORM[clave]?NORM[clave](obj):obj));return true;}catch(e){return false;}
  }

  /* Progreso */
  function registroLeccion(p,id){
    if(!p.lecciones[id])p.lecciones[id]={estado:'iniciada',completadaEn:0,intentos:0,aciertos:0,errores:0,pistas:0,etapa:'',etapasHechas:[],t:0};
    return p.lecciones[id];
  }
  function actualizarLeccion(id,cambio){
    var p=leer(K.progreso),r=registroLeccion(p,id);
    cambio(r);r.t=ahora();guardar(K.progreso,p);return r;
  }
  /* Historial */
  function registrarEvento(tipo,leccion,detalle){
    var h=leer(K.historial);
    var e={id:nuevoId('e'),t:ahora(),tipo:tipo,leccion:leccion||''};
    if(detalle!=null)e.detalle=detalle;
    h.eventos.unshift(e);
    if(h.eventos.length>MAX_EVENTOS)h.eventos.length=MAX_EVENTOS;
    guardar(K.historial,h);return e;
  }
  /* Favoritos */
  function favoritos(){
    var f=leer(K.favoritos);
    if(!f.sembrado){
      CARPETAS_INICIALES.forEach(function(c){
        if(!f.carpetas[c.id])f.carpetas[c.id]={nombre:c.nombre,orden:c.orden,creada:1,t:1,borrada:false};
      });
      f.sembrado=ahora();
      guardar(K.favoritos,f);
    }
    return f;
  }
  function carpetasVivas(f){
    f=f||favoritos();
    return Object.keys(f.carpetas).filter(function(id){return !f.carpetas[id].borrada;})
      .map(function(id){var c=f.carpetas[id];return {id:id,nombre:c.nombre,orden:c.orden,creada:c.creada};})
      .sort(function(a,b){return (a.orden-b.orden)||(a.creada-b.creada)||a.nombre.localeCompare(b.nombre,'es');});
  }
  function itemsVivos(f){
    f=f||favoritos();
    return Object.keys(f.items).map(function(k){return f.items[k];})
      .filter(function(it){return !it.borrado&&f.carpetas[it.carpeta]&&!f.carpetas[it.carpeta].borrada;});
  }
  function carpetasDeLeccion(leccion,f){
    return itemsVivos(f).filter(function(it){return it.leccion===leccion;}).map(function(it){return it.carpeta;});
  }
  function nombreLibre(nombre,excepto,f){
    var n=String(nombre||'').trim().toLocaleLowerCase('es');
    return !carpetasVivas(f).some(function(c){return c.id!==excepto&&c.nombre.trim().toLocaleLowerCase('es')===n;});
  }
  function crearCarpeta(nombre){
    nombre=String(nombre||'').trim().replace(/\s+/g,' ');
    if(!nombre)throw new Error('Escribe un nombre para la carpeta.');
    if(nombre.length>40)throw new Error('Usa como máximo 40 caracteres.');
    var f=favoritos();
    if(!nombreLibre(nombre,null,f))throw new Error('Ya tienes una carpeta con ese nombre.');
    var id=nuevoId('c'),t=ahora();
    var orden=carpetasVivas(f).reduce(function(m,c){return Math.max(m,c.orden);},0)+1;
    f.carpetas[id]={nombre:nombre,orden:orden,creada:t,t:t,borrada:false};
    guardar(K.favoritos,f);return id;
  }
  function renombrarCarpeta(id,nombre){
    nombre=String(nombre||'').trim().replace(/\s+/g,' ');
    if(!nombre)throw new Error('Escribe un nombre para la carpeta.');
    if(nombre.length>40)throw new Error('Usa como máximo 40 caracteres.');
    var f=favoritos(),c=f.carpetas[id];
    if(!c||c.borrada)throw new Error('La carpeta ya no existe.');
    if(!nombreLibre(nombre,id,f))throw new Error('Ya tienes una carpeta con ese nombre.');
    c.nombre=nombre;c.t=ahora();guardar(K.favoritos,f);
  }
  function eliminarCarpeta(id){
    var f=favoritos(),c=f.carpetas[id],t=ahora();if(!c)return;
    c.borrada=true;c.t=t;
    Object.keys(f.items).forEach(function(k){var it=f.items[k];if(it.carpeta===id&&!it.borrado){it.borrado=true;it.t=t;}});
    guardar(K.favoritos,f);
  }
  /* Guarda de una sola vez el conjunto exacto de carpetas de una lección
     (operación única: o se aplica todo o nada). Devuelve {agregadas, quitadas}. */
  function fijarCarpetasDeLeccion(leccion,carpetas){
    var f=favoritos(),t=ahora(),quiero={},agregadas=[],quitadas=[];
    (carpetas||[]).forEach(function(id){if(f.carpetas[id]&&!f.carpetas[id].borrada)quiero[id]=1;});
    Object.keys(f.carpetas).forEach(function(cid){
      if(f.carpetas[cid].borrada)return;
      var k=cid+'|'+leccion,it=f.items[k],tiene=it&&!it.borrado;
      if(quiero[cid]&&!tiene){f.items[k]={carpeta:cid,leccion:leccion,agregado:t,t:t,borrado:false};agregadas.push(cid);}
      else if(!quiero[cid]&&tiene){it.borrado=true;it.t=t;quitadas.push(cid);}
    });
    if(agregadas.length||quitadas.length)guardar(K.favoritos,f);
    return {agregadas:agregadas,quitadas:quitadas};
  }
  function quitarDeCarpeta(leccion,carpeta){
    var f=favoritos(),k=carpeta+'|'+leccion,it=f.items[k];
    if(it&&!it.borrado){it.borrado=true;it.t=ahora();guardar(K.favoritos,f);}
  }
  function copiarA(leccion,destino){
    var f=favoritos(),k=destino+'|'+leccion,it=f.items[k],t=ahora();
    if(!f.carpetas[destino]||f.carpetas[destino].borrada)throw new Error('La carpeta de destino no existe.');
    if(it&&!it.borrado)return false;
    f.items[k]={carpeta:destino,leccion:leccion,agregado:t,t:t,borrado:false};
    guardar(K.favoritos,f);return true;
  }
  function moverA(leccion,origen,destino){
    if(origen===destino)return false;
    var f=favoritos(),t=ahora();
    if(!f.carpetas[destino]||f.carpetas[destino].borrada)throw new Error('La carpeta de destino no existe.');
    var ko=origen+'|'+leccion,kd=destino+'|'+leccion,io=f.items[ko],id=f.items[kd];
    var agregado=io&&!io.borrado?io.agregado:t;
    if(io&&!io.borrado){io.borrado=true;io.t=t;}
    if(!(id&&!id.borrado))f.items[kd]={carpeta:destino,leccion:leccion,agregado:agregado,t:t,borrado:false};
    guardar(K.favoritos,f);return true;
  }
  function copiarCarpeta(origen,destino){
    var n=0;
    itemsVivos().filter(function(it){return it.carpeta===origen;}).forEach(function(it){if(copiarA(it.leccion,destino))n++;});
    return n;
  }

  var API={
    ESQUEMA:ESQUEMA,CLAVES:K,CARPETAS_INICIALES:CARPETAS_INICIALES,
    nuevoId:nuevoId,leer:leer,guardar:guardar,
    fusionarProgreso:fusionarProgreso,fusionarHistorial:fusionarHistorial,fusionarFavoritos:fusionarFavoritos,
    fusionarDescubre:fusionarDescubre,fusionarSimple:fusionarSimple,fusionarMapas:fusionarMapas,
    normalizar:function(clave,obj){return NORM[clave]?NORM[clave](obj):obj;},
    actualizarLeccion:actualizarLeccion,registrarEvento:registrarEvento,
    favoritos:favoritos,carpetasVivas:carpetasVivas,itemsVivos:itemsVivos,carpetasDeLeccion:carpetasDeLeccion,
    nombreLibre:nombreLibre,crearCarpeta:crearCarpeta,renombrarCarpeta:renombrarCarpeta,eliminarCarpeta:eliminarCarpeta,
    fijarCarpetasDeLeccion:fijarCarpetasDeLeccion,quitarDeCarpeta:quitarDeCarpeta,copiarA:copiarA,moverA:moverA,copiarCarpeta:copiarCarpeta
  };
  raiz.AADatos=Object.freeze(API);
  if(typeof module!=='undefined'&&module.exports)module.exports=API;
})(typeof window!=='undefined'?window:globalThis);
