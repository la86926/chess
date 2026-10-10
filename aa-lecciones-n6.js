/* Aprende Ajedrez · lecciones del NIVEL SEIS (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};
var INICIAL='rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
var SIEMPRE='1r2k1r1/pbppnp1p/1bn2P2/8/Q7/B1PB1q2/P4PPP/3RR1K1 w - - 0 20';

/* N6-001 · Peones colgantes */
L['N6-001']={
  tactica:false, motivo:'Peones colgantes',
  objetivo:'Vas a reconocer los peones colgantes y su punto débil.',
  idea:'Los **peones colgantes** son dos peones vecinos (c y d) **sin peones al lado**. Controlan el centro, pero si uno avanza, el otro queda **retrasado** y débil.',
  descubre:{fen:'r2q1rk1/pb2bppp/5n2/2pp4/8/1P3NP1/PB2PPBP/R2Q1RK1 w - - 0 12',di:'Mira los peones negros de c5 y d5. ¿Tienen vecinos en las columnas b o e?'},
  observa:[
    {marcas:[['c5','clave'],['d5','clave']],di:'c5 y d5 están solos: son peones colgantes.',sencillo:'Dos peones sin vecinos.'},
    {flechas:[['d1','d5','ataque'],['g2','d5','linea']],di:'Las blancas los presionan con piezas: si uno avanza, el otro queda débil.',sencillo:'Las piezas los atacan.'}
  ],
  comprende:{di:'Con peones colgantes, el bando que los tiene busca avanzar con fuerza; el rival los presiona para que queden débiles.'},
  practica:{tipo:'casilla',fen:'r2q1rk1/pb2bppp/5n2/2pp4/8/1P3NP1/PB2PPBP/R2Q1RK1 w - - 0 12',casillas:['c5','d5'],
    di:'Toca los peones colgantes.',pista:'Dos peones vecinos sin peones al lado.',
    bien:'¡Bien! c5 y d5 son peones colgantes.'}
};

/* N6-002 · Ataque de minorías (estructura Carlsbad; material del estudio de Lichess
   «Carlsbad: estructura y las 4 etapas típicas de un ataque de minorías», partida Abramovich–Mark) */
L['N6-002']={
  tactica:false, motivo:'Ataque de minorías',
  objetivo:'Vas a aprender el ataque de minorías: atacar con menos peones para dejarle al rival un peón débil.',
  idea:'En el **ataque de minorías** atacas con **menos peones** una **cadena más grande**. El objetivo es **cambiar la estructura** rival y dejarle una **debilidad**: un peón **retrasado** o **aislado**.',
  descubre:{fen:'6k1/pp3ppp/2p5/3p4/3P4/4P3/PP3PPP/6K1 w - - 0 1',di:'Estructura **Carlsbad**. En el flanco de dama tienes 2 peones (a y b) y las negras 3 (a, b y c). ¿Se puede atacar con menos?'},
  observa:[
    {marcas:[['a2','clave'],['b2','clave'],['a7','clave'],['b7','clave'],['c6','clave']],di:'Sí: eso es el **ataque de minorías**. Tus 2 peones (la **minoría**) atacan a los 3 negros (la **mayoría**).',sencillo:'2 peones contra 3.'},
    {flechas:[['a2','a4','mov'],['b2','b4','mov']],di:'El plan: avanzar **a4** y **b4-b5** para chocar con el peón de **c6**.',sencillo:'Avanza a y b hasta b5.'},
    {fen:'6k1/pp3ppp/2p5/1P1p4/P2P4/4P3/5PPP/6K1 b - - 0 1',flechas:[['b5','c6','ataque']],marcas:[['c6','amenazada']],di:'El **objetivo** no es ganar un peón: es que las negras queden con un peón **débil**. Mira qué pasa según cómo respondan.',sencillo:'Buscas un peón débil.'},
    {fen:'6k1/p4ppp/2p5/3p4/3P4/4P3/P4PPP/2R3K1 w - - 0 1',flechas:[['c1','c6','ataque']],marcas:[['c6','clave'],['a7','clave']],di:'Si dejan el cambio (**bxc6 bxc6**): c6 queda **retrasado** en la columna c, a tiro de tu torre. Y a7 también es débil: dos debilidades.',sencillo:'c6 y a7 quedan débiles.'},
    {fen:'6k1/p4ppp/1pp5/3p4/1P1P4/4P3/P4PPP/2R3K1 w - - 0 1',flechas:[['c1','c6','ataque']],marcas:[['c6','clave']],di:'Si responden **…b6**: ese peón ya no protege c6, que queda **retrasado** en la columna c.',sencillo:'c6 queda sin apoyo.'},
    {fen:'6k1/p4ppp/2p5/1p1p4/1P1P4/3NP3/P4PPP/2R3K1 w - - 0 1',flechas:[['d3','c5','mov']],marcas:[['c6','clave'],['c5','clave']],di:'Si frenan con **…b5**: c6 sigue retrasado y **c5** ya no la defiende ningún peón: un puesto ideal para tu caballo.',sencillo:'c5 es para tu caballo.'},
    {fen:'6k1/pp3ppp/8/1p1p4/3P4/4P3/P4PPP/2R3K1 w - - 0 1',flechas:[['c1','c7','linea']],marcas:[['d5','clave']],di:'Si capturan **…cxb5**: el peón de **d5** queda **aislado** y tu torre entra por la columna c abierta.',sencillo:'d5 queda aislado.'},
    {fen:'6k1/pp3ppp/8/1Ppp4/3P4/4P3/P4PPP/2R3K1 w - - 0 1',flechas:[['d4','c5','mov']],di:'Si liberan con **…c5**, tú cambias con **dxc5**…',sencillo:'Cambias en c5.'},
    {jugada:'d4c5',marcas:[['d5','clave']],di:'…y **d5** se queda sin vecinos: otra vez un peón **aislado**.',sencillo:'d5 queda aislado.'},
    {fen:'r1bqkb1r/pp3ppp/2p2nn1/3p3N/1P1P4/P1N1P3/5PPP/R1BQKB1R w KQkq - 0 11',flechas:[['g2','g3','mov']],di:'Partida modelo: Abramovich–Mark. **Fase 1, prevenir:** 11.g3 frena el contraataque negro en el flanco de rey.',sencillo:'Fase 1: g3 previene.'},
    {fen:'r1bq1rk1/pp4pp/2pb2n1/3p1p1Q/1P1P4/P1N1P1P1/5PBP/R1B2RK1 w - - 0 15',flechas:[['b4','b5','mov']],marcas:[['c6','clave']],di:'**Fase 2, provocar:** 15.b5 choca con c6. Las negras deben elegir qué debilidad aceptar.',sencillo:'Fase 2: b5.'},
    {fen:'r2q1rkn/p5pp/2pbb3/3p1p2/3P4/P1N1P1P1/5PBP/R1BQ1RK1 w - - 0 18',flechas:[['c3','a4','mov']],marcas:[['c6','clave'],['c5','clave']],di:'Tras bxc6 bxc6, c6 es un peón **retrasado**. **Fase 3, fijarlo:** el caballo va a a4 y luego a c5.',sencillo:'Fase 3: el caballo a c5.'},
    {fen:'1rr3k1/p3qnpp/2pbb3/3p1p2/N2P4/P1B1P1P1/2Q2PBP/R4RK1 w - - 8 22',flechas:[['c3','b4','mov'],['d6','c5','defensa']],di:'El alfil va a **b4** para cambiarse por el alfil negro que defiende **c5**.',sencillo:'Cambia el defensor de c5.'},
    {fen:'2r3k1/p5pp/2pnq3/3p1p2/1r1P4/4P1P1/2Q2PBP/R4RK1 w - - 0 26',flechas:[['a1','a7','mov']],marcas:[['c6','clave']],di:'**Fase 4, atacar:** tus torres entran (26.Txa7) y c6 sigue débil hasta el final. Ganaron las blancas.',sencillo:'Fase 4: atacar con las torres.'}
  ],
  comprende:{di:'Ataque de minorías: avanza tu minoría contra la cadena rival, deja un peón **retrasado** o **aislado**, **fíjalo** con tus piezas y **atácalo** con las torres.'},
  practica:{fen:'r1bq1rk1/pp4pp/2pb2n1/3p1p1Q/1P1P4/P1N1P1P1/5PBP/R1B2RK1 w - - 0 15',linea:['b4b5'],concepto:true,objetivoEquilibrio:true,
    di:'Abramovich–Mark. Ya jugaste g3. Empieza el ataque de minorías.',pistas:['El peón de b4 avanza contra c6.'],
    mal:{'*':'El plan es b5, contra el peón de c6.'},
    bien:'¡Bien! 15.b5: las negras tendrán que aceptar una debilidad.'},
  hazlo:{fen:'r2q1rkn/p5pp/2pbb3/3p1p2/3P4/P1N1P1P1/5PBP/R1BQ1RK1 w - - 0 18',linea:['c3a4'],concepto:true,objetivoEquilibrio:true,
    di:'Ya hay un peón retrasado en c6. Lleva el caballo camino de c5.',pistas:['Desde c3, el caballo pasa por a4.'],
    mal:{'*':'El caballo de c3 va a a4 para llegar a c5.'},
    bien:'¡Correcto! 18.Ca4 y luego Cc5.'},
  comprueba:{fen:'r2r2k1/pp2qpbp/2p3p1/3p4/PP1P4/2RNP1P1/1Q3P1P/2R3K1 w - - 0 1',linea:['b4b5'],concepto:true,objetivoEquilibrio:true,
    di:'Torres en la columna c y peones en a4 y b4. Todo está listo: haz la ruptura.',pistas:['Un peón choca con c6.'],
    mal:{'*':'La ruptura del ataque de minorías es b5.'},
    bien:'¡Bien! b5: c6 quedará débil en la columna c.'},
  extra:[
    {tipo:'casilla',fen:'6k1/p4ppp/2p5/3p4/3P4/4P3/P4PPP/2R3K1 w - - 0 1',casillas:['c6','a7'],
      di:'Tras bxc6 bxc6, toca las dos debilidades negras.',pista:'Una está en la columna c y otra en la columna a.',
      bien:'¡Bien! c6 retrasado y a7 aislado.'},
    {fen:'1rr3k1/p3qnpp/2pbb3/3p1p2/N2P4/P1B1P1P1/2Q2PBP/R4RK1 w - - 8 22',linea:['c3b4'],concepto:true,objetivoEquilibrio:true,
      di:'Cambia el alfil negro que defiende la casilla c5.',pistas:['Tu alfil de c3 puede ofrecer el cambio.'],
      mal:{'*':'Ab4: cambia el defensor de c5.'},
      bien:'¡Bien! Sin ese alfil, c5 será de tu caballo.'},
    {fen:'2r3k1/p3qnpp/2p1b3/3p1p2/Nr1P4/4P1P1/2Q2PBP/R4RK1 w - - 0 24',linea:['a4c5'],concepto:true,
      di:'Instala el caballo en el puesto fuerte.',pistas:['La casilla c5 ya no la defiende ningún peón ni alfil negro.'],
      mal:{'*':'El caballo de a4 va a c5.'},
      bien:'¡Bien! El caballo en c5 domina el flanco de dama.'},
    {fen:'2r3k1/p3q1pp/2pnb3/2Np1p2/1r1P4/4P1P1/2Q2PBP/R4RK1 w - - 2 25',linea:['c5e6'],concepto:true,
      di:'Cambia el caballo para abrir paso a tus torres. c6 seguirá débil.',pistas:['El caballo de c5 puede capturar un alfil.'],
      mal:{'*':'Cxe6: tras el cambio, tus torres se activan.'},
      bien:'¡Bien! Ahora tus torres entran por la columna a.'},
    {fen:'2r3k1/p5pp/2pnq3/3p1p2/1r1P4/4P1P1/2Q2PBP/R4RK1 w - - 0 26',linea:['a1a7'],concepto:true,
      di:'Tu torre puede entrar. Gana material.',pistas:['La columna a está abierta.'],
      mal:{'*':'Txa7: la torre entra y gana un peón.'},
      bien:'¡Bien! 26.Txa7.'},
    {fen:'r1r3k1/p3qnpp/2p1b3/3p1p2/N2P4/b1B1P1P1/2Q2PBP/R4RK1 w - - 0 22',linea:['a1a3','e7a3','a4c5'],concepto:true,
      di:'Las negras capturaron en a3. Castiga ese error.',pistas:['Txa3 y, si la dama captura, tu caballo la encierra.'],
      mal:{'*':'Txa3 Dxa3 y Cc5: la dama queda atrapada.'},
      bien:'¡Bien! Tras Cc5, Ta1 atrapa a la dama.'},
    {fen:'r4rk1/pp3ppp/2nqpn2/3p4/3P2b1/1QPB1N2/PP1N1PPP/4RRK1 b - - 3 12',linea:['a8b8'],acepta:{0:['f8b8']},concepto:true,objetivoEquilibrio:true,
      di:'Caro-Kann del cambio: aquí las **negras** hacen el ataque de minorías. Prepara …b5.',pistas:['Una torre en la columna b apoya el avance del peón.'],
      mal:{'*':'Prepara …b5 llevando una torre a b8.'},
      bien:'¡Bien! Luego …b5-b4 contra c3.'}
  ]
};

/* N6-003 · Base de la cadena */
L['N6-003']={
  tactica:false, motivo:'Base de la cadena',
  objetivo:'Vas a aprender a atacar la base de una cadena de peones.',
  idea:'Una cadena se ataca por su **base**: el peón de más atrás. En la Caro-Kann del avance, las negras golpean d4 con **…c5**.',
  descubre:{fen:'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5',di:'Caro-Kann, variante del avance. ¿Qué peón blanco sostiene la cadena?'},
  observa:[
    {flechas:[['d4','e5','defensa']],marcas:[['d4','clave']],di:'d4 sostiene e5: es la base.',sencillo:'d4 es la base.'},
    {jugada:'c6c5',flechas:[['c5','d4','ataque']],di:'…c5: atacas la base. Si cae, e5 queda sin apoyo.',sencillo:'Golpeas la base.'}
  ],
  comprende:{di:'No empujes contra la punta: ataca la base de la cadena.'},
  practica:{fen:'rn1qkbnr/pp3ppp/2p1p3/3pPb2/3P4/5N2/PPP1BPPP/RNBQK2R b KQkq - 1 5',linea:['c6c5'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Ataca la base de la cadena blanca.',pistas:['El peón de c6 puede atacar d4.'],
    mal:{'*':'Ataca la base con …c5.'},
    bien:'¡Bien! …c5 es el plan típico.'}
};

/* N6-004 · Casillas de un color */
L['N6-004']={
  tactica:false, motivo:'Casillas débiles de un color',
  objetivo:'Vas a reconocer las casillas débiles de un color alrededor del rey.',
  idea:'Si un bando pierde el alfil de un color y sus peones están en casillas del **otro** color, las casillas del color del alfil perdido quedan **débiles** y sin defensa.',
  descubre:{fen:'r2q1rk1/pp1bpp1p/2np2p1/8/3NP3/2N1B3/PPPQ1PPP/R3K2R w KQ - 0 10',di:'Las negras ya no tienen el alfil de casillas oscuras. ¿Qué casillas cerca de su rey quedan débiles?'},
  observa:[
    {marcas:[['f6','clave'],['h6','clave']],di:'f6 y h6 son oscuras y ningún peón ni alfil negro las defiende.',sencillo:'Casillas oscuras sin defensa.'},
    {flechas:[['e3','h6','linea']],di:'Tu alfil de e3 y tu dama pueden instalarse en h6.',sencillo:'Tus piezas entran por ahí.'}
  ],
  comprende:{di:'Sin el alfil de un color, las casillas de ese color se vuelven agujeros: ocúpalas con tus piezas.'},
  practica:{tipo:'casilla',fen:'r2q1rk1/pp1bpp1p/2np2p1/8/3NP3/2N1B3/PPPQ1PPP/R3K2R w KQ - 0 10',casillas:['f6','h6'],
    di:'Toca las casillas oscuras débiles junto al enroque negro.',pista:'Están en las columnas f y h, en la sexta fila.',
    bien:'¡Bien! f6 y h6 son las casillas débiles.'}
};

/* N6-005 · Alfiles opuestos y ataque */
L['N6-005']={
  tactica:false, motivo:'Alfiles de distinto color',
  objetivo:'Vas a aprender que con alfiles de distinto color el atacante tiene ventaja.',
  idea:'En el medio juego, con **alfiles de distinto color** el atacante suele jugar con una pieza de más: el alfil rival **no puede defender** las casillas de tu color.',
  descubre:{fen:'5rk1/pp3ppp/8/4b3/8/1B6/PP2QPPP/6K1 w - - 0 1',di:'Tu alfil va por casillas claras; el negro, por oscuras. ¿Quién defiende f7?'},
  observa:[
    {flechas:[['b3','f7','linea']],marcas:[['f7','clave']],di:'Tu alfil apunta a f7, una casilla clara.',sencillo:'Tu alfil ataca f7.'},
    {marcas:[['e5','clave']],di:'El alfil negro solo pisa casillas oscuras: nunca podrá defender f7 ni h7.',sencillo:'El otro alfil no ayuda.'}
  ],
  comprende:{di:'Con alfiles de distinto color, ataca las casillas de tu alfil: el rival no tiene con qué defenderlas.'},
  practica:{tipo:'casilla',fen:'5rk1/pp3ppp/8/4b3/8/1B6/PP2QPPP/6K1 w - - 0 1',casillas:['f7','h7'],
    di:'Toca las casillas claras junto al rey negro que el alfil negro no puede defender.',pista:'En la séptima fila, cerca del rey.',
    bien:'¡Bien! f7 y h7 son tus objetivos.'}
};

/* N6-006 · Impedir las rupturas */
L['N6-006']={
  tactica:false, motivo:'Profilaxis',
  objetivo:'Vas a aprender a impedir la ruptura de peones del rival.',
  idea:'Las **rupturas** liberan el juego del rival. Si **ocupas** o **controlas** la casilla de la ruptura, su plan se detiene.',
  descubre:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',di:'Sistema Londres. Las negras quieren liberarse con …e5. ¿Cómo lo impides?'},
  observa:[
    {flechas:[['e6','e5','mov']],marcas:[['e5','clave']],di:'La ruptura negra es …e5.',sencillo:'Quieren jugar …e5.'},
    {jugada:'f3e5',marcas:[['e5','clave']],di:'Ce5: ocupas la casilla de la ruptura. Ya no pueden jugar …e5.',sencillo:'Ocupas e5.'}
  ],
  comprende:{di:'Identifica la ruptura del rival y ocupa o controla esa casilla antes de que la juegue.'},
  practica:{tipo:'casilla',fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',casillas:['e5'],
    di:'Toca la casilla de la ruptura negra.',pista:'El peón de e6 quiere avanzar.',
    bien:'¡Bien! Ocupando e5 frenas su plan.'},
  hazlo:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',linea:['f3e5'],concepto:true,objetivoEquilibrio:true,
    di:'Impide la ruptura …e5.',pistas:['Ocupa e5 con una pieza.'],
    mal:{'*':'Ocupa e5 con el caballo.'},
    bien:'¡Correcto! El caballo en e5 frena la ruptura.'}
};

/* N6-007 · Las dos debilidades */
L['N6-007']={
  tactica:false, motivo:'Dos debilidades',
  objetivo:'Vas a aprender el principio de las dos debilidades.',
  idea:'Una sola debilidad se puede defender. Con **dos debilidades** lejos una de otra, el defensor no llega a todo: atacas una y luego la otra.',
  descubre:{fen:'8/6pp/p4k2/4p3/8/1P3K2/P5PP/8 w - - 0 1',di:'¿Qué peones negros están aislados y son débiles?'},
  observa:[
    {marcas:[['a6','clave'],['e5','clave']],di:'a6 y e5 están aislados: dos debilidades separadas.',sencillo:'Dos peones débiles.'},
    {flechas:[['f3','e4','mov']],di:'Tu rey presiona e5; cuando el rey negro lo defienda, atacarás a6.',sencillo:'Atacas una y luego la otra.'}
  ],
  comprende:{di:'Crea o encuentra dos debilidades y alterna el ataque: el defensor no puede cubrir las dos.'},
  practica:{tipo:'casilla',fen:'8/6pp/p4k2/4p3/8/1P3K2/P5PP/8 w - - 0 1',casillas:['a6','e5'],
    di:'Toca las dos debilidades negras.',pista:'Peones sin peones vecinos.',
    bien:'¡Bien! Dos debilidades, lejos una de otra.'}
};

/* N6-008 · Planes en etapas */
L['N6-008']={
  tactica:false, motivo:'Plan',
  objetivo:'Vas a aprender a dividir un plan en etapas.',
  idea:'Un buen plan tiene **etapas**: primero desarrollo y seguridad del rey, después la colocación de piezas y, al final, la **ruptura** que abre el juego.',
  descubre:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QK2R w KQ - 0 9',di:'Sistema Londres: casi todo desarrollado. ¿Cuál es la siguiente etapa?'},
  observa:[
    {marcas:[['e3','clave']],di:'Tus piezas ya apuntan al centro y al enroque negro.',sencillo:'Las piezas están listas.'},
    {jugada:'e3e4',flechas:[['e4','d5','ataque']],di:'e4: la ruptura central abre líneas para tus piezas.',sencillo:'Rompes en el centro.'}
  ],
  comprende:{di:'Etapa 1: desarrollo y rey seguro. Etapa 2: piezas a buenas casillas. Etapa 3: la ruptura.'},
  practica:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QK2R w KQ - 0 9',linea:['e3e4'],concepto:true,objetivoEquilibrio:true,
    di:'Pasa a la etapa de la ruptura.',pistas:['El peón de e3 avanza dos casillas.'],
    mal:{'*':'Rompe en el centro con e4.'},
    bien:'¡Bien! La ruptura e4 abre el juego.'}
};

/* N6-009 · Transformar ventajas */
L['N6-009']={
  tactica:false, motivo:'Ruptura de peones',
  objetivo:'Vas a aprender a transformar una ventaja de espacio en un peón que corona.',
  idea:'Una ventaja se **transforma** en otra: más espacio puede convertirse en un **peón pasado** con una ruptura. Tres peones contra tres pueden coronar con un sacrificio.',
  descubre:{fen:'8/ppp5/8/PPP5/8/8/5k2/7K w - - 0 1',di:'Tus peones están más avanzados y el rey negro está lejos. ¿Cómo creas un peón pasado?'},
  observa:[
    {jugada:'b5b6',di:'b6!: si …axb6, c6; si …cxb6, a6.',sencillo:'El peón del centro se sacrifica.'},
    {jugada:'a7b6',di:'…axb6',sencillo:'Las negras capturan.'},
    {jugada:'c5c6',di:'c6!',sencillo:'Otro sacrificio.'},
    {jugada:'b7c6',di:'…bxc6',sencillo:'Captura otra vez.'},
    {jugada:'a5a6',di:'a6: el peón corona sin que nadie lo detenga.',sencillo:'¡Peón pasado!'}
  ],
  comprende:{di:'Una ventaja de espacio se transforma en un peón pasado con la ruptura adecuada.'},
  practica:{fen:'8/ppp5/8/PPP5/8/8/5k2/7K w - - 0 1',linea:['b5b6','a7b6','c5c6','b7c6','a5a6'],
    di:'Crea un peón pasado con una ruptura.',pistas:['Empieza con el peón del medio.'],
    bien:'¡Bien! b6, c6 y a6: el peón corona.'}
};

/* N6-010 · Calidad posicional */
L['N6-010']={
  tactica:false, motivo:'Sacrificio de calidad',
  objetivo:'Vas a aprender cuándo dar una torre por una pieza menor muy fuerte.',
  idea:'Un **sacrificio posicional de calidad** entrega una torre por un caballo o alfil **dominante**. No busca un mate: busca que tus piezas menores manden.',
  descubre:{fen:'2r2rk1/pp3ppp/3p4/3N4/4P3/8/PPP2PPP/2KR3R b - - 0 1',di:'El caballo blanco de d5 domina el centro. ¿Qué pieza negra podría quitarlo?'},
  observa:[
    {marcas:[['d5','clave']],di:'El caballo de d5 no puede ser expulsado por ningún peón.',sencillo:'El caballo está muy fuerte.'},
    {flechas:[['c8','c2','linea']],di:'Las torres negras pueden ganar actividad; a veces una de ellas se cambia por ese caballo.',sencillo:'Una torre por el caballo.'}
  ],
  comprende:{di:'Cuando una pieza menor rival domina, entregar la calidad por ella puede ser la mejor decisión.'},
  practica:{tipo:'casilla',fen:'2r2rk1/pp3ppp/3p4/3N4/4P3/8/PPP2PPP/2KR3R b - - 0 1',casillas:['d5'],
    di:'Toca la pieza blanca dominante.',pista:'Está en el centro y ningún peón negro la puede echar.',
    bien:'¡Bien! El caballo de d5 es la pieza clave.'}
};

/* N6-011 · Sacrificio a largo plazo */
L['N6-011']={
  tactica:true, motivo:'Sacrificio posicional',
  objetivo:'Vas a aprender sacrificios cuyo premio llega más tarde.',
  idea:'En un **sacrificio a largo plazo** no hay mate inmediato: entregas material para **abrir líneas** y dejar al rey rival sin defensa durante muchas jugadas.',
  descubre:{fen:'1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/R3R1K1 w - - 1 19',di:'Anderssen contra Dufresne, 1852 («la Siempreviva»). Anderssen entregó un caballo en f6. ¿Qué consiguió a cambio?'},
  observa:[
    {marcas:[['f6','clave'],['e7','clave']],di:'El peón de f6 encierra al caballo de e7 y al rey negro.',sencillo:'El peón de f6 estorba a las negras.'},
    {flechas:[['e1','e7','ataque'],['a3','e7','ataque']],di:'La columna e está abierta y el alfil de a3 apunta a e7.',sencillo:'Tus piezas apuntan a e7.'}
  ],
  comprende:{di:'Un sacrificio a largo plazo se justifica por las líneas abiertas y las piezas rivales encerradas.'},
  practica:{tipo:'casilla',fen:'1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/R3R1K1 w - - 1 19',casillas:['e1','a3'],
    di:'Toca tus piezas que atacan el caballo de e7.',pista:'Una torre y un alfil.',
    bien:'¡Bien! Esa presión es la compensación del sacrificio.'}
};

/* N6-012 · Evaluar la posición */
L['N6-012']={
  tactica:false, motivo:'Evaluación',
  objetivo:'Vas a aprender a evaluar una posición antes de elegir un plan.',
  idea:'Para **evaluar**: cuenta material, mira la seguridad de los reyes, las piezas **sin defensa** y la actividad. Después, elige el plan.',
  descubre:{fen:SIEMPRE,di:'La Siempreviva, jugada 20. Antes de calcular, evalúa: ¿qué piezas negras están sin defensa?'},
  observa:[
    {marcas:[['e8','clave'],['e7','clave']],di:'El rey negro sigue en el centro y el caballo de e7 está atado.',sencillo:'El rey negro está expuesto.'},
    {flechas:[['e1','e7','ataque'],['a3','e7','ataque']],di:'Dos piezas blancas atacan e7.',sencillo:'e7 está muy atacada.'}
  ],
  comprende:{di:'Evaluar primero te dice dónde buscar la combinación.'},
  practica:{tipo:'casilla',fen:SIEMPRE,casillas:['f3','h7'],verificar:'indefensas:b',
    di:'Toca las piezas negras sin ninguna defensa.',pista:'Mira qué piezas negras no protege nadie.',
    bien:'¡Bien! Esas piezas son blancos fáciles.'}
};

/* N6-013 · Calcular sin forzar */
L['N6-013']={
  tactica:false, motivo:'Cálculo',
  objetivo:'Vas a aprender a calcular cuando no hay jugadas forzadas.',
  idea:'Si no hay jaques ni capturas útiles, calcula las **jugadas tranquilas** que mejoran tu posición y piensa qué responderá el rival.',
  descubre:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',di:'Sistema Londres. No hay jaques ni capturas. ¿Qué piezas pueden dar jaque?'},
  observa:[
    {di:'Ninguna jugada blanca da jaque: hay que calcular jugadas tranquilas.',sencillo:'No hay jaques.'},
    {jugada:'b1d2',di:'Cbd2: una jugada tranquila que mejora la peor pieza.',sencillo:'Mejoras una pieza.'}
  ],
  comprende:{di:'Sin jugadas forzadas, compara las tranquilas: ¿cuál mejora tu peor pieza sin dar nada al rival?'},
  practica:{fen:'r1bq1rk1/p4ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP3PPP/RN1Q1RK1 w - - 0 9',linea:['b1d2'],concepto:true,objetivoEquilibrio:true,
    di:'Elige una jugada tranquila útil.',pistas:['Tu caballo de b1 no ha salido.'],
    mal:{'*':'Mejora tu peor pieza: el caballo de b1.'},
    bien:'¡Bien! Cálculo tranquilo y una pieza más en juego.'}
};

/* N6-014 · Comparar variantes */
L['N6-014']={
  tactica:true, motivo:'Cálculo',
  objetivo:'Vas a aprender a comparar las capturas posibles antes de elegir.',
  idea:'Cuando tienes varias capturas, **compáralas** una por una: qué responde el rival y cómo queda la posición al final.',
  descubre:{fen:SIEMPRE,di:'La Siempreviva, jugada 20. La dama negra acaba de capturar en f3. ¿Recapturas o hay algo mejor?'},
  observa:[
    {flechas:[['g2','f3','ataque'],['e1','e7','ataque']],di:'Puedes recapturar con gxf3, pero también capturar en e7 con jaque.',sencillo:'Dos capturas posibles.'},
    {jugada:'e1e7',marcas:[['e8','jaque']],di:'Txe7+!: la captura con jaque es mucho más fuerte que gxf3.',sencillo:'Captura con jaque.'}
  ],
  comprende:{di:'Entre varias capturas, prefiere la que obliga al rival (jaque) y compara el final de cada línea.'},
  practica:{tipo:'casilla',fen:SIEMPRE,casillas:['a3','a4','d3','e1','f6'],verificar:'pueden-capturar:w',
    di:'Toca las piezas blancas que pueden capturar.',pista:'Revisa dama, alfiles, torres y peones.',
    bien:'¡Bien! Esas son las capturas a comparar.'},
  hazlo:{fen:SIEMPRE,linea:['e1e7'],
    di:'Elige la mejor captura.',pistas:['La que da jaque.'],
    bien:'¡Correcto! Txe7+ empieza la combinación.'}
};

/* N6-015 · La silenciosa del rival */
L['N6-015']={
  tactica:false, motivo:'Amenaza del rival',
  objetivo:'Vas a aprender a ver las amenazas silenciosas del rival.',
  idea:'Las jugadas tranquilas del rival también amenazan. Después de cada jugada suya pregúntate: **¿qué quiere hacer ahora?**',
  descubre:{fen:'rr4k1/5p1p/5PpQ/8/8/7P/5PP1/6K1 b - - 1 1',di:'Juegas con negras. Las blancas acaban de jugar Dh6 sin dar jaque. ¿Qué amenazan?'},
  observa:[
    {flechas:[['h6','g7','amenaza']],marcas:[['g7','clave']],di:'Amenazan Dg7#, protegida por el peón de f6.',sencillo:'Amenazan mate en g7.'}
  ],
  comprende:{di:'Una jugada sin jaque puede esconder una amenaza de mate: busca siempre la idea del rival.'},
  practica:{tipo:'casilla',fen:'rr4k1/5p1p/5PpQ/8/8/7P/5PP1/6K1 b - - 1 1',casillas:['g7'],
    di:'Toca la casilla donde las blancas amenazan mate.',pista:'Junto a tu rey, protegida por el peón de f6.',
    bien:'¡Bien! Dg7# es la amenaza.'}
};

/* N6-016 · Combinaciones largas */
L['N6-016']={
  tactica:true, motivo:'Combinación',
  objetivo:'Vas a calcular una combinación larga hasta el mate.',
  idea:'Las **combinaciones largas** encadenan sacrificios con jaque. Cada jaque deja pocas respuestas, y eso permite calcular hasta el final.',
  descubre:{fen:SIEMPRE,di:'La Siempreviva (Anderssen, 1852). Las negras amenazan mate en g2. ¿Tienes algo más rápido?'},
  observa:[
    {jugada:'e1e7',marcas:[['e8','jaque']],di:'20.Txe7+!',sencillo:'Torre con jaque.'},
    {jugada:'c6e7',di:'20…Cxe7 (…Rd8 resistía más).',sencillo:'El caballo captura.'},
    {jugada:'a4d7',marcas:[['e8','jaque']],di:'21.Dxd7+!!: la dama se sacrifica.',sencillo:'¡La dama se entrega!'},
    {jugada:'e8d7',di:'21…Rxd7',sencillo:'El rey captura.'},
    {jugada:'d3f5',marcas:[['d7','jaque']],di:'22.Af5+: jaque doble.',sencillo:'Jaque doble.'},
    {jugada:'d7e8',di:'22…Re8',sencillo:'El rey vuelve.'},
    {jugada:'f5d7',marcas:[['e8','jaque']],di:'23.Ad7+',sencillo:'Otro jaque.'},
    {jugada:'e8f8',di:'23…Rf8',sencillo:'El rey huye.'},
    {jugada:'a3e7',marcas:[['f8','jaque']],di:'24.Axe7#: ¡mate!',sencillo:'¡Mate!'}
  ],
  comprende:{di:'En una combinación larga, cada jaque limita al rival: así se puede calcular hasta el mate.'},
  practica:{fen:SIEMPRE,linea:['e1e7','c6e7','a4d7','e8d7','d3f5','d7e8','f5d7','e8f8','a3e7'],meta:'mate',
    di:'Repite la combinación de Anderssen.',pistas:['Empieza con la torre en e7.','Después, la dama se sacrifica en d7.'],
    bien:'¡Brillante! La Siempreviva.'}
};

/* N6-017 · Redes de mate complejas */
L['N6-017']={
  tactica:true, motivo:'Red de mate',
  objetivo:'Vas a aprender a ver todas las casillas de huida del rey antes del mate.',
  idea:'Una **red de mate** cubre todas las casillas del rey. Antes del último jaque, comprueba **cada casilla** a su alrededor.',
  descubre:{fen:'1r3kr1/pbpBnp1p/1b3P2/8/8/B1P2q2/P4PPP/3R2K1 w - - 4 24',di:'Final de la Siempreviva. El rey negro está en f8. ¿Adónde podría ir?'},
  observa:[
    {marcas:[['e8','clave'],['g7','clave']],flechas:[['d7','e8','ataque'],['f6','g7','ataque']],di:'El alfil de d7 cubre e8 y el peón de f6 cubre g7.',sencillo:'Las salidas están cubiertas.'},
    {jugada:'a3e7',marcas:[['f8','jaque']],di:'Axe7#: el último jaque; la red está completa.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'Antes del jaque final, repasa una por una las casillas del rey.'},
  practica:{tipo:'casilla',fen:'1r3kr1/pbpBnp1p/1b3P2/8/8/B1P2q2/P4PPP/3R2K1 w - - 4 24',casillas:['d7','f6'],
    di:'Toca las dos piezas blancas que cierran las salidas del rey.',pista:'Una cubre e8 y la otra g7.',
    bien:'¡Bien! El alfil y el peón tejen la red.'},
  hazlo:{fen:'1r3kr1/pbpBnp1p/1b3P2/8/8/B1P2q2/P4PPP/3R2K1 w - - 4 24',linea:['a3e7'],meta:'mate',
    di:'Mate en una.',pistas:['El alfil de a3 llega a e7.'],
    bien:'¡Mate! Axe7#.'}
};

/* N6-018 · Ataque al rey: síntesis */
L['N6-018']={
  tactica:true, motivo:'Ataque al rey',
  objetivo:'Vas a repasar los elementos de un ataque al rey: piezas, líneas y sacrificio.',
  idea:'Un ataque al rey reúne **más piezas** que las defensoras, **líneas abiertas** y, a menudo, un **sacrificio** que rompe la defensa.',
  descubre:{fen:'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 6 11',di:'Lasker contra Thomas, 1912. Cuenta: ¿cuántas piezas blancas apuntan al rey negro?'},
  observa:[
    {flechas:[['h5','h7','ataque'],['d3','h7','linea'],['e4','f6','ataque'],['e5','g4','mov']],di:'Dama, alfil y dos caballos apuntan al enroque.',sencillo:'Cuatro piezas atacan.'},
    {jugada:'h5h7',marcas:[['g8','jaque']],di:'Dxh7+!!: el sacrificio que rompe la defensa.',sencillo:'¡Sacrificio de dama!'}
  ],
  comprende:{di:'Más atacantes que defensores, líneas abiertas y un sacrificio en el momento justo: así se gana un ataque.'},
  practica:{tipo:'casilla',fen:'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 6 11',casillas:['e4','e5','h5'],verificar:'pueden-capturar:w',
    di:'Toca las piezas blancas que pueden capturar.',pista:'Mira qué piezas negras están al alcance.',
    bien:'¡Bien! Entre ellas está el sacrificio decisivo.'},
  hazlo:{fen:'rn3rk1/pbppq1pp/1p2pb2/4N2Q/3PN3/3B4/PPP2PPP/R3K2R w KQ - 6 11',linea:['h5h7'],
    di:'Rompe la defensa con un sacrificio.',pistas:['La dama puede capturar en h7 con jaque.'],
    bien:'¡Correcto! Dxh7+!! y el rey es arrastrado hasta el mate.'}
};

/* N6-019 · Defensa tenaz */
L['N6-019']={
  tactica:false, motivo:'Jaque perpetuo',
  objetivo:'Vas a aprender a salvar una posición perdida con jaques continuos.',
  idea:'Si vas perdiendo, busca un **jaque perpetuo**: jaques que el rival no puede evitar. La partida termina en **tablas**.',
  descubre:{fen:'6k1/R4ppp/8/8/8/6P1/3q1P1K/Q7 b - - 0 1',di:'Juegas con negras y tienes una torre menos. ¿Puedes salvarte?'},
  observa:[
    {flechas:[['d2','f2','ataque']],di:'…Dxf2+: el rey blanco no tiene dónde esconderse.',sencillo:'Empiezan los jaques.'},
    {jugada:'d2f2',marcas:[['h2','jaque']],di:'…Dxf2+',sencillo:'Jaque.'},
    {jugada:'h2h3',di:'Rh3',sencillo:'El rey se aparta.'},
    {jugada:'f2f5',marcas:[['h3','jaque']],di:'…Df5+: los jaques no se acaban. Tablas.',sencillo:'Jaque perpetuo.'}
  ],
  comprende:{di:'Con desventaja, busca jaques continuos contra un rey desprotegido.'},
  practica:{fen:'6k1/R4ppp/8/8/8/6P1/3q1P1K/Q7 b - - 0 1',linea:['d2f2','h2h3','f2f5'],objetivoEquilibrio:true,
    di:'Juegas con negras. Salva la partida.',pistas:['Empieza capturando en f2 con jaque.'],
    bien:'¡Bien! Jaque perpetuo: tablas.'}
};

/* N6-020 · Fortalezas */
L['N6-020']={
  tactica:false, motivo:'Fortaleza',
  objetivo:'Vas a aprender a construir una fortaleza con el rey.',
  idea:'Una **fortaleza** es una posición que el rival no puede romper aunque tenga más material. Ejemplo: alfil del **color equivocado** y peón de torre: si el rey defensor llega a la esquina, son tablas.',
  descubre:{fen:'8/5k2/8/7P/5K2/8/4B3/8 b - - 0 1',di:'Juegas con negras. El peón de h coronará en h8, una casilla oscura, y el alfil blanco es de casillas claras.'},
  observa:[
    {marcas:[['h8','clave']],di:'El alfil blanco nunca podrá echar a tu rey de h8.',sencillo:'h8 es tu refugio.'},
    {jugada:'f7g7',flechas:[['g7','h8','mov']],di:'…Rg7: el rey se acerca a la esquina. Es tablas.',sencillo:'El rey va a la esquina.'}
  ],
  comprende:{di:'Con peón de torre y alfil que no controla la casilla de coronación, el rey en la esquina hace tablas.'},
  practica:{tipo:'casilla',fen:'8/5k2/8/7P/5K2/8/4B3/8 b - - 0 1',casillas:['h8'],
    di:'Toca la casilla donde tu rey estará a salvo.',pista:'La casilla de coronación del peón.',
    bien:'¡Bien! Con el rey en h8, tablas.'}
};

/* N6-021 · Ahogado y perpetuo */
L['N6-021']={
  tactica:false, motivo:'Ahogado',
  objetivo:'Vas a aprender a buscar el ahogado cuando todo parece perdido.',
  idea:'Si tu rey **no tiene jugadas**, entrega tus otras piezas: si el rival las captura y no das jaque, es **ahogado** y la partida es tablas.',
  descubre:{fen:'k7/2Q5/8/3q4/8/8/7K/8 b - - 0 1',di:'Juegas con negras. Tu rey no puede moverse. ¿Qué pasaría si te quedaras sin dama?'},
  observa:[
    {marcas:[['a8','clave']],di:'El rey negro no tiene casillas: la dama blanca las cubre todas.',sencillo:'Tu rey no puede moverse.'},
    {jugada:'d5g2',marcas:[['h2','jaque']],di:'…Dg2+!: el rey blanco debe capturarla.',sencillo:'Entregas la dama.'},
    {jugada:'h2g2',di:'Rxg2: ahogado. ¡Tablas!',sencillo:'¡Ahogado!'}
  ],
  comprende:{di:'Con el rey sin jugadas, entregar las piezas que quedan puede salvar la partida.'},
  practica:{fen:'k7/2Q5/8/3q4/8/8/7K/8 b - - 0 1',linea:['d5g2'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Salva la partida con el ahogado.',pistas:['Entrega la dama con jaque junto al rey blanco.'],
    mal:{'*':'Busca …Dg2+: si la capturan, es ahogado.'},
    bien:'¡Bien! Rxg2 y ahogado.'}
};

/* N6-022 · Mate de alfil y caballo */
L['N6-022']={
  tactica:false, motivo:'Mate de alfil y caballo',
  objetivo:'Vas a conocer el final del mate con alfil y caballo.',
  idea:'Con **alfil y caballo** el mate solo se da en una esquina del **color del alfil**. El rey, el caballo y el alfil cierran juntos las salidas.',
  descubre:{fen:'k7/3N4/1K6/8/B7/8/8/8 w - - 0 1',di:'El rey negro está en a8, esquina clara, del color de tu alfil. ¿Qué casillas le quedan?'},
  observa:[
    {marcas:[['a7','clave'],['b7','clave'],['b8','clave']],di:'Tu rey cubre a7 y b7; el caballo de d7 cubre b8.',sencillo:'Todas las salidas cubiertas.'},
    {jugada:'a4c6',marcas:[['a8','jaque']],di:'Ac6#: el alfil da el jaque final.',sencillo:'¡Mate!'}
  ],
  comprende:{di:'El mate de alfil y caballo llega en la esquina del color del alfil.'},
  practica:{fen:'k7/3N4/1K6/8/B7/8/8/8 w - - 0 1',linea:['a4c6'],meta:'mate',
    di:'Mate en una.',pistas:['El alfil da jaque por la diagonal larga.'],
    bien:'¡Mate con alfil y caballo!'}
};

/* N6-023 · Casillas correspondientes */
L['N6-023']={
  tactica:false, motivo:'Casillas correspondientes',
  objetivo:'Vas a aprender que ciertas casillas de los dos reyes se corresponden.',
  idea:'En los finales de peones hay **casillas correspondientes**: si tu rey está en una y el rival en su pareja, quien mueve pierde. Llega a la tuya **cuando le toque mover a él**.',
  descubre:{fen:'8/8/8/4p3/2K1Pk2/8/8/8 w - - 0 1',di:'Cada rey quiere atacar el peón rival. ¿Adónde va tu rey?'},
  observa:[
    {marcas:[['d5','clave'],['f4','clave']],di:'d5 (para ti) y f4 (para el negro) son casillas correspondientes.',sencillo:'Dos casillas pareja.'},
    {jugada:'c4d5',di:'Rd5: ahora juegan las negras y tienen que soltar su peón.',sencillo:'Llegas a tu casilla.'}
  ],
  comprende:{di:'Aprende qué casilla corresponde a cada una del rival: llega a ella cuando le toque mover al otro.'},
  practica:{fen:'8/8/8/4p3/2K1Pk2/8/8/8 w - - 0 1',linea:['c4d5'],
    di:'Ocupa la casilla correspondiente.',pistas:['Ataca el peón de e5.'],
    bien:'¡Bien! Las negras están en zugzwang.'}
};

/* N6-024 · Torres: defensa lateral */
L['N6-024']={
  tactica:false, motivo:'Defensa lateral',
  objetivo:'Vas a aprender a defender un final de torres con jaques laterales.',
  idea:'Si el rey rival y su peón avanzan, da **jaques desde el lado** con la torre, lo más **lejos** posible. El rey atacante no puede acercarse a ella.',
  descubre:{fen:'4k3/8/4K3/4P3/8/8/1r6/7R b - - 0 1',di:'Juegas con negras. El rey blanco amenaza el mate en la octava. ¿Cómo te defiendes?'},
  observa:[
    {flechas:[['h1','h8','linea']],di:'Las blancas amenazan Th8+.',sencillo:'Amenazan la última fila.'},
    {jugada:'b2b6',marcas:[['e6','jaque']],di:'…Tb6+: jaque lateral. La torre está lejos y el rey no puede acercarse.',sencillo:'Jaques de lado.'}
  ],
  comprende:{di:'Jaques laterales desde lejos: el rey atacante no tiene refugio y el peón no avanza.'},
  practica:{fen:'4k3/8/4K3/4P3/8/8/1r6/7R b - - 0 1',linea:['b2b6'],concepto:true,objetivoEquilibrio:true,
    di:'Juegas con negras. Defiéndete con la torre.',pistas:['Da jaque desde el lado.'],
    mal:{'*':'Da un jaque lateral: …Tb6+.'},
    bien:'¡Bien! Jaques laterales: tablas.'}
};

/* N6-025 · Torres en dos flancos */
L['N6-025']={
  tactica:false, motivo:'Final de torres',
  objetivo:'Vas a aprender a jugar finales de torres con peones en los dos flancos.',
  idea:'Con peones en **los dos flancos**, la torre activa ataca peones y el rey se centra. Crea un **peón pasado** en el flanco donde tengas mayoría.',
  descubre:{fen:'3r2k1/1p3ppp/p7/8/8/P6P/1P3PP1/2R3K1 w - - 0 1',di:'Peones en los dos flancos. ¿Dónde tienes tu oportunidad?'},
  observa:[
    {flechas:[['c1','c7','mov']],di:'La torre activa en la séptima ataca peones de los dos lados.',sencillo:'La torre entra.'},
    {jugada:'c1c7',flechas:[['c7','b7','ataque'],['c7','f7','ataque']],di:'Tc7: ataca b7 y f7 a la vez.',sencillo:'Ataca dos peones.'}
  ],
  comprende:{di:'En los finales de torres con peones en los dos flancos, la actividad de la torre manda.'},
  practica:{fen:'3r2k1/1p3ppp/p7/8/8/P6P/1P3PP1/2R3K1 w - - 0 1',linea:['c1c7'],concepto:true,objetivoEquilibrio:true,
    di:'Activa tu torre contra los dos flancos.',pistas:['La séptima fila.'],
    mal:{'*':'Lleva la torre a la séptima.'},
    bien:'¡Bien! La torre ataca en los dos flancos.'}
};

/* N6-026 · Torre contra pieza menor */
L['N6-026']={
  tactica:false, motivo:'Torre contra alfil',
  objetivo:'Vas a aprender a defender torre contra alfil sin peones.',
  idea:'Torre contra alfil suele ser **tablas**. El rey defensor debe ir a la **esquina del color contrario** al de su alfil: allí no hay mate.',
  descubre:{fen:'8/8/8/3b4/5k2/8/2K5/6R1 b - - 0 1',di:'Juegas con negras: alfil de casillas claras contra torre. ¿Hacia qué esquina va tu rey?'},
  observa:[
    {marcas:[['h8','clave'],['a1','clave']],di:'Las esquinas oscuras (a1 y h8) son seguras: tu alfil puede tapar los jaques.',sencillo:'Esquinas oscuras.'},
    {marcas:[['a8','clave'],['h1','clave']],di:'En las esquinas claras hay peligro de mate.',sencillo:'Esquinas claras: peligro.'}
  ],
  comprende:{di:'Con alfil contra torre, lleva el rey a la esquina del color contrario al de tu alfil.'},
  practica:{tipo:'casilla',fen:'8/8/8/3b4/5k2/8/2K5/6R1 b - - 0 1',casillas:['a1','h8'],
    di:'Toca las esquinas seguras para tu rey.',pista:'Las del color contrario al de tu alfil.',
    bien:'¡Bien! a1 y h8 son las esquinas seguras.'}
};

/* N6-027 · Dos pasados contra pieza */
L['N6-027']={
  tactica:false, motivo:'Peones pasados ligados',
  objetivo:'Vas a aprender la fuerza de dos peones pasados unidos.',
  idea:'Dos **peones pasados ligados** en la sexta fila pueden ganar a una torre: la torre no puede frenar a los dos a la vez.',
  descubre:{fen:'8/r7/5PP1/8/8/k7/8/6K1 w - - 0 1',di:'Tus peones de f6 y g6 están juntos. ¿Puede frenarlos la torre?'},
  observa:[
    {marcas:[['f6','clave'],['g6','clave']],di:'Dos peones ligados en la sexta: se protegen al avanzar.',sencillo:'Peones juntos.'},
    {jugada:'f6f7',di:'f7: amenaza g7 y coronar. La torre llega tarde.',sencillo:'El peón avanza.'}
  ],
  comprende:{di:'Dos pasados ligados en la sexta suelen vencer a una torre si el rey rival está lejos.'},
  practica:{fen:'8/r7/5PP1/8/8/k7/8/6K1 w - - 0 1',linea:['f6f7'],acepta:{0:['g6g7']},concepto:true,
    di:'Avanza tus peones ligados.',pistas:['Empuja uno de los dos.'],
    mal:{'*':'Avanza los peones: f7 o g7.'},
    bien:'¡Bien! La torre no puede con los dos.'}
};

/* N6-028 · Finales de dama */
L['N6-028']={
  tactica:false, motivo:'Final de damas',
  objetivo:'Vas a aprender la importancia de los jaques en los finales de damas.',
  idea:'En los **finales de damas** los jaques son peligrosos: antes de avanzar un peón, mira si tu rey queda expuesto a un **jaque perpetuo**.',
  descubre:{fen:'6k1/5ppp/8/8/8/8/5PPP/3Q2K1 w - - 0 1',di:'Final de dama. ¿Desde qué casillas puede dar jaque tu dama?'},
  observa:[
    {flechas:[['d1','d8','linea']],di:'Por la columna d llega a d8 con jaque.',sencillo:'La dama da jaque en d8.'}
  ],
  comprende:{di:'En finales de damas, cuenta los jaques de los dos bandos antes de cada jugada.'},
  practica:{tipo:'casilla',fen:'6k1/5ppp/8/8/8/8/5PPP/3Q2K1 w - - 0 1',casillas:['d1'],verificar:'pueden-jaque:w',
    di:'Toca las piezas blancas que pueden dar jaque.',pista:'Solo una.',
    bien:'¡Bien! La dama es la pieza de los jaques.'}
};

/* N6-029 · Elegir el final */
L['N6-029']={
  tactica:false, motivo:'Elegir el final',
  objetivo:'Vas a aprender a elegir qué piezas cambiar para llegar al mejor final.',
  idea:'Con ventaja, elige el **final más fácil**. Con un peón de más alejado, el final de **peones** suele estar ganado: cambia las damas o las torres.',
  descubre:{fen:'3q2k1/5pp1/7p/8/8/8/P4PPP/3Q2K1 w - - 0 1',di:'Tienes un peón de más en la columna a. ¿Cambiarías las damas?'},
  observa:[
    {jugada:'d1d8',marcas:[['g8','jaque']],di:'Dxd8+: cambias las damas.',sencillo:'Cambias damas.'},
    {jugada:'g8h7',di:'…Rh7: el final de peones con peón pasado alejado está ganado.',sencillo:'El final de peones es tuyo.'}
  ],
  comprende:{di:'Imagina cada final posible y elige el más sencillo de ganar.'},
  practica:{fen:'3q2k1/5pp1/7p/8/8/8/P4PPP/3Q2K1 w - - 0 1',linea:['d1d8'],
    di:'Elige el final ganado.',pistas:['Cambia las damas.'],
    bien:'¡Bien! Final de peones ganado.'}
};

/* N6-030 · Repertorio de aperturas */
L['N6-030']={
  tactica:false, motivo:'Repertorio',
  objetivo:'Vas a fijar tu repertorio: Sistema Londres con blancas y Caro-Kann con negras.',
  idea:'Un **repertorio** son las aperturas que juegas siempre. Con blancas, el **Sistema Londres** (d4, Af4, e3, Cf3, c3, Ad3, Cbd2). Con negras, la **Caro-Kann** (1.e4 c6 y …d5).',
  descubre:{fen:INICIAL,di:'Tu repertorio empieza aquí. ¿Cuál es tu primera jugada con blancas?'},
  observa:[
    {jugada:'d2d4',di:'1.d4: el primer paso del Londres.',sencillo:'d4.'},
    {jugada:'d7d5',di:'1…d5',sencillo:'Las negras responden.'},
    {jugada:'c1f4',di:'2.Af4: el alfil sale antes de jugar e3.',sencillo:'El alfil del Londres.'},
    {fen:'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',di:'Con negras, contra 1.e4…',sencillo:'Ahora con negras.'},
    {jugada:'c7c6',di:'1…c6: la Caro-Kann prepara …d5.',sencillo:'c6.'},
    {jugada:'d2d4',di:'2.d4',sencillo:'Las blancas ocupan el centro.'},
    {jugada:'d7d5',di:'2…d5: atacas e4.',sencillo:'d5.'}
  ],
  comprende:{di:'Londres con blancas y Caro-Kann con negras: dos aperturas sólidas con planes claros.'},
  practica:{fen:'rnbqkbnr/ppp1pppp/8/3p4/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 2',linea:['c1f4'],regla:true,
    di:'Sistema Londres: juega tu segunda jugada.',pistas:['El alfil de c1.'],
    bien:'¡Bien! 2.Af4.'},
  hazlo:{fen:'rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq - 0 1',linea:['c7c6'],regla:true,
    di:'Juegas con negras. Responde a 1.e4 con la Caro-Kann.',pistas:['El peón de c7.'],
    bien:'¡Bien! 1…c6.'},
  comprueba:{fen:'rnbqkbnr/pp1ppppp/2p5/8/3PP3/8/PPP2PPP/RNBQKBNR b KQkq - 0 2',linea:['d7d5'],regla:true,
    di:'Juegas con negras. Sigue con la Caro-Kann.',pistas:['Ataca e4 con un peón.'],
    bien:'¡Correcto! 2…d5.'}
};

/* N6-031 · Gestión del reloj */
L['N6-031']={
  tactica:false, motivo:'Reloj',
  objetivo:'Vas a aprender a repartir tu tiempo en la partida.',
  idea:'Juega **rápido** las jugadas obvias (recapturas, jugadas de apertura conocidas) y guarda el tiempo para los **momentos críticos**: combinaciones y cambios de estructura.',
  descubre:{fen:'rnbqkbnr/pp2pppp/8/3p4/3p1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4',di:'Sistema Londres. Las negras acaban de capturar en d4. ¿Necesitas pensar mucho?'},
  observa:[
    {flechas:[['e3','d4','ataque']],di:'La recaptura exd4 es obvia: juégala rápido.',sencillo:'Jugada obvia.'},
    {jugada:'e3d4',di:'exd4: ahorras tiempo para cuando la posición sea complicada.',sencillo:'Recapturas sin perder tiempo.'}
  ],
  comprende:{di:'Jugadas obvias, rápido; posiciones críticas, despacio.'},
  practica:{fen:'rnbqkbnr/pp2pppp/8/3p4/3p1B2/4P3/PPP2PPP/RN1QKBNR w KQkq - 0 4',linea:['e3d4'],regla:true,
    di:'Juega la jugada obvia.',pistas:['Recaptura el peón.'],
    bien:'¡Bien! Rápido y correcto.'}
};

/* N6-032 · Partidas de maestros */
L['N6-032']={
  tactica:true, motivo:'Partida clásica',
  objetivo:'Vas a estudiar el final de una partida inmortal.',
  idea:'Las **partidas de maestros** enseñan ideas que se repiten. En la **Siempreviva** (Anderssen–Dufresne, 1852), los sacrificios abren el camino al mate.',
  descubre:{fen:'1r2k1r1/pbppnp1p/1bn2P2/7q/Q7/B1PB1N2/P4PPP/R3R1K1 w - - 1 19',di:'Anderssen–Dufresne, Berlín 1852. Anderssen juega una jugada tranquila y deja que le capturen el caballo.'},
  observa:[
    {jugada:'a1d1',di:'19.Tad1!!: lleva la última pieza al ataque, aunque pierda el caballo de f3.',sencillo:'La torre entra en juego.'},
    {jugada:'h5f3',di:'19…Dxf3: las negras amenazan mate en g2.',sencillo:'Las negras capturan.'},
    {jugada:'e1e7',marcas:[['e8','jaque']],di:'20.Txe7+! y la combinación decide.',sencillo:'Empieza la combinación.'}
  ],
  comprende:{di:'Estudia partidas clásicas: las ideas de ataque se repiten en tus propias partidas.'},
  practica:{fen:'1r3kr1/pbpBnp1p/1b3P2/8/8/B1P2q2/P4PPP/3R2K1 w - - 4 24',linea:['a3e7'],meta:'mate',
    di:'Da el mate final de la Siempreviva.',pistas:['El alfil de a3 llega a e7.'],
    bien:'¡Mate! 24.Axe7#.'}
};

/* N6-033 · Analizar tus partidas */
L['N6-033']={
  tactica:false, motivo:'Análisis',
  objetivo:'Vas a aprender a revisar tus partidas para encontrar los errores.',
  idea:'Al **analizar** una partida, busca el momento en que dejaste una pieza **sin defensa** o no viste una amenaza. Ese error es la lección.',
  descubre:{fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4',di:'Revisa esta posición de tu partida: ¿hay piezas blancas sin defensa?'},
  observa:[
    {marcas:[['a1','clave'],['h1','clave'],['g2','clave']],di:'Nada está atacado todavía, pero las torres y el peón de g2 no tienen defensa: son puntos a vigilar.',sencillo:'Hay piezas sin defensa.'}
  ],
  comprende:{di:'Revisa cada partida: ¿qué piezas quedaron sin defensa? ¿Qué amenaza no viste?'},
  practica:{tipo:'casilla',fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/3P1N2/PPP2PPP/RNBQK2R b KQkq - 0 4',casillas:['a1','g2','h1'],verificar:'indefensas:w',
    di:'Toca las piezas blancas sin defensa.',pista:'Mira cuáles no protege ninguna pieza blanca.',
    bien:'¡Bien! Esas piezas pueden ser un problema más adelante.'}
};

/* N6-034 · Táctica y estrategia */
L['N6-034']={
  tactica:false, motivo:'Síntesis',
  objetivo:'Vas a unir táctica y estrategia en un mismo plan.',
  idea:'La **estrategia** coloca las piezas en buenas casillas; la **táctica** aprovecha el momento. En el Londres, el caballo en e5 (estrategia) prepara ataques al rey (táctica).',
  descubre:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',di:'Sistema Londres. Primero la estrategia: ¿qué casilla quieres para tu caballo?'},
  observa:[
    {marcas:[['e5','clave']],di:'e5 es la casilla fuerte del Londres.',sencillo:'e5 es tu casilla.'},
    {jugada:'f3e5',flechas:[['d3','h7','linea']],di:'Ce5: desde ahí el caballo y el alfil de d3 apuntan al enroque negro.',sencillo:'Estrategia que prepara táctica.'}
  ],
  comprende:{di:'Coloca bien tus piezas (estrategia) y estarán listas cuando llegue la táctica.'},
  practica:{fen:'2rq1rk1/pb3ppp/1pnbpn2/2pp4/3P4/2PBPNB1/PP1N1PPP/R2QR1K1 w - - 4 11',linea:['f3e5'],concepto:true,objetivoEquilibrio:true,
    di:'Coloca tu caballo en la casilla fuerte.',pistas:['e5.'],
    mal:{'*':'Lleva el caballo a e5.'},
    bien:'¡Bien! Estrategia lista para la táctica.'}
};

})();
