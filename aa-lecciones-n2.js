/* Aprende Ajedrez · lecciones del NIVEL DOS (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};

/* N2-001 · Jugadas forzadas: por qué el jaque limita las respuestas */
L['N2-001']={
  tactica:true, motivo:'Jugadas forzadas',
  objetivo:'Vas a aprender por qué un jaque obliga al rival y cuáles son sus tres respuestas posibles.',
  idea:'Ante un **jaque** solo hay tres respuestas: **mover el rey**, **capturar** la pieza que da jaque o **tapar** el jaque. Por eso los jaques son jugadas forzadas: dejan muy pocas opciones.',
  descubre:{fen:'4k3/8/8/8/1b6/8/5PPP/4R1K1 b - - 0 1',di:'Las negras están en jaque. Prueba a mover distintas piezas: el tablero solo te dejará hacer jugadas que salven al rey.'},
  observa:[
    {flechas:[['e1','e8','ataque']],marcas:[['e8','jaque']],di:'La torre de e1 da **jaque**. Las negras no pueden jugar lo que quieran: solo valen las jugadas que salvan al rey.',sencillo:'¡Jaque! Hay que salvar al rey sí o sí.'},
    {flechas:[['e8','d7','mov'],['e8','f7','mov']],marcas:[['d8','escape'],['d7','escape'],['f8','escape'],['f7','escape']],di:'Forma 1: **mover el rey** a una casilla donde no lo ataquen: d8, d7, f8 o f7.',sencillo:'Primera forma: el rey se escapa.'},
    {flechas:[['b4','e1','mov']],di:'Forma 2: **capturar** la pieza que da jaque. Aquí el alfil de b4 puede comerse la torre.',sencillo:'Segunda forma: comerse la pieza que da jaque.'},
    {flechas:[['b4','e7','mov']],di:'Forma 3: **tapar** el jaque, poniendo una pieza en medio; por ejemplo, el alfil en e7.',sencillo:'Tercera forma: poner una pieza en medio.'},
    {jugada:'b4e1',marcas:[['e1','clave']],di:'Aquí lo mejor es **capturar**: …Axe1. Ante cada jaque, revisa siempre estas tres formas.',sencillo:'Lo mejor era comerse la torre.'}
  ],
  comprende:{di:'Un jaque es una jugada **forzante**: el rival tiene que responderlo y casi no le quedan opciones. Por eso, al calcular, conviene mirar primero los jaques.'},
  practica:{tipo:'casilla',fen:'8/8/8/3k4/8/4K3/8/3R4 b - - 0 1',verificar:'rey-va:b',casillas:['c4','c5','c6','e5','e6'],
    di:'La torre da jaque al rey negro. Toca **todas** las casillas a las que puede escapar el rey.',
    pista:'El rey no puede ir a casillas de la columna d (las vigila la torre) ni junto al rey blanco.',bien:'¡Muy bien! Solo esas cinco casillas son seguras. Un jaque deja muy pocas opciones.'},
  hazlo:{fen:'6k1/5ppp/5N2/8/8/8/5PPP/6K1 b - - 0 1',linea:['g7f6'],
    objetivoEquilibrio:true,di:'Juegas con negras. El caballo da jaque y su salto **no se puede tapar**. Elige la mejor de las respuestas que te quedan.',pistas:['Solo puedes mover el rey o capturar el caballo.','El peón de g7 captura en f6.'],
    mal:{'*':'El rey escapa, pero el caballo sigue vivo. Puedes capturarlo.'},bien:'¡Bien! …gxf6: ante el jaque de caballo solo hay dos salidas, y capturar gana una pieza.'},
  comprueba:{fen:'3r2k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1',linea:['e2e8','d8e8','e1e8'],meta:'mate',
    di:'Mate en dos. Busca un jaque que deje al rival con **una sola** respuesta.',
    pistas:['Un jaque en la octava fila obliga a las negras a capturar.','Después de …Txe8, tu torre de e1 da el mate.'],
    bien:'¡Perfecto! Tras De8+ la única jugada era …Txe8, y Txe8 es mate.'}
};

/* N2-002 · Ganar tiempos atacando piezas */
L['N2-002']={
  tactica:false,
  objetivo:'Vas a aprender a desarrollar tus piezas atacando las del rival para ganar tiempos.',
  idea:'**Ganar un tiempo** es hacer una jugada útil que, además, obliga al rival a perder la suya (por ejemplo, retirar una pieza atacada).',
  descubre:{fen:'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',di:'Las negras sacaron la dama muy pronto. ¿Puedes desarrollar una pieza y, al mismo tiempo, atacar a la dama?'},
  observa:[
    {jugada:'b1c3',flechas:[['c3','d5','ataque']],marcas:[['d5','amenazada']],di:'3.Cc3: el caballo sale a jugar **y** ataca a la dama. Las negras tendrán que gastar su turno en moverla.',sencillo:'El caballo sale y amenaza a la dama.'},
    {jugada:'d5a5',di:'3…Da5: la dama se retira. Esa jugada no pone en juego ninguna pieza nueva.',sencillo:'La dama tuvo que escapar.'},
    {jugada:'d2d4',di:'4.d4: las blancas ocupan el centro y abren paso a su alfil.',sencillo:'Las blancas siguen desarrollándose.'},
    {jugada:'g8f6',di:'4…Cf6: por fin las negras desarrollan una pieza.',sencillo:'Las negras sacan su caballo.'},
    {jugada:'g1f3',marcas:[['c3','clave'],['f3','clave']],di:'5.Cf3: las blancas tienen dos caballos desarrollados y un peón en el centro. Atacar mientras se desarrolla hizo **ganar tiempos**.',sencillo:'Ganar tiempos es tener más piezas listas antes que el rival.'}
  ],
  comprende:{di:'Cada vez que obligas al rival a mover una pieza que ya había jugado, tú ganas una jugada de desarrollo.'},
  practica:{fen:'rnbqkbnr/ppp2ppp/3p4/8/3QP3/5N2/PPP2PPP/RNB1KB1R b KQkq - 0 4',linea:['b8c6'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. La dama blanca está en el centro: desarrolla una pieza atacándola.',
    pistas:['¿Qué pieza que aún no salió puede atacar la casilla d4?','El caballo de b8.'],
    mal:{'*':'Esa jugada no ataca a la dama. Busca desarrollar una pieza que la amenace.'},
    bien:'¡Bien! …Cc6 desarrolla y obliga a la dama blanca a moverse otra vez.'},
  hazlo:{fen:'rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 1 2',linea:['e4e5','f6d5','c2c4'],concepto:true,objetivoEquilibrio:true,
    di:'El caballo negro está en f6. Gana tiempos atacándolo con tus peones, dos veces seguidas.',
    pistas:['Avanza un peón que ataque al caballo de f6.','Después, otro peón puede atacarlo en d5.'],
    mal:{'*':'Busca una jugada de peón que ataque al caballo.'},
    bien:'¡Excelente! e5 y c4 echaron al caballo dos veces mientras tus peones ganaban espacio.'},
  comprueba:{fen:'rnbqkb1r/ppp1pppp/8/3n4/3P4/8/PPP2PPP/RNBQKBNR w KQkq - 0 4',linea:['c2c4'],concepto:true,objetivoEquilibrio:true,
    di:'Ataca al caballo de d5 con un peón para ganar un tiempo y espacio.',pistas:['¿Qué peón puede amenazar la casilla d5?'],
    mal:{'*':'Esa jugada no ataca al caballo con un peón. Busca el avance que lo amenace.'},
    bien:'¡Correcto! c4 ataca al caballo, que tendrá que moverse otra vez.'}
};

/* N2-003 · Ataque doble: concepto */
L['N2-003']={
  tactica:true, motivo:'Ataque doble',
  objetivo:'Vas a aprender a hacer dos amenazas con una sola jugada.',
  idea:'Un **ataque doble** es una jugada que crea **dos amenazas a la vez**. El rival solo tiene un turno: salva una cosa y pierde la otra.',
  descubre:{fen:'3n1k2/p4p1p/6p1/8/R7/3b4/PP3P1P/6K1 w - - 0 1',di:'La torre blanca puede ir a una casilla desde donde ataque **dos piezas a la vez**. ¿Cuál?'},
  observa:[
    {marcas:[['d3','indefensa'],['d8','indefensa']],di:'Mira la columna d: el alfil negro de d3 y el caballo de d8. Ninguno está defendido.',sencillo:'Hay dos piezas negras sueltas en la misma columna.'},
    {jugada:'a4d4',flechas:[['d4','d3','ataque'],['d4','d8','ataque']],marcas:[['d3','amenazada'],['d8','amenazada']],di:'Td4: la torre ataca **a la vez** al alfil y al caballo. Es un ataque doble.',sencillo:'Una sola jugada, dos amenazas.'},
    {jugada:'d3f5',di:'…Af5: las negras salvan el alfil…',sencillo:'Las negras salvan una pieza.'},
    {jugada:'d4d8',marcas:[['f8','jaque']],di:'…y la torre captura el caballo con jaque. El ataque doble ganó una pieza.',sencillo:'La otra pieza se pierde.'}
  ],
  comprende:{di:'Cualquier pieza puede atacar dos a la vez, incluso el peón o el rey. Busca piezas rivales sin defensa y una casilla que ataque a dos.'},
  practica:{fen:'7k/p4p1p/n5p1/3R4/b7/8/PP4PP/2K5 w - - 0 1',linea:['d5a5'],
    di:'Encuentra la casilla desde donde tu torre ataca dos piezas negras a la vez.',pistas:['Mira la columna a.','La torre puede ir a a5.'],
    bien:'¡Bien! Ta5 ataca al alfil de a4 y al caballo de a6.'},
  hazlo:{fen:'4r1k1/pp3ppp/6p1/8/5R1N/6P1/1P5P/1K6 b - - 0 1',linea:['g6g5'],
    di:'Juegas con negras. Un **peón** también puede hacer un ataque doble. ¿Cuál?',
    pistas:['Busca un peón que pueda atacar a la vez la torre y el caballo.','El peón de g6.'],
    bien:'¡Correcto! …g5 ataca la torre de f4 y el caballo de h4.'},
  comprueba:{fen:'8/p7/k5p1/5B2/8/8/PP2rPPP/2K5 w - - 0 1',linea:['f5d3'],
    di:'Ataque doble con jaque: encuentra la jugada de alfil que gana material.',pistas:['Busca un jaque al rey de a6 que, además, ataque otra pieza.'],
    bien:'¡Excelente! Ad3+ da jaque y ataca la torre de e2.'}
};

/* N2-004 · Tenedor de peón */
L['N2-004']={
  tactica:true, motivo:'Tenedor de peón',
  objetivo:'Vas a aprender a atacar dos piezas a la vez con un peón.',
  idea:'Un **tenedor de peón** ataca dos piezas en diagonal. Como el peón vale muy poco, el rival casi siempre pierde material.',
  descubre:{fen:'6k1/5ppp/2n1b3/8/3P4/8/5PPP/3R2K1 w - - 0 1',di:'Un peón vale poco, pero puede atacar a dos piezas a la vez. ¿Ves cómo?'},
  observa:[
    {jugada:'d4d5',flechas:[['d5','c6','ataque'],['d5','e6','ataque'],['d1','d5','defensa']],marcas:[['c6','amenazada'],['e6','amenazada']],di:'d5: el peón ataca al caballo de c6 y al alfil de e6. Además, la torre de d1 lo defiende.',sencillo:'El peón amenaza a dos piezas a la vez.'},
    {jugada:'c6d8',di:'…Cd8: las negras salvan el caballo…',sencillo:'Las negras salvan una pieza.'},
    {jugada:'d5e6',di:'…y el peón captura el alfil.',sencillo:'El peón se come la otra.'},
    {jugada:'d8e6',di:'…Cxe6: las negras recuperan el peón, pero perdieron un alfil (3 puntos) a cambio de un peón (1).',sencillo:'Las blancas ganaron material.'}
  ],
  comprende:{di:'Antes de avanzar un peón, mira qué casillas atacará. Si hay dos piezas rivales en esas dos diagonales, ¡tienes un tenedor!'},
  practica:{fen:'5k2/pp3p1p/n1n3p1/8/1P6/8/PP3PPP/1K2R3 w - - 0 1',linea:['b4b5'],
    di:'Encuentra el tenedor de peón.',pistas:['Busca un peón que pueda atacar a la vez los dos caballos.'],
    bien:'¡Bien! b5 ataca los caballos de a6 y c6.'},
  hazlo:{fen:'rk6/pp3ppp/8/8/4p3/6P1/P2R1N2/1K6 b - - 0 1',linea:['e4e3'],
    di:'Juegas con negras. Busca el tenedor de peón.',pistas:['¿Qué peón negro puede atacar la torre y el caballo?'],
    bien:'¡Correcto! …e3 ataca la torre de d2 y el caballo de f2.'},
  comprueba:{fen:'r1bqkb1r/pppp1ppp/2n5/4p3/2B1N3/5N2/PPPP1PPP/R1BQK2R b KQkq - 0 5',linea:['d7d5'],objetivoEquilibrio:true,
    di:'Juegas con negras. Las blancas acaban de capturar en e4. Recupera la pieza con un tenedor de peón.',
    pistas:['Un peón negro puede atacar a la vez al alfil de c4 y al caballo de e4.'],
    bien:'¡Muy bien! …d5 ataca alfil y caballo: las negras recuperan la pieza. Este truco aparece de verdad en la apertura de los dos caballos.'}
};

/* N2-006 · Tenedor de caballo con jaque al rey */
L['N2-006']={
  tactica:true, motivo:'Tenedor de caballo con jaque',
  objetivo:'Vas a aprender a dar un jaque de caballo que, además, ataca otra pieza valiosa.',
  idea:'Cuando el caballo da **jaque** y a la vez ataca otra pieza, el rival debe salvar al rey y pierde la otra. Si ataca rey, dama y torre se llama **tenedor familiar**.',
  descubre:{fen:'4r1k1/3q1p1p/6p1/8/4N3/8/5PPP/2R3K1 w - - 0 1',di:'Mira el caballo de e4. Hay una casilla desde donde da jaque y ataca, además, a la dama y a la torre. ¡Búscala!'},
  observa:[
    {flechas:[['e4','f6','mov']],marcas:[['f6','clave']],di:'La casilla f6: ningún peón negro la vigila.',sencillo:'Fíjate en la casilla f6.'},
    {jugada:'e4f6',flechas:[['f6','g8','ataque'],['f6','d7','ataque'],['f6','e8','ataque']],marcas:[['g8','jaque'],['d7','amenazada'],['e8','amenazada']],di:'Cf6+: jaque al rey y, a la vez, ataque a la dama de d7 y a la torre de e8. Es un **tenedor familiar**.',sencillo:'¡Jaque! Y el caballo ataca también a la dama y a la torre.'},
    {jugada:'g8g7',di:'…Rg7: las negras deben salvar al rey.',sencillo:'El rey se aparta.'},
    {jugada:'f6d7',marcas:[['d7','clave']],di:'Cxd7: el caballo captura la dama.',sencillo:'¡El caballo se come la dama!'}
  ],
  comprende:{di:'Busca casillas donde el caballo dé jaque y que el rival no vigile. Luego mira qué más ataca desde allí.'},
  practica:{fen:'6r1/p6p/k7/3N4/8/3r4/1P3PPP/1K4R1 w - - 0 1',linea:['d5b4'],
    di:'Encuentra el tenedor con jaque.',pistas:['Busca una casilla desde donde el caballo ataque al rey de a6 y a la torre de d3.'],
    bien:'¡Bien! Cb4+ da jaque y ataca la torre de d3.'},
  hazlo:{fen:'6kr/p4p1p/4n3/3B4/8/8/PP4KP/7R b - - 0 1',linea:['e6f4'],
    di:'Juegas con negras: tenedor con jaque.',pistas:['¿Qué casilla ataca a la vez g2 y d5?'],
    bien:'¡Correcto! …Cf4+ ataca al rey y al alfil de d5.'},
  comprueba:{fen:'8/ppk3b1/5Np1/8/8/8/P4PPP/4K3 w - - 0 1',linea:['f6e8'],
    di:'Busca el jaque de caballo que gana el alfil.',pistas:['El caballo puede dar jaque al rey de c7 desde una casilla de la octava fila.'],
    bien:'¡Excelente! Ce8+ ataca al rey y al alfil de g7.'}
};

/* N2-007 · Tenedor de dama */
L['N2-007']={
  tactica:true, motivo:'Tenedor de dama',
  objetivo:'Vas a aprender a usar la dama para atacar dos objetivos a la vez.',
  idea:'La dama ataca en **ocho direcciones**. Su mejor tenedor es un **jaque** que además ataca una pieza **sin defensa**.',
  descubre:{fen:'3k4/8/8/3r4/8/Q7/8/2K5 w - - 0 1',di:'¿Puedes dar jaque con la dama y, a la vez, atacar la torre?'},
  observa:[
    {jugada:'a3a8',flechas:[['a8','d8','ataque'],['a8','d5','ataque']],marcas:[['d8','jaque'],['d5','amenazada']],di:'Da8+: la dama da jaque por la fila y ataca la torre de d5 por la diagonal.',sencillo:'¡Jaque! Y la dama también mira a la torre.'},
    {jugada:'d8c7',di:'…Rc7: el rey sale del jaque…',sencillo:'El rey se aparta.'},
    {jugada:'a8d5',marcas:[['d5','clave']],di:'…y Dxd5 gana la torre.',sencillo:'La dama se come la torre.'}
  ],
  comprende:{di:'Busca piezas rivales sin defensa y comprueba si la dama puede atacarlas dando jaque al mismo tiempo.'},
  practica:{fen:'r5k1/p3q1pp/8/8/8/8/5PPP/3Q1RK1 w - - 0 1',linea:['d1d5'],
    di:'Encuentra el tenedor de dama que gana la torre.',pistas:['Busca un jaque por la diagonal a2–g8.','Desde d5 la dama ve también a8.'],
    bien:'¡Muy bien! Dd5+ da jaque y ataca la torre de a8: tras el jaque, la dama la captura.'},
  hazlo:{fen:'1k2q2r/pp3pp1/8/3R4/7B/8/1P3PKP/3R4 b - - 0 1',linea:['e8e4'],
    di:'Juegas con negras. La dama puede atacar tres cosas a la vez.',pistas:['Busca un jaque al rey de g2.','La casilla e4.'],
    bien:'¡Muy bien! …De4+ da jaque y ataca la torre de d5 y el alfil de h4.'},
  comprueba:{fen:'6r1/1p3p2/5kp1/8/2r5/8/P5PP/R3K2Q w - - 0 1',linea:['h1f1'],
    di:'Encuentra el tenedor de dama que gana la torre.',pistas:['Busca un jaque que, además, ataque la torre de c4.'],
    bien:'¡Correcto! Df1+ da jaque por la columna f y ataca la torre de c4 por la diagonal.'}
};

/* N2-008 · Tenedores de alfil y de torre */
L['N2-008']={
  tactica:true, motivo:'Tenedor de alfil o de torre',
  objetivo:'Vas a aprender que el alfil y la torre también hacen tenedores.',
  idea:'El **alfil** ataca en dos diagonales y la **torre** en una fila y una columna. Si dos piezas rivales quedan en sus líneas, puede atacarlas a la vez.',
  descubre:{fen:'8/ppk2p1p/5Bp1/8/5n2/8/PP3PPP/5K2 w - - 0 1',di:'Busca un jaque de alfil que, además, ataque otra pieza.'},
  observa:[
    {jugada:'f6e5',flechas:[['e5','c7','ataque'],['e5','f4','ataque']],marcas:[['c7','jaque'],['f4','amenazada']],di:'Ae5+: el alfil da jaque por una diagonal y ataca al caballo de f4 por la otra.',sencillo:'El alfil ataca en dos diagonales a la vez.'},
    {jugada:'c7c6',di:'…Rc6: el rey se aparta.',sencillo:'El rey sale del jaque.'},
    {jugada:'e5f4',marcas:[['f4','clave']],di:'Axf4: el alfil gana el caballo.',sencillo:'El alfil se come el caballo.'},
    {fen:'6k1/pp5p/6p1/3R4/2n4b/8/PP4PP/7K w - - 0 1',jugada:'d5d4',flechas:[['d4','c4','ataque'],['d4','h4','ataque']],marcas:[['c4','amenazada'],['h4','amenazada']],di:'Con la torre pasa lo mismo: Td4 ataca al caballo de c4 y al alfil de h4 en la misma fila.',sencillo:'La torre ataca dos piezas en la misma fila.'}
  ],
  comprende:{di:'Mira las líneas de tus alfiles y torres: ¿hay dos piezas rivales sin defensa que puedas atacar desde una misma casilla?'},
  practica:{fen:'8/1p3p1p/4k3/1B6/8/1n6/1P3PP1/1K6 w - - 0 1',linea:['b5c4'],
    di:'Tenedor de alfil: encuentra el jaque que gana el caballo.',pistas:['Busca una diagonal que llegue al rey de e6.'],
    bien:'¡Bien! Ac4+ da jaque y ataca el caballo de b3.'},
  hazlo:{fen:'7k/pp4pp/8/2N4B/3r4/6P1/PP5P/6K1 b - - 0 1',linea:['d4d5'],
    di:'Juegas con negras: tenedor de torre.',pistas:['Busca una casilla de la quinta fila.'],
    bien:'¡Correcto! …Td5 ataca el caballo de c5 y el alfil de h5.'},
  comprueba:{fen:'r5k1/p5pp/1p6/3p4/8/5B2/PP3PPP/6K1 w - - 0 1',linea:['f3d5'],
    di:'Busca un tenedor de alfil que gane la torre.',pistas:['Captura un peón dando jaque…','…y mira qué más ataca el alfil desde allí.'],
    bien:'¡Excelente! Axd5+ da jaque y ataca la torre de a8.'}
};

/* N2-009 · Tenedor con el rey */
L['N2-009']={
  tactica:true, motivo:'Tenedor de rey',
  objetivo:'Vas a aprender a usar tu rey para atacar dos piezas a la vez.',
  idea:'En el final, el rey es una pieza fuerte. Puede atacar dos piezas **sin defensa** si la casilla a la que va es **segura**.',
  descubre:{fen:'8/p6p/2k5/4n3/6b1/4K3/P6P/1R6 w - - 0 1',di:'En los finales el rey también ataca. ¿Puede tu rey atacar dos piezas a la vez?'},
  observa:[
    {jugada:'e3f4',flechas:[['f4','e5','ataque'],['f4','g4','ataque']],marcas:[['e5','amenazada'],['g4','amenazada']],di:'Rf4: el rey ataca al caballo de e5 y al alfil de g4, que no se defienden entre sí.',sencillo:'El rey se acerca y ataca a dos piezas.'},
    {jugada:'g4e2',di:'…Ae2: las negras salvan el alfil…',sencillo:'Las negras salvan una pieza.'},
    {jugada:'f4e5',marcas:[['e5','clave']],di:'…y Rxe5 gana el caballo.',sencillo:'El rey se come la otra.'}
  ],
  comprende:{di:'Antes de un tenedor de rey comprueba dos cosas: que las piezas atacadas no estén defendidas y que la casilla del rey no esté atacada.'},
  practica:{fen:'5k2/p6p/8/4n3/2b5/4K3/P5RP/8 w - - 0 1',linea:['e3d4'],
    di:'Usa tu rey para atacar dos piezas a la vez.',pistas:['Busca una casilla junto al alfil y al caballo.'],
    bien:'¡Bien! Rd4 ataca al alfil de c4 y al caballo de e5.'},
  hazlo:{fen:'3r4/p5Np/4B3/4k3/8/8/PK5P/8 b - - 0 1',linea:['e5f6'],
    di:'Juegas con negras: tenedor de rey.',pistas:['¿Qué casilla está junto al alfil y al caballo blancos?'],
    bien:'¡Correcto! …Rf6 ataca al alfil de e6 y al caballo de g7.'},
  comprueba:{fen:'7k/p6p/3n4/8/3K1n2/8/P6P/R7 w - - 0 1',linea:['d4e5'],
    di:'Encuentra el tenedor de rey.',pistas:['Los dos caballos negros están a una casilla de distancia de un mismo punto.'],
    bien:'¡Excelente! Re5 ataca los caballos de d6 y f4.'}
};

/* N2-010 · Clavada absoluta */
L['N2-010']={
  tactica:true, motivo:'Clavada absoluta',
  objetivo:'Vas a reconocer las piezas clavadas a su rey y a aprovecharlas.',
  idea:'Una pieza está en **clavada absoluta** cuando, detrás de ella, está su **rey**: no puede moverse, porque dejaría al rey en jaque.',
  descubre:{fen:'r1bqkbnr/ppp2ppp/2np4/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',di:'El alfil de b5 apunta al rey negro, pero el caballo de c6 está en medio. ¿Puede moverse ese caballo?'},
  observa:[
    {flechas:[['b5','e8','linea']],marcas:[['c6','clave'],['e8','clave']],di:'El alfil de b5, el caballo de c6 y el rey de e8 están en la misma diagonal.',sencillo:'Alfil, caballo y rey en una misma línea.'},
    {flechas:[['b5','e8','linea']],marcas:[['c6','clave']],di:'Si el caballo se moviera, el alfil atacaría al rey. Eso está **prohibido**: el caballo está clavado (clavada absoluta).',sencillo:'El caballo no puede moverse: dejaría a su rey en jaque.'},
    {flechas:[['b5','e8','linea']],marcas:[['e5','clave']],di:'Mientras dure la clavada, el caballo tampoco puede capturar: su «defensa» de e5 o d4 no vale.',sencillo:'Una pieza clavada no defiende de verdad.'}
  ],
  comprende:{di:'Busca líneas (filas, columnas o diagonales) donde estén una pieza rival y, detrás, su rey. Esa pieza no puede moverse.'},
  practica:{tipo:'casilla',fen:'r1bqk2r/pppp1ppp/2n2n2/4p3/1b2P3/2NP1N2/PPP2PPP/R1BQKB1R w KQkq - 1 5',verificar:'clavadas:w',casillas:['c3'],
    di:'Toca la pieza blanca que está clavada a su rey.',pista:'Busca un alfil negro que apunte al rey blanco.',
    bien:'¡Bien! El caballo de c3 no puede moverse: el alfil de b4 atacaría al rey.'},
  hazlo:{fen:'3r4/5kpp/8/8/8/2n1Q3/6PP/4K3 b - - 0 1',linea:['d8e8'],
    di:'Juegas con negras. Crea una clavada absoluta que gane la dama.',pistas:['La dama y el rey blancos están en la misma columna.','Pon tu torre en esa columna.'],
    bien:'¡Excelente! …Te8 clava la dama contra el rey: no puede escapar.'},
  comprueba:{fen:'4k2r/pp3ppp/3p4/4n3/2b5/8/PP1N1PPP/4R1K1 w k - 0 1',linea:['d2c4'],objetivoEquilibrio:true,
    di:'El caballo de e5 está clavado. Aprovéchalo: ¿qué pieza negra ya no está defendida de verdad?',
    pistas:['El caballo de e5 «defiende» al alfil de c4, pero no puede moverse.'],
    bien:'¡Correcto! Cxc4: el caballo clavado no puede recapturar.'}
};

/* N2-011 · Clavada relativa */
L['N2-011']={
  tactica:true, motivo:'Clavada relativa',
  objetivo:'Vas a distinguir la clavada relativa y a ganar material con ella.',
  idea:'En la **clavada relativa**, detrás de la pieza clavada hay otra **más valiosa que no es el rey**. Moverla es legal, pero cuesta material.',
  descubre:{fen:'rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4',di:'El alfil blanco de g5 apunta al caballo de f6, y detrás está la dama negra. ¿Puede moverse el caballo?'},
  observa:[
    {flechas:[['g5','d8','linea']],marcas:[['f6','clave'],['d8','clave']],di:'Alfil de g5, caballo de f6 y dama de d8: en la misma diagonal.',sencillo:'Alfil, caballo y dama en una misma línea.'},
    {flechas:[['g5','d8','linea']],marcas:[['f6','clave']],di:'El caballo **puede** moverse (es legal), pero entonces el alfil capturaría la dama. Es una **clavada relativa**.',sencillo:'El caballo puede moverse, pero perdería la dama.'},
    {jugada:'f8e7',marcas:[['e7','clave']],di:'4…Ae7: lo habitual es romper la clavada poniendo una pieza en medio.',sencillo:'El alfil negro se pone en medio y protege a la dama.'}
  ],
  comprende:{di:'Absoluta: detrás está el rey (moverse es ilegal). Relativa: detrás hay otra pieza valiosa (moverse es legal, pero sale caro).'},
  practica:{tipo:'casilla',fen:'rnbqkb1r/ppp2ppp/4pn2/3p2B1/2PP4/2N5/PP2PPPP/R2QKBNR b KQkq - 3 4',casillas:['d8'],
    di:'El caballo de f6 **puede** moverse, pero algo quedaría expuesto. Toca la pieza negra que el alfil de g5 capturaría.',pista:'Sigue la diagonal del alfil de g5 más allá del caballo.',bien:'¡Exacto! Detrás del caballo está la dama de d8: por eso es una clavada relativa.'},
  hazlo:{fen:'4q1k1/p2r1ppp/1p3n2/8/8/3B4/PPQ2PPP/R5K1 w - - 0 1',linea:['d3b5'],
    di:'Crea una clavada relativa que gane material.',pistas:['Busca una diagonal donde estén la torre de d7 y la dama de e8.'],
    bien:'¡Muy bien! Ab5 clava la torre contra la dama: si la torre se va, cae la dama.'},
  comprueba:{fen:'r2q1rk1/ppp3p1/3p1n2/3b2B1/8/2N5/PP3PPP/R3QRK1 w - - 0 1',linea:['c3d5'],acepta:{0:['g5f6']},
    di:'El caballo de f6 está clavado a su dama. ¿Qué pieza negra queda sin defensa real?',
    pistas:['El caballo de f6 «defiende» al alfil de d5… pero si captura, pierde la dama.'],
    bien:'¡Correcto! Ganas el alfil de d5: el caballo clavado no podía defenderlo de verdad.'}
};

/* N2-012 · Ganar la pieza clavada: atacarla con un peón */
L['N2-012']={
  tactica:true, motivo:'Atacar la pieza clavada',
  objetivo:'Vas a ganar una pieza clavada atacándola con un peón.',
  idea:'Una pieza clavada **no puede huir**. Si la atacas con algo que vale menos (por ejemplo, un **peón**), la ganas.',
  descubre:{fen:'4k2r/pp3ppp/4n3/8/3P4/8/PP3PPP/4R1K1 w k - 0 1',di:'El caballo de e6 está clavado: detrás está su rey. ¿Qué pasa si lo atacas con un peón?'},
  observa:[
    {flechas:[['e1','e8','linea']],marcas:[['e6','clave']],di:'La torre de e1 clava el caballo de e6 contra el rey de e8.',sencillo:'El caballo negro no puede moverse.'},
    {jugada:'d4d5',flechas:[['d5','e6','ataque']],marcas:[['e6','amenazada']],di:'d5: el peón ataca al caballo clavado. El caballo no puede huir.',sencillo:'El peón ataca al caballo, que no puede escapar.'},
    {jugada:'e8d7',di:'…Rd7: las negras deshacen la clavada…',sencillo:'El rey negro se aparta.'},
    {jugada:'d5e6',marcas:[['d7','jaque']],di:'…pero ya es tarde: dxe6+ captura el caballo con jaque.',sencillo:'El peón se come el caballo.'},
    {jugada:'f7e6',di:'…fxe6. Las blancas ganaron un caballo (3) a cambio de un peón (1).',sencillo:'Las blancas ganaron material.'}
  ],
  comprende:{di:'Cuando veas una pieza clavada, pregúntate: ¿puedo atacarla otra vez, mejor con un peón?'},
  practica:{fen:'r3k3/1p3ppp/2n5/1B6/P2P4/8/1P3PP1/5RK1 w q - 0 1',linea:['d4d5'],
    di:'El alfil de b5 clava el caballo de c6. Atácalo con un peón.',pistas:['¿Qué peón puede atacar la casilla c6?'],
    bien:'¡Bien! d5 ataca al caballo clavado: no puede moverse.'},
  hazlo:{fen:'5rk1/1p3pp1/8/p2p4/1b6/2N5/1P3PPP/R3K3 b Q - 0 1',linea:['d5d4'],
    di:'Juegas con negras. El caballo blanco está clavado. Gánalo.',pistas:['El alfil de b4 clava el caballo de c3 contra el rey.','Atácalo con un peón.'],
    bien:'¡Correcto! …d4 ataca al caballo clavado.'},
  comprueba:{fen:'4r1k1/pp3ppp/8/3p4/8/4N3/PP3PPP/4K2R b K - 0 1',linea:['d5d4'],objetivoEquilibrio:true,
    di:'Juegas con negras. Encuentra la pieza clavada y gánala.',pistas:['La torre de e8 clava el caballo de e3 contra el rey de e1.'],
    bien:'¡Excelente! …d4 ataca al caballo clavado, que no puede escapar.'}
};

/* N2-013 · Enfilada (pincho) */
L['N2-013']={
  tactica:true, motivo:'Enfilada',
  objetivo:'Vas a aprender a atacar una pieza valiosa para ganar la que tiene detrás.',
  idea:'En la **enfilada** (o pincho) atacas primero la pieza **más valiosa**; cuando se aparta, capturas la que estaba **detrás**. Es lo contrario de la clavada.',
  descubre:{fen:'8/8/1r3k2/8/8/8/8/6KR w - - 0 1',di:'¿Puedes atacar al rey negro de forma que, al apartarse, deje sin protección la torre que tiene detrás?'},
  observa:[
    {jugada:'h1h6',flechas:[['h6','f6','ataque'],['h6','b6','linea']],marcas:[['f6','jaque'],['b6','clave']],di:'Th6+: jaque por la sexta fila. Detrás del rey está la torre de b6.',sencillo:'La torre da jaque y apunta también a lo que hay detrás.'},
    {jugada:'f6e5',di:'…Re5: el rey tiene que apartarse…',sencillo:'El rey se aparta.'},
    {jugada:'h6b6',marcas:[['b6','clave']],di:'…y Txb6 captura la torre. Eso es una **enfilada**.',sencillo:'La torre se come la torre de atrás.'}
  ],
  comprende:{di:'Busca líneas donde el rey o la dama rival tengan otra pieza detrás. Ataca primero la más valiosa.'},
  practica:{fen:'r7/6p1/8/3k4/8/6PP/7K/5B2 w - - 0 1',linea:['f1g2'],
    di:'Encuentra la enfilada de alfil.',pistas:['Busca un jaque por la gran diagonal que termina en a8.'],
    bien:'¡Bien! Ag2+ y, cuando el rey se aparte, el alfil captura la torre de a8.'},
  hazlo:{fen:'r5k1/5pp1/7p/8/8/8/2K2Q2/8 b - - 0 1',linea:['a8a2'],
    di:'Juegas con negras. Busca la enfilada que gana la dama.',pistas:['El rey y la dama blancos están en la segunda fila.'],
    bien:'¡Excelente! …Ta2+ y, tras el jaque, la torre captura la dama de f2.'},
  comprueba:{fen:'8/8/8/8/2k3q1/8/6PP/R6K w - - 0 1',linea:['a1a4'],
    di:'El rey y la dama negros están en la misma fila. ¡Aprovéchalo!',pistas:['Da jaque por la cuarta fila.'],
    bien:'¡Correcto! Ta4+ y, cuando el rey se aparte, Txg4.'}
};

/* N2-014 · Ataque descubierto */
L['N2-014']={
  tactica:true, motivo:'Ataque descubierto',
  objetivo:'Vas a aprender a mover una pieza para que ataque otra que estaba detrás.',
  idea:'En un **ataque descubierto**, una pieza se aparta de una línea y **destapa** el ataque de otra pieza. Si la que se mueve también amenaza algo (mejor, un jaque), hay dos amenazas.',
  descubre:{fen:'3q2k1/5ppp/8/3N4/8/8/5PPP/3R2K1 w - - 0 1',di:'El caballo de d5 tapa la columna d. Si se mueve, la torre de d1 atacará a la dama. ¿Adónde conviene llevarlo?'},
  observa:[
    {flechas:[['d1','d8','linea']],marcas:[['d5','clave']],di:'La torre de d1 apunta a la dama de d8, pero el caballo blanco está en medio.',sencillo:'El caballo tapa a la torre.'},
    {jugada:'d5e7',flechas:[['d1','d8','ataque'],['e7','g8','ataque']],marcas:[['g8','jaque'],['d8','amenazada']],di:'Ce7+: el caballo se aparta **dando jaque**, y la torre ataca a la dama. Es un **ataque descubierto**.',sencillo:'El caballo da jaque y destapa a la torre.'},
    {jugada:'g8h8',di:'…Rh8: las negras deben atender el jaque.',sencillo:'El rey se aparta.'},
    {jugada:'d1d8',di:'Txd8: la torre captura la dama y, con el caballo vigilando g8, ¡es mate!',sencillo:'¡La torre se come la dama y es mate!'}
  ],
  comprende:{di:'Busca tus piezas que estén «tapando» a otra pieza propia. Si la mueves con una amenaza, el rival enfrentará dos problemas.'},
  practica:{fen:'4q1k1/2r2ppp/8/8/4B3/7P/5PP1/4R1K1 w - - 0 1',linea:['e4h7','g8f8','e1e8'],objetivoEquilibrio:true,
    di:'El alfil tapa la columna e. Muévelo con jaque para que la torre ataque la dama.',pistas:['¿Qué captura del alfil da jaque al rey de g8?','Axh7+.'],
    bien:'¡Excelente! Axh7+ abre la columna e y Txe8+ cambia tu torre por la dama.'},
  hazlo:{fen:'4r1k1/5pp1/7p/4b3/8/8/2R2PPP/4Q1K1 b - - 0 1',linea:['e5h2','g1f1','e8e1'],objetivoEquilibrio:true,
    di:'Juegas con negras. Destapa el ataque de tu torre con jaque.',pistas:['El alfil de e5 puede capturar un peón dando jaque.'],
    bien:'¡Muy bien! …Axh2+ abre la columna e y …Txe1+ cambia la torre por la dama.'},
  comprueba:{fen:'4q1k1/2r2ppp/8/8/4B3/7P/4QPP1/6K1 w - - 0 1',linea:['e4h7'],objetivoEquilibrio:true,
    di:'Ahora es la dama la que está detrás del alfil. Aprovéchalo.',pistas:['Mueve el alfil con jaque.'],
    bien:'¡Correcto! Axh7+ destapa tu dama: tras el jaque, Dxe8 gana la dama negra.'}
};

/* N2-015 · Jaque descubierto */
L['N2-015']={
  tactica:true, motivo:'Jaque descubierto',
  objetivo:'Vas a aprender a dar jaque destapando una pieza y a ganar material con la pieza que se mueve.',
  idea:'En el **jaque descubierto**, el jaque lo da la pieza que estaba **detrás**. La que se mueve queda libre para capturar lo que quiera: el rival primero debe atender el jaque.',
  descubre:{fen:'4k3/1q1p1ppp/8/8/4B3/8/5PPP/4R1K1 w - - 0 1',di:'El alfil tapa la columna e. Si se mueve, la torre dará jaque al rey. ¿Qué jugada del alfil aprovecha mejor ese jaque?'},
  observa:[
    {flechas:[['e1','e8','linea'],['e4','b7','ataque']],marcas:[['b7','amenazada']],di:'Si el alfil se mueve, la torre de e1 da jaque. Y el alfil ya apunta a la dama de b7.',sencillo:'Torre detrás, alfil delante.'},
    {jugada:'e4b7',flechas:[['e1','e8','ataque']],marcas:[['e8','jaque']],di:'Axb7+: el alfil captura la dama y la torre da jaque. Es un **jaque descubierto**.',sencillo:'El alfil se come la dama y la torre da jaque.'},
    {jugada:'e8d8',di:'…Rd8: las negras atienden el jaque y no pueden recuperar nada.',sencillo:'El rey se aparta.'}
  ],
  comprende:{di:'Busca una pieza tuya que tape el jaque de otra. Al moverla, el rival debe atender a su rey y tu pieza captura o ataca sin miedo.'},
  practica:{fen:'7k/5p1p/4q1p1/8/3N4/8/1B3PPP/6K1 w - - 0 1',linea:['d4e6'],
    di:'Jaque descubierto: mueve el caballo para que el alfil dé jaque… y gana algo grande.',pistas:['El alfil de b2 apunta al rey de h8.','El caballo puede capturar la dama.'],
    bien:'¡Muy bien! Cxe6+: el alfil da jaque y el caballo se lleva la dama.'},
  hazlo:{fen:'4r1k1/5ppp/8/4b3/8/8/1Q1P1PPP/4K3 b - - 0 1',linea:['e5b2'],acepta:{0:['e5f6','e5d4','e5c3']},
    di:'Juegas con negras. Da un jaque descubierto que gane la dama.',pistas:['Si el alfil se mueve, la torre de e8 da jaque.'],
    bien:'¡Excelente! Al mover el alfil, la torre da jaque y la dama blanca está perdida.'},
  comprueba:{fen:'4k3/pp3ppp/1n6/2r5/4N3/8/PP3PPP/4R1K1 w - - 0 1',linea:['e4c5'],
    di:'Encuentra el jaque descubierto que gana material.',pistas:['Si el caballo se mueve, la torre de e1 da jaque.','¿Qué puede capturar el caballo?'],
    bien:'¡Correcto! Cxc5+: la torre da jaque y el caballo se lleva la torre negra.'}
};

/* N2-016 · Jaque doble */
L['N2-016']={
  tactica:true, motivo:'Jaque doble',
  objetivo:'Vas a aprender el jaque doble y por qué obliga a mover el rey.',
  idea:'En el **jaque doble** dos piezas dan jaque a la vez: la que se mueve y la que queda destapada. No se puede tapar ni capturar los dos: **solo sirve mover el rey**.',
  descubre:{fen:'r2qkb1r/pppp1ppp/8/8/4N3/8/PPP2PPP/4R1K1 w kq - 0 1',di:'Si el caballo se mueve, la torre da jaque. ¿Y si el caballo también da jaque? Busca una jugada que dé **dos jaques a la vez**.'},
  observa:[
    {flechas:[['e1','e8','linea']],marcas:[['d8','bloqueada'],['f8','bloqueada'],['d7','bloqueada'],['f7','bloqueada']],di:'El rey negro está rodeado por sus propias piezas: d8, f8, d7 y f7 están ocupadas.',sencillo:'El rey negro casi no tiene casillas.'},
    {jugada:'e4f6',flechas:[['e1','e8','ataque'],['f6','e8','ataque']],marcas:[['e8','jaque']],di:'Cf6: jaque del caballo **y** jaque de la torre a la vez. Contra un jaque doble solo sirve mover el rey… y aquí no tiene casillas. ¡Mate!',sencillo:'¡Dos jaques a la vez y el rey no puede moverse: mate!'}
  ],
  comprende:{di:'Ante un jaque doble no vale capturar una de las piezas ni tapar un jaque: el otro seguiría. El rey tiene que moverse.'},
  practica:{fen:'4r1k1/ppp2ppp/8/4n3/8/8/PPPP1PPP/R2QKB1R b KQ - 0 1',linea:['e5f3'],meta:'mate',
    di:'Juegas con negras: mate en una con jaque doble.',pistas:['Si el caballo se mueve, la torre de e8 da jaque.','Busca una casilla desde donde el caballo también dé jaque.'],
    bien:'¡Mate! Jaque doble del caballo y de la torre: el rey blanco no tiene adónde ir.'},
  hazlo:{fen:'5rk1/pp4pp/8/q2N4/8/1B1Q4/PP3PPP/6K1 w - - 0 1',linea:['d5f6','g8h8','d3h7'],meta:'mate',
    di:'Mate en dos. Empieza con un jaque doble.',pistas:['Si el caballo se aparta, el alfil de b3 da jaque.','Tras el jaque doble, la dama remata en h7.'],
    bien:'¡Excelente! Cf6+ es jaque doble: el rey debe ir a h8 y Dxh7 es mate.'},
  comprueba:{fen:'2q1k3/5ppp/8/8/4N3/8/5PPP/4R1K1 w - - 0 1',linea:['e4d6','e8d7','d6c8'],
    di:'Usa un jaque doble para ganar la dama.',pistas:['El caballo puede dar jaque desde una casilla que, además, ataque c8.'],
    bien:'¡Correcto! Cd6+ es jaque doble: el rey se mueve y el caballo captura la dama.'}
};

/* N2-017 · Pieza atrapada */
L['N2-017']={
  tactica:true, motivo:'Pieza atrapada',
  objetivo:'Vas a reconocer piezas sin casillas de escape y a capturarlas.',
  idea:'Una pieza está **atrapada** cuando todas sus casillas están ocupadas o vigiladas. Basta con atacarla para ganarla.',
  descubre:{fen:'6k1/5ppp/8/8/8/8/bPP2PPP/2K5 w - - 0 1',di:'El alfil negro de a2 se comió un peón. ¿Tiene ahora casillas seguras? ¿Puedes encerrarlo?'},
  observa:[
    {flechas:[['a2','b1','mov'],['a2','b3','mov']],di:'El alfil de a2 solo tiene dos salidas: b1 y b3. El rey blanco ya vigila b1.',sencillo:'El alfil casi no tiene salidas.'},
    {jugada:'b2b3',marcas:[['b1','bloqueada'],['b3','bloqueada']],di:'b3: el peón le cierra la última salida. El alfil está **atrapado**.',sencillo:'El peón le tapa la salida.'},
    {jugada:'g8f8',di:'…Rf8: las negras no pueden salvarlo.',sencillo:'Las negras no pueden ayudarlo.'},
    {jugada:'c1b2',flechas:[['b2','a2','ataque']],marcas:[['a2','amenazada']],di:'Rb2: el rey ataca al alfil, que no tiene adónde ir.',sencillo:'El rey va por el alfil.'},
    {jugada:'a2b3',di:'…Axb3: lo único que pueden hacer las negras es cambiarlo por un peón.',sencillo:'El alfil se entrega por un peón.'},
    {jugada:'c2b3',di:'cxb3: las blancas ganaron un alfil (3) por dos peones.',sencillo:'Las blancas ganaron material.'}
  ],
  comprende:{di:'Las piezas cerca del borde o metidas entre peones rivales suelen tener pocas salidas. Cuenta sus casillas libres.'},
  practica:{fen:'8/ppp2kpB/8/8/8/8/PPP5/2K5 b - - 0 1',linea:['g7g6'],objetivoEquilibrio:true,
    di:'Juegas con negras. El alfil blanco de h7 está muy metido. Atrápalo.',pistas:['Cierra la diagonal por la que podría escapar.','Un peón puede taparle la salida.'],
    bien:'¡Bien! …g6 cierra la salida: el alfil ya no escapa y tu rey irá a por él.'},
  hazlo:{fen:'2k5/Bpp2ppp/8/8/8/8/5PPP/6K1 b - - 0 1',linea:['b7b6'],
    di:'Juegas con negras. Encierra al alfil de a7.',pistas:['Quítale la casilla b6.'],
    bien:'¡Correcto! …b6 encierra al alfil: tu rey irá a capturarlo.'},
  comprueba:{tipo:'casilla',fen:'4r1k1/ppp2ppp/8/8/8/5N2/PPPK1PPP/n4B1R w - - 0 1',casillas:['a1'],
    di:'Una pieza negra está atrapada y se perderá. Tócala.',pista:'Mira las esquinas del tablero.',
    bien:'¡Correcto! El caballo de a1 solo puede ir a b3 o c2, y ambas casillas están vigiladas.'}
};

/* N2-018 · Eliminación del defensor */
L['N2-018']={
  tactica:true, motivo:'Eliminación del defensor',
  objetivo:'Vas a aprender a capturar la pieza que defiende a otra para ganarla después.',
  idea:'Si una pieza rival está defendida por **una sola** pieza, elimina ese **defensor** (capturándolo) y la pieza quedará sin protección.',
  descubre:{fen:'6k1/pp3ppp/5n2/3b2B1/8/8/PP3PPP/3R2K1 w - - 0 1',di:'La torre ataca al alfil de d5, pero el caballo de f6 lo defiende. ¿Y si eliminas al defensor?'},
  observa:[
    {flechas:[['d1','d5','ataque'],['f6','d5','defensa']],marcas:[['d5','defendida']],di:'El alfil de d5 está atacado por la torre y defendido solo por el caballo de f6.',sencillo:'El alfil tiene un único defensor.'},
    {jugada:'g5f6',marcas:[['f6','clave']],di:'Axf6: el alfil blanco captura al defensor.',sencillo:'Primero se come al que defiende.'},
    {jugada:'g7f6',di:'…gxf6: las negras recuperan la pieza…',sencillo:'Las negras recapturan.'},
    {jugada:'d1d5',marcas:[['d5','clave']],di:'…pero el alfil de d5 se quedó sin defensa: Txd5 lo gana.',sencillo:'Ahora el alfil está solo y cae.'}
  ],
  comprende:{di:'Pregúntate: ¿quién defiende la pieza que quiero ganar? Si es una sola, ¿puedo capturarla o desviarla?'},
  practica:{fen:'2r5/pp3pkp/5np1/3b2B1/8/7P/PP3PP1/3R2K1 w - - 0 1',linea:['g5f6','g7f6','d1d5'],objetivoEquilibrio:true,
    di:'El alfil de d5 solo está defendido por el caballo. Elimina al defensor.',pistas:['Captura el caballo de f6… ¡con jaque!','Luego, la torre gana el alfil.'],
    bien:'¡Muy bien! Axf6+ elimina al defensor y Txd5 gana el alfil.'},
  hazlo:{fen:'3r2k1/pp3pp1/7p/8/3B2b1/5NP1/PP3PKP/2R5 b - - 0 1',linea:['g4f3','g2f3','d8d4'],objetivoEquilibrio:true,
    di:'Juegas con negras. Elimina al defensor del alfil de d4.',pistas:['¿Quién defiende el alfil de d4?','Captúralo con jaque.'],
    bien:'¡Correcto! …Axf3+ elimina al defensor y …Txd4 gana el alfil.'},
  comprueba:{fen:'r2q1rk1/ppp2ppp/5n2/6N1/8/8/PBQ2PPP/R5K1 w - - 0 1',linea:['b2f6'],
    di:'El caballo de f6 defiende la casilla h7. Elimínalo y aprovecha.',pistas:['Tu dama y tu caballo atacan h7.','Si capturas el caballo de f6, amenazas mate en h7.'],
    bien:'¡Excelente! Axf6 elimina al defensor: amenaza Dxh7# y, si las negras se tapan con …g6, el alfil captura la dama de d8.'}
};

/* N2-019 · Prevenir tenedores y clavadas del rival */
L['N2-019']={
  tactica:false,
  objetivo:'Vas a aprender a descubrir las amenazas del rival y a evitarlas a tiempo.',
  idea:'Antes de cada jugada pregúntate: **¿qué quiere hacer mi rival?** Si prepara un tenedor o una clavada, una jugada a tiempo lo evita.',
  descubre:{fen:'r3k2r/ppp2ppp/8/8/3n4/8/PP3PPP/R1B1KB1R w KQkq - 0 1',di:'Antes de mover, pregúntate qué quiere hacer tu rival. Aquí el caballo negro prepara algo peligroso.'},
  observa:[
    {flechas:[['d4','c2','mov']],marcas:[['c2','clave']],di:'El caballo amenaza …Cc2+: un tenedor al rey de e1 y a la torre de a1.',sencillo:'El caballo quiere saltar a c2.'},
    {jugada:'f1d3',flechas:[['d3','c2','defensa']],di:'Ad3: el alfil vigila c2 y, además, se desarrolla. El tenedor ya no funciona.',sencillo:'El alfil vigila c2 y el tenedor desaparece.'},
    {fen:'r3k2r/ppp2ppp/8/8/3n4/7P/PP3PP1/R1B1KB1R b KQkq - 0 1',jugada:'d4c2',flechas:[['c2','e1','ataque'],['c2','a1','ataque']],marcas:[['e1','jaque'],['a1','amenazada']],di:'En cambio, si las blancas juegan sin pensar (por ejemplo, h3), llega …Cc2+ y se pierde la torre.',sencillo:'Si no te das cuenta, el caballo da el tenedor.'}
  ],
  comprende:{di:'Mira la última jugada del rival: ¿qué casillas ataca ahora? ¿Puede dar jaque, capturar o hacer un tenedor?'},
  hazlo:{fen:'r3k2r/ppp2ppp/8/8/3n4/8/PP3PPP/R1B1KB1R w KQkq - 0 1',linea:['f1d3'],concepto:true,acepta:{0:['e1d2','e1d1']},
    di:'Evita el tenedor con una jugada útil.',pistas:['Vigila la casilla c2.','Un alfil puede vigilarla y desarrollarse a la vez.'],
    mal:{'*':'Así el caballo todavía puede saltar a c2. Vigila esa casilla.'},
    bien:'¡Bien! La casilla c2 ya está vigilada: el tenedor no funciona.'},
  comprueba:{fen:'6k1/5ppp/8/3pp3/8/3B1N2/5PPP/6K1 w - - 0 1',linea:['f3e5'],concepto:true,
    di:'Las negras amenazan **…e4**, un tenedor de peón contra tu alfil y tu caballo. Evítalo y gana material.',pistas:['¿Puedes capturar el peón que daría el tenedor?','El caballo de f3 captura en e5.'],
    mal:{'*':'Busca una jugada que evite el tenedor y además gane material.'},bien:'¡Correcto! Cxe5 se come el peón que iba a dar el tenedor.'}
};

L['N2-005']={
  tactica:true, motivo:'Tenedor de caballo',
  objetivo:'Vas a aprender a atacar dos piezas a la vez con el caballo.',
  idea:'Un **tenedor de caballo** ataca dos piezas valiosas a la vez. Si una es el rey (jaque), el rival no tiene tiempo de salvar la otra.',
  descubre:{fen:'r3k3/pp3ppp/8/3N4/8/8/PPP2PPP/6K1 w - - 0 1',
    di:'Mira el caballo blanco de d5. ¿Hay alguna casilla desde donde ataque a la vez al rey y a la torre negra? Puedes mover las piezas para probar.'},
  observa:[
    {flechas:[['d5','c7','mov']], di:'El caballo de d5 puede saltar a **c7**. Ninguna pieza negra defiende esa casilla.',
     sencillo:'Fíjate solo en el caballo. Salta en forma de «L»: de d5 puede llegar a c7.'},
    {jugada:'d5c7', flechas:[['c7','e8','ataque'],['c7','a8','ataque']], marcas:[['e8','jaque'],['a8','amenazada']],
     di:'¡Jaque! Desde c7 el caballo ataca **al rey de e8 y a la torre de a8** al mismo tiempo. Eso es un tenedor.',
     sencillo:'Primero ataca al rey: es jaque. Y desde la misma casilla también ataca a la torre. Dos ataques con una sola jugada.'},
    {jugada:'e8d8', marcas:[['a8','indefensa']],
     di:'Las negras están obligadas a sacar al rey del jaque. No les queda tiempo para salvar la torre.',
     sencillo:'Cuando te dan jaque, lo primero es salvar al rey. Por eso la torre se queda sola.'},
    {jugada:'c7a8', marcas:[['a8','clave']],
     di:'El caballo captura la torre. Las blancas ganaron una torre (5 puntos) sin entregar nada.',
     sencillo:'Resultado: el caballo se come la torre. ¡Ganaste material gracias al tenedor!'}
  ],
  comprende:{di:'El tenedor funciona porque el rival solo puede salvar una de las dos piezas. Con jaque es aún más fuerte: primero debe mover el rey.'},
  practica:{fen:'2q1k3/5ppp/8/8/4N3/8/1B3PPP/6K1 w - - 0 1', linea:['e4d6','e8d7','d6c8'],
    di:'Las blancas pueden dar un tenedor al rey y a la dama. ¿Desde qué casilla?',
    pistas:['Busca una casilla desde donde el caballo ataque a la vez e8 y c8.','Mueve el caballo de e4.'],
    bien:'¡Muy bien! Jaque al rey y ataque a la dama: después del jaque, el caballo se come la dama.'},
  hazlo:{fen:'6k1/5ppp/8/8/3n4/1b6/5PPP/R3K3 b - - 0 1', linea:['d4c2','e1d2','c2a1'],
    di:'Ahora juegas con las negras. Encuentra el tenedor y gana material.',
    pistas:['¿Qué casilla ataca al mismo tiempo e1 y a1?','El caballo de d4 puede dar jaque.'],
    bien:'¡Eso es! Nc2+ ataca al rey y a la torre de a1; después del jaque, la torre cae.'},
  comprueba:{fen:'6k1/3q1p1p/4b1p1/8/4N3/1P6/P1Q2PPP/6K1 w - - 0 1', linea:['e4f6','g8g7','f6d7'],
    di:'Las blancas tienen un tenedor ganador. Encuéntralo.',
    pistas:['¿Desde qué casilla atacaría el caballo al rey de g8 y a la dama de d7?','La casilla es f6: ningún peón negro la defiende.'],
    bien:'¡Correcto! Cf6+ es un tenedor de rey y dama: tras el jaque, el caballo captura la dama.'}
};
})();
