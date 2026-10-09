/* Aprende Ajedrez · Catálogo curricular
   Seis niveles, 220 contenidos. Los identificadores (N1-001 …) son permanentes:
   el progreso, el historial y los favoritos se guardan con ellos. Si un título
   cambia o se reordena el catálogo, el identificador NO cambia. */
(function(){
  'use strict';
  var NIVELES=[
    {n:1,nombre:'NIVEL I',sub:'Principiante inicial',
     proposito:'Completar las reglas especiales, leer y escribir jugadas y adquirir el hábito de seguridad: qué vale cada pieza, cuáles están defendidas, qué amenaza el rival y qué deja indefenso cada movimiento propio.',
     t:['Coordenadas del tablero','Notación algebraica','Enroque corto y largo','Cuándo no enrocar','La promoción del peón','La captura al paso','Cómo salir del jaque','Mate o ahogado','Ahogado y poco material','Otras formas de tablas','Valor de las piezas','Defendidas e indefensas','Piezas colgadas','Cambios buenos y malos','Amenazas del rival','Responder a una amenaza','Atacantes y defensores','Capturar con la menor','¿Qué dejo sin defensa?','Buscar jaques y capturas','Mate en 1 con dama','Mate en 1 con torre','Mate del pasillo','Mate con dama apoyada','Mates del loco y pastor','Controlar el centro','Desarrollar las piezas','Enrocar pronto','No sacar la dama pronto','No mover dos veces','Conectar las torres','La debilidad de f7 y f2','Mate con dos torres','Mate con dama y rey','Cuidado con el ahogado','La regla del cuadrado','Rey y peón contra rey']},
    {n:2,nombre:'NIVEL II',sub:'Principiante táctico',
     proposito:'Reconocer y ejecutar las tácticas fundamentales de una sola idea y aprender a prevenirlas; primeros patrones de mate con piezas menores, jugadas candidatas y finales básicos de rey y peón.',
     t:['Jugadas forzadas','Ganar tiempos atacando','Ataque doble','Tenedor de peón','Tenedor de caballo','Tenedor con jaque','Tenedor de dama','Tenedor de alfil y torre','Tenedor con el rey','Clavada absoluta','Clavada relativa','Ganar la pieza clavada','Enfilada (pincho)','Ataque descubierto','Jaque descubierto','Jaque doble','Pieza atrapada','Eliminar al defensor','Prevenir tenedores','Mate con torre y rey','Mate de la coz','Mate árabe','Mate de las hombreras','Mate de la golondrina','Última fila y escape','Mate en dos jugadas','Movimientos candidatos','Jugada y respuesta','Aperturas 1.e4 e5','Rey sin enrocar','Trampas sobre f7 y f2','Peón pasado','Carreras de peones','Activación del rey','La oposición directa','Rey delante del peón','El peón de torre','Jaque y luego tenedor']},
    {n:3,nombre:'NIVEL III',sub:'Principiante consolidado',
     proposito:'Pasar de las tácticas de una idea a los motivos que las preparan, sumar patrones de mate con nombre propio, primeras nociones de estructura y actividad, casillas clave, zugzwang y recursos de tablas.',
     t:['Rayos X','Desviación','Atracción','Sobrecarga','Peones doblados','Peones aislados','Peones retrasados','Cadenas de peones','Islas de peones','Jugada intermedia','Jaque intermedio','Contraataque','Defenderse del mate','Mate de Anastasia','Mate de la Ópera','Mate de Boden','Mate de Damiano','Mate de Legal','El peón envenenado','Del desarrollo al plan','Mejorar la peor pieza','Columnas abiertas','La torre en séptima','Diagonales y fianchetto','Crear un peón pasado','Bloquear un peón pasado','Subpromoción','Casillas clave','Zugzwang elemental','El ahogado salvador','Jaque perpetuo','Repetir para salvarse','Sacrificios elementales','La coz de Philidor','Mate en tres jugadas','Combinar dos motivos','Visualizar dos jugadas','Revisar tus partidas']},
    {n:4,nombre:'NIVEL IV',sub:'Intermedio básico',
     proposito:'Dominar los motivos que trabajan sobre líneas y casillas, los sacrificios con propósito definido, los mates contra el rey enrocado y la estrategia básica; en los finales, rupturas, oposición distante, Philidor y Lucena.',
     t:['Interferencia','Despeje de líneas','Despeje de casillas','Bloqueo','Jugada silenciosa','Casillas débiles','Puestos avanzados','Alfil bueno y malo','Ventaja de espacio','El centro de peones','Coordinación de piezas','Cuándo cambiar piezas','Ataques prematuros','Ventaja de desarrollo','Gambitos','Rey en el centro','Sacrificio de atracción','Sacrificio de desviación','Sacrificar para abrir','Sacrificio de calidad','Sacrificio griego','Mate de Greco','Mate de Lolli','Mate de Morphy','Mate de Anderssen','Mate de Blackburne','Redes de mate','Candidatas del rival','La amenaza principal','Calcular tres jugadas','Elegir el flanco','Ruptura de peones','Peón pasado alejado','Peón pasado protegido','Oposición distante','Torres: cortar al rey','Regla de Tarrasch','Posición de Philidor','Posición de Lucena']},
    {n:5,nombre:'NIVEL V',sub:'Intermedio',
     proposito:'Integrar táctica y estrategia en el ataque al rey, los desequilibrios clásicos, la profilaxis y la simplificación; cálculo en árbol de variantes y finales más exigentes.',
     t:['Pareja de alfiles','Caballo contra alfil','Mayoría en un flanco','Peón aislado de dama','Profilaxis','Simplificar para ganar','Compensación material','Peón por la iniciativa','Enroques opuestos','Atacar el fianchetto','Abrir columnas al rey','Sacrificio para mate','Dar la dama para mate','Combinación de Lasker','Mates de piezas menores','Intermedias en cálculo','Combinación silenciosa','Combinaciones múltiples','Buscar el contragolpe','El árbol de variantes','Evaluar el resultado','Buscar la mejor defensa','Visualizar 4–5 jugadas','Planes por estructura','Mate con dos alfiles','Triangulación','Zugzwang recíproco','Dama contra peón','Alfiles de color opuesto','Finales de caballo','Alfil contra caballo','Torre activa y pasiva','Torre y peón de torre','Tu plan de mejora']},
    {n:6,nombre:'NIVEL VI',sub:'Intermedio avanzado',
     proposito:'Consolidar el pensamiento estratégico de largo plazo, el cálculo en posiciones no forzadas, la defensa con fortalezas y los finales técnicos, junto con la práctica de la partida completa.',
     t:['Peones colgantes','Ataque de minorías','Base de la cadena','Casillas de un color','Alfiles opuestos y ataque','Impedir las rupturas','Las dos debilidades','Planes en etapas','Transformar ventajas','Calidad posicional','Sacrificio a largo plazo','Evaluar la posición','Calcular sin forzar','Comparar variantes','La silenciosa del rival','Combinaciones largas','Redes de mate complejas','Ataque al rey: síntesis','Defensa tenaz','Fortalezas','Ahogado y perpetuo','Mate de alfil y caballo','Casillas correspondientes','Torres: defensa lateral','Torres en dos flancos','Torre contra pieza menor','Dos pasados contra pieza','Finales de dama','Elegir el final','Repertorio de aperturas','Gestión del reloj','Partidas de maestros','Analizar tus partidas','Táctica y estrategia']}
  ];
  var ORDINAL=['','UNO','DOS','TRES','CUATRO','CINCO','SEIS'];
  /* Los niveles se numeran con números romanos y las lecciones con arábigos */
  var ROMANO=['','I','II','III','IV','V','VI'];
  var lista=[], porId={};
  NIVELES.forEach(function(nv){
    nv.ids=[];
    nv.t.forEach(function(titulo,i){
      var id='N'+nv.n+'-'+('00'+(i+1)).slice(-3);
      var c={id:id,nivel:nv.n,num:i+1,titulo:titulo,orden:lista.length};
      lista.push(c);porId[id]=c;nv.ids.push(id);
    });
  });
  window.AA_CATALOGO=Object.freeze({
    niveles:NIVELES,
    lista:lista,
    porId:porId,
    ordinal:ORDINAL,
    romano:ROMANO,
    etiqueta:function(id){var c=porId[id];return c?('NIVEL '+ROMANO[c.nivel]+' · LECCIÓN '+c.num):'';},
    /* «Nivel I - Lección 7 · Título», para textos que lee la persona (sin códigos tipo N1-007) */
    nombreCompleto:function(id){var c=porId[id];return c?('Nivel '+ROMANO[c.nivel]+' - Lección '+c.num+' · '+c.titulo):'';},
    total:lista.length
  });
})();
