/* Aprende Ajedrez · lecciones del NIVEL CUATRO (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};

/* N4-002 · Despeje de líneas */
L['N4-002']={
  tactica:true, motivo:'Despeje de líneas',
  objetivo:'Vas a aprender a apartar una pieza propia que tapa una línea importante.',
  idea:'A veces una pieza tuya **tapa la línea** de otra. Si la apartas **con amenaza** (mejor con jaque), la línea se abre y las dos atacan a la vez.',
  descubre:{fen:'7k/7p/8/6N1/8/8/5P1P/r5RK w - - 0 1',di:'Tu torre de g1 está tapada por tu caballo. ¿Qué pasa si el caballo salta?'},
  observa:[
    {flechas:[['g1','g5','linea']],marcas:[['g5','clave']],di:'El caballo de g5 tapa la columna g de tu torre.',sencillo:'El caballo estorba a la torre.'},
    {jugada:'g5f7',flechas:[['g1','g8','linea']],marcas:[['h8','jaque'],['g8','bloqueada'],['g7','bloqueada']],di:'Cf7#: el caballo da jaque y despeja la columna g. La torre vigila g8 y g7. ¡Mate!',sencillo:'El caballo se aparta dando jaque y la torre cierra la salida.'}
  ],
  comprende:{di:'Si una pieza tuya tapa otra, busca moverla con jaque o con una amenaza fuerte.'},
  practica:{fen:'7k/7p/8/6N1/8/8/5P1P/r5RK w - - 0 1',linea:['g5f7'],meta:'mate',
    di:'Despeja la columna g y da mate.',pistas:['El caballo puede dar jaque al rey de h8.'],
    bien:'¡Mate! El caballo despejó la línea de la torre.'},
  hazlo:{fen:'R5rk/5p1p/8/8/6n1/8/7P/7K b - - 0 1',linea:['g4f2'],meta:'mate',
    di:'Juegas con negras. Despeja la columna g y da mate.',pistas:['Tu caballo tapa a tu torre.'],
    bien:'¡Correcto! …Cf2#.'},
  comprueba:{fen:'k7/p7/8/1N6/8/8/P1P5/KR5r w - - 0 1',linea:['b5c7'],meta:'mate',
    di:'Ahora en el otro lado del tablero. Da mate.',pistas:['Tu caballo tapa la columna b.'],
    bien:'¡Excelente! Cc7#.'}
};

/* N4-003 · Despeje de casillas */
L['N4-003']={
  tactica:true, motivo:'Despeje de casillas',
  objetivo:'Vas a aprender a dejar libre una casilla para otra pieza tuya.',
  idea:'Si una pieza tuya **ocupa la casilla** que necesita otra, apártala **con tempo** (con jaque, por ejemplo) y la otra pieza entra allí.',
  descubre:{fen:'5r1k/6pB/8/5p1Q/8/8/5PPP/6K1 w - - 0 1',di:'Tu dama querría entrar en h7, pero allí está tu alfil. ¿Cómo lo apartas?'},
  observa:[
    {flechas:[['h5','h7','linea']],marcas:[['h7','clave']],di:'El alfil ocupa h7, la casilla de mate de tu dama.',sencillo:'El alfil ocupa la casilla buena.'},
    {jugada:'h7g6',marcas:[['h8','jaque']],di:'Ag6+: el alfil se aparta y la dama da jaque por la columna h.',sencillo:'El alfil se aparta con jaque.'},
    {jugada:'h8g8',di:'…Rg8: única jugada.',sencillo:'El rey sube a g8.'},
    {jugada:'h5h7',marcas:[['g8','jaque']],di:'Dh7#: la dama entra en la casilla que dejó libre el alfil, protegida por él.',sencillo:'¡Mate! La dama ocupa la casilla libre.'}
  ],
  comprende:{di:'Pregúntate: ¿qué casilla necesito? Si la ocupa una pieza mía, ¿puedo moverla con jaque?'},
  practica:{fen:'5r1k/6pB/8/5p1Q/8/8/5PPP/6K1 w - - 0 1',linea:['h7g6','h8g8','h5h7'],meta:'mate',
    di:'Despeja la casilla h7 y da mate en dos.',pistas:['Mueve el alfil con jaque.','Después, la dama entra en h7.'],
    bien:'¡Mate! Ag6+, Rg8 y Dh7#.'},
  hazlo:{fen:'6k1/5ppp/8/8/5P1q/8/6Pb/5R1K b - - 0 1',linea:['h2g3','h1g1','h4h2'],meta:'mate',
    di:'Juegas con negras. Despeja la casilla h2 y da mate en dos.',pistas:['Mueve el alfil con jaque.'],
    bien:'¡Correcto! …Ag3+, Rg1 y …Dh2#.'},
  comprueba:{fen:'k1r5/Bp6/8/Q1p5/8/8/PPP5/1K6 w - - 0 1',linea:['a7b6','a8b8','a5a7'],meta:'mate',
    di:'Ahora en el flanco de dama. Mate en dos.',pistas:['El alfil ocupa la casilla de mate.'],
    bien:'¡Excelente! Ab6+, Rb8 y Da7#.'}
};

/* N4-004 · Bloqueo (Nivel II) */
L['N4-004']={
  tactica:true, motivo:'Bloqueo',
  objetivo:'Vas a aprender a obligar a una pieza rival a tapar la salida de su propio rey.',
  idea:'En el **bloqueo** ofreces una pieza para que el rival la **capture**. La pieza que captura queda junto a su rey y le **quita la última salida**: llega el mate.',
  descubre:{fen:'k1r5/pp6/N7/8/5Q2/8/PPP5/1K6 w - - 0 1',di:'El rey negro está en a8, rodeado de sus peones. Solo le queda una casilla libre. ¿Cuál?'},
  observa:[
    {marcas:[['b8','escape']],di:'La única salida del rey es b8.',sencillo:'El rey solo puede ir a b8.'},
    {flechas:[['a6','c7','amenaza']],marcas:[['c7','clave']],di:'Tu caballo quiere dar jaque en c7, pero el rey escaparía por b8.',sencillo:'El caballo prepara un jaque.'},
    {jugada:'f4b8',marcas:[['a8','jaque']],di:'Db8+!!: entregas la dama justo en la salida del rey.',sencillo:'¡La dama se ofrece en b8!'},
    {jugada:'c8b8',marcas:[['b8','bloqueada']],di:'…Txb8: el rey no puede capturar (el caballo protege b8). La torre captura y tapa b8.',sencillo:'La torre se la come y tapa b8.'},
    {jugada:'a6c7',marcas:[['a8','jaque']],di:'Cc7#: el rey está encerrado por sus propias piezas. ¡Mate!',sencillo:'¡Mate! Su propia torre lo encerró.'}
  ],
  comprende:{di:'Si el rey rival solo tiene una salida, ofrece una pieza en esa casilla: la pieza que captura se la tapa.'},
  practica:{fen:'k1r5/pp6/N7/8/5Q2/8/PPP5/1K6 w - - 0 1',linea:['f4b8','c8b8','a6c7'],meta:'mate',
    di:'Mate en dos.',pistas:['Ofrece la dama en la única salida del rey.','Después, jaque de caballo.'],
    bien:'¡Mate! Db8+, Txb8 y Cc7#.'},
  hazlo:{fen:'r6k/pp4pp/7N/3Q4/8/8/1q4PP/6K1 w - - 0 1',linea:['d5g8','a8g8','h6f7'],meta:'mate',
    di:'Tienes menos material, pero hay mate en dos.',pistas:['Ofrece la dama en g8.','El caballo da el último jaque.'],
    bien:'¡Correcto! Dg8+, Txg8 y Cf7#: el mate de la coz.'},
  comprueba:{fen:'1k6/ppp5/8/5q2/8/n7/PP6/K1R5 b - - 0 1',linea:['f5b1','c1b1','a3c2'],meta:'mate',
    di:'Juegas con negras. Mate en dos.',pistas:['¿Cuál es la única salida del rey blanco?'],
    bien:'¡Excelente! …Db1+, Txb1 y …Cc2#.'}
};

/* N4-022 · Mate de Greco */
L['N4-022']={
  tactica:true, motivo:'Mate de Greco',
  objetivo:'Vas a aprender el mate de Greco: alfil y dama contra el rey en la esquina.',
  idea:'En el **mate de Greco** el alfil vigila **g8** desde lejos y la dama da jaque por la **columna h**. El peón de g7 encierra a su propio rey.',
  descubre:{fen:'r6k/pp4p1/8/8/2B5/8/5PPP/3Q2K1 w - - 0 1',di:'El rey negro está en h8 y la columna h está abierta. ¿Qué hace tu alfil?'},
  observa:[
    {flechas:[['c4','g8','linea']],marcas:[['g8','clave']],di:'El alfil de c4 vigila g8.',sencillo:'El alfil cierra g8.'},
    {jugada:'d1h5',marcas:[['h8','jaque']],di:'Dh5#: la dama da jaque por la columna h. ¡Mate de Greco!',sencillo:'¡Mate por la columna h!'}
  ],
  comprende:{di:'Alfil en la diagonal hacia g8 y columna h abierta: busca el jaque de dama.'},
  practica:{fen:'r6k/pp4p1/8/8/2B5/8/5PPP/3Q2K1 w - - 0 1',linea:['d1h5'],meta:'mate',
    di:'Da el mate de Greco.',pistas:['La columna h está libre.'],bien:'¡Mate de Greco!'},
  hazlo:{fen:'3q2k1/5ppp/8/2b5/8/8/PP4P1/R6K b - - 0 1',linea:['d8h4'],meta:'mate',
    di:'Juegas con negras. Da el mate de Greco.',pistas:['Tu alfil vigila g1.'],bien:'¡Correcto! …Dh4#.'},
  comprueba:{fen:'k6r/1p4pp/8/8/5B2/8/PPP5/1K2Q3 w - - 0 1',linea:['e1a5'],meta:'mate',
    di:'Ahora en el otro rincón. Da mate.',pistas:['El alfil vigila b8.'],bien:'¡Excelente! Da5#.'}
};

/* N4-023 · Mate de Lolli */
L['N4-023']={
  tactica:true, motivo:'Mate de Lolli',
  objetivo:'Vas a aprender el mate de Lolli: dama y peón en f6 contra el enroque.',
  idea:'Un **peón en f6** protege **g7**. Si la dama llega a g7, es mate: el rey no puede capturarla.',
  descubre:{fen:'r5k1/5p1p/5PpQ/8/8/8/5PPP/6K1 w - - 0 1',di:'Tu peón de f6 está clavado como una espina en el enroque negro. ¿Qué casilla protege?'},
  observa:[
    {flechas:[['f6','g7','defensa']],marcas:[['g7','clave']],di:'El peón de f6 protege g7.',sencillo:'El peón cuida g7.'},
    {jugada:'h6g7',marcas:[['g8','jaque']],di:'Dg7#: la dama, protegida por el peón, da mate. ¡Mate de Lolli!',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Un peón propio en f6 (o f3) junto al enroque rival es una gran ayuda para la dama.'},
  practica:{fen:'r5k1/5p1p/5PpQ/8/8/8/5PPP/6K1 w - - 0 1',linea:['h6g7'],meta:'mate',
    di:'Da el mate de Lolli.',pistas:['El peón protege g7.'],bien:'¡Mate de Lolli!'},
  hazlo:{fen:'6k1/5ppp/8/8/8/5pPq/5P1P/R5K1 b - - 0 1',linea:['h3g2'],meta:'mate',
    di:'Juegas con negras. Da el mate de Lolli.',pistas:['Tu peón de f3 protege g2.'],bien:'¡Correcto! …Dg2#.'},
  comprueba:{fen:'1k5r/p1p5/QpP5/8/8/8/PPP5/1K6 w - - 0 1',linea:['a6b7'],meta:'mate',
    di:'Ahora en el flanco de dama. Da mate.',pistas:['El peón de c6 protege b7.'],bien:'¡Excelente! Db7#.'}
};

/* N4-024 · Mate de Morphy */
L['N4-024']={
  tactica:true, motivo:'Mate de Morphy',
  objetivo:'Vas a aprender el mate de Morphy: alfil y torre contra el rey en la esquina.',
  idea:'La **torre** vigila la columna **g** y el **alfil** da jaque por la gran diagonal. El peón de h7 encierra a su propio rey.',
  descubre:{fen:'r6k/7p/8/8/8/8/5P1P/2B3RK w - - 0 1',di:'Tu torre domina la columna g. ¿Dónde daría jaque tu alfil?'},
  observa:[
    {flechas:[['g1','g8','linea']],marcas:[['g8','clave'],['g7','clave']],di:'La torre vigila g8 y g7.',sencillo:'La torre cierra la columna g.'},
    {jugada:'c1b2',flechas:[['b2','h8','linea']],marcas:[['h8','jaque']],di:'Ab2#: el alfil da jaque por la gran diagonal. ¡Mate de Morphy!',sencillo:'¡Mate por la diagonal!'}
  ],
  comprende:{di:'Torre en la columna g y alfil en la gran diagonal: una pareja mortal contra el rey de h8.'},
  practica:{fen:'r6k/7p/8/8/8/8/5P1P/2B3RK w - - 0 1',linea:['c1b2'],meta:'mate',
    di:'Da el mate de Morphy.',pistas:['La gran diagonal llega hasta h8.'],bien:'¡Mate de Morphy!'},
  hazlo:{fen:'2b3rk/5p1p/8/8/8/8/7P/R6K b - - 0 1',linea:['c8b7'],meta:'mate',
    di:'Juegas con negras. Da el mate de Morphy.',pistas:['La diagonal b7–h1 está libre.'],bien:'¡Correcto! …Ab7#.'},
  comprueba:{fen:'k6r/p7/8/8/8/8/P1P5/KR3B2 w - - 0 1',linea:['f1g2'],meta:'mate',
    di:'Ahora en el otro rincón. Da mate.',pistas:['La torre vigila la columna b.'],bien:'¡Excelente! Ag2#.'}
};

/* N4-025 · Mate de Anderssen */
L['N4-025']={
  tactica:true, motivo:'Mate de Anderssen',
  objetivo:'Vas a aprender el mate de Anderssen: torre y peón contra el rey en la última fila.',
  idea:'Un **peón en g7**, protegido por el rey, vigila **f8 y h8**. La torre da jaque en h8 y el rey negro no tiene salida.',
  descubre:{fen:'6k1/6P1/5K2/8/8/8/r7/7R w - - 0 1',di:'Tu peón de g7 está junto al rey negro. ¿Qué casillas vigila?'},
  observa:[
    {flechas:[['g7','h8','ataque'],['g7','f8','ataque']],marcas:[['g7','clave']],di:'El peón vigila f8 y h8, y tu rey lo protege.',sencillo:'El peón cierra dos casillas.'},
    {jugada:'h1h8',marcas:[['g8','jaque']],di:'Th8#: la torre, protegida por el peón, da mate. ¡Mate de Anderssen!',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Un peón muy avanzado, protegido, puede encerrar al rey rival en la última fila.'},
  practica:{fen:'6k1/6P1/5K2/8/8/8/r7/7R w - - 0 1',linea:['h1h8'],meta:'mate',
    di:'Da el mate de Anderssen.',pistas:['El peón protege h8.'],bien:'¡Mate de Anderssen!'},
  hazlo:{fen:'7r/R7/8/8/8/5k2/6p1/6K1 b - - 0 1',linea:['h8h1'],meta:'mate',
    di:'Juegas con negras. Da el mate de Anderssen.',pistas:['Tu peón protege h1.'],bien:'¡Correcto! …Th1#.'},
  comprueba:{fen:'1k6/1P6/2K5/8/8/8/7r/R7 w - - 0 1',linea:['a1a8'],meta:'mate',
    di:'Ahora en el otro lado. Da mate.',pistas:['El peón protege a8.'],bien:'¡Excelente! Ta8#.'}
};

/* N4-026 · Mate de Blackburne */
L['N4-026']={
  tactica:true, motivo:'Mate de Blackburne',
  objetivo:'Vas a aprender el mate de Blackburne: dos alfiles y un caballo contra el enroque.',
  idea:'Un alfil en la **gran diagonal** vigila g7, el **caballo** protege h7 y el otro alfil da jaque desde **h7**. La torre de f8 tapa la última salida.',
  descubre:{fen:'5rk1/p4p2/8/6N1/8/3B4/1B3PPP/6K1 w - - 0 1',di:'El enroque negro no tiene peones en g7 ni en h7. ¿Cómo atacan tus tres piezas menores?'},
  observa:[
    {flechas:[['b2','g7','linea'],['g5','h7','defensa']],marcas:[['g7','clave'],['h7','clave']],di:'El alfil de b2 vigila g7 y h8; el caballo de g5 protege h7.',sencillo:'Cada pieza tiene su tarea.'},
    {jugada:'d3h7',marcas:[['g8','jaque']],di:'Ah7#: el alfil, protegido por el caballo, da mate. ¡Mate de Blackburne!',sencillo:'¡Mate con las piezas menores!'}
  ],
  comprende:{di:'Las piezas menores coordinadas pueden dar mate sin ayuda de la dama.'},
  practica:{fen:'5rk1/p4p2/8/6N1/8/3B4/1B3PPP/6K1 w - - 0 1',linea:['d3h7'],meta:'mate',
    di:'Da el mate de Blackburne.',pistas:['El caballo protege h7.'],bien:'¡Mate de Blackburne!'},
  hazlo:{fen:'6k1/1b3ppp/3b4/8/6n1/8/P4P2/5RK1 b - - 0 1',linea:['d6h2'],meta:'mate',
    di:'Juegas con negras. Da el mate de Blackburne.',pistas:['Tu caballo protege h2.'],bien:'¡Correcto! …Ah2#.'},
  comprueba:{fen:'1kr5/2p4p/8/1N6/8/4B3/PPP3B1/1K6 w - - 0 1',linea:['e3a7'],meta:'mate',
    di:'Ahora contra el enroque largo. Da mate.',pistas:['El caballo protege a7.'],bien:'¡Excelente! Aa7#.'}
};

/* N4-035 · Oposición distante */
L['N4-035']={
  tactica:false,
  objetivo:'Vas a aprender a tomar la oposición desde lejos.',
  idea:'En la **oposición distante** los reyes están en la misma columna con **tres casillas** (o cinco) en medio. Quien la tiene podrá tomar después la oposición directa.',
  descubre:{fen:'8/8/4k3/8/8/8/3KP3/8 b - - 0 1',di:'Defiendes con negras. El rey blanco está en d2. ¿Dónde pones tu rey?'},
  observa:[
    {jugada:'e6d6',marcas:[['d6','clave'],['d2','clave']],di:'…Rd6: los reyes en la misma columna con tres casillas en medio: oposición distante.',sencillo:'Los reyes, frente a frente desde lejos.'},
    {jugada:'d2d3',di:'Rd3',sencillo:'El rey blanco se acerca.'},
    {jugada:'d6d5',di:'…Rd5: ahora es oposición directa. El rey blanco no puede pasar.',sencillo:'Ya están frente a frente.'}
  ],
  comprende:{di:'Si los reyes están lejos, ponte en su misma columna con un número impar de casillas en medio.'},
  practica:{fen:'8/8/4k3/8/8/8/3KP3/8 b - - 0 1',linea:['e6d6'],objetivoEquilibrio:true,
    di:'Juegas con negras. Toma la oposición distante.',pistas:['Ponte en la columna del rey blanco.'],
    mal:{'*':'Así el rey blanco avanza y gana. Ponte en su columna, con tres casillas en medio.'},
    bien:'¡Bien! Con la oposición distante salvas la partida.'},
  hazlo:{fen:'8/8/2k5/8/8/8/3KP3/8 b - - 0 1',linea:['c6d6'],objetivoEquilibrio:true,
    di:'Juegas con negras. Toma la oposición distante.',pistas:['Busca la columna d.'],
    mal:{'*':'Así el rey blanco avanza y gana.'},
    bien:'¡Correcto! Oposición distante: tablas.'},
  comprueba:{fen:'8/3kp3/8/8/8/4K3/8/8 w - - 0 1',linea:['e3d3'],objetivoEquilibrio:true,
    di:'Ahora defiendes con blancas. Toma la oposición distante.',pistas:['Ponte en la columna del rey negro.'],
    mal:{'*':'Así el rey negro avanza y gana.'},
    bien:'¡Excelente! Tablas con la oposición distante.'}
};

/* N4-005 · Jugada silenciosa */
L['N4-005']={
  tactica:true, motivo:'Jugada silenciosa',
  objetivo:'Vas a aprender que la mejor jugada no siempre es un jaque o una captura.',
  idea:'Una **jugada silenciosa** no da jaque ni captura, pero deja al rival **sin defensa**. Pregúntate: si yo pasara, ¿qué amenazaría?',
  descubre:{fen:'6k1/4K3/8/7Q/8/8/8/8 w - - 0 1',di:'Ningún jaque da mate ahora. ¿Y si mueves el rey?'},
  observa:[
    {jugada:'e7f6',marcas:[['f6','clave']],di:'Rf6!: una jugada tranquila. Ahora el rey blanco vigila g7 y e7.',sencillo:'El rey se acerca sin dar jaque.'},
    {jugada:'g8f8',di:'…Rf8: el negro no tiene nada mejor.',sencillo:'El rey negro se mueve.'},
    {jugada:'h5f7',marcas:[['f8','jaque']],di:'Df7#: la dama, protegida por el rey, da mate.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Si no hay jaque que funcione, busca una jugada tranquila que quite casillas al rey rival.'},
  practica:{fen:'6k1/4K3/8/7Q/8/8/8/8 w - - 0 1',linea:['e7f6','g8f8','h5f7'],meta:'mate',
    di:'Mate en dos. La primera jugada no es jaque.',pistas:['Mueve el rey.','Desde f6 vigila g7 y f7.'],
    bien:'¡Mate! Rf6 era la jugada silenciosa.'},
  hazlo:{fen:'8/8/8/8/7q/8/4k3/6K1 b - - 0 1',linea:['e2f3','g1f1','h4f2'],meta:'mate',
    di:'Juegas con negras. Mate en dos con una jugada silenciosa.',pistas:['Mueve tu rey.'],
    bien:'¡Correcto! …Rf3 y …Df2#.'},
  comprueba:{fen:'Q7/7k/8/6K1/8/8/8/8 w - - 0 1',linea:['g5f6','h7h6','a8h1'],meta:'mate',
    di:'Mate en dos. Busca otra vez la jugada tranquila.',pistas:['Tu rey puede quitarle casillas al rey negro.'],
    bien:'¡Excelente! Rf6 y Dh1#.'}
};

/* N4-021 · Regalo envenenado (Nivel III, después de El peón envenenado; ejercicios de Lichess Practice: The Greek Gift) */
L['N4-021']={
  tactica:true, motivo:'Regalo envenenado',
  objetivo:'Vas a aprender el regalo envenenado: el sacrificio del alfil en h7 para atacar al rey enrocado.',
  idea:'En el **regalo envenenado** (o sacrificio griego) el alfil se entrega en **h7** con jaque. Si el rey lo acepta, el **caballo** salta a g5 y la **dama** llega a la columna h: el regalo se vuelve veneno.',
  descubre:{fen:'rnbq1rk1/pppn1ppp/4p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQq - 0 1',di:'Tu alfil apunta a h7 y el caballo negro de d7 ya no defiende el enroque. ¿Le haces un regalo al rey?'},
  observa:[
    {flechas:[['d3','h7','ataque'],['f3','g5','mov'],['d1','h5','linea']],marcas:[['h7','clave']],di:'Alfil hacia h7, caballo que llega a g5 y dama que llega a h5: las tres piezas del ataque.',sencillo:'Tres piezas contra h7.'},
    {jugada:'d3h7',marcas:[['g8','jaque']],di:'1.Axh7+!: el regalo.',sencillo:'¡El alfil se entrega!'},
    {jugada:'g8h7',di:'1…Rxh7: el rey acepta.',sencillo:'El rey se lo come.'},
    {jugada:'f3g5',marcas:[['h7','jaque']],di:'2.Cg5+: jaque de caballo.',sencillo:'El caballo salta con jaque.'},
    {jugada:'h7g8',di:'2…Rg8',sencillo:'El rey vuelve.'},
    {jugada:'d1h5',flechas:[['h5','h7','amenaza']],di:'3.Dh5: amenaza Dh7#. Las negras tienen que dar la dama.',sencillo:'Amenaza mate en h7.'},
    {jugada:'d8g5',di:'3…Dxg5',sencillo:'La dama negra captura el caballo.'},
    {jugada:'c1g5',di:'4.Axg5: recuperas la pieza y ganas la dama por el alfil.',sencillo:'Ganas la dama.'}
  ],
  comprende:{di:'Condiciones del regalo envenenado: alfil hacia h7, caballo que llegue a g5, dama que llegue a la columna h y pocos defensores negros cerca.'},
  practica:{fen:'rnbq1rk1/pppn1ppp/4p3/3pP3/1b1P4/2NB1N2/PPP2PPP/R1BQK2R w KQq - 0 1',linea:['d3h7','g8h7','f3g5','h7g8','d1h5','d8g5','c1g5'],concepto:true,
    di:'Haz el regalo envenenado.',pistas:['El alfil captura en h7 con jaque.','Después, caballo a g5 y dama a h5.'],
    mal:{'*':'Sigue el patrón: Axh7+, Cg5+ y Dh5.'},
    bien:'¡Bien! Axh7+, Cg5+, Dh5 y Axg5: ganas la dama.'},
  hazlo:{fen:'r2qrbk1/5ppp/pn1p4/np2P1P1/3p4/5N2/PPB2PP1/R1BQR1K1 w - - 1 20',linea:['c2h7','g8h7','g5g6','f7g6','f3g5','h7g8','d1f3','d8g5','c1g5'],concepto:true,
    di:'Ahora con el alfil desde c2. Haz el regalo envenenado.',pistas:['Axh7+ y, después, un peón da jaque en g6.','El caballo llega a g5 y la dama a f3.'],
    mal:{'*':'Sigue el patrón: Axh7+, g6+, Cg5+ y Df3.'},
    bien:'¡Correcto! Axh7+, g6+, Cg5+, Df3 y Axg5.'},
  comprueba:{fen:'rnb2rk1/pp1nqppp/4p3/3pP3/3p3P/2NB3N/PPP2PP1/R2QK2R w KQ - 0 10',linea:['d3h7','g8h8','d1h5','e7h4','h5h4','g7g5','h3g5','h8g7','h4h6','g7h8','h7d3','h8g8','h6h7'],meta:'mate',concepto:true,
    di:'Regalo envenenado con la columna h abierta. Llega hasta el mate.',pistas:['Axh7+ y, si el rey no captura, Dh5.','Tras los cambios en h4, el caballo de h3 entra por g5.'],
    mal:{'*':'Sigue con jaques y amenazas sobre h7.'},
    bien:'¡Mate! Dh7#.'},
  extra:[
    {fen:'r3r1k1/1b2qppp/p7/1p1Pb3/1P6/P2B4/1B2Q1PP/3R1RK1 w - - 0 21',linea:['d3h7','g8h7','e2h5','h7g8','b2e5','e7e5','h5f7','g8h8','f1f5','e5e3','g1h1','e3e1','d1e1','e8e1','f5f1','e1f1','f7f1'],concepto:true,
      di:'Regalo envenenado con la dama desde e2. Calcula hasta el final.',pistas:['Axh7+ y Dh5+.','Después, el alfil de b2 captura en e5.'],
      mal:{'*':'Sigue el patrón: Axh7+, Dh5+ y Axe5.'},
      bien:'¡Bien! Llegas a un final con una pieza de más.'},
    {fen:'3r1rk1/bpq2ppp/p1b1p3/2P5/1P2B3/P4Q2/1B3PPP/2R2RK1 w - - 3 18',linea:['e4h7','g8h7','f3h5','h7g8','b2g7','f7f5','h5h8','g8f7','g7f8','a7b8','h8g7','f7e8','g7c7'],concepto:true,
      di:'Doble sacrificio: el alfil de e4 en h7 y el de b2 en g7.',pistas:['Axh7+ y Dh5+.','Después, Axg7.'],
      mal:{'*':'Sigue el patrón: Axh7+, Dh5+ y Axg7.'},
      bien:'¡Excelente! Dxc7: ganas la dama.'},
    {fen:'r1bqk2r/ppp2pp1/2nb1n2/3p3p/3Pp3/4P3/PPPNBPPP/RNBQ1RK1 b kq - 0 1',linea:['d6h2','g1h2','f6g4','h2g1','d8h4'],
      di:'Juegas con negras. Haz el regalo envenenado.',pistas:['Tu alfil de d6 apunta a h2.','Después, caballo a g4 y dama a h4.'],
      bien:'¡Correcto! …Axh2+, …Cg4+ y …Dh4.'}
  ]
};

/* N4-027 · Redes de mate */
L['N4-027']={
  tactica:true, motivo:'Red de mate',
  objetivo:'Vas a aprender a tejer una red de mate quitándole casillas al rey.',
  idea:'Una **red de mate** se construye quitando, una a una, las **casillas de escape** del rey con todas tus piezas.',
  descubre:{fen:'1k6/pp6/8/8/8/8/PPP5/1K1R2Q1 w - - 0 1',di:'El rey negro tiene pocas casillas. ¿Cómo lo encierras?'},
  observa:[
    {jugada:'g1g3',marcas:[['b8','jaque']],di:'Dg3+: el rey solo puede ir a c8 (en a8 llegaría Td8#).',sencillo:'Jaque.'},
    {jugada:'b8c8',di:'…Rc8',sencillo:'El rey va a c8.'},
    {jugada:'g3c3',marcas:[['c8','jaque']],di:'Dc3+: el rey vuelve a b8.',sencillo:'Otro jaque.'},
    {jugada:'c8b8',di:'…Rb8',sencillo:'El rey vuelve.'},
    {jugada:'d1d8',marcas:[['b8','jaque']],di:'Td8#: la dama vigila c7 y la torre la última fila.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Cuenta las casillas del rey rival y ve quitándoselas con jaques.'},
  practica:{fen:'1k6/pp6/8/8/8/8/PPP5/1K1R2Q1 w - - 0 1',linea:['g1g3','b8c8','g3c3','c8b8','d1d8'],meta:'mate',
    di:'Mate en tres.',pistas:['Empieza con un jaque de dama.','Después, vigila c7 y usa la torre.'],
    bien:'¡Mate en tres!'},
  hazlo:{fen:'6k1/5ppp/3r4/8/7q/8/4nPPP/6RK b - - 0 1',linea:['h4h2','h1h2','d6h6'],meta:'mate',
    di:'Juegas con negras. Mate en dos con sacrificio.',pistas:['Tu caballo de e2 vigila g1 y g3.'],
    bien:'¡Correcto! …Dxh2+, Rxh2 y …Th6#.'},
  comprueba:{fen:'4rk2/ppp1n1pp/5n2/8/2B5/5Q2/PPPB4/1K6 w - - 0 1',linea:['f3f6','g7f6','d2h6'],meta:'mate',
    di:'Mate en dos con sacrificio de dama.',pistas:['El peón de g7 estorba.','Después, el alfil da jaque desde h6.'],
    bien:'¡Excelente! Dxf6+, gxf6 y Ah6#.'}
};

/* N4-032 · Ruptura de peones */
L['N4-032']={
  tactica:true, motivo:'Ruptura de peones',
  objetivo:'Vas a aprender a abrir paso con una ruptura de peones en el flanco de rey.',
  idea:'Una **ruptura** sacrifica peones para abrir camino a otro. Con los reyes lejos, el peón que queda **corona**.',
  descubre:{fen:'8/5ppp/8/5PPP/3k4/8/8/6K1 w - - 0 1',di:'Tres peones contra tres. El rey negro se acerca. ¿Puedes abrir paso a tiempo?'},
  observa:[
    {jugada:'g5g6',di:'g6!: el peón del medio se ofrece.',sencillo:'¡Sacrificio!'},
    {jugada:'h7g6',di:'…hxg6',sencillo:'Las negras capturan.'},
    {jugada:'f5f6',di:'f6!: otro sacrificio.',sencillo:'¡Otro más!'},
    {jugada:'g7f6',di:'…gxf6',sencillo:'Capturan otra vez.'},
    {jugada:'h5h6',marcas:[['h8','clave']],di:'h6: nadie frena este peón. ¡Coronará!',sencillo:'El peón de h corre a coronar.'}
  ],
  comprende:{di:'Ruptura: sacrifica el peón central y luego el del lado; el último pasa.'},
  practica:{fen:'8/5ppp/8/5PPP/3k4/8/8/6K1 w - - 0 1',linea:['g5g6'],
    di:'Haz la ruptura.',pistas:['Empieza por el peón del medio.'],
    mal:{'*':'Así las negras se defienden. Rompe con el peón del medio.'},
    bien:'¡Bien! Uno de tus peones coronará.'},
  hazlo:{fen:'6k1/8/8/3K4/5ppp/8/5PPP/8 b - - 0 1',linea:['g4g3'],
    di:'Juegas con negras. Haz la ruptura.',pistas:['Empieza por el peón del medio.'],
    mal:{'*':'Así las blancas se defienden. Rompe con el peón del medio.'},
    bien:'¡Correcto! Un peón negro coronará.'}
};

/* N4-033 · Peón pasado alejado */
L['N4-033']={
  tactica:false,
  objetivo:'Vas a aprender a usar un peón pasado lejano para distraer al rey rival.',
  idea:'Un **peón pasado alejado** obliga al rey rival a ir a frenarlo. Mientras tanto, **tu rey** se come los peones del otro lado.',
  descubre:{fen:'8/8/4k1p1/8/P3K3/6P1/8/8 w - - 0 1',di:'Tu peón de a4 está lejos de todo. ¿Para qué sirve?'},
  observa:[
    {jugada:'a4a5',di:'a5: el peón avanza y el rey negro tiene que ir a frenarlo.',sencillo:'El peón corre.'},
    {jugada:'e6d6',di:'…Rd6',sencillo:'El rey negro va a por él.'},
    {jugada:'e4f4',di:'Rf4: mientras, tu rey va a por el peón de g6.',sencillo:'Tu rey va al otro lado.'}
  ],
  comprende:{di:'El peón alejado distrae al rey rival; tu rey gana en el otro flanco.'},
  practica:{fen:'8/8/4k1p1/8/P3K3/6P1/8/8 w - - 0 1',linea:['a4a5'],acepta:{0:['e4f4']},concepto:true,
    di:'Usa tu peón alejado para ganar.',pistas:['Avanza el peón de a, o lleva tu rey hacia g6.'],
    mal:{'*':'Avanza el peón alejado o lleva tu rey hacia el peón de g6.'},
    bien:'¡Bien! El rey negro no puede atender los dos lados.'},
  hazlo:{fen:'8/8/6p1/p3k3/8/4K1P1/8/8 b - - 0 1',linea:['a5a4'],acepta:{0:['e5f5']},concepto:true,
    di:'Juegas con negras. Usa tu peón alejado.',pistas:['Avanza el peón de a.'],
    mal:{'*':'Avanza el peón alejado o lleva tu rey hacia el peón de g3.'},
    bien:'¡Correcto! El rey blanco no puede estar en todas partes.'}
};

/* N4-036 · Torres: cortar al rey */
L['N4-036']={
  tactica:false,
  objetivo:'Vas a aprender a cortar al rey rival con la torre en los finales.',
  idea:'En los finales de torres, **cortar** al rey rival con la torre en una columna o fila lo deja **lejos** del peón y de la acción.',
  descubre:{fen:'1r6/8/2k5/8/4P3/8/4K3/R7 w - - 0 1',di:'El rey negro quiere acercarse a tu peón de e4. ¿Cómo lo impides con la torre?'},
  observa:[
    {jugada:'a1d1',flechas:[['d1','d8','linea']],di:'Td1: la torre corta al rey negro en la columna d. No puede pasar al lado del peón.',sencillo:'La torre le cierra el paso.'}
  ],
  comprende:{di:'Pon la torre entre el rey rival y tu peón: así tu rey y tu peón avanzan tranquilos.'},
  practica:{fen:'1r6/8/2k5/8/4P3/8/4K3/R7 w - - 0 1',linea:['a1d1'],concepto:true,objetivoEquilibrio:true,
    di:'Corta al rey negro con tu torre.',pistas:['Pon la torre en la columna que separa al rey negro de tu peón.'],
    mal:{'*':'Lleva la torre a la columna d para cortar al rey negro.'},
    bien:'¡Bien! El rey negro queda cortado.'},
  hazlo:{fen:'r7/4k3/8/4p3/8/2K5/8/1R6 b - - 0 1',linea:['a8d8'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Corta al rey blanco con tu torre.',pistas:['La columna d lo separa de tu peón.'],
    mal:{'*':'Lleva la torre a la columna d.'},
    bien:'¡Correcto! El rey blanco queda cortado.'}
};

/* N4-037 · Regla de Tarrasch */
L['N4-037']={
  tactica:false,
  objetivo:'Vas a aprender dónde colocar la torre con un peón pasado.',
  idea:'**Regla de Tarrasch**: la torre va **detrás** del peón pasado, sea propio o del rival. Así gana fuerza cuanto más avanza el peón.',
  descubre:{fen:'6r1/5k2/8/P7/8/8/5K2/7R w - - 0 1',di:'Tienes un peón pasado en a5. ¿Dónde estaría mejor tu torre?'},
  observa:[
    {jugada:'h1a1',flechas:[['a1','a5','linea']],di:'Ta1: la torre se pone detrás del peón y lo empuja hacia delante.',sencillo:'La torre detrás del peón.'}
  ],
  comprende:{di:'Torre detrás del peón pasado: lo apoya en cada paso y nunca le estorba.'},
  practica:{fen:'6r1/5k2/8/P7/8/8/5K2/7R w - - 0 1',linea:['h1a1'],concepto:true,objetivoEquilibrio:true,
    di:'Coloca tu torre según la regla de Tarrasch.',pistas:['Detrás del peón pasado.'],
    mal:{'*':'Pon la torre detrás de tu peón pasado.'},
    bien:'¡Bien! Torre detrás del peón.'}
};

/* N4-038 · Posición de Philidor */
L['N4-038']={
  tactica:false,
  objetivo:'Vas a aprender la defensa de Philidor en los finales de torre.',
  idea:'En la **posición de Philidor** el defensor pone su torre en la **sexta fila** (la tercera del rival) y no deja pasar al rey. Si el peón avanza, la torre va **detrás** y da jaques.',
  descubre:{fen:'3k4/7R/8/3PK3/8/8/8/r7 b - - 0 1',di:'Defiendes con negras. ¿Dónde pondrías tu torre para frenar al rey blanco?'},
  observa:[
    {jugada:'a1a6',flechas:[['a6','h6','linea']],di:'…Ta6: la torre vigila la sexta fila. El rey blanco no puede avanzar.',sencillo:'La torre corta en la sexta fila.'},
    {jugada:'h7h8',marcas:[['d8','jaque']],di:'Th8+',sencillo:'Jaque.'},
    {jugada:'d8c7',di:'…Rc7: el rey se queda cerca y la torre sigue en la sexta. Son tablas.',sencillo:'Todo bajo control: tablas.'}
  ],
  comprende:{di:'Torre en la sexta fila hasta que el peón llegue a ella; después, jaques desde atrás.'},
  practica:{fen:'3k4/7R/8/3PK3/8/8/8/r7 b - - 0 1',linea:['a1a6'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Toma la posición de Philidor.',pistas:['La torre va a la sexta fila.'],
    mal:{'*':'La defensa de Philidor pone la torre en la sexta fila.'},
    bien:'¡Bien! Posición de Philidor: tablas.'},
  hazlo:{fen:'R7/8/8/8/3pk3/8/7r/3K4 w - - 0 1',linea:['a8a3'],concepto:true,objetivoEquilibrio:true,
    di:'Ahora defiendes con blancas. Toma la posición de Philidor.',pistas:['La torre va a la tercera fila.'],
    mal:{'*':'La defensa de Philidor pone la torre en la tercera fila.'},
    bien:'¡Correcto! Tablas.'}
};

/* N4-039 · Posición de Lucena */
L['N4-039']={
  tactica:false,
  objetivo:'Vas a aprender a ganar la posición de Lucena construyendo un puente.',
  idea:'En la **posición de Lucena** tu peón está en séptima y tu rey delante. Primero **corta** al rey rival con la torre; después, la torre hace de **puente** contra los jaques.',
  descubre:{fen:'1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1',di:'Tu rey está delante del peón, pero no puede salir por los jaques. ¿Qué haces primero?'},
  observa:[
    {jugada:'c1d1',marcas:[['d7','jaque']],di:'Td1+: la torre aleja al rey negro de la columna c.',sencillo:'Primero, alejar al rey negro.'},
    {jugada:'d7e7',di:'…Re7',sencillo:'El rey se aparta.'},
    {jugada:'d1d4',flechas:[['d4','b4','linea']],di:'Td4!: la torre se prepara para hacer de puente en la cuarta fila.',sencillo:'La torre se prepara para el puente.'},
    {jugada:'a2a1',di:'…Ta1',sencillo:'Las negras esperan.'},
    {jugada:'b8c7',di:'Rc7: el rey sale. Si llegan jaques, la torre se interpondrá en b4.',sencillo:'El rey sale y la torre lo protegerá.'}
  ],
  comprende:{di:'Lucena: corta al rey rival, lleva la torre a la cuarta fila y saca tu rey. La torre tapará los jaques.'},
  practica:{fen:'1K6/1P1k4/8/8/8/8/r7/2R5 w - - 0 1',linea:['c1d1'],concepto:true,
    di:'Primer paso: aleja al rey negro con tu torre.',pistas:['Da jaque por la columna d.'],
    mal:{'*':'Primero, aleja al rey negro con un jaque de torre.'},
    bien:'¡Bien! Ahora podrás construir el puente.'},
  hazlo:{fen:'2r5/R7/8/8/8/8/1p1K4/1k6 b - - 0 1',linea:['c8d8'],concepto:true,
    di:'Juegas con negras. Aleja al rey blanco con tu torre.',pistas:['Da jaque por la columna d.'],
    mal:{'*':'Primero, aleja al rey blanco con un jaque de torre.'},
    bien:'¡Correcto! Primer paso de la Lucena.'}
};

/* N4-006 · Casillas débiles */
L['N4-006']={
  tactica:false,
  objetivo:'Vas a aprender a reconocer casillas débiles en el campo rival.',
  idea:'Una **casilla débil** es la que **ningún peón** rival puede atacar. Allí tus piezas se instalan sin que nadie las eche.',
  descubre:{fen:'6k1/1p3ppp/p2p4/4p3/4P3/2N5/PP3PPP/6K1 w - - 0 1',di:'Mira las casillas del centro del campo negro. ¿Cuál no puede vigilar ningún peón negro?'},
  observa:[
    {marcas:[['d5','clave']],di:'d5: el peón de c ya no existe y el de e5 ya pasó. Ningún peón negro puede atacar d5.',sencillo:'d5 es un agujero en el campo negro.'},
    {jugada:'c3d5',di:'Cd5: el caballo se instala en la casilla débil. Nadie lo puede echar con un peón.',sencillo:'El caballo ocupa el agujero.'}
  ],
  comprende:{di:'Busca casillas que los peones rivales ya no pueden atacar y ocúpalas con tus piezas.'},
  practica:{tipo:'casilla',fen:'6k1/1p3ppp/p2p4/4p3/4P3/2N5/PP3PPP/6K1 w - - 0 1',casillas:['d5'],
    di:'Toca la casilla débil del campo negro.',pista:'Está en la columna d.',
    bien:'¡Correcto! Ningún peón negro puede atacar d5.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3ppp/2n5/4p3/4P3/P2P4/1P3PPP/6K1 b - - 0 1',casillas:['d4'],
    di:'Juegas con negras. Toca la casilla débil del campo blanco.',pista:'Está en la columna d.',
    bien:'¡Bien! Ningún peón blanco puede atacar d4.'}
};

/* N4-007 · Puestos avanzados */
L['N4-007']={
  tactica:false,
  objetivo:'Vas a aprender qué es un puesto avanzado y por qué le encanta al caballo.',
  idea:'Un **puesto avanzado** es una casilla en el campo rival, **protegida por un peón tuyo** y que ningún peón rival puede atacar. Es el lugar ideal para un caballo.',
  descubre:{fen:'6k1/pp4pp/4p3/8/3P4/5N2/PP3PPP/6K1 w - - 0 1',di:'Tu peón de d4 protege una casilla en el campo negro. ¿Cuál?'},
  observa:[
    {flechas:[['d4','e5','defensa']],marcas:[['e5','clave']],di:'e5: la protege tu peón de d4 y no hay peones negros en d ni en f que la ataquen.',sencillo:'e5 es un puesto avanzado.'},
    {jugada:'f3e5',di:'Ce5: el caballo se instala en el puesto avanzado.',sencillo:'El caballo ocupa el puesto.'}
  ],
  comprende:{di:'Caballo en un puesto avanzado: fuerte, protegido y sin que lo echen.'},
  practica:{tipo:'casilla',fen:'6k1/pp4pp/4p3/8/3P4/5N2/PP3PPP/6K1 w - - 0 1',casillas:['e5'],
    di:'Toca el puesto avanzado para tu caballo.',pista:'Lo protege tu peón de d4.',
    bien:'¡Correcto! e5 es un puesto avanzado.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3ppp/5n2/3p4/8/4P3/PP4PP/6K1 b - - 0 1',casillas:['e4'],
    di:'Juegas con negras. Toca el puesto avanzado para tu caballo.',pista:'Lo protege tu peón de d5.',
    bien:'¡Bien! e4 es un puesto avanzado.'}
};

/* N4-008 · Alfil bueno y alfil malo */
L['N4-008']={
  tactica:false,
  objetivo:'Vas a distinguir el alfil bueno del alfil malo.',
  idea:'Un alfil es **malo** si sus propios peones están fijos en casillas **de su mismo color**: le tapan el camino. El **bueno** se mueve por el otro color.',
  descubre:{fen:'6k1/pp3ppp/4p3/4P3/3P4/2PB4/PP3PPP/2B3K1 w - - 0 1',di:'Tus peones de c3, d4 y e5 están en casillas oscuras. ¿Cuál de tus alfiles sufre?'},
  observa:[
    {marcas:[['c3','clave'],['d4','clave'],['e5','clave']],di:'Tus peones centrales están en casillas oscuras.',sencillo:'Peones en casillas oscuras.'},
    {marcas:[['c1','clave']],di:'El alfil de c1 también va por casillas oscuras: sus peones lo encierran. Es el alfil malo.',sencillo:'El alfil de c1 está encerrado.'}
  ],
  comprende:{di:'Pon tus peones en casillas del color contrario al de tu alfil, o cambia tu alfil malo.'},
  practica:{tipo:'casilla',fen:'6k1/pp3ppp/4p3/4P3/3P4/2PB4/PP3PPP/2B3K1 w - - 0 1',casillas:['c1'],
    di:'Toca tu alfil malo.',pista:'Es el que va por el mismo color que tus peones centrales.',
    bien:'¡Correcto! El alfil de c1 está tapado por sus peones.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3ppp/4p3/4P3/3P4/2PB4/PP3PPP/2B3K1 w - - 0 1',casillas:['d3'],
    di:'Toca tu alfil bueno.',pista:'Va por casillas claras.',
    bien:'¡Bien! El alfil de d3 tiene el camino libre.'},
  comprueba:{tipo:'casilla',fen:'2b3k1/pp2bppp/4p3/3p4/8/8/PP3PPP/6K1 w - - 0 1',casillas:['c8'],
    di:'Toca el alfil malo de las negras.',pista:'Los peones negros de d5 y e6 están en casillas claras.',
    bien:'¡Excelente! El alfil de c8 está encerrado por sus peones.'}
};

/* N4-009 · Ventaja de espacio */
L['N4-009']={
  tactica:false,
  objetivo:'Vas a aprender a ganar espacio con los peones.',
  idea:'Un peón **avanzado** en el centro quita casillas al rival y le deja **menos sitio** para sus piezas. Tus piezas se mueven mejor detrás de él.',
  descubre:{fen:'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',di:'Caro-Kann: 1.e4 c6 2.d4 d5. ¿Avanzarías el peón de e4? ¿Qué casillas le quitaría a las negras?'},
  observa:[
    {jugada:'e4e5',flechas:[['e5','f6','ataque'],['e5','d6','ataque']],di:'e5 (variante del avance): el peón quita f6 al caballo negro y gana espacio en el flanco de rey.',sencillo:'El peón avanza y quita casillas.'}
  ],
  comprende:{di:'Con más espacio, tus piezas se mueven mejor y las del rival se estorban.'},
  practica:{fen:'rnbqkbnr/pp2pppp/2p5/3p4/3PP3/8/PPP2PPP/RNBQKBNR w KQkq - 0 3',linea:['e4e5'],concepto:true,objetivoEquilibrio:true,
    di:'Gana espacio con un peón.',pistas:['Avanza el peón de e4.'],
    mal:{'*':'Busca el avance de peón que gana espacio.'},
    bien:'¡Bien! El peón de e5 gana espacio.'},
  hazlo:{tipo:'casilla',fen:'rnbqkbnr/pp2pppp/2p5/3pP3/3P4/8/PPP2PPP/RNBQKBNR b KQkq - 0 3',casillas:['d6','f6'],
    di:'Toca las casillas que vigila el peón blanco de e5.',pista:'Un peón vigila las dos casillas en diagonal delante de él.',
    bien:'¡Correcto! d6 y f6.'}
};

/* N4-010 · El centro de peones */
L['N4-010']={
  tactica:false,
  objetivo:'Vas a aprender a ocupar el centro con peones y a reconocer un centro cerrado.',
  idea:'Dos peones en el **centro** (d4 y e4) controlan casillas clave. Si los peones de ambos bandos se **bloquean**, el centro está **cerrado** y el juego va a los flancos.',
  descubre:{fen:'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',di:'Las negras jugaron 1…c6 (Caro-Kann). ¿Con qué peón completarías tu centro?'},
  observa:[
    {jugada:'d2d4',marcas:[['d4','clave'],['e4','clave']],di:'d4: dos peones en el centro.',sencillo:'Dos peones en el centro.'}
  ],
  comprende:{di:'Ocupa el centro con peones. Si se cierra, busca juego en el flanco hacia donde apuntan tus peones.'},
  practica:{fen:'rnbqkbnr/pp1ppppp/2p5/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2',linea:['d2d4'],concepto:true,objetivoEquilibrio:true,
    di:'Completa tu centro de peones.',pistas:['El peón de d2.'],
    mal:{'*':'Pon un segundo peón en el centro.'},
    bien:'¡Bien! Centro de peones.'},
  hazlo:{fen:'rnbqkbnr/pppppppp/8/8/3P4/8/PPP1PPPP/RNBQKBNR b KQkq - 0 1',linea:['d7d5'],acepta:{0:['g8f6']},concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Disputa el centro.',pistas:['Pon un peón frente al de d4, o vigila e4 con una pieza.'],
    mal:{'*':'Disputa el centro con un peón o con el caballo.'},
    bien:'¡Correcto! Luchas por el centro.'},
  comprueba:{tipo:'casilla',fen:'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 5',casillas:['d4','e5','d5','e6'],
    di:'Caro-Kann, variante del avance: el centro está cerrado. Toca los cuatro peones centrales bloqueados.',pista:'Dos blancos y dos negros.',
    bien:'¡Excelente! Ninguno de ellos puede avanzar.'}
};

/* N4-013 · Ataques prematuros */
L['N4-013']={
  tactica:false,
  objetivo:'Vas a aprender a castigar una dama que sale demasiado pronto.',
  idea:'Si el rival saca la **dama** muy pronto, ataca su dama **desarrollando** tus piezas: cada jugada suya para escapar es tiempo que pierde.',
  descubre:{fen:'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',di:'Las blancas amenazan Dxf7 mate. ¿Cómo lo paras ganando tiempo?'},
  observa:[
    {flechas:[['h5','f7','ataque'],['c4','f7','ataque']],marcas:[['f7','amenazada']],di:'Amenaza Dxf7#.',sencillo:'Te amenazan mate en f7.'},
    {jugada:'g7g6',flechas:[['g6','h5','ataque']],di:'…g6: tapa la diagonal y ataca a la dama.',sencillo:'El peón ataca a la dama.'},
    {jugada:'h5f3',di:'Df3: la dama vuelve a amenazar f7.',sencillo:'La dama insiste.'},
    {jugada:'g8f6',di:'…Cf6: defiende f7 y desarrolla. La dama blanca ya perdió tiempo.',sencillo:'El caballo defiende y sale.'}
  ],
  comprende:{di:'Contra una dama temprana: defiéndete desarrollando y atácala con tus piezas.'},
  practica:{fen:'r1bqkbnr/pppp1ppp/2n5/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR b KQkq - 3 3',linea:['g7g6'],acepta:{0:['d8e7']},concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Para el mate y gana tiempo.',pistas:['Un peón puede atacar a la dama.'],
    mal:{'*':'Te dan mate en f7. Tápalo atacando a la dama.'},
    bien:'¡Bien! La dama tiene que moverse otra vez.'},
  hazlo:{fen:'r1bqkbnr/pppp1p1p/2n3p1/4p3/2B1P3/5Q2/PPPP1PPP/RNB1K1NR b KQkq - 1 4',linea:['g8f6'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. La dama vuelve a atacar f7. Defiende desarrollando.',pistas:['Un caballo puede tapar la línea de la dama.'],
    mal:{'*':'Defiende f7 desarrollando una pieza.'},
    bien:'¡Correcto! …Cf6 defiende y desarrolla.'},
  comprueba:{fen:'rnb1kbnr/ppp1pppp/8/3q4/8/8/PPPP1PPP/RNBQKBNR w KQkq - 0 3',linea:['b1c3'],concepto:true,objetivoEquilibrio:true,
    di:'La dama negra salió pronto. Desarrolla atacándola.',pistas:['Un caballo puede atacarla.'],
    mal:{'*':'Busca una pieza que salga atacando a la dama.'},
    bien:'¡Excelente! Cc3 desarrolla con tiempo.'}
};

/* N4-014 · Ventaja de desarrollo */
L['N4-014']={
  tactica:false,
  objetivo:'Vas a aprender a aprovechar que tienes más piezas en juego.',
  idea:'Con **ventaja de desarrollo**, **abre el centro**: las líneas abiertas favorecen al que tiene más piezas listas, sobre todo si el rey rival no enrocó.',
  descubre:{fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',di:'Jugaste c3 para preparar algo en el centro. ¿Qué?'},
  observa:[
    {jugada:'d2d4',flechas:[['d4','c5','ataque'],['d4','e5','ataque']],di:'d4: abres el centro atacando el peón de e5 y el alfil de c5.',sencillo:'Rompes en el centro.'}
  ],
  comprende:{di:'Si vas por delante en desarrollo, abre el centro antes de que el rival termine de desarrollarse.'},
  practica:{fen:'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/2P2N2/PP1P1PPP/RNBQK2R w KQkq - 1 5',linea:['d2d4'],concepto:true,
    di:'Abre el centro.',pistas:['Avanza el peón de d con apoyo de c3.'],
    mal:{'*':'Abre el centro con un peón.'},
    bien:'¡Bien! d4 abre líneas para tus piezas.'}
};

/* N4-015 · Gambitos */
L['N4-015']={
  tactica:false,
  objetivo:'Vas a aprender qué es un gambito y cómo responder.',
  idea:'En un **gambito** se ofrece un peón a cambio de **desarrollo** o del **centro**. Puedes aceptarlo y defenderte con cuidado, o rechazarlo y desarrollarte con calma.',
  descubre:{fen:'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',di:'El gambito de dama: las blancas ofrecen el peón de c4. ¿Lo aceptas o lo rechazas?'},
  observa:[
    {jugada:'e7e6',flechas:[['e6','d5','defensa']],di:'…e6: el gambito de dama rehusado. Sostienes d5 y abres paso al alfil.',sencillo:'Rechazas el peón y refuerzas el centro.'}
  ],
  comprende:{di:'Ante un gambito: o lo aceptas y te desarrollas rápido, o lo rehúsas sosteniendo tu centro.'},
  practica:{fen:'rnbqkbnr/ppp1pppp/8/3p4/2PP4/8/PP2PPPP/RNBQKBNR b KQkq - 0 2',linea:['e7e6'],acepta:{0:['c7c6','d5c4']},concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Responde al gambito de dama.',pistas:['Puedes sostener d5 con un peón… o aceptar el peón.'],
    mal:{'*':'Sostén d5 con un peón o acepta el gambito.'},
    bien:'¡Bien! Buena respuesta al gambito.'},
  hazlo:{fen:'rnbqkbnr/ppp1pppp/8/8/2pP4/8/PP2PPPP/RNBQKBNR w KQkq - 0 3',linea:['e2e4'],acepta:{0:['e2e3','g1f3']},concepto:true,objetivoEquilibrio:true,
    di:'Las negras aceptaron. Desarrolla y prepara recuperar el peón.',pistas:['Abre paso a tu alfil de f1, que irá a por c4.'],
    mal:{'*':'Juega e3, e4 o Cf3: desarrollo y centro.'},
    bien:'¡Correcto! Recuperarás el peón con ventaja de centro.'}
};

/* N4-016 · Rey en el centro */
L['N4-016']={
  tactica:true, motivo:'Rey en el centro',
  objetivo:'Vas a aprender a atacar al rey que se quedó en el centro.',
  idea:'Un rey sin enrocar sufre en las **columnas centrales**. Abre la columna con jaque y gana material.',
  descubre:{fen:'r2k1b1r/ppp2ppp/8/4n3/3P4/8/PPP2PPP/1K1R1BNR w - - 0 1',di:'El rey negro está en d8 y tu torre en d1. ¿Qué pasa si el peón de d4 se mueve?'},
  observa:[
    {flechas:[['d1','d8','linea']],marcas:[['d4','clave']],di:'Tu peón de d4 tapa la torre.',sencillo:'El peón tapa la torre.'},
    {jugada:'d4e5',marcas:[['d8','jaque']],di:'dxe5+: el peón captura el caballo y la torre da jaque.',sencillo:'¡Captura con jaque descubierto!'}
  ],
  comprende:{di:'Si el rey rival está en una columna con tu torre, busca apartar lo que hay en medio con ganancia.'},
  practica:{fen:'r2k1b1r/ppp2ppp/8/4n3/3P4/8/PPP2PPP/1K1R1BNR w - - 0 1',linea:['d4e5'],
    di:'Gana material con jaque.',pistas:['Captura con el peón de d4.'],bien:'¡Bien! dxe5+ gana el caballo.'},
  hazlo:{fen:'1k1r1bnr/ppp2ppp/8/3p4/4N3/8/PPP2PPP/R2K1B1R b - - 0 1',linea:['d5e4'],
    di:'Juegas con negras. Gana material con jaque.',pistas:['Captura con el peón de d5.'],bien:'¡Correcto! …dxe4+.'}
};

/* N4-019 · Sacrificar para abrir */
L['N4-019']={
  tactica:true, motivo:'Sacrificio para abrir líneas',
  objetivo:'Vas a practicar sacrificios que abren líneas hacia el rey rival.',
  idea:'A veces una pieza o un peón rival **tapa una línea** hacia su rey. Si lo eliminas con un sacrificio, tus piezas entran con **mate**.',
  descubre:{fen:'kr6/pppN4/8/Q7/8/4R3/PPP5/1K6 w - - 0 1',di:'El peón de a7 tapa la columna a. ¿Qué pasa si desaparece?'},
  observa:[
    {jugada:'a5a7',marcas:[['a8','jaque']],di:'Dxa7+!: la dama se sacrifica para abrir la columna a.',sencillo:'¡Sacrificio de dama!'},
    {jugada:'a8a7',di:'…Rxa7',sencillo:'El rey la captura.'},
    {jugada:'e3a3',marcas:[['a7','jaque']],di:'Ta3#: la columna abierta y el caballo de d7 dan el mate.',sencillo:'¡Mate por la columna abierta!'}
  ],
  comprende:{di:'Pregúntate qué pieza tapa la línea hacia el rey. Si la eliminas con jaque, ¿hay mate?'},
  practica:{fen:'kr6/pppN4/8/Q7/8/4R3/PPP5/1K6 w - - 0 1',linea:['a5a7','a8a7','e3a3'],meta:'mate',
    di:'Abre la columna a y da mate en dos.',pistas:['La dama captura en a7.'],bien:'¡Mate! Dxa7+, Rxa7 y Ta3#.'},
  hazlo:{fen:'6k1/4bppp/2q5/5b2/8/2N5/PP1N1PPP/2KR4 b - - 0 1',linea:['c6c3','b2c3','e7a3'],meta:'mate',
    di:'Juegas con negras. Abre la diagonal y da mate en dos.',pistas:['Sacrifica la dama en c3.'],bien:'¡Correcto! …Dxc3+, bxc3 y …Aa3#.'}
};

/* N4-028 · Candidatas del rival */
L['N4-028']={
  tactica:false,
  objetivo:'Vas a aprender a pensar en las jugadas del rival antes que en las tuyas.',
  idea:'Antes de mover, ponte en el lugar del rival: ¿qué **jaques**, **capturas** y **amenazas** tiene? Así descubres sus jugadas candidatas.',
  descubre:{fen:'4k3/ppp1bppp/8/8/3n4/8/PPP2PPP/R3K2R w KQ - 0 1',di:'Te toca a ti, pero primero mira al rival: ¿qué jaques tiene?'},
  observa:[
    {flechas:[['d4','c2','mov'],['d4','f3','mov'],['e7','b4','mov']],di:'El caballo puede dar jaque en c2 y f3; el alfil, en b4.',sencillo:'El rival tiene varios jaques.'},
    {flechas:[['d4','c2','ataque']],marcas:[['a1','clave']],di:'…Cxc2+ sería además un tenedor al rey y a la torre de a1.',sencillo:'Uno de esos jaques es un tenedor.'}
  ],
  comprende:{di:'Mira siempre las jugadas del rival: así ves venir los ataques.'},
  practica:{tipo:'casilla',fen:'4k3/ppp1bppp/8/8/3n4/8/PPP2PPP/R3K2R w KQ - 0 1',casillas:['d4','e7'],verificar:'pueden-jaque:b',
    di:'Toca las piezas negras que pueden darte jaque.',pista:'Hay dos.',bien:'¡Correcto! El caballo y el alfil.'},
  hazlo:{tipo:'casilla',fen:'r3k2r/pp3ppp/2n2n2/4p3/2B1P3/2N2b2/PPP2PPP/R4RK1 w - - 0 1',casillas:['f6','f3'],verificar:'pueden-capturar:b',
    di:'Toca las piezas negras que pueden capturar algo.',pista:'Mira qué piezas blancas están a su alcance.',bien:'¡Bien! El caballo de f6 y el alfil de f3.'},
  comprueba:{fen:'r2k3r/ppp2ppp/8/8/4n3/8/PPP3PP/R1BK1B1R w - - 0 1',linea:['c1e3'],acepta:{0:['d1e2','d1e1']},concepto:true,
    di:'El rival prepara …Cf2+, un tenedor. Evítalo.',pistas:['Vigila la casilla f2.'],
    mal:{'*':'Así el caballo todavía puede saltar a f2.'},bien:'¡Correcto! El tenedor ya no funciona.'}
};

/* N4-029 · La amenaza principal */
L['N4-029']={
  tactica:true, motivo:'Defensa contra la amenaza principal',
  objetivo:'Vas a aprender a detectar la amenaza más peligrosa del rival y pararla.',
  idea:'El rival puede amenazar varias cosas. Primero para la **más grave** (casi siempre el mate); después, lo demás.',
  descubre:{fen:'1k6/ppp5/4b3/8/q7/8/PPP1N3/1KR5 w - - 0 1',di:'La dama y el alfil negros apuntan a tu rey. ¿Qué amenazan?'},
  observa:[
    {flechas:[['a4','a2','ataque'],['e6','a2','ataque']],marcas:[['a2','amenazada']],di:'Amenazan …Dxa2+ y mate: dama y alfil atacan a2.',sencillo:'Te amenazan mate en a2.'},
    {jugada:'e2c3',flechas:[['c3','a2','defensa'],['c3','a4','ataque']],di:'Cc3: defiende a2 y ataca la dama.',sencillo:'El caballo defiende y ataca.'}
  ],
  comprende:{di:'Pregúntate: ¿cuál es la peor amenaza? Para esa primero.'},
  practica:{fen:'1k6/ppp5/4b3/8/q7/8/PPP1N3/1KR5 w - - 0 1',linea:['e2c3'],acepta:{0:['b2b3','a2a3','c2c4']},objetivoEquilibrio:true,
    di:'Para la amenaza principal.',pistas:['¿Qué casilla atacan la dama y el alfil?'],
    mal:{'*':'Así llega …Dxa2+ y mate. Defiende a2.'},bien:'¡Bien! La amenaza está parada.'},
  hazlo:{fen:'1kr5/ppp1n3/8/Q7/8/4B3/PPP5/1K6 b - - 0 1',linea:['e7c6'],acepta:{0:['b7b6','a7a6','c7c5']},objetivoEquilibrio:true,
    di:'Juegas con negras. Para la amenaza principal.',pistas:['La dama y el alfil blancos atacan a7.'],
    mal:{'*':'Así llega Dxa7+ y mate. Defiende a7.'},bien:'¡Correcto! Amenaza parada.'}
};

/* N4-030 · Calcular tres jugadas */
L['N4-030']={
  tactica:true, motivo:'Cálculo de tres jugadas',
  objetivo:'Vas a aprender a calcular una variante forzada de tres jugadas.',
  idea:'En una **variante forzada** cada jugada tuya deja al rival **una sola respuesta**. Así puedes calcular tres jugadas con seguridad.',
  descubre:{fen:'1k1r2q1/ppp5/8/8/8/8/PP6/1K6 b - - 0 1',di:'Juegas con negras. Tu dama y tu torre apuntan al rey blanco. ¿Cuántos jaques necesitas?'},
  observa:[
    {jugada:'g8g6',marcas:[['b1','jaque']],di:'…Dg6+: el rey solo puede ir a c1 (en a1 llegaría …Td1#).',sencillo:'Primer jaque.'},
    {jugada:'b1c1',di:'Rc1',sencillo:'El rey va a c1.'},
    {jugada:'g6c6',marcas:[['c1','jaque']],di:'…Dc6+: vuelve a b1.',sencillo:'Segundo jaque.'},
    {jugada:'c1b1',di:'Rb1',sencillo:'El rey vuelve.'},
    {jugada:'d8d1',marcas:[['b1','jaque']],di:'…Td1#.',sencillo:'¡Mate en tres!'}
  ],
  comprende:{di:'Cuando todas las respuestas son forzadas, calcular lejos es fácil.'},
  practica:{fen:'1k1r2q1/ppp5/8/8/8/8/PP6/1K6 b - - 0 1',linea:['g8g6','b1c1','g6c6','c1b1','d8d1'],meta:'mate',
    di:'Juegas con negras. Mate en tres.',pistas:['Empieza con un jaque de dama por la diagonal.'],bien:'¡Mate en tres!'},
  hazlo:{fen:'6k1/5ppp/8/2q5/8/8/5nPP/5RK1 b - - 0 1',linea:['f2h3','g1h1','c5g1','f1g1','h3f2'],meta:'mate',
    di:'Juegas con negras. Mate en tres con jaque doble.',pistas:['Mueve el caballo para que la dama dé jaque.'],bien:'¡Correcto! La coz de Philidor con negras.'}
};

/* N4-031 · Elegir el flanco */
L['N4-031']={
  tactica:false,
  objetivo:'Vas a aprender a jugar en el flanco donde tienes ventaja.',
  idea:'Juega donde tienes **más peones** (mayoría) o donde apuntan tus piezas. Para crear un peón pasado, avanza primero el peón **candidato**: el que no tiene rival delante.',
  descubre:{fen:'6k1/pp3ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1',di:'Tienes tres peones contra dos en el flanco de dama. ¿Cuál avanzarías primero?'},
  observa:[
    {marcas:[['c2','clave']],di:'El peón de c no tiene peón negro delante: es el candidato.',sencillo:'El peón de c es el candidato.'},
    {jugada:'c2c4',di:'c4: el candidato avanza para crear un peón pasado.',sencillo:'El candidato avanza.'}
  ],
  comprende:{di:'Mayoría en un flanco: avanza el candidato apoyado por sus vecinos.'},
  practica:{tipo:'casilla',fen:'6k1/pp3ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1',casillas:['c2'],
    di:'Toca el peón candidato de tu mayoría.',pista:'Es el que no tiene peón rival delante.',bien:'¡Correcto! El peón de c2.'},
  hazlo:{fen:'6k1/pp3ppp/8/8/8/8/PPP2PPP/6K1 w - - 0 1',linea:['c2c4'],acepta:{0:['b2b4']},concepto:true,
    di:'Pon en marcha tu mayoría.',pistas:['Avanza el candidato o el peón que lo apoya.'],
    mal:{'*':'Avanza los peones de tu mayoría en el flanco de dama.'},bien:'¡Bien! Tu mayoría se pone en marcha.'},
  comprueba:{tipo:'casilla',fen:'6k1/ppp2ppp/8/8/8/8/PP3PPP/6K1 b - - 0 1',casillas:['c7'],
    di:'Juegas con negras. Toca el peón candidato de tu mayoría.',pista:'Mira el flanco de dama.',bien:'¡Excelente! El peón de c7.'}
};

/* N4-034 · Peón pasado protegido */
L['N4-034']={
  tactica:false,
  objetivo:'Vas a reconocer un peón pasado protegido y su gran fuerza.',
  idea:'Un **peón pasado protegido** está defendido por otro peón. El rey rival no puede capturarlo y tiene que vigilarlo siempre.',
  descubre:{fen:'6k1/pp3ppp/8/3P4/4P3/8/PP3PPP/6K1 w - - 0 1',di:'Mira tus peones de d5 y e4. ¿Por qué el de d5 es tan fuerte?'},
  observa:[
    {flechas:[['e4','d5','defensa']],marcas:[['d5','clave']],di:'d5 está pasado y lo protege el peón de e4: es un peón pasado protegido.',sencillo:'Un peón pasado con escolta.'}
  ],
  comprende:{di:'Un peón pasado protegido ata al rey rival: tu rey queda libre para atacar en otro lado.'},
  practica:{tipo:'casilla',fen:'6k1/pp3ppp/8/3P4/4P3/8/PP3PPP/6K1 w - - 0 1',casillas:['d5'],
    di:'Toca tu peón pasado protegido.',pista:'Está pasado y otro peón lo defiende.',bien:'¡Correcto! El peón de d5.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3ppp/8/4p3/3p4/8/PP3PPP/6K1 b - - 0 1',casillas:['d4'],
    di:'Juegas con negras. Toca tu peón pasado protegido.',pista:'Lo defiende otro peón.',bien:'¡Bien! El peón de d4.'}
};

/* N4-001 · Interferencia (Nivel II) */
L['N4-001']={
  tactica:true, motivo:'Interferencia',
  objetivo:'Vas a aprender a cortar la línea de un defensor rival interponiendo una pieza que ofreces.',
  idea:'En la **interferencia** pones una pieza **en medio** de la línea por la que el rival defiende algo. Si la captura, pierde material; si no, su defensa queda **cortada**.',
  descubre:{fen:'2r3k1/pp3p1p/6pQ/5NP1/6N1/2q5/P5PP/7K w - - 0 1',di:'Tu dama y tu caballo de f5 apuntan a g7. ¿Por qué no das mate ya?'},
  observa:[
    {flechas:[['h6','g7','amenaza'],['f5','g7','defensa']],marcas:[['g7','clave']],di:'Amenazas Dg7#: el caballo de f5 protege esa casilla.',sencillo:'Quieres dar mate en g7.'},
    {flechas:[['c3','g7','linea']],marcas:[['g7','clave']],di:'Pero la dama negra de c3 defiende g7 por la diagonal. Si Dg7+, …Dxg7.',sencillo:'La dama negra cuida g7 desde lejos.'},
    {jugada:'g4f6',flechas:[['c3','f6','linea']],marcas:[['f6','clave'],['g8','jaque']],di:'Cf6+!: el caballo se pone en medio de la diagonal, con jaque. Lo ofreces.',sencillo:'El caballo corta la diagonal.'},
    {flechas:[['h6','g7','amenaza']],marcas:[['g7','clave']],di:'Si …Rh8, la dama negra ya no llega a g7: Dg7#.',sencillo:'Si el rey se aparta, Dg7#.'},
    {jugada:'c3f6',di:'…Dxf6: única forma de evitar el mate. La dama negra acepta el caballo…',sencillo:'La dama negra se come el caballo.'},
    {jugada:'g5f6',flechas:[['h6','g7','amenaza']],di:'…y gxf6: ganas la dama por un caballo, y Dg7# vuelve a amenazar.',sencillo:'¡Ganas la dama!'}
  ],
  comprende:{di:'Busca la línea por la que el rival defiende. Tápala con una pieza: si la captura, pierde material; si no, la defensa desaparece.'},
  practica:{fen:'2r3k1/pp3p1p/6pQ/5NP1/6N1/2q5/P5PP/7K w - - 0 1',linea:['g4f6','c3f6','g5f6'],
    di:'Corta la defensa de la dama negra.',pistas:['Interponte en la diagonal c3–g7 con jaque.','Tu peón de g5 protege f6.'],
    bien:'¡Bien! Si el rey se aparta, Dg7#; si captura, ganas la dama.'},
  hazlo:{fen:'k7/pp5p/5Q2/1n6/1pn5/qP6/P1P3PP/1K3R2 b - - 0 1',linea:['b5c3','f6c3','b4c3'],
    di:'Juegas con negras. Amenazas …Db2#, pero la dama de f6 lo impide. Córtala.',pistas:['Interponte en la diagonal f6–b2 con jaque.','Tu peón de b4 protege c3.'],
    bien:'¡Correcto! Si Ra1, …Db2#; si Dxc3, bxc3.'},
  comprueba:{fen:'1k3r2/p1p3pp/Qp6/1PN5/1N6/5q2/PP5P/K7 w - - 0 1',linea:['b4c6','f3c6','b5c6'],
    di:'Ahora en el otro flanco. Corta la defensa.',pistas:['¿Por dónde defiende b7 la dama negra?'],
    bien:'¡Excelente! Cc6+: si …Ra8, Db7#; si …Dxc6, bxc6.'}
};

/* N4-011 · Coordinación de piezas */
L['N4-011']={
  tactica:false,
  objetivo:'Vas a aprender a que todas tus piezas trabajen juntas.',
  idea:'Las piezas **coordinadas** se apoyan y atacan los mismos objetivos. Busca la pieza que **no colabora** y llévala adonde sea útil.',
  descubre:{fen:'3r2k1/pp3ppp/2n5/8/8/2N5/PP3PPP/R5K1 w - - 0 1',di:'¿Cuál de tus piezas no está haciendo nada?'},
  observa:[
    {marcas:[['a1','clave']],di:'La torre de a1 está en una columna cerrada, sin trabajo.',sencillo:'La torre de a1 está parada.'},
    {jugada:'a1d1',flechas:[['d1','d8','linea']],di:'Td1: la torre llega a la columna abierta y disputa la columna d.',sencillo:'La torre entra en juego.'}
  ],
  comprende:{di:'Cada pieza debe tener una tarea. Si una no la tiene, búscale una.'},
  practica:{tipo:'casilla',fen:'3r2k1/pp3ppp/2n5/8/8/2N5/PP3PPP/R5K1 w - - 0 1',casillas:['a1'],
    di:'Toca la pieza que no colabora.',pista:'Mira las esquinas.',bien:'¡Correcto! La torre de a1.'},
  hazlo:{fen:'3r2k1/pp3ppp/2n5/8/8/2N5/PP3PPP/R5K1 w - - 0 1',linea:['a1d1'],acepta:{0:['a1e1','a1c1']},concepto:true,objetivoEquilibrio:true,
    di:'Pon tu torre a trabajar.',pistas:['Llévala a una columna abierta.'],
    mal:{'*':'Lleva la torre a una columna abierta.'},bien:'¡Bien! La torre ya colabora.'},
  comprueba:{fen:'r5k1/pp3ppp/2n5/8/8/2N5/PP3PPP/3R2K1 b - - 0 1',linea:['a8d8'],acepta:{0:['a8e8','a8c8']},concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Pon tu torre a trabajar.',pistas:['Llévala a una columna abierta.'],
    mal:{'*':'Lleva la torre a una columna abierta.'},bien:'¡Excelente! Torre activa.'}
};

/* N4-012 · Cuándo cambiar piezas */
L['N4-012']={
  tactica:false,
  objetivo:'Vas a aprender cuándo conviene cambiar piezas.',
  idea:'Si vas **ganando material**, cambia piezas: con menos piezas, tu ventaja pesa más y el rival tiene menos ataque. Si vas perdiendo, **evita** los cambios.',
  descubre:{fen:'6k1/1p3pp1/2q4p/8/8/2Q5/1R3PPP/6K1 w - - 0 1',di:'Tienes una torre de más. ¿Cambiarías las damas?'},
  observa:[
    {jugada:'c3c6',di:'Dxc6: cambias las damas.',sencillo:'Cambias las damas.'},
    {jugada:'b7c6',di:'…bxc6: ahora tu torre de más decide el final, y las negras ya no pueden atacar a tu rey.',sencillo:'Sin damas, tu ventaja es más fácil de ganar.'}
  ],
  comprende:{di:'Ventaja de material: cambia piezas (sobre todo las damas). Desventaja: mantenlas.'},
  practica:{fen:'6k1/1p3pp1/2q4p/8/8/2Q5/1R3PPP/6K1 w - - 0 1',linea:['c3c6'],concepto:true,
    di:'Vas ganando: cambia las damas.',pistas:['Captura la dama negra.'],
    mal:{'*':'Con una torre de más, cambiar las damas es lo más seguro.'},bien:'¡Bien! Final de torre de más: ganado.'},
  hazlo:{fen:'6k1/1r3ppp/2q5/8/8/2Q4P/1P3PP1/6K1 b - - 0 1',linea:['c6c3'],concepto:true,
    di:'Juegas con negras. Vas ganando: cambia las damas.',pistas:['Captura la dama blanca.'],
    mal:{'*':'Con una torre de más, cambia las damas.'},bien:'¡Correcto!'}
};

/* N4-020 · Sacrificio de calidad */
L['N4-020']={
  tactica:true, motivo:'Sacrificio de calidad',
  objetivo:'Vas a aprender a entregar una torre por una pieza menor cuando eso gana.',
  idea:'**Sacrificar la calidad** es dar una torre por un alfil o un caballo. Vale la pena si eliminas a un **defensor clave** y tu ataque se vuelve imparable.',
  descubre:{fen:'r4rk1/pp2qppp/5n2/8/8/3QPR2/PP3PPP/RB4K1 w - - 0 1',di:'Tu dama y tu alfil atacan h7, pero el caballo de f6 lo defiende. ¿Y si desaparece?'},
  observa:[
    {flechas:[['d3','h7','ataque'],['f6','h7','defensa']],marcas:[['f6','clave']],di:'El caballo de f6 es el único defensor de h7.',sencillo:'El caballo cuida h7.'},
    {jugada:'f3f6',di:'Txf6!: entregas la torre por el caballo. Si …gxf6 o …Dxf6, llega Dxh7#.',sencillo:'¡La torre se come al defensor!'}
  ],
  comprende:{di:'Una torre vale más que un caballo, pero un defensor clave puede valer una partida.'},
  practica:{fen:'r4rk1/pp2qppp/5n2/8/8/3QPR2/PP3PPP/RB4K1 w - - 0 1',linea:['f3f6'],
    di:'Sacrifica la calidad para eliminar al defensor.',pistas:['La torre puede capturar el caballo.'],bien:'¡Bien! Si recapturan, Dxh7#.'},
  hazlo:{fen:'rb4k1/pp3ppp/3qpr2/8/8/5N2/PP2QPPP/R4RK1 b - - 0 1',linea:['f6f3'],
    di:'Juegas con negras. Sacrifica la calidad para eliminar al defensor.',pistas:['El caballo de f3 defiende h2.'],bien:'¡Correcto! …Txf3.'}
};

})();
