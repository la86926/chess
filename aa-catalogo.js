/* Aprende Ajedrez · Catálogo curricular
   Seis niveles, 218 contenidos. Los identificadores (N1-001 …) son permanentes:
   el progreso, el historial y los favoritos se guardan con ellos. Si un título
   cambia o se reordena el catálogo, el identificador NO cambia: una lección
   reubicada se escribe «Título|N3-002» y conserva su identificador. */
(function(){
  'use strict';
  var NIVELES=[
    {n:1,nombre:'NIVEL I',sub:'Principiante inicial',
     proposito:'Completar las reglas especiales, leer y escribir jugadas y adquirir el hábito de seguridad: qué vale cada pieza, cuáles están defendidas, qué amenaza el rival y qué deja indefenso cada movimiento propio.',
     t:['Coordenadas del tablero','Notación algebraica','Enroque corto y largo','Cuándo no enrocar','La promoción del peón','La captura al paso','Cómo salir del jaque','Mate o ahogado','Ahogado y poco material','Otras formas de tablas','Valor de las piezas','Defendidas e indefensas','Piezas colgadas','Cambios buenos y malos','Amenazas del rival','Responder a una amenaza','Atacantes y defensores','Capturar con la menor','¿Qué dejo sin defensa?','Buscar jaques y capturas','Mate en 1 con dama','Mate en 1 con torre','Mate del pasillo','Mate con dama apoyada','Mates del loco y pastor','Controlar el centro','Desarrollar las piezas','Enrocar pronto','No sacar la dama pronto','No mover dos veces','Conectar las torres','La debilidad de f7 y f2','Mate con dos torres','Mate con dama y rey','Cuidado con el ahogado','La regla del cuadrado','Rey y peón contra rey']},
    {n:2,nombre:'NIVEL II',sub:'Principiante táctico',
     proposito:'Reconocer y ejecutar las tácticas fundamentales (tenedores, clavadas, descubiertas, rayos X, desviación, atracción, sobrecarga, interferencia y bloqueo) y aprender a prevenirlas; primeros patrones de mate con piezas menores, jugadas candidatas y finales básicos de rey y peón.',
     t:['Jugadas forzadas|N2-001','Ganar tiempos atacando|N2-002','Ataque doble|N2-003','Tenedor de peón|N2-004','Tenedor de caballo|N2-005','Tenedor con jaque|N2-006','Tenedor de dama|N2-007','Tenedor de alfil y torre|N2-008','Tenedor con el rey|N2-009','Clavada absoluta|N2-010','Clavada relativa|N2-011','Ganar la pieza clavada|N2-012','Ataque descubierto|N2-014','Jaque descubierto|N2-015','Jaque doble|N2-016','Pieza atrapada|N2-017','Rayos X|N3-001','Desviación|N3-002','Atracción|N3-003','Sobrecarga|N3-004','Interferencia|N4-001','Bloqueo|N4-004','Eliminar al defensor|N2-018','Prevenir tenedores|N2-019','Mate con torre y rey|N2-020','Mate de la coz|N2-021','Mate árabe|N2-022','Mate de las hombreras|N2-023','Mate de la golondrina|N2-024','Última fila y escape|N2-025','Mate en dos jugadas|N2-026','Movimientos candidatos|N2-027','Jugada y respuesta|N2-028','Aperturas 1.e4 e5|N2-029','Rey sin enrocar|N2-030','Trampas sobre f7 y f2|N2-031','Peón pasado|N2-032','Carreras de peones|N2-033','Activación del rey|N2-034','La oposición directa|N2-035','Rey delante del peón|N2-036','El peón de torre|N2-037','Jaque y luego tenedor|N2-038']},
    {n:3,nombre:'NIVEL III',sub:'Principiante consolidado',
     proposito:'Jugadas intermedias, leer las amenazas del rival, patrones de mate con nombre propio, primeras nociones de estructura y actividad, casillas clave, oposición, zugzwang y recursos de tablas.',
     t:['Jugada intermedia|N3-010','Jaque intermedio|N3-011','Contraataque|N3-012','Defenderse del mate|N3-013','Candidatas del rival|N4-028','La amenaza principal|N4-029','Mate de Anastasia|N3-014','Mate de la Ópera|N3-015','Mate de Boden|N3-016','Mate de Damiano|N3-017','Mate de Legal|N3-018','El peón envenenado|N3-019','Peones doblados|N3-005','Peones aislados|N3-006','Peones retrasados|N3-007','Cadenas de peones|N3-008','Islas de peones|N3-009','Del desarrollo al plan|N3-020','Mejorar la peor pieza|N3-021','Columnas abiertas|N3-022','La torre en séptima|N3-023','Diagonales y fianchetto|N3-024','Crear un peón pasado|N3-025','Bloquear un peón pasado|N3-026','Subpromoción|N3-027','Casillas clave|N3-028','Oposición distante|N4-035','Zugzwang elemental|N3-029','El ahogado salvador|N3-030','Jaque perpetuo|N3-031','Repetir para salvarse|N3-032','Sacrificios elementales|N3-033','La coz de Philidor|N3-034','Mate en tres jugadas|N3-035','Combinar dos motivos|N3-036','Visualizar dos jugadas|N3-037','Revisar tus partidas|N3-038']},
    {n:4,nombre:'NIVEL IV',sub:'Intermedio básico',
     proposito:'Despejes de líneas y casillas; sacrificios con propósito, mates contra el rey enrocado y estrategia básica; en los finales, rupturas, Philidor y Lucena.',
     t:['Despeje de líneas|N4-002','Despeje de casillas|N4-003','Jugada silenciosa|N4-005','Casillas débiles|N4-006','Puestos avanzados|N4-007','Alfil bueno y malo|N4-008','Ventaja de espacio|N4-009','El centro de peones|N4-010','Coordinación de piezas|N4-011','Cuándo cambiar piezas|N4-012','Ataques prematuros|N4-013','Ventaja de desarrollo|N4-014','Gambitos|N4-015','Rey en el centro|N4-016','Sacrificar para abrir|N4-019','Sacrificio de calidad|N4-020','Sacrificio griego|N4-021','Mate de Greco|N4-022','Mate de Lolli|N4-023','Mate de Morphy|N4-024','Mate de Anderssen|N4-025','Mate de Blackburne|N4-026','Redes de mate|N4-027','Calcular tres jugadas|N4-030','Elegir el flanco|N4-031','Ruptura de peones|N4-032','Peón pasado alejado|N4-033','Peón pasado protegido|N4-034','Torres: cortar al rey|N4-036','Regla de Tarrasch|N4-037','Posición de Philidor|N4-038','Posición de Lucena|N4-039']},
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
    /* «Título|N3-002»: la lección se reubicó y conserva su identificador de siempre */
    var fijos=nv.t.map(function(x){var k=x.indexOf('|');return k<0?'':x.slice(k+1);});
    nv.t=nv.t.map(function(x){var k=x.indexOf('|');return k<0?x:x.slice(0,k);});
    nv.t.forEach(function(titulo,i){
      var id=fijos[i]||'N'+nv.n+'-'+('00'+(i+1)).slice(-3);
      if(porId[id])throw new Error('Identificador repetido en el catálogo: '+id);
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
    /* lecciones fusionadas en otra: su identificador antiguo apunta a la nueva */
    alias:{'N2-013':'N3-001'},
    etiqueta:function(id){var c=porId[id];return c?('NIVEL '+ROMANO[c.nivel]+' · LECCIÓN '+c.num):'';},
    /* «Nivel I - Lección 7 · Título», para textos que lee la persona (sin códigos tipo N1-007) */
    nombreCompleto:function(id){var c=porId[id];return c?('Nivel '+ROMANO[c.nivel]+' - Lección '+c.num+' · '+c.titulo):'';},
    total:lista.length
  });
})();
