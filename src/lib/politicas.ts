export type Item = { n: string; et?: string; texto: string; hijos?: Item[] };

export type Bloque = {
  id: string;
  nivel: 2 | 3 | 4;
  titulo: string;
  parrafos?: string[];
  items?: Item[];
};

const it = (n: string, texto: string, hijos?: Item[], et?: string): Item => ({
  n,
  texto,
  hijos,
  et,
});

export const INTRO =
  "En atención al propósito de promover y fomentar un espíritu de entendimiento entre los pueblos del mundo, se presentan las presentes Normas y Políticas del Programa de Intercambio Juvenil, basadas en las Políticas Generales establecidas por la Asociación Internacional de Clubes de Leones. Asimismo, se incorporan las disposiciones complementarias necesarias para la correcta operación y administración del programa en el Distrito Múltiple B México.";

export const BLOQUES: Bloque[] = [
  {
    id: "politicas-generales",
    nivel: 2,
    titulo: "Políticas Generales",
    items: [
      it(
        "1.",
        "Donde se considere apropiado y oportuno, se establecerán comités de dirigentes de enlace para coordinar los diferentes aspectos de los Campamentos e Intercambio Juveniles (CIJ) a nivel de distrito y distrito múltiple. El gobernador de distrito o el presidente del consejo respectivo nombrará a los miembros del comité de CIJ. Los asesores de campamentos e intercambio juveniles de los distritos podrán formar parte del comité de CIJ del distrito múltiple.",
        [
          it(
            "a.",
            "Cuando los programas de CIJ concluyan después del cierre del año fiscal, el asesor o el comité de CIJ podrán ser autorizados por el nuevo presidente del consejo de gobernadores para supervisar los campamentos e intercambios juveniles iniciados antes del 30 de junio hasta que concluyan satisfactoriamente."
          ),
          it(
            "b.",
            "Se alentará a los gobernadores de distrito y a los presidentes de consejo a que consideren la continuidad del programa de CIJ de año en año, siempre que sea posible, manteniendo al asesor de CIJ en el cargo."
          ),
          it(
            "c.",
            "Cuando se haga un cambio, se pedirá al asesor que transfiera todos los registros a su sucesor."
          ),
        ]
      ),
      it(
        "2.",
        "Para certificar que los programas de CIJ cumplen con las políticas, normas y reglamentos aprobados por la junta directiva que se detallan a continuación, el cargo del asesor de CIJ del distrito y del distrito múltiple debe ser aprobado por el gobernador de distrito y el presidente del consejo en MyLCI."
      ),
      it(
        "3.",
        "Los programas de CIJ certificados y los asesores de CIJ de distrito y distrito múltiple se publicarán en el sitio web de la asociación en el Directorio Internacional oficial de CIJ."
      ),
      it(
        "4.",
        "El programa de seguro de responsabilidad civil general protege a los distritos múltiples, distritos y clubes de Leones que participan en el programa de CIJ. Para los programas de CIJ se pedirá que el joven tenga un seguro adecuado para el viaje y las emergencias médicas que puedan surgir."
      ),
      it("5.", "", [
        it(
          "a.",
          "Por lo general, se recomienda que cuando se recopilen datos personales sobre un menor, se obtenga el consentimiento de los padres."
        ),
        it(
          "b.",
          "Solo se debe recopilar la información necesaria para administrar el intercambio."
        ),
        it(
          "c.",
          "Una vez que se haya cumplido el propósito el que se obtuvo la información, se destruya, elimine y / o borre la misma para evitar su uso indebido."
        ),
        it("d.", "", [
          it(
            "I.",
            "Todos los formularios de solicitud deben revelar en un lenguaje claro y distinguible cómo y qué datos personales pueden utilizarse. Los asesores de CIJ son responsables de proteger cualquier información recibida para los fines del programa de CIJ."
          ),
        ], "Consentimiento"),
      ], "Protección de los datos personales"),
    ],
  },
  {
    id: "politica-cij",
    nivel: 2,
    titulo: "Política de Campamentos e Intercambios Juveniles",
  },
  {
    id: "proposito-y-objetivos",
    nivel: 3,
    titulo: "Propósito y objetivos",
    items: [
      it(
        "1.",
        "El Programa de Intercambio Juvenil fue autorizado por la Junta Directiva de la Asociación Internacional de Clubes de Leones en 1961."
      ),
      it(
        "2.",
        "El programa de Campamentos Juveniles fue autorizado por la Junta Directiva Internacional en 1974."
      ),
      it(
        "3.",
        "Ambos programas se crearon con el propósito de promover el primer objetivo del Leonismo: “Crear y fomentar un espíritu de entendimiento entre los pueblos del mundo”."
      ),
      it("4.", "Los objetivos de los programas son:", [
        it("a.", "Unir a los jóvenes de diferentes países en relaciones de amistad."),
        it(
          "b.",
          "Facilitar el intercambio de ideas, costumbres y puntos de vistas culturales."
        ),
        it(
          "c.",
          "Promover el entendimiento y la buena voluntad internacionales, y trabajar en pos de la paz mundial."
        ),
        it("d.", "Desarrollar el potencial de liderato de los jóvenes."),
        it("e.", "Fomentar el respeto de los jóvenes por las ideas de los demás."),
        it("f.", "Promover los viajes internacionales."),
        it(
          "g.",
          "Proporcionar una variedad de actividades que fomenten una experiencia de aprendizaje sana, tanto física como intelectualmente."
        ),
      ]),
      it(
        "5.",
        "Los campamentos juveniles Leonísticos no se realizan con fines turísticos. Todas las partes participantes llevarán a cabo el programa de tal modo que se excluya cualquier elemento de provecho o ganancia personal."
      ),
      it(
        "6.",
        "Para calificar para la designación de “Campamento Juvenil de la Asociación Internacional de Clubes de Leones”, la actividad deberá cumplir con lo siguiente:",
        [
          it(
            "a.",
            "Usar el nombre “Leones” en su sección oficial, de conformidad con las normas establecidas por la Junta Directiva Internacional."
          ),
          it("b.", "Tener una duración de una semana por lo menos."),
          it("c.", "Tener participantes de diferentes países."),
          it(
            "d.",
            "Ofrecer un programa de actividades determinado por los organizadores del campamento, que esté a la par con los objetivos de este programa."
          ),
        ]
      ),
    ],
  },
  {
    id: "procedimientos-operativos",
    nivel: 3,
    titulo: "Procedimientos operativos",
  },
  {
    id: "comunicacion",
    nivel: 4,
    titulo: "Comunicación",
    items: [
      it(
        "1.",
        "La comunicación oportuna y efectiva entre todas las partes involucradas es fundamental para el correcto funcionamiento del Programa de Intercambio Juvenil. Los participantes, clubes patrocinadores, clubes anfitriones, asesores distritales, asesores nacionales, jóvenes participantes y sus padres o tutores deberán mantener informadas a las partes interesadas y responder con prontitud a toda comunicación relacionada con el programa."
      ),
      it(
        "2.",
        "Toda solicitud de intercambio deberá tramitarse inicialmente por conducto del Asesor Distrital de Intercambio Juvenil correspondiente, quien verificará que la documentación requerida se encuentre completa y la remitirá al Asesor Nacional para su revisión y autorización."
      ),
      it(
        "3.",
        "La gestión y coordinación oficial de los intercambios internacionales entre México y otros países se realizará por conducto del Asesor Nacional de Intercambio Juvenil, quien será el enlace con los asesores nacionales y las estructuras autorizadas de los países participantes."
      ),
      it(
        "4.",
        "Ningún club, participante o familia deberá formalizar directamente un intercambio internacional sin conocimiento y autorización de los asesores correspondientes, salvo en aquellos casos expresamente autorizados por el Asesor Nacional."
      ),
    ],
  },
  {
    id: "proteccion-de-los-jovenes",
    nivel: 4,
    titulo: "Protección de los jóvenes",
    items: [
      it(
        "5.",
        "Los Leones anfitriones llevarán a cabo los programas de intercambio de conformidad con las leyes y reglamentos locales que rigen la protección de los jóvenes."
      ),
      it(
        "6.",
        "Todos los programas de intercambio juvenil de los Leones se esforzarán por crear y mantener un ambiente seguro para todos los jóvenes participantes."
      ),
      it(
        "7.",
        "El asesor de CIJ o el director del campamento deben desarrollar procedimientos para informar sobre y manejar los incidentes, como las acusaciones de abuso o acoso, e informar a todos los voluntarios adultos acerca de las directrices del distrito o distrito múltiple para responder a las acusaciones."
      ),
      it(
        "8.",
        "Según su capacidad, todos los afiliados y voluntarios de CIJ deben proteger a los jóvenes y protegerlos del abuso físico, sexual y emocional."
      ),
      it(
        "9.",
        "El asesor de CIJ debe prohibir trabajar con los jóvenes a los voluntarios que hayan sido declarados culpables o hayan admitido estar o hayan estado implicados en situaciones de acoso o abuso físico, sexual o emocional."
      ),
      it(
        "10.",
        "Se debe prohibir a los adultos que participen en un programa de CIJ que hayan sido acusados de acoso o abuso físico, sexual o emocional el contacto con jóvenes participantes en el programa de CIJ hasta que el asesor de CIJ resuelva el asunto, en coordinación y consulta con la oficina internacional, según sea necesario."
      ),
      it(
        "11.",
        "Los asesores de CIJ deben establecer procedimientos de gestión de crisis para casos de emergencia, como puede ser un desastre natural y / o disturbios civiles o políticos."
      ),
    ],
  },
  {
    id: "seleccion-de-participantes",
    nivel: 4,
    titulo: "Proceso de selección de participantes en los campamentos juveniles",
    items: [
      it("1.", "", [
        it(
          "a.",
          "La elegibilidad de los candidatos para participar en el Programa de Intercambio Juvenil estará sujeta, en primera instancia, a la aprobación de su Club de Leones patrocinador. Posteriormente, los candidatos deberán cumplir con los criterios de selección establecidos en las presentes políticas y normas."
        ),
        it(
          "b.",
          "La aceptación final de cada participante estará además condicionada al cumplimiento de los requisitos, condiciones y criterios de selección establecidos por el país, distrito, campamento o programa anfitrión al que se solicite el intercambio."
        ),
        it(
          "c.",
          "El cumplimiento de los requisitos establecidos en las presentes políticas no garantiza la aceptación de un candidato por parte del programa anfitrión."
        ),
      ], "Elegibilidad"),
      it(
        "2.",
        "Cada joven que solicite participar en el programa de campamentos debe estar patrocinado por un club de Leones, independientemente de si el club ayudará o no en los arreglos financieros. La solicitud debe tener la aprobación del presidente del club patrocinador, del asesor de CIJ de distrito y del asesor del distrito múltiple."
      ),
      it(
        "3.",
        "Los posibles solicitantes pueden seleccionarse siguiendo cualquiera de los procedimientos siguientes:",
        [
          it("a.", "Por medio de competiciones organizadas."),
          it("b.", "Por recomendación de una escuela u organización comunitaria."),
          it("c.", "Por recomendación de un socio de un club de Leones."),
        ]
      ),
      it("4.", "", [
        it(
          "a.",
          "Cada solicitante deberá ser entrevistado personalmente por los Leones patrocinadores antes de presentar la solicitud al asesor de CIJ de distrito."
        ),
        it(
          "b.",
          "Todos los jóvenes deben de tener las edades indicadas para el programa en el cual soliciten participar. Como referencia, la mayoría de los campamentos y programas de intercambio juvenil aceptan participantes de entre 15 y 21 años de edad cumplidos durante el año en que se realice el intercambio.",
          undefined,
          "Edad"
        ),
        it(
          "c.",
          "El rendimiento académico o el récord del joven y los estudios especiales que haya realizado se deben de tener en cuenta durante el proceso de selección;",
          [
            it(
              "i.",
              "Los participantes deben tener el deseo sincero de ampliar su educación por medio de una experiencia en el extranjero."
            ),
          ],
          "Educación"
        ),
        it(
          "d.",
          "Todos los jóvenes deben de poder comunicarse bien en el idioma oficial del programa de CIJ en el que pretenden participar.",
          undefined,
          "Conocimiento de idiomas"
        ),
        it(
          "e.",
          "Los jóvenes deben demostrar madurez, tener una mentalidad abierta, ser independientes, seguros de sí mismos, y tener el deseo de aprender acerca de la forma de vida en otros países;",
          undefined,
          "Actitud"
        ),
        it(
          "f.",
          "La asociación alienta la participación de jóvenes discapacitados en los programas de CIJ. Se hará todo lo posible por tomar las medidas necesarias para que los jóvenes discapacitados puedan beneficiarse de la experiencia que ofrece el programa de CIJ. Los jóvenes discapacitados pueden participar en los programas, siempre y cuando reúnan los requisitos de dichos programas de CIJ;",
          [
            it(
              "i.",
              "Se debe saber si el joven tiene alguna enfermedad, alergias a ciertos alimentos, sustancias (polen, polvo o piel) o medicamentos, una necesidad regular o potencial de medicamentos y requisitos específicos de higiene o dieta dictados por obligaciones religiosas."
            ),
            it(
              "ii.",
              "Es importante que las necesidades religiosas de los jóvenes se comuniquen a todas las partes coordinadoras."
            ),
          ],
          "Salud"
        ),
        it(
          "g.",
          "Algunos campamentos piden que los participantes tengan conocimientos musicales o habilidades atléticas;",
          undefined,
          "Habilidades especiales"
        ),
        it(
          "h.",
          "Se dará preferencia a los jóvenes que no hayan participado todavía en un programa de CIJ.",
          undefined,
          "Participación previa"
        ),
        it(
          "i.",
          "Es imprescindible que tanto los padres como los jóvenes estén familiarizados con el programa de CIJ;",
          undefined,
          "Conocimiento del programa de CIJ"
        ),
        it(
          "j.",
          "Los jóvenes deben tener el deseo de contribuir al entendimiento internacional y de aprender acerca de otros modos de vida. Dichos motivos serán expresados en la carta de presentación que realizará cada solicitante.",
          undefined,
          "Motivos del solicitante"
        ),
        it(
          "k.",
          "Deberán comprobar por escrito que están completamente de acuerdo con la política del programa de CIJ.",
          [
            it(
              "i.",
              "Los padres o tutores serán responsables de tramitar y obtener oportunamente las autorizaciones migratorias y demás documentos legales requeridos para la salida del joven del territorio nacional, incluyendo el Formato de Autorización de Salida del País de Niñas, Niños y Adolescentes (Formato SAM) emitido por el Instituto Nacional de Migración, asegurando que dichos documentos se encuentren vigentes y disponibles al momento de realizar el viaje."
            ),
          ],
          "Consentimiento de los padres / tutores"
        ),
        it(
          "l.",
          "Los padres / tutores deben entender que tendrán la responsabilidad financiera final si ocurre alguna emergencia, enfermedad, accidente o gastos inesperados de su hijo/a y que no estén cubiertos por el seguro."
        ),
        it(
          "m.",
          "Los jóvenes participantes y sus familias se comprometen a recibir y hospedar a un participante extranjero que asista al campamento nacional del distrito múltiple B México, durante el periodo que les sea asignado por la organización del programa. Este compromiso forma parte de las responsabilidades inherentes a la participación en el Programa de Intercambio Juvenil."
        ),
      ], "Factores de selección"),
      it(
        "5.",
        "Cada individuo que desee asistir a un campamento juvenil remitirá una solicitud con una fotografía suya al asesor de CIJ de distrito que le corresponda.",
        [
          it(
            "a.",
            "La solicitud estará firmada por los Leones patrocinadores y, en la misma, el solicitante debe dejar constancia de que entiende y acepta los requisitos y el propósito del campamento."
          ),
          it(
            "b.",
            "La solicitud debe tener la aprobación del asesor de CIJ de distrito, quien verificará que la documentación requerida se encuentre completa y la remitirá al asesor nacional para su revisión y autorización."
          ),
          it(
            "c.",
            "Cada solicitante juvenil deberá incluir con su solicitud una carta de presentación personal a la posible familia anfitriona, y dicha carta debe incluir información sobre sus intereses, estudios y pasatiempos; miembros de la familia y su ocupación; comunidad de origen; viajes previos; expectativas del intercambio; requisitos dietéticos, de salud o religiosos. La carta deberá estar escrita en el idioma oficial del intercambio, previamente acordado."
          ),
        ]
      ),
      it(
        "6.",
        "Los campamentos podrán exigir el cumplimiento de otras reglas además de las establecidas en esta política."
      ),
    ],
  },
  {
    id: "orientacion",
    nivel: 4,
    titulo: "Orientación",
    items: [
      it(
        "1.",
        "Todos los participantes en el campamento se esforzarán por ser embajadores de buena voluntad para crear y fomentar un espíritu de entendimiento entre los pueblos del mundo."
      ),
      it(
        "2.",
        "Los Leones patrocinadores deben explicar detalladamente a todos los participantes los reglamentos gubernamentales referentes a pasaportes, visados, vacunas, seguro y regulaciones de aduana."
      ),
      it(
        "3.",
        "Se debe explicar a todos los solicitantes las leyes del país anfitrión, especialmente en lo que se refiere a la posesión de armas, bebidas alcohólicas y drogas."
      ),
      it(
        "4.",
        "Se realizará un taller de orientación al que deberán asistir los jóvenes participantes y sus padres o tutores, con la finalidad de explicar el propósito y los objetivos del Programa de Intercambio Juvenil y del Leonismo, así como revisar los aspectos relevantes del viaje, la estancia y las responsabilidades de los participantes. Se procurará que dicho taller se celebre durante la Tercera Junta del Consejo de Gobernadores, preferentemente de manera presencial."
      ),
    ],
  },
  {
    id: "preparativos-de-viaje",
    nivel: 4,
    titulo: "Preparativos de viaje",
    items: [
      it(
        "1.",
        "La Asociación Internacional de Clubes de Leones no hará planes ni será responsable de los arreglos de viaje."
      ),
      it(
        "2.",
        "Los planes de viaje del participante deberán tener el visto bueno arreglos de viaje del solicitante se comunicarán a los asesores de CIJ."
      ),
      it(
        "3.",
        "Los participantes deberán someter sus arreglos e itinerarios de viaje a la revisión y aprobación del asesor de CIJ de distrito y/o nacional antes de su confirmación definitiva."
      ),
      it(
        "4.",
        "Los cambios o cancelaciones inevitables se comunicarán de inmediato a los asesores de CIJ. Para reducir el número de cancelaciones de última hora, el comité de CIJ exige el pago de una cuota de garantía para asegurar el compromiso con el campamento juvenil. El candidato suplente debe cumplir con todos los requisitos del participante original."
      ),
      it(
        "5.",
        "No se permite que los participantes en los campamentos hagan viajes largos o se ausenten del campamento, a menos que hayan obtenido permiso por escrito y con un mes de antelación de cada una de las siguientes partes: padres / tutores del joven, clubes de Leones patrocinadores, asesor de CIJ nacional, asesor de CIJ del distrito anfitrión, director del campamento, club de Leones anfitrión y la familia anfitriona (si corresponde)."
      ),
    ],
  },
  {
    id: "arreglos-financieros",
    nivel: 4,
    titulo: "Arreglos financieros",
    items: [
      it(
        "1.",
        "La Asociación Internacional de Clubes de Leones no se hará cargo de ningún arreglo financiero."
      ),
      it("2.", "", [
        it(
          "a.",
          "Todos los gastos del viaje de ida y vuelta del joven desde su casa hasta el campamento deberán ser cubiertos por el participante y su familia."
        ),
        it(
          "b.",
          "El patrocinio de un participante por parte de un Club de Leones no implica obligación alguna de apoyo económico. No obstante, el club patrocinador podrá otorgar ayuda financiera total o parcial cuando disponga de los recursos y así lo acuerde con el participante y su familia."
        ),
        it(
          "c.",
          "Los gastos relacionados con el viaje incluyen el precio de los pasajes de ida y vuelta (transporte nacional e internacional), documentación, seguros, trámites migratorios, tasas de servicios de aeropuerto, aranceles de aduana y gastos derivados de escalas o estadías que surjan durante el viaje.",
          [
            it(
              "i.",
              "En aquellos casos en que el campamento o programa anfitrión establezca una cuota de participación, esta también formará parte de los gastos que el participante y su familia aceptan asumir."
            ),
            it(
              "ii.",
              "El asesor de ICJ distrital y/o nacional deberá informar oportunamente al participante, a sus padres o tutores y al Club de Leones patrocinador sobre la existencia y el monto de dichas cuotas antes de la presentación o envío de la solicitud correspondiente."
            ),
          ]
        ),
        it(
          "d.",
          "Todos los participantes en un campamento deben tener sus pasajes de ida y vuelta pagados y confirmados, así como los pasaportes y visados y certificados de salud que fueren necesarios."
        ),
        it(
          "e.",
          "Todos los participantes deberán adquirir una póliza de seguro de viaje que cubra desde su salida hasta su regreso."
        ),
        it(
          "f.",
          "La participación en el programa estará sujeta al pago de una cuota administrativa destinada a cubrir los gastos de operación del programa, materiales para los participantes, actividades de orientación y organización del campamento nacional.",
          [
            it(
              "i.",
              "La cuota de $3000.00 MXN deberá ser cubierta al iniciar el trámite y será distribuida de la siguiente manera:",
              [
                it("1.", "Paquete de participante ICJ (playera, pines, banderines): 50%"),
                it("2.", "Gastos administrativos del distrito múltiple B México: 25%"),
                it("3.", "Aportación para gastos del campamento nacional: 25%"),
              ]
            ),
            it(
              "ii.",
              "No se llevará a cabo ningún trámite mientras esta cuota no haya sido cubierta en su totalidad."
            ),
            it(
              "iii.",
              "Dicha cuota no será reembolsable bajo ninguna circunstancia.",
              [
                it(
                  "1.",
                  "En caso de que el participante decida cancelar su participación por motivos ajenos al programa, renuncie de manera voluntaria o incumpla los requisitos establecidos para su participación, perderá el derecho a la entrega del paquete de participante ICJ (playera, pines y banderines)."
                ),
                it(
                  "2.",
                  "Cuando la participación en el programa no pueda concretarse por razones administrativas, falta de aceptación por parte de los anfitriones, cancelación del programa o cualquier otra circunstancia ajena al participante, la cuota administrativa no será reembolsable, sin embargo, el participante tendrá derecho a recibir el paquete de participante ICJ."
                ),
              ]
            ),
            it(
              "iv.",
              "Los recursos obtenidos por concepto de cuotas administrativas serán administrados por un responsable financiero del ICJ del distrito múltiple B México, cuya función principal será la custodia de los fondos, el registro de ingresos y egresos, la conservación de los comprobantes correspondientes y la presentación de informes financieros."
            ),
            it(
              "v.",
              "Los recursos del programa deberán concentrarse en la cuenta destinada exclusivamente para la administración del programa del distrito múltiple B México. Los fondos y movimientos realizados deberán mantenerse debidamente documentados y disponibles para su revisión."
            ),
            it(
              "vi.",
              "La administración de los recursos se llevará a cabo bajo principios de transparencia y rendición de cuentas. Cada seis meses se presentará un informe financiero que incluya el detalle de los ingresos recibidos, los gastos efectuados, los comprobantes correspondientes y el saldo disponible. Dicho informe se pondrá a disposición del Consejo de Gobernadores y de los asesores de ICJ de los distritos para su revisión."
            ),
          ]
        ),
        it(
          "g.",
          "Los padres o tutores de los jóvenes deben aceptar de que tienen la responsabilidad de pagar cualquier gasto imprevisto o de emergencia que tengan que pagar los Leones anfitriones."
        ),
        it(
          "h.",
          "Los jóvenes participantes en un campamento internacional deben llevar consigo suficiente dinero para imprevistos, gastos médicos menores, compra de recuerdos o realización de actividades sociales no planificadas por los anfitriones."
        ),
      ], "Leones patrocinadores"),
      it("3.", "", [
        it(
          "a.",
          "Todos los gastos relacionados con las comidas y el alojamiento en el campamento y la hospitalidad del joven serán responsabilidad de los Leones anfitriones."
        ),
        it(
          "b.",
          "Los gastos relacionados con el campamento variarán según el programa planificado, los viajes, el campamento seleccionado y otros factores, pero deben mantenerse dentro de un mínimo razonable. Los métodos para financiar los campamentos juveniles incluirán:",
          [
            it(
              "i.",
              "Una cuota fija que deberán cubrir el participante y su familia, con o sin apoyo financiero por parte de los leones patrocinadores."
            ),
            it(
              "ii.",
              "Un porcentaje de la cuota de cada participante patrocinado por el distrito múltiple B México que inicia el trámite para participar en el programa ICJ."
            ),
            it("iii.", "Contribuciones voluntarias de benefactores."),
            it(
              "iv.",
              "Contribuciones para actividades culturales y educativas especiales que formen parte de la experiencia del campamento que proporciona el club anfitrión."
            ),
            it(
              "v.",
              "Los jóvenes participantes que acudan a un campamento en el distrito múltiple B México deberán traer consigo suficiente dinero para imprevistos, gastos médicos menores, compra de recuerdos o realización de actividades sociales no planificadas por los anfitriones."
            ),
          ]
        ),
      ], "Leones anfitriones"),
    ],
  },
  {
    id: "seguros-e-indemnizacion",
    nivel: 4,
    titulo: "Seguros e indemnización",
    items: [
      it(
        "1.",
        "El programa de Campamentos Juveniles y sus afiliados participantes están cubiertos por el seguro general de responsabilidad civil de la Asociación Internacional de Clubes de Leones. Es decir, el seguro general de responsabilidad civil de la Asociación probablemente respondería en caso de accidente o emergencia si un asesor de CIJ o afiliados del programa se consideraran responsables legalmente de los daños a otra parte."
      ),
      it(
        "2.",
        "Es responsabilidad del asesor de CIJ patrocinador y de los Leones patrocinadores verificar que los jóvenes cumplan el requisito de tener seguros de viaje, accidente, vida, propiedad personal, salud y responsabilidad civil para cubrir cualquier contingencia durante el programa de CIJ.",
        [
          it(
            "a.",
            "Es importante determinar este punto antes del viaje de los jóvenes. El asesor de CIJ patrocinador, los Leones anfitriones, los Leones patrocinadores y la familia anfitriona deben evaluar si existe la necesidad de tener más seguros en función de los riesgos relacionados con las actividades planificadas."
          ),
          it(
            "b.",
            "Los jóvenes tienen que cerciorarse de que su seguro de viaje incluya cobertura de transporte médico para el caso de que tengan que ser trasladados a su país de origen debido a una emergencia médica."
          ),
        ]
      ),
      it(
        "3.",
        "Independientemente de si se necesitan o no seguros adicionales, los jóvenes deben proporcionar al asesor de CIJ patrocinador, al club patrocinador, a los Leones coordinadores (si aplicara) y a la familia anfitriona todos los detalles específicos, como son los números de teléfono o sucursales locales de la compañía de seguros de los jóvenes para el caso de que surja una reclamación."
      ),
      it(
        "4.",
        "El club de leones patrocinador puede optar por obtener un documento de exención de responsabilidad de cada joven o, si fuera menor de edad, de los padres / tutores del joven.",
        [it("a.", "Esto debe formar parte de la solicitud del joven participante.")]
      ),
      it(
        "5.",
        "Si un distrito múltiple, distrito o club está organizando un campamento internacional, el asesor de CIJ anfitrión debe averiguar si necesita obtener una cobertura de seguro separada para el campamento mismo, los Leones participantes o las familias anfitrionas dependiendo de las actividades que se vayan a realizar en el campamento o intercambio.",
        [
          it(
            "a.",
            "Los costos de dicha cobertura de seguro podrán ser reembolsados a los organizadores del campamento a través de las tarifas del campamento."
          ),
        ]
      ),
    ],
  },
  {
    id: "emergencias",
    nivel: 4,
    titulo: "Situaciones y procedimientos de emergencia",
    items: [
      it(
        "1.",
        "Los Leones patrocinadores asumen la responsabilidad de los jóvenes durante el viaje de ida y vuelta al campamento. Los Leones anfitriones son también responsables por los jóvenes durante su estancia en el país anfitrión y en el campamento."
      ),
      it(
        "2.",
        "Los organizadores del campamento no están obligados a recibir ni hacer preparativos de viaje para ninguna persona o grupo que no sea participante oficial.",
        undefined,
        "Campistas no autorizados"
      ),
      it(
        "3.",
        "Está prohibido que los participantes se matriculen en centros de enseñanza o busquen empleo. Tampoco podrán pedir alojamiento a largo plazo ni conducir vehículos motorizados.",
        undefined,
        "Solicitudes personales"
      ),
      it(
        "4.",
        "El director del campamento y los Leones anfitriones deben prestar atención inmediata a cualquier participante que se accidente o se enferme.",
        [
          it(
            "a.",
            "En el caso de una enfermedad o accidente grave, se hará todo lo posible por comunicarse con los padres / tutores del joven para darles toda la información, incluyendo diagnósticos médicos y el tratamiento recomendado."
          ),
          it(
            "b.",
            "Todos los jóvenes participantes deben haber incluido en su solicitud un permiso escrito de los padres / tutores para que en caso de emergencia los participantes puedan recibir el tratamiento médico o quirúrgico que sea necesario."
          ),
          it(
            "c.",
            "Cada campamento tiene la obligación de hacer los arreglos necesarios para tener disponible atención médica y un médico con licencia."
          ),
        ],
        "Accidente o enfermedad"
      ),
      it(
        "5.",
        "Cada campamento se reservará el derecho de dar por terminada la participación de un joven por motivo de mala conducta.",
        [
          it(
            "a.",
            "En caso de que sea necesario expulsar a un joven del campamento, los padres / tutores serán informados de la medida y serán responsables de asumir los gastos en los que se incurra."
          ),
        ],
        "Medidas disciplinarias"
      ),
      it(
        "6.",
        "Cuando un participante ocasione un gasto sustancial e inesperado, se informará de inmediato a los padres / tutores del joven y a los Leones patrocinadores. Los padres o tutores asumirán la responsabilidad financiera de dichos gastos, incluidos aquellos derivados de emergencias, accidentes, enfermedades, daños ocasionados por el participante o cualquier otra situación imprevista no cubierta por los seguros correspondientes."
      ),
      it(
        "7.",
        "Deberán establecerse procedimientos de gestión de crisis para casos de emergencia, como puede ser un desastre natural y / o disturbios civiles o políticos."
      ),
    ],
  },
  {
    id: "intercambio-en-mexico",
    nivel: 3,
    titulo: "Intercambio juvenil en México",
  },
  {
    id: "familias-anfitrionas",
    nivel: 4,
    titulo: "Selección de familias anfitrionas",
    items: [
      it(
        "1.",
        "Los Leones anfitriones deben seleccionar a las posibles familias anfitrionas. Las posibles familias anfitrionas deben estar dispuestas a que se examinen varios aspectos de su hogar y situación familiar, a saber:",
        [
          it(
            "a.",
            "La familia debe tener contactos con jóvenes de edad similar a la del joven visitante. Es de desear, pero no es requisito, que haya jóvenes en la familia anfitriona.",
            undefined,
            "Edad"
          ),
          it(
            "b.",
            "Los rasgos de carácter y las actitudes de la familia anfitriona y sus integrantes que deben tenerse en cuenta son: comprensión, interés, mentalidad abierta, tolerancia y capacidad para comunicarse y/o tratar con prudencia a los jóvenes.",
            undefined,
            "Compatibilidad"
          ),
          it(
            "c.",
            "Es conveniente que uno o más miembros de la familia hablen el idioma del joven que se recibirá o el idioma oficial del campamento (inglés).",
            undefined,
            "Conocimiento de idiomas"
          ),
          it(
            "d.",
            "Es importante para que el intercambio tenga éxito que los miembros de la familia anfitriona estén familiarizados con el programa y la política del Intercambio Juvenil, así como sus propósitos y objetivos. Todos ellos deben entender y aceptar sus responsabilidades. Si se está considerando a una familia ajena al Leonismo, sus miembros deben estar bien informados del alcance y objetivos del Leonismo, y especialmente de la política y el programa de Intercambio Juvenil.",
            undefined,
            "Conocimiento del programa y la política de intercambio juvenil"
          ),
          it(
            "e.",
            "No es necesario que sean lujosas, pero deben ser adecuadas para recibir a una persona más en el hogar, sin que esto signifique incomodidades o cargas financieras.",
            undefined,
            "Condiciones de vida"
          ),
          it(
            "f.",
            "Durante la entrevista de selección debe determinarse la actitud familiar en relación con la nacionalidad del joven, idioma, religión, sexo, edad e intereses especiales.",
            undefined,
            "Preferencias familiares"
          ),
        ]
      ),
      it(
        "2.",
        "Los jóvenes mexicanos que desean participar en el programa de ICJ y sus familias se comprometen a recibir y hospedar a un participante extranjero que asista al campamento nacional del distrito múltiple B México, durante el periodo que les sea asignado por la organización del programa. Este compromiso forma parte de las responsabilidades inherentes a la participación en el Programa de Intercambio Juvenil."
      ),
    ],
  },
  {
    id: "acogida-de-visitante",
    nivel: 4,
    titulo: "Acogida de un visitante de intercambio juvenil",
    items: [
      it(
        "1.",
        "La acogida del visitante de intercambio juvenil es una actividad y una responsabilidad de los Leones anfitriones. Estas responsabilidades incluyen hacer los arreglos necesarios para la llegada y partida del joven, su bienestar personal, y el entretenimiento social y cultural durante la visita."
      ),
      it(
        "2.",
        "En caso de que surjan problemas o una incompatibilidad entre la familia anfitriona y el joven, los Leones anfitriones correspondientes deben estar preparados para organizar con tacto el traslado del joven a otra familia anfitriona que posea las cualificaciones necesarias (por esta razón se aconseja tener a disposición una o más familias alternativas)."
      ),
      it(
        "3.",
        "Si el problema es grave y no puede resolverse después que se hayan hecho todos los esfuerzos razonables en ese lugar, será necesario ponerse en contacto con los padres del joven visitante o, en algunos casos, con los Leones patrocinadores. Si se toma la decisión de que el joven debe regresar a su casa, sin consideración de culpabilidad, los Leones anfitriones correspondientes deben hacer los arreglos necesarios."
      ),
      it(
        "4.",
        "Si una familia anfitriona se retira del programa después de haberse comprometido a recibir a un visitante, el club de leones anfitrión tendrá la obligación de buscar una familia de reemplazo. Los Leones anfitriones harán todo lo posible por evitar que se cancelen visitas de intercambio."
      ),
      it(
        "5.",
        "El joven debe ser tratado como un miembro de la familia en la casa de la familia anfitriona. Esta relación puede ser totalmente distinta a la observada en la propia casa y familia del joven, pero debe hacerse en forma natural con los anfitriones. Uno de los objetivos del intercambio es el aprendizaje de nuevas costumbres y estilos de vida."
      ),
      it("6.", "", [
        it(
          "a.",
          "Es obligación tanto de los Leones anfitriones como de los Leones patrocinadores que realizan el intercambio juvenil, así como de los adultos y jóvenes participantes, familiarizarse con las costumbres y formas de vida de los países que intervienen en el programa, especialmente en lo que se refiere al país anfitrión."
        ),
        it(
          "b.",
          "Los Leones patrocinadores deben explicar detalladamente las reglamentaciones gubernamentales referentes a pasaportes, visas, vacunas, seguros y aduanas."
        ),
        it(
          "c.",
          "Se debe informar al joven visitante sus obligaciones con respecto a las leyes del país anfitrión. Esto es especialmente importante en lo que se refiere a la posesión de armas, bebidas alcohólicas, uso o posesión de narcóticos y todas las secciones de las leyes aplicables a los menores de ese país."
        ),
      ], "Preparación cultural"),
      it("7.", "", [
        it(
          "a.",
          "Si los Leones anfitriones pagan para cubrir alguna emergencia o gasto inesperado en el que incurra un participante, deberán informar de dicho gasto a los padres y Leones patrocinadores, con una explicación detallada del gasto, y solicitar su reembolso."
        ),
        it(
          "b.",
          "Todas las partes involucradas tratarán de resolver el asunto del reembolso con espíritu de completa ecuanimidad, comprensión y buena voluntad."
        ),
      ], "Procedimientos financieros de emergencia"),
    ],
  },
  {
    id: "cancelacion-y-disciplina",
    nivel: 4,
    titulo: "Cancelación de la participación y medidas disciplinarias",
    items: [
      it(
        "1.",
        "Los participantes deberán mantener en todo momento una conducta respetuosa, responsable y acorde con los valores del Leonismo durante todas las etapas de su participación en el Programa de Intercambio Juvenil, incluyendo los trámites de solicitud, entrevistas, talleres de orientación, actividades preparatorias, estancia con familias anfitrionas, participación en campamentos, actividades de intercambio, traslados y viaje de regreso a su lugar de origen."
      ),
      it(
        "2.",
        "El incumplimiento de las normas del programa, la realización de conductas que afecten la seguridad, bienestar o convivencia de los participantes, o cualquier comportamiento que perjudique la imagen del Programa de Intercambio Juvenil o de la Asociación Internacional de Clubes de Leones, podrá ser motivo de suspensión o cancelación de la participación, aun cuando ya se hubieran realizado reservas, pagos o trámites relacionados con el intercambio."
      ),
    ],
  },
  {
    id: "incumplimiento-de-requisitos",
    nivel: 4,
    titulo: "Incumplimiento de requisitos",
    items: [
      it(
        "1.",
        "La aceptación de un participante podrá ser cancelada cuando no entregue en los plazos establecidos la documentación requerida para el intercambio, incluyendo itinerarios de viaje, comprobantes de seguro, comprobantes de pago de cuotas o cualquier otro documento solicitado por los asesores del programa",
        [
          it(
            "a.",
            "El incumplimiento de estas obligaciones podrá ser considerado por los asesores al evaluar futuras solicitudes del participante o del Club de Leones patrocinador."
          ),
        ]
      ),
    ],
  },
  {
    id: "incumplimiento-durante",
    nivel: 4,
    titulo: "Incumplimiento durante el intercambio",
    items: [
      it(
        "1.",
        "El incumplimiento de las normas del programa, de las reglas establecidas por la familia anfitriona, el campamento o los organizadores del intercambio podrá dar lugar a la terminación anticipada de la participación del joven y, cuando proceda, a su regreso anticipado al país de origen."
      ),
      it(
        "2.",
        "Todos los gastos derivados de un regreso anticipado por incumplimiento de las normas serán responsabilidad del participante y de sus padres o tutores."
      ),
      it(
        "3.",
        "Dependiendo de la gravedad de los hechos, el participante podrá quedar inhabilitado para futuras participaciones en el Programa de Intercambio Juvenil."
      ),
      it(
        "4.",
        "Los participantes deberán respetar las fechas aprobadas para su participación en el intercambio. Cualquier modificación a los itinerarios, fechas de llegada, fechas de salida, extensiones de viaje o actividades adicionales deberá ser comunicada y autorizada previamente por los asesores de ICJ del distrito múltiple y del distrito patrocinador. La falta de notificación y autorización de modificaciones sustanciales podrá motivar la cancelación de la participación en el programa."
      ),
    ],
  },
  {
    id: "regreso-y-reporte",
    nivel: 4,
    titulo: "Regreso y reporte de la experiencia",
    items: [
      it(
        "1.",
        "A su regreso, será obligación del participante y de sus padres o tutores notificar su llegada al Asesor Nacional de Intercambio Juvenil, al Asesor Distrital correspondiente y al Club de Leones patrocinador."
      ),
      it(
        "2.",
        "Dentro de los 60 días naturales posteriores a su regreso, el participante deberá entregar un testimonio de su experiencia en el Programa de Intercambio Juvenil. Este podrá presentarse en cualquiera de las siguientes modalidades:",
        [
          it("a.", "Reporte escrito"),
          it("b.", "Presentación digital"),
          it("c.", "Video"),
          it(
            "d.",
            "Material audiovisual o informativo equivalente aprobado por el asesor de ICJ de distrito o del distrito múltiple B."
          ),
        ]
      ),
      it(
        "3.",
        "El material presentado deberá contener información sobre la experiencia vivida, las actividades realizadas, los aprendizajes obtenidos y las contribuciones del programa al entendimiento intercultural.",
        [
          it(
            "a.",
            "El participante autoriza que dicho material pueda ser utilizado por el Programa de Intercambio Juvenil del Distrito Múltiple B México para fines de promoción, orientación y capacitación, incluyendo su presentación en reuniones del Consejo de Gobernadores, talleres de orientación, sesiones informativas y otras actividades relacionadas con el programa."
          ),
        ]
      ),
      it(
        "4.",
        "La entrega de este material constituye una de las obligaciones del participante dentro del Programa de Intercambio Juvenil. El incumplimiento de esta disposición podrá ser considerado al evaluar futuras solicitudes de participación del joven, de sus familiares directos o del Club de Leones patrocinador."
      ),
    ],
  },
  {
    id: "fines-politicos",
    nivel: 4,
    titulo: "Programa de campamentos e intercambio juveniles con fines políticos",
    parrafos: [
      "Queda expresamente prohibido el uso del programa CIJ y de sus contactos o funciones para fines políticos.",
      "Cualquier situación, controversia o circunstancia no prevista en las presentes Políticas y Normas del Programa de Intercambio Juvenil será analizada y resuelta por el asesor de ICJ del distrito, en coordinación con el Presidente del Consejo de Gobernadores y en apego a las políticas y reglamentos vigentes de la Asociación Internacional de Clubes de Leones.",
      "Las presentes Políticas y Normas entrarán en vigor a partir de su aprobación por el Consejo de Gobernadores del Distrito Múltiple B México y permanecerán vigentes hasta que sean modificadas o sustituidas por una versión posterior debidamente aprobada.",
    ],
  },
];

export const ELABORACION =
  "Documento elaborado por la Asesoría Nacional de Campamentos e Intercambio Juvenil del Distrito Múltiple B México para el Período Leonístico 2026-2027.";

export const FIRMAS = [
  { cargo: "Presidente del Consejo de Gobernadores", nombre: "C.L. PDG. María Cristina Delgado De Manuet" },
  { cargo: "Asesor del programa de Campamentos e Intercambio Juveniles", nombre: "C.L. Jessica Rodríguez López" },
];

export const APROBACION = [
  { distrito: "B1", gobernador: "C.L. Francisco Javier Pérez Ramos", asesor: "C.L. Elsa Lynn Sueños (Secretario del Distrito B1, en ausencia de Asesor ICJ)" },
  { distrito: "B2", gobernador: "C.L. María Engracia Barbosa Rodríguez", asesor: "C.L. María Del Rosario Pérez Castaneda" },
  { distrito: "B3", gobernador: "C.L. Rosa María Alvarado Monroy", asesor: "C.L. Patricia Flores" },
  { distrito: "B4", gobernador: "C.L. Simón Gutiérrez Rosas", asesor: "C.L. José Ismael Huerta Ledesma" },
  { distrito: "B5", gobernador: "C.L. Martha Emilia Salazar de Chico", asesor: "C.L. Estefanía Martínez Ortiz" },
  { distrito: "B6", gobernador: "C.L. Héctor Manuel Álvarez Robledo", asesor: "C.L. Francisco José Gomez y Martinez" },
  { distrito: "B7", gobernador: "C.L. Amj Hilda Ortíz Hernández", asesor: "C.L. Alberto Valdez Gorrochotegui" },
  { distrito: "B8", gobernador: "C.L. Herminio García Noh", asesor: "C.L. Francisco García Arvizo" },
  { distrito: "B9", gobernador: "C.L. Gilberto Román Cruz Juárez", asesor: "C.L. Jesús Camacho Angulo" },
];
