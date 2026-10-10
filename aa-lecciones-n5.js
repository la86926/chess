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

/* N5-001 · Pareja de alfiles */
L['N5-001']={
  tactica:false, motivo:'Pareja de alfiles',
  objetivo:'Vas a aprender a conservar la pareja de alfiles.',
  idea:'Dos alfiles juntos dominan casillas de **los dos colores**. En posiciones abiertas valen más que alfil y caballo, así que **no los cambies** sin motivo.',
  descubre:{fen:'r1bq1rk1/pp2bppp/4pn2/n7/2BP4/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 11',di:'El caballo de a5 ataca a tu alfil de c4. Si lo captura, perderás la pareja de alfiles. ¿Qué haces?'},
  observa:[
    {flechas:[['a5','c4','ataque']],marcas:[['c4','amenazada']],di:'El caballo quiere cambiarse por tu alfil.',sencillo:'Te quieren quitar un alfil.'},
    {jugada:'c4e2',flechas:[['e2','a6','linea']],di:'Ae2: el alfil se aparta y conservas la pareja.',sencillo:'El alfil se retira y sigues con los dos.'}
  ],
  comprende:{di:'Si el rival intenta cambiar uno de tus alfiles por un caballo, apártalo: en el final, la pareja suele marcar la diferencia.'},
  practica:{fen:'r1bq1rk1/pp2bppp/4pn2/n7/2BP4/2N1BN2/PP3PPP/R2Q1RK1 w - - 0 11',linea:['c4e2'],acepta:{0:['c4d3','c4b5']},concepto:true,objetivoEquilibrio:true,
    di:'Conserva la pareja de alfiles.',pistas:['Retira el alfil de c4 a una casilla segura.'],
    mal:{'*':'Así el caballo puede cambiarse por tu alfil. Retíralo a e2, d3 o b5.'},
    bien:'¡Bien! Sigues con los dos alfiles.'}
};

/* N5-004 · Peón aislado de dama */
L['N5-004']={
  tactica:false, motivo:'Peón aislado',
  objetivo:'Vas a reconocer el peón aislado de dama y la casilla clave para frenarlo.',
  idea:'El **peón aislado de dama** (en d4 o d5) no tiene peones vecinos que lo defiendan. Da actividad a sus piezas, pero el rival **bloquea** la casilla de delante (d5) con una pieza.',
  descubre:{fen:'rnbq1rk1/pp2bppp/4pn2/8/2BP4/2N2N2/PP3PPP/R1BQ1RK1 b - - 2 9',di:'Caro-Kann, ataque Panov. Mira el peón blanco de d4: ¿tiene vecinos?'},
  observa:[
    {marcas:[['d4','clave']],di:'El peón de d4 está aislado: no hay peones blancos en las columnas c ni e.',sencillo:'El peón de d4 está solo.'},
    {marcas:[['d5','clave']],flechas:[['f6','d5','mov']],di:'La casilla d5, delante del peón, es ideal para un caballo negro: nadie lo echará con un peón.',sencillo:'d5 es la casilla de bloqueo.'}
  ],
  comprende:{di:'Contra el peón aislado: bloquéalo en la casilla de delante, cambia piezas y atácalo en el final.'},
  practica:{tipo:'casilla',fen:'rnbq1rk1/pp2bppp/4pn2/8/2BP4/2N2N2/PP3PPP/R1BQ1RK1 b - - 2 9',casillas:['d4'],
    di:'Toca el peón aislado.',pista:'Busca el peón sin vecinos en las columnas de al lado.',
    bien:'¡Correcto! El peón de d4 está aislado.'},
  hazlo:{tipo:'casilla',fen:'rnbq1rk1/pp2bppp/4pn2/8/2BP4/2N2N2/PP3PPP/R1BQ1RK1 b - - 2 9',casillas:['d5'],
    di:'Toca la casilla donde bloquearías el peón aislado.',pista:'Justo delante del peón.',
    bien:'¡Bien! En d5 una pieza negra frena el peón y no la pueden echar con peones.'}
};

/* N5-005 · Profilaxis */
L['N5-005']={
  tactica:false, motivo:'Profilaxis',
  objetivo:'Vas a aprender a prevenir el plan del rival antes de que ocurra.',
  idea:'La **profilaxis** consiste en preguntarte **qué quiere hacer el rival** y evitarlo con una jugada tranquila antes de que lo consiga.',
  descubre:{fen:'rn1qkbnr/pp2pppp/2p3b1/8/3P3P/6N1/PPP2PP1/R1BQKBNR b KQkq h3 0 6',di:'Caro-Kann clásica. Las blancas jugaron h4. ¿Qué amenazan contra tu alfil de g6?'},
  observa:[
    {flechas:[['h4','h5','mov']],marcas:[['g6','clave']],di:'Amenazan h5: el alfil de g6 quedaría atrapado sin casillas.',sencillo:'Quieren encerrar a tu alfil.'},
    {jugada:'h7h6',marcas:[['h7','clave']],di:'…h6: si h5, el alfil se retira a h7. Ya no hay trampa.',sencillo:'Le das una salida al alfil.'}
  ],
  comprende:{di:'Antes de jugar tu plan, pregúntate qué quiere el rival. A veces la mejor jugada solo le quita su idea.'},
  practica:{fen:'rn1qkbnr/pp2pppp/2p3b1/8/3P3P/6N1/PPP2PP1/R1BQKBNR b KQkq h3 0 6',linea:['h7h6'],objetivoEquilibrio:true,
    di:'Juegas con negras. Evita que encierren a tu alfil.',pistas:['Prepara una casilla de retirada para el alfil.'],
    bien:'¡Bien! Con …h6, el alfil tendrá h7 si avanzan a h5.'}
};

/* N5-006 · Simplificar para ganar */
L['N5-006']={
  tactica:false, motivo:'Simplificar',
  objetivo:'Vas a aprender a cambiar piezas para llegar a un final ganado.',
  idea:'Con ventaja, **cambiar piezas** te acerca a un final más fácil. Si el final de peones resultante está ganado, cambia sin dudar.',
  descubre:{fen:'3r2k1/5pp1/7p/8/8/8/P4PPP/3R2K1 w - - 0 1',di:'Tienes un peón de más en la columna a. ¿Te conviene cambiar las torres?'},
  observa:[
    {marcas:[['a2','clave']],di:'Tu peón de a2 está lejos del rey negro: es un peón pasado alejado.',sencillo:'Tu peón de a está libre.'},
    {jugada:'d1d8',marcas:[['g8','jaque']],di:'Txd8+: cambias las torres.',sencillo:'Cambias las torres.'},
    {jugada:'g8h7',di:'…Rh7: en el final de peones, el rey negro no llegará a frenar tu peón y a defender su flanco a la vez.',sencillo:'El final de peones está ganado.'}
  ],
  comprende:{di:'Antes de cambiar, imagina el final que queda: si está ganado, simplifica.'},
  practica:{fen:'3r2k1/5pp1/7p/8/8/8/P4PPP/3R2K1 w - - 0 1',linea:['d1d8'],
    di:'Simplifica a un final ganado.',pistas:['Cambia las torres.'],
    bien:'¡Bien! El final de peones con peón pasado alejado está ganado.'}
};

/* N5-009 · Enroques opuestos */
L['N5-009']={
  tactica:false, motivo:'Enroques opuestos',
  objetivo:'Vas a aprender a atacar con los peones cuando los reyes se enrocan en flancos distintos.',
  idea:'Con **enroques opuestos**, lanzar los peones contra el rey rival **no debilita a tu propio rey**. Gana quien abra antes las columnas.',
  descubre:{fen:'r2q1rk1/pp1nbpp1/4pn1p/7P/3pN3/3Q1N2/PPP2PP1/1KBR3R w - - 0 16',di:'Caro-Kann clásica: tú enrocaste largo y las negras corto. ¿Con qué peón atacarías?'},
  observa:[
    {marcas:[['b1','clave'],['g8','clave']],di:'Los reyes están en flancos opuestos.',sencillo:'Cada rey en un lado.'},
    {jugada:'g2g4',flechas:[['g4','g5','mov']],di:'g4: el peón avanza hacia el rey negro para abrir la columna g. Tu rey no corre peligro.',sencillo:'El peón va contra el rey.'}
  ],
  comprende:{di:'Con enroques opuestos, la velocidad lo es todo: lanza tus peones contra su rey.'},
  practica:{fen:'r2q1rk1/pp1nbpp1/4pn1p/7P/3pN3/3Q1N2/PPP2PP1/1KBR3R w - - 0 16',linea:['g2g4'],concepto:true,objetivoEquilibrio:true,
    di:'Lanza un peón contra el enroque negro.',pistas:['El peón de g2.'],
    mal:{'*':'Con enroques opuestos, avanza los peones hacia el rey rival: g4.'},
    bien:'¡Bien! El ataque de peones empieza.'}
};

/* N5-016 · Intermedias en cálculo */
L['N5-016']={
  tactica:true, motivo:'Jugada intermedia',
  objetivo:'Vas a aprender a buscar una jugada intermedia antes de recapturar.',
  idea:'Cuando el rival captura, no recapturas siempre al instante. Primero mira si hay una **jugada intermedia** (un jaque, una captura) que gane más.',
  descubre:{fen:'4r1k1/1b3pp1/2n4p/8/8/8/5PPK/R2qR3 w - - 0 1',di:'La dama negra acaba de capturar en d1 y ataca tus dos torres. ¿Recapturas ya?'},
  observa:[
    {flechas:[['d1','e1','ataque'],['d1','a1','ataque']],di:'Si Taxd1, …Txe1 y …: todo igualado.',sencillo:'Recapturar sin más solo iguala.'},
    {jugada:'e1e8',marcas:[['g8','jaque']],di:'Txe8+!: primero, una captura con jaque.',sencillo:'Primero, jaque.'},
    {jugada:'g8h7',di:'…Rh7',sencillo:'El rey se aparta.'},
    {jugada:'a1d1',di:'Txd1: y ahora recapturas la dama. Ganaste una torre entera.',sencillo:'Ahora sí recapturas.'}
  ],
  comprende:{di:'Antes de recapturar, busca jaques y capturas: una jugada intermedia puede cambiar el resultado.'},
  practica:{fen:'4r1k1/1b3pp1/2n4p/8/8/8/5PPK/R2qR3 w - - 0 1',linea:['e1e8','g8h7','a1d1'],
    di:'Gana material con una jugada intermedia.',pistas:['Antes de recapturar la dama, captura con jaque.'],
    bien:'¡Bien! Txe8+ y Txd1: una torre de más.'}
};

/* N5-017 · Combinación silenciosa */
L['N5-017']={
  tactica:true, motivo:'Jugada silenciosa',
  objetivo:'Vas a aprender combinaciones cuya jugada clave no es un jaque ni una captura.',
  idea:'Una **jugada silenciosa** no da jaque ni captura, pero crea una **amenaza imparable**. Al rival solo le quedan jaques sin futuro.',
  descubre:{fen:'rr4k1/5p1p/5Pp1/8/5Q2/7P/5PP1/6K1 w - - 0 1',di:'Tu peón de f6 se clava junto al rey negro. ¿Dónde estaría mejor tu dama?'},
  observa:[
    {flechas:[['f6','g7','defensa']],marcas:[['g7','clave']],di:'El peón de f6 protege g7.',sencillo:'El peón cuida g7.'},
    {jugada:'f4h6',flechas:[['h6','g7','amenaza']],di:'Dh6!: sin jaque ni captura, amenaza Dg7#. No hay defensa.',sencillo:'Amenaza mate en g7.'},
    {jugada:'a8a1',di:'…Ta1+: las negras solo pueden dar jaques…',sencillo:'Jaques de desesperación.'},
    {jugada:'g1h2',di:'Rh2: y en cuanto se acaben, llegará Dg7#.',sencillo:'El mate es inevitable.'}
  ],
  comprende:{di:'No busques solo jaques y capturas: una jugada tranquila que amenace mate puede ser la más fuerte.'},
  practica:{fen:'rr4k1/5p1p/5Pp1/8/5Q2/7P/5PP1/6K1 w - - 0 1',linea:['f4h6'],
    di:'Encuentra la jugada silenciosa que amenaza mate.',pistas:['El peón de f6 protege g7.'],
    bien:'¡Bien! Dh6 amenaza Dg7# y no hay defensa.'}
};

/* N5-022 · Buscar la mejor defensa */
L['N5-022']={
  tactica:false, motivo:'Defensa',
  objetivo:'Vas a aprender a encontrar la defensa ante una amenaza de mate.',
  idea:'Cuando el rival amenaza mate, busca la jugada que **tapa, cubre o elimina** la amenaza. Entre varias defensas, elige la que deje a tu rey **más seguro**.',
  descubre:{fen:'r4rk1/ppb2ppp/2n5/8/3P3q/2P5/PP3PPP/RNBQ1RK1 w - - 0 1',di:'La dama negra y el alfil de c7 apuntan a h2. ¿Qué amenazan?'},
  observa:[
    {flechas:[['h4','h2','amenaza'],['c7','h2','linea']],marcas:[['h2','clave']],di:'Amenazan …Dxh2#: la dama, protegida por el alfil.',sencillo:'Amenazan mate en h2.'},
    {jugada:'h2h3',di:'h3: el peón se aparta y deja al rey una salida en h2.',sencillo:'El rey tiene sitio.'}
  ],
  comprende:{di:'Ante una amenaza de mate, primero defiende. Después piensa en tu plan.'},
  practica:{fen:'r4rk1/ppb2ppp/2n5/8/3P3q/2P5/PP3PPP/RNBQ1RK1 w - - 0 1',linea:['h2h3'],acepta:{0:['g2g3','f2f4']},concepto:true,
    di:'Defiéndete de la amenaza de mate.',pistas:['La casilla h2 está atacada dos veces.'],
    mal:{'*':'Así llega …Dxh2#. Busca h3, g3 o f4.'},
    bien:'¡Bien! Ya no hay mate en h2.'}
};

/* N5-023 · Visualizar 4–5 jugadas */
L['N5-023']={
  tactica:true, motivo:'Cálculo',
  objetivo:'Vas a entrenar a ver una combinación completa de varias jugadas.',
  idea:'Para **visualizar** una combinación, recorre en tu cabeza cada jugada y cada respuesta forzada **antes de mover**. Si todas son forzadas, la combinación es segura.',
  descubre:{fen:'1q3rk1/5ppp/8/R2N4/8/7Q/5PPP/6K1 w - - 0 1',di:'Tu caballo, tu dama y tu torre rodean al rey negro. ¿Ves un mate en tres?'},
  observa:[
    {flechas:[['d5','e7','mov'],['h3','h7','linea']],di:'Tres piezas, tres jugadas: Ce7+, Dxh7+ y Th5#.',sencillo:'Piensa en las tres jugadas.'},
    {jugada:'d5e7',marcas:[['g8','jaque']],di:'Ce7+: el rey debe ir a h8.',sencillo:'Jaque de caballo.'},
    {jugada:'g8h8',di:'…Rh8',sencillo:'El rey a la esquina.'},
    {jugada:'h3h7',marcas:[['h8','jaque']],di:'Dxh7+!!: la dama se sacrifica.',sencillo:'¡La dama se entrega!'},
    {jugada:'h8h7',di:'…Rxh7',sencillo:'El rey captura.'},
    {jugada:'a5h5',marcas:[['h7','jaque']],di:'Th5#: el caballo de e7 cubre g6 y g8. Mate de Anastasia.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Calcula hasta el final antes de mover: cada jaque debe dejar al rival una sola respuesta.'},
  practica:{fen:'1q3rk1/5ppp/8/R2N4/8/7Q/5PPP/6K1 w - - 0 1',linea:['d5e7','g8h8','h3h7','h8h7','a5h5'],meta:'mate',
    di:'Mate en tres. Visualízalo antes de mover.',pistas:['Empieza con un jaque de caballo.','Después, sacrifica la dama en h7.'],
    bien:'¡Mate! Ce7+, Dxh7+ y Th5#.'}
};

/* N5-002 · Caballo contra alfil */
L['N5-002']={
  tactica:false, motivo:'Caballo contra alfil malo',
  objetivo:'Vas a aprender cuándo un caballo es mejor que un alfil.',
  idea:'Un alfil es **malo** cuando sus propios peones están en casillas de **su mismo color**: le tapan el camino. Contra él, un **caballo** activo salta a donde quiere.',
  descubre:{fen:'2k5/pp1b1ppp/2p1p3/3pP3/3P4/2P2N2/PP3PPP/6K1 w - - 0 1',di:'El alfil negro de d7 va por casillas claras. ¿Dónde están los peones negros?'},
  observa:[
    {marcas:[['c6','clave'],['d5','clave'],['e6','clave'],['f7','clave'],['h7','clave'],['b7','clave']],di:'Casi todos los peones negros están en casillas claras: el alfil queda encerrado.',sencillo:'El alfil está tapado por sus peones.'},
    {jugada:'f3g5',flechas:[['g5','h7','ataque'],['g5','f7','ataque']],di:'Cg5: el caballo ataca h7 y f7, y el alfil no puede defender bien.',sencillo:'El caballo ataca los peones.'}
  ],
  comprende:{di:'Con el centro cerrado y los peones rivales en casillas del color de su alfil, el caballo suele ser mejor.'},
  practica:{tipo:'casilla',fen:'2k5/pp1b1ppp/2p1p3/3pP3/3P4/2P2N2/PP3PPP/6K1 w - - 0 1',casillas:['b7','c6','d5','e6','f7','h7'],
    di:'Toca los peones negros que están en casillas claras.',pista:'Son las casillas del mismo color que el alfil de d7.',
    bien:'¡Bien! Seis peones estorban a su propio alfil.'},
  hazlo:{fen:'2k5/pp1b1ppp/2p1p3/3pP3/3P4/2P2N2/PP3PPP/6K1 w - - 0 1',linea:['f3g5'],
    di:'Aprovecha que el alfil negro es malo.',pistas:['El caballo puede atacar dos peones del enroque.'],
    bien:'¡Correcto! Cg5 gana un peón: el alfil no llega a defender.'}
};

/* N5-003 · Mayoría en un flanco */
L['N5-003']={
  tactica:false, motivo:'Mayoría de peones',
  objetivo:'Vas a aprender a crear un peón pasado con tu mayoría de peones.',
  idea:'Si tienes **más peones** en un flanco, puedes crear un **peón pasado**. Avanza primero el **peón candidato**: el que no tiene un peón rival delante.',
  descubre:{fen:'8/pp3ppp/4k3/8/8/4K3/PPP3PP/8 w - - 0 1',di:'Tienes tres peones contra dos en el flanco de dama. ¿Cuál avanzarías primero?'},
  observa:[
    {marcas:[['a2','clave'],['b2','clave'],['c2','clave'],['a7','clave'],['b7','clave']],di:'Tres contra dos en el flanco de dama: ahí puedes crear un peón pasado.',sencillo:'Tienes un peón de más en ese lado.'},
    {jugada:'c2c4',marcas:[['c4','clave']],di:'c4: el peón de c no tiene rival delante. Es el **candidato** a ser pasado.',sencillo:'El peón candidato avanza primero.'}
  ],
  comprende:{di:'Con mayoría en un flanco, avanza primero el peón candidato y los demás lo apoyan.'},
  practica:{fen:'8/pp3ppp/4k3/8/8/4K3/PPP3PP/8 w - - 0 1',linea:['c2c4'],concepto:true,objetivoEquilibrio:true,
    di:'Empieza a usar tu mayoría.',pistas:['El peón que no tiene un peón rival delante.'],
    mal:{'*':'Avanza el peón candidato: el de c.'},
    bien:'¡Bien! El peón candidato abre camino.'}
};

/* N5-007 · Compensación material */
L['N5-007']={
  tactica:false, motivo:'Compensación',
  objetivo:'Vas a aprender que tener menos material puede compensarse con un ataque.',
  idea:'Si entregas material, necesitas **compensación**: un ataque contra el rey, más piezas activas o peones peligrosos. Cuenta las piezas que **atacan** y las que **defienden**.',
  descubre:{fen:'r4r2/1b2bp1k/ppq5/2ppp3/5PQ1/1P2PR2/P1PP2PP/R5K1 w - - 0 20',di:'Lasker contra Bauer, 1889. Entregaste los dos alfiles. ¿Qué tienes a cambio?'},
  observa:[
    {flechas:[['g4','h5','mov'],['f3','h3','mov']],marcas:[['h7','clave']],di:'Tu dama y tu torre atacan al rey, que no tiene peones ni piezas cerca.',sencillo:'Dos piezas atacan al rey solo.'},
    {jugada:'f3h3',marcas:[['h7','jaque']],di:'Th3+: las negras tienen que dar la dama para evitar el mate.',sencillo:'Jaque decisivo.'}
  ],
  comprende:{di:'Menos material no es perder si tus piezas atacan y las del rival no defienden.'},
  practica:{tipo:'casilla',fen:'r4r2/1b2bp1k/ppq5/2ppp3/5PQ1/1P2PR2/P1PP2PP/R5K1 w - - 0 20',casillas:['g4','f3'],
    di:'Toca tus piezas que atacan al rey negro.',pista:'Son las dos piezas mayores cerca del flanco de rey.',
    bien:'¡Bien! Dama y torre contra un rey sin defensores.'},
  hazlo:{fen:'r4r2/1b2bp1k/ppq5/2ppp3/5PQ1/1P2PR2/P1PP2PP/R5K1 w - - 0 20',linea:['f3h3'],
    di:'Cobra la compensación.',pistas:['La torre llega a la columna h con jaque.'],
    bien:'¡Correcto! Th3+ obliga a …Dh6 y Txh6+.'}
};

/* N5-010 · Atacar el fianchetto */
L['N5-010']={
  tactica:false, motivo:'Ataque al fianchetto',
  objetivo:'Vas a aprender a atacar un enroque con fianchetto.',
  idea:'Contra el **fianchetto** (alfil en g7 y peón en g6), el peón de **h** avanza a h5 para abrir la columna h. A menudo se ayuda con **Ah6** para cambiar el alfil defensor.',
  descubre:{fen:'r1bq1rk1/ppp1ppbp/2np1np1/8/3PP3/2N1BP2/PPPQ2PP/R3KBNR w KQ - 0 7',di:'Las negras enrocaron con el alfil en g7. ¿Por dónde abrirías su enroque?'},
  observa:[
    {marcas:[['g6','clave'],['g7','clave']],flechas:[['h2','h4','mov']],di:'El peón de g6 es el blanco: h4 y h5 lo atacan para abrir la columna h.',sencillo:'El peón h va contra g6.'},
    {jugada:'h2h4',di:'h4: empieza el ataque. Después, h5 y Ah6.',sencillo:'El peón avanza.'}
  ],
  comprende:{di:'Fianchetto rival: avanza el peón h, cambia el alfil de g7 con Ah6 y abre la columna.'},
  practica:{fen:'r1bq1rk1/ppp1ppbp/2np1np1/8/3PP3/2N1BP2/PPPQ2PP/R3KBNR w KQ - 0 7',linea:['h2h4'],acepta:{0:['g2g4']},concepto:true,objetivoEquilibrio:true,
    di:'Ataca el fianchetto con un peón.',pistas:['El peón de h quiere llegar a h5.'],
    mal:{'*':'Lanza el peón h contra el fianchetto.'},
    bien:'¡Bien! El peón h abrirá la columna.'}
};

/* N5-011 · Abrir columnas al rey */
L['N5-011']={
  tactica:false, motivo:'Abrir columnas',
  objetivo:'Vas a aprender a abrir columnas contra el rey rival con una palanca de peones.',
  idea:'Una **palanca** es un peón que choca con un peón rival. Cuando se cambian, se **abre una columna** para tus torres y tu dama contra el rey.',
  descubre:{fen:'r1bq1rk1/ppp1npbp/3p1np1/3Pp3/4P3/2N1BP2/PPPQ2PP/2KR1BNR w - - 1 9',di:'Enroques opuestos. ¿Qué peón usarías para abrir una columna contra el rey negro?'},
  observa:[
    {flechas:[['g2','g4','mov'],['h2','h4','mov']],di:'Los peones g y h avanzan hacia el enroque negro.',sencillo:'Los peones van al ataque.'},
    {jugada:'g2g4',flechas:[['g4','g5','mov']],di:'g4: el peón amenaza g5, echar al caballo de f6 y abrir líneas.',sencillo:'El peón g avanza.'}
  ],
  comprende:{di:'Con enroques opuestos, usa tus peones como palancas: cada cambio abre una columna para tus piezas.'},
  practica:{fen:'r1bq1rk1/ppp1npbp/3p1np1/3Pp3/4P3/2N1BP2/PPPQ2PP/2KR1BNR w - - 1 9',linea:['g2g4'],acepta:{0:['h2h4']},concepto:true,objetivoEquilibrio:true,
    di:'Prepara la apertura de columnas.',pistas:['Avanza un peón del flanco de rey.'],
    mal:{'*':'Avanza los peones g o h contra el enroque negro.'},
    bien:'¡Bien! Tus peones abrirán columnas contra el rey.'}
};

/* N5-019 · Buscar el contragolpe */
L['N5-019']={
  tactica:true, motivo:'Contraataque',
  objetivo:'Vas a aprender a responder a una amenaza con un contragolpe más fuerte.',
  idea:'Cuando atacan una pieza tuya, no siempre hay que retirarla. Si tienes un **contragolpe** más fuerte (jaque, ataque a la dama, amenaza de mate), úsalo.',
  descubre:{fen:'2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - - 0 22',di:'Rotlewi contra Rubinstein. Juegas con negras y tu dama está atacada por el peón de g3. ¿La retiras?'},
  observa:[
    {flechas:[['g3','h4','ataque']],marcas:[['h4','amenazada']],di:'Tu dama está atacada.',sencillo:'Atacan a tu dama.'},
    {jugada:'c8c3',flechas:[['b7','e4','linea'],['b6','g1','linea']],di:'…Txc3!: en lugar de retirar la dama, eliminas al defensor del centro. Si gxh4, …Td2!! decide.',sencillo:'Contragolpe en lugar de huir.'}
  ],
  comprende:{di:'Antes de retirar una pieza atacada, busca si tienes algo más fuerte: el contragolpe a veces gana.'},
  practica:{fen:'2rr2k1/1b3ppp/pb2p3/1p2P3/1P2BPnq/P1N3P1/1B2Q2P/R4R1K b - - 0 22',linea:['c8c3'],
    di:'Juegas con negras. Busca el contragolpe.',pistas:['No retires la dama: tus torres y alfiles apuntan al rey.'],
    bien:'¡Brillante! …Txc3, como Rubinstein.'}
};

/* N5-020 · El árbol de variantes */
L['N5-020']={
  tactica:false, motivo:'Cálculo',
  objetivo:'Vas a aprender a ordenar el cálculo: primero las jugadas forzadas.',
  idea:'El **árbol de variantes** empieza por las jugadas **forzadas**: jaques, capturas y amenazas. Revisa cada rama hasta el final antes de elegir.',
  descubre:{fen:'1q3rk1/5ppp/8/R2N4/8/7Q/5PPP/6K1 w - - 0 1',di:'Antes de decidir, haz la lista: ¿qué jugadas dan jaque? ¿Cuáles capturan?'},
  observa:[
    {flechas:[['d5','e7','mov'],['d5','f6','mov'],['h3','h7','ataque']],di:'Jaques: Ce7+ y Cf6+. Capturas: Dxh7+. Esas son las primeras ramas del árbol.',sencillo:'Primero, jaques y capturas.'},
    {jugada:'d5e7',marcas:[['g8','jaque']],di:'La rama Ce7+ lleva al mate: Rh8, Dxh7+ Rxh7, Th5#.',sencillo:'Esa rama da mate.'}
  ],
  comprende:{di:'Haz la lista de jaques, capturas y amenazas; calcula cada una y elige la mejor.'},
  practica:{tipo:'casilla',fen:'1q3rk1/5ppp/8/R2N4/8/7Q/5PPP/6K1 w - - 0 1',casillas:['d5','h3'],verificar:'pueden-jaque:w',
    di:'Toca las piezas blancas que pueden dar jaque.',pista:'Un caballo y una dama.',
    bien:'¡Bien! Esas son las primeras ramas del árbol.'},
  hazlo:{tipo:'casilla',fen:'1q3rk1/5ppp/8/R2N4/8/7Q/5PPP/6K1 w - - 0 1',casillas:['h3'],verificar:'pueden-capturar:w',
    di:'Toca las piezas blancas que pueden capturar.',pista:'Mira qué peones o piezas negras están al alcance.',
    bien:'¡Correcto! Ya tienes las ramas forzadas.'}
};

/* N5-021 · Evaluar el resultado */
L['N5-021']={
  tactica:false, motivo:'Evaluación',
  objetivo:'Vas a aprender a evaluar la posición al final de una variante.',
  idea:'Al final de cada variante, **evalúa**: ¿quién tiene más material? ¿Hay piezas **colgadas** (atacadas y sin defensa)? ¿Qué rey está más seguro?',
  descubre:{fen:'4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',di:'Morphy, París 1858. Antes de jugar, evalúa: ¿qué piezas negras están en peligro?'},
  observa:[
    {flechas:[['d1','d7','ataque'],['b3','e6','ataque']],di:'La torre ataca el caballo de d7 y la dama ataca la dama negra.',sencillo:'Hay piezas negras atacadas.'},
    {marcas:[['d7','clave']],di:'El caballo de d7 está clavado y defendido: es la clave de la posición.',sencillo:'El caballo está clavado.'}
  ],
  comprende:{di:'Evaluar es contar material, piezas colgadas y seguridad del rey al final de cada variante.'},
  practica:{tipo:'casilla',fen:'4kb1r/p2n1ppp/4q3/4p1B1/4P3/1Q6/PPP2PPP/2KR4 w k - 0 16',casillas:['d7','e6'],verificar:'atacadas:b',
    di:'Toca las piezas negras atacadas.',pista:'Mira qué atacan tu dama, tu torre y tu alfil.',
    bien:'¡Bien! Esas son las piezas que hay que vigilar.'}
};

/* N5-024 · Planes por estructura */
L['N5-024']={
  tactica:false, motivo:'Plan',
  objetivo:'Vas a aprender a elegir un plan según la estructura de peones.',
  idea:'La **estructura de peones** indica el plan. En el **Sistema Londres**, con peones en c3, d4 y e3, el caballo busca **e5** y las torres apoyan la ruptura e4.',
  descubre:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',di:'Sistema Londres. Tus peones están en c3, d4 y e3. ¿Qué casilla central es tuya?'},
  observa:[
    {flechas:[['d4','e5','defensa'],['g3','e5','linea']],marcas:[['e5','clave']],di:'e5 está protegida por el peón de d4 y el alfil de g3: es tu casilla fuerte.',sencillo:'e5 es tu casilla.'},
    {jugada:'f3e5',di:'Ce5: el caballo se instala en e5. Después, f4 o la ruptura e4.',sencillo:'El caballo salta a e5.'}
  ],
  comprende:{di:'Mira tus peones: te dicen qué casillas son tuyas y qué rupturas preparar.'},
  practica:{tipo:'casilla',fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',casillas:['e5'],
    di:'Toca la casilla fuerte para tu caballo.',pista:'La protegen tu peón de d4 y tu alfil de g3.',
    bien:'¡Bien! e5 es la casilla del Londres.'},
  hazlo:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',linea:['f3e5'],concepto:true,objetivoEquilibrio:true,
    di:'Ocupa la casilla fuerte.',pistas:['Tu caballo de f3 llega en un salto.'],
    mal:{'*':'Lleva el caballo a e5.'},
    bien:'¡Correcto! El caballo domina desde e5.'}
};

/* N5-031 · Alfil contra caballo */
L['N5-031']={
  tactica:false, motivo:'Alfil contra caballo',
  objetivo:'Vas a aprender a dominar un caballo con el alfil.',
  idea:'En posiciones abiertas, el **alfil** es más rápido que el caballo. Si el caballo está en el **borde**, el alfil puede quitarle todas sus casillas: está **dominado**.',
  descubre:{fen:'k6n/8/7K/8/2B5/8/8/8 w - - 0 1',di:'El caballo negro está en la esquina. ¿Adónde puede saltar?'},
  observa:[
    {flechas:[['h8','g6','linea'],['h8','f7','linea']],di:'El caballo solo puede ir a g6 o a f7.',sencillo:'Solo tiene dos casillas.'},
    {marcas:[['g6','clave'],['f7','clave']],flechas:[['c4','f7','linea']],di:'Tu rey de h6 vigila g6 y tu alfil vigila f7: el caballo está dominado. Si se mueve, lo capturas.',sencillo:'El caballo no tiene salida.'}
  ],
  comprende:{di:'Caballo en el borde, alfil y rey cerca: el caballo pierde todas sus casillas.'},
  practica:{tipo:'casilla',fen:'k6n/8/7K/8/2B5/8/8/8 w - - 0 1',casillas:['h8'],
    di:'Toca la pieza dominada.',pista:'Está en una esquina.',
    bien:'¡Bien! El caballo de h8 no tiene ninguna casilla segura.'}
};

/* N5-034 · Tu plan de mejora */
L['N5-034']={
  tactica:false, motivo:'Plan de mejora',
  objetivo:'Vas a aprender a mejorar tu peor pieza cuando no hay táctica.',
  idea:'Si no hay jaques, capturas ni amenazas, busca tu **peor pieza** y llévala a una casilla mejor. Repite: es el plan más sencillo y eficaz.',
  descubre:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',di:'Sistema Londres, posición tranquila. ¿Cuál es tu pieza que menos trabaja?'},
  observa:[
    {marcas:[['b1','clave']],di:'El caballo de b1 todavía no ha salido: es tu peor pieza.',sencillo:'El caballo de b1 no juega.'},
    {jugada:'b1d2',di:'Cbd2: ahora apoya e4 y puede ir a f3 o e5 más adelante.',sencillo:'El caballo entra en juego.'}
  ],
  comprende:{di:'Plan de mejora: encuentra tu peor pieza, mejórala y repite.'},
  practica:{tipo:'casilla',fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',casillas:['b1'],
    di:'Toca tu peor pieza.',pista:'La que todavía no ha salido.',
    bien:'¡Bien! El caballo de b1 es la pieza a mejorar.'},
  hazlo:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',linea:['b1d2'],concepto:true,objetivoEquilibrio:true,
    di:'Mejora tu peor pieza.',pistas:['El caballo de b1 puede ir a d2.'],
    mal:{'*':'Lleva el caballo de b1 al juego.'},
    bien:'¡Correcto! Ya trabajan todas tus piezas.'}
};

/* N5-008 · Peón por la iniciativa */
L['N5-008']={
  tactica:false, motivo:'Iniciativa',
  objetivo:'Vas a aprender cuándo entregar un peón para activar tus piezas.',
  idea:'La **iniciativa** es poder hacer amenazas que el rival debe atender. A veces vale **un peón**: si con él abres líneas y tus piezas entran en juego, el rival no tendrá tiempo de aprovechar su peón de más.',
  descubre:{fen:'r1bq1rk1/p3bppp/1pn1pn2/8/2BP4/2N2N2/PP3PPP/R1BQR1K1 w - - 0 11',di:'Caro-Kann, ataque Panov. Tu peón aislado de d4 puede avanzar. ¿Merece la pena aunque se pierda?'},
  observa:[
    {flechas:[['d4','d5','mov']],marcas:[['d5','clave']],di:'d5 rompe la posición negra y abre la columna e y la diagonal de tu alfil.',sencillo:'El peón rompe el centro.'},
    {jugada:'d4d5',di:'d5!: aunque el peón se pierda, tus torres, alfiles y caballos se activan.',sencillo:'Das un peón para activar tus piezas.'},
    {jugada:'c6a5',di:'…Ca5',sencillo:'El caballo ataca a tu alfil.'},
    {jugada:'c4b5',di:'Ab5: tus piezas siguen ganando tiempos. La posición queda equilibrada y muy activa.',sencillo:'Tus piezas atacan.'}
  ],
  comprende:{di:'Un peón a cambio de actividad está bien si tus piezas entran en juego y el rival tiene que defenderse.'},
  practica:{fen:'r1bq1rk1/p3bppp/1pn1pn2/8/2BP4/2N2N2/PP3PPP/R1BQR1K1 w - - 0 11',linea:['d4d5'],concepto:true,objetivoEquilibrio:true,
    di:'Rompe el centro con tu peón aislado.',pistas:['El peón de d4 puede avanzar.'],
    mal:{'*':'Rompe con d5: abre líneas para tus piezas.'},
    bien:'¡Bien! d5 activa todas tus piezas.'}
};
})();
