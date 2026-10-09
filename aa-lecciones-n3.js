/* Aprende Ajedrez · lecciones del NIVEL TRES (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};

/* N3-001 · Rayos X (Nivel IV, lección 1) */
L['N3-001']={
  tactica:true, motivo:'Rayos X',
  objetivo:'Vas a aprender que una pieza puede actuar a través de una pieza enemiga y alcanzar a la dama o al rey de detrás.',
  idea:'Hay **rayos X** cuando tu torre, alfil o dama actúa **a través de una pieza enemiga** que está en su línea. Si esa pieza enemiga captura o se mueve, tu línea se abre y alcanza lo que hay detrás.',
  descubre:{fen:'3q2k1/5ppp/pQ6/3r4/8/8/P4PPP/3R2K1 w - - 0 1',di:'La dama negra de d8 está defendida por su torre de d5. Tu torre de d1 también mira hacia d8… ¿a través de qué pieza?'},
  observa:[
    {flechas:[['d5','d8','defensa']],marcas:[['d8','defendida']],di:'La torre negra de d5 defiende a su dama.',sencillo:'La torre cuida a la dama.'},
    {flechas:[['d1','d8','linea']],marcas:[['d5','clave']],di:'Tu torre de d1 apunta a d8 **a través** de la torre negra: son los rayos X.',sencillo:'Tu torre «ve» la dama a través de la torre negra.'},
    {jugada:'b6d8',marcas:[['g8','jaque']],di:'Dxd8+!: capturas la dama con jaque. Parece un simple cambio de damas…',sencillo:'Te comes la dama con jaque.'},
    {jugada:'d5d8',di:'…Txd8: única jugada (el rey no tiene casillas). Al capturar, la torre negra deja libre la columna d.',sencillo:'La torre negra recaptura y abre la columna.'},
    {jugada:'d1d8',marcas:[['g8','jaque']],di:'Txd8#: tu torre llega a d8. Ganaste la dama y diste mate.',sencillo:'¡Mate!'},
    {fen:'rq6/1R6/8/4P2k/5P2/6PP/8/2Q3K1 w - - 0 1',marcas:[['h5','clave']],di:'Los rayos X también atraviesan al **rey**. Mira el rey negro de h5.',sencillo:'Ahora, a través del rey.'},
    {jugada:'b7h7',marcas:[['h5','jaque']],di:'Th7+: el rey solo puede ir a g6, al lado de tu torre.',sencillo:'Jaque de torre.'},
    {jugada:'h5g6',di:'…Rg6: el rey amenaza comerse la torre.',sencillo:'El rey ataca a tu torre.'},
    {jugada:'c1c2',flechas:[['c2','h7','linea']],marcas:[['g6','jaque']],di:'Dc2#: la dama da jaque y, a través del rey, protege h7. El rey no puede capturar la torre.',sencillo:'¡Mate! La dama protege la torre a través del rey.'}
  ],
  comprende:{di:'Si tu pieza actúa a través de una pieza enemiga, piensa qué pasa cuando esa pieza captura o se mueve: tu línea se abre y alcanza a la dama o al rey.'},
  practica:{fen:'3q2k1/5ppp/pQ6/3r4/8/8/P4PPP/3R2K1 w - - 0 1',linea:['b6d8','d5d8','d1d8'],meta:'mate',
    di:'Gana la dama y da mate con rayos X.',pistas:['Tu torre de d1 ve d8 a través de la torre negra.','Captura la dama con jaque.'],
    bien:'¡Mate! Al recapturar, la torre negra abrió la columna a tu torre.'},
  hazlo:{fen:'6qr/6R1/8/k2P4/2P5/PP6/8/1K3Q2 w - - 0 1',linea:['g7a7','a5b6','f1f2'],meta:'mate',
    di:'Mate en dos. Tu dama puede actuar a través del rey negro.',pistas:['Empieza con un jaque de torre.','Después, una dama que proteja la torre a través del rey.'],
    bien:'¡Correcto! Ta7+, Rb6 y Df2#: la dama protege a7 a través del rey.'},
  comprueba:{fen:'1k2r3/ppp4p/8/8/4R3/6qP/PPP5/1K2Q3 b - - 0 1',linea:['g3e1','e4e1','e8e1'],meta:'mate',
    di:'Juegas con negras. Encuentra la combinación de rayos X.',pistas:['Tu torre de e8 ve e1 a través de la torre blanca.'],
    bien:'¡Excelente! …Dxe1+, Txe1 y …Txe1#.'}
};

/* N3-002 · Desviación (Nivel IV, lección 2) */
L['N3-002']={
  tactica:true, motivo:'Desviación',
  objetivo:'Vas a aprender a ofrecer material para que un defensor abandone su tarea.',
  idea:'En la **desviación** ofreces una pieza. Si el defensor rival la captura, **abandona** la pieza, la casilla o la línea que protegía, y tú la aprovechas.',
  descubre:{fen:'rnbqkb1r/pp2pppp/5n2/8/2B1P3/2N5/PPP2PPP/R1BQK2R w - - 0 1',di:'Tu dama de d1 mira a la dama negra de d8. ¿Quién la defiende?'},
  observa:[
    {flechas:[['d1','d8','ataque']],marcas:[['d8','amenazada']],di:'Tu dama ataca a la dama negra por la columna d.',sencillo:'Tu dama mira a la dama negra.'},
    {flechas:[['e8','d8','defensa']],marcas:[['e8','clave']],di:'Su único defensor es el **rey** de e8.',sencillo:'Solo el rey cuida a la dama.'},
    {jugada:'c4f7',marcas:[['e8','jaque']],di:'Axf7+!: ofreces el alfil con jaque.',sencillo:'El alfil se entrega con jaque.'},
    {jugada:'e8f7',di:'…Rxf7: es la única jugada legal. Al capturar, el rey abandona a su dama.',sencillo:'El rey se come el alfil y deja sola a la dama.'},
    {jugada:'d1d8',di:'Dxd8: ganas la dama por un alfil.',sencillo:'¡Te comes la dama!'}
  ],
  comprende:{di:'Pregúntate qué protege cada pieza rival, incluso el rey. Ofrécele algo que la obligue a dejar su puesto.'},
  practica:{fen:'rnbqkb1r/pp2pppp/5n2/8/2B1P3/2N5/PPP2PPP/R1BQK2R w - - 0 1',linea:['c4f7','e8f7','d1d8'],
    di:'Desvía al único defensor de la dama negra.',pistas:['El rey de e8 defiende a su dama.','Ofrece una pieza con jaque.'],
    bien:'¡Bien! El rey capturó y dejó sola a su dama.'},
  hazlo:{fen:'8/3P4/8/k2r4/8/6R1/5K2/8 w - - 0 1',linea:['g3g5','d5g5','d7d8q','a5b5','d8g5'],
    di:'La torre negra frena tu peón. Desvíala y corona.',pistas:['La torre negra está en la misma fila que su rey.','Ofrece tu torre en esa fila.'],
    bien:'¡Correcto! Si …Txg5, d8=D+ y Dxg5. Si la torre deja la columna d, coronas igual.'},
  comprueba:{fen:'4r1k1/1p1q1ppp/p2p1P2/1n1P4/1P1Q4/6P1/P4PKP/4R3 w - - 0 3',linea:['d4g4','d7g4','e1e8'],meta:'mate',
    di:'La dama negra defiende la torre de e8. Desvíala.',pistas:['Ofrece tu dama donde la negra pueda capturarla.','Además amenazas Dxg7#.'],
    bien:'¡Excelente! Si …Dxg4, Txe8#. Si …g6, Dxd7 gana la dama.'}
};

/* N3-003 · Atracción (Nivel IV, lección 3) */
L['N3-003']={
  tactica:true, motivo:'Atracción',
  objetivo:'Vas a aprender a atraer al rey rival, con sacrificios, hacia una red de mate.',
  idea:'En la **atracción** ofreces material para **llevar al rey** a una casilla peligrosa. A veces, varios sacrificios seguidos lo sacan de su refugio hasta el mate.',
  descubre:{fen:'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 6 11',di:'Lasker contra Thomas, Londres 1912. El rey negro parece seguro en su enroque. Mira lo que pasa.'},
  observa:[
    {jugada:'h5h7',marcas:[['g8','jaque']],di:'Dxh7+!!: la dama se sacrifica para sacar al rey.',sencillo:'¡La dama se entrega!'},
    {jugada:'g8h7',di:'…Rxh7: única jugada. El rey sale de su refugio.',sencillo:'El rey se come la dama.'},
    {jugada:'e4f6',marcas:[['h7','jaque']],di:'Cxf6+: jaque doble. El rey tiene que avanzar.',sencillo:'Jaque doble.'},
    {jugada:'h7h6',di:'…Rh6',sencillo:'El rey baja.'},
    {jugada:'e5g4',marcas:[['h6','jaque']],di:'Ceg4+',sencillo:'Otro jaque.'},
    {jugada:'h6g5',di:'…Rg5',sencillo:'El rey sigue bajando.'},
    {jugada:'h2h4',marcas:[['g5','jaque']],di:'h4+',sencillo:'Jaque de peón.'},
    {jugada:'g5f4',di:'…Rf4',sencillo:'Más abajo.'},
    {jugada:'g2g3',marcas:[['f4','jaque']],di:'g3+',sencillo:'Otro jaque de peón.'},
    {jugada:'f4f3',di:'…Rf3: el rey ya está en el campo blanco.',sencillo:'El rey llegó al campo blanco.'},
    {jugada:'d3e2',marcas:[['f3','jaque']],di:'Ae2+',sencillo:'Jaque de alfil.'},
    {jugada:'f3g2',di:'…Rg2',sencillo:'El rey sigue huyendo.'},
    {jugada:'h1h2',marcas:[['g2','jaque']],di:'Th2+',sencillo:'Jaque de torre.'},
    {jugada:'g2g1',di:'…Rg1: el rey llegó a la primera fila.',sencillo:'El rey acaba en g1.'},
    {jugada:'e1d2',marcas:[['g1','jaque']],di:'Rd2#: ¡mate! El rey negro recorrió todo el tablero.',sencillo:'¡Mate en el otro extremo del tablero!'}
  ],
  comprende:{di:'Un sacrificio con jaque saca al rey de su refugio; los jaques siguientes lo arrastran hacia la red de mate.'},
  practica:{fen:'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 6 11',linea:['h5h7','g8h7','e4f6'],
    di:'Saca al rey negro de su refugio.',pistas:['Sacrifica la dama en h7.','Después, un jaque doble de caballo.'],
    bien:'¡Bien! Dxh7+ y Cxf6+: el rey ya no tiene refugio.'},
  hazlo:{fen:'rn3r2/pbppq1p1/1p2pN1k/4N3/3P4/3B4/PPP2PPP/R3K2R w KQ - 1 13',linea:['e5g4','h6g5','f2f4'],acepta:{2:['h2h4']},
    di:'El rey negro está en h6. Sigue atrayéndolo con jaques.',pistas:['El caballo de e5 puede dar jaque.','Después, un peón da jaque.'],
    bien:'¡Correcto! Cada jaque arrastra al rey hacia tu campo.'},
  comprueba:{fen:'1k6/ppp5/4r3/8/q7/8/PPPn4/KR6 b - - 0 1',linea:['a4a2','a1a2','e6a6'],meta:'mate',
    di:'Juegas con negras. Atrae al rey blanco y da mate en dos.',pistas:['Sacrifica la dama en a2.','Tu caballo vigila b1 y b3.'],
    bien:'¡Excelente! …Dxa2+, Rxa2 y …Ta6#.'}
};

/* N3-004 · Sobrecarga (Nivel IV, lección 4) */
L['N3-004']={
  tactica:true, motivo:'Sobrecarga',
  objetivo:'Vas a aprender a aprovechar una pieza que tiene dos tareas a la vez.',
  idea:'Una pieza está **sobrecargada** cuando defiende **dos cosas** a la vez. Si la obligas a cumplir una tarea, **abandona la otra**.',
  descubre:{fen:'6k1/r3qppp/8/8/Q7/7P/5PP1/3R2K1 w - - 0 1',di:'La dama negra de e7 parece muy fuerte. ¿Cuántas cosas está defendiendo?'},
  observa:[
    {flechas:[['e7','a7','defensa']],di:'Primera tarea: la dama defiende la torre de a7.',sencillo:'La dama cuida la torre.'},
    {flechas:[['e7','d8','defensa']],marcas:[['d8','clave']],di:'Segunda tarea: vigila d8, la casilla del mate de tu torre.',sencillo:'También cuida la última fila.'},
    {jugada:'a4a7',di:'Dxa7!: la dama negra tiene que elegir.',sencillo:'Te comes la torre.'},
    {jugada:'e7a7',di:'…Dxa7: cumple la primera tarea…',sencillo:'La dama negra recaptura.'},
    {jugada:'d1d8',marcas:[['g8','jaque']],di:'…y abandona la segunda: Td8#. (Si no recaptura, te quedas con la torre).',sencillo:'¡Mate! No podía hacer las dos cosas.'}
  ],
  comprende:{di:'Busca piezas con dos tareas. Ataca una: al cumplirla, dejará la otra sin protección.'},
  practica:{fen:'6k1/r3qppp/8/8/Q7/7P/5PP1/3R2K1 w - - 0 1',linea:['a4a7','e7a7','d1d8'],meta:'mate',
    di:'Aprovecha la dama sobrecargada.',pistas:['La dama defiende la torre de a7 y la casilla d8.'],
    bien:'¡Mate! Y si no recaptura, ganas una torre.'},
  hazlo:{fen:'3r2k1/5ppp/8/3q4/8/3Q4/5PPP/4R1K1 w - - 0 1',linea:['d3d5','d8d5','e1e8'],meta:'mate',
    di:'Ahora la sobrecargada es una torre. Aprovéchalo.',pistas:['La torre de d8 defiende su dama y la última fila.'],
    bien:'¡Correcto! Si …Txd5, Te8#; si no, ganas la dama.'},
  comprueba:{fen:'2r3k1/2q2ppp/8/8/8/2Q5/5PPP/3R2K1 w - - 0 1',linea:['c3c7','c8c7','d1d8'],meta:'mate',
    di:'Encuentra la pieza sobrecargada y aprovéchala.',pistas:['¿Qué dos cosas defiende la torre de c8?'],
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

/* N3-005 · Peones doblados */
L['N3-005']={
  tactica:false,
  objetivo:'Vas a reconocer los peones doblados y por qué suelen ser una debilidad.',
  idea:'Dos peones del mismo color en la **misma columna** están **doblados**. No pueden defenderse entre sí y el de atrás queda bloqueado por el de delante.',
  descubre:{fen:'r1bqkbnr/1ppp1ppp/p1n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 0 4',di:'Tu alfil puede cambiarse por el caballo de c6. ¿Cómo recapturarían las negras?'},
  observa:[
    {jugada:'b5c6',di:'Axc6: el alfil se cambia por el caballo.',sencillo:'El alfil captura el caballo.'},
    {jugada:'d7c6',marcas:[['c6','clave'],['c7','clave']],di:'…dxc6: ahora las negras tienen dos peones en la columna c: están **doblados**.',sencillo:'Dos peones negros en la misma columna.'}
  ],
  comprende:{di:'Los peones doblados se defienden mal y avanzan con dificultad. A cambio, a veces abren columnas.'},
  practica:{tipo:'casilla',fen:'6k1/pp3p1p/6p1/8/8/2P3P1/P1P2P1P/6K1 w - - 0 1',casillas:['c2','c3'],
    di:'Toca los peones blancos doblados.',pista:'Busca dos peones blancos en la misma columna.',
    bien:'¡Correcto! Los peones de c2 y c3 están doblados.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3p1p/5p2/8/8/8/PP3PPP/6K1 w - - 0 1',casillas:['f7','f6'],
    di:'Toca los peones negros doblados.',pista:'Mira la columna f.',
    bien:'¡Bien! f7 y f6 están en la misma columna.'},
  comprueba:{tipo:'casilla',fen:'6k1/1pp2ppp/p1p5/8/4P3/4P3/PP3PPP/6K1 w - - 0 1',casillas:['c7','c6','e4','e3'],
    di:'Toca todos los peones doblados, blancos y negros.',pista:'Hay una pareja de cada color.',
    bien:'¡Excelente! Columna c para las negras y columna e para las blancas.'}
};

/* N3-006 · Peones aislados */
L['N3-006']={
  tactica:false,
  objetivo:'Vas a reconocer un peón aislado y aprender dónde bloquearlo.',
  idea:'Un peón **aislado** no tiene peones de su color en las **columnas vecinas**. Ningún peón puede defenderlo, y la casilla de **delante** es un buen puesto para las piezas rivales.',
  descubre:{fen:'6k1/pp3ppp/8/3p4/8/8/PP3PPP/6K1 w - - 0 1',di:'Mira el peón negro de d5. ¿Qué peones negros podrían defenderlo?'},
  observa:[
    {marcas:[['d5','clave']],di:'No hay peones negros en las columnas c ni e: el peón de d5 está **aislado**.',sencillo:'Está solo, sin vecinos.'},
    {marcas:[['d4','clave']],di:'La casilla d4, delante de él, nunca la podrá atacar un peón negro: es ideal para tus piezas.',sencillo:'Delante de él hay una casilla muy buena para ti.'}
  ],
  comprende:{di:'Ataca el peón aislado con tus piezas y bloquéalo poniendo una pieza delante.'},
  practica:{tipo:'casilla',fen:'6k1/pp3ppp/8/3p4/8/8/PP3PPP/6K1 w - - 0 1',casillas:['d5'],
    di:'Toca el peón aislado.',pista:'Busca un peón sin vecinos de su color.',
    bien:'¡Correcto! El peón de d5 no tiene vecinos.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3ppp/8/8/3P4/8/PP3PPP/6K1 w - - 0 1',casillas:['d4'],
    di:'Ahora el aislado es blanco. Tócalo.',pista:'Mira las columnas c y e.',
    bien:'¡Bien! El peón de d4 está aislado.'},
  comprueba:{tipo:'casilla',fen:'6k1/pp3ppp/8/3p4/8/8/PP3PPP/6K1 w - - 0 1',casillas:['d4'],
    di:'Toca la casilla donde conviene bloquear el peón aislado negro.',pista:'Justo delante del peón.',
    bien:'¡Excelente! Una pieza en d4 lo frena y ningún peón negro puede echarla.'}
};

/* N3-007 · Peones retrasados */
L['N3-007']={
  tactica:false,
  objetivo:'Vas a reconocer un peón retrasado y la casilla débil que deja.',
  idea:'Un peón **retrasado** se quedó atrás: sus vecinos ya avanzaron y no lo pueden defender, y la casilla de **delante** está vigilada por el rival, así que no puede avanzar.',
  descubre:{fen:'6k1/pp3ppp/3p4/4p3/4P3/8/PP3PPP/6K1 w - - 0 1',di:'Mira el peón negro de d6. ¿Puede avanzar? ¿Quién lo defiende?'},
  observa:[
    {marcas:[['d6','clave']],flechas:[['e4','d5','ataque']],di:'El peón de d6 no puede avanzar: tu peón de e4 vigila d5.',sencillo:'No puede avanzar.'},
    {marcas:[['d5','clave']],di:'Ningún peón negro puede atacar d5: es una casilla débil, perfecta para un caballo blanco.',sencillo:'d5 es un gran lugar para tus piezas.'}
  ],
  comprende:{di:'Fija el peón retrasado, ocupa la casilla de delante y atácalo con tus piezas.'},
  practica:{tipo:'casilla',fen:'6k1/pp3ppp/3p4/4p3/4P3/8/PP3PPP/6K1 w - - 0 1',casillas:['d6'],
    di:'Toca el peón retrasado de las negras.',pista:'Es el que se quedó atrás.',
    bien:'¡Correcto! El peón de d6 está retrasado.'},
  hazlo:{tipo:'casilla',fen:'6k1/pp3ppp/3p4/4p3/4P3/8/PP3PPP/6K1 w - - 0 1',casillas:['d5'],
    di:'Toca la casilla débil delante del peón retrasado.',pista:'Ningún peón negro puede atacarla.',
    bien:'¡Bien! d5 es la casilla débil.'},
  comprueba:{tipo:'casilla',fen:'6k1/pp3ppp/8/4p3/4P3/3P4/PP3PPP/6K1 w - - 0 1',casillas:['d3'],
    di:'Ahora el retrasado es blanco. Tócalo.',pista:'Busca el peón blanco que se quedó atrás.',
    bien:'¡Excelente! El peón de d3 está retrasado: d4 lo vigila el peón de e5.'}
};

/* N3-008 · Cadenas de peones */
L['N3-008']={
  tactica:false,
  objetivo:'Vas a reconocer una cadena de peones y su punto débil: la base.',
  idea:'En una **cadena**, cada peón defiende al de delante en diagonal. El de más atrás, la **base**, no tiene quien lo defienda: es el mejor punto de ataque.',
  descubre:{fen:'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5',di:'Caro-Kann, variante del avance. Mira los peones blancos de d4 y e5. ¿Quién defiende a quién?'},
  observa:[
    {flechas:[['d4','e5','defensa']],marcas:[['d4','clave']],di:'El peón de d4 defiende al de e5. d4 es la **base** de la cadena.',sencillo:'d4 sostiene a e5.'},
    {jugada:'c6c5',flechas:[['c5','d4','ataque']],di:'…c5: las negras atacan la base, el plan típico de la Caro-Kann contra el avance. Si cae d4, e5 queda solo.',sencillo:'Las negras atacan la base.'}
  ],
  comprende:{di:'No ataques la punta de la cadena: ataca su base.'},
  practica:{tipo:'casilla',fen:'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5',casillas:['d4'],
    di:'Toca la base de la cadena blanca.',pista:'Es el peón de más atrás de la cadena d4–e5.',
    bien:'¡Correcto! d4 es la base.'},
  hazlo:{tipo:'casilla',fen:'rn1qkbnr/pp3ppp/4p3/2ppPb2/3P4/5N2/PPP1BPPP/RNBQK2R w KQkq - 0 6',casillas:['e6'],
    di:'Toca la base de la cadena negra.',pista:'La cadena negra es e6–d5.',
    bien:'¡Bien! e6 es la base de la cadena negra.'},
  comprueba:{tipo:'casilla',fen:'6k1/pp3ppp/8/4P3/3P4/2P5/PP3PPP/6K1 w - - 0 1',casillas:['c3'],
    di:'Toca la base de esta cadena blanca.',pista:'La cadena va de c3 a e5.',
    bien:'¡Excelente! c3 sostiene toda la cadena.'}
};

/* N3-009 · Islas de peones */
L['N3-009']={
  tactica:false,
  objetivo:'Vas a contar las islas de peones y entender por qué menos islas es mejor.',
  idea:'Una **isla** es un grupo de peones en columnas seguidas. Entre islas hay columnas sin peones. Cuantas **menos islas**, más fuerte es tu estructura.',
  descubre:{fen:'6k1/p4ppp/8/8/8/8/P1P2PPP/6K1 w - - 0 1',di:'Cuenta los grupos de peones blancos y los negros. ¿Quién tiene menos?'},
  observa:[
    {marcas:[['a2','clave'],['c2','clave'],['f2','clave'],['g2','clave'],['h2','clave']],di:'Las blancas tienen 3 islas: a2, c2 y f2–g2–h2.',sencillo:'Tres grupos de peones blancos.'},
    {marcas:[['a7','clave'],['f7','clave'],['g7','clave'],['h7','clave']],di:'Las negras tienen 2 islas: a7 y f7–g7–h7. Tienen mejor estructura.',sencillo:'Las negras tienen solo dos grupos.'}
  ],
  comprende:{di:'Cada isla necesita sus propios defensores. Evita crear islas nuevas al capturar.'},
  practica:{tipo:'casilla',fen:'6k1/p4ppp/8/8/8/8/P1P2PPP/6K1 w - - 0 1',casillas:['a2','c2'],
    di:'Toca los peones blancos que forman una isla ellos solos.',pista:'Son peones sin vecinos.',
    bien:'¡Correcto! a2 y c2 son islas de un solo peón.'},
  hazlo:{tipo:'casilla',fen:'6k1/p4ppp/8/8/8/8/P1P2PPP/6K1 w - - 0 1',casillas:['a7'],
    di:'Toca el peón negro que forma una isla él solo.',pista:'Busca en el flanco de dama.',
    bien:'¡Bien! El peón de a7 está solo.'},
  comprueba:{tipo:'casilla',fen:'6k1/pp1p1p1p/8/8/8/8/P1PP1P1P/6K1 w - - 0 1',casillas:['a2','f2','h2'],
    di:'Toca los peones blancos que están solos en su isla.',pista:'c2 y d2 están juntos.',
    bien:'¡Excelente! a2, f2 y h2 están solos.'}
};

/* N3-013 · Defenderse del mate */
L['N3-013']={
  tactica:true, motivo:'Defensa contra el mate',
  objetivo:'Vas a aprender a ver la amenaza de mate del rival y a pararla.',
  idea:'Antes de cada jugada, mira si el rival **amenaza mate**. Puedes pararla **defendiendo** la casilla, **tapando** la línea o **dando aire** a tu rey.',
  descubre:{fen:'6k1/5ppp/3b4/8/7q/8/3N1PPP/5RK1 w - - 0 1',di:'La dama y el alfil negros apuntan a h2. ¿Qué amenazan?'},
  observa:[
    {flechas:[['h4','h2','ataque'],['d6','h2','ataque']],marcas:[['h2','amenazada']],di:'Las negras amenazan …Dxh2#: dama y alfil atacan h2.',sencillo:'Te amenazan mate en h2.'},
    {jugada:'d2f3',flechas:[['f3','h2','defensa'],['f3','h4','ataque']],di:'Cf3: el caballo defiende h2 y, además, ataca la dama.',sencillo:'El caballo defiende h2 y ataca la dama.'}
  ],
  comprende:{di:'Mira las piezas que apuntan a tu rey. Defiende la casilla de mate, tapa la línea o da aire al rey.'},
  practica:{fen:'6k1/5ppp/3b4/8/7q/8/3N1PPP/5RK1 w - - 0 1',linea:['d2f3'],acepta:{0:['g2g3','h2h3','f2f4']},objetivoEquilibrio:true,
    di:'Las negras amenazan mate en h2. Defiéndete.',pistas:['¿Qué pieza puede defender h2?','También puedes tapar la diagonal o atacar la dama con un peón.'],
    mal:{'*':'Así llega …Dxh2#. Busca una jugada que pare el mate.'},
    bien:'¡Bien! El mate está parado.'},
  hazlo:{fen:'5rk1/3n1ppp/8/7Q/8/3B4/5PPP/6K1 b - - 0 1',linea:['d7f6'],acepta:{0:['g7g6','h7h6','f7f5']},objetivoEquilibrio:true,
    di:'Juegas con negras. Las blancas amenazan mate en h7. Defiéndete.',pistas:['Tu caballo puede defender h7.'],
    mal:{'*':'Así llega Dxh7#. Busca una jugada que pare el mate.'},
    bien:'¡Correcto! El mate está parado.'}
};

/* N3-025 · Crear un peón pasado */
L['N3-025']={
  tactica:true, motivo:'Ruptura de peones',
  objetivo:'Vas a aprender a crear un peón pasado con una ruptura.',
  idea:'Con tres peones contra tres, a veces un **sacrificio de peón** abre paso a otro. Es la **ruptura**: el peón que queda corre a coronar.',
  descubre:{fen:'8/ppp3k1/8/PPP5/8/8/6K1/8 w - - 0 1',di:'Tres peones contra tres y los reyes lejos. ¿Puedes crear un peón pasado?'},
  observa:[
    {jugada:'b5b6',di:'b6!: el peón central se ofrece.',sencillo:'¡Un peón se sacrifica!'},
    {jugada:'a7b6',di:'…axb6',sencillo:'Las negras capturan.'},
    {jugada:'c5c6',di:'c6!: otro sacrificio.',sencillo:'¡Otro sacrificio!'},
    {jugada:'b7c6',di:'…bxc6',sencillo:'Las negras capturan otra vez.'},
    {jugada:'a5a6',marcas:[['a8','clave']],di:'a6: este peón ya no tiene rival delante y el rey negro está lejos. ¡Coronará!',sencillo:'El peón de a corre a coronar.'}
  ],
  comprende:{di:'Con los reyes lejos, una ruptura puede crear un peón pasado imparable. Cuenta bien las jugadas.'},
  practica:{fen:'8/ppp3k1/8/PPP5/8/8/6K1/8 w - - 0 1',linea:['b5b6'],
    di:'Crea un peón pasado con una ruptura.',pistas:['Empieza por el peón del medio.'],
    mal:{'*':'Así las negras se defienden. Busca la ruptura con un sacrificio.'},
    bien:'¡Bien! Si …axb6, c6; si …cxb6, a6. Un peón coronará.'},
  hazlo:{fen:'8/6k1/8/8/ppp5/8/PPP3K1/8 b - - 0 1',linea:['b4b3'],
    di:'Juegas con negras. Crea un peón pasado con una ruptura.',pistas:['Empieza por el peón del medio.'],
    mal:{'*':'Así las blancas se defienden. Busca la ruptura.'},
    bien:'¡Correcto! La ruptura funciona también para las negras.'}
};

/* N3-027 · Subpromoción */
L['N3-027']={
  tactica:true, motivo:'Subpromoción',
  objetivo:'Vas a aprender cuándo conviene coronar en torre o en caballo.',
  idea:'Casi siempre se corona en **dama**, pero a veces una dama **ahoga** al rival. Una **torre** gana igual. Y un **caballo** puede coronar dando un **tenedor**.',
  descubre:{fen:'8/k1P5/2K5/8/8/8/8/8 w - - 0 1',di:'Tu peón está a punto de coronar. ¿En qué pieza lo harías?'},
  observa:[
    {jugada:'c7c8q',marcas:[['a7','clave']],di:'c8=D?: el rey negro no tiene jugadas y no está en jaque. ¡Ahogado, tablas!',sencillo:'Con dama, es ahogado.'},
    {fen:'8/k1P5/2K5/8/8/8/8/8 w - - 0 1',jugada:'c7c8r',di:'c8=T: la torre no vigila b7 ni b6, así que el rey tiene jugadas.',sencillo:'Con torre, el rey todavía puede moverse.'},
    {jugada:'a7a6',di:'…Ra6',sencillo:'El rey se mueve.'},
    {jugada:'c8a8',marcas:[['a6','jaque']],di:'Ta8#: ¡mate!',sencillo:'¡Mate con la torre!'}
  ],
  comprende:{di:'Antes de coronar, comprueba que el rival tenga alguna jugada. Y mira si un caballo daría jaque y tenedor.'},
  practica:{fen:'8/k1P5/2K5/8/8/8/8/8 w - - 0 1',linea:['c7c8r','a7a6','c8a8'],meta:'mate',
    di:'Corona sin ahogar y da mate en dos.',pistas:['Con dama sería ahogado.','Corona en torre.'],
    mal:{'c7c8q':'¡Ahogado! Con dama el rey negro no tiene jugadas.'},
    bien:'¡Muy bien! Torre y mate.'},
  hazlo:{fen:'8/5P1k/5K2/8/8/8/8/8 w - - 0 1',linea:['f7f8r','h7h6','f8h8'],meta:'mate',
    di:'Corona sin ahogar y da mate en dos.',pistas:['Piensa qué casillas vigilaría una dama en f8.'],
    mal:{'f7f8q':'¡Ahogado! Con dama el rey negro no tiene jugadas.'},
    bien:'¡Correcto! Torre y mate.'},
  comprueba:{fen:'8/4P1k1/3q4/8/8/8/7P/K7 w - - 0 1',linea:['e7e8n'],
    di:'Corona de forma que ganes la dama negra.',pistas:['Busca una pieza que dé jaque y ataque a la dama a la vez.'],
    mal:{'e7e8q':'Con dama, las negras te dan jaques sin parar. Busca un tenedor.'},
    bien:'¡Excelente! e8=C+: tenedor al rey y a la dama.'}
};

/* N3-028 · Casillas clave */
L['N3-028']={
  tactica:false,
  objetivo:'Vas a aprender las casillas clave de un peón en los finales de rey y peón.',
  idea:'Las **casillas clave** de un peón son las que, si tu rey llega a ellas, **coronas seguro**. Para un peón en la cuarta fila, son las tres casillas **dos filas por delante**.',
  descubre:{fen:'8/8/8/8/4P3/8/4K3/7k w - - 0 1',di:'¿Adónde tiene que llegar tu rey para que el peón de e4 corone seguro?'},
  observa:[
    {marcas:[['d6','clave'],['e6','clave'],['f6','clave']],di:'Las casillas clave del peón de e4 son d6, e6 y f6.',sencillo:'Si tu rey llega a una de ellas, ganas.'}
  ],
  comprende:{di:'No hace falta correr con el peón: lleva tu rey a una casilla clave y el peón coronará.'},
  practica:{tipo:'casilla',fen:'8/8/8/8/4P3/8/4K3/7k w - - 0 1',casillas:['d6','e6','f6'],
    di:'Toca las tres casillas clave del peón de e4.',pista:'Están dos filas por delante del peón.',
    bien:'¡Correcto! d6, e6 y f6.'},
  hazlo:{fen:'8/8/3k4/5K2/4P3/8/8/8 w - - 0 1',linea:['f5f6'],
    di:'Lleva tu rey a una casilla clave.',pistas:['Una de ellas está muy cerca de tu rey.'],
    mal:{'e4e5':'El peón avanzó solo y el rey negro se pone delante. Primero, el rey.'},
    bien:'¡Bien! Tu rey está en f6: el peón coronará.'},
  comprueba:{fen:'8/8/2k5/4K3/3P4/8/8/8 w - - 0 1',linea:['e5e6'],
    di:'El peón está en d4. Lleva tu rey a una casilla clave.',pistas:['Las casillas clave de d4 son c6, d6 y e6.'],
    mal:{'d4d5':'El peón avanzó solo y el rey negro lo frena. Primero, el rey.'},
    bien:'¡Excelente! Re6: casilla clave alcanzada.'}
};

/* N3-030 · El ahogado salvador */
L['N3-030']={
  tactica:true, motivo:'Ahogado',
  objetivo:'Vas a aprender a salvar una partida perdida con el ahogado.',
  idea:'Si tu rey **no tiene jugadas** y tus peones están bloqueados, entrega tus últimas piezas: si el rival las captura, quedas **ahogado** y son tablas.',
  descubre:{fen:'8/5k2/8/8/8/7p/5q1P/4R2K w - - 0 1',di:'Las negras tienen una dama de más. Tu rey no puede moverse… ¿y si te quedas sin jugadas?'},
  observa:[
    {marcas:[['g1','bloqueada'],['g2','bloqueada'],['h2','bloqueada']],di:'Tu rey no tiene casillas y el peón de h2 está bloqueado. Solo te queda la torre.',sencillo:'Solo puedes mover la torre.'},
    {jugada:'e1e7',marcas:[['f7','jaque']],di:'Te7+: la torre se ofrece con jaque.',sencillo:'La torre da jaque.'},
    {jugada:'f7e7',di:'…Rxe7: ahora las blancas no tienen ninguna jugada. ¡Ahogado, tablas!',sencillo:'¡Ahogado! Te salvaste.'}
  ],
  comprende:{di:'Si estás perdido y casi sin jugadas, busca entregar tus piezas con jaque. Una torre que da jaques sin parar se llama «torre loca».'},
  practica:{fen:'8/5k2/8/8/8/7p/5q1P/4R2K w - - 0 1',linea:['e1e7'],objetivoEquilibrio:true,
    di:'Salva la partida.',pistas:['Si te quitan la torre, ¿te quedan jugadas?','Ofrécela con jaque.'],
    mal:{'*':'Así las negras ganan. Busca el ahogado.'},
    bien:'¡Bien! Si la captura, ahogado; si no, sigues dando jaques.'},
  hazlo:{fen:'4r2k/5Q1p/7P/8/8/8/5K2/8 b - - 0 1',linea:['e8e2'],objetivoEquilibrio:true,
    di:'Juegas con negras. Salva la partida.',pistas:['Ofrece la torre con jaque.'],
    mal:{'*':'Así las blancas ganan. Busca el ahogado.'},
    bien:'¡Correcto! La torre loca salva la partida.'}
};

/* N3-031 · Jaque perpetuo */
L['N3-031']={
  tactica:true, motivo:'Jaque perpetuo',
  objetivo:'Vas a aprender a salvar una partida con jaques que no terminan.',
  idea:'Si vas perdiendo pero puedes dar **jaques sin fin**, la partida es **tablas** por jaque perpetuo.',
  descubre:{fen:'6k1/6p1/8/7Q/8/8/qr4PP/7K w - - 0 1',di:'Las negras tienen mucho más material y amenazan mate. ¿Puedes salvarte con tu dama?'},
  observa:[
    {flechas:[['b2','b1','mov']],marcas:[['h1','clave']],di:'Las negras amenazan …Tb1+ y mate. No hay tiempo que perder.',sencillo:'Te amenazan mate.'},
    {jugada:'h5e8',marcas:[['g8','jaque']],di:'De8+: el rey solo puede ir a h7.',sencillo:'Jaque.'},
    {jugada:'g8h7',di:'…Rh7',sencillo:'El rey va a h7.'},
    {jugada:'e8h5',marcas:[['h7','jaque']],di:'Dh5+: y el rey tiene que volver a g8.',sencillo:'Otro jaque.'},
    {jugada:'h7g8',di:'…Rg8: la posición se repite. ¡Jaque perpetuo, tablas!',sencillo:'Los jaques no terminan: tablas.'}
  ],
  comprende:{di:'Cuando vas perdiendo, busca jaques que el rival no pueda evitar.'},
  practica:{fen:'6k1/6p1/8/7Q/8/8/qr4PP/7K w - - 0 1',linea:['h5e8'],objetivoEquilibrio:true,
    di:'Salva la partida con jaques.',pistas:['Empieza por un jaque en la última fila.'],
    mal:{'*':'Así las negras dan mate. Empieza a dar jaques.'},
    bien:'¡Bien! De8+ y Dh5+ se repiten sin fin: tablas.'},
  hazlo:{fen:'7k/QR4pp/8/8/7q/8/6P1/6K1 b - - 0 1',linea:['h4e1'],objetivoEquilibrio:true,
    di:'Juegas con negras. Salva la partida con jaques.',pistas:['Empieza por un jaque en la primera fila.'],
    mal:{'*':'Así las blancas dan mate. Empieza a dar jaques.'},
    bien:'¡Correcto! …De1+ y …Dh4+ se repiten: tablas.'}
};

/* N3-010 · Jugada intermedia */
L['N3-010']={
  tactica:true, motivo:'Jugada intermedia',
  objetivo:'Vas a aprender a no recapturar por costumbre: antes, mira si hay algo mejor.',
  idea:'Una **jugada intermedia** se juega **antes** de la respuesta que todos esperan. Si el rival te capturó una pieza, mira primero si puedes ganar algo más valioso.',
  descubre:{fen:'rn3rk1/pp3ppp/3q4/8/4N3/1Q3b2/PP3PPP/R4RK1 w - - 0 1',di:'El alfil negro acaba de comerse tu caballo de f3. ¿Recapturas enseguida?'},
  observa:[
    {flechas:[['g2','f3','ataque'],['e4','d6','ataque']],marcas:[['d6','amenazada']],di:'Puedes recuperar el alfil con gxf3… pero tu caballo ataca la dama de d6.',sencillo:'Antes de recapturar, mira la dama negra.'},
    {jugada:'e4d6',di:'Cxd6: primero la dama.',sencillo:'El caballo se come la dama.'},
    {jugada:'f8d8',di:'…Tfd8',sencillo:'Las negras atacan el caballo.'},
    {jugada:'b3f3',di:'Dxf3: y ahora también recuperas el alfil.',sencillo:'Y después recuperas el alfil.'}
  ],
  comprende:{di:'Antes de una jugada «obligada», pregúntate si hay otra más fuerte que puedas hacer primero.'},
  practica:{fen:'rn3rk1/pp3ppp/3q4/8/4N3/1Q3b2/PP3PPP/R4RK1 w - - 0 1',linea:['e4d6'],
    di:'Las negras te comieron un caballo. Busca algo mejor que recapturar.',pistas:['Mira qué ataca tu caballo de e4.'],
    mal:{'g2f3':'Recapturar está bien, pero antes podías ganar la dama.','b3f3':'Recapturar está bien, pero antes podías ganar la dama.'},
    bien:'¡Bien! Primero la dama; el alfil lo recuperas después.'},
  hazlo:{fen:'r4rk1/pp3ppp/1q3B2/4n3/8/3Q4/PP3PPP/RN3RK1 b - - 0 1',linea:['e5d3'],
    di:'Juegas con negras. Te comieron un caballo. Busca algo mejor que recapturar.',pistas:['Mira qué ataca tu caballo de e5.'],
    mal:{'g7f6':'Recapturar está bien, pero antes podías ganar la dama.','b6f6':'Recapturar está bien, pero antes podías ganar la dama.'},
    bien:'¡Correcto! …Cxd3: primero la dama.'}
};

/* N3-011 · Jaque intermedio */
L['N3-011']={
  tactica:true, motivo:'Jaque intermedio',
  objetivo:'Vas a aprender a meter un jaque antes de recapturar.',
  idea:'Un **jaque intermedio** obliga al rival a responder. Si ese jaque además **ataca otra pieza**, ganas material y después recapturas.',
  descubre:{fen:'r5k1/p3q1pp/8/8/8/2b5/PP4PP/3Q1RK1 w - - 0 1',di:'El alfil negro se comió tu caballo en c3. ¿Recapturas con el peón o hay algo mejor?'},
  observa:[
    {flechas:[['d1','d5','mov']],marcas:[['a8','clave'],['g8','clave']],di:'Desde d5, la dama daría jaque al rey y atacaría la torre de a8.',sencillo:'Mira la casilla d5.'},
    {jugada:'d1d5',marcas:[['g8','jaque'],['a8','amenazada']],di:'Dd5+: jaque y ataque a la torre.',sencillo:'¡Jaque! Y la torre queda atacada.'},
    {jugada:'e7e6',di:'…De6: las negras tapan el jaque.',sencillo:'Las negras tapan.'},
    {jugada:'d5a8',marcas:[['g8','jaque']],di:'Dxa8+: la torre cae, y el alfil de c3 sigue colgado.',sencillo:'Te comes la torre.'}
  ],
  comprende:{di:'Antes de recapturar, busca jaques. Uno que ataque otra pieza puede ganar mucho.'},
  practica:{fen:'r5k1/p3q1pp/8/8/8/2b5/PP4PP/3Q1RK1 w - - 0 1',linea:['d1d5'],
    di:'Antes de recapturar, busca un jaque que gane más.',pistas:['La dama puede dar jaque y atacar la torre a la vez.'],
    mal:{'b2c3':'Recapturar está bien, pero antes había un jaque que ganaba la torre.'},
    bien:'¡Bien! Dd5+ gana la torre; el alfil puede esperar.'},
  hazlo:{fen:'3q1rk1/pp4pp/2B5/8/8/8/P3Q1PP/R5K1 b - - 0 1',linea:['d8d4'],
    di:'Juegas con negras. Antes de recapturar, busca un jaque que gane más.',pistas:['Tu dama puede dar jaque y atacar la torre de a1.'],
    mal:{'b7c6':'Recapturar está bien, pero antes había un jaque que ganaba la torre.'},
    bien:'¡Correcto! …Dd4+ gana la torre.'}
};

/* N3-012 · Contraataque */
L['N3-012']={
  tactica:true, motivo:'Contraataque',
  objetivo:'Vas a aprender a responder a una amenaza con otra más fuerte.',
  idea:'Cuando te atacan una pieza, no siempre hay que retirarla sin más. Busca un **contraataque**: una jugada que la salve y, a la vez, cree una amenaza **mayor**.',
  descubre:{fen:'r5k1/p3b1pp/8/2p4n/3Q4/8/PP3PPP/6K1 w - - 0 1',di:'El peón de c5 ataca tu dama. ¿Adónde la llevarías?'},
  observa:[
    {flechas:[['c5','d4','ataque']],marcas:[['d4','amenazada']],di:'Tu dama está atacada. Tiene que moverse…',sencillo:'La dama debe moverse.'},
    {jugada:'d4d5',marcas:[['g8','jaque'],['a8','amenazada']],di:'Dd5+: se salva con jaque y ataca la torre de a8.',sencillo:'Se escapa dando jaque y atacando la torre.'},
    {jugada:'g8h8',di:'…Rh8',sencillo:'El rey se aparta.'},
    {jugada:'d5a8',marcas:[['h8','jaque']],di:'Dxa8+: el contraataque ganó una torre.',sencillo:'Te comes la torre.'}
  ],
  comprende:{di:'Si tienes que mover una pieza atacada, elige la casilla donde amenace algo grande.'},
  practica:{fen:'r5k1/p3b1pp/8/2p4n/3Q4/8/PP3PPP/6K1 w - - 0 1',linea:['d4d5'],
    di:'Tu dama está atacada. Sálvala con un contraataque.',pistas:['Busca una casilla con jaque.'],
    bien:'¡Bien! Dd5+ y la torre de a8 cae.'},
  hazlo:{fen:'6k1/pp3ppp/8/3q4/2P4N/8/P3B1PP/R5K1 b - - 0 1',linea:['d5d4'],
    di:'Juegas con negras. Tu dama está atacada. Contraataca.',pistas:['Busca una casilla con jaque.'],
    bien:'¡Correcto! …Dd4+ y la torre de a1 cae.'}
};

/* N3-019 · El peón envenenado */
L['N3-019']={
  tactica:true, motivo:'Peón envenenado',
  objetivo:'Vas a aprender por qué algunos peones «gratis» son una trampa.',
  idea:'Un **peón envenenado** parece gratis, pero al comerlo la dama se aleja, pierde tiempo y puede quedar **atrapada** o recibir un ataque fuerte.',
  descubre:{fen:'rnb1kbnr/pp2pppp/1q6/2pp4/3P1B2/2N1P3/PPP2PPP/R2QKBNR b KQkq - 2 4',di:'Tu dama puede comerse el peón de b2. ¿Lo harías?'},
  observa:[
    {jugada:'b6b2',di:'…Dxb2?: la dama se va lejos de casa.',sencillo:'La dama se come el peón.'},
    {jugada:'c3d5',flechas:[['d5','c7','ataque']],marcas:[['c7','clave']],di:'Cxd5!: amenaza Cc7+ y también Tb1, que atrapa la dama.',sencillo:'El caballo amenaza c7 y la dama está en peligro.'}
  ],
  comprende:{di:'Antes de comerte un peón con la dama, mira si podrá volver y qué ganará el rival en tiempo.'},
  practica:{fen:'rnb1kbnr/pp2pppp/8/2pp4/3P1B2/2N1P3/PqP2PPP/R2QKBNR w KQkq - 0 5',linea:['c3d5'],acepta:{0:['f1b5']},
    di:'La dama negra se comió el peón de b2. Castígala.',pistas:['El caballo puede saltar a d5 con amenazas.','Piensa en Cc7+ y en Tb1.'],
    bien:'¡Bien! La dama negra está lejos y tus piezas atacan.'},
  hazlo:{fen:'rnb1kbnr/pp2pppp/1q6/2pp4/3P1B2/2N1P3/PPP2PPP/R2QKBNR b KQkq - 2 4',linea:['e7e6'],acepta:{0:['g8f6']},concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. No caigas en la trampa: desarrolla tu juego.',pistas:['El peón de b2 está envenenado.','Abre paso a tu alfil o saca un caballo.'],
    mal:{'b6b2':'¡Peón envenenado! Tras Cxd5, tu dama sufre.','*':'Desarrolla una pieza o abre paso a tu alfil.'},
    bien:'¡Correcto! Sin caer en la trampa.'}
};
/* N3-020 · Del desarrollo al plan */
L['N3-020']={
  tactica:false,
  objetivo:'Vas a aprender qué hacer cuando ya desarrollaste tus piezas.',
  idea:'Tras el desarrollo: saca la **última pieza**, coloca las **torres** en columnas útiles y lleva tus piezas a **casillas fuertes** del centro.',
  descubre:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',di:'Sistema Londres: ya enrocaste y casi todo está fuera. ¿Qué pieza falta? ¿Qué harías después?'},
  observa:[
    {marcas:[['b1','clave']],di:'El caballo de b1 todavía no salió.',sencillo:'Falta una pieza.'},
    {jugada:'b1d2',di:'Cbd2: ahora todas las piezas menores están en juego.',sencillo:'El caballo sale.'},
    {jugada:'c8b7',di:'…Ab7: las negras completan su desarrollo.',sencillo:'Las negras también terminan.'},
    {jugada:'f1e1',flechas:[['e3','e4','mov']],di:'Te1: la torre se coloca detrás del peón de e3 y prepara su avance a e4.',sencillo:'La torre se acerca al centro.'},
    {jugada:'a8c8',di:'…Tc8',sencillo:'Las negras mueven su torre.'},
    {jugada:'f3e5',marcas:[['e5','clave']],di:'Ce5: el caballo ocupa e5, una casilla central fuerte. Es un plan típico del Londres.',sencillo:'El caballo salta al centro.'}
  ],
  comprende:{di:'Primero, todas las piezas fuera. Después, torres al centro y piezas a casillas fuertes, como e5 en el Londres.'},
  practica:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',linea:['b1d2'],concepto:true,objetivoEquilibrio:true,
    di:'Saca la pieza que falta.',pistas:['Mira la esquina de la izquierda.'],
    mal:{'*':'Todavía falta una pieza por salir. Búscala.'},
    bien:'¡Bien! Todas tus piezas menores están en juego.'},
  hazlo:{fen:'r2q1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2Q1RK1 w - - 2 10',linea:['f1e1'],concepto:true,objetivoEquilibrio:true,
    di:'Pon una torre en la columna e, detrás de tu peón de e3.',pistas:['La torre de f1 está cerca.'],
    mal:{'*':'Lleva una torre a e1.'},
    bien:'¡Correcto! La torre apoya el centro.'},
  comprueba:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',linea:['f3e5'],concepto:true,objetivoEquilibrio:true,
    di:'Lleva una pieza a la casilla central fuerte e5.',pistas:['Tu caballo de f3 llega en un salto.'],
    mal:{'*':'Busca la jugada que ocupa e5 con una pieza.'},
    bien:'¡Muy bien! El caballo en e5 domina el centro.'}
};

/* N3-021 · Mejorar la peor pieza */
L['N3-021']={
  tactica:false,
  objetivo:'Vas a aprender a encontrar tu peor pieza y a mejorarla.',
  idea:'Cuando no hay nada urgente, busca tu **peor pieza** (la que menos casillas controla) y llévala a una casilla mejor.',
  descubre:{fen:'6k1/pp2bppp/2p5/8/8/7N/PP3PPP/6K1 w - - 0 1',di:'¿Cuál de tus piezas está peor colocada?'},
  observa:[
    {marcas:[['h3','clave']],di:'El caballo de h3 está en el borde: controla pocas casillas.',sencillo:'El caballo del borde está triste.'},
    {jugada:'h3f4',di:'Cf4: el caballo vuelve al centro y controla más casillas.',sencillo:'Ahora el caballo está mejor.'}
  ],
  comprende:{di:'«Caballo en el borde, caballo triste». Mejora la pieza que menos trabaja.'},
  practica:{tipo:'casilla',fen:'6k1/pp2bppp/2p5/8/8/7N/PP3PPP/6K1 w - - 0 1',casillas:['h3'],
    di:'Toca tu peor pieza.',pista:'Busca en el borde.',
    bien:'¡Correcto! El caballo de h3 es tu peor pieza.'},
  hazlo:{fen:'6k1/pp2bppp/2p5/8/8/7N/PP3PPP/6K1 w - - 0 1',linea:['h3f4'],concepto:true,objetivoEquilibrio:true,
    di:'Mejora tu caballo.',pistas:['Llévalo hacia el centro.'],
    mal:{'*':'Mueve el caballo de h3 hacia el centro.'},
    bien:'¡Bien! El caballo trabaja mucho más en f4.'},
  comprueba:{tipo:'casilla',fen:'2b3k1/pp1p1ppp/8/8/8/8/PP3PPP/2B3K1 w - - 0 1',casillas:['c8'],
    di:'Toca la peor pieza de las negras.',pista:'Busca una pieza encerrada por sus propios peones.',
    bien:'¡Correcto! El alfil de c8 está encerrado por b7 y d7.'}
};

/* N3-022 · Columnas abiertas */
L['N3-022']={
  tactica:false,
  objetivo:'Vas a aprender a llevar las torres a las columnas abiertas.',
  idea:'Una **columna abierta** no tiene peones. Allí la torre se mueve libre y puede llegar a las filas del rival.',
  descubre:{fen:'r3r1k1/pp3ppp/2p5/8/8/2P5/PP3PPP/R4RK1 w - - 0 1',di:'¿Qué columnas no tienen ningún peón? ¿Dónde estarían mejor tus torres?'},
  observa:[
    {marcas:[['d1','clave'],['e1','clave']],di:'Las columnas d y e están abiertas: no hay peones en ellas.',sencillo:'Dos columnas vacías.'},
    {jugada:'f1d1',flechas:[['d1','d8','linea']],di:'Tfd1: la torre domina la columna d.',sencillo:'La torre ocupa la columna abierta.'}
  ],
  comprende:{di:'Torres a las columnas abiertas: desde allí llegan a la séptima fila del rival.'},
  practica:{fen:'r3r1k1/pp3ppp/2p5/8/8/2P5/PP3PPP/R4RK1 w - - 0 1',linea:['f1d1'],acepta:{0:['a1d1','a1e1','f1e1']},concepto:true,objetivoEquilibrio:true,
    di:'Lleva una torre a una columna abierta.',pistas:['Mira las columnas d y e.'],
    mal:{'*':'Mueve una torre a la columna d o a la e.'},
    bien:'¡Bien! Tu torre domina una columna abierta.'},
  hazlo:{fen:'r4rk1/pp3ppp/2p5/8/8/2P5/PP3PPP/R3R1K1 b - - 0 1',linea:['f8d8'],acepta:{0:['a8d8','a8e8','f8e8']},concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Lleva una torre a una columna abierta.',pistas:['Mira las columnas d y e.'],
    mal:{'*':'Mueve una torre a la columna d o a la e.'},
    bien:'¡Correcto! Torre en columna abierta.'}
};

/* N3-023 · La torre en séptima */
L['N3-023']={
  tactica:false,
  objetivo:'Vas a aprender la fuerza de una torre en la séptima fila.',
  idea:'En la **séptima fila** (la segunda del rival) la torre ataca los peones que no avanzaron y encierra al rey en su última fila.',
  descubre:{fen:'5rk1/pp3pp1/7p/8/8/8/PP3PPP/3R2K1 w - - 0 1',di:'La columna d está abierta. ¿Hasta dónde puede llegar tu torre?'},
  observa:[
    {jugada:'d1d7',flechas:[['d7','b7','ataque'],['d7','f7','ataque']],di:'Td7: la torre ataca los peones de b7 y f7.',sencillo:'La torre llega a la séptima y ataca peones.'},
    {jugada:'f8b8',di:'…Tb8: las negras defienden a la desesperada.',sencillo:'Las negras se defienden.'}
  ],
  comprende:{di:'Una torre en séptima vale casi tanto como un peón de más.'},
  practica:{fen:'5rk1/pp3pp1/7p/8/8/8/PP3PPP/3R2K1 w - - 0 1',linea:['d1d7'],concepto:true,objetivoEquilibrio:true,
    di:'Lleva tu torre a la séptima fila.',pistas:['La columna d está libre hasta d7.'],
    mal:{'*':'Lleva la torre a d7.'},
    bien:'¡Bien! Tu torre ataca los peones negros.'},
  hazlo:{fen:'3r2k1/pp3ppp/8/8/8/7P/PP3PP1/5RK1 b - - 0 1',linea:['d8d2'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Lleva tu torre a la segunda fila.',pistas:['La columna d está libre hasta d2.'],
    mal:{'*':'Lleva la torre a d2.'},
    bien:'¡Correcto! Tu torre ataca los peones blancos.'}
};

/* N3-024 · Diagonales y fianchetto */
L['N3-024']={
  tactica:false,
  objetivo:'Vas a aprender a colocar el alfil en la gran diagonal: el fianchetto.',
  idea:'Con el **fianchetto** el alfil va a **g2** (o b2) después de mover el peón de g. Desde allí domina la **gran diagonal** y protege a su rey.',
  descubre:{fen:'rnbqkbnr/ppp1pppp/8/3p4/8/6P1/PPPPPP1P/RNBQKBNR w KQkq - 0 2',di:'Ya jugaste g3. ¿Dónde estaría mejor tu alfil de f1?'},
  observa:[
    {jugada:'f1g2',flechas:[['g2','d5','ataque']],di:'Ag2: el alfil mira toda la gran diagonal, hasta el centro y más allá.',sencillo:'El alfil en la gran diagonal.'}
  ],
  comprende:{di:'Un alfil en fianchetto controla el centro desde lejos y defiende al rey enrocado.'},
  practica:{fen:'rnbqkbnr/ppp1pppp/8/3p4/8/6P1/PPPPPP1P/RNBQKBNR w KQkq - 0 2',linea:['f1g2'],concepto:true,objetivoEquilibrio:true,
    di:'Coloca tu alfil en fianchetto.',pistas:['La casilla está justo delante de donde estaba el peón de g.'],
    mal:{'*':'Lleva el alfil de f1 a g2.'},
    bien:'¡Bien! Alfil en la gran diagonal.'},
  hazlo:{fen:'rnbqkbnr/pppppp1p/6p1/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2',linea:['f8g7'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Coloca tu alfil en fianchetto.',pistas:['Ya jugaste …g6.'],
    mal:{'*':'Lleva el alfil de f8 a g7.'},
    bien:'¡Correcto! Tu alfil presiona d4 desde g7.'}
};

/* N3-026 · Bloquear un peón pasado */
L['N3-026']={
  tactica:false,
  objetivo:'Vas a aprender a frenar un peón pasado bloqueándolo.',
  idea:'Un peón pasado se frena poniendo una pieza **justo delante**. El **caballo** es el mejor bloqueador: desde allí sigue atacando casillas.',
  descubre:{fen:'6k1/4bppp/8/8/3p4/8/1N3PPP/6K1 w - - 0 1',di:'El peón negro de d4 está pasado. ¿Cómo lo frenarías?'},
  observa:[
    {marcas:[['d3','clave']],di:'La casilla d3, justo delante del peón, es la de bloqueo.',sencillo:'Ponte delante del peón.'},
    {jugada:'b2d3',di:'Cd3: el caballo bloquea el peón y, además, controla casillas importantes.',sencillo:'El caballo frena el peón.'}
  ],
  comprende:{di:'Bloquea el peón pasado con una pieza delante. Mejor con un caballo que con la dama.'},
  practica:{tipo:'casilla',fen:'6k1/4bppp/8/8/3p4/8/1N3PPP/6K1 w - - 0 1',casillas:['d3'],
    di:'Toca la casilla donde conviene bloquear el peón pasado.',pista:'Justo delante del peón.',
    bien:'¡Correcto! d3.'},
  hazlo:{fen:'6k1/4bppp/8/8/3p4/8/1N3PPP/6K1 w - - 0 1',linea:['b2d3'],concepto:true,objetivoEquilibrio:true,
    di:'Bloquea el peón pasado con tu caballo.',pistas:['Llévalo a la casilla de delante del peón.'],
    mal:{'*':'Pon el caballo justo delante del peón.'},
    bien:'¡Bien! El peón ya no avanza.'},
  comprueba:{fen:'6k1/1n3ppp/8/3P4/8/8/4BPPP/6K1 b - - 0 1',linea:['b7d6'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Bloquea el peón pasado blanco.',pistas:['Tu caballo puede ponerse delante del peón.'],
    mal:{'*':'Pon el caballo justo delante del peón.'},
    bien:'¡Excelente! Cd6 frena el peón.'}
};

/* N3-029 · Zugzwang elemental */
L['N3-029']={
  tactica:false,
  objetivo:'Vas a aprender qué es el zugzwang: cuando mover es lo peor.',
  idea:'Hay **zugzwang** cuando al rival le toca mover y **cualquier jugada lo empeora**. En los finales de peones, con la oposición, el rey rival tiene que ceder el paso.',
  descubre:{fen:'8/8/3k4/8/4PK2/8/8/8 w - - 0 1',di:'¿Dónde pondrías tu rey para que al rey negro le toque ceder?'},
  observa:[
    {jugada:'f4f5',marcas:[['f5','clave']],di:'Rf5: tu rey se acerca a las casillas clave (e6, f6 y g6).',sencillo:'Tu rey avanza.'},
    {jugada:'d6e7',di:'…Re7: el rey negro se pone delante.',sencillo:'El rey negro se defiende.'},
    {jugada:'f5e5',marcas:[['e5','clave'],['e7','clave']],di:'Re5: oposición. Ahora el negro está en **zugzwang**: si se aparta, tu rey entra.',sencillo:'Al negro le toca mover y debe ceder.'}
  ],
  comprende:{di:'Busca posiciones en las que al rival le toque mover y no tenga jugadas buenas.'},
  practica:{fen:'8/8/3k4/8/4PK2/8/8/8 w - - 0 1',linea:['f4f5'],
    di:'Avanza tu rey para ganar.',pistas:['Busca la casilla que lleva a las casillas clave.'],
    mal:{'e4e5':'El peón avanzó solo y el rey negro lo frena.'},
    bien:'¡Bien! Tu rey llegará a una casilla clave.'},
  hazlo:{fen:'8/8/8/3kp3/8/8/5K2/8 b - - 0 1',linea:['d5d4'],
    di:'Juegas con negras. Mueve tu rey para ganar.',pistas:['Ponte delante de tu peón.'],
    mal:{'e5e4':'El peón avanzó solo y el rey blanco lo frena.'},
    bien:'¡Correcto! El rey abre paso al peón.'},
  comprueba:{fen:'8/2k5/8/8/3PK3/8/8/8 w - - 0 1',linea:['e4e5'],
    di:'Pon al rey negro en zugzwang.',pistas:['Acércate a las casillas clave del peón.'],
    mal:{'d4d5':'El peón avanzó solo y el rey negro lo frena.'},
    bien:'¡Excelente! El rey negro no podrá frenarte.'}
};

/* N3-032 · Repetir para salvarse */
L['N3-032']={
  tactica:true, motivo:'Repetición de jugadas',
  objetivo:'Vas a aprender a salvarte repitiendo la posición.',
  idea:'Si la misma posición se repite **tres veces**, son **tablas**. Cuando vas perdiendo, repetir jaques o amenazas es un gran recurso.',
  descubre:{fen:'1k6/1p6/8/Q7/8/8/PP4rq/K7 w - - 0 1',di:'Las negras amenazan mate en h1. ¿Puedes forzar una repetición?'},
  observa:[
    {jugada:'a5d8',marcas:[['b8','jaque']],di:'Dd8+: el rey solo puede ir a a7.',sencillo:'Jaque.'},
    {jugada:'b8a7',di:'…Ra7',sencillo:'El rey va a a7.'},
    {jugada:'d8a5',marcas:[['a7','jaque']],di:'Da5+: y vuelve a b8.',sencillo:'Otro jaque.'},
    {jugada:'a7b8',di:'…Rb8: si se repite tres veces, son tablas.',sencillo:'La posición se repite: tablas.'}
  ],
  comprende:{di:'Repetir la posición tres veces da tablas. Úsalo cuando el rival tenga ventaja.'},
  practica:{fen:'1k6/1p6/8/Q7/8/8/PP4rq/K7 w - - 0 1',linea:['a5d8'],objetivoEquilibrio:true,
    di:'Fuerza la repetición con jaques.',pistas:['Empieza por un jaque en la octava fila.'],
    mal:{'*':'Así las negras dan mate. Empieza a dar jaques.'},
    bien:'¡Bien! Dd8+ y Da5+ se repiten: tablas.'},
  hazlo:{fen:'k7/pp4RQ/8/8/q7/8/1P6/1K6 b - - 0 1',linea:['a4d1'],objetivoEquilibrio:true,
    di:'Juegas con negras. Fuerza la repetición con jaques.',pistas:['Empieza por un jaque en la primera fila.'],
    mal:{'*':'Así las blancas dan mate. Empieza a dar jaques.'},
    bien:'¡Correcto! …Dd1+ y …Da4+ se repiten: tablas.'}
};

/* N3-033 · Sacrificios elementales */
L['N3-033']={
  tactica:true, motivo:'Sacrificio',
  objetivo:'Vas a aprender a entregar material para ganar algo mayor.',
  idea:'Un **sacrificio** entrega material a cambio de algo más valioso: coronar un peón, dar mate o ganar la dama.',
  descubre:{fen:'1r4k1/1P3ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1',di:'Tu peón de b7 está a un paso de coronar, pero la torre de b8 lo frena. ¿Qué entregarías?'},
  observa:[
    {jugada:'c1c8',flechas:[['c8','b8','ataque']],di:'Tc8!: la torre se ofrece.',sencillo:'La torre se sacrifica.'},
    {jugada:'b8c8',di:'…Txc8',sencillo:'Las negras la capturan.'},
    {jugada:'b7c8q',marcas:[['g8','jaque']],di:'bxc8=D#: el peón corona con mate.',sencillo:'¡Corona y da mate!'}
  ],
  comprende:{di:'No cuentes solo el material: mira qué consigues a cambio del sacrificio.'},
  practica:{fen:'1r4k1/1P3ppp/8/8/8/8/5PPP/2R3K1 w - - 0 1',linea:['c1c8'],
    di:'Sacrifica para coronar.',pistas:['Ataca la torre de b8 desde c8.'],
    bien:'¡Bien! Si …Txc8, bxc8=D+; si no, Txb8+.'},
  hazlo:{fen:'kr6/pppN4/8/Q7/8/4R3/PPP5/1K6 w - - 0 1',linea:['a5a7','a8a7','e3a3'],meta:'mate',
    di:'Sacrifica la dama y da mate en dos.',pistas:['La dama captura en a7 con jaque.','Después, la torre llega a la columna a.'],
    bien:'¡Excelente! Dxa7+, Rxa7 y Ta3#.'}
};

/* N3-036 · Combinar dos motivos */
L['N3-036']={
  tactica:true, motivo:'Combinación',
  objetivo:'Vas a aprender a unir dos ideas tácticas en una combinación.',
  idea:'Las combinaciones suelen **unir dos motivos**: por ejemplo, un cambio que **aleja al defensor** seguido de un **tenedor**.',
  descubre:{fen:'3qk2r/pp3ppp/8/6N1/8/8/PP3PPP/3Q2K1 w - - 0 1',di:'Tu caballo ataca f7, pero el rey lo defiende. ¿Y si el rey se moviera?'},
  observa:[
    {flechas:[['g5','f7','ataque']],marcas:[['f7','defendida']],di:'Ahora el rey de e8 defiende f7.',sencillo:'El rey cuida f7.'},
    {jugada:'d1d8',marcas:[['e8','jaque']],di:'Dxd8+: cambio de damas con jaque…',sencillo:'Cambias las damas.'},
    {jugada:'e8d8',di:'…Rxd8: el rey, que defendía f7, se aleja.',sencillo:'El rey se aleja.'},
    {jugada:'g5f7',flechas:[['f7','h8','ataque']],marcas:[['d8','jaque'],['h8','amenazada']],di:'Cxf7+: tenedor al rey y a la torre.',sencillo:'¡Tenedor!'}
  ],
  comprende:{di:'Busca la segunda idea: ¿qué pasa después de la primera captura o del primer jaque?'},
  practica:{fen:'3qk2r/pp3ppp/8/6N1/8/8/PP3PPP/3Q2K1 w - - 0 1',linea:['d1d8','e8d8','g5f7'],
    di:'Aleja al rey de f7 y da un tenedor.',pistas:['Cambia las damas con jaque.','Después, el caballo entra en f7.'],
    bien:'¡Bien! Dxd8+, Rxd8 y Cxf7+.'},
  hazlo:{fen:'2q1r1k1/5ppp/8/8/8/8/4QPPP/4R1K1 w - - 0 1',linea:['e2e8','c8e8','e1e8'],meta:'mate',
    di:'Sacrifica tu dama en e8 y aprovecha tu torre de e1. Mate en dos.',pistas:['La dama de c8 defiende e8.','Tu torre de e1 está detrás de tu dama.'],
    bien:'¡Excelente! Dxe8+, Dxe8 y Txe8#.'}
};

/* N3-037 · Visualizar dos jugadas */
L['N3-037']={
  tactica:true, motivo:'Cálculo de dos jugadas',
  objetivo:'Vas a aprender a ver una variante de dos jugadas sin mover las piezas.',
  idea:'**Visualizar** es imaginar el tablero tras tu jugada y la respuesta del rival. Pregúntate: ¿qué piezas quedan sin defensa después?',
  descubre:{fen:'3q2k1/pp3ppp/8/8/6n1/8/PP3PPP/3QK2R b - - 0 1',di:'Imagina que cambias las damas en d1. ¿Dónde quedará el rey blanco? ¿Qué ataca tu caballo?'},
  observa:[
    {flechas:[['g4','f2','ataque']],marcas:[['f2','defendida']],di:'Tu caballo ataca f2, pero el rey de e1 lo defiende.',sencillo:'El rey cuida f2.'},
    {jugada:'d8d1',marcas:[['e1','jaque']],di:'…Dxd1+',sencillo:'Cambias las damas con jaque.'},
    {jugada:'e1d1',di:'Rxd1: el rey se alejó de f2.',sencillo:'El rey se aleja.'},
    {jugada:'g4f2',flechas:[['f2','h1','ataque']],marcas:[['d1','jaque']],di:'…Cxf2+: tenedor al rey y a la torre.',sencillo:'¡Tenedor!'}
  ],
  comprende:{di:'Antes de mover, imagina la posición dos jugadas después: ¿qué cambió?'},
  practica:{fen:'3q2k1/pp3ppp/8/8/6n1/8/PP3PPP/3QK2R b - - 0 1',linea:['d8d1','e1d1','g4f2'],
    di:'Juegas con negras. Calcula dos jugadas y gana la torre.',pistas:['Cambia las damas con jaque.','¿Qué defendía el rey blanco?'],
    bien:'¡Bien! …Dxd1+, Rxd1 y …Cxf2+.'},
  hazlo:{fen:'1k2q3/ppp3pp/8/8/8/4B3/PPP3PP/1K2R3 w - - 0 1',linea:['e3a7','b8a7','e1e8'],
    di:'Gana la dama negra. Imagina la posición tras tu jaque.',pistas:['Si el alfil se aparta con jaque, la torre ataca e8.'],
    bien:'¡Excelente! Axa7+, Rxa7 y Txe8.'}
};

/* N3-038 · Revisar tus partidas */
L['N3-038']={
  tactica:true, motivo:'Repaso de errores',
  objetivo:'Vas a aprender a repasar tus partidas buscando lo que se te escapó.',
  idea:'Después de jugar, repasa los momentos clave: ¿había un **mate**, un **tenedor** o una **pieza sin defensa** que no viste? Así no volverás a fallar.',
  descubre:{fen:'6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',di:'En una partida, aquí se jugó otra cosa. ¿Qué se te escapó?'},
  observa:[
    {marcas:[['f7','bloqueada'],['g7','bloqueada'],['h7','bloqueada']],di:'El rey negro no tiene hueco de escape…',sencillo:'El rey negro está encerrado.'},
    {jugada:'d1d8',marcas:[['g8','jaque']],di:'…y Td8 era mate. Anota estos patrones para la próxima vez.',sencillo:'¡Era mate!'}
  ],
  comprende:{di:'Al repasar, busca jaques, capturas y amenazas que no viste durante la partida.'},
  practica:{fen:'6k1/5ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',linea:['d1d8'],meta:'mate',
    di:'En tu partida no viste este mate. Encuéntralo ahora.',pistas:['Mira la última fila.'],
    bien:'¡Eso es! Mate en la última fila.'},
  hazlo:{fen:'r3k3/pp3ppp/8/3N4/8/8/PP3PPP/6K1 w - - 0 1',linea:['d5c7'],
    di:'Aquí jugaste otra cosa. ¿Qué tenedor se te escapó?',pistas:['El caballo puede atacar al rey y a la torre.'],
    bien:'¡Correcto! Cc7+ gana la torre.'},
  comprueba:{fen:'6k1/5ppp/8/3n4/7q/8/5PPP/3Q2K1 w - - 0 1',linea:['d1d5'],objetivoEquilibrio:true,
    di:'En tu partida no capturaste esta pieza. ¿Cuál era?',pistas:['Busca una pieza negra sin defensa.'],
    bien:'¡Bien! El caballo de d5 no tenía defensa.'}
};

})();
