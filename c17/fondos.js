/* ==================================================================
   Chess de L · fondos desenfocados
   Lo usan el contenedor y las tres secciones. El fondo elegido se
   guarda en este dispositivo (clave c17_fondo) y se aplica en vivo.
   ================================================================== */
(function(){
  'use strict';
  var LISTA=[
    {id:'f12',n:'Nácar',l:.80},
    {id:'f05',n:'Niebla',l:.83},
    {id:'f06',n:'Duna',l:.76},
    {id:'f07',n:'Glaciar',l:.64},
    {id:'f08',n:'Atardecer',l:.60},
    {id:'f03',n:'Laguna',l:.63},
    {id:'f09',n:'Aurora',l:.54},
    {id:'f01',n:'Crepúsculo',l:.42},
    {id:'f11',n:'Orquídea',l:.35},
    {id:'f04',n:'Coral',l:.57},
    {id:'f02',n:'Abismo',l:.28},
    {id:'f10',n:'Cordillera',l:.09}
  ];
  var CLAVE='c17_fondo',PREDETERMINADO='f12',pedido='';
  function leer(){var v=null;try{v=localStorage.getItem(CLAVE);}catch(e){}return v||PREDETERMINADO;}
  function datos(id){for(var i=0;i<LISTA.length;i++)if(LISTA[i].id===id)return LISTA[i];return null;}
  function aplicar(){
    var r=document.documentElement,id=leer(),f=datos(id);
    if(!f){r.removeAttribute('data-fondo');r.removeAttribute('data-fondo-tono');r.style.removeProperty('--c-fondo');return;}
    var oscuro=r.getAttribute('data-modo')==='oscuro';
    /* el velo se ajusta a la luz del fondo para que el texto siempre se lea */
    /* claro: más velo cuanto más oscuro es el fondo; oscuro: el fondo se oscurece por filtro (conserva su color) y el velo es moderado */
    var velo=oscuro?Math.min(.72,Math.max(.46,.42+f.l*.3)):Math.min(.82,Math.max(.5,.5+(.85-f.l)*.5));
    r.setAttribute('data-fondo',id);
    r.setAttribute('data-fondo-tono',f.l<.5?'oscuro':'claro');
    var abs;try{abs=new URL('c17/fondos/'+id+'.webp',document.baseURI).href;}catch(e){abs='c17/fondos/'+id+'.webp';}
    /* se pide ya, antes de que el estilo lo descubra, para que el fondo llegue con el primer pintado */
    if(pedido!==abs){pedido=abs;try{var im=new Image();im.decoding='async';im.src=abs;}catch(e){}}
    r.style.setProperty('--c-fondo','url("'+abs+'")');
    r.style.setProperty('--c-fondo-velo',(velo*100).toFixed(0)+'%');
  }
  function guardar(id){try{localStorage.setItem(CLAVE,id);}catch(e){}aplicar();}
  aplicar();
  new MutationObserver(aplicar).observe(document.documentElement,{attributes:true,attributeFilter:['data-modo']});
  window.addEventListener('storage',function(e){if(!e||!e.key||e.key===CLAVE)aplicar();});
  window.C17Fondos={lista:LISTA,leer:leer,datos:datos,guardar:guardar,aplicar:aplicar};
})();
