/* Aprende Ajedrez · lecciones del NIVEL DOS (contenido validado con tools/aprende/validar.cjs) */
(function(){
'use strict';
var L=window.AA_LECCIONES=window.AA_LECCIONES||{};

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
  comprende:{di:'Un tenedor funciona cuando una pieza ataca dos objetivos y el rival solo puede salvar uno. El jaque lo hace todavía más fuerte, porque obliga a mover el rey.',
    pregunta:{texto:'¿Por qué las negras no pudieron salvar su torre?',
      opciones:['Porque su rey estaba en jaque y tenía que moverse primero','Porque la torre no tenía casillas libres','Porque el caballo vale más que la torre'],
      correcta:0, explica:'Exacto: ante un jaque, salvar al rey es obligatorio. Esa jugada «obligada» deja la otra pieza sin defensa.',
      mal:{1:'La torre sí tenía casillas, pero no tuvo tiempo de usarlas. ¿Qué tenía que hacer primero el rival?',2:'El caballo vale 3 y la torre 5. El valor no es la razón: piensa en el jaque.'}}},
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
