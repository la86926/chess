/* ==================================================================
   Chess de L · ajustes de la piel dentro de cada sección
   Solo cambia la presentación: no toca la lógica de los métodos.
   ================================================================== */
(function(){
  'use strict';
  function svg(d,cls){return '<svg class="'+(cls||'c17-ico')+'" viewBox="0 0 24 24" aria-hidden="true">'+d+'</svg>';}
  var I={
    x:'<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    dado:'<rect x="4" y="4" width="16" height="16" rx="4"/><circle cx="9" cy="9" r="1.1" fill="currentColor"/><circle cx="15" cy="15" r="1.1" fill="currentColor"/><circle cx="15" cy="9" r="1.1" fill="currentColor"/><circle cx="9" cy="15" r="1.1" fill="currentColor"/>',
    foco:'<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1 1.2 1.1 2V16h5v-.2c.1-.8.5-1.5 1.1-2A6 6 0 0 0 12 3z"/>',
    rayo:'<path d="M13 3L5 13.5h6L10 21l8-10.5h-6L13 3z"/>',
    vuelta:'<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    rombo:'<path d="M12 3l8 9-8 9-8-9 8-9z"/>',
    diana:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor"/>',
    capas:'<path d="M12 4l8.5 4.5L12 13 3.5 8.5 12 4z"/><path d="M3.5 12.5L12 17l8.5-4.5"/>',
    flota:'<rect x="3.5" y="5" width="17" height="13" rx="3"/><rect x="11" y="10.5" width="7" height="5" rx="1.4"/>',
    regalo:'<rect x="3.5" y="9" width="17" height="4" rx="1.2"/><path d="M5 13v6.5h14V13M12 9v10.5"/><path d="M12 9c-1.5-3.5-5.5-3.6-5.5-1.3C6.5 9 9.4 9 12 9zm0 0c1.5-3.5 5.5-3.6 5.5-1.3C17.5 9 14.6 9 12 9z"/>',
    pesa:'<path d="M6.5 8v8M17.5 8v8M3.5 10v4M20.5 10v4M6.5 12h11"/>',
    peon:'<circle cx="12" cy="7" r="2.6"/><path d="M9.6 10.5h4.8M10.4 10.5c-.3 3-1.4 5-2.9 6.5h9c-1.5-1.5-2.6-3.5-2.9-6.5M7 19.5h10"/>',
    medio:'<circle cx="12" cy="12" r="8.5"/><path d="M12 3.5v8.5h8.5"/>',
    bien:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    lupa:'<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4 4"/>'
  };
  var GLIFO={'⚡':'rayo','↩':'vuelta','◇':'rombo','◎':'diana','♜':'capas','♟':'peon','◔':'medio','✕':'x','✓':'bien','⌕':'lupa'};
  var raiz=document.documentElement;

  /* ---------- texto en mayúsculas de imprenta → frase normal ---------- */
  var MANTENER=/^(PC\d|ID|FEN|PGN|PDF|[IVX]{1,4}|N\.º)$/;
  function frase(t){
    return t.split(' · ').map(function(seg){
      var w=seg.split(' '),out=[];
      for(var i=0;i<w.length;i++){
        var p=w[i];
        if(MANTENER.test(p)){out.push(p);continue;}
        var l=p.toLocaleLowerCase('es');
        if(i===0||(w[i-1]==='EL'&&p==='MÉTODO'))l=l.charAt(0).toLocaleUpperCase('es')+l.slice(1);
        out.push(l);
      }
      return out.join(' ');
    }).join(' · ');
  }
  function esMayus(t){var letras=t.replace(/[^A-Za-zÁÉÍÓÚÑÜáéíóúñü]/g,'');return letras.length>=4&&letras===letras.toLocaleUpperCase('es')&&/[A-ZÁÉÍÓÚÑ]{4}/.test(letras);}
  function normalizar(el){
    for(var n=el.firstChild;n;n=n.nextSibling){
      if(n.nodeType===3){
        var t=n.nodeValue;
        /* «EJERCICIO 1 · Fácil»: se corrige cada tramo que venga en mayúsculas */
        if(/[A-ZÁÉÍÓÚÑ]{4}/.test(t)){
          var nuevo=t.split(' · ').map(function(s){return esMayus(s)?frase(s):s;}).join(' · ');
          if(nuevo!==t)n.nodeValue=nuevo;
        }
      }else if(n.nodeType===1&&!n.matches('svg,input,textarea'))normalizar(n);
    }
  }
  var SEL_MAYUS='.workspace-eyebrow,.frase-eyebrow,.aa-eyebrow,#explain-kicker,.aa-fv-leccion,.aa-nivel-n,.move-orb span,.pc-tema b';

  /* ---------- emojis y glifos → iconos ---------- */
  function iconos(base){
    base=base||document;
    var b=base.querySelectorAll('.modal-x,.pc-io-close,.workspace-close,.pc-buscar-x');
    for(var i=0;i<b.length;i++){var t=b[i].textContent.trim();if((t==='✕'||t==='×')&&!b[i].querySelector('svg'))b[i].innerHTML=svg(I.x,'');}
    var r=document.getElementById('b-random');
    if(r&&r.textContent.indexOf('🎲')>=0)r.innerHTML=svg(I.dado)+' Ejercicio aleatorio';
    var ci=base.querySelectorAll('.card-icon');
    for(var j=0;j<ci.length;j++){var g=ci[j].textContent.trim();if(GLIFO[g]&&!ci[j].querySelector('svg'))ci[j].innerHTML=svg(I[GLIFO[g]],'');}
    var CHI='<svg class="c17-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',CHD='<svg class="c17-chev" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>';
    var nav=base.querySelectorAll('#b-prev-top,#b-next-top,#b-prev,#b-next,.aa-nav-lec b');
    for(var k=0;k<nav.length;k++){
      var el=nav[k];if(el.querySelector('svg'))continue;
      for(var nd=el.firstChild;nd;nd=nd.nextSibling){
        if(nd.nodeType!==3)continue;var tx=nd.nodeValue;
        if(tx.indexOf('◂')>=0){var sp=document.createElement('span');sp.innerHTML=CHI;nd.nodeValue=tx.replace('◂','').replace(/^\s+/,'');el.insertBefore(sp.firstChild,nd);break;}
        if(tx.indexOf('▸')>=0){var sp2=document.createElement('span');sp2.innerHTML=CHD;nd.nodeValue=tx.replace('▸','').replace(/\s+$/,'');el.insertBefore(sp2.firstChild,nd.nextSibling);break;}
      }
    }
    var ft=document.getElementById('pc-float-board-toggle');
    if(ft&&ft.firstChild&&ft.firstChild.nodeType===3&&ft.firstChild.nodeValue.indexOf('▣')>=0){ft.firstChild.remove();ft.insertAdjacentHTML('afterbegin',svg(I.flota,''));}
  }
  function guiaSinEmoji(){
    var g=document.querySelectorAll('.reading p');
    for(var i=0;i<g.length;i++)if(g[i].innerHTML.indexOf('💡')>=0)g[i].innerHTML=g[i].innerHTML.replace(/💡/g,svg(I.foco));
  }
  function iconoEstado(){
    var ico=document.querySelector('#status .ico');if(!ico||ico.querySelector('svg'))return;
    var g=ico.textContent.trim();if(GLIFO[g])ico.innerHTML=svg(I[GLIFO[g]],'');
  }
  function regalo(){
    var b=document.getElementById('b-gift');if(!b||b.querySelector('svg'))return;
    var pesa=raiz.getAttribute('data-seccion')==='pc2';
    b.innerHTML=svg(pesa?I.pesa:I.regalo,'');
  }

  /* ---------- pestañas con píldora que se desliza ---------- */
  function deslizar(tabs){
    if(!tabs||tabs.dataset.c17Desliza)return;
    tabs.dataset.c17Desliza='1';tabs.classList.add('c17-desliza');
    var p=document.createElement('span');p.className='c17-pildora';p.setAttribute('aria-hidden','true');tabs.insertBefore(p,tabs.firstChild);
    /* si las pestañas estaban ocultas (barra plegada), la píldora se coloca de golpe al aparecer:
       sin crecer desde cero, que se veía como un acercamiento */
    var colocada=false;
    function mover(){
      var a=tabs.querySelector('.tab.active');if(!a||!a.offsetWidth){p.style.opacity='0';colocada=false;return;}
      if(!colocada)p.style.transition='none';
      p.style.opacity='1';p.style.width=a.offsetWidth+'px';p.style.transform='translateX('+a.offsetLeft+'px)';
      if(!colocada){void p.offsetWidth;p.style.transition='';colocada=true;}
    }
    new MutationObserver(mover).observe(tabs,{subtree:true,attributes:true,attributeFilter:['class']});
    if(window.ResizeObserver)new ResizeObserver(mover).observe(tabs);
    window.addEventListener('resize',mover);
    requestAnimationFrame(mover);setTimeout(mover,400);
  }

  /* ---------- celebración: confeti pastel y una franja de luz ---------- */
  function celebrar(cantidad){
    var col=['#B9A8FF','#8DB8FF','#7FDDB6','#FFE08A','#FFB3CC','#D9D0FF'];
    var n=Math.min(cantidad||40,46);
    for(var i=0;i<n;i++){
      var c=document.createElement('div');c.className='confeti';
      c.style.left=Math.random()*100+'vw';
      c.style.background=col[Math.floor(Math.random()*col.length)];
      c.style.animationDuration=(1.8+Math.random()*1.4)+'s';
      c.style.animationDelay=(Math.random()*.35)+'s';
      c.style.transform='rotate('+Math.random()*360+'deg)';
      c.style.borderRadius=Math.random()<.5?'50%':'3px';
      document.body.appendChild(c);
      (function(x){setTimeout(function(){x.remove();},3800);})(c);
    }
    var tab=document.getElementById('board');
    if(tab){var l=document.createElement('i');l.className='c17-barrido';tab.appendChild(l);setTimeout(function(){l.remove();},1300);}
  }
  if(typeof window.lanzarConfeti==='function')window.lanzarConfeti=celebrar;

  function todo(){
    var m=document.querySelectorAll(SEL_MAYUS);for(var i=0;i<m.length;i++)normalizar(m[i]);
    iconos();iconoEstado();
  }
  function iniciar(){
    var c=document.querySelectorAll('.home-icon .crest, img.crest');
    for(var i=0;i<c.length;i++){if(c[i].tagName!=='IMG')continue;if((c[i].getAttribute('src')||'').indexOf('c17/logo.svg')<0)c[i].setAttribute('src','c17/logo.svg?v=2');c[i].setAttribute('alt','Chess de L');}
    regalo();guiaSinEmoji();todo();
    var tabs=document.getElementById('tabs');if(tabs)deslizar(tabs);
    var st=document.getElementById('status');
    if(st)new MutationObserver(iconoEstado).observe(st,{subtree:true,childList:true,characterData:true});
    /* contenido que aparece después: ventanas, explicación, recorridos y cabeceras de lección */
    var pend=false;
    new MutationObserver(function(r){
      for(var i=0;i<r.length;i++){
        var t=r[i].target;
        if(t&&t.closest&&t.closest('#board'))continue;
        if(!pend){pend=true;setTimeout(function(){pend=false;todo();manos();},250);}
        return;
      }
    }).observe(document.body,{subtree:true,childList:true,characterData:true});
    manos();
  }
  var MANO='<svg viewBox="0 0 64 64"><path d="M25 6.5c2.6 0 4.5 2 4.5 4.6V29l1.2-.4V24c0-2.4 1.9-4.2 4.2-4.2s4.2 1.8 4.2 4.2v4.3l.9-.2v-1.6c0-2.3 1.9-4.1 4.2-4.1s4.1 1.8 4.1 4.1v3.2l.6-.1c2.2-.2 4.1 1.6 4.1 3.8v10.4c0 9.2-7 15.7-16.4 15.7h-2.7c-6.2 0-10.6-2.8-13.9-7.7L12.8 38c-1.3-2-.8-4.6 1.2-5.9 1.9-1.3 4.4-.9 5.8.9l1.1 1.4V11.1c0-2.6 1.6-4.6 4.1-4.6z" fill="#FFFFFF" stroke="#1C1B22" stroke-width="2" stroke-linejoin="round"/><path d="M30.7 29v8M39.1 28.3v8.4M47.4 30.7v6.9" stroke="#1C1B22" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function manos(){var m=document.querySelectorAll('.aa-tour-mano');for(var i=0;i<m.length;i++)if(!m[i].querySelector('svg'))m[i].innerHTML=MANO;}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',iniciar);else iniciar();
  /* lanzarConfeti se define al final del documento: se reemplaza cuando ya existe */
  window.addEventListener('load',function(){if(typeof window.lanzarConfeti==='function'&&window.lanzarConfeti!==celebrar)window.lanzarConfeti=celebrar;});
})();
