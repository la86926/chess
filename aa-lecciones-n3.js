/* Aprende Ajedrez · lecciones del NIVEL TRES (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};

/* N3-001 · Rayos X */
L['N3-001']={
  tactica:true, motivo:'Rayos X',
  objetivo:'Vas a aprender cómo una pieza actúa a través de otra: los rayos X.',
  idea:'Con **rayos X**, una pieza ataca o defiende **a través** de otra que está en la misma línea. Si la de delante se cambia, la de detrás entra en acción.',
  descubre:{fen:'q2r2k1/5ppp/8/8/8/8/3Q1PPP/3R2K1 w - - 0 1',di:'Tu dama y tu torre están en la columna d. ¿Qué pasa si la dama captura en d8?'},
  observa:[
    {flechas:[['d1','d8','linea']],marcas:[['d8','clave']],di:'La torre de d1 apunta a d8 a través de su propia dama: rayos X.',sencillo:'La torre mira a través de la dama.'},
    {jugada:'d2d8',marcas:[['g8','jaque']],di:'Dxd8+: la dama captura la torre con jaque.',sencillo:'La dama captura con jaque.'},
    {jugada:'a8d8',di:'…Dxd8: la dama negra recaptura…',sencillo:'La dama negra recaptura.'},
    {jugada:'d1d8',marcas:[['g8','jaque']],di:'…y Txd8#: la torre de detrás termina el trabajo. ¡Mate!',sencillo:'¡Mate! La torre de atrás llega a d8.'}
  ],
  comprende:{di:'Dos piezas en la misma línea suman fuerza: la de detrás «ve» a través de la de delante.'},
  practica:{fen:'q2r2k1/5ppp/8/8/8/8/3Q1PPP/3R2K1 w - - 0 1',linea:['d2d8','a8d8','d1d8'],meta:'mate',
    di:'Mate en dos con rayos X.',pistas:['La torre de d1 respalda a la dama.','Captura en d8.'],
    bien:'¡Mate! Dxd8+ y Txd8#.'},
  hazlo:{fen:'3r2k1/3q1ppp/8/8/8/8/5PPP/Q2R2K1 b - - 0 1',linea:['d7d1','a1d1','d8d1'],meta:'mate',
    di:'Juegas con negras. Mate en dos con rayos X.',pistas:['Tu torre de d8 respalda a la dama.'],
    bien:'¡Correcto! …Dxd1+ y …Txd1#.'},
  comprueba:{fen:'1q2r1k1/5ppp/8/8/8/8/4RPPP/4R1K1 w - - 0 1',linea:['e2e8','b8e8','e1e8'],meta:'mate',
    di:'Ahora con dos torres. Mate en dos.',pistas:['La torre de e1 respalda a la de e2.'],
    bien:'¡Excelente! Txe8+ y Txe8#.'}
};

/* N3-002 · Desviación */
L['N3-002']={
  tactica:true, motivo:'Desviación',
  objetivo:'Vas a aprender a apartar a un defensor de su tarea.',
  idea:'La **desviación** obliga a una pieza rival a dejar la casilla o la línea que defendía. Muchas veces se consigue con un **sacrificio** o un ataque.',
  descubre:{fen:'3r2k1/3P1ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1',di:'Tu peón de d7 quiere coronar, pero la torre negra de d8 le cierra el paso. ¿Puedes apartarla?'},
  observa:[
    {marcas:[['d8','clave']],di:'La torre de d8 bloquea al peón.',sencillo:'La torre tapa al peón.'},
    {jugada:'c1c8',flechas:[['c8','d8','ataque']],di:'Tc8!: la torre ataca a la de d8 y la desvía.',sencillo:'Tu torre ataca a la suya.'},
    {jugada:'d8c8',di:'…Txc8: si la captura, deja libre d8.',sencillo:'Si se la come, se aparta.'},
    {jugada:'d7c8q',marcas:[['g8','jaque']],di:'dxc8=D#: el peón corona con mate.',sencillo:'¡Corona con mate!'}
  ],
  comprende:{di:'Pregúntate qué hace cada pieza rival. Si defiende algo importante, ¿puedes obligarla a irse?'},
  practica:{fen:'3r2k1/3P1ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1',linea:['c1c8'],
    di:'Desvía a la torre que bloquea a tu peón.',pistas:['Ataca a la torre de d8 desde c8.'],
    bien:'¡Bien! Si …Txc8, dxc8=D+; si no, Txd8+.'},
  hazlo:{fen:'2r3k1/5ppp/8/8/8/8/3p1PPP/3R2K1 b - - 0 1',linea:['c8c1'],
    di:'Juegas con negras. Desvía a la torre que bloquea a tu peón.',pistas:['Ataca a la torre de d1 desde c1.'],
    bien:'¡Correcto! La torre blanca no puede seguir tapando d1.'},
  comprueba:{fen:'r2q1rk1/pp3ppp/5n2/8/4P3/3B3Q/PP3PPP/R4RK1 w - - 0 1',linea:['e4e5'],
    di:'El caballo de f6 defiende h7. Desvíalo.',pistas:['Tu dama y tu alfil apuntan a h7.','Ataca al caballo con un peón.'],
    bien:'¡Excelente! e5: si el caballo se va, Dxh7+ llega con fuerza.'}
};

/* N3-003 · Atracción */
L['N3-003']={
  tactica:true, motivo:'Atracción',
  objetivo:'Vas a aprender a atraer una pieza rival a una casilla mala para ella.',
  idea:'La **atracción** obliga a una pieza rival a ir a una casilla concreta, casi siempre con un **sacrificio**. Allí la espera un tenedor, una clavada o un mate.',
  descubre:{fen:'7k/4q1pp/8/6N1/8/8/5PPP/3R2K1 w - - 0 1',di:'Si la dama negra estuviera en d8, tu caballo le daría un tenedor desde f7. ¿Puedes llevarla allí?'},
  observa:[
    {flechas:[['g5','f7','mov'],['e7','f7','defensa']],marcas:[['f7','clave']],di:'Ahora Cf7+ no sirve: la dama de e7 vigila f7.',sencillo:'Todavía no hay tenedor.'},
    {jugada:'d1d8',marcas:[['h8','jaque']],di:'Td8+: un sacrificio con jaque.',sencillo:'La torre se ofrece con jaque.'},
    {jugada:'e7d8',di:'…Dxd8: la dama fue atraída a d8.',sencillo:'La dama se come la torre.'},
    {jugada:'g5f7',flechas:[['f7','d8','ataque']],marcas:[['h8','jaque'],['d8','amenazada']],di:'Cf7+: tenedor al rey y a la dama.',sencillo:'¡Tenedor! Rey y dama.'}
  ],
  comprende:{di:'¿En qué casilla quiero a la pieza rival? Busca un jaque o una captura que la obligue a ir allí.'},
  practica:{fen:'7k/4q1pp/8/6N1/8/8/5PPP/3R2K1 w - - 0 1',linea:['d1d8','e7d8','g5f7'],
    di:'Atrae la dama a d8 y gánala.',pistas:['Sacrifica la torre con jaque.','Después, el caballo da el tenedor.'],
    bien:'¡Muy bien! Td8+, Dxd8 y Cf7+.'},
  hazlo:{fen:'3r2k1/5ppp/8/8/6n1/8/4Q1PP/7K b - - 0 1',linea:['d8d1','e2d1','g4f2'],
    di:'Juegas con negras. Atrae la dama blanca y gánala.',pistas:['Sacrifica la torre en d1 con jaque.'],
    bien:'¡Correcto! …Td1+, Dxd1 y …Cf2+.'},
  comprueba:{fen:'k7/pp1q4/8/1N6/8/8/5PPP/4R1K1 w - - 0 1',linea:['e1e8','d7e8','b5c7'],
    di:'Atrae la dama negra a una casilla de tenedor.',pistas:['Da jaque en la octava fila.','El caballo puede saltar a c7.'],
    bien:'¡Excelente! Te8+, Dxe8 y Cc7+.'}
};

/* N3-004 · Sobrecarga */
L['N3-004']={
  tactica:true, motivo:'Sobrecarga',
  objetivo:'Vas a aprender a aprovechar una pieza que tiene demasiadas tareas.',
  idea:'Una pieza está **sobrecargada** cuando defiende dos cosas a la vez. Si la obligas a cumplir una tarea, abandona la otra.',
  descubre:{fen:'3r2k1/5ppp/8/3q4/8/3Q4/5PPP/4R1K1 w - - 0 1',di:'La torre negra de d8 tiene dos trabajos. ¿Cuáles son?'},
  observa:[
    {flechas:[['d8','d5','defensa'],['d8','e8','defensa']],marcas:[['d8','clave']],di:'La torre de d8 defiende a su dama y, a la vez, la casilla e8.',sencillo:'La torre hace dos trabajos.'},
    {jugada:'d3d5',flechas:[['d5','d8','ataque']],di:'Dxd5!: si la torre recaptura, deja de vigilar e8.',sencillo:'Captura la dama: ¿y ahora qué hace la torre?'},
    {jugada:'d8d5',di:'…Txd5?',sencillo:'La torre se come la dama.'},
    {jugada:'e1e8',marcas:[['g8','jaque']],di:'Te8#: la torre ya no defendía la última fila.',sencillo:'¡Mate! La torre no podía hacer las dos cosas.'}
  ],
  comprende:{di:'Busca piezas que defiendan dos cosas. Ataca una de ellas y la otra quedará sin protección.'},
  practica:{fen:'3r2k1/5ppp/8/3q4/8/3Q4/5PPP/4R1K1 w - - 0 1',linea:['d3d5'],
    di:'Aprovecha la torre sobrecargada de d8.',pistas:['La torre defiende la dama y la última fila.'],
    bien:'¡Bien! Si …Txd5, Te8#. Y si no, ganaste la dama.'},
  hazlo:{fen:'4r1k1/5ppp/3q4/8/3Q4/8/5PPP/3R2K1 b - - 0 1',linea:['d6d4'],
    di:'Juegas con negras. La torre de d1 está sobrecargada. Aprovéchalo.',pistas:['Captura la dama blanca.'],
    bien:'¡Correcto! Si Txd4, …Te1#.'},
  comprueba:{fen:'2r3k1/2q2ppp/8/8/8/2Q5/5PPP/3R2K1 w - - 0 1',linea:['c3c7'],
    di:'La torre de c8 tiene dos tareas. Aprovéchalo.',pistas:['Defiende a la dama y también la casilla d8.'],
    bien:'¡Excelente! Si …Txc7, Td8#.'}
};

/* N3-014 · Mate de Anastasia */
L['N3-014']={
  tactica:true, motivo:'Mate de Anastasia',
  objetivo:'Vas a aprender el mate de Anastasia: caballo y torre contra el rey en el borde.',
  idea:'En el **mate de Anastasia** el caballo en e7 le quita al rey g8 y g6; su propio peón de g7 lo encierra. La torre da jaque por la columna h.',
  descubre:{fen:'r7/4Nppk/8/8/8/3R4/5PPP/6K1 w - - 0 1',di:'El rey negro está en h7. ¿Qué casillas le quita tu caballo de e7?'},
  observa:[
    {flechas:[['e7','g8','ataque'],['e7','g6','ataque']],marcas:[['g7','bloqueada']],di:'El caballo vigila g8 y g6. El peón de g7 le tapa otra salida al rey.',sencillo:'El rey casi no tiene casillas.'},
    {jugada:'d3h3',marcas:[['h7','jaque']],di:'Th3#: la torre da jaque por la columna h. ¡Mate de Anastasia!',sencillo:'¡Mate! La torre por la columna h.'}
  ],
  comprende:{di:'Caballo en e7 y rey en el borde junto a su peón: busca un jaque de torre o dama por la columna h.'},
  practica:{fen:'r7/4Nppk/8/8/8/3R4/5PPP/6K1 w - - 0 1',linea:['d3h3'],meta:'mate',
    di:'Da el mate de Anastasia.',pistas:['La columna h está abierta.'],
    bien:'¡Mate de Anastasia!'},
  hazlo:{fen:'6k1/5ppp/3r4/8/8/8/4nPPK/R7 b - - 0 1',linea:['d6h6'],meta:'mate',
    di:'Juegas con negras. Da el mate de Anastasia.',pistas:['Tu caballo de e2 vigila g1 y g3.'],
    bien:'¡Correcto! …Th6#.'},
  comprueba:{fen:'6rk/4Nppp/8/7Q/8/3R4/5PPP/6K1 w - - 0 1',linea:['h5h7','h8h7','d3h3'],meta:'mate',
    di:'Mate en dos. Abre la columna h con un sacrificio.',pistas:['La dama puede capturar en h7 con jaque.','Después, la torre llega a la columna h.'],
    bien:'¡Excelente! Dxh7+, Rxh7 y Th3#.'}
};

/* N3-015 · Mate de la Ópera */
L['N3-015']={
  tactica:true, motivo:'Mate de la Ópera',
  objetivo:'Vas a aprender el mate de la Ópera: torre y alfil contra el rey en la última fila.',
  idea:'La torre da jaque en la **última fila** y el alfil la **protege** desde lejos, vigilando a la vez la casilla de escape del rey.',
  descubre:{fen:'4k2r/5ppp/8/6B1/8/8/5PPP/3R2K1 w - - 0 1',di:'Tu torre domina la columna d. ¿Qué hace el alfil de g5?'},
  observa:[
    {flechas:[['g5','d8','linea']],marcas:[['e7','clave']],di:'El alfil de g5 vigila e7 y d8.',sencillo:'El alfil cuida dos casillas.'},
    {jugada:'d1d8',marcas:[['e8','jaque'],['d7','bloqueada'],['e7','bloqueada']],di:'Td8#: la torre, protegida por el alfil, da jaque. ¡Mate de la Ópera!',sencillo:'¡Mate! Torre y alfil juntos.'}
  ],
  comprende:{di:'Una torre en la última fila necesita protección: un alfil en diagonal puede dársela.'},
  practica:{fen:'4k2r/5ppp/8/6B1/8/8/5PPP/3R2K1 w - - 0 1',linea:['d1d8'],meta:'mate',
    di:'Da el mate de la Ópera.',pistas:['El alfil protege d8.'],
    bien:'¡Mate de la Ópera!'},
  hazlo:{fen:'3r2k1/5ppp/8/8/6b1/8/5PPP/4K2R b - - 0 1',linea:['d8d1'],meta:'mate',
    di:'Juegas con negras. Da el mate de la Ópera.',pistas:['Tu alfil de g4 protege d1.'],
    bien:'¡Correcto! …Td1#.'},
  comprueba:{fen:'4k2r/3n1ppp/8/6B1/8/1Q6/5PPP/3R2K1 w - - 0 1',linea:['b3b8','d7b8','d1d8'],meta:'mate',
    di:'Mate en dos, como en la famosa partida de la Ópera.',pistas:['El caballo de d7 tapa la columna d.','Sacrifica la dama para desviar al caballo.'],
    bien:'¡Excelente! Db8+, Cxb8 y Td8#.'}
};

/* N3-016 · Mate de Boden */
L['N3-016']={
  tactica:true, motivo:'Mate de Boden',
  objetivo:'Vas a aprender el mate de Boden: dos alfiles que se cruzan.',
  idea:'En el **mate de Boden** dos alfiles atacan en **diagonales cruzadas**. Suele ocurrir contra el rey enrocado en el flanco de dama.',
  descubre:{fen:'2kr4/p2n1ppp/8/8/5B2/8/4BPPP/6K1 w - - 0 1',di:'El rey negro está en c8. ¿Qué casillas vigila tu alfil de f4?'},
  observa:[
    {flechas:[['f4','b8','linea']],marcas:[['c7','clave'],['b8','clave']],di:'El alfil de f4 vigila c7 y b8.',sencillo:'Un alfil ya cierra dos salidas.'},
    {jugada:'e2a6',marcas:[['c8','jaque'],['b7','bloqueada']],di:'Aa6#: el otro alfil da jaque por b7. Las piezas negras de d7 y d8 tapan el resto. ¡Mate de Boden!',sencillo:'¡Mate! Los alfiles se cruzan.'}
  ],
  comprende:{di:'Si el rey enrocado largo no tiene peón en b7, cuidado con las diagonales a6–c8 y h2–b8.'},
  practica:{fen:'2kr4/p2n1ppp/8/8/5B2/8/4BPPP/6K1 w - - 0 1',linea:['e2a6'],meta:'mate',
    di:'Da el mate de Boden.',pistas:['Falta un jaque por la diagonal a6–c8.'],
    bien:'¡Mate de Boden!'},
  hazlo:{fen:'6k1/4bppp/8/5b2/8/8/P2N1PPP/2KR4 b - - 0 1',linea:['e7a3'],meta:'mate',
    di:'Juegas con negras. Da el mate de Boden.',pistas:['Tu alfil de f5 ya vigila c2 y b1.'],
    bien:'¡Correcto! …Aa3#.'},
  comprueba:{fen:'2kr4/pp1n1ppp/2n5/8/5B2/2Q5/4BPPP/6K1 w - - 0 1',linea:['c3c6','b7c6','e2a6'],meta:'mate',
    di:'Mate en dos. El peón de b7 estorba: quítalo de en medio.',pistas:['Sacrifica la dama en c6.','Si el peón captura, se abre la diagonal.'],
    bien:'¡Excelente! Dxc6+, bxc6 y Aa6#.'}
};

/* N3-017 · Mate de Damiano */
L['N3-017']={
  tactica:true, motivo:'Mate de Damiano',
  objetivo:'Vas a aprender el mate de Damiano: dama y peón contra el rey enrocado.',
  idea:'Un peón en **g6** protege la casilla **h7**. Si la dama llega a h7, es mate: el rey no puede capturarla.',
  descubre:{fen:'5rk1/5p2/6P1/7Q/8/8/5PPP/6K1 w - - 0 1',di:'Tu peón de g6 está muy cerca del rey negro. ¿Qué casilla protege?'},
  observa:[
    {flechas:[['g6','h7','defensa']],marcas:[['h7','clave']],di:'El peón de g6 protege h7.',sencillo:'El peón cuida h7.'},
    {jugada:'h5h7',marcas:[['g8','jaque']],di:'Dh7#: la dama, protegida por el peón, da mate. ¡Mate de Damiano!',sencillo:'¡Mate! La dama con el peón.'}
  ],
  comprende:{di:'Un peón propio en g6 (o g3) es un gran apoyo para la dama contra el enroque.'},
  practica:{fen:'5rk1/5p2/6P1/7Q/8/8/5PPP/6K1 w - - 0 1',linea:['h5h7'],meta:'mate',
    di:'Da el mate de Damiano.',pistas:['El peón protege h7.'],
    bien:'¡Mate de Damiano!'},
  hazlo:{fen:'5rk1/1Q6/6P1/8/8/8/5PPP/6K1 w - - 0 1',linea:['b7h7'],meta:'mate',
    di:'La dama está lejos, pero tiene camino. Da mate.',pistas:['Recorre la séptima fila.'],
    bien:'¡Mate! La séptima fila estaba libre.'},
  comprueba:{fen:'6k1/5ppp/8/8/7q/6p1/5P2/5RK1 b - - 0 1',linea:['h4h2'],meta:'mate',
    di:'Juegas con negras. Da el mate de Damiano.',pistas:['Tu peón de g3 protege h2.'],
    bien:'¡Correcto! …Dh2#.'}
};

/* N3-018 · Mate de Legal */
L['N3-018']={
  tactica:true, motivo:'Mate de Legal',
  objetivo:'Vas a conocer la trampa de Legal, una de las más famosas de la apertura.',
  idea:'En el **mate de Legal** se **entrega la dama**: si el rival la captura, los caballos y el alfil dan mate al rey que no enrocó.',
  descubre:{fen:'rn1qkbnr/ppp2p1p/3p2p1/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',di:'El alfil negro de g4 clava tu caballo contra la dama… ¿o no?'},
  observa:[
    {flechas:[['g4','d1','linea']],marcas:[['f3','clave']],di:'El caballo de f3 parece clavado: si se mueve, el alfil captura la dama.',sencillo:'Parece que el caballo no se puede mover.'},
    {jugada:'f3e5',flechas:[['e5','f7','ataque'],['c4','f7','ataque']],di:'Cxe5!: el caballo se mueve igual y regala la dama.',sencillo:'¡El caballo se mueve y deja la dama!'},
    {jugada:'g4d1',di:'…Axd1? Las negras se comen la dama.',sencillo:'Las negras aceptan el regalo.'},
    {jugada:'c4f7',marcas:[['e8','jaque']],di:'Axf7+: jaque. El rey solo puede ir a e7.',sencillo:'Jaque con el alfil.'},
    {jugada:'e8e7',di:'…Re7',sencillo:'El rey sale a e7.'},
    {jugada:'c3d5',marcas:[['e7','jaque']],di:'Cd5#: tres piezas menores dan mate. ¡Mate de Legal!',sencillo:'¡Mate! Tres piezas pequeñas ganan a la dama.'}
  ],
  comprende:{di:'Una clavada contra la dama no es absoluta: a veces conviene entregarla. Y si te la regalan, piensa por qué.'},
  practica:{fen:'rn1qkbnr/ppp2p1p/3p2p1/4p3/2B1P1b1/2N2N2/PPPP1PPP/R1BQK2R w KQkq - 0 5',linea:['f3e5'],objetivoEquilibrio:true,
    di:'Prepara la trampa de Legal.',pistas:['El caballo de f3 no está clavado de verdad.','Captura en e5.'],
    bien:'¡Bien! Si las negras toman la dama, hay mate. Y si no, ganas un peón.'},
  hazlo:{fen:'rn1qkbnr/ppp2p1p/3p2p1/4N3/2B1P3/2N5/PPPP1PPP/R1BbK2R w KQkq - 0 6',linea:['c4f7','e8e7','c3d5'],meta:'mate',
    di:'Las negras se comieron la dama. Da mate en dos.',pistas:['Empieza con un jaque en f7.','El último golpe es de un caballo.'],
    bien:'¡Mate de Legal!'},
  comprueba:{fen:'rn1q1bnr/ppp1kB1p/3p2p1/4N3/4P3/2N5/PPPP1PPP/R1BbK2R w KQ - 1 7',linea:['c3d5'],meta:'mate',
    di:'El rey negro está en e7. Termina el mate de Legal.',pistas:['Un caballo puede dar el jaque final.'],
    bien:'¡Excelente! Cd5#.'}
};

/* N3-034 · La coz de Philidor */
L['N3-034']={
  tactica:true, motivo:'Mate de la coz con sacrificio',
  objetivo:'Vas a aprender el sacrificio de dama que lleva al mate de la coz.',
  idea:'Si la **dama da jaque en g8** protegida por el caballo, la torre tiene que capturarla y **encierra a su propio rey**. Entonces el caballo da el mate de la coz.',
  descubre:{fen:'5r1k/6pp/7N/8/2Q5/8/5PPP/6K1 w - - 0 1',di:'Tu caballo de h6 vigila g8 y f7. ¿Y si la dama entra en g8?'},
  observa:[
    {flechas:[['h6','g8','ataque'],['c4','g8','linea']],marcas:[['g8','clave']],di:'La dama puede llegar a g8, donde la protege el caballo.',sencillo:'La dama apunta a g8.'},
    {jugada:'c4g8',marcas:[['h8','jaque']],di:'Dg8+: el rey no puede capturarla. Solo la torre puede.',sencillo:'¡La dama se sacrifica con jaque!'},
    {jugada:'f8g8',marcas:[['g8','bloqueada'],['g7','bloqueada'],['h7','bloqueada']],di:'…Txg8: ahora la torre encierra a su rey.',sencillo:'La torre tapa la última salida.'},
    {jugada:'h6f7',marcas:[['h8','jaque']],di:'Cf7#: ¡mate de la coz!',sencillo:'¡Mate! El caballo salta.'}
  ],
  comprende:{di:'Sacrificar la dama vale la pena si después hay mate. Busca jugadas que obliguen al rival a encerrarse.'},
  practica:{fen:'5r1k/6pp/7N/8/2Q5/8/5PPP/6K1 w - - 0 1',linea:['c4g8','f8g8','h6f7'],meta:'mate',
    di:'Mate en dos con sacrificio de dama.',pistas:['La dama da jaque en g8.','Después de …Txg8, el caballo da mate.'],
    bien:'¡Mate de la coz!'},
  hazlo:{fen:'2r2r1k/6pp/7N/3Q4/8/8/5PPP/6K1 w - - 0 1',linea:['d5g8','f8g8','h6f7'],meta:'mate',
    di:'Ahora la dama está en d5. Mate en dos.',pistas:['La diagonal d5–g8 está libre.'],
    bien:'¡Correcto! Dg8+, Txg8 y Cf7#.'},
  comprueba:{fen:'6k1/5ppp/8/2q5/8/7n/6PP/5R1K b - - 0 1',linea:['c5g1','f1g1','h3f2'],meta:'mate',
    di:'Juegas con negras. Mate en dos con sacrificio de dama.',pistas:['Tu caballo de h3 protege g1.'],
    bien:'¡Excelente! …Dg1+, Txg1 y …Cf2#.'}
};

/* N3-035 · Mate en tres jugadas */
L['N3-035']={
  tactica:true, motivo:'Mate en tres',
  objetivo:'Vas a aprender a calcular un mate en tres jugadas.',
  idea:'En un **mate en tres** cada jugada tuya debe dejar al rival **sin buenas opciones**. Los jaques ayudan: limitan sus respuestas.',
  descubre:{fen:'6k1/6pp/8/8/8/8/5PPP/1Q2R1K1 w - - 0 1',di:'El rey negro tiene un hueco en f7, pero tu torre domina la columna e. ¿Puedes dar mate en tres?'},
  observa:[
    {jugada:'b1b3',marcas:[['g8','jaque']],di:'Db3+: si …Rh8, Te8 es mate. Las negras eligen …Rf8.',sencillo:'Primer jaque.'},
    {jugada:'g8f8',di:'…Rf8',sencillo:'El rey se esconde en f8.'},
    {jugada:'b3f3',marcas:[['f8','jaque']],di:'Df3+: el rey tiene que volver a g8.',sencillo:'Otro jaque: el rey vuelve.'},
    {jugada:'f8g8',di:'…Rg8',sencillo:'El rey vuelve a g8.'},
    {jugada:'e1e8',marcas:[['g8','jaque']],di:'Te8#: la dama vigila f7 y la torre la última fila. ¡Mate en tres!',sencillo:'¡Mate en tres jugadas!'}
  ],
  comprende:{di:'Calcula las respuestas del rival después de cada jaque. Si todas acaban en mate, la combinación funciona.'},
  practica:{fen:'6k1/6pp/8/8/8/8/5PPP/1Q2R1K1 w - - 0 1',linea:['b1b3','g8f8','b3f3','f8g8','e1e8'],meta:'mate',
    di:'Mate en tres jugadas.',pistas:['Empieza con un jaque de dama.','Después, vigila f7 y usa la torre.'],
    bien:'¡Mate en tres!'},
  hazlo:{fen:'1q2r1k1/5ppp/8/8/8/8/6PP/6K1 b - - 0 1',linea:['b8b6','g1f1','b6f6','f1g1','e8e1'],meta:'mate',
    di:'Juegas con negras. Mate en tres.',pistas:['Empieza con un jaque de dama por la diagonal.'],
    bien:'¡Correcto! …Db6+, …Df6+ y …Te1#.'},
  comprueba:{fen:'5rk1/5Npp/8/8/2Q5/8/5PPP/6K1 w - - 0 1',linea:['f7h6','g8h8','c4g8','f8g8','h6f7'],meta:'mate',
    di:'Mate en tres con dama y caballo.',pistas:['Mueve el caballo para dar jaque doble.'],
    bien:'¡Excelente! Ch6++, Rh8, Dg8+ y Cf7#: la coz de Philidor.'}
};

})();
