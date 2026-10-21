#!/usr/bin/env python3
"""Construye index3.html (Aprende Ajedrez) a partir de index1.html (Método PC1).

Por qué así: Aprende Ajedrez debe usar el MISMO tablero, los mismos botones,
el mismo motor de legalidad, Stockfish, flechas, sonidos y estilos que PC1.
En lugar de copiar a mano cientos de líneas (y dejar dos versiones que se
desincronizan), este script toma esas piezas directamente de index1.html y
aplica solo los cambios necesarios, cada uno verificado: si index1.html cambia
y un parche deja de encajar, el script se detiene y lo dice, en vez de generar
algo roto.

Cambios que aplica a la copia:
  · claves de almacenamiento wp_… → aa_… (el progreso de PC1 y PC2 nunca se toca);
  · tema del tablero propio (pc_tablero_3);
  · el libro de 1128 ejercicios se sustituye por las lecciones (aa-*.js);
  · copias de seguridad que reconocen la tercera sección.

También aplica a index1.html e index2.html un único cambio pequeño en su
sistema de copias (exportar/importar) para que incluyan los datos de Aprende
Ajedrez sin romper las copias antiguas (ver parchear_copias).

Uso:  python3 tools/aprende/construir.py
"""
import re, sys, pathlib

RAIZ = pathlib.Path(__file__).resolve().parents[2]
AQUI = pathlib.Path(__file__).resolve().parent
VERSION = '20261021-aa67'


class ErrorParche(Exception):
    pass


def parche(texto, viejo, nuevo, veces=1, nombre='', idempotente=False):
    if idempotente and nuevo in texto and viejo not in texto:
        return texto  # ya aplicado (por ejemplo, en index1.html ya parcheado)
    n = texto.count(viejo)
    if n != veces:
        raise ErrorParche(f'Parche «{nombre or viejo[:60]}»: se esperaban {veces} coincidencias y hay {n}.')
    return texto.replace(viejo, nuevo)


def bloque_etiqueta(html, etiqueta, inicio):
    """Devuelve el bloque <etiqueta …>…</etiqueta> que empieza en «inicio», respetando anidamiento."""
    pat = re.compile(r'<(/?)' + etiqueta + r'\b[^>]*>', re.I)
    prof = 0
    for m in pat.finditer(html, inicio):
        if m.group(1):
            prof -= 1
            if prof == 0:
                return html[inicio:m.end()]
        else:
            prof += 1
    raise ErrorParche(f'No se cerró <{etiqueta}> desde {inicio}')


def por_id(html, ident):
    m = re.search(r'<(\w+)[^>]*\bid="' + re.escape(ident) + r'"', html)
    if not m:
        raise ErrorParche(f'No encontré id="{ident}" en index1.html')
    return bloque_etiqueta(html, m.group(1), m.start())


def script_con(html, marca):
    """Contenido del primer <script> (sin src) que contiene «marca»."""
    for m in re.finditer(r'<script([^>]*)>', html):
        if 'src=' in m.group(1):
            continue
        fin = html.find('</script>', m.end())
        cuerpo = html[m.end():fin]
        if marca in cuerpo:
            return m.group(0), cuerpo
    raise ErrorParche(f'No encontré el script que contiene {marca!r}')


def estilo_id(html, ident):
    m = re.search(r'<style id="' + re.escape(ident) + r'">', html)
    if not m:
        raise ErrorParche(f'No encontré <style id="{ident}">')
    fin = html.find('</style>', m.end())
    return html[m.start():fin + 8]


# ---------------------------------------------------------------------------
# Sistema de copias (exportar/importar): mismo cambio en las tres páginas.
# ---------------------------------------------------------------------------
def parchear_preload(js, pagina):
    js = parche(js,
        "function appKey(k){return typeof k==='string'&&(k.startsWith('wp_')||k.startsWith('wp2_')||k.startsWith('pc_'));}",
        "function appKey(k){return typeof k==='string'&&(k.startsWith('wp_')||k.startsWith('wp2_')||k.startsWith('pc_')||k.startsWith('aa_'));}",
        nombre='preload: claves aa_', idempotente=True)
    js = parche(js,
        "if(p.page.file!=='index1.html'&&p.page.file!=='index2.html')throw new Error('Index inválido');",
        "if(p.page.file!=='index1.html'&&p.page.file!=='index2.html'&&p.page.file!=='index3.html')throw new Error('Index inválido');",
        nombre='preload: index3 válido', idempotente=True)
    # Una copia antigua (sin datos aa_) no borra el avance de Aprende Ajedrez.
    js = parche(js,
        "function clear(storage){\n  var ks=[];\n  try{for(var i=0;i<storage.length;i++){var k=storage.key(i);if(appKey(k))ks.push(k);}}catch(e){}\n  ks.forEach(function(k){storage.removeItem(k);});\n}",
        "function clear(storage,nuevo){\n  var ks=[];\n  /* Una copia sin datos de Aprende Ajedrez (aa_) no borra ese avance. */\n  var conAa=!nuevo||Object.keys(nuevo).some(function(k){return k.indexOf('aa_')===0;});\n  try{for(var i=0;i<storage.length;i++){var k=storage.key(i);if(appKey(k)&&(conAa||k.indexOf('aa_')!==0))ks.push(k);}}catch(e){}\n  ks.forEach(function(k){storage.removeItem(k);});\n}",
        nombre='preload: conservar aa_', idempotente=True)
    js = parche(js,
        "clear(localStorage);clear(sessionStorage);\n      write(localStorage,payload.storage.local);",
        "clear(localStorage,payload.storage.local);clear(sessionStorage,payload.storage.session);\n      write(localStorage,payload.storage.local);",
        nombre='preload: limpiar según la copia', idempotente=True)
    return js


def parchear_backup(js, pagina):
    js = parche(js,
        "function isAppKey(key){return typeof key==='string'&&(key.startsWith('wp_')||key.startsWith('wp2_')||key.startsWith('pc_'));}",
        "function isAppKey(key){return typeof key==='string'&&(key.startsWith('wp_')||key.startsWith('wp2_')||key.startsWith('pc_')||key.startsWith('aa_'));}",
        nombre='copias: claves aa_', idempotente=True)
    js = parche(js,
        "const VALID_PAGES=new Set(['index1.html','index2.html']);",
        "const VALID_PAGES=new Set(['index1.html','index2.html','index3.html']);",
        nombre='copias: index3 válido', idempotente=True)
    if pagina == 'index3.html':
        # La foto de página de Aprende Ajedrez vive en su propio ámbito (aa_), no en el de PC1.
        js = parche(js, "const PAGE_PREFIX='pc_backup_page_state_v2:';", "const PAGE_PREFIX='aa_backup_page_state_v2:';", nombre='copias: prefijo aa')
        js = parche(js, "const k=currentFile()==='index2.html'?'wp2_ultimo':'wp_ultimo';", "const k='aa_sin_numero';", nombre='copias: sin número de ejercicio')
        # Al importar dentro de Aprende Ajedrez se recarga esta misma sección.
        js = parche(js, "const target=String(payload.page.file).toLowerCase();", "const target=currentFile();", nombre='copias: recargar index3')
    return js


def parchear_copias(ruta):
    html = ruta.read_text(encoding='utf-8')
    if "k.startsWith('aa_')" in html and "'index3.html'" in html:
        return False  # ya aplicado
    abre, pre = script_con(html, "const PENDING='__pc_backup_pending_v3';")
    html = parche(html, pre, parchear_preload(pre, ruta.name), nombre=f'{ruta.name}: preload')
    abre, bk = script_con(html, "const PENDING_KEY='__pc_backup_pending_v3';")
    html = parche(html, bk, parchear_backup(bk, ruta.name), nombre=f'{ruta.name}: copias')
    ruta.write_text(html, encoding='utf-8')
    return True


# ---------------------------------------------------------------------------
def piel_c17(html):
    """Solo en chess17 (tiene la carpeta c17/): Aprende Ajedrez lleva la misma piel que PC1.
    Copia de index1.html las líneas de la piel para que las versiones nunca se desincronicen."""
    if not (RAIZ / 'c17').is_dir():
        return html
    i1 = (RAIZ / 'index1.html').read_text(encoding='utf-8')
    cab = i1[:i1.index('</head>')]
    lineas = [l for l in cab.splitlines() if ('rel="stylesheet" href="c17/' in l or '<script src="c17/' in l)]
    precargas = [l for l in cab.splitlines() if 'rel="preload"' in l and 'c17/' in l]
    if not lineas:
        raise ErrorParche('index1.html no trae la piel c17')
    html = parche(html, '<html lang="es">', '<html lang="es" data-piel data-seccion="aa">', nombre='piel: html')
    if precargas:
        html = parche(html, '<head>\n', '<head>\n' + '\n'.join(precargas) + '\n', nombre='piel: precargas')
    m = re.search(r'<link rel="stylesheet" href="aa-app\.css\?v=[^"]*">\n', html)
    if not m:
        raise ErrorParche('No está la hoja aa-app.css')
    return html[:m.end()] + '\n'.join(lineas) + '\n' + html[m.end():]


def construir():
    i1 = (RAIZ / 'index1.html').read_text(encoding='utf-8')
    cuerpo = (AQUI / 'cuerpo.html').read_text(encoding='utf-8')

    # --- piezas de index1 ---
    # detección de Android (también tabletas en modo escritorio), la misma de index1
    _i = i1.index('<script>/* Android, también')
    deteccion = i1[_i:i1.index('</script>\n', _i) + 10]
    _, preload = script_con(i1, "const PENDING='__pc_backup_pending_v3';")
    diseno = estilo_id(i1, 'pc-diseno')
    _, tema = script_con(i1, "r.setAttribute('data-tablero', g('pc_tablero_1')||'cielo');")
    estilos_extra = ''.join(estilo_id(i1, x) for x in ('android7-compat', 'pc-fila-controles-css', 'pc-ajustes-cabecera-css'))
    _, chessjs = script_con(i1, 'const Chess = function (fen) {')
    _, logica = script_con(i1, 'const PUZZLES = ')
    _, compat = script_con(i1, 'function squareElements(){')
    _, atras = script_con(i1, 'function pcCloseOpenWindows(){')
    _, apariencia = script_con(i1, "var PC_ID='1';")
    _, movil = script_con(i1, "var mq=window.matchMedia('(max-width: 700px)');")
    # La Sección 1 tiene su propia fila de navegación (Historial · Lección x · Lección y) en todas las pantallas:
    # el reacomodo móvil de PC1 no debe mover esos botones.
    movil = parche(movil, "var reiniciar=document.getElementById('b-reset');",
                   "var reiniciar=null; /* Sección 1: fila de navegación propia */", nombre='navegación móvil')
    _, copias = script_con(i1, "const PENDING_KEY='__pc_backup_pending_v3';")

    # --- parches ---
    preload = parchear_preload(preload, 'index3.html')
    copias = parchear_backup(copias, 'index3.html')
    tema = parche(tema, "g('pc_tablero_1')", "g('pc_tablero_3')", veces=2, nombre='tema propio')

    # El libro de ejercicios se reemplaza por una posición neutra: las lecciones
    # cargan sus propias posiciones (aa-lecciones-*.js).
    ini = logica.find('const PUZZLES = ')
    # index1 lee sus ejercicios de pc1-ejercicios.js («const PUZZLES = window.PC_EJERCICIOS;»)
    fin = (logica.find('];', ini) + 2) if logica.startswith('const PUZZLES = [', ini) else (logica.find(';', ini) + 1)
    neutra = ('const PUZZLES = [{"n":0,"lv":"F","fen":"rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",'
              '"o":"w","ln":[],"u":[],"w":"","b":"","ev":"","tg":[],"v":0,"full":""}];')
    logica = logica[:ini] + neutra + logica[fin:]
    for k in ('wp_banner', 'wp_daily_goal', 'wp_error_book', 'wp_explain_theme', 'wp_hist_log_backup',
              'wp_hist_log', 'wp_solved_at_backup', 'wp_solved_at', 'wp_solved', 'wp_sound', 'wp_ultimo'):
        logica = logica.replace("'" + k + "'", "'aa_" + k[3:] + "'")
    # Aprende no tiene sonido: ni el tablero ni ninguna otra parte (el botón ya está oculto).
    logica = parche(logica, "let soundOn = localStorage.getItem('aa_sound')!=='0';",
                    "let soundOn = false; /* Aprende: sin sonido */", nombre='sin sonido')
    logica = parche(logica, "const AUDIOS={\n  move:    new Audio('Move.mp3'),\n  capture: new Audio('Capture.mp3'),\n  error:   new Audio('Error.mp3')\n};",
                    "const AUDIOS={}; /* Aprende: sin sonido, no se descargan los audios */", nombre='sin audios')
    logica = parche(logica, "'pc_tab_ultimo_l1'", "'aa_tab_ultimo'", veces=2, nombre='pestaña')
    # «Ocultar/Mostrar» del encabezado: empieza OCULTO, como en los métodos; la elección es de cada
    # dispositivo (aa_banner no viaja con el ID).
    logica = parche(logica, "let bannerOculto=localStorage.getItem('aa_banner')!=='0'; /* oculta por defecto: «Mostrar» queda listo */",
                    "let bannerOculto=localStorage.getItem('aa_banner')!=='0'; /* Sección 1: oculto por defecto */",
                    nombre='encabezado oculto por defecto')
    # (la escucha de «storage» para seguir la elección en otras secciones viene de index1, ya renombrada a aa_banner)
    if re.search(r"['\"]wp_", logica):
        raise ErrorParche('Quedó alguna clave wp_ sin renombrar en la lógica copiada.')
    # Título de la imagen para compartir.
    logica = parche(logica, "ctx.fillText('Ejercicio '+curr().n,80,90);",
                    "ctx.fillText(window.aaTituloCompartir?aaTituloCompartir():('Ejercicio '+curr().n),80,90);",
                    nombre='compartir: título')

    apariencia = parche(apariencia, "var PC_ID='1';", "var PC_ID='3';", nombre='apariencia: id 3')
    apariencia = apariencia.replace("'wp_explain_theme'", "'aa_explain_theme'")
    if re.search(r"['\"]wp_", apariencia):
        raise ErrorParche('Quedó alguna clave wp_ en la apariencia copiada.')

    # --- cuerpo: bloques de marcado reutilizados tal cual de index1 ---
    def poner(marca, html):
        nonlocal cuerpo
        cuerpo = parche(cuerpo, marca, html, nombre='plantilla ' + marca)
    poner('<!--@pc-modo-->', por_id(i1, 'pc-modo'))
    m = re.search(r'<button class="btn" id="b-edit"[^>]*>.*?</button>', i1, re.S)
    poner('<!--@boton:b-edit-->', m.group(0))
    for ident in ('engine-box', 'pc-fila-controles', 'hist-modal', 'aviso-modal', 'confirm-modal',
                  'random-modal', 'promo-modal', 'gift-modal', 'explain-modal',
                  # selector de tableros (temas, favoritos y personalizado), igual que en PC1 y PC2
                  'pc-perso-bg', 'pc-aviso-bg', 'pc-favs-bg', 'pc-temas-bg', 'pc-conf-bg'):
        poner('<!--@bloque:' + ident + '-->', por_id(i1, ident))
    # Ajustes de texto en los bloques reutilizados (sin cambiar su estructura).
    cuerpo = parche(cuerpo, '<h3>Historial de resueltos</h3>', '<h3>Historial de aprendizaje</h3>', nombre='historial: título')
    cuerpo = parche(cuerpo, 'id="b-explain" type="button" aria-label="Explicación" title="Explicación"',
                    'id="b-explain" type="button" aria-label="Explicación de la posición" title="Explicación de la posición"', nombre='explicación')

    v = VERSION
    html = f'''<!DOCTYPE html>
<html lang="es">
<head>
<!-- las lecciones y la app se piden desde el principio, junto con la página -->
<link rel="preload" href="aa-app.css?v={v}" as="style">
<link rel="preload" href="aa-catalogo.js?v={v}" as="script">
<link rel="preload" href="aa-datos.js?v={v}" as="script">
<link rel="preload" href="aa-lecciones-n1.js?v={v}" as="script">
<link rel="preload" href="aa-lecciones-n2.js?v={v}" as="script">
<link rel="preload" href="aa-lecciones-n3.js?v={v}" as="script">
<link rel="preload" href="aa-lecciones-n4.js?v={v}" as="script">
<link rel="preload" href="aa-lecciones-n5.js?v={v}" as="script">
<link rel="preload" href="aa-lecciones-n6.js?v={v}" as="script">
<link rel="preload" href="aa-app.js?v={v}" as="script">
<link rel="preload" href="pc-compartir.js?v=3" as="script">
<link rel="preload" href="pc-mascota.js?v=22" as="script">
<script id="pc-backup-preload">{preload}</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
{deteccion}<meta name="theme-color" content="#0F1411">
<title>Aprende Ajedrez</title>
<link rel="icon" type="image/png" sizes="16x16" href="c17/fav-16.png">
<link rel="icon" type="image/png" sizes="32x32" href="c17/fav-32.png">
<link rel="icon" type="image/png" sizes="48x48" href="c17/fav-48.png">
<link rel="icon" type="image/png" sizes="96x96" href="c17/fav-96.png">
<link rel="icon" type="image/svg+xml" sizes="any" href="c17/logo.svg?v=3">
<link rel="apple-touch-icon" sizes="180x180" href="c17/apple-touch-icon.png">
<!-- Generado por tools/aprende/construir.py a partir de index1.html. No editar a mano:
     los cambios propios de Aprende Ajedrez van en aa-*.js / aa-app.css / tools/aprende/cuerpo.html. -->
{diseno}
<script>{tema}</script>
{estilos_extra}
<link rel="stylesheet" href="aa-app.css?v={v}">
</head>
<body class="aa-app">
{cuerpo}
<script>{chessjs}</script>
<script>{logica}</script>
<script id="android7-compat-js">{compat}</script>
<script id="pc-android-back-navigation">{atras}</script>
<script id="pc-apariencia">{apariencia}</script>
<script id="pc-mobile-nav-v1">{movil}</script>
<script id="pc-backup-system">{copias}</script>
<script src="pc-compartir.js?v=3"></script>
<script src="aa-catalogo.js?v={v}"></script>
<script src="aa-datos.js?v={v}"></script>
<script src="aa-lecciones-n1.js?v={v}"></script>
<script src="aa-lecciones-n2.js?v={v}"></script>
<script src="aa-lecciones-n3.js?v={v}"></script>
<script src="aa-lecciones-n4.js?v={v}"></script>
<script src="aa-lecciones-n5.js?v={v}"></script>
<script src="aa-lecciones-n6.js?v={v}"></script>
<script src="aa-app.js?v={v}"></script>
<script src="pc-mascota.js?v=22"></script>
</body>
</html>
'''
    html = piel_c17(html)
    (RAIZ / 'index3.html').write_text(html, encoding='utf-8')
    return len(html)


if __name__ == '__main__':
    try:
        n = construir()
        print(f'index3.html generado ({n:,} bytes)')
        # el contenedor (index.html) también carga aa-datos.js: misma versión, así no se descarga dos veces
        ruta = RAIZ / 'index.html'
        t = ruta.read_text(encoding='utf-8')
        t2 = re.sub(r'aa-datos\.js\?v=[^"]*"', 'aa-datos.js?v=' + VERSION + '"', t)
        if t2 != t:
            ruta.write_text(t2, encoding='utf-8')
            print('index.html: versión de aa-datos.js actualizada')
        for nombre in ('index1.html', 'index2.html'):
            cambio = parchear_copias(RAIZ / nombre)
            print(f'{nombre}: ' + ('copias actualizadas para incluir Aprende Ajedrez' if cambio else 'copias ya actualizadas'))
    except ErrorParche as e:
        print('ERROR:', e, file=sys.stderr)
        sys.exit(1)
