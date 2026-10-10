/* Aprende Ajedrez · lecciones del NIVEL CINCO (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};

/* N5-012 · Sacrificio para mate */
L['N5-012']={
  tactica:true, motivo:'Sacrificio para mate',
  objetivo:'Vas a aprender a entregar una torre para abrir el camino de tu dama hacia el rey.',
  idea:'A veces el rey rival está protegido por **una sola casilla**. Si sacrificas una pieza para **sacarlo** de ahí, tu dama llega con jaques hasta el mate.',
  descubre:{fen:'r2q1rk1/pp3pp1/2n5/8/8/3B3R/PP3PPP/3Q2K1 w - - 0 1',di:'La columna h está abierta y tu alfil apunta a h7. ¿Cómo entra tu dama?'},
  observa:[
    {flechas:[['h3','h8','linea'],['d3','h7','linea']],marcas:[['h7','clave']],di:'Tu torre domina la columna h y tu alfil vigila h7.',sencillo:'Torre y alfil apuntan al rey.'},
    {jugada:'h3h8',marcas:[['g8','jaque']],di:'Th8+!!: entregas la torre.',sencillo:'¡La torre se ofrece!'},
    {jugada:'g8h8',di:'…Rxh8: la única jugada. El rey sale a la esquina.',sencillo:'El rey se la come.'},
    {jugada:'d1h5',marcas:[['h8','jaque']],di:'Dh5+: la dama llega por la columna que abrió la torre.',sencillo:'La dama da jaque.'},
    {jugada:'h8g8',di:'…Rg8',sencillo:'El rey vuelve.'},
    {jugada:'h5h7',marcas:[['g8','jaque']],di:'Dh7#: protegida por el alfil. ¡Mate!',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Antes de sacrificar, cuenta los jaques que siguen: si el rey nunca escapa, el sacrificio es correcto.'},
  practica:{fen:'r2q1rk1/pp3pp1/2n5/8/8/3B3R/PP3PPP/3Q2K1 w - - 0 1',linea:['h3h8','g8h8','d1h5','h8g8','h5h7'],meta:'mate',
    di:'Mate en tres con un sacrificio.',pistas:['Entrega la torre en h8.','Después, la dama por la columna h.'],
    bien:'¡Mate! Th8+, Rxh8, Dh5+ y Dh7#.'},
  hazlo:{fen:'3q2k1/pp3ppp/3b3r/8/8/2N5/PP3PP1/R2Q1RK1 b - - 0 1',linea:['h6h1','g1h1','d8h4','h1g1','h4h2'],meta:'mate',
    di:'Juegas con negras. Mate en tres.',pistas:['Tu torre y tu alfil apuntan a h2.'],
    bien:'¡Correcto! …Th1+, Rxh1, …Dh4+ y …Dh2#.'},
  comprueba:{fen:'1kr1q2r/1pp3pp/5n2/8/8/R3B3/PPP3PP/1K2Q3 w - - 0 1',linea:['a3a8','b8a8','e1a5','a8b8','a5a7'],meta:'mate',
    di:'Ahora en el otro flanco. Mate en tres.',pistas:['La columna a está abierta.'],
    bien:'¡Excelente! Ta8+, Rxa8, Da5+ y Da7#.'}
};

/* N5-013 · Dar la dama para mate */
L['N5-013']={
  tactica:true, motivo:'Sacrificio de dama',
  objetivo:'Vas a aprender a entregar la dama cuando el mate que sigue es seguro.',
  idea:'La dama es tu pieza más valiosa, pero **el mate vale más**. Si su sacrificio obliga al rival a capturar y deja el mate listo, entrégala.',
  descubre:{fen:'4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',di:'Morphy contra el duque de Brunswick y el conde Isouard, París 1858. El caballo de d7 es el último defensor de d8.'},
  observa:[
    {flechas:[['d1','d8','linea'],['g5','d8','linea']],marcas:[['d8','clave']],di:'Tu torre y tu alfil apuntan a d8; solo el caballo de d7 lo cubre.',sencillo:'d8 es la casilla del mate.'},
    {jugada:'b3b8',marcas:[['e8','jaque']],di:'16.Db8+!!: la dama se entrega.',sencillo:'¡La dama se ofrece!'},
    {jugada:'d7b8',di:'16…Cxb8: única jugada. El caballo deja d8.',sencillo:'El caballo se la come.'},
    {jugada:'d1d8',marcas:[['e8','jaque']],di:'17.Td8#: la torre, protegida por el alfil, da mate.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Busca la casilla del mate y la pieza que la defiende. Si tu dama puede desviarla con jaque, el mate llega.'},
  practica:{fen:'4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',linea:['b3b8','d7b8','d1d8'],meta:'mate',
    di:'Mate en dos, como Morphy.',pistas:['El caballo de d7 defiende d8.','Da jaque con la dama donde el caballo deba capturarla.'],
    bien:'¡Mate! El final más famoso de la historia.'},
  hazlo:{fen:'2k1rb1r/ppp3pp/2n2q2/3B1b2/5P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 14',linea:['f6c3','b2c3','f8a3'],meta:'mate',
    di:'Schulder contra Boden, 1853. Juegas con negras. Mate en dos.',pistas:['Tu alfil de f5 vigila b1 y d3.','Abre la columna b con un sacrificio.'],
    bien:'¡Correcto! …Dxc3+, bxc3 y …Aa3#: el mate de Boden.'},
  comprueba:{fen:'rnb1kb1r/pp3ppp/2p5/4q3/4n3/3Q4/PPPB1PPP/2KR1BNR w kq - 0 9',linea:['d3d8','e8d8','d2g5','d8c7','g5d8'],meta:'mate',
    di:'Réti contra Tartakower, Viena 1910 (Caro-Kann). Mate en tres.',pistas:['Tu torre de d1 está detrás de la dama.','Sacrifica la dama con jaque en d8.'],
    bien:'¡Excelente! Dd8+, Rxd8, Ag5+ (jaque doble) y Ad8#.'}
};

/* N5-014 · Combinación de Lasker */
L['N5-014']={
  tactica:true, motivo:'Sacrificio doble de alfiles',
  objetivo:'Vas a aprender la combinación de Lasker: sacrificar los dos alfiles para desnudar al rey.',
  idea:'Con **Axh7+** y **Axg7** se eliminan los dos peones que protegen al rey. Después, la dama y una torre llegan a la columna abierta.',
  descubre:{fen:'r4rk1/1b2bppp/ppq1p3/2ppB2n/5P2/1P1BP3/P1PPQ1PP/R4RK1 w - - 0 15',di:'Lasker contra Bauer, Ámsterdam 1889. Las negras acaban de capturar en h5. Tus dos alfiles apuntan al enroque.'},
  observa:[
    {flechas:[['d3','h7','linea'],['e5','g7','linea']],marcas:[['h7','clave'],['g7','clave']],di:'Tus alfiles apuntan a h7 y g7: los peones que protegen al rey.',sencillo:'Dos alfiles contra el enroque.'},
    {jugada:'d3h7',marcas:[['g8','jaque']],di:'15.Axh7+!: primer sacrificio.',sencillo:'Primer alfil entregado.'},
    {jugada:'g8h7',di:'15…Rxh7',sencillo:'El rey lo captura.'},
    {jugada:'e2h5',marcas:[['h7','jaque']],di:'16.Dxh5+: la dama recupera la pieza con jaque.',sencillo:'La dama entra con jaque.'},
    {jugada:'h7g8',di:'16…Rg8',sencillo:'El rey vuelve.'},
    {jugada:'e5g7',di:'17.Axg7!!: segundo sacrificio. Si …f6, Dg6 o Tf3 deciden.',sencillo:'¡Segundo alfil entregado!'},
    {jugada:'g8g7',di:'17…Rxg7',sencillo:'El rey captura de nuevo.'},
    {jugada:'h5g4',marcas:[['g7','jaque']],di:'18.Dg4+',sencillo:'Jaque.'},
    {jugada:'g7h7',di:'18…Rh7',sencillo:'El rey se esconde.'},
    {jugada:'f1f3',flechas:[['f3','h3','mov']],di:'19.Tf3: la torre va a h3. Las negras deben dar su dama para evitar el mate.',sencillo:'La torre llega para el mate.'}
  ],
  comprende:{di:'Dama y torre contra un rey sin peones ganan casi siempre. Los dos alfiles son el precio para dejarlo desnudo.'},
  practica:{fen:'r4rk1/1b2bppp/ppq1p3/2ppB2n/5P2/1P1BP3/P1PPQ1PP/R4RK1 w - - 0 15',linea:['d3h7','g8h7','e2h5','h7g8','e5g7'],
    di:'Repite la combinación de Lasker.',pistas:['Primer sacrificio en h7.','Después de la dama en h5, el segundo alfil en g7.'],
    bien:'¡Bien! Los dos alfiles abrieron el enroque.'},
  hazlo:{fen:'r4r2/1b2bpk1/ppq1p3/2pp3Q/5P2/1P2P3/P1PP2PP/R4RK1 w - - 0 18',linea:['h5g4','g7h7','f1f3'],acepta:{2:['g4h3','g4h5']},
    di:'Termina el ataque: lleva tus piezas mayores contra el rey.',pistas:['Empieza con jaque en g4.','Después, la torre de f1 se suma por la tercera fila.'],
    bien:'¡Correcto! El mate por la columna h ya no se puede parar sin perder la dama.'}
};

/* N5-018 · Combinaciones múltiples */
L['N5-018']={
  tactica:true, motivo:'Combinación',
  objetivo:'Vas a aprender a encadenar varias ideas tácticas en una sola combinación.',
  idea:'Una **combinación múltiple** junta varios motivos: desviación, ataque a la dama, jaque descubierto… Cada jugada crea una nueva amenaza.',
  descubre:{fen:'2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - - 0 22',di:'Rotlewi contra Rubinstein, Łódź 1907. Juegas con negras. Tu dama de h4 está atacada. ¿La retiras?'},
  observa:[
    {flechas:[['g3','h4','ataque'],['b7','e4','linea'],['b6','g1','linea']],marcas:[['h4','amenazada']],di:'Tu dama está atacada, pero tus alfiles apuntan al rey blanco.',sencillo:'Tus alfiles miran al rey.'},
    {jugada:'c8c3',di:'22…Txc3!: dejas la dama atacada.',sencillo:'La torre se come el caballo.'},
    {jugada:'g3h4',di:'23.gxh4 (23.Axb7 resistía más, pero también pierde).',sencillo:'Las blancas toman la dama.'},
    {jugada:'d8d2',flechas:[['d2','e2','ataque']],di:'23…Td2!!: la torre ataca la dama blanca y desvía su defensa.',sencillo:'Otra torre se ofrece.'},
    {jugada:'e2d2',di:'24.Dxd2 (24.Tf2 aguantaba más, con una pieza menos).',sencillo:'La dama la captura.'},
    {jugada:'b7e4',marcas:[['h1','jaque']],di:'24…Axe4+: jaque, y el alfil de b6 también apunta a g1.',sencillo:'Jaque de alfil.'},
    {jugada:'d2g2',di:'25.Dg2',sencillo:'La dama tapa.'},
    {jugada:'c3h3',di:'25…Th3!!: amenaza Txh2#. Las blancas se rindieron.',sencillo:'La última torre decide.'}
  ],
  comprende:{di:'En una combinación múltiple cada jugada fuerza la siguiente. Busca jaques, capturas y amenazas una tras otra.'},
  practica:{fen:'2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - - 0 22',linea:['c8c3','g3h4','d8d2','e2d2','b7e4','d2g2','c3h3'],acepta:{6:['c3c2']},
    di:'Juegas con negras. Repite la combinación de Rubinstein.',pistas:['Deja tu dama atacada: captura en c3.','Después, la otra torre ataca a la dama blanca.'],
    bien:'¡Brillante! Una de las combinaciones más bellas de la historia.'},
  hazlo:{fen:'6k1/1b3ppp/pb2p3/1p2P3/1P2BPnP/P1r5/1B1Q3P/R4R1K b - - 0 24',linea:['b7e4','d2g2','c3h3'],acepta:{2:['c3c2']},
    di:'Juegas con negras. Las blancas capturaron tu torre. Termina la combinación.',pistas:['Empieza con un jaque de alfil.','Después, tu torre amenaza mate en h2.'],
    bien:'¡Correcto! …Axe4+, Dg2 y …Th3: el mate en h2 no se puede parar.'}
};

/* N5-015 · Mates de piezas menores */
L['N5-015']={
  tactica:true, motivo:'Mate con piezas menores',
  objetivo:'Vas a aprender que alfiles y caballos también pueden dar mate si el rey está encerrado.',
  idea:'Las **piezas menores** dan mate cuando el rey está rodeado de sus propias piezas. Dos alfiles cruzados o un alfil con jaque doble son patrones típicos.',
  descubre:{fen:'rnbk1b1r/pp3ppp/2p5/4q3/4n3/8/PPPB1PPP/2KR1BNR w - - 0 10',di:'Réti contra Tartakower, 1910. El rey negro acaba de capturar tu dama en d8. ¿Puede escapar?'},
  observa:[
    {flechas:[['d1','d8','linea']],marcas:[['d8','clave']],di:'Tu torre de d1 apunta al rey a través del alfil de d2.',sencillo:'La torre está detrás del alfil.'},
    {jugada:'d2g5',marcas:[['d8','jaque']],di:'10.Ag5+: jaque doble, del alfil y de la torre.',sencillo:'Jaque doble.'},
    {jugada:'d8c7',di:'10…Rc7 (si …Re8, Td8#).',sencillo:'El rey huye.'},
    {jugada:'g5d8',marcas:[['c7','jaque']],di:'11.Ad8#: el alfil da mate protegido por la torre.',sencillo:'¡Mate de alfil!'}
  ],
  comprende:{di:'Un rey rodeado de sus propias piezas no necesita una dama para recibir mate: basta un alfil o un caballo bien apoyado.'},
  practica:{fen:'rnbk1b1r/pp3ppp/2p5/4q3/4n3/8/PPPB1PPP/2KR1BNR w - - 0 10',linea:['d2g5','d8c7','g5d8'],meta:'mate',
    di:'Mate en dos con el alfil.',pistas:['Busca un jaque doble.'],
    bien:'¡Mate! Ag5+ y Ad8#.'},
  hazlo:{fen:'2k1rb1r/ppp3pp/2n5/3B1b2/5P2/2P1BQ2/P2N1P1P/2KR3R b - - 0 15',linea:['f8a3'],meta:'mate',
    di:'Juegas con negras. Mate con un alfil.',pistas:['Tu alfil de f5 ya vigila b1 y d3.'],
    bien:'¡Correcto! …Aa3#: el mate de Boden, con dos alfiles cruzados.'}
};


/* N5-025 · Mate con dos alfiles */
L['N5-025']={
  tactica:false, motivo:'Mate con dos alfiles',
  objetivo:'Vas a aprender a dar mate con rey y dos alfiles contra el rey solo.',
  idea:'Los **dos alfiles**, uno al lado del otro, forman una **pared** que el rey no puede cruzar. Tu rey ayuda a empujarlo hacia una **esquina**, donde llega el mate.',
  descubre:{fen:'k7/8/1K6/8/3B4/8/8/5B2 w - - 0 1',di:'El rey negro está en la esquina. ¿Qué casillas le quitan tus alfiles y tu rey?'},
  observa:[
    {flechas:[['d4','a7','linea'],['f1','a6','linea']],marcas:[['a7','clave'],['b8','clave']],di:'Los alfiles cruzan sus diagonales: el rey solo puede moverse entre a8 y b8.',sencillo:'Los alfiles hacen de pared.'},
    {fen:'5B1k/8/6K1/3B4/8/8/8/8 w - - 0 1',marcas:[['h8','clave']],di:'Otra esquina: el rey blanco cubre g7 y h7, y el alfil de d5 cubre g8.',sencillo:'Todo está cubierto menos el jaque.'},
    {jugada:'f8g7',marcas:[['h8','jaque']],di:'Ag7#: el alfil de casillas oscuras da el jaque final.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Alfiles juntos como una pared, rey cerca del rey rival, y el mate llega en la esquina.'},
  practica:{tipo:'casilla',fen:'8/8/8/3k4/8/2BB4/8/3K4 b - - 0 1',casillas:['c5','c6','d6','e6'],verificar:'rey-va:b',
    di:'Toca todas las casillas a las que puede ir el rey negro.',pista:'Los alfiles vigilan sus diagonales: descártalas.',
    bien:'¡Bien! Los alfiles ya le cierran medio tablero.'},
  hazlo:{fen:'5B1k/8/6K1/3B4/8/8/8/8 w - - 0 1',linea:['f8g7'],meta:'mate',
    di:'Mate en una.',pistas:['El alfil de d5 cubre g8.'],
    bien:'¡Mate con dos alfiles!'},
  comprueba:{fen:'k1B5/8/1K6/4B3/8/8/8/8 w - - 0 1',linea:['c8b7'],meta:'mate',
    di:'Ahora en la otra esquina. Mate en una.',pistas:['El alfil de e5 ya cubre b8.'],
    bien:'¡Excelente! Ab7#.'}
};

/* N5-026 · Triangulación */
L['N5-026']={
  tactica:false, motivo:'Triangulación',
  objetivo:'Vas a aprender a perder un tiempo con el rey para dejar al rival en zugzwang.',
  idea:'En la **triangulación** tu rey da una vuelta por **tres casillas** y vuelve a la misma posición. El rival no puede imitarlo y le toca mover a él: **zugzwang**.',
  descubre:{fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1',di:'Si jugaran las negras, perderían. Pero te toca a ti. ¿Cómo le pasas el turno?'},
  observa:[
    {marcas:[['d5','clave'],['e5','clave'],['d4','clave']],di:'Tu rey hará un triángulo: d5, e5, d4 y de vuelta a d5.',sencillo:'Un triángulo con el rey.'},
    {jugada:'d5e5',di:'Re5',sencillo:'Primer paso.'},
    {jugada:'d7c6',di:'…Rc6',sencillo:'El rey negro vigila.'},
    {jugada:'e5d4',di:'Rd4!',sencillo:'Segundo paso.'},
    {jugada:'c6d7',di:'…Rd7 (no tiene una casilla equivalente para imitarte).',sencillo:'El rey negro vuelve.'},
    {jugada:'d4d5',marcas:[['d7','clave']],di:'Rd5: la misma posición, pero ahora **juegan las negras**. Están en zugzwang y pierden.',sencillo:'Ahora le toca al rival.'}
  ],
  comprende:{di:'Si la posición es buena para ti pero te toca mover, da un rodeo de tres casillas con el rey.'},
  practica:{fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1',linea:['d5e5','d7c6','e5d4','c6d7','d4d5'],concepto:true,
    di:'Triangula para pasarle el turno al rival.',pistas:['Re5, Rd4 y de vuelta a d5.'],
    mal:{'*':'Haz el triángulo con tu rey: e5, d4 y d5.'},
    bien:'¡Bien! Ahora las negras están en zugzwang.'},
  hazlo:{fen:'8/1p1k4/1P6/2PK4/8/8/8/8 w - - 0 1',linea:['d5d4','d7c6','d4c4','c6d7','c4d5'],concepto:true,
    di:'Hazlo tú con otro triángulo: d4, c4 y de vuelta a d5.',pistas:['Rd4, Rc4 y Rd5.'],
    mal:{'*':'Haz el triángulo con tu rey: d4, c4 y d5.'},
    bien:'¡Correcto! Las negras están en zugzwang.'}
};

/* N5-027 · Zugzwang recíproco */
L['N5-027']={
  tactica:false, motivo:'Zugzwang recíproco',
  objetivo:'Vas a aprender las posiciones en las que pierde quien tiene que mover.',
  idea:'En un **zugzwang recíproco** cualquier jugada empeora la posición, **para los dos bandos**. Gana quien consigue que le toque mover al rival.',
  descubre:{fen:'8/8/8/3Kp3/4Pk2/8/8/8 w - - 0 1',di:'Cada rey ataca el peón rival. ¿Te gustaría que te tocara mover?'},
  observa:[
    {flechas:[['d5','e5','ataque'],['f4','e4','ataque']],di:'Tu rey ataca e5 y el rey negro ataca e4. Ninguno puede capturar todavía.',sencillo:'Los dos peones están atacados.'},
    {marcas:[['d5','clave']],di:'Si mueve el rey blanco, deja de defender e4 y pierde su peón. Si mueve el negro, pierde el suyo.',sencillo:'Quien mueve, pierde.'},
    {jugada:'d5c5',di:'Te toca y tienes que alejarte…',sencillo:'El rey blanco se aparta.'},
    {jugada:'f4e4',di:'…Rxe4: las negras ganan el peón y la partida.',sencillo:'Las negras ganan.'}
  ],
  comprende:{di:'En estas posiciones cuenta los tiempos: llega a la casilla clave cuando le toque mover al rival.'},
  practica:{fen:'8/8/8/2K1p3/4Pk2/8/8/8 w - - 0 1',linea:['c5d5'],
    di:'Crea el zugzwang recíproco con las negras a mover.',pistas:['Ataca el peón de e5 con el rey.'],
    bien:'¡Bien! Ahora las negras deben mover y pierden su peón.'},
  hazlo:{fen:'8/8/8/4pK2/2k1P3/8/8/8 b - - 0 1',linea:['c4d4'],
    di:'Juegas con negras. Crea el zugzwang recíproco.',pistas:['Ataca el peón de e4 con tu rey.'],
    bien:'¡Correcto! Las blancas deben mover y pierden su peón.'}
};

/* N5-028 · Dama contra peón */
L['N5-028']={
  tactica:false, motivo:'Dama contra peón',
  objetivo:'Vas a aprender a ganar con dama contra un peón en séptima.',
  idea:'Con **jaques** obligas al rey rival a ponerse **delante** de su peón. En ese momento ganas un tiempo para **acercar tu rey**. Repites hasta capturar el peón.',
  descubre:{fen:'Q7/8/8/8/8/8/3pk3/K7 w - - 0 1',di:'El peón negro está a punto de coronar y tu rey está lejos. ¿Cómo lo detiene la dama?'},
  observa:[
    {jugada:'a8e4',marcas:[['e2','jaque']],di:'De4+: jaque. La dama se acerca al peón.',sencillo:'La dama da jaque.'},
    {fen:'K7/8/8/8/8/4Q3/3p4/3k4 w - - 0 1',marcas:[['d1','clave']],di:'Tras varios jaques, el rey negro tiene que ponerse delante del peón, en d1.',sencillo:'El rey tapa su propio peón.'},
    {jugada:'a8a7',di:'Ra7: ese tiempo lo usa tu rey para acercarse. Se repite hasta que llega.',sencillo:'Tu rey se acerca.'}
  ],
  comprende:{di:'Jaques hasta que el rey tape su peón; entonces, un paso de tu rey. Ojo: con peones de alfil o de torre a veces es tablas.'},
  practica:{fen:'Q7/8/8/8/8/8/3pk3/K7 w - - 0 1',linea:['a8e4'],acepta:{0:['a8e8','a8a6','a8g2']},concepto:true,
    di:'Empieza a perseguir al rey con jaques.',pistas:['Busca un jaque que acerque la dama al peón.'],
    mal:{'*':'Empieza con un jaque de dama.'},
    bien:'¡Bien! Con jaques, el rey acabará delante de su peón.'}
};

/* N5-029 · Alfiles de color opuesto */
L['N5-029']={
  tactica:false, motivo:'Alfiles de distinto color',
  objetivo:'Vas a aprender por qué los finales de alfiles de distinto color suelen ser tablas.',
  idea:'Con **alfiles de distinto color**, cada alfil controla casillas que el otro no puede disputar. El bando defensor **bloquea** los peones en las casillas de su alfil y logra tablas aunque tenga peones de menos.',
  descubre:{fen:'8/3k4/8/2P5/2BK3b/8/8/8 b - - 0 1',di:'Tienes un peón menos con negras. ¿Puedes salvar la partida?'},
  observa:[
    {marcas:[['c6','clave'],['c7','clave']],di:'El peón de c5 necesita pasar por c6 y c7.',sencillo:'El peón quiere avanzar.'},
    {jugada:'d7c6',marcas:[['c6','clave']],di:'…Rc6: tu rey se pone delante del peón. El alfil blanco no puede echarlo.',sencillo:'El rey bloquea el peón.'}
  ],
  comprende:{di:'Con alfiles de distinto color, bloquea los peones con el rey o en casillas de tu alfil: el otro alfil no podrá quitarte de ahí.'},
  practica:{tipo:'casilla',fen:'8/3k4/8/2P5/2BK3b/8/8/8 b - - 0 1',casillas:['c6'],
    di:'Juegas con negras. Toca la casilla donde tu rey bloquea el peón.',pista:'Justo delante del peón blanco.',
    bien:'¡Bien! Con el rey en c6 el peón no avanza: tablas.'}
};

/* N5-030 · Finales de caballo */
L['N5-030']={
  tactica:false, motivo:'Finales de caballo',
  objetivo:'Vas a aprender a frenar un peón con el caballo.',
  idea:'El **caballo** es lento: necesita varias jugadas para llegar. Cuenta los saltos y llévalo a una casilla desde la que **controle la casilla de coronación** o la de delante del peón.',
  descubre:{fen:'8/8/8/8/k7/1p6/8/4N1K1 w - - 0 1',di:'El peón de b3 corre hacia b1. ¿Llega tu caballo?'},
  observa:[
    {flechas:[['e1','d3','mov']],marcas:[['b2','clave']],di:'Cd3: el caballo vigila b2 y c1, las casillas que necesita el peón.',sencillo:'El caballo llega a tiempo.'},
    {jugada:'e1d3',di:'Cd3: si …b2, Cxb2.',sencillo:'El peón no puede pasar.'}
  ],
  comprende:{di:'Cuenta los saltos del caballo antes de que el peón avance: a veces llega justo.'},
  practica:{fen:'8/8/8/8/k7/1p6/8/4N1K1 w - - 0 1',linea:['e1d3'],acepta:{0:['e1f3']},concepto:true,objetivoEquilibrio:true,
    di:'Detén el peón con el caballo.',pistas:['Desde d3 vigila b2.'],
    mal:{'*':'El peón coronará. Lleva el caballo a d3 o a f3.'},
    bien:'¡Bien! El peón ya no corona.'},
  hazlo:{fen:'8/8/8/8/7k/6p1/8/1K1N4 w - - 0 1',linea:['d1e3'],acepta:{0:['d1c3']},concepto:true,objetivoEquilibrio:true,
    di:'Ahora en el otro flanco. Detén el peón.',pistas:['Busca una casilla desde la que vigile g2.'],
    mal:{'*':'El peón coronará. Lleva el caballo a e3.'},
    bien:'¡Correcto!'}
};

/* N5-032 · Torre activa y pasiva */
L['N5-032']={
  tactica:false, motivo:'Torre activa',
  objetivo:'Vas a aprender a preferir una torre activa a una torre pasiva.',
  idea:'Una **torre activa** ataca peones y corta al rey; una **torre pasiva** solo defiende. En los finales, actívala aunque cueste un peón.',
  descubre:{fen:'3r2k1/1p3ppp/p7/8/8/P6P/1P3PP1/2R3K1 w - - 0 1',di:'Las dos torres tienen una columna abierta. ¿Dónde estaría mejor la tuya?'},
  observa:[
    {flechas:[['c1','c7','mov']],marcas:[['c7','clave']],di:'Tc7: la torre llega a la séptima fila.',sencillo:'La torre entra.'},
    {jugada:'c1c7',flechas:[['c7','b7','ataque'],['c7','f7','ataque']],di:'Desde c7 ataca b7 y f7. La torre negra tendrá que defender.',sencillo:'La torre ataca dos peones.'}
  ],
  comprende:{di:'La séptima fila es el mejor lugar de una torre en el final: ataca peones y encierra al rey.'},
  practica:{fen:'3r2k1/1p3ppp/p7/8/8/P6P/1P3PP1/2R3K1 w - - 0 1',linea:['c1c7'],concepto:true,objetivoEquilibrio:true,
    di:'Activa tu torre.',pistas:['La columna c te lleva a la séptima.'],
    mal:{'*':'Lleva tu torre a la séptima fila.'},
    bien:'¡Bien! Tu torre domina la séptima.'},
  hazlo:{fen:'2r3k1/1p3pp1/p6p/8/8/P7/1P3PPP/3R2K1 b - - 0 1',linea:['c8c2'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Activa tu torre.',pistas:['La columna c te lleva a la segunda fila blanca.'],
    mal:{'*':'Lleva tu torre a la segunda fila blanca.'},
    bien:'¡Correcto! Tu torre ataca b2.'}
};

/* N5-033 · Torre y peón de torre */
L['N5-033']={
  tactica:false, motivo:'Torre y peón de torre',
  objetivo:'Vas a aprender a defender con la torre contra un peón de torre (posición de Vancura).',
  idea:'Si la torre rival está **delante** de su peón de torre, ataca el peón **de lado** desde la tercera fila del defensor (**f6**). Así la torre rival queda atada y tu rey vigila g7.',
  descubre:{fen:'R7/6k1/P7/8/8/4K3/8/5r2 b - - 0 1',di:'Juegas con negras: torre contra torre y peón. ¿Cómo defiendes?'},
  observa:[
    {flechas:[['a8','a7','mov']],marcas:[['a7','clave']],di:'La torre blanca está delante del peón: le cuesta moverse.',sencillo:'La torre blanca está atrapada.'},
    {jugada:'f1f6',flechas:[['f6','a6','ataque']],di:'…Tf6: atacas el peón de lado. Si el rey blanco lo defiende, das jaques por detrás.',sencillo:'Tu torre ataca al peón.'}
  ],
  comprende:{di:'Torre de lado atacando el peón y rey cerca de g7: es la posición de Vancura, tablas.'},
  practica:{fen:'R7/6k1/P7/8/8/4K3/8/5r2 b - - 0 1',linea:['f1f6'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Coloca tu torre en la posición de Vancura.',pistas:['Ataca el peón de lado, desde f6.'],
    mal:{'*':'Lleva tu torre a f6 para atacar el peón de lado.'},
    bien:'¡Bien! Es la posición de Vancura: tablas.'}
};
})();
