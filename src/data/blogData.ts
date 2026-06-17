export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishDate: string;
  readTime: string;
  category: string;
  imageUrl: string;
  relatedServiceSlug: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "que-hacer-fuga-agua-casa",
    title: "Guía de Emergencia: ¿Qué hacer si tienes una fuga de agua en casa?",
    excerpt: "Descubre los pasos vitales que debes tomar inmediatamente si detectas una fuga de agua en tu vivienda para evitar daños mayores e inundaciones.",
    publishDate: "17 de Junio, 2026",
    readTime: "6 min de lectura",
    category: "Fontanería",
    imageUrl: "/blog/fuga-agua.svg",
    relatedServiceSlug: "fontanero-manzanares-el-real",
    content: `
      <p>Una fuga de agua en el hogar es una de las emergencias más estresantes y potencialmente destructivas que un propietario puede enfrentar. Ya sea una tubería rota bajo el fregadero, un goteo constante en el techo o, peor aún, una inundación repentina debido a la rotura de una bajante principal, actuar con rapidez y decisión es fundamental. La diferencia entre una reparación sencilla de fontanería y una reforma integral por daños estructurales y humedades suele ser cuestión de minutos.</p>
      
      <h2>1. El primer paso crucial: Cierra la llave de paso general</h2>
      <p>Ante cualquier indicio de fuga activa de agua, lo primero que debes hacer es detener el suministro. No pierdas tiempo intentando localizar la fisura exacta de la tubería mientras el agua sigue saliendo con presión. Dirígete inmediatamente a la <strong>llave de paso general</strong> de la vivienda.</p>
      <p>En la mayoría de pisos y casas de la Sierra de Madrid, esta llave suele encontrarse en:</p>
      <ul>
        <li>Bajo el fregadero de la cocina (cerca de la toma del lavavajillas o lavadora).</li>
        <li>En el cuarto de baño principal, oculta tras una pequeña compuerta metálica o de plástico.</li>
        <li>Cerca de la entrada principal de la vivienda o en el cuarto de contadores del edificio.</li>
      </ul>
      <p>Gira la llave en el sentido de las agujas del reloj (hacia la derecha) para cerrarla por completo. Si resides en un chalet o vivienda unifamiliar y la fuga está antes de tu llave general, tendrás que cerrar la llave de paso de la acometida exterior situada en la calle.</p>
      
      <h2>2. Corta la corriente eléctrica si el agua está cerca de enchufes</h2>
      <p>El agua y la electricidad forman una combinación extremadamente peligrosa. Si la filtración o la inundación se encuentra cerca de electrodomésticos, enchufes, interruptores o el propio cuadro eléctrico general, <strong>no toques nada mojado</strong>. Dirígete de inmediato al Cuadro General de Mando y Protección (CGMP) de tu vivienda y corta el interruptor general (IGA) o los diferenciales correspondientes a las zonas afectadas.</p>
      <p>Si el cuadro eléctrico se ha mojado o está goteando, no intentes manipularlo tú mismo bajo ningún concepto. Llama urgentemente a un profesional autorizado para que corte el suministro exterior de forma segura.</p>

      <h2>3. Drena las tuberías abriendo los grifos</h2>
      <p>Una vez cerrada la llave de paso general, todavía quedará agua acumulada con presión dentro de las tuberías de la casa. Para vaciar los circuitos y aliviar esa presión residual, abre los grifos que estén en los puntos más bajos de la casa (como el bidé o los grifos del jardín) y deja que corra el agua hasta que se detenga el flujo. Esto evitará que el agua acumulada siga saliendo por el punto de la fuga.</p>

      <h2>4. Recoge el agua acumulada y ventila</h2>
      <p>Con el suministro cerrado y las tuberías drenadas, es hora de minimizar los daños materiales. Retira los muebles, alfombras, aparatos electrónicos y objetos de valor de la zona afectada. Utiliza cubos, fregonas y toallas para absorber la mayor cantidad de agua posible.</p>
      <p>Si la fuga ha afectado a los techos o paredes de yeso, pon recipientes debajo para recoger el goteo continuo. Abre las ventanas para iniciar el proceso de ventilación y secado de inmediato; esto es vital para evitar la aparición de moho negro y malos olores estructurales que son difíciles de eliminar más adelante.</p>

      <h2>5. Llama a un fontanero urgente autorizado</h2>
      <p>Una vez estabilizada la situación de emergencia, es momento de llamar a un servicio profesional calificado. Intentar reparar una tubería rota con parches de cinta adhesiva o masillas rápidas suele ser una solución temporal que tarde o temprano vuelve a fallar con consecuencias peores.</p>
      <p>En <strong>Reparaciones Manzanares</strong> contamos con equipos de fontanería de urgencia distribuidos estratégicamente en la Sierra de Madrid (Manzanares el Real, Soto, Colmenar Viejo, etc.). Nos desplazamos en un tiempo promedio de 15 a 30 minutos con herramientas de última tecnología como cámaras de inspección y localizadores de fugas por ultrasonido, lo que nos permite reparar la avería sin picar paredes innecesariamente y garantizando el trabajo por escrito.</p>
      <p>Recuerda que si dispones de seguro de hogar, es fundamental realizar fotografías detalladas del origen de la fuga y de todos los daños causados a muebles o enseres para agilizar la reclamación y la cobertura de los gastos de fontanería e indemnizaciones por siniestro.</p>
    `
  },
  {
    slug: "cuanto-cuesta-fontanero-urgente-madrid",
    title: "¿Cuánto cuesta un fontanero urgente? Tarifas y precios en 2026",
    excerpt: "Guía detallada sobre los precios reales de los servicios de fontanería de urgencia en la Comunidad de Madrid para evitar cobros abusivos.",
    publishDate: "17 de Junio, 2026",
    readTime: "5 min de lectura",
    category: "Fontanería",
    imageUrl: "/blog/precios-fontanero.svg",
    relatedServiceSlug: "fontanero-manzanares-el-real",
    content: `
      <p>Una de las mayores preocupaciones al sufrir una avería en casa es la temida factura. Existe la creencia popular de que llamar a un fontanero de urgencia equivale a pagar un precio desorbitado. Aunque es cierto que los servicios de emergencia tienen tarifas especiales debido a la disponibilidad inmediata y los horarios nocturnos o festivos, no deberían suponer un abuso de confianza.</p>
      <p>En esta guía desglosamos detalladamente las tarifas promedio, los factores que influyen en el coste y cómo asegurarte de pagar un precio justo en la Comunidad de Madrid y la Sierra de Guadarrama durante este año 2026.</p>

      <h2>1. ¿Qué conceptos componen la tarifa de un fontanero?</h2>
      <p>Al contratar un servicio de fontanería urgente, el importe total de la factura suele desglosarse en los siguientes factores:</p>
      <ul>
        <li><strong>Desplazamiento:</strong> Es el coste de traslado del técnico hasta el domicilio. Suele oscilar entre 20€ y 50€ según la distancia, aunque algunas empresas locales de confianza lo ofrecen gratis si aceptas el presupuesto de reparación.</li>
        <li><strong>Mano de obra (Tarifa base o por horas):</strong> En servicios ordinarios se cobra por horas. En servicios de urgencia, se suele aplicar una tarifa fija de salida de emergencia que incluye el diagnóstico o la primera hora de mano de obra.</li>
        <li><strong>Suplemento de horario:</strong> Depende de cuándo se solicita el servicio. Los suplementos típicos son por horario nocturno (de 20:00 a 8:00) o por festivos/fines de semana, aumentando el coste entre un 30% y un 50% sobre la tarifa base.</li>
        <li><strong>Materiales y repuestos:</strong> El coste de las piezas necesarias (tuberías, llaves de escuadra, sifones, mecanismos de cisterna, etc.).</li>
      </ul>

      <h2>2. Tarifas promedio en Madrid y Zona Sierra (2026)</h2>
      <p>Para que sirva de referencia, estos son los rangos de precios habituales de mercado para las intervenciones más comunes:</p>
      <table style="width:100%; border-collapse: collapse; margin: 1.5rem 0; text-align: left;">
        <thead>
          <tr style="border-bottom: 2px solid #CBD5E1; background-color: #F8FAFC;">
            <th style="padding: 0.75rem;">Servicio / Tipo de avería</th>
            <th style="padding: 0.75rem;">Horario Comercial</th>
            <th style="padding: 0.75rem;">Urgente / Nocturno</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 0.75rem; font-weight: 600;">Desatasco sencillo (fregadero/lavabo)</td>
            <td style="padding: 0.75rem;">60€ - 90€</td>
            <td style="padding: 0.75rem;">110€ - 160€</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 0.75rem; font-weight: 600;">Cambio de grifo o llave de paso</td>
            <td style="padding: 0.75rem;">70€ - 110€</td>
            <td style="padding: 0.75rem;">120€ - 180€</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 0.75rem; font-weight: 600;">Reparación de cisterna de WC</td>
            <td style="padding: 0.75rem;">65€ - 95€</td>
            <td style="padding: 0.75rem;">115€ - 165€</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 0.75rem; font-weight: 600;">Reparación de tubería rota (con soldadura)</td>
            <td style="padding: 0.75rem;">90€ - 150€</td>
            <td style="padding: 0.75rem;">160€ - 240€</td>
          </tr>
          <tr style="border-bottom: 1px solid #E2E8F0;">
            <td style="padding: 0.75rem; font-weight: 600;">Localización de fuga oculta por ultrasonido</td>
            <td style="padding: 0.75rem;">150€ - 250€</td>
            <td style="padding: 0.75rem;">220€ - 320€</td>
          </tr>
        </tbody>
      </table>

      <h2>3. ¿Por qué varía el precio entre empresas?</h2>
      <p>Si pides varios presupuestos, notarás diferencias notables. La principal causa es el uso de <strong>intermediarios</strong>. Muchas de las empresas que aparecen en los primeros puestos de Google de forma genérica son multinacionales de reparaciones o multiservicios que subcontratan a autónomos locales. Estas agencias cobran comisiones muy altas que encarecen el precio final entre un 40% y un 60%.</p>
      <p>Llamar a un profesional o equipo autónomo local, como <strong>Reparaciones Manzanares</strong>, elimina los costes de intermediación, garantizando un trato más honesto y precios más económicos debido a la cercanía geográfica.</p>

      <h2>4. Consejos para evitar estafas y cobros abusivos</h2>
      <p>Para evitar malas experiencias al solicitar asistencia urgente, sigue siempre estas recomendaciones básicas:</p>
      <ol>
        <li><strong>Exige siempre un presupuesto antes de empezar:</strong> Por ley, los técnicos deben facilitarte un presupuesto por escrito o verbal claro antes de realizar cualquier intervención. No permitas que empiecen a picar o soldar sin saber cuánto costará.</li>
        <li><strong>Describe bien la avería por teléfono:</strong> Envía fotos o vídeos cortos por WhatsApp si es posible. Un buen profesional sabrá darte un precio aproximado o un rango cerrado con esos detalles.</li>
        <li><strong>Cuidado con las tarifas excesivamente baratas por teléfono:</strong> Algunas webs fraudulentas anuncian "visita a 19€" para conseguir entrar en tu domicilio y luego cobrar cientos de euros en conceptos inventados. La transparencia total desde el primer contacto es la mejor señal de confianza.</li>
        <li><strong>Pide siempre factura legal:</strong> La factura es tu único documento de garantía legal ante cualquier reclamación o para tramitar el reembolso con tu seguro de hogar.</li>
      </ol>
    `
  },
  {
    slug: "por-que-salta-diferencial",
    title: "¿Por qué salta el diferencial y cómo localizar la avería eléctrica?",
    excerpt: "Aprende a diagnosticar paso a paso por qué salta el diferencial de tu cuadro eléctrico y cómo identificar el aparato defectuoso antes de llamar a un electricista.",
    publishDate: "17 de Junio, 2026",
    readTime: "5 min de lectura",
    category: "Electricidad",
    imageUrl: "/blog/diferencial-salta.svg",
    relatedServiceSlug: "electricista-manzanares-el-real",
    content: `
      <p>Estás tranquilamente en casa y de repente... oscuridad total. Vas al cuadro eléctrico general y ves que una de las palancas, concretamente el **diferencial**, se ha bajado. Intentas subirla pero vuelve a saltar inmediatamente con un chasquido. ¿Te suena esta situación?</p>
      <p>Que salte el diferencial es uno de los problemas eléctricos domésticos más comunes, pero también de los más molestos. En esta guía te explicamos de forma sencilla qué es este elemento, por qué salta y cómo puedes localizar el origen de la avería tú mismo en cinco minutos.</p>

      <h2>1. ¿Qué es el diferencial y para qué sirve?</h2>
      <p>El interruptor diferencial (fácilmente identificable en tu cuadro porque lleva un pequeño botón de test marcado con una "T") no sirve para proteger tus electrodomésticos, sino para **proteger tu vida**. Su función es medir constantemente la corriente que entra y sale de tu casa. Si detecta una diferencia mínima (por ejemplo, porque el agua o un cable pelado están desviando electricidad hacia la toma de tierra o a través del cuerpo de una persona), el diferencial se corta al instante para evitar una electrocución.</p>
      <p>Por tanto, cuando salta, no es un capricho: está realizando su función de seguridad ante una anomalía peligrosa en tu instalación.</p>

      <h2>2. Causas comunes por las que salta el diferencial</h2>
      <p>Los motivos principales que provocan el disparo del diferencial son:</p>
      <ul>
        <li><strong>Derivación a tierra de un electrodoméstico:</strong> Es la causa más frecuente. La resistencia del lavavajillas, el motor de la lavadora, el termo eléctrico de agua o la nevera sufren un desgaste de aislamiento y desvían corriente.</li>
        <li><strong>Presencia de humedad:</strong> Filtraciones de agua en paredes que alcanzan cables, condensación en enchufes exteriores del patio o jardín, o goteos directos sobre puntos de luz.</li>
        <li><strong>Fallo del propio diferencial:</strong> Con el paso de los años, los mecanismos internos se deterioran y se vuelven demasiado sensibles, saltando sin que exista una avería real.</li>
        <li><strong>Sobrecarga armónica o parásitos de la red:</strong> Frecuente si tienes muchos aparatos electrónicos modernos de alta frecuencia (ordenadores, cargadores) en una instalación antigua sin diferencial superinmunizado.</li>
      </ul>

      <h2>3. Método de descarte paso a paso para localizar el fallo</h2>
      <p>Para saber exactamente qué está fallando en tu instalación sin necesidad de herramientas técnicas, sigue este sencillo protocolo de exclusión:</p>
      <ol>
        <li><strong>Baja todos los magnetotérmicos (PIAs):</strong> En el cuadro eléctrico verás varias palancas pequeñas al lado del diferencial. Bájalas todas.</li>
        <li><strong>Sube el interruptor diferencial:</strong> Con todas las demás palancas bajadas, intenta subir el diferencial. Si sigue saltando incluso con todo lo demás bajado, el propio diferencial está roto y debe ser sustituido por un electricista. Si sube y se mantiene arriba, el problema está en los circuitos individuales de la casa.</li>
        <li><strong>Ve subiendo los magnetotérmicos de uno en uno:</strong> Sube la primera palanca pequeña. ¿Sigue arriba el diferencial? Perfecto. Sube la segunda... continúa así hasta que, al subir una palanca concreta, el diferencial salte de golpe.</li>
        <li><strong>Identifica el circuito problemático:</strong> La palanca que ha hecho saltar el diferencial te indica qué zona o circuito tiene la avería (por ejemplo, los enchufes de la cocina, las luces del salón o la línea exterior del jardín).</li>
        <li><strong>Desconecta los aparatos de ese circuito:</strong> Ve a la zona afectada e identifica todos los aparatos enchufados a esa línea. Desenchúfalos físicamente de la pared (neveras, microondas, regletas, bombillas).</li>
        <li><strong>Vuelve a activar el circuito en el cuadro:</strong> Con todo desenchufado en esa zona, vuelve a subir la palanca que fallaba. Si ahora no salta, el problema no está en las paredes, sino en uno de los aparatos que has desenchufado. Ve enchufándolos uno a uno hasta que encuentres el defectuoso.</li>
      </ol>

      <h2>4. ¿Cuándo es necesario llamar a un electricista autorizado?</h2>
      <p>Si tras realizar el descarte, el diferencial sigue saltando incluso con todo desenchufado, o si localizas que el origen es humedad dentro de las paredes o un fallo directo en el cuadro general, necesitas asistencia profesional. Manipular los cables internos del cuadro eléctrico sin conocimientos técnicos conlleva un alto riesgo de accidente grave e incendio.</p>
      <p>En <strong>Reparaciones Manzanares</strong> contamos con electricistas autorizados por la Comunidad de Madrid disponibles las 24 horas del día. Diagnosticamos derivaciones ocultas con analizadores de aislamiento avanzados, instalamos diferenciales superinmunizados de primera marca y reparamos instalaciones con rapidez y total garantía de seguridad.</p>
    `
  },
  {
    slug: "revision-anual-caldera-obligatoria",
    title: "Revisión anual de caldera: qué incluye y por qué es obligatoria",
    excerpt: "Todo lo que necesitas saber sobre la revisión de caldera obligatoria según la ley RITE, plazos, costes y diferencias con la inspección del gas.",
    publishDate: "17 de Junio, 2026",
    readTime: "6 min de lectura",
    category: "Calderas",
    imageUrl: "/blog/revision-caldera.svg",
    relatedServiceSlug: "reparacion-calderas-manzanares-el-real",
    content: `
      <p>Con la llegada del otoño y las bajas temperaturas en la Sierra de Madrid, la caldera se convierte en el corazón de nuestros hogares. Mantenerla en perfecto estado de funcionamiento es una cuestión de confort, pero también de **seguridad y legalidad**. El monóxido de carbono (CO) derivado de una mala combustión de una caldera de gas o gasoil es indetectable al ojo humano y extremadamente peligroso.</p>
      <p>En esta guía práctica te explicamos con total claridad qué dice la ley sobre las revisiones de caldera, cuánto cuestan, cada cuánto tiempo debes pasarlas y cómo diferenciar este servicio de la inspección periódica de la compañía distribuidora de gas.</p>

      <h2>1. ¿Cada cuánto tiempo es obligatoria la revisión de la caldera?</h2>
      <p>Según el Reglamento de Instalaciones Térmicas en los Edificios (RITE), los plazos obligatorios de revisión para aparatos de calefacción varían según el tipo de combustible y la potencia del equipo:</p>
      <ul>
        <li><strong>Calderas de gas domésticas (hasta 70 kW):</strong> Obligatorio pasarse **cada 2 años**. (Nota: Aunque la ley marque cada 2 años, la mayoría de fabricantes recomiendan un mantenimiento anual para conservar la garantía oficial del aparato).</li>
        <li><strong>Calderas de gasoil domésticas (hasta 70 kW):</strong> Obligatorio pasarse **todos los años** (anual), debido a que el gasoil genera más hollín y residuos de combustión.</li>
        <li><strong>Calderas de pellets / biomasa:</strong> Obligatorio pasarse **todos los años** (anual).</li>
        <li><strong>Calentadores de agua caliente (sin calefacción):</strong> Obligatorio **cada 5 años**.</li>
      </ul>

      <h2>2. Diferencias críticas: Revisión de Caldera vs. Inspección del Gas</h2>
      <p>Es muy común confundir estos dos trámites obligatorios, lo que suele dar pie a timos o duplicidad de costes. Te explicamos las diferencias clave:</p>
      
      <h3>La Inspección Periódica del Gas (Distribuidora)</h3>
      <p>Es obligatoria **cada 5 años**. La organiza la empresa distribuidora de gas de tu zona (como Nedgia o Madrileña Red de Gas), avisándote con semanas de antelación. Su función es comprobar la seguridad general de la instalación receptora común (tuberías, ventilación, contador, llaves de corte). Su coste se cobra obligatoriamente **a través de la factura del gas**, nunca en efectivo ni tarjeta al técnico en el domicilio.</p>
      
      <h3>La Revisión de la Caldera (Servicio Técnico)</h3>
      <p>Es la revisión de la máquina propiamente dicha (quemador, presiones, rendimientos). Es obligatoria **cada 1 o 2 años** (según combustible) y la responsabilidad de contratarla recae en ti. Puedes elegir libremente el servicio técnico oficial de la marca o una empresa mantenedora de calefacción autorizada independiente. Esta revisión sí se abona directamente al profesional autorizado al finalizar el servicio.</p>

      <h2>3. ¿Qué tareas incluye una revisión de caldera RITE profesional?</h2>
      <p>Un mantenimiento de caldera de calidad no consiste únicamente en pasar un trapo húmedo y mirar que encienda. Según normativa, el técnico certificado debe realizar:</p>
      <ol>
        <li><strong>Limpieza de quemadores e intercambiadores:</strong> Eliminación de polvo, óxido e incrustaciones que reducen la transferencia térmica y aumentan el consumo de combustible.</li>
        <li><strong>Verificación de estanqueidad de gas:</strong> Comprobación de que no hay fugas de gas ni en la máquina ni en los conductos de conexión.</li>
        <li><strong>Análisis de combustión y humos:</strong> Introducción de una sonda en la chimenea para verificar la proporción de CO2 y asegurar que la emisión de Monóxido de Carbono (CO) está dentro de los límites de seguridad legales.</li>
        <li><strong>Comprobación de elementos de seguridad:</strong> Vaso de expansión, válvula de seguridad contra sobrepresiones, termostatos de límite y sondas de ionización.</li>
        <li><strong>Regulación de presiones y purgado:</strong> Ajuste de la presión de agua del circuito (debe estar entre 1.0 y 1.5 bar) y verificación de los radiadores.</li>
        <li><strong>Emisión de certificado oficial:</strong> Al finalizar, el técnico debe entregarte por escrito el boletín o certificado oficial de mantenimiento RITE, el cual debes guardar ante posibles inspecciones o reclamaciones al seguro de hogar.</li>
      </ol>

      <h2>4. Precios de la revisión y cómo contratar</h2>
      <p>La tarifa promedio para una revisión estándar RITE en la Sierra de Madrid oscila entre **85€ y 130€** según el tipo de caldera (el gasoil suele ser ligeramente más costoso por las limpiezas de boquillas y filtros). Desconfía de ofertas sospechosas de "revisión a 40€", ya que a menudo se utilizan como gancho para diagnosticar fallos falsos en la caldera con el fin de cobrar por piezas de repuesto caras.</p>
      <p>En <strong>Reparaciones Manzanares</strong> somos servicio técnico multimarca autorizado RITE para instalaciones de climatización y calefacción. Realizamos revisiones meticulosas, entregamos certificaciones legales oficiales en el acto y limpiamos en profundidad tu caldera para que ahorres hasta un 15% en tu factura de gas mensual.</p>
    `
  }
];
