/* Aprende Ajedrez · lecciones del NIVEL UNO
   Cada posición y cada jugada se comprueban con tools/aprende/validar.cjs
   (legalidad con chess.js y, en los ejercicios tácticos, Stockfish).
   Formato de una lección: ver aa-app.js (etapas descubre, observa, comprende,
   practica, hazlo, comprueba). «regla:true» marca ejercicios de reglas del juego,
   donde lo que se pide es aplicar la regla y no la jugada más fuerte. */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};
var INICIAL='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

/* N1-001 · Coordenadas del tablero */
L['N1-001']={
  objetivo:'Vas a aprender a nombrar cada casilla del tablero.',
  idea:'Cada casilla tiene nombre: **la letra de su columna y el número de su fila**, por ejemplo e4.',
  descubre:{fen:'4k3/8/8/8/8/8/8/R1B1K3 w - - 0 1',
    di:'El tablero tiene 64 casillas y cada una tiene nombre. ¿Sabrías decir en qué casilla está el alfil blanco?'},
  observa:[
    {flechas:[['a1','a8','linea']], di:'Una **columna** va de abajo hacia arriba y se nombra con una letra, de la **a** a la **h**. La torre está en la columna a.',
     sencillo:'Mira las letras de abajo del tablero: a, b, c… Cada letra es una columna, una «calle» que sube.'},
    {flechas:[['a1','h1','linea']], di:'Una **fila** va de izquierda a derecha y se nombra con un número, del **1** al **8**. Las piezas blancas empiezan en las filas 1 y 2.',
     sencillo:'Ahora mira los números del costado: 1, 2, 3… Cada número es una fila, una «calle» que cruza.'},
    {flechas:[['c1','h6','linea']], di:'Una **diagonal** une casillas del mismo color en línea inclinada, como la que recorre el alfil de c1 hasta h6.',
     sencillo:'La diagonal va en línea inclinada, siempre por casillas del mismo color.'},
    {marcas:[['e4','clave'],['d5','clave']], di:'Para nombrar una casilla se dice primero la columna y luego la fila: estas son **e4** y **d5**, dos casillas del centro.',
     sencillo:'Primero la letra, después el número. La casilla marcada abajo es e4: columna e, fila 4.'}
  ],
  comprende:{di:'Columna = letra. Fila = número. El nombre de una casilla es letra + número: a1, e4, h8…'},
  practica:{tipo:'casilla',fen:'4k3/8/8/8/8/8/8/R1B1K3 w - - 0 1',casillas:['e4'],
    di:'Toca la casilla **e4**.',pista:'Busca la columna e (la letra de abajo) y sube hasta la fila 4.',bien:'¡Exacto! Esa es e4, una casilla central muy importante.'},
  hazlo:{tipo:'casilla',fen:'4k3/8/8/8/8/8/8/R1B1K3 w - - 0 1',casillas:['d4','e4','d5','e5'],
    di:'Toca las cuatro casillas del centro: **d4, e4, d5 y e5**.',pista:'Están justo en el medio del tablero: columnas d y e, filas 4 y 5.',bien:'¡Perfecto! Esas cuatro casillas forman el centro del tablero.'},
  comprueba:{tipo:'casilla',fen:'4k3/8/8/8/8/8/8/R1B1K3 w - - 0 1',casillas:['a8','h8','h1'],
    di:'La torre está en la esquina **a1**. Toca las otras tres esquinas del tablero: **a8**, **h8** y **h1**.',pista:'Las esquinas están en las columnas a y h, en las filas 1 y 8.',bien:'¡Perfecto! a1, a8, h8 y h1: ya conoces los cuatro extremos del tablero.'}
};

/* N1-002 · Notación algebraica */
L['N1-002']={
  objetivo:'Vas a aprender a leer y escribir jugadas.',
  idea:'Las piezas se escriben con su inicial (**R** rey, **D** dama, **T** torre, **A** alfil, **C** caballo) y la casilla de llegada; los peones, solo con la casilla. **x** = captura, **+** = jaque, **#** = mate.',
  descubre:{fen:INICIAL,di:'Las jugadas se pueden escribir para repasarlas o leerlas en un libro. ¿Cómo escribirías el avance del peón de e2 a e4?'},
  observa:[
    {jugada:'e2e4',marcas:[['e4','clave']],di:'Un peón se escribe solo con la casilla a la que llega: **e4**.',sencillo:'Cuando mueve un peón, solo escribes adónde llega. Este peón llegó a e4.'},
    {jugada:'e7e5',marcas:[['e5','clave']],di:'Las negras responden **e5**. Juntas forman la jugada número 1: **1.e4 e5**.',sencillo:'Una jugada completa tiene un movimiento blanco y uno negro: 1.e4 e5.'},
    {jugada:'g1f3',marcas:[['f3','clave']],di:'Las demás piezas llevan su inicial en mayúscula: R rey, D dama, T torre, A alfil, C caballo. El caballo va a f3: **2.Cf3**.',sencillo:'C es de caballo. El caballo llegó a f3, así que se escribe Cf3.'},
    {jugada:'b8c6',marcas:[['c6','clave']],di:'Las negras: **2…Cc6**. Los tres puntos indican que la jugada es de las negras.',sencillo:'Los puntos suspensivos avisan que mueven las negras: 2…Cc6.'},
    {jugada:'f1b5',flechas:[['b5','c6','ataque']],di:'**3.Ab5**. Si una pieza captura se escribe una **x**: «Axc6» sería «el alfil captura en c6». El jaque se marca con **+** y el mate con **#**.',sencillo:'A es de alfil: Ab5. Si capturara en c6 escribiríamos Axc6, con una x en medio.'}
  ],
  comprende:{di:'Inicial de la pieza + casilla de llegada. Los peones no llevan letra. x captura, + jaque, # mate.'},
  practica:{fen:INICIAL,linea:['g1f3'],regla:true,di:'Juega **Cf3**.',pistas:['C es el caballo. ¿Cuál de tus caballos puede llegar a f3?','El caballo de g1.'],bien:'¡Bien! Cf3: el caballo llegó a f3.'},
  hazlo:{fen:INICIAL,linea:['e2e4','e7e5','f1c4'],regla:true,di:'Juega **1.e4** y, cuando respondan, **2.Ac4**.',pistas:['Primero el peón de e2 a e4.','A es el alfil: el de f1 llega a c4.'],bien:'¡Muy bien! 1.e4 e5 2.Ac4: ya sabes leer una partida.'},
  comprueba:{fen:'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',linea:['b5c6','d7c6','b1c3'],regla:true,
    di:'Lee y juega: **4.Axc6** (la **x** indica captura) y, cuando respondan 4…dxc6, juega **5.Cc3**.',pistas:['A es el alfil: el de b5 captura en c6.','C es el caballo: el de b1 llega a c3.'],bien:'¡Muy bien! 4.Axc6 dxc6 5.Cc3: leíste una captura y una jugada de caballo.'}
};

/* N1-003 · El enroque */
var ENROQUE='r3k2r/pppq1ppp/2npbn2/2b1p3/2B1P3/2NPBN2/PPPQ1PPP/R3K2R w KQkq - 0 1';
L['N1-003']={
  objetivo:'Vas a aprender la única jugada en la que se mueven dos piezas a la vez.',
  idea:'En el **enroque** el rey se mueve dos casillas hacia una torre y la torre salta al otro lado del rey. **0-0** es el corto y **0-0-0** el largo.',
  descubre:{fen:ENROQUE,di:'Los dos bandos tienen libre el camino entre el rey y sus torres. ¿Sabes cómo se enroca?'},
  observa:[
    {flechas:[['e1','g1','mov']],di:'En el **enroque corto** el rey se mueve dos casillas hacia la torre de h1…',sencillo:'Para enrocar se mueve el rey, no la torre: dos pasos hacia la torre.'},
    {jugada:'e1g1',marcas:[['g1','clave'],['f1','clave']],di:'…y la torre salta al otro lado del rey, a f1. Se escribe **0-0**.',sencillo:'El rey llegó a g1 y la torre se puso a su lado, en f1. Rey a salvo en la esquina.'},
    {fen:ENROQUE,flechas:[['e1','c1','mov']],di:'En el **enroque largo** el rey va dos casillas hacia la torre de a1…',sencillo:'Ahora hacia el otro lado: el rey da dos pasos hacia la torre de a1.'},
    {jugada:'e1c1',marcas:[['c1','clave'],['d1','clave']],di:'…y la torre de a1 salta a d1. Se escribe **0-0-0**.',sencillo:'El rey quedó en c1 y la torre en d1, a su lado.'}
  ],
  comprende:{di:'Para enrocar en el tablero, mueve el rey dos casillas hacia la torre: la torre se coloca sola.'},
  practica:{fen:ENROQUE,linea:['e1g1'],regla:true,di:'Enroca **corto** con las blancas.',pistas:['Mueve el rey dos casillas hacia la torre de h1.','Lleva el rey de e1 a g1.'],bien:'¡Enroque corto hecho! Tu rey está más seguro.'},
  hazlo:{fen:'r3k2r/pppq1ppp/2npbn2/2b1p3/2B1P3/2NPBN2/PPPQ1PPP/R4RK1 b kq - 1 1',linea:['e8c8'],regla:true,di:'Juegas con las negras: enroca **largo**.',pistas:['El enroque largo es hacia la torre de a8.','El rey va de e8 a c8.'],bien:'¡Correcto! 0-0-0: rey en c8 y torre en d8.'},
  comprueba:{fen:ENROQUE,linea:['e1c1'],regla:true,di:'Enroca **largo** con las blancas.',pistas:['Largo es hacia la torre de a1.'],bien:'¡Perfecto! Ya sabes los dos enroques.'}
};

/* N1-004 · Cuándo no se puede enrocar */
L['N1-004']={
  objetivo:'Vas a aprender las condiciones que impiden enrocar.',
  idea:'No se puede enrocar si el rey está en jaque, si pasa por una casilla atacada o llega a una, si hay piezas en medio, o si el rey o esa torre ya se movieron.',
  descubre:{fen:'r3k2r/ppp2ppp/8/8/2b5/8/PPP2PPP/R3K2R w KQkq - 0 1',di:'¿Pueden enrocar corto las blancas? Mira bien el alfil negro.'},
  observa:[
    {flechas:[['c4','f1','ataque']],marcas:[['f1','clave']],di:'El alfil de c4 ataca **f1**. El rey no puede **pasar** por una casilla atacada: el enroque corto está prohibido.',sencillo:'El rey no puede cruzar por una casilla donde lo atacarían. El alfil vigila f1, así que no hay enroque corto.'},
    {flechas:[['e1','c1','mov']],di:'El enroque largo sí está permitido: ni d1 ni c1 están atacadas.',sencillo:'Por el otro lado el camino es seguro: ahí sí se puede enrocar.'},
    {jugada:'e1c1',marcas:[['c1','clave']],di:'Las blancas enrocan largo: **0-0-0**.',sencillo:'Listo: enroque largo.'},
    {fen:'r3k2r/ppp2ppp/8/8/8/8/PPP2PPP/R2QK1NR w KQkq - 0 1',marcas:[['d1','clave'],['g1','clave']],di:'Tampoco se puede enrocar si hay piezas entre el rey y la torre (aquí la dama y el caballo), si el rey está en jaque o si el rey o esa torre ya se movieron.',sencillo:'Para enrocar, el camino entre rey y torre tiene que estar vacío.'}
  ],
  comprende:{di:'El rey no puede estar en jaque, ni cruzar ni llegar a casillas atacadas. Entre rey y torre no puede haber piezas. Y ninguno de los dos puede haberse movido antes.'},
  practica:{tipo:'casilla',fen:'r3k2r/ppp2ppp/8/8/8/6n1/PPP2P1P/R3K2R w KQkq - 0 1',casillas:['f1'],di:'Las blancas no pueden enrocar corto. Toca la casilla atacada que lo impide.',pista:'Mira qué casillas ataca el caballo negro de g3.',bien:'¡Bien! El caballo ataca f1, la casilla por la que pasaría el rey.'},
  hazlo:{fen:'r3k2r/ppp2ppp/8/8/8/3R4/PPP2PPP/4K2R b Kkq - 0 1',linea:['e8g8'],regla:true,di:'Juegas con las negras. Uno de los enroques está prohibido. Haz el que sí está permitido.',pistas:['La torre blanca de d3 ataca d8: el enroque largo pasaría por ahí.','Enroca corto: el rey de e8 a g8.'],bien:'¡Correcto! El largo era imposible porque el rey cruzaría d8.'},
  comprueba:{fen:'r3k2r/ppp2ppp/8/1B6/8/8/PPP2PPP/R3K2R b KQkq - 0 1',linea:['c7c6'],regla:true,
    di:'Juegas con negras. El alfil de b5 te da jaque: ahora **no puedes enrocar**. Sal del jaque **sin mover el rey**, así podrás enrocar más adelante.',pistas:['Pon un peón entre el alfil y tu rey.','El peón de c7 puede ir a c6.'],
    mal:{'*':'Si mueves el rey pierdes para siempre el derecho a enrocar. Tapa el jaque.'},bien:'¡Muy bien! …c6 tapa el jaque y ataca al alfil. Tu rey sigue en e8 y todavía puede enrocar.'}
};

/* N1-005 · La promoción del peón */
L['N1-005']={
  objetivo:'Vas a aprender qué pasa cuando un peón llega al final del tablero.',
  idea:'Un peón que llega a la última fila **corona**: se convierte en dama, torre, alfil o caballo. Casi siempre conviene la dama.',
  descubre:{fen:'8/4P1k1/8/8/8/8/8/4K3 w - - 0 1',di:'Este peón está a una casilla del final. ¿Qué crees que pasa cuando llega a la última fila?'},
  observa:[
    {flechas:[['e7','e8','mov']],di:'Cuando un peón llega a la última fila se **corona**: se convierte en dama, torre, alfil o caballo, a tu elección.',sencillo:'El peón es la pieza más pequeña, pero si llega al final del tablero se transforma.'},
    {jugada:'e7e8q',marcas:[['e8','clave']],di:'Casi siempre se elige **dama**, la pieza más fuerte. Se escribe **e8=D**.',sencillo:'¡El peón se convirtió en dama! Por eso los peones avanzados son tan valiosos.'},
    {fen:'6k1/1P6/8/8/8/3Q4/8/6K1 w - - 0 1',flechas:[['b7','b8','mov']],di:'Puedes tener dos damas a la vez: no importa que la primera siga en el tablero.',sencillo:'Aunque ya tengas una dama, el peón también puede ser dama.'}
  ],
  comprende:{di:'La coronación es obligatoria al llegar a la última fila: el peón no puede quedarse como peón.'},
  practica:{fen:'8/1P3k2/8/8/8/8/5K2/8 w - - 0 1',linea:['b7b8q'],regla:true,di:'Corona el peón de b7.',pistas:['El peón avanza una casilla hasta la última fila.'],bien:'¡Dama nueva! El peón se coronó en b8.'},
  hazlo:{fen:'6k1/8/8/8/8/8/p5K1/8 b - - 0 1',linea:['a2a1q'],regla:true,di:'Juegas con las negras: corona tu peón.',pistas:['Para las negras, la última fila es la fila 1.'],bien:'¡Correcto! Para las negras el peón corona en la fila 1.'},
  comprueba:{fen:'6k1/4Pppp/8/8/8/8/8/6K1 w - - 0 1',linea:['e7e8q'],meta:'mate',di:'Corona de manera que des jaque mate.',pistas:['El rey negro está encerrado por sus propios peones.'],bien:'¡Jaque mate! La nueva dama ataca toda la fila 8 y el rey no tiene escape.'}
};

/* N1-006 · La captura al paso */
L['N1-006']={
  objetivo:'Vas a aprender una captura especial que solo pueden hacer los peones.',
  idea:'Si un peón avanza **dos casillas** y queda al lado de un peón rival, este puede capturarlo **al paso**, como si hubiera avanzado una. Solo en la jugada siguiente.',
  descubre:{fen:'k7/3p4/8/4P3/8/8/8/K7 b - - 0 1',di:'El peón negro de d7 puede avanzar dos casillas y quedar al lado del peón blanco. ¿Se salvará de ser capturado?'},
  observa:[
    {jugada:'d7d5',marcas:[['d5','clave']],di:'Las negras avanzan dos casillas: **d5**. Parece que el peón pasó de largo.',sencillo:'El peón negro dio un salto doble y quedó al lado del peón blanco.'},
    {flechas:[['e5','d6','mov']],marcas:[['d6','clave']],di:'Pero el peón de e5 puede capturarlo **al paso**: avanza en diagonal a **d6**, la casilla que el peón negro saltó.',sencillo:'El peón blanco lo captura como si el negro hubiera avanzado solo una casilla.'},
    {jugada:'e5d6',di:'El peón negro desaparece de d5. Se escribe **exd6 a.p.**',sencillo:'¡Capturado! El peón blanco quedó en d6 y el negro salió del tablero.'}
  ],
  comprende:{di:'La captura al paso solo la hace un peón contra otro peón que acaba de avanzar dos casillas, y solo en la jugada inmediatamente siguiente.'},
  practica:{fen:'k7/8/8/3pP3/8/8/8/K7 w - d6 0 1',linea:['e5d6'],regla:true,di:'El peón negro acaba de jugar d7-d5. Captúralo al paso.',pistas:['Tu peón de e5 se mueve en diagonal a la casilla que el peón negro saltó.','Lleva el peón de e5 a d6.'],bien:'¡Muy bien! exd6 a.p.'},
  hazlo:{fen:'k7/8/8/8/5Pp1/8/8/K7 b - f3 0 1',linea:['g4f3'],regla:true,di:'Con negras: el peón blanco acaba de jugar f2-f4. Captúralo al paso.',pistas:['Para las negras, el peón captura hacia abajo en diagonal.'],bien:'¡Correcto! gxf3 a.p.'},
  comprueba:{fen:'k7/3p4/8/8/4P3/8/8/K7 w - - 0 1',linea:['e4e5','d7d5','e5d6'],regla:true,
    di:'Avanza tu peón a **e5**. Si el peón negro avanza dos casillas y queda a tu lado, captúralo al paso **en ese mismo momento**.',pistas:['Primero, el peón de e4 a e5.','El peón negro saltó la casilla d6: captura en diagonal hacia d6.'],bien:'¡Exacto! Lo capturaste al paso a tiempo: una jugada después ya no se puede.'}
};

/* N1-007 · Tres formas de salir del jaque */
L['N1-007']={
  objetivo:'Vas a aprender las tres maneras de salir de un jaque.',
  idea:'Ante un jaque solo hay tres salidas: **mover el rey** a una casilla segura, **capturar** la pieza que da jaque o **interponer** una pieza en medio.',
  descubre:{fen:'4k3/8/8/8/8/4r3/8/4K3 w - - 0 1',marcas:[['e1','jaque']],di:'El rey blanco está en jaque por la torre. ¿Qué puedes hacer?'},
  observa:[
    {flechas:[['e3','e1','ataque'],['e1','d2','mov']],marcas:[['e1','jaque']],di:'1. **Mover el rey** a una casilla donde no lo ataquen, por ejemplo d2.',sencillo:'La primera salida: el rey se aparta a una casilla donde nadie lo ataque.'},
    {jugada:'e1d2',di:'El rey quedó a salvo en d2.',sencillo:'Listo, el rey ya no está en jaque.'},
    {fen:'4k3/8/8/8/8/4r3/3B4/4K3 w - - 0 1',flechas:[['d2','e3','ataque']],marcas:[['e1','jaque']],di:'2. **Capturar** la pieza que da jaque: el alfil de d2 puede comerse la torre.',sencillo:'La segunda salida: eliminar a quien da el jaque.'},
    {jugada:'d2e3',di:'Axe3: la torre desapareció y el jaque también.',sencillo:'Sin torre, no hay jaque.'},
    {fen:'4k3/8/8/8/4r3/8/8/3NK3 w - - 0 1',flechas:[['d1','e3','mov']],marcas:[['e1','jaque']],di:'3. **Interponer** una pieza entre el rey y el atacante: el caballo puede ponerse en e3.',sencillo:'La tercera salida: poner una pieza en medio, como un escudo.'},
    {jugada:'d1e3',di:'Ce3 tapa la línea de la torre. El jaque quedó bloqueado.',sencillo:'El caballo hace de escudo y el rey está protegido.'}
  ],
  comprende:{di:'Mover, capturar o interponer. Antes de elegir, pregúntate cuál de las tres conviene más: capturar suele ganar material.'},
  practica:{fen:'6k1/5ppp/8/8/8/5n2/3Q1PPP/6K1 w - - 0 1',linea:['g2f3'],di:'El caballo negro da jaque y además ataca a tu dama. ¿Cuál es la mejor salida?',
    pistas:['Si mueves el rey, el caballo se come tu dama.','Captura el caballo con un peón.'],bien:'¡Eso es! Capturar el caballo resuelve el jaque y salva la dama.'},
  hazlo:{fen:'6k1/5ppp/8/8/2B5/8/5PPP/r5K1 w - - 0 1',linea:['c4f1'],objetivoEquilibrio:true,di:'La torre negra da jaque. Tu rey no puede moverse y no puedes capturar la torre. Encuentra la salida.',
    pistas:['Busca una pieza que pueda ponerse entre la torre y tu rey.','El alfil puede llegar a f1.'],bien:'¡Correcto! Af1 interpone el alfil y bloquea el jaque.'},
  comprueba:{fen:'6k1/8/8/8/8/8/6PP/r5K1 w - - 0 1',linea:['g1f2'],regla:true,di:'Aquí no puedes capturar ni interponer. Sal del jaque.',
    pistas:['Busca una casilla vecina del rey que la torre no ataque.'],bien:'¡Bien! Rf2 era la única casilla segura.'}
};

/* N1-008 · Jaque mate y rey ahogado */
L['N1-008']={
  objetivo:'Vas a distinguir el jaque mate del rey ahogado.',
  idea:'**Mate**: el rey está en jaque y no tiene salida (gana quien da el mate). **Ahogado**: el rey NO está en jaque pero su bando no tiene ninguna jugada legal (tablas).',
  descubre:{fen:'7k/8/6K1/8/8/8/8/5Q2 w - - 0 1',di:'Las blancas tienen dama y rey contra rey. Con una sola jugada pueden ganar… o regalar unas tablas. ¿Cuál es la diferencia?'},
  observa:[
    {marcas:[['g8','escape'],['h7','escape'],['g7','escape']],di:'El rey negro está en la esquina. Sus casillas vecinas son g8, g7 y h7; el rey blanco ya vigila g7 y h7.',sencillo:'Fíjate en las casillas alrededor del rey negro: son su única forma de escapar.'},
    {jugada:'f1f8',marcas:[['h8','jaque'],['g8','bloqueada'],['g7','bloqueada'],['h7','bloqueada']],di:'Df8: el rey está en **jaque** y todas sus casillas están vigiladas. Es **jaque mate**: ganan las blancas.',sencillo:'El rey está atacado y no tiene adónde ir: eso es mate.'},
    {fen:'7k/8/6K1/8/8/8/8/5Q2 w - - 0 1',jugada:'f1f7',marcas:[['g8','bloqueada'],['g7','bloqueada'],['h7','bloqueada']],di:'En cambio, Df7: el rey **no** está en jaque, pero no tiene ninguna jugada legal. Es **ahogado**: la partida termina en tablas.',sencillo:'Aquí el rey no está atacado, pero no puede moverse. Eso no es mate: es tablas.'}
  ],
  comprende:{di:'Las dos situaciones se parecen: el rey no puede moverse. La diferencia es si está en jaque o no.'},
  practica:{fen:'7k/8/6K1/8/8/8/8/5Q2 w - - 0 1',linea:['f1f8'],meta:'mate',di:'Da jaque mate en una jugada (¡cuidado con el ahogado!).',
    pistas:['La dama debe dar jaque desde lejos, sin dejar escapar al rey.','Usa la fila 8.'],bien:'¡Mate! Y sin caer en el ahogado.'},
  hazlo:{fen:'7k/8/5K2/8/8/8/8/6Q1 w - - 0 1',linea:['g1g7'],meta:'mate',
    di:'Da jaque mate en una jugada, sin ahogar al rey negro.',pistas:['Tu rey puede proteger a la dama si la acercas al rey negro.','La dama a g7, protegida por el rey de f6.'],
    mal:{'g1g6':'¡Ahogado! Dg6 deja al rey negro sin jugadas pero sin jaque: tablas.'},bien:'¡Mate! El rey negro no puede capturar la dama porque tu rey la protege.'},
  comprueba:{fen:'7k/5K2/8/8/8/8/8/R7 w - - 0 1',linea:['a1h1'],meta:'mate',
    di:'Ahora con torre: da jaque mate en una jugada, sin ahogar al rey negro.',pistas:['Tu rey ya vigila g8 y g7. Falta dar jaque y cubrir h7.','Lleva la torre a la columna h.'],
    mal:{'a1a7':'¡Ahogado! Ta7 deja al rey negro sin jugadas pero sin jaque: tablas.'},bien:'¡Mate! Th1 da jaque por la columna h y tu rey vigila g8 y g7.'}
};

/* N1-009 · Tablas por ahogado y por material insuficiente */
L['N1-009']={
  objetivo:'Vas a reconocer cuándo una partida termina en tablas porque nadie puede dar mate.',
  idea:'Si no queda material suficiente para dar mate (**rey contra rey**, **rey y alfil contra rey** o **rey y caballo contra rey**), la partida es tablas. El **ahogado** también es tablas.',
  descubre:{fen:'8/8/4k3/8/8/2B5/4K3/8 w - - 0 1',di:'Las blancas tienen un alfil de más. ¿Pueden dar mate?'},
  observa:[
    {marcas:[['c3','clave']],di:'Con **rey y alfil contra rey** es imposible dar mate, juegue como juegue. La partida es **tablas por material insuficiente**.',sencillo:'Un solo alfil no alcanza para atrapar al rey. Por eso es tablas.'},
    {fen:'8/8/4k3/8/8/2N5/4K3/8 w - - 0 1',marcas:[['c3','clave']],di:'Lo mismo ocurre con **rey y caballo contra rey**.',sencillo:'Un solo caballo tampoco alcanza: tablas.'},
    {fen:'8/8/4k3/8/8/2R5/4K3/8 w - - 0 1',marcas:[['c3','clave']],di:'Con una **torre** sí se puede dar mate: esta partida no es tablas.',sencillo:'La torre sí puede ayudar al rey a dar mate.'},
    {fen:'7k/5Q2/6K1/8/8/8/8/8 b - - 0 1',marcas:[['g8','bloqueada'],['g7','bloqueada'],['h7','bloqueada']],di:'Y recuerda: el **ahogado** también es tablas, aunque un bando tenga mucho más material.',sencillo:'Si el rival no puede mover y no está en jaque, son tablas.'}
  ],
  comprende:{di:'Para dar mate hace falta material suficiente: al menos una torre, una dama, o varias piezas menores.'},
  practica:{fen:'8/8/8/8/8/1Pk2N2/8/5K2 b - - 0 1',linea:['c3b3'],regla:true,
    di:'Juegas con negras y solo te queda el rey. Captura el último peón blanco: con rey y caballo, las blancas ya no podrán darte mate.',pistas:['Tu rey puede capturar el peón de b3: nadie lo defiende.'],
    mal:{'*':'Si el peón sigue vivo puede coronar. Captúralo ahora.'},bien:'¡Tablas! Rey y caballo contra rey: material insuficiente para dar mate.'},
  comprueba:{fen:'8/8/8/8/Pk6/3B4/8/4K3 w - - 0 1',linea:['d3b5'],acepta:{0:['d3c2']},concepto:true,
    di:'Ahora juegas con blancas. Rey y alfil solos no pueden dar mate, y el rey negro ataca tu último peón: **protégelo**.',pistas:['Busca una casilla desde la que el alfil defienda el peón de a4.','El alfil puede ir a b5 o a c2.'],
    mal:{'*':'Así el rey negro se come el peón y quedan rey y alfil contra rey: tablas.'},bien:'¡Bien! El peón sigue vivo: con él, las blancas pueden coronar y ganar.'}
};

/* N1-010 · Triple repetición, cincuenta movimientos y acuerdo */
L['N1-010']={
  objetivo:'Vas a conocer las otras tres formas de terminar en tablas.',
  idea:'También es tablas si **la misma posición se repite tres veces**, si pasan **cincuenta jugadas** de cada bando sin capturas ni movimientos de peón, o si los jugadores **lo acuerdan**.',
  descubre:{fen:INICIAL,di:'¿Puede terminar en tablas una partida en la que todavía hay muchas piezas?'},
  observa:[
    {jugada:'g1f3',di:'Las blancas juegan Cf3…',sencillo:'Mira cómo los caballos van y vuelven.'},
    {jugada:'g8f6',di:'…las negras Cf6…',sencillo:'El caballo negro también sale.'},
    {jugada:'f3g1',di:'…y los dos caballos vuelven a casa.',sencillo:'El caballo blanco regresa.'},
    {jugada:'f6g8',marcas:[['g1','clave'],['g8','clave']],di:'Esta es la misma posición del inicio: **segunda vez** que aparece.',sencillo:'Todo quedó igual que al principio. Ya van dos veces.'},
    {jugada:'g1f3',di:'Si vuelven a ir y venir…',sencillo:'Otra vez sale el caballo…'},
    {jugada:'g8f6',di:'…',sencillo:'…y el negro también.'},
    {jugada:'f3g1',di:'…una y otra vez…',sencillo:'Regresa el blanco…'},
    {jugada:'f6g8',marcas:[['g1','clave'],['g8','clave']],di:'…la posición aparece por **tercera vez**: se pueden pedir tablas por **triple repetición**.',sencillo:'Tres veces la misma posición: son tablas.'}
  ],
  comprende:{di:'Triple repetición, regla de los cincuenta movimientos y acuerdo entre jugadores. Las tres terminan la partida en tablas.'},
  practica:{fen:'r4rk1/5p1p/8/8/8/8/q4PPP/2Q3K1 w - - 0 1',linea:['c1g5','g8h8','g5f6','h8g8','f6g5','g8h8','g5f6','h8g8','f6g5'],regla:true,
    di:'Las negras tienen mucho más material. Sálvate dando **jaque una y otra vez** hasta que la misma posición se repita tres veces.',pistas:['Empieza con Dg5+: el rey solo puede ir a h8.','Después, Df6+ obliga al rey a volver a g8. Repite.'],
    bien:'¡Tablas por triple repetición! La misma posición apareció tres veces.'}
};

/* N1-011 · Valor relativo de las piezas */
L['N1-011']={
  objetivo:'Vas a aprender cuánto vale cada pieza para decidir qué capturar.',
  idea:'Valores aproximados: **peón 1**, **caballo 3**, **alfil 3**, **torre 5**, **dama 9**. El rey no tiene precio: si lo pierdes, pierdes la partida.',
  descubre:{fen:'6k1/5ppp/2r5/4N3/8/8/5PPP/6K1 w - - 0 1',di:'Tu caballo puede capturar dos cosas distintas. ¿Cuál vale más?'},
  observa:[
    {flechas:[['e5','c6','ataque'],['e5','f7','ataque']],marcas:[['c6','indefensa'],['f7','defendida']],di:'El caballo ataca la **torre** de c6 (5 puntos) y el **peón** de f7 (1 punto).',sencillo:'Dos opciones: una torre o un peón.'},
    {flechas:[['g8','f7','defensa']],marcas:[['f7','defendida']],di:'Además, el peón de f7 está defendido por el rey: si capturas, el rey se come tu caballo.',sencillo:'Si comes el peón, el rey te come el caballo. Mal negocio.'},
    {jugada:'e5c6',marcas:[['c6','clave']],di:'Cxc6: ganaste una torre, que vale 5. Siempre compara lo que ganas con lo que puedes perder.',sencillo:'Te comiste la torre gratis: 5 puntos.'}
  ],
  comprende:{di:'Peón 1 · Caballo 3 · Alfil 3 · Torre 5 · Dama 9. Los valores te ayudan a decidir capturas y cambios.'},
  practica:{fen:'6k1/5ppp/2r5/4N3/8/8/5PPP/6K1 w - - 0 1',linea:['e5c6'],di:'Captura la pieza que más te conviene.',
    pistas:['Compara: una torre vale 5 y un peón vale 1.','Captura la torre.'],bien:'¡Correcto! Ganaste una torre.'},
  comprueba:{fen:'6k1/5ppp/8/8/2b5/3P4/Q4PPP/6K1 b - - 0 1',linea:['c4a2'],di:'Juegas con negras. Tu alfil puede capturar dos piezas. Elige bien.',
    pistas:['La dama vale 9 y el peón vale 1.','Captura la dama de a2.'],bien:'¡Muy bien! Ganaste la dama, la pieza más valiosa.'}
};

/* N1-012 · Piezas defendidas e indefensas */
L['N1-012']={
  objetivo:'Vas a reconocer qué piezas están protegidas y cuáles no.',
  idea:'Una pieza está **defendida** si otra pieza de su color puede recapturar en su casilla. Las piezas **indefensas** son las primeras candidatas a ser capturadas.',
  descubre:{fen:'r5k1/1pp2ppp/2n5/1B1b4/8/2N5/PPP2PPP/3R2K1 w - - 0 1',di:'Mira las piezas negras. ¿Cuáles tienen a alguien que las proteja?'},
  observa:[
    {flechas:[['b7','c6','defensa']],marcas:[['c6','defendida']],di:'El caballo de c6 está **defendido** por el peón de b7: si lo capturas, el peón recaptura.',sencillo:'El peón de b7 cuida al caballo: si alguien se lo come, el peón se venga.'},
    {marcas:[['d5','indefensa']],di:'El alfil de d5, en cambio, está **indefenso**: ninguna pieza negra lo protege.',sencillo:'Nadie cuida al alfil de d5. Está solo.'},
    {flechas:[['c3','d5','ataque'],['d1','d5','ataque']],marcas:[['d5','amenazada']],di:'Y encima está atacado por el caballo de c3 y la torre de d1. Una pieza atacada e indefensa se puede ganar.',sencillo:'Dos piezas blancas apuntan al alfil y nadie lo defiende: se puede capturar gratis.'}
  ],
  comprende:{di:'Antes de cada jugada, revisa: ¿qué piezas del rival están sin defender? ¿Y cuáles de las tuyas?'},
  practica:{tipo:'casilla',fen:'r5k1/1pp2ppp/2n5/1B1b4/8/2N5/PPP2PPP/3R2K1 w - - 0 1',verificar:'indefensas:b',casillas:['a8','b7','c7','d5'],
    di:'Toca **todas** las piezas negras que están indefensas (sin contar al rey).',pista:'Revisa una por una: ¿alguna pieza negra podría recapturar en esa casilla?',bien:'¡Muy bien! Encontraste todas las piezas negras sin defensa.'},
  hazlo:{tipo:'casilla',fen:'r5k1/1pp2ppp/2n5/1B1b4/8/2N5/PPP2PPP/3R2K1 w - - 0 1',verificar:'indefensas:w',casillas:['b2','c2'],
    di:'Ahora revisa tus propias piezas: toca las piezas **blancas** indefensas.',pista:'No olvides los peones. El caballo de c3 protege a2, b5 y d1; el rey protege f2, g2 y h2.',bien:'¡Correcto! Los peones de b2 y c2 no tienen protección: un rival atento podría ganarlos.'},
  comprueba:{fen:'r5k1/1pp2ppp/2n5/1B1b4/8/2N5/PPP2PPP/3R2K1 w - - 0 1',linea:['d1d5'],acepta:{0:['c3d5']},di:'Gana material capturando la pieza indefensa.',
    pistas:['Busca la pieza negra atacada que nadie defiende.','El alfil de d5.'],bien:'¡Bien! El alfil estaba indefenso y lo capturaste gratis.'}
};

/* N1-013 · Capturar piezas indefensas (piezas colgadas) */
L['N1-013']={
  tactica:true, motivo:'Pieza colgada (indefensa)',
  objetivo:'Vas a aprender a ganar material capturando piezas que nadie defiende.',
  idea:'Una pieza **colgada** está atacada y nadie la defiende: se puede capturar gratis. Búscalas en cada jugada, tuyas y del rival.',
  descubre:{fen:'6k1/pp3pp1/7p/4n3/8/2B5/PP3PPP/6K1 w - - 0 1',di:'¿Hay alguna pieza negra que puedas capturar sin perder nada?'},
  observa:[
    {flechas:[['c3','e5','ataque']],marcas:[['e5','indefensa']],di:'El caballo de e5 está atacado por tu alfil y **nadie lo defiende**: está «colgado».',sencillo:'El alfil apunta al caballo y ninguna pieza negra puede vengarlo.'},
    {jugada:'c3e5',marcas:[['e5','clave']],di:'Axe5: lo capturas y nadie puede recapturar. Ganaste 3 puntos.',sencillo:'¡Caballo gratis! Nadie puede comerse tu alfil.'}
  ],
  comprende:{di:'Pieza atacada + sin defensa = pieza colgada. Antes de mover, revisa si el rival dejó alguna.'},
  practica:{fen:'6k1/pp3pp1/7p/4n3/8/2B5/PP3PPP/6K1 w - - 0 1',linea:['c3e5'],di:'Gana la pieza colgada.',pistas:['¿Qué pieza negra está atacada y sin defensa?','Tu alfil puede capturarla.'],bien:'¡Bien! Caballo ganado.'},
  hazlo:{fen:'6k1/pp3pp1/2b4p/8/4N3/8/PP3PPP/6K1 b - - 0 1',linea:['c6e4'],di:'Juegas con negras. Hay una pieza blanca colgada: captúrala.',pistas:['Mira la diagonal de tu alfil.'],bien:'¡Correcto! El caballo de e4 no tenía defensa.'},
  comprueba:{fen:'r5k1/pp4p1/5p1p/2b1n3/8/2Q5/PP3PPP/6K1 w - - 0 1',linea:['c3c5'],di:'Tu dama ataca dos piezas negras, pero solo una está colgada. Captúrala.',pistas:['El caballo de e5 está defendido por el peón de f6.','El alfil de c5 no tiene defensa.'],bien:'¡Muy bien! El caballo estaba defendido; el alfil, no.'}
};

/* N1-014 · Cambios favorables, iguales y desfavorables */
L['N1-014']={
  objetivo:'Vas a calcular si un cambio de piezas te conviene.',
  idea:'En un cambio, suma lo que ganas y resta lo que pierdes. **Favorable**: ganas más de lo que entregas. **Igual**: lo mismo. **Desfavorable**: entregas más.',
  descubre:{fen:'6k1/5pp1/1p5p/2r5/8/4B3/5PPP/2N3K1 w - - 0 1',di:'Tu alfil puede capturar la torre negra, aunque la defiende un peón. ¿Te conviene?'},
  observa:[
    {flechas:[['e3','c5','ataque'],['b6','c5','defensa']],marcas:[['c5','defendida']],di:'El alfil (3) ataca la torre (5), que está defendida por el peón de b6.',sencillo:'Tu alfil vale 3 y la torre vale 5. El peón negro la cuida.'},
    {jugada:'e3c5',di:'Axc5: ganas 5 puntos…',sencillo:'Te comes la torre: +5.'},
    {jugada:'b6c5',di:'…el peón recaptura y pierdes 3. Balance: 5 − 3 = **+2 a tu favor**. Es un **cambio favorable**.',sencillo:'Te comen el alfil: −3. En total ganaste 2. ¡Buen negocio!'}
  ],
  comprende:{di:'Compara siempre valores: entregar un alfil (3) por una torre (5) es buen negocio; entregar la dama (9) por un caballo (3) es un mal negocio.'},
  practica:{fen:'6k1/5pp1/1p5p/2r5/8/4B3/5PPP/2N3K1 w - - 0 1',linea:['e3c5'],di:'Haz el cambio favorable.',pistas:['Tu alfil vale menos que la torre.'],bien:'¡Bien! Entregas 3 y ganas 5.'},
  comprueba:{fen:'6k1/5ppp/8/2b5/8/4R3/3P1PPP/6K1 b - - 0 1',linea:['c5e3'],objetivoEquilibrio:true,di:'Juegas con negras. Busca un cambio favorable.',pistas:['Tu alfil ataca una pieza que vale más que él.'],bien:'¡Correcto! Alfil (3) por torre (5).'}
};

/* N1-015 · Reconocer las amenazas del rival */
L['N1-015']={
  objetivo:'Vas a adquirir el hábito más importante: ver qué amenaza tu rival.',
  idea:'Antes de cada jugada pregúntate: **¿qué amenaza la última jugada de mi rival?** Muchas partidas se pierden por no hacerse esa pregunta.',
  descubre:{fen:'6k1/5ppp/3b4/8/7q/8/P4PPP/2Q2RK1 w - - 0 1',di:'Te toca. Antes de mover, mira la posición de las piezas negras. ¿Qué te amenazan?'},
  observa:[
    {flechas:[['h4','h2','amenaza'],['d6','h2','amenaza']],marcas:[['h2','amenazada']],di:'La dama de h4 y el alfil de d6 apuntan a **h2**. Ese peón solo lo defiende tu rey.',sencillo:'Dos piezas negras apuntan a la misma casilla, al lado de tu rey: h2.'},
    {jugada:'a2a3',di:'Si no ves la amenaza y juegas cualquier cosa, como a3…',sencillo:'Imagina que no te das cuenta y mueves un peón cualquiera…'},
    {jugada:'h4h2',marcas:[['g1','jaque']],di:'…llega **Dxh2#**: jaque mate. La dama está protegida por el alfil y tu rey no tiene salida.',sencillo:'…¡y te dan mate! El rey no puede comerse la dama porque el alfil la protege.'},
    {fen:'6k1/5ppp/3b4/8/7q/8/P4PPP/2Q2RK1 w - - 0 1',flechas:[['g2','g3','mov']],di:'Con la amenaza a la vista hay defensas: **g3** corta la diagonal del alfil y además ataca a la dama.',sencillo:'Si ves la amenaza a tiempo, la paras: g3 tapa el camino del alfil.'}
  ],
  comprende:{di:'El rival también tiene planes. Mira su última jugada: ¿qué ataca ahora?, ¿qué jaques o capturas tiene?'},
  practica:{tipo:'casilla',fen:'6k1/5ppp/8/1b6/4n3/2N5/1R3PPP/3Q2K1 w - - 0 1',verificar:'atacadas:w',casillas:['c3','f2'],
    di:'Toca **todas** tus piezas que están atacadas por las negras.',pista:'Revisa qué casillas atacan el caballo de e4 y el alfil de b5.',bien:'¡Bien! El caballo de e4 ataca tu caballo de c3 y tu peón de f2.'},
  hazlo:{tipo:'casilla',fen:'6k1/5ppp/8/8/3n4/8/5PPP/R3K1R1 w - - 0 1',casillas:['c2'],
    di:'Mira el caballo negro de d4. Toca la casilla a la que quiere saltar para atacar **a la vez** tu rey y tu torre.',pista:'Busca un salto del caballo que dé jaque al rey de e1 y ataque la torre de a1.',bien:'¡Bien visto! Desde c2 el caballo daría jaque y atacaría la torre de a1: un tenedor.'},
  comprueba:{fen:'6k1/5ppp/3b4/8/7q/8/P4PPP/2Q2RK1 w - - 0 1',linea:['g2g3'],acepta:{0:['h2h3','c1c8','f2f4']},di:'Las negras amenazan mate. Detén la amenaza.',
    pistas:['La amenaza es Dxh2#.','Corta la diagonal del alfil o protege h2.'],bien:'¡Bien defendido! Viste la amenaza a tiempo.'}
};

/* N1-016 · Responder a una amenaza */
L['N1-016']={
  objetivo:'Vas a aprender qué hacer cuando atacan una de tus piezas.',
  idea:'Si atacan una pieza tuya puedes: **huir** a una casilla segura, **capturar al atacante**, **defenderla** o **interponer** otra pieza. Elige la que mejor te deje.',
  descubre:{fen:'6k1/5ppp/8/8/3p4/2N5/5PPP/6K1 w - - 0 1',di:'El peón negro ataca a tu caballo. ¿Qué haces?'},
  observa:[
    {flechas:[['d4','c3','amenaza']],marcas:[['c3','amenazada']],di:'1) **Huir**: mover la pieza atacada a una casilla segura.',sencillo:'Si te atacan una pieza, lo más simple es apartarla.'},
    {jugada:'c3e4',di:'Ce4: el caballo quedó a salvo.',sencillo:'El caballo saltó a e4 y ya nadie lo ataca.'},
    {fen:'r5k1/5ppp/8/8/1b6/P4N2/5PPP/4R1K1 w - - 0 1',flechas:[['b4','e1','amenaza'],['a3','b4','ataque']],marcas:[['e1','amenazada']],di:'2) **Capturar al atacante**: aquí el peón de a3 puede comerse al alfil que ataca tu torre.',sencillo:'Otra idea: eliminar a quien te ataca.'},
    {jugada:'a3b4',di:'axb4: se acabó la amenaza y ganaste un alfil.',sencillo:'¡Y encima ganaste una pieza!'},
    {fen:'4r1k1/5ppp/8/8/8/8/3B1PPP/4R1K1 w - - 0 1',flechas:[['e8','e1','amenaza'],['d2','e3','mov']],marcas:[['e1','amenazada']],di:'3) **Defenderla** o 4) **interponer** una pieza: aquí el alfil se coloca en e3 y tapa la línea de la torre.',sencillo:'También puedes tapar el camino del atacante o proteger tu pieza.'}
  ],
  comprende:{di:'Huir, capturar al atacante, defender o interponer. Si puedes capturar al atacante ganando material, suele ser lo mejor.'},
  practica:{fen:'6k1/5ppp/8/8/3p4/2N5/5PPP/6K1 w - - 0 1',linea:['c3e4'],acepta:{0:['c3d5','c3b5','c3a4','c3a2','c3b1','c3d1','c3e2']},di:'Pon a salvo el caballo.',
    pistas:['El peón ataca c3. Busca una casilla que ninguna pieza negra ataque.'],bien:'¡Bien! El caballo está a salvo.'},
  hazlo:{fen:'r5k1/5ppp/8/8/1b6/P4N2/5PPP/4R1K1 w - - 0 1',linea:['a3b4'],di:'El alfil negro ataca tu torre. Encuentra la mejor respuesta.',
    pistas:['¿Puedes capturar al atacante?','Tu peón de a3 puede capturar en b4.'],bien:'¡Muy bien! Capturar al atacante era lo mejor: ganas un alfil.'},
  comprueba:{fen:'6k1/ppp2ppp/2n1p3/3P4/8/8/PPP2PPP/6K1 b - - 0 1',linea:['e6d5'],concepto:true,
    di:'Juegas con negras. El peón blanco de d5 ataca tu caballo. Elimina la amenaza **ganando material**.',pistas:['¿Puede alguna pieza tuya capturar al peón que ataca?','El peón de e6 captura en d5.'],
    mal:{'*':'Así salvas el caballo, pero hay algo mejor: capturar al atacante.'},bien:'¡Exacto! …exd5: se acabó la amenaza y ganaste un peón.'}
};

/* N1-017 · Conteo de atacantes y defensores */
L['N1-017']={
  tactica:true, motivo:'Más atacantes que defensores',
  objetivo:'Vas a aprender a contar atacantes y defensores antes de capturar.',
  idea:'Si una pieza tiene **más atacantes que defensores**, normalmente puedes ganarla. Si tiene igual número, capturar no gana nada (salvo que el cambio sea favorable).',
  descubre:{fen:'6k1/5ppp/3b4/4n3/8/2B2N2/5PPP/6K1 w - - 0 1',di:'El caballo de e5 está atacado y defendido. ¿Puedes ganarlo? Cuenta antes de decidir.'},
  observa:[
    {flechas:[['f3','e5','ataque'],['c3','e5','ataque'],['d6','e5','defensa']],marcas:[['e5','amenazada']],di:'Cuenta: **2 atacantes** (tu caballo y tu alfil) contra **1 defensor** (el alfil negro).',sencillo:'Dos piezas tuyas atacan; una sola pieza negra defiende.'},
    {jugada:'f3e5',di:'Cxe5: capturas primero…',sencillo:'Primero te comes el caballo…'},
    {jugada:'d6e5',di:'…el alfil negro recaptura…',sencillo:'…el alfil negro se come tu caballo…'},
    {jugada:'c3e5',marcas:[['e5','clave']],di:'…y tu alfil vuelve a capturar. Ganaste una pieza: con más atacantes que defensores, la captura funciona.',sencillo:'…y tu alfil se come al alfil. Al final tienes una pieza más.'}
  ],
  comprende:{di:'Cuenta atacantes y defensores. Más atacantes: ganas. Igual número: no ganas nada. Menos: pierdes.'},
  practica:{fen:'6k1/5ppp/3b4/4n3/8/2B2N2/5PPP/6K1 w - - 0 1',linea:['f3e5'],acepta:{0:['c3e5']},di:'Gana el caballo de e5.',pistas:['Tienes dos atacantes y él tiene un defensor.'],bien:'¡Bien! Si el alfil recaptura, tu otra pieza vuelve a capturar y ganas una pieza.'},
  comprueba:{fen:'6k1/2bn1ppp/8/4N3/3B4/8/5PPP/6K1 b - - 0 1',linea:['c7e5'],acepta:{0:['d7e5']},di:'Juegas con negras. Cuenta y gana el caballo de e5.',pistas:['Tienes dos atacantes; las blancas, un defensor.'],bien:'¡Muy bien! Dos atacantes contra un defensor: la pieza es tuya.'}
};

/* N1-018 · Capturar primero con la pieza de menor valor */
L['N1-018']={
  tactica:true, motivo:'Capturar con la pieza de menor valor',
  objetivo:'Vas a aprender con qué pieza conviene capturar.',
  idea:'Si puedes capturar una pieza defendida con varias piezas, **captura con la de menor valor**: si te la recapturan, pierdes menos.',
  descubre:{fen:'1q4k1/5ppp/4p3/3n4/2P5/8/3Q1PPP/2B3K1 w - - 0 1',di:'Dos piezas tuyas atacan al caballo de d5. ¿Con cuál lo capturarías?'},
  observa:[
    {flechas:[['c4','d5','ataque'],['d2','d5','ataque'],['e6','d5','defensa']],marcas:[['d5','defendida']],di:'Tu peón y tu dama atacan el caballo; el peón de e6 lo defiende.',sencillo:'Puedes comer con el peón o con la dama. Pero el caballo está defendido.'},
    {flechas:[['d2','d5','mov'],['e6','d5','defensa']],di:'Si capturas con la dama, el peón de e6 la recaptura: cambiarías 9 por 3.',sencillo:'Con la dama sería un desastre: te la comen.'},
    {jugada:'c4d5',di:'Con el peón, **cxd5**: si te recapturan, solo entregaste un peón (1) por un caballo (3).',sencillo:'Con el peón sí: ganas un caballo y como mucho pierdes un peón.'},
    {jugada:'e6d5',flechas:[['d2','d5','ataque']],di:'Tras exd5, ganaste 2 puntos… y tu dama todavía ataca el peón de d5.',sencillo:'Hiciste buen negocio: caballo por peón.'}
  ],
  comprende:{di:'La pieza más barata captura primero. Así, si hay recaptura, pierdes lo menos posible.'},
  practica:{fen:'1q4k1/5ppp/4p3/3n4/2P5/8/3Q1PPP/2B3K1 w - - 0 1',linea:['c4d5'],di:'Captura el caballo con la pieza correcta.',pistas:['¿Cuál de tus atacantes vale menos?'],bien:'¡Bien! Capturaste con el peón.'},
  hazlo:{fen:'6k1/4qppp/2b5/3p4/4N3/5P2/3Q1P1P/6K1 b - - 0 1',linea:['d5e4'],di:'Juegas con negras. El caballo de e4 está defendido. Captúralo bien.',pistas:['Tu peón y tu dama atacan e4. ¿Cuál vale menos?'],bien:'¡Correcto! dxe4: si recapturan, solo pierdes un peón.'},
  comprueba:{fen:'6k1/6pp/b4p2/4r3/2N5/8/5PPP/4R1K1 w - - 0 1',linea:['c4e5'],di:'La torre de e5 está defendida por el peón de f6. Gana material.',pistas:['Captura con tu pieza de menor valor.','El caballo vale 3; tu torre, 5.'],bien:'¡Muy bien! Caballo (3) por torre (5), y además tu caballo ya no estaba seguro en c4.'}
};

/* N1-019 · Antes de jugar: qué deja sin defensa mi jugada */
L['N1-019']={
  objetivo:'Vas a aprender a revisar qué protegía la pieza que vas a mover.',
  idea:'Cuando una pieza se mueve, **deja de defender** lo que defendía. Antes de jugar, revisa si alguna pieza tuya quedará indefensa.',
  descubre:{fen:'3r2k1/5ppp/8/8/3B4/5N2/5PPP/6K1 w - - 0 1',di:'Te dan ganas de atacar con el caballo. Antes, mira qué está defendiendo.'},
  observa:[
    {flechas:[['d8','d4','amenaza'],['f3','d4','defensa']],marcas:[['d4','defendida']],di:'Tu alfil está atacado por la torre, pero lo defiende el caballo de f3.',sencillo:'El caballo cuida al alfil.'},
    {flechas:[['f3','g5','mov']],di:'Imagina que juegas **Cg5** para atacar f7 y h7…',sencillo:'Supón que mueves el caballo para atacar…'},
    {jugada:'f3g5',marcas:[['d4','indefensa']],di:'…el caballo ya no defiende al alfil: ahora está **indefenso**.',sencillo:'…ahora nadie cuida al alfil.'},
    {jugada:'d8d4',di:'Txd4: perdiste el alfil. El caballo tenía una tarea y la abandonó.',sencillo:'La torre se lo comió. Por eso hay que mirar antes de mover.'}
  ],
  comprende:{di:'Antes de mover una pieza, pregúntate: ¿qué estaba protegiendo?, ¿quedará algo colgado?'},
  practica:{tipo:'casilla',fen:'3r2k1/5ppp/8/8/3B4/5N2/5PPP/6K1 w - - 0 1',casillas:['d4'],di:'Si el caballo de f3 se mueve, ¿qué pieza tuya queda indefensa y atacada? Tócala.',pista:'Mira qué está atacando la torre negra.',bien:'¡Bien! El alfil de d4 depende del caballo.'},
  comprueba:{fen:'6k1/5ppp/8/3b4/7n/2N5/1B3PPP/6K1 w - - 0 1',linea:['c3d5'],di:'El caballo negro acaba de irse a h4. ¿Dejó algo sin defensa?',pistas:['Antes el caballo estaba en f6. ¿Qué pieza protegía?','El alfil de d5 quedó solo.'],bien:'¡Muy bien! Aprovechaste el error del rival.'}
};

/* N1-020 · Buscar jaques, capturas y amenazas */
L['N1-020']={
  tactica:true, motivo:'Jugada forzante: jaque que gana material',
  objetivo:'Vas a aprender el método para encontrar las mejores jugadas.',
  idea:'En cada jugada revisa primero tus **jugadas forzantes**: **jaques**, **capturas** y **amenazas**. Ahí se esconden las tácticas.',
  descubre:{fen:'r5k1/6pp/8/8/8/2b5/5PPP/3Q2K1 w - - 0 1',di:'Haz la lista de tus jugadas forzantes: jaques, capturas y amenazas. ¿Alguna gana algo?'},
  observa:[
    {flechas:[['d1','d5','mov'],['d1','b3','mov']],di:'Primero los **jaques**: Dd5+ y Db3+ dan jaque al rey de g8.',sencillo:'Empieza siempre por los jaques: aquí tienes dos.'},
    {jugada:'d1d5',flechas:[['d5','g8','ataque'],['d5','a8','ataque']],marcas:[['g8','jaque'],['a8','amenazada']],di:'**Dd5+** da jaque y además **ataca la torre de a8**.',sencillo:'Este jaque ataca dos cosas: el rey y la torre.'},
    {jugada:'g8f8',di:'Las negras tienen que salir del jaque…',sencillo:'El rival solo puede salvar al rey…'},
    {jugada:'d5a8',marcas:[['f8','jaque']],di:'…y la torre cae con un nuevo jaque. Una jugada forzante te dio la victoria material.',sencillo:'…y te comes la torre. ¡Por eso se miran primero los jaques!'}
  ],
  comprende:{di:'Jaques, capturas, amenazas: en ese orden, porque cuanto más obliga una jugada, menos opciones le deja al rival.'},
  practica:{tipo:'casilla',fen:'6k1/5ppp/8/3N4/8/8/1B3PPP/2R3K1 w - - 0 1',verificar:'pueden-jaque:w',casillas:['c1','d5'],di:'Toca todas tus piezas que pueden dar **jaque** ahora.',pista:'Revisa cada pieza: ¿alguna de sus jugadas ataca al rey de g8?',bien:'¡Bien! La torre puede dar jaque en c8 y el caballo en e7 o f6. El alfil no: el peón de g7 le tapa el camino.'},
  hazlo:{tipo:'casilla',fen:'r5k1/5ppp/3p4/1n6/2B5/2N5/5PPP/6K1 w - - 0 1',verificar:'pueden-capturar:w',casillas:['c3','c4'],di:'Ahora las **capturas**: toca tus piezas que pueden capturar algo.',pista:'Mira cada pieza blanca y lo que tiene a su alcance.',bien:'¡Correcto! El caballo y el alfil pueden capturar en b5, y el alfil también en f7.'},
  comprueba:{fen:'r5k1/6pp/8/8/8/2b5/5PPP/3Q2K1 w - - 0 1',linea:['d1d5'],acepta:{0:['d1b3']},di:'Encuentra la jugada forzante que gana material.',pistas:['Empieza por los jaques.','Busca un jaque que ataque también otra pieza.'],bien:'¡Excelente! Un jaque que ataca otra pieza: el rival no puede salvar las dos cosas.'}
};

/* N1-021 · Mate en una jugada con la dama */
L['N1-021']={
  tactica:true, motivo:'Mate en una con la dama',
  objetivo:'Vas a dar jaque mate con la dama en una sola jugada.',
  idea:'Para dar mate, la dama debe **dar jaque** y, al mismo tiempo, **todas las casillas de escape** del rey deben estar vigiladas u ocupadas.',
  descubre:{fen:'4k3/8/4K3/8/8/8/8/7Q w - - 0 1',di:'El rey negro está en el borde, frente a tu rey. ¿Puedes darle mate con la dama?'},
  observa:[
    {marcas:[['d8','escape'],['f8','escape'],['d7','bloqueada'],['f7','bloqueada']],di:'Mira las casillas del rey negro: d7 y f7 las vigila tu rey. Solo le quedan **d8 y f8**.',sencillo:'Tu rey ya le quita al rey negro las casillas de delante.'},
    {flechas:[['h1','h8','mov']],di:'La dama puede llegar a la fila 8 y vigilarla entera.',sencillo:'Si la dama ocupa la última fila, controla todas sus casillas.'},
    {jugada:'h1h8',marcas:[['e8','jaque'],['d8','bloqueada'],['f8','bloqueada'],['d7','bloqueada'],['f7','bloqueada']],di:'**Dh8#**: jaque, y ni d8 ni f8 son seguras. ¡Jaque mate!',sencillo:'El rey está atacado y todas sus salidas están cerradas: mate.'}
  ],
  comprende:{di:'Busca primero los jaques de la dama. Para cada uno, revisa las casillas de escape: si todas están cubiertas, es mate.'},
  practica:{fen:'4k3/8/4K3/8/8/8/8/7Q w - - 0 1',linea:['h1h8'],meta:'mate',di:'Da jaque mate en una.',pistas:['Lleva la dama a la fila 8.'],bien:'¡Mate! Tu rey y tu dama trabajaron juntos.'},
  hazlo:{fen:'6k1/5p1p/6pB/8/8/8/5PPP/3Q2K1 w - - 0 1',linea:['d1d8'],meta:'mate',di:'Da jaque mate en una. Mira bien tu alfil.',pistas:['El alfil de h6 vigila f8 y g7.','Da jaque en la fila 8.'],bien:'¡Excelente! La dama da jaque y el alfil cierra las salidas.'},
  comprueba:{fen:'3q2k1/1b6/8/8/8/6p1/5P1P/6K1 b - - 0 1',linea:['d8d1'],meta:'mate',di:'Juegas con negras. Mate en una.',pistas:['Tu alfil de b7 vigila g2.','La primera fila blanca está vacía.'],bien:'¡Mate! La dama da jaque en d1 y el alfil le quita g2.'}
};

/* N1-022 · Mate en una jugada con la torre */
L['N1-022']={
  tactica:true, motivo:'Mate en una con la torre',
  objetivo:'Vas a dar jaque mate con la torre en una sola jugada.',
  idea:'La torre da mate en el borde del tablero cuando **tu rey le quita al rey rival las casillas de la fila siguiente**.',
  descubre:{fen:'k7/2K5/8/8/8/8/8/1R6 w - - 0 1',di:'El rey negro está en la esquina. ¿Qué casilla elegiría tu torre para darle mate?'},
  observa:[
    {marcas:[['a7','escape'],['b8','bloqueada'],['b7','bloqueada']],di:'Tu rey de c7 vigila b8 y b7. El rey negro solo tendría **a7**.',sencillo:'Tu rey ya bloquea casi todo. Falta cerrar una casilla.'},
    {jugada:'b1a1',marcas:[['a8','jaque'],['a7','bloqueada'],['b8','bloqueada'],['b7','bloqueada']],di:'**Ta1#**: la torre da jaque por la columna a y cubre a7. ¡Mate!',sencillo:'La torre ataca por toda la columna: el rey no tiene adónde ir.'}
  ],
  comprende:{di:'Rey contra rey en «oposición» (frente a frente o casi) y la torre da jaque por el borde: es el patrón de mate más útil de los finales.'},
  practica:{fen:'k7/2K5/8/8/8/8/8/1R6 w - - 0 1',linea:['b1a1'],meta:'mate',di:'Da jaque mate en una.',pistas:['Da jaque por la columna a.'],bien:'¡Mate!'},
  hazlo:{fen:'4k3/8/4K3/8/8/8/8/7R w - - 0 1',linea:['h1h8'],meta:'mate',di:'Da jaque mate en una.',pistas:['Tu rey frente al rey negro le quita la fila 7.'],bien:'¡Mate en la última fila!'},
  comprueba:{fen:'8/8/8/8/8/1k6/7r/K7 b - - 0 1',linea:['h2h1'],meta:'mate',di:'Juegas con negras. Mate en una.',pistas:['Tu rey vigila a2, b2 y casi toda la segunda fila.'],bien:'¡Correcto! Th1#.'}
};

/* N1-023 · Mate del pasillo */
L['N1-023']={
  tactica:true, motivo:'Mate del pasillo',
  objetivo:'Vas a aprovechar el error más común de los principiantes: el rey encerrado por sus peones.',
  idea:'Si el rey está en la última fila **encerrado por sus propios peones**, una torre o dama que llegue a esa fila da **mate del pasillo**.',
  descubre:{fen:'6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',di:'El rey negro está protegido por tres peones… ¿o encerrado por ellos?'},
  observa:[
    {marcas:[['f7','clave'],['g7','clave'],['h7','clave']],di:'Los peones de f7, g7 y h7 tapan la salida del rey. Parecen un escudo, pero son una **jaula**.',sencillo:'El rey no puede subir: sus propios peones le cierran el paso.'},
    {flechas:[['d1','d8','mov']],di:'La columna d está abierta hasta la fila 8.',sencillo:'Tu torre tiene el camino libre hasta el fondo.'},
    {jugada:'d1d8',marcas:[['g8','jaque'],['f8','bloqueada'],['h8','bloqueada']],di:'**Td8#**: jaque por la fila 8 y el rey no puede escapar. Mate del pasillo.',sencillo:'La torre ataca toda la fila y el rey está atrapado. ¡Mate!'}
  ],
  comprende:{di:'Para evitarlo, abre una «ventana» a tu rey moviendo un peón (por ejemplo h3 o h6) cuando la posición lo permita.'},
  practica:{fen:'3r2k1/8/8/8/8/8/5PPP/6K1 b - - 0 1',linea:['d8d1'],meta:'mate',di:'Juegas con negras. Da el mate del pasillo.',pistas:['El rey blanco está encerrado por sus peones.'],bien:'¡Mate del pasillo!'},
  hazlo:{fen:'6k1/5ppp/8/8/8/8/r4PPP/3R2K1 b - - 0 1',linea:['h7h6'],acepta:{0:['g7g6','h7h5','g7g5','f7f6','f7f5']},concepto:true,
    objetivoEquilibrio:true,di:'Juegas con negras. La torre blanca amenaza **Td8#**, el mate del pasillo. Abre una «ventana» a tu rey moviendo un peón.',pistas:['Si uno de los peones que encierran al rey avanza, el rey tendrá por dónde escapar.','Por ejemplo, …h6.'],
    mal:{'*':'Aquí practica abrir una ventana: mueve uno de los peones que encierran a tu rey.'},bien:'¡Bien! Tu rey ya tiene una salida y Td8+ no sería mate.'},
  comprueba:{fen:'2rr2k1/5ppp/8/8/8/8/3R1PPP/3R2K1 w - - 0 1',linea:['d2d8','c8d8','d1d8'],meta:'mate',di:'Mate en dos jugadas. Usa tus dos torres.',pistas:['Captura en d8 con jaque.','Si recapturan, la otra torre llega a d8.'],bien:'¡Excelente! Dos torres en la misma columna: una se sacrifica y la otra da mate.'}
};

/* N1-024 · Mate con la dama apoyada junto al rey */
L['N1-024']={
  tactica:true, motivo:'Mate con la dama apoyada',
  objetivo:'Vas a dar mate con la dama pegada al rey, protegida por otra pieza.',
  idea:'La dama junto al rey rival da mate si **otra pieza la protege** (para que el rey no la capture) y el rey no tiene otras salidas.',
  descubre:{fen:'5rk1/5pp1/8/7Q/8/3B4/5PPP/6K1 w - - 0 1',di:'Tu dama y tu alfil apuntan a la misma casilla. ¿Cuál?'},
  observa:[
    {flechas:[['h5','h7','mov'],['d3','h7','linea']],marcas:[['h7','clave']],di:'La dama puede llegar a **h7** y el alfil de d3 vigila esa casilla.',sencillo:'Dos piezas tuyas apuntan a h7, al lado del rey.'},
    {jugada:'h5h7',flechas:[['d3','h7','defensa']],marcas:[['g8','jaque'],['h7','defendida']],di:'**Dh7#**: el rey no puede comerse la dama porque el alfil la protege, y f8, f7 y g7 están ocupadas por sus piezas.',sencillo:'El rey querría comerse la dama, pero el alfil la cuida. ¡Mate!'}
  ],
  comprende:{di:'Dama pegada al rey + una pieza que la protege + casillas de escape cerradas = mate. Peones, alfiles, caballos y el propio rey pueden ser el apoyo.'},
  practica:{fen:'5rk1/5pp1/8/7Q/8/3B4/5PPP/6K1 w - - 0 1',linea:['h5h7'],meta:'mate',di:'Da jaque mate en una.',pistas:['La dama a h7, protegida por el alfil.'],bien:'¡Mate!'},
  hazlo:{fen:'6k1/5ppp/3b4/8/7q/8/5PP1/5RK1 b - - 0 1',linea:['h4h2'],meta:'mate',di:'Juegas con negras. Mate en una.',pistas:['Tu alfil apunta a h2.'],bien:'¡Correcto! Dh2#: el alfil protege a la dama.'},
  comprueba:{fen:'5rk1/5pp1/8/6NQ/8/8/5PPP/6K1 w - - 0 1',linea:['h5h7'],meta:'mate',di:'Mate en una. Esta vez el apoyo no es un alfil.',pistas:['¿Qué casilla junto al rey protege tu caballo?'],bien:'¡Mate! El caballo de g5 protege h7.'}
};

/* N1-025 · El mate del loco y el mate del pastor */
L['N1-025']={
  tactica:true, motivo:'Mate del pastor',
  objetivo:'Vas a conocer los mates más rápidos para no caer en ellos.',
  idea:'**Mate del loco** (2 jugadas): f3 y g4 abren la diagonal del rey. **Mate del pastor** (4 jugadas): dama y alfil atacan f7. Defiéndete desarrollando y protegiendo f7.',
  descubre:{fen:INICIAL,di:'¿Puede terminar una partida en solo dos jugadas? Míralo antes de que te pase.'},
  observa:[
    {jugada:'f2f3',di:'1.f3…: un peón que no ayuda al desarrollo y abre la diagonal del rey.',sencillo:'Las blancas mueven un peón que destapa a su rey.'},
    {jugada:'e7e5',di:'1…e5 abre la salida de la dama negra.',sencillo:'Las negras abren camino para su dama.'},
    {jugada:'g2g4',flechas:[['d8','h4','mov']],di:'2.g4?? y la diagonal h4–e1 queda abierta…',sencillo:'Otro peón más… ¡y el rey queda totalmente descubierto!'},
    {jugada:'d8h4',marcas:[['e1','jaque']],di:'2…Dh4#: **mate del loco**. El rey no puede escapar ni tapar la diagonal.',sencillo:'¡Mate en dos jugadas! Por eso no se juega f3 y g4 al empezar.'},
    {fen:'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',flechas:[['h5','f7','ataque'],['c4','f7','ataque']],marcas:[['f7','amenazada']],di:'El **mate del pastor**: tras 1.e4 e5 2.Ac4 Cc6 3.Dh5 Cf6??, la dama y el alfil atacan f7, que solo defiende el rey.',sencillo:'La dama y el alfil apuntan juntos a f7, el punto débil.'},
    {jugada:'h5f7',marcas:[['e8','jaque']],di:'4.Dxf7#: el rey no puede capturar la dama porque el alfil la protege.',sencillo:'Mate del pastor. La dama está protegida por el alfil.'}
  ],
  comprende:{di:'Contra Dh5 y Ac4, defiende f7 a tiempo: …g6, …De7 o …Df6. Y no abras la diagonal de tu rey con f3 y g4.'},
  practica:{fen:'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',linea:['g7g6'],acepta:{0:['d8e7','d8f6']},objetivoEquilibrio:true,di:'Juegas con negras. La dama y el alfil blancos amenazan Dxf7#. Defiéndete.',
    pistas:['Defiende f7 o ataca a la dama.','…g6 ataca la dama; …De7 y …Df6 defienden f7.'],bien:'¡Bien defendido! El mate del pastor no funciona contra quien está atento.'},
  hazlo:{fen:'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4',linea:['h5f7'],meta:'mate',di:'Las negras olvidaron defender f7. Da mate.',pistas:['La dama captura en f7, protegida por el alfil.'],bien:'¡Mate del pastor!'},
  comprueba:{fen:'rnbqkbnr/ppppp2p/5p2/6p1/3PP3/8/PPP2PPP/RNBQKBNR w KQkq g6 0 3',linea:['d1h5'],meta:'mate',
    di:'Las negras jugaron …f6 y …g5 y abrieron la diagonal de su rey. Castígalo con el mate del loco.',pistas:['Busca la diagonal que va de tu dama hasta e8.','La dama a h5.'],bien:'¡Mate del loco, ahora a tu favor! Por eso no se debe debilitar así al rey.'}
};

/* N1-026 · Principios de apertura: controlar el centro */
L['N1-026']={
  objetivo:'Vas a aprender el primer principio de la apertura.',
  idea:'Las casillas **e4, d4, e5 y d5** son el centro. Desde allí las piezas controlan más casillas. Empieza ocupándolo o vigilándolo con los peones.',
  descubre:{fen:INICIAL,di:'Es la primera jugada. ¿Qué peón moverías? Piensa en el centro del tablero.'},
  observa:[
    {marcas:[['d4','clave'],['e4','clave'],['d5','clave'],['e5','clave']],di:'Estas cuatro casillas son el **centro**. Quien lo controla tiene más espacio para sus piezas.',sencillo:'El centro es como el medio de una cancha: desde ahí llegas a todas partes.'},
    {jugada:'e2e4',flechas:[['e4','d5','ataque'],['e4','f5','ataque']],di:'1.e4 ocupa el centro y vigila d5 y f5. Además abre camino para la dama y el alfil.',sencillo:'El peón ocupa una casilla central y deja salir a otras piezas.'},
    {jugada:'e7e5',flechas:[['e5','d4','ataque'],['e5','f4','ataque']],di:'1…e5: las negras hacen lo mismo y disputan el centro.',sencillo:'Las negras también quieren el centro.'},
    {jugada:'d2d4',flechas:[['d4','e5','ataque']],di:'2.d4 desafía el centro de las negras. Las aperturas giran alrededor de esta lucha.',sencillo:'Otro peón al centro: la pelea empieza ahí.'}
  ],
  comprende:{di:'Primeras jugadas: peones centrales (e4, d4) y después piezas que miren al centro.'},
  practica:{fen:INICIAL,linea:['e2e4'],acepta:{0:['d2d4']},regla:true,di:'Haz una primera jugada que ocupe el centro con un peón.',pistas:['Los peones de d2 y e2 pueden avanzar dos casillas.'],bien:'¡Muy bien! Un peón en el centro.'},
  hazlo:{fen:'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',linea:['e7e5'],acepta:{0:['d7d5','c7c5']},regla:true,di:'Juegas con negras tras 1.e4. Responde luchando por el centro.',pistas:['Un peón central negro también puede avanzar dos casillas.'],bien:'¡Correcto! Disputas el centro desde la primera jugada.'},
  comprueba:{fen:'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',linea:['d7d5'],concepto:true,
    objetivoEquilibrio:true,di:'Juegas con negras tras **1.d4**. Ocupa el centro con un peón.',pistas:['El peón de d7 puede avanzar dos casillas.'],
    mal:{'*':'Busca un peón que llegue a una casilla del centro sin perderse.'},bien:'¡Bien! …d5 ocupa el centro y frena al peón de d4.'}
};

/* N1-027 · Principios de apertura: desarrollar caballos y alfiles */
L['N1-027']={
  objetivo:'Vas a sacar tus piezas menores a casillas activas.',
  idea:'**Desarrollar** es llevar caballos y alfiles desde su casilla inicial a casillas desde donde miren el centro. Un buen orden: caballos primero, luego alfiles.',
  descubre:{fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',di:'Ya tienes un peón en el centro. ¿Qué pieza sacarías ahora?'},
  observa:[
    {jugada:'g1f3',flechas:[['f3','e5','ataque'],['f3','d4','linea']],di:'2.Cf3: el caballo sale hacia el centro y además ataca el peón de e5.',sencillo:'El caballo sale de su casa y mira al centro.'},
    {jugada:'b8c6',flechas:[['c6','e5','defensa']],di:'2…Cc6: las negras desarrollan y defienden e5.',sencillo:'El caballo negro sale y protege a su peón.'},
    {jugada:'f1c4',flechas:[['c4','f7','linea']],di:'3.Ac4: el alfil apunta al punto débil f7. Ya hay dos piezas desarrolladas y el rey casi listo para enrocar.',sencillo:'El alfil sale a una diagonal larga y abierta.'}
  ],
  comprende:{di:'En la apertura, cada jugada debería sacar una pieza nueva. Los caballos rinden más en c3, f3 (c6, f6), mirando al centro.'},
  practica:{fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',linea:['g1f3'],acepta:{0:['b1c3','f1c4','f1b5']},regla:true,di:'Desarrolla una pieza menor (caballo o alfil) hacia el centro.',pistas:['Por ejemplo, el caballo de g1 a f3.'],bien:'¡Bien desarrollado!'},
  hazlo:{fen:'rnbqkbnr/pppp1ppp/8/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2',linea:['b8c6'],acepta:{0:['g8f6']},regla:true,di:'Juegas con negras. Desarrolla un caballo.',pistas:['Tu peón de e5 está atacado: un caballo puede desarrollarse y defenderlo.'],bien:'¡Correcto! Desarrollo con defensa.'},
  comprueba:{fen:'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3',linea:['g8f6'],acepta:{0:['f8c5','f8e7']},concepto:true,
    objetivoEquilibrio:true,di:'Juegas con negras tras 1.e4 e5 2.Cf3 Cc6 3.Ac4. Desarrolla una pieza menor que todavía no se haya movido.',pistas:['Te quedan en casa el caballo de g8 y el alfil de f8.','…Cf6 o …Ac5.'],
    mal:{'*':'Esa jugada no saca una pieza nueva. Desarrolla el caballo de g8 o el alfil de f8.'},bien:'¡Bien! Otra pieza fuera y tu rey más cerca de enrocar.'}
};

/* N1-028 · Principios de apertura: enrocar pronto */
L['N1-028']={
  objetivo:'Vas a poner a salvo a tu rey antes de que empiece la lucha.',
  idea:'Con el centro abierto el rey corre peligro en e1 (o e8). **Enroca pronto**: el rey queda protegido detrás de sus peones y la torre entra en juego.',
  descubre:{fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',di:'Los dos bandos desarrollaron caballos y alfiles. ¿Qué jugada pone a salvo a tu rey?'},
  observa:[
    {marcas:[['e1','clave']],flechas:[['c5','f2','linea']],di:'Tu rey sigue en el centro, donde las columnas pueden abrirse. El alfil de c5 ya apunta a f2.',sencillo:'El rey en el medio está expuesto a los ataques.'},
    {jugada:'e1g1',marcas:[['g1','clave'],['f1','clave']],di:'5.0-0: el rey se esconde en g1 tras los peones y la torre de f1 se suma al juego.',sencillo:'Enrocando, el rey se va a un rincón seguro.'},
    {jugada:'e8g8',di:'5…0-0: las negras hacen lo mismo. Ahora ambos reyes están a salvo.',sencillo:'Las negras también protegen a su rey.'}
  ],
  comprende:{di:'Lo habitual es enrocar entre la jugada 5 y la 10, después de desarrollar las piezas del lado del enroque.'},
  practica:{fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4',linea:['e1g1'],regla:true,di:'Pon a salvo a tu rey.',pistas:['Puedes enrocar corto.'],bien:'¡Rey seguro!'},
  hazlo:{fen:'r1bqk2r/pppp1ppp/2n2n2/2b1p3/2B1P3/2NP1N2/PPP2PPP/R1BQK2R b KQkq - 0 5',linea:['e8g8'],regla:true,di:'Juegas con negras: enroca.',pistas:['El camino entre tu rey y la torre de h8 está libre.'],bien:'¡Correcto!'},
  comprueba:{fen:'r1bqk2r/ppp2ppp/2n2n2/2b5/2B5/2N2N2/PPP2PPP/R1BQK2R w KQkq - 0 7',linea:['e1g1'],concepto:true,
    objetivoEquilibrio:true,di:'Ya no quedan peones en las columnas d y e: el centro está abierto y tu rey sigue en e1. Ponlo a salvo.',pistas:['Con el centro abierto, el rey corre peligro en e1.','Enroca corto.'],
    mal:{'*':'Lo más urgente es poner a salvo tu rey: enroca.'},bien:'¡Bien! Con el centro abierto, el enroque pone a salvo al rey a tiempo.'}
};

/* N1-029 · No sacar la dama demasiado pronto */
L['N1-029']={
  objetivo:'Vas a entender por qué la dama no debe salir en las primeras jugadas.',
  idea:'Si sacas la dama muy pronto, el rival la **ataca mientras desarrolla sus piezas** y tú pierdes tiempos moviéndola una y otra vez.',
  descubre:{fen:'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',di:'Tras 1.e4 d5 2.exd5 Dxd5, la dama negra ya está en el centro. ¿Cómo puedes aprovecharlo?'},
  observa:[
    {flechas:[['b1','c3','mov']],di:'La dama negra está expuesta en d5. Las blancas pueden **desarrollar atacándola**.',sencillo:'Una dama en el centro tan temprano es un blanco fácil.'},
    {jugada:'b1c3',flechas:[['c3','d5','ataque']],marcas:[['d5','amenazada']],di:'3.Cc3: el caballo sale y ataca a la dama. Las blancas desarrollan **ganando un tiempo**.',sencillo:'El caballo sale y además asusta a la dama.'},
    {jugada:'d5a5',di:'3…Da5: la dama tiene que moverse otra vez, en lugar de sacar otra pieza.',sencillo:'La dama vuelve a moverse: las negras pierden tiempo.'},
    {jugada:'d2d4',di:'4.d4: las blancas siguen sumando piezas y centro mientras la dama negra va de un lado a otro.',sencillo:'Las blancas avanzan su plan; las negras van atrasadas.'}
  ],
  comprende:{di:'Primero caballos y alfiles; la dama sale cuando ya no pueda ser acosada fácilmente.'},
  practica:{fen:'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',linea:['b1c3'],regla:true,di:'Desarrolla una pieza atacando a la dama negra.',pistas:['¿Qué caballo puede atacar la casilla d5?'],bien:'¡Bien! Desarrollo con ganancia de tiempo.'},
  hazlo:{fen:'rnbqkbnr/pppp1ppp/8/4p3/4P1Q1/8/PPPP1PPP/RNB1KBNR b KQkq - 1 2',linea:['g8f6'],regla:true,di:'Juegas con negras. La dama blanca salió en la jugada 2. Castígala desarrollando con ataque.',pistas:['¿Qué caballo puede atacar la casilla g4?'],bien:'¡Correcto! Cf6 desarrolla y ataca a la dama.'},
  comprueba:{fen:'rnbqkbnr/pppp1ppp/8/8/3QP3/8/PPP2PPP/RNB1KBNR b KQkq - 0 3',linea:['b8c6'],concepto:true,
    objetivoEquilibrio:true,di:'Juegas con negras tras 1.e4 e5 2.d4 exd4 3.Dxd4. La dama blanca salió muy pronto: desarrolla una pieza **atacándola**.',pistas:['¿Qué pieza tuya puede salir y atacar a la dama de d4?','El caballo de b8 a c6.'],
    mal:{'*':'Esa jugada no ataca a la dama. Busca un desarrollo que la obligue a moverse.'},bien:'¡Exacto! …Cc6 saca una pieza y la dama tendrá que moverse otra vez.'}
};

/* N1-030 · Evitar mover la misma pieza varias veces en la apertura */
L['N1-030']={
  objetivo:'Vas a aprovechar cada jugada de la apertura para sacar una pieza nueva.',
  idea:'En la apertura, **cada jugada cuenta**. Mover la misma pieza una y otra vez deja a las demás en casa mientras el rival se desarrolla.',
  descubre:{fen:INICIAL,di:'Observa cuántas piezas saca cada bando en las primeras jugadas.'},
  observa:[
    {jugada:'e2e4',di:'1.e4…',sencillo:'Empiezan con peones al centro…'},
    {jugada:'e7e5',di:'1…e5',sencillo:'…los dos.'},
    {jugada:'g1f3',di:'2.Cf3: buena jugada de desarrollo.',sencillo:'Las blancas sacan el caballo.'},
    {jugada:'b8c6',di:'2…Cc6',sencillo:'Las negras también.'},
    {jugada:'f3g5',flechas:[['g5','f7','ataque']],di:'3.Cg5?! El mismo caballo vuelve a moverse para atacar f7…',sencillo:'Las blancas mueven otra vez el mismo caballo…'},
    {jugada:'d7d5',di:'3…d5: las negras defienden y ganan espacio.',sencillo:'Las negras se defienden y siguen jugando.'},
    {jugada:'g5f3',di:'4.Cf3: ¡el caballo vuelve atrás! Las blancas gastaron dos jugadas para nada.',sencillo:'El caballo regresó: dos jugadas perdidas.'},
    {jugada:'g8f6',marcas:[['c6','clave'],['f6','clave'],['f3','clave']],di:'4…Cf6: las negras ya tienen dos piezas fuera y peones en el centro; las blancas, solo una.',sencillo:'Cuenta las piezas fuera: las negras van adelantadas.'}
  ],
  comprende:{di:'Salvo para capturar o evitar una amenaza, saca una pieza nueva en cada jugada de la apertura.'},
  practica:{fen:'r1bqkb1r/ppp2ppp/2n2n2/3pp3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 5',linea:['b1c3'],acepta:{0:['f1b5','f1d3','f1e2','e4d5']},regla:true,di:'Te toca. Saca una pieza que todavía no se haya movido (o captura en el centro).',pistas:['Tu caballo de b1 y tu alfil de f1 siguen en casa.'],bien:'¡Bien! Una pieza nueva al juego.'},
  comprueba:{fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/4P3/2N2N2/PPPP1PPP/R1BQKB1R w KQkq - 4 4',linea:['f1b5'],acepta:{0:['f1c4','f1e2','f1d3']},concepto:true,
    objetivoEquilibrio:true,di:'Tras 1.e4 e5 2.Cf3 Cc6 3.Cc3 Cf6 tus dos caballos ya salieron. Saca una pieza que todavía no se haya movido.',pistas:['No muevas otra vez los caballos.','Saca el alfil de f1.'],
    mal:{'*':'Esa jugada no saca una pieza nueva: el alfil de f1 sigue en casa.'},bien:'¡Bien! En la apertura, cada jugada saca una pieza nueva.'}
};

/* N1-031 · Conectar las torres */
L['N1-031']={
  objetivo:'Vas a terminar el desarrollo conectando tus torres.',
  idea:'Las torres están **conectadas** cuando no hay piezas entre ellas en la primera fila: se defienden mutuamente y pueden ir juntas a las columnas abiertas.',
  descubre:{fen:'r2q1rk1/ppp2ppp/2nbbn2/3pp3/3PP3/2NBBN2/PPP2PPP/R2Q1RK1 w - - 0 8',di:'Las dos partes desarrollaron y enrocaron. ¿Qué pieza blanca separa todavía a las torres?'},
  observa:[
    {marcas:[['d1','clave']],di:'La dama de d1 está entre la torre de a1 y la de f1. Las torres no se «ven».',sencillo:'La dama tapa el camino entre las dos torres.'},
    {jugada:'d1e2',flechas:[['a1','f1','linea']],di:'8.De2: la dama sale de la primera fila y ahora las torres están **conectadas**.',sencillo:'La dama subió un piso y las torres ya se ven.'},
    {jugada:'d8e7',flechas:[['a8','f8','linea']],di:'8…De7: las negras hacen lo mismo. Con todo desarrollado, empieza el medio juego.',sencillo:'Las negras también conectan sus torres.'}
  ],
  comprende:{di:'El desarrollo termina cuando las piezas menores están fuera, el rey enrocado y las torres conectadas.'},
  practica:{fen:'r2q1rk1/ppp2ppp/2nbbn2/3pp3/3PP3/2NBBN2/PPP2PPP/R2Q1RK1 w - - 0 8',linea:['d1e2'],acepta:{0:['d1d2','d1e1']},regla:true,di:'Conecta tus torres.',pistas:['Mueve la dama.'],bien:'¡Bien! Torres conectadas.'},
  comprueba:{fen:'r2q1rk1/ppp2ppp/2nbbn2/3pp3/3PP3/2NBBN2/PPP1QPPP/R4RK1 b - - 1 8',linea:['d8e7'],acepta:{0:['d8d7','d8e8']},regla:true,di:'Juegas con negras: conecta tus torres.',pistas:['Tu dama está entre las torres.'],bien:'¡Correcto!'}
};

/* N1-032 · La debilidad de f7 y f2 */
L['N1-032']={
  tactica:true, motivo:'Ataque a f7',
  objetivo:'Vas a reconocer la casilla más débil de cada bando al comienzo.',
  idea:'Al principio, **f7** (y f2 para las blancas) solo está defendida por el rey. Por eso muchos ataques tempranos apuntan allí.',
  descubre:{fen:INICIAL,di:'¿Qué peón de las negras tiene menos protección al empezar la partida?'},
  observa:[
    {flechas:[['e8','f7','defensa']],marcas:[['f7','clave']],di:'El peón de f7 solo lo defiende el rey: es la casilla más débil.',sencillo:'Fíjate en f7: solo el rey lo cuida.'},
    {fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4',flechas:[['f3','f7','ataque'],['c4','f7','ataque']],marcas:[['f7','amenazada']],di:'Aquí la dama y el alfil blancos atacan f7: dos atacantes contra un solo defensor.',sencillo:'Dos piezas apuntan a f7 y solo el rey lo defiende.'},
    {jugada:'f3f7',marcas:[['e8','jaque']],di:'Dxf7#: el rey no puede capturar la dama porque el alfil la protege.',sencillo:'¡Mate en f7!'}
  ],
  comprende:{di:'Vigila f7 (o f2) en la apertura y no dejes que la dama y el alfil rivales apunten allí sin defensa.'},
  practica:{fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR w KQkq - 4 4',linea:['f3f7'],meta:'mate',di:'Aprovecha la debilidad de f7.',pistas:['La dama y el alfil atacan f7.'],bien:'¡Mate! f7 cayó.'},
  hazlo:{fen:'rnb1k1nr/pppp1ppp/5q2/2b1p3/4P3/2NP4/PPP2PPP/R1BQKBNR b KQkq - 0 4',linea:['f6f2'],meta:'mate',di:'Juegas con negras. Aprovecha la debilidad de f2.',pistas:['Tu dama y tu alfil apuntan a f2.'],bien:'¡Mate en f2!'},
  comprueba:{fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 4 4',linea:['g8f6'],acepta:{0:['d8f6','d8e7','g8h6','f7f5']},concepto:true,
    di:'Juegas con negras. La dama y el alfil blancos apuntan a f7: amenazan **Dxf7#**. Evita el mate.',pistas:['Puedes tapar la columna de la dama o defender f7 con otra pieza.','…Cf6 tapa la columna f y además desarrolla.'],
    mal:{'*':'Así llega Dxf7#. Tapa la línea de la dama o defiende f7.'},bien:'¡Bien! f7 ya no cae.'}
};

/* N1-033 · Mate con dos torres (mate de la escalera) */
L['N1-033']={
  tactica:true, motivo:'Mate de la escalera con dos torres',
  objetivo:'Vas a dar mate con dos torres sin ayuda del rey.',
  idea:'**Mate de la escalera**: una torre corta una fila y la otra da jaque en la siguiente; se van turnando y empujan al rey fila por fila hasta el borde.',
  descubre:{fen:'8/8/8/6k1/8/8/1R6/R5K1 w - - 0 1',di:'Con dos torres puedes empujar al rey negro hasta el borde, como subiendo una escalera. Mira cómo.'},
  observa:[
    {jugada:'a1a4',flechas:[['a4','h4','linea']],di:'1.Ta4: la primera torre **corta la fila 4**. El rey negro no puede bajar.',sencillo:'Una torre hace de pared en la fila 4.'},
    {jugada:'g5f5',di:'1…Rf5',sencillo:'El rey busca salida.'},
    {jugada:'b2b5',flechas:[['b5','f5','ataque'],['a4','h4','linea']],marcas:[['f5','jaque']],di:'2.Tb5+: la otra torre da jaque en la fila 5. El rey debe subir a la fila 6.',sencillo:'La otra torre da jaque y obliga al rey a subir.'},
    {jugada:'f5f6',di:'2…Rf6',sencillo:'El rey sube un escalón.'},
    {jugada:'a4a6',marcas:[['f6','jaque']],di:'3.Ta6+: se turnan. Ahora la torre de a da jaque y la de b corta la fila 5.',sencillo:'Ahora le toca dar jaque a la otra torre.'},
    {jugada:'f6g7',di:'3…Rg7',sencillo:'Otro escalón más.'},
    {jugada:'b5b7',marcas:[['g7','jaque']],di:'4.Tb7+: el rey llega a la última fila…',sencillo:'El rey ya está contra el borde.'},
    {jugada:'g7g8',di:'4…Rg8',sencillo:'No tiene más escalones.'},
    {jugada:'a6a8',marcas:[['g8','jaque'],['f7','bloqueada'],['g7','bloqueada'],['h7','bloqueada']],di:'5.Ta8#: una torre vigila la fila 7 y la otra da jaque en la 8. ¡Mate de la escalera!',sencillo:'¡Mate! Una torre cierra y la otra ataca.'}
  ],
  comprende:{di:'Las torres trabajan en filas (o columnas) vecinas, turnándose. Si el rey se acerca a una torre, llévala lejos por la misma fila.'},
  practica:{fen:'6k1/1R6/R7/8/8/8/8/6K1 w - - 0 1',linea:['a6a8'],meta:'mate',di:'Da el último paso: mate en una.',pistas:['La torre de b7 ya cierra la fila 7.'],bien:'¡Mate de la escalera!'},
  hazlo:{fen:'8/6k1/R7/1R6/8/8/8/6K1 w - - 0 1',linea:['b5b7','g7g8','a6a8'],meta:'mate',di:'Mate en dos jugadas.',pistas:['Primero un jaque en la fila 7.','Después, la otra torre a la fila 8.'],bien:'¡Excelente! Dos jaques turnándose.'},
  comprueba:{fen:'r5k1/8/8/8/8/8/1r6/7K b - - 0 1',linea:['a8a1'],meta:'mate',di:'Ahora con negras: mate en una.',pistas:['La torre de b2 ya cierra la fila 2.'],bien:'¡Correcto! Las torres funcionan igual con cualquier color.'}
};

/* N1-034 · Mate con dama y rey contra rey */
L['N1-034']={
  tactica:true, motivo:'Mate de dama y rey contra rey',
  objetivo:'Vas a aprender a ganar con dama y rey contra el rey solo.',
  idea:'1) Con la dama, **encierra** al rey rival en una zona cada vez más pequeña (sin dar jaques inútiles). 2) **Acerca tu rey**. 3) Da mate con la dama apoyada por el rey. ¡Cuidado con el ahogado!',
  descubre:{fen:'4k3/8/8/8/8/8/8/3QK3 w - - 0 1',di:'La dama sola no puede dar mate: necesita ayuda. ¿Quién la ayuda?'},
  observa:[
    {jugada:'e1e2',di:'El rey blanco empieza a subir. La dama ya mantiene al rey negro lejos de la columna d.',sencillo:'Primero hay que traer al rey blanco.'},
    {jugada:'e8f7',di:'…Rf7',sencillo:'El rey negro se mueve.'},
    {fen:'8/5k2/8/4K3/8/8/8/3Q4 w - - 8 5',marcas:[['e5','clave']],di:'Varias jugadas después, el rey blanco está en e5, muy cerca del rey negro.',sencillo:'Ya llegó el rey blanco cerca.'},
    {jugada:'d1g1',flechas:[['g1','g8','linea']],di:'Dg1: la dama encierra al rey en las columnas e–h de las filas 7 y 8.',sencillo:'La dama le cierra el paso.'},
    {jugada:'f7f8',di:'…Rf8',sencillo:'El rey negro va al borde.'},
    {jugada:'e5e6',di:'Re6: el rey blanco se coloca frente al rey negro y le quita la fila 7.',sencillo:'Tu rey se pone frente al suyo.'},
    {jugada:'f8e8',di:'…Re8',sencillo:'Al rey negro casi no le quedan casillas.'},
    {jugada:'g1g8',marcas:[['e8','jaque'],['d8','bloqueada'],['f8','bloqueada']],di:'Dg8#: la dama da jaque por la fila 8 y el rey blanco cubre la fila 7. ¡Mate!',sencillo:'¡Mate! Dama y rey juntos.'}
  ],
  comprende:{di:'Encierra, acerca el rey y remata. Antes de cada jugada de dama, comprueba que el rey rival tenga al menos una jugada (si no, es ahogado).'},
  practica:{fen:'4k3/8/4K3/8/8/8/8/6Q1 w - - 0 1',linea:['g1g8'],meta:'mate',di:'Da jaque mate en una.',pistas:['Tu rey ya cubre la fila 7.'],bien:'¡Mate!'},
  hazlo:{fen:'7k/8/5K2/8/8/8/8/6Q1 w - - 0 1',linea:['g1g7'],meta:'mate',di:'Mate en una. El rey negro está en la esquina.',pistas:['La dama puede ponerse junto al rey si tu rey la protege.'],bien:'¡Mate!'},
  comprueba:{fen:'8/8/8/8/8/3k4/6q1/3K4 b - - 0 1',linea:['g2d2'],meta:'mate',di:'Juegas con negras: mate en una.',pistas:['Tu rey en d3 vigila muchas casillas.'],bien:'¡Correcto!'}
};

/* N1-035 · Evitar el ahogado cuando se tiene gran ventaja material */
L['N1-035']={
  tactica:true, motivo:'Mate evitando el ahogado',
  objetivo:'Vas a ganar sin regalar tablas por ahogado.',
  idea:'Con mucha ventaja, el peligro es el **ahogado**. Antes de mover, comprueba: ¿le queda al rival alguna jugada legal o le doy jaque?',
  descubre:{fen:'1k6/8/1K6/8/8/8/8/3Q4 w - - 0 1',di:'Tienes dama y rey contra rey. Hay una jugada que gana y otra que solo empata. ¿Las distingues?'},
  observa:[
    {flechas:[['d1','c2','mov']],di:'Mira las casillas del rey negro: a8, c8, a7, b7 y c7. Tu rey ya vigila a7, b7 y c7.',sencillo:'El rey negro tiene muy poco espacio.'},
    {fen:'1k6/8/1KQ5/8/8/8/8/8 b - - 0 1',marcas:[['a8','bloqueada'],['c8','bloqueada'],['a7','bloqueada'],['b7','bloqueada'],['c7','bloqueada']],di:'Si juegas Dc6??, el rey no está en jaque pero no tiene ninguna jugada: **ahogado**, tablas.',sencillo:'Con Dc6 el rey no puede moverse y no está en jaque: ¡tablas!'},
    {fen:'1k6/8/1K6/8/8/8/8/3Q4 w - - 0 1',jugada:'d1d8',marcas:[['b8','jaque']],di:'En cambio, **Dd8#** da jaque y cierra todas las salidas: mate.',sencillo:'Con Dd8 hay jaque y no hay escape: ¡ganaste!'}
  ],
  comprende:{di:'Pregunta clave antes de cada jugada ganadora: ¿mi rival tendrá alguna jugada? Si no tiene ninguna y no está en jaque, es ahogado.'},
  practica:{fen:'1k6/8/1K6/8/8/8/8/3Q4 w - - 0 1',linea:['d1d8'],meta:'mate',di:'Da mate en una, sin ahogar.',pistas:['Busca un jaque por la fila 8.'],bien:'¡Mate, sin caer en el ahogado!'},
  comprueba:{fen:'7k/8/6K1/8/8/8/8/5Q2 w - - 0 1',linea:['f1f8'],meta:'mate',di:'Mate en una, sin ahogar.',pistas:['Un jaque por la fila 8.'],bien:'¡Correcto!'}
};

/* N1-036 · La regla del cuadrado */
L['N1-036']={
  objetivo:'Vas a saber, sin calcular jugada por jugada, si un rey alcanza a un peón.',
  idea:'Dibuja un **cuadrado** desde el peón hasta la casilla de coronación. Si el rey rival puede **entrar en el cuadrado** en su turno, alcanza al peón; si no, el peón corona.',
  descubre:{fen:'8/8/8/8/1P6/5k2/8/K7 b - - 0 1',di:'Juegan las negras. ¿Alcanzará el rey al peón de b4 antes de que corone?'},
  observa:[
    {marcas:[['b4','clave'],['e4','clave'],['e8','clave'],['b8','clave']],di:'El peón está a 4 casillas de coronar. El cuadrado va de b4 a e4 y sube hasta b8 y e8.',sencillo:'Imagina un cuadrado: del peón a la casilla donde corona, y el mismo tamaño hacia el lado.'},
    {jugada:'f3e4',marcas:[['e4','clave']],di:'…Re4: el rey **entra en el cuadrado**. Ahora alcanzará al peón.',sencillo:'El rey entró al cuadrado: llegará a tiempo.'},
    {jugada:'b4b5',marcas:[['b5','clave'],['e5','clave'],['e8','clave'],['b8','clave']],di:'Si el peón avanza, el cuadrado se achica (b5–e5–e8–b8), pero el rey sigue dentro.',sencillo:'El cuadrado se hace más pequeño, pero el rey no sale de él.'},
    {jugada:'e4d5',di:'…Rd5 y luego …Rc6: el peón cae.',sencillo:'El rey llega justo y se come el peón.'}
  ],
  comprende:{di:'La regla del cuadrado te ahorra calcular: cuenta el cuadrado y mira si el rey entra.'},
  practica:{fen:'8/8/8/8/1P6/5k2/8/K7 b - - 0 1',linea:['f3e4'],objetivoEquilibrio:true,di:'Juegas con negras. Entra en el cuadrado para alcanzar al peón.',pistas:['El cuadrado del peón de b4 va de la columna b a la e, filas 4 a 8.'],bien:'¡Bien! Dentro del cuadrado, el peón no se escapa.'},
  comprueba:{fen:'8/8/8/8/1P6/5k2/8/K7 w - - 0 1',linea:['b4b5','f3e4','b5b6','e4d5','b6b7','d5c6','b7b8q'],concepto:true,
    di:'La misma posición de antes, pero ahora **juegan las blancas**. Avanza el peón: tras b5, el rey negro queda fuera del cuadrado.',pistas:['Mueve el peón en cada jugada, sin detenerte.','Al llegar a b8, corónalo en dama.'],
    mal:{'*':'Si no avanzas el peón, el rey negro entra en el cuadrado y lo alcanza.'},bien:'¡Coronaste! Con el turno a tu favor, el rey negro no pudo entrar en el cuadrado.'}
};

/* N1-037 · Rey y peón contra rey: acompañar al peón con el rey */
L['N1-037']={
  objetivo:'Vas a ganar finales de rey y peón llevando tu rey por delante.',
  idea:'En los finales de rey y peón, el rey **va delante del peón** y le abre camino. Un peón solo, sin su rey, suele perderse.',
  descubre:{fen:'8/8/3k4/8/4K3/4P3/8/8 w - - 0 1',di:'Tienes un peón de más. ¿Lo avanzarías ya o primero moverías el rey?'},
  observa:[
    {marcas:[['e4','clave'],['e3','clave']],di:'Tu rey está delante del peón. Primero debe ganar terreno.',sencillo:'El rey es como un guardaespaldas que va delante.'},
    {jugada:'e4f5',di:'Rf5: el rey avanza en diagonal y aleja al rey negro de la columna e.',sencillo:'El rey se adelanta.'},
    {jugada:'d6d7',di:'…Rd7',sencillo:'El rey negro intenta acercarse.'},
    {jugada:'f5e5',flechas:[['e5','d6','linea']],di:'Re5: el rey blanco ocupa casillas clave delante del peón.',sencillo:'Tu rey sigue abriendo camino.'},
    {jugada:'d7e7',di:'…Re7',sencillo:'El rey negro se pone delante.'},
    {jugada:'e3e4',di:'e4: ahora sí avanza el peón, protegido por el rey. El rey negro no podrá detenerlo.',sencillo:'Cuando el rey ya ganó espacio, el peón avanza seguro.'}
  ],
  comprende:{di:'Rey delante del peón, ganando casillas; el peón avanza después, protegido.'},
  practica:{fen:'4k3/8/3K4/3P4/8/8/8/8 w - - 0 1',linea:['d6c7'],acepta:{0:['d6e6','d6c6']},di:'Gana este final: mueve el rey para abrirle camino al peón.',pistas:['El rey debe seguir delante del peón, no detrás.'],bien:'¡Bien! El rey controla las casillas por donde pasará el peón.'},
  hazlo:{fen:'8/8/3k4/8/4K3/4P3/8/8 w - - 0 1',linea:['e4d4'],acepta:{0:['e4f5','e4f4']},di:'Gana terreno con el rey antes de avanzar el peón.',pistas:['Mueve el rey hacia adelante, sin dejar solo al peón.'],bien:'¡Correcto!'},
  comprueba:{fen:'8/8/4p3/4k3/8/3K4/8/8 b - - 0 1',linea:['e5d5'],acepta:{0:['e5f4','e5f5']},di:'Juegas con negras: avanza tu rey para ganar el final.',pistas:['Lo mismo que con blancas: el rey primero.'],bien:'¡Muy bien!'}
};

})();
