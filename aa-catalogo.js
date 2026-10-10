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
     t:['Coordenadas del tablero|N1-001','Notación algebraica|N1-002','Enroque corto y largo|N1-003','Cuándo no enrocar|N1-004','La promoción del peón|N1-005','La captura al paso|N1-006','Cómo salir del jaque|N1-007','Mate o ahogado|N1-008','Ahogado y poco material|N1-009','Otras formas de tablas|N1-010','Valor de las piezas|N1-011','Defendidas e indefensas|N1-012','Piezas colgadas|N1-013','Cambios buenos y malos|N1-014','Amenazas del rival|N1-015','Responder a una amenaza|N1-016','Atacantes y defensores|N1-017','Capturar con la menor|N1-018','¿Qué dejo sin defensa?|N1-019','Buscar jaques y capturas|N1-020','Mate en 1 con dama|N1-021','Mate en 1 con torre|N1-022','Mate del pasillo|N1-023','Mate con dama apoyada|N1-024','Mates del loco y pastor|N1-025','Controlar el centro|N1-026','Desarrollar las piezas|N1-027','Enrocar pronto|N1-028','No sacar la dama pronto|N1-029','No mover dos veces|N1-030','Conectar las torres|N1-031','La debilidad de f7 y f2|N1-032','Mate con dos torres|N1-033','Mate con dama y rey|N1-034','Cuidado con el ahogado|N1-035','La regla del cuadrado|N1-036','Rey y peón contra rey|N1-037']},
    {n:2,nombre:'NIVEL II',sub:'Principiante táctico',
     proposito:'Reconocer y ejecutar las tácticas fundamentales (tenedores, clavadas, descubiertas, rayos X, desviación, atracción, sobrecarga, interferencia y bloqueo) y aprender a prevenirlas; primeros patrones de mate con piezas menores, jugadas candidatas y finales básicos de rey y peón.',
     t:['Jugadas forzadas|N2-001','Ganar tiempos atacando|N2-002','Ataque doble|N2-003','Tenedor de peón|N2-004','Tenedor de caballo|N2-005','Tenedor con jaque|N2-006','Tenedor de dama|N2-007','Tenedor de alfil y torre|N2-008','Tenedor con el rey|N2-009','Clavada absoluta|N2-010','Clavada relativa|N2-011','Ganar la pieza clavada|N2-012','Ataque descubierto|N2-014','Jaque descubierto|N2-015','Jaque doble|N2-016','Pieza atrapada|N2-017','Rayos X|N3-001','Desviación|N3-002','Atracción|N3-003','Sobrecarga|N3-004','Interferencia|N4-001','Bloqueo|N4-004','Eliminar al defensor|N2-018','Prevenir tenedores|N2-019','Mate con torre y rey|N2-020','Mate de la coz|N2-021','Mate árabe|N2-022','Mate de las hombreras|N2-023','Mate de la golondrina|N2-024','Última fila y escape|N2-025','Mate en dos jugadas|N2-026','Movimientos candidatos|N2-027','Jugada y respuesta|N2-028','Aperturas 1.e4 e5|N2-029','Rey sin enrocar|N2-030','Trampas sobre f7 y f2|N2-031','Peón pasado|N2-032','Carreras de peones|N2-033','Activación del rey|N2-034','La oposición directa|N2-035','Rey delante del peón|N2-036','El peón de torre|N2-037','Jaque y luego tenedor|N2-038']},
    {n:3,nombre:'NIVEL III',sub:'Principiante consolidado',
     proposito:'Jugadas intermedias, leer las amenazas del rival, patrones de mate con nombre propio, primeras nociones de estructura y actividad, casillas clave, oposición, zugzwang y recursos de tablas.',
     t:['Jugada intermedia|N3-010','Jaque intermedio|N3-011','Contraataque|N3-012','Contra amenaza|N3-040','Defenderse del mate|N3-013','Candidatas del rival|N4-028','La amenaza principal|N4-029','Mate de Anastasia|N3-014','Mate de la Ópera|N3-015','Mate de Boden|N3-016','Mate de Damiano|N3-017','Mate de Legal|N3-018','El peón envenenado|N3-019','Regalo envenenado|N4-021','Peones doblados|N3-005','Peones aislados|N3-006','Peones retrasados|N3-007','Cadenas de peones|N3-008','Islas de peones|N3-009','Del desarrollo al plan|N3-020','Mejorar la peor pieza|N3-021','Columnas abiertas|N3-022','La torre en séptima|N3-023','Diagonales y fianchetto|N3-024','Crear un peón pasado|N3-025','Bloquear un peón pasado|N3-026','Subpromoción|N3-027','Casillas clave|N3-028','Oposición distante|N4-035','Zugzwang elemental|N3-029','Zugzwang recíproco|N5-027','Zugzwang táctico|N3-039','El ahogado salvador|N3-030','Jaque perpetuo|N3-031','Repetir para salvarse|N3-032','Sacrificios elementales|N3-033','La coz de Philidor|N3-034','Mate en tres jugadas|N3-035','Combinar dos motivos|N3-036','Visualizar dos jugadas|N3-037','Revisar tus partidas|N3-038']},
    {n:4,nombre:'NIVEL IV',sub:'Intermedio básico',
     proposito:'Despejes de líneas y casillas; sacrificios con propósito, mates contra el rey enrocado y estrategia básica; en los finales, rupturas, Philidor y Lucena.',
     t:['Despeje de líneas|N4-002','Despeje de casillas|N4-003','Jugada silenciosa|N4-005','Casillas débiles|N4-006','Puestos avanzados|N4-007','Alfil bueno y malo|N4-008','Ventaja de espacio|N4-009','El centro de peones|N4-010','Coordinación de piezas|N4-011','Cuándo cambiar piezas|N4-012','Ataques prematuros|N4-013','Ventaja de desarrollo|N4-014','Gambitos|N4-015','Rey en el centro|N4-016','Sacrificar para abrir|N4-019','Sacrificio de calidad|N4-020','Mate de Greco|N4-022','Mate de Lolli|N4-023','Mate de Morphy|N4-024','Mate de Anderssen|N4-025','Mate de Blackburne|N4-026','Redes de mate|N4-027','Calcular tres jugadas|N4-030','Elegir el flanco|N4-031','Ruptura de peones|N4-032','Peón pasado alejado|N4-033','Peón pasado protegido|N4-034','Torres: cortar al rey|N4-036','Regla de Tarrasch|N4-037','Posición de Philidor|N4-038','Posición de Lucena|N4-039']},
    {n:5,nombre:'NIVEL V',sub:'Intermedio',
     proposito:'Integrar táctica y estrategia en el ataque al rey, los desequilibrios clásicos, la profilaxis y la simplificación; cálculo en árbol de variantes y finales más exigentes.',
     t:['Pareja de alfiles|N5-001','Caballo contra alfil|N5-002','Mayoría en un flanco|N5-003','Peón aislado de dama|N5-004','Profilaxis|N5-005','Simplificar para ganar|N5-006','Compensación material|N5-007','Peón por la iniciativa|N5-008','Enroques opuestos|N5-009','Atacar el fianchetto|N5-010','Abrir columnas al rey|N5-011','Sacrificio para mate|N5-012','Dar la dama para mate|N5-013','Combinación de Lasker|N5-014','Mates de piezas menores|N5-015','Intermedias en cálculo|N5-016','Combinación silenciosa|N5-017','Combinaciones múltiples|N5-018','Buscar el contragolpe|N5-019','El árbol de variantes|N5-020','Evaluar el resultado|N5-021','Buscar la mejor defensa|N5-022','Visualizar 4–5 jugadas|N5-023','Planes por estructura|N5-024','Mate con dos alfiles|N5-025','Triangulación|N5-026','Dama contra peón|N5-028','Alfiles de color opuesto|N5-029','Finales de caballo|N5-030','Alfil contra caballo|N5-031','Torre activa y pasiva|N5-032','Torre y peón de torre|N5-033','Tu plan de mejora|N5-034']},
    {n:6,nombre:'NIVEL VI',sub:'Intermedio avanzado',
     proposito:'Consolidar el pensamiento estratégico de largo plazo, el cálculo en posiciones no forzadas, la defensa con fortalezas y los finales técnicos, junto con la práctica de la partida completa.',
     t:['Peones colgantes|N6-001','Ataque de minorías|N6-002','Base de la cadena|N6-003','Casillas de un color|N6-004','Alfiles opuestos y ataque|N6-005','Impedir las rupturas|N6-006','Las dos debilidades|N6-007','Planes en etapas|N6-008','Transformar ventajas|N6-009','Calidad posicional|N6-010','Sacrificio a largo plazo|N6-011','Evaluar la posición|N6-012','Calcular sin forzar|N6-013','Comparar variantes|N6-014','La silenciosa del rival|N6-015','Combinaciones largas|N6-016','Redes de mate complejas|N6-017','Ataque al rey: síntesis|N6-018','Defensa tenaz|N6-019','Fortalezas|N6-020','Ahogado y perpetuo|N6-021','Mate de alfil y caballo|N6-022','Casillas correspondientes|N6-023','Torres: defensa lateral|N6-024','Torres en dos flancos|N6-025','Torre contra pieza menor|N6-026','Dos pasados contra pieza|N6-027','Finales de dama|N6-028','Elegir el final|N6-029','Repertorio de aperturas|N6-030','Gestión del reloj|N6-031','Partidas de maestros|N6-032','Analizar tus partidas|N6-033','Táctica y estrategia|N6-034']}
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
