/* ==================================================================
   Chess de L · comportamiento propio del contenedor
   - Cambio de sección: un velo que nace donde tocaste
   - Anillos de avance en el menú
   - Píldora del interruptor de apariencia
   - Mi ID: pase con QR y enlace para abrir el avance en otro dispositivo (?id=)
   - Confirmación antes de recargar la página
   No toca la lógica original: solo la acompaña.
   ================================================================== */
(function(){
  'use strict';
  /* dirección pública de esta web (cada repositorio la declara en su index.html) */
  var WEB=document.documentElement.getAttribute('data-web')||'https://la86926.github.io/chess17/';
  var backdrop=document.getElementById('drawer-backdrop');
  var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function ls(k){try{return localStorage.getItem(k);}catch(e){return null;}}
  function json(k){try{return JSON.parse(ls(k)||'null');}catch(e){return null;}}
  var LOGO=(document.querySelector('.marca .c17-logo')||{}).outerHTML||'';

  /* ---------- cambio de sección ---------- */
  var SEC={
    '3':{t:'Aprende Ajedrez',s:'Desde la primera jugada',c1:'--c-menta',c2:'--c-cielo'},
    '1':{t:'Método PC1',s:'Táctica hasta que salga sola',c1:'--c-cielo',c2:'--c-lila'},
    '2':{t:'Método PC2',s:'Pensar como un maestro',c1:'--c-lila',c2:'--c-rosa'},
    'id':{t:'Mi ID',s:'Tu avance, en todos tus dispositivos',c1:'--c-mant',c2:'--c-lila'}
  };
  var pasando=false,ultimoCambio=0;
  function cambio(destino,x,y,hecho){
    if(reduce){hecho();return;}
    var d=SEC[destino]||SEC['1'],v=document.createElement('div');
    var osc=document.documentElement.getAttribute('data-modo')==='oscuro';
    v.className='c-cambio';v.setAttribute('aria-hidden','true');
    v.style.setProperty('--x',x+'px');v.style.setProperty('--y',y+'px');
    v.style.setProperty('--t1',osc?'color-mix(in srgb,var('+d.c1+') 26%,var(--c-papel))':'var('+d.c1+')');
    v.style.setProperty('--t2',osc?'color-mix(in srgb,var('+d.c2+') 12%,var(--c-papel))':'color-mix(in srgb,var('+d.c2+') 70%,var(--c-papel))');
    v.innerHTML='<div><b>'+d.t+'</b><small>'+d.s+'</small></div>';
    document.body.appendChild(v);v.getBoundingClientRect();
    /* cambios seguidos: más breve, para no hacer esperar a quien va y viene */
    var seguido=Date.now()-ultimoCambio<10000;ultimoCambio=Date.now();
    if(seguido)v.classList.add('breve');
    /* si la sección se abre por primera vez, el velo se queda solo hasta que el tablero exista */
    var fr=document.getElementById('app-frame-'+destino),porCargar=!!(fr&&fr.tagName==='IFRAME'&&!fr.getAttribute('src'));
    if(!porCargar)v.classList.add('sin-titulo');
    function listo(){
      try{var w=fr.contentWindow,doc=w&&w.document;
        if(!doc||doc.readyState==='loading'||doc.location.href==='about:blank')return false;
        /* Aprende Ajedrez trae un tablero estático en su HTML: está lista solo cuando su app terminó de arrancar */
        return destino==='3'?!!(w.AAApp&&w.AAApp.listo):!!doc.getElementById('board');
      }catch(e){return true;}
    }
    requestAnimationFrame(function(){
      v.classList.add('abre');
      setTimeout(function(){
        hecho();
        var cerrado=false,t0=Date.now();
        function cerrar(){
          if(cerrado)return;cerrado=true;
          v.classList.add('sin-titulo');
          setTimeout(function(){v.classList.add('cierra');setTimeout(function(){v.remove();},260);},porCargar?60:0);
        }
        if(porCargar){(function mira(){if(cerrado)return;if(listo()||Date.now()-t0>2500)cerrar();else setTimeout(mira,50);})();}
        else cerrar();
      },seguido?150:190);
    });
  }
  /* Solo cuando la persona elige en el menú; los cambios automáticos (la nube, enlaces) siguen al instante. */
  window.addEventListener('click',function(e){
    var b=e.target&&e.target.closest&&e.target.closest('.app-choice');
    if(!b||pasando||!backdrop.classList.contains('open'))return;
    if(b.classList.contains('active'))return;
    e.preventDefault();e.stopImmediatePropagation();
    var r=b.getBoundingClientRect(),x=e.clientX||r.left+30,y=e.clientY||r.top+r.height/2;
    pasando=true;
    cambio(b.getAttribute('data-app'),x,y,function(){b.click();pasando=false;if(window.pcSyncSeccionElegida)window.pcSyncSeccionElegida();});
  },true);

  /* ---------- anillos de avance ---------- */
  function contarLista(k){var v=json(k);if(Array.isArray(v))return v.length;if(v&&typeof v==='object')return Object.keys(v).length;return 0;}
  /* Aprende: las mismas cuentas que muestra la sección (solo lecciones del catálogo, sobre su total real) */
  var CAT_AA=window.AA_CATALOGO||null;
  function contarAprende(){
    var p=json('aa_progreso_v1'),l=p&&p.lecciones,n=0;
    if(l)for(var k in l){if(l[k]&&l[k].estado==='completada'&&(!CAT_AA||CAT_AA.porId[k]))n++;}
    return n;
  }
  /* PC1 y PC2: el número del ejercicio en el que está la persona, el mismo que dice «Ejercicio N» */
  function ejercicioActual(app){
    try{var f=document.getElementById('app-frame-'+app),w=f&&f.contentWindow;
      if(w&&typeof w.curr==='function'){var p=w.curr();if(p&&Number(p.n)>0)return Number(p.n);}}catch(e){}
    try{var s=parseInt(sessionStorage.getItem(app==='1'?'pc_tab_ultimo_l1':'pc_tab_ultimo_l2'),10);if(s>0)return s;}catch(e){}
    var n=parseInt(ls(app==='1'?'wp_ultimo':'wp2_ultimo'),10);
    return n>0?n:0;
  }
  function resuelto(k,n){var v=json(k);if(Array.isArray(v))return v.indexOf(n)>=0||v.indexOf(String(n))>=0;return !!(v&&typeof v==='object'&&v[n]);}
  function fijar(arco,frac){
    if(!arco)return;
    var l=parseFloat(arco.style.getPropertyValue('--l'))||0;
    /* si ya hay avance, el anillo siempre lo muestra aunque sea poco */
    var f=frac>0?Math.max(frac,.025):0;
    arco.style.setProperty('--o',(l*(1-Math.min(1,f))).toFixed(2));
  }
  function pintarAvance(){
    var e1=ejercicioActual('1'),e2=ejercicioActual('2');
    /* [cifra que se muestra, total, anillo, lo ya hecho] — en PC1 y PC2 la cifra es el ejercicio actual
       y el anillo cuenta los anteriores (y el actual, si ya se resolvió) */
    var datos={'3':[contarAprende(),CAT_AA?CAT_AA.total:219,'aa'],
      '1':[e1,1128,'pc1',e1&&!resuelto('wp_solved',e1)?e1-1:e1],
      '2':[e2,1000,'pc2',e2&&!resuelto('wp2_solved',e2)?e2-1:e2]};
    for(var app in datos){
      var cifra=Math.min(datos[app][0],datos[app][1]),total=datos[app][1],id=datos[app][2];
      var hecho=datos[app].length>3?Math.min(datos[app][3],total):cifra,frac=hecho/total;
      var el=document.querySelector('.app-choice[data-app="'+app+'"]');
      if(el){
        fijar(el.querySelector('.arco'),frac);
        el.querySelector('.ac-cifra').textContent=cifra.toLocaleString('es')+' / '+total.toLocaleString('es');
        el.setAttribute('aria-label',el.querySelector('.ac-nombre').firstChild.textContent+': '+(app==='3'?cifra+' de '+total+' completados':'ejercicio '+cifra+' de '+total));
      }
      fijar(document.querySelector('.anillos .a-'+id),frac);
      var pct=document.getElementById('c-p-'+id);
      if(pct){var p=frac*100;pct.textContent=(p>0&&p<1?'<1':Math.round(p))+' %';}
    }
  }
  function vaciarAvance(){
    var a=document.querySelectorAll('.anillos .arco');
    for(var i=0;i<a.length;i++)a[i].style.removeProperty('--o');
  }
  pintarAvance();
  new MutationObserver(function(){
    if(backdrop.classList.contains('open'))requestAnimationFrame(function(){requestAnimationFrame(pintarAvance);});
    else setTimeout(vaciarAvance,400);
  }).observe(backdrop,{attributes:true,attributeFilter:['class']});

  /* ---------- píldora del interruptor de apariencia ---------- */
  var tema=document.getElementById('tema');
  function pildora(){var b=tema.querySelectorAll('button');for(var i=0;i<b.length;i++)if(b[i].getAttribute('aria-pressed')==='true')tema.setAttribute('data-i',i);}
  new MutationObserver(pildora).observe(tema,{subtree:true,attributes:true,attributeFilter:['aria-pressed']});
  pildora();

  /* ---------- Mi ID: el pase ---------- */
  var cuenta=document.getElementById('mi-id-cuenta');
  function enlaceDe(id){return WEB+'?id='+encodeURIComponent(id);}
  /* el generador de QR se descarga solo cuando hace falta (al ver el pase de Mi ID) */
  var qrPedido=false;
  function cargarQR(){
    if(qrPedido)return;qrPedido=true;
    var sc=document.createElement('script');sc.src='c17/qrcode.js?v=1';sc.async=true;
    sc.onload=function(){try{completarMiId();}catch(e){}};
    document.head.appendChild(sc);
  }
  function qrSvg(texto){
    if(typeof window.qrcode!=='function'){cargarQR();return '';}
    try{
      var q=qrcode(0,'M');q.addData(texto);q.make();
      var n=q.getModuleCount(),d='';
      for(var r=0;r<n;r++)for(var c=0;c<n;c++)if(q.isDark(r,c))d+='M'+c+' '+r+'h1v1h-1z';
      return '<svg viewBox="0 0 '+n+' '+n+'" shape-rendering="crispEdges" role="img" aria-label="Código QR de tu ID"><path fill="#1C1B22" d="'+d+'"/></svg>';
    }catch(e){return '';}
  }
  var ICON_COPIAR='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-7a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h2"/></svg>';
  function completarMiId(){
    var id=window.PCSync&&window.PCSync.id;
    var pase=cuenta.querySelector('.mi-id-usuario'),pasos=document.getElementById('c-pasos');
    if(id&&pase){
      if(pasos)pasos.remove();
      var dentro=pase.querySelector(':scope>div');
      if(dentro&&!dentro.querySelector('.c-pase-cab')){
        var cab=document.createElement('div');cab.className='c-pase-cab';cab.innerHTML=LOGO+'Chess de L';
        dentro.insertBefore(cab,dentro.firstChild);
      }
      if(dentro&&!dentro.querySelector('.c-pase-qr')){
        var svg=qrSvg(enlaceDe(id));
        if(svg){
          var q=document.createElement('div');q.className='c-pase-qr';
          q.innerHTML='<div class="c-qr-img">'+svg+'</div><p><b>Sigue en otro dispositivo</b>Escanéalo con la cámara: tu ID llega escrito y solo tocas «Entrar».</p>';
          dentro.appendChild(q);
        }
      }
      if(!document.getElementById('c-copiar')){
        var b=document.createElement('button');b.type='button';b.className='c-copiar';b.id='c-copiar';
        b.innerHTML=ICON_COPIAR+'<span>Copiar enlace de mi ID</span>';
        b.onclick=function(){
          var t=b.querySelector('span'),url=enlaceDe(window.PCSync.id);
          function listo(){t.textContent='Enlace copiado';setTimeout(function(){t.textContent='Copiar enlace de mi ID';},1800);}
          try{navigator.clipboard.writeText(url).then(listo,function(){prompt('Copia este enlace:',url);});}catch(e){prompt('Copia este enlace:',url);}
        };
        cuenta.appendChild(b);
      }
    }else if(!id){
      var cp=document.getElementById('c-copiar');if(cp)cp.remove();
      if(!pasos&&cuenta.querySelector('.mi-id-form')){
        pasos=document.createElement('ol');pasos.className='c-pasos';pasos.id='c-pasos';
        pasos.innerHTML='<li>Elige un ID de 8 a 32 letras y números, que solo tú conozcas.</li><li>Tu avance de las tres secciones se guarda en la nube.</li><li>En otro dispositivo entras con el mismo ID y sigues donde te quedaste.</li>';
        cuenta.appendChild(pasos);
      }
    }
  }
  if(cuenta){
    new MutationObserver(function(m){
      for(var i=0;i<m.length;i++){for(var j=0;j<m[i].addedNodes.length;j++){var n=m[i].addedNodes[j];if(n.id==='c-copiar'||n.id==='c-pasos')return;}}
      completarMiId();
    }).observe(cuenta,{childList:true});
    /* el pase responde al puntero con un brillo sutil */
    if(!reduce)cuenta.addEventListener('pointermove',function(e){
      var p=e.target.closest&&e.target.closest('.mi-id-usuario');if(!p)return;
      var r=p.getBoundingClientRect(),fx=(e.clientX-r.left)/r.width,fy=(e.clientY-r.top)/r.height;
      p.style.setProperty('--bx',(fx*100).toFixed(1)+'%');p.style.setProperty('--by',(fy*100).toFixed(1)+'%');
      if(e.pointerType==='mouse'){p.style.setProperty('--ry',((fx-.5)*6).toFixed(2)+'deg');p.style.setProperty('--rx',((.5-fy)*6).toFixed(2)+'deg');}
    });
    cuenta.addEventListener('pointerleave',function(){var p=cuenta.querySelector('.mi-id-usuario');if(p){p.style.setProperty('--rx','0deg');p.style.setProperty('--ry','0deg');}},true);
  }

  /* Enlace con ?id=: abre Mi ID con el ID ya escrito, listo para «Entrar». */
  (function(){
    var q;try{q=new URLSearchParams(location.search);}catch(e){return;}
    var id=String(q.get('id')||'').trim().toLowerCase();
    if(!/^[a-z0-9]{4,32}$/.test(id))return;
    try{q.delete('id');var r=q.toString();history.replaceState(history.state,'',location.pathname+(r?'?'+r:'')+location.hash);}catch(e){}
    var t0=Date.now();
    (function esperar(){
      if(!window.PCSync){if(Date.now()-t0<15000)setTimeout(esperar,150);return;}
      if(window.PCSync.id===id)return;
      var b=document.querySelector('.app-choice[data-app="id"]');if(b&&!b.classList.contains('active'))b.click();
      setTimeout(function(){
        var inp=document.getElementById('mi-id-input');
        if(inp){inp.value=id;try{inp.focus({preventScroll:true});}catch(e){}}
      },120);
    })();
  })();

  /* ---------- selector de fondo ---------- */
  (function(){
    var fila=document.getElementById('c-fondos'),nombre=document.getElementById('c-fondo-nombre');
    if(!fila||!window.C17Fondos)return;
    var F=window.C17Fondos,h='<button type="button" class="fondo-op sin" role="radio" data-fondo="ninguno" aria-label="Sin fondo" title="Sin fondo"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5"/><path d="M6.8 17.2L17.2 6.8"/></svg></button>';
    for(var i=0;i<F.lista.length;i++){var f=F.lista[i];h+='<button type="button" class="fondo-op" role="radio" data-fondo="'+f.id+'" aria-label="'+f.n+'" title="'+f.n+'" data-mini="c17/fondos/'+f.id+'-m.webp"></button>';}
    fila.innerHTML=h;
    function marcar(){
      var id=F.leer(),d=F.datos(id),b=fila.querySelectorAll('.fondo-op');
      for(var j=0;j<b.length;j++){var on=b[j].getAttribute('data-fondo')===(d?id:'ninguno');b[j].setAttribute('aria-checked',on?'true':'false');b[j].tabIndex=on?0:-1;}
      nombre.textContent=d?d.n:'Sin fondo';
    }
    fila.addEventListener('click',function(e){
      var b=e.target.closest('.fondo-op');if(!b)return;
      F.guardar(b.getAttribute('data-fondo'));marcar();
      /* las secciones abiertas cambian al instante */
      var fr=document.querySelectorAll('iframe.app-frame');
      for(var k=0;k<fr.length;k++){try{var w=fr[k].contentWindow;if(w&&w.C17Fondos)w.C17Fondos.aplicar();}catch(err){}}
    });
    fila.addEventListener('keydown',function(e){
      if(e.key!=='ArrowRight'&&e.key!=='ArrowLeft')return;
      var b=[].slice.call(fila.querySelectorAll('.fondo-op')),i=b.indexOf(document.activeElement);if(i<0)return;
      var n=b[(i+(e.key==='ArrowRight'?1:b.length-1))%b.length];n.focus();n.click();e.preventDefault();
    });
    marcar();
    var activo=fila.querySelector('[aria-checked="true"]');
    /* las miniaturas se piden la primera vez que se abre el menú, no al cargar la página */
    var minis=false;
    function cargarMinis(){if(minis)return;minis=true;var b=fila.querySelectorAll('[data-mini]');for(var j=0;j<b.length;j++)b[j].style.backgroundImage='url('+b[j].getAttribute('data-mini')+')';}
    new MutationObserver(function(){if(backdrop.classList.contains('open')){cargarMinis();var a=fila.querySelector('[aria-checked="true"]');/* centra el fondo elegido solo de lado: scrollIntoView también movía el menú hacia abajo y el logo quedaba bajo el botón */if(a)try{var ra=a.getBoundingClientRect(),rf=fila.getBoundingClientRect();fila.scrollLeft+=(ra.left-rf.left)-(rf.width-ra.width)/2;}catch(e){}}}).observe(backdrop,{attributes:true,attributeFilter:['class']});
  })();

  /* ---------- teclado: Escape cierra el menú; al abrirlo, el foco va a la sección activa ---------- */
  document.addEventListener('keydown',function(e){
    if(e.key==='Escape'&&backdrop.classList.contains('open')){var mb=document.getElementById('menu-button');mb.click();mb.focus();}
  });
  new MutationObserver(function(){
    if(backdrop.classList.contains('open'))setTimeout(function(){var a=document.querySelector('.drawer .app-choice.active')||document.querySelector('.drawer .app-choice');if(a)try{a.focus({preventScroll:true});}catch(e){}},80);
  }).observe(backdrop,{attributes:true,attributeFilter:['class']});

  /* ---------- antes de recargar: avisar ---------- */
  window.addEventListener('beforeunload',function(e){
    if(window.__c17SinAviso||location.hostname==='appassets.androidplatform.net')return;
    e.preventDefault();e.returnValue='';return '';
  });
})();
