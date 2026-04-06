export const locations = [
  "Manzanares el Real",
  "Colmenar Viejo",
  "Collado Villalba",
  "Moralzarzal",
  "Alpedrete",
  "Guadarrama",
  "Cerceda",
  "El Boalo",
  "Mataelpino",
  "Becerril de la Sierra",
  "Navacerrada",
  "Cercedilla",
  "Los Molinos",
  "Miraflores de la Sierra",
  "Soto del Real"
];

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface Service {
  id: string;
  name: string;
  title: string;
  slugBase: string;
  emoji: string;
  description: string;
  longDescription: string[];
  tasks: string[];
  faqs: ServiceFAQ[];
}

export const services: Service[] = [
  {
    id: "fontaneria",
    name: "Fontanería",
    title: "Fontanero Urgente",
    slugBase: "fontanero",
    emoji: "💧",
    description: "Servicio rápido de fontanería: desatascos, fugas de agua, cambio de grifería y sanitarios.",
    longDescription: [
      "Las averías de fontanería no avisan y pueden causar daños muy costosos en cuestión de minutos. Una tubería rota, una fuga oculta o un atasco severo en plena madrugada requieren la intervención inmediata de un profesional con experiencia y las herramientas adecuadas.",
      "Nuestros fontaneros recorren a diario los municipios de la Sierra de Madrid con furgonetas equipadas con cámaras de inspección, máquinas de desatasco de alta presión, detectores de fugas por ultrasonido y todo el material necesario para resolver la mayoría de las averías en una sola visita, sin necesidad de segundos desplazamientos.",
      "Trabajamos tanto en viviendas particulares como en comunidades de vecinos, locales comerciales y chalets. Realizamos desde reparaciones puntuales hasta reformas integrales de baño y cocina, siempre con materiales de primeras marcas y garantía por escrito en cada intervención.",
      "Antes de tocar nada, te explicamos el problema, te damos un presupuesto cerrado y solo empezamos a trabajar cuando lo aceptas. Sin sorpresas, sin letra pequeña. Así trabajamos desde hace más de 15 años en la zona."
    ],
    tasks: [
      "Detección y reparación de fugas de agua ocultas",
      "Desatascos con maquinaria profesional de alta presión",
      "Cambio de grifería, cisternas y sanitarios",
      "Reparación y sustitución de tuberías (cobre, PVC, multicapa)",
      "Solución de humedades por filtraciones",
      "Instalación de termos eléctricos y calentadores",
      "Reformas integrales de baño y cocina",
      "Averías urgentes 24 horas"
    ],
    faqs: [
      {
        q: "¿Cómo puedo saber si tengo una fuga de agua oculta en casa?",
        a: "Las señales más comunes son: manchas de humedad en paredes o techos, olor a moho persistente, aumento inexplicable en la factura del agua, o ruido de agua corriendo cuando todos los grifos están cerrados. Nuestros fontaneros utilizan equipos de detección por ultrasonido y cámaras termográficas para localizar la fuga exacta sin necesidad de romper paredes innecesariamente."
      },
      {
        q: "¿Cuánto cuesta arreglar un atasco en las tuberías?",
        a: "El precio depende de la gravedad del atasco y su ubicación. Un desatasco sencillo de fregadero o lavabo suele oscilar entre 60€ y 90€. Los atascos en bajantes o arquetas principales pueden requerir maquinaria de alta presión y su coste varía entre 120€ y 250€. Siempre damos presupuesto cerrado antes de empezar."
      },
      {
        q: "¿Hacéis reformas de baño completas?",
        a: "Sí, realizamos reformas integrales de baño y cocina: cambio de sanitarios, bañera por plato de ducha, alicatado, instalación de grifería, muebles de baño y toda la fontanería necesaria. Trabajamos con materiales de primeras marcas como Roca, Grohe y Tres, y damos garantía por escrito de toda la instalación."
      },
      {
        q: "¿Se puede reparar una tubería sin romper la pared?",
        a: "En muchos casos sí. Disponemos de técnicas de reparación sin obra como el encamisado de tuberías y la soldadura de parcheo, que permiten reparar tramos dañados o con fugas sin necesidad de picar azulejos. Primero inspeccionamos con cámara y te proponemos la solución menos invasiva posible."
      }
    ]
  },
  {
    id: "electricidad",
    name: "Electricidad",
    title: "Electricista Urgente",
    slugBase: "electricista",
    emoji: "⚡",
    description: "Solución a apagones, cortocircuitos, cuadros eléctricos y boletines oficiales.",
    longDescription: [
      "Un problema eléctrico no es solo una molestia: puede ser un riesgo real para la seguridad de tu familia. Los cortocircuitos, las sobrecargas y las instalaciones antiguas son la primera causa de incendios domésticos en España. Por eso, cualquier anomalía eléctrica debe ser diagnosticada y reparada por un electricista autorizado.",
      "Nuestros electricistas cuentan con el carné oficial de instalador autorizado de la Comunidad de Madrid y están capacitados para emitir boletines eléctricos, certificados de instalación y toda la documentación necesaria para legalizar tu instalación ante Industria.",
      "Atendemos desde una simple avería en un enchufe hasta la renovación completa de la instalación eléctrica de una vivienda antigua. Instalamos cuadros eléctricos modernos con protecciones diferenciales, magnetotérmicos y sobretensiones, garantizando que tu hogar cumple con el Reglamento Electrotécnico de Baja Tensión (REBT) vigente.",
      "También somos especialistas en iluminación LED eficiente, puntos de recarga para vehículos eléctricos, y automatización del hogar. Presupuesto previo, garantía oficial y limpieza absoluta del área de trabajo."
    ],
    tasks: [
      "Localización y reparación de cortocircuitos",
      "Solución a apagones y saltos del diferencial",
      "Sustitución y modernización de cuadros eléctricos",
      "Emisión de boletines eléctricos oficiales (CIE)",
      "Instalación de iluminación LED interior y exterior",
      "Puntos de recarga para vehículos eléctricos",
      "Cableado y nuevas líneas eléctricas",
      "Revisión de instalaciones eléctricas antiguas"
    ],
    faqs: [
      {
        q: "¿Por qué salta el diferencial continuamente en mi casa?",
        a: "Las causas más comunes son: un electrodoméstico con derivación a tierra (lavadora, lavavajillas o termo suelen ser los culpables), humedad en algún punto de la instalación, o un diferencial antiguo demasiado sensible. Nuestro electricista realiza un diagnóstico completo del circuito para aislar la causa exacta y solucionarla de forma definitiva."
      },
      {
        q: "¿Necesito un boletín eléctrico? ¿Cuánto cuesta?",
        a: "El boletín eléctrico (Certificado de Instalación Eléctrica) es obligatorio para contratar o ampliar la potencia con tu compañía eléctrica, y también para vender o alquilar una vivienda. El precio parte desde 150€ si la instalación cumple normativa. Si requiere adaptaciones previas, te damos presupuesto detallado de lo necesario."
      },
      {
        q: "¿Es seguro que mi casa tenga enchufes sin toma de tierra?",
        a: "No. La toma de tierra es una protección básica obligatoria que desvía las corrientes de fuga para protegerte de descargas eléctricas. Si tu vivienda es anterior a 1973, es probable que carezca de ella. Podemos instalarla o verificar su correcto funcionamiento para que cumpla la normativa vigente."
      },
      {
        q: "¿Podéis instalar un punto de recarga para coche eléctrico en un garaje comunitario?",
        a: "Sí. Realizamos instalaciones de punto de recarga tanto en garajes comunitarios como individuales, cumpliendo la normativa ITC-BT-52. Nos encargamos de todo: estudio de la instalación, tramitación del boletín, e instalación del cargador. Trabajamos con las principales marcas como Wallbox, Schneider y ABB."
      }
    ]
  },
  {
    id: "calderas",
    name: "Calderas",
    title: "Reparación de Calderas",
    slugBase: "reparacion-calderas",
    emoji: "🔥",
    description: "Servicio técnico multimarca: mantenimiento y reparación de calderas de gas, gasoil y biomasa.",
    longDescription: [
      "Quedarse sin calefacción ni agua caliente en pleno invierno en la Sierra de Madrid, donde las temperaturas pueden bajar de -5°C, es una emergencia real. Por eso ofrecemos servicio de reparación de calderas las 24 horas, los 365 días del año, para que nunca pases frío más tiempo del necesario.",
      "Somos servicio técnico multimarca: reparamos y realizamos mantenimiento de calderas Saunier Duval, Junkers (Bosch), Vaillant, Ferroli, Roca, Baxi, Cointra, Ariston, Beretta y muchas más. Nuestros técnicos se forman continuamente con los fabricantes para conocer los últimos modelos y sus códigos de error específicos.",
      "Además de reparaciones, realizamos la revisión anual obligatoria de tu caldera de gas según el RITE (Reglamento de Instalaciones Térmicas en los Edificios). Esta revisión incluye análisis de combustión, verificación de estanqueidad, limpieza de quemador y comprobación de seguridades. Te entregamos el certificado oficial necesario para tu compañía de gas.",
      "Si tu caldera ya no tiene reparación o tiene más de 15 años, te asesoramos sobre el modelo más eficiente para tu vivienda, gestionamos las subvenciones disponibles (Plan Renove CAM) y realizamos la instalación completa con puesta en marcha y legalización."
    ],
    tasks: [
      "Reparación de errores y averías en calderas de gas",
      "Mantenimiento anual obligatorio con certificado oficial",
      "Cambio e instalación de calderas nuevas (gas, gasoil, biomasa)",
      "Puesta a punto y limpieza de quemadores",
      "Sustitución de piezas: intercambiadores, bombas, placas electrónicas",
      "Reparación de radiadores y circuitos de calefacción",
      "Instalación de termostatos inteligentes",
      "Asesoramiento en subvenciones Plan Renove"
    ],
    faqs: [
      {
        q: "¿Es obligatorio pasar la revisión anual de la caldera?",
        a: "Sí. Según el RITE, todas las calderas de gas deben pasar una revisión anual obligatoria realizada por un técnico autorizado. Esta revisión es necesaria para mantener la garantía del fabricante, para que tu seguro de hogar cubra posibles daños, y para cumplir con la normativa de tu compañía de gas. Nosotros te entregamos el certificado oficial tras cada revisión."
      },
      {
        q: "Mi caldera muestra un código de error, ¿qué hago?",
        a: "Lo primero es anotar el código exacto que aparece en la pantalla de la caldera. Puedes llamarnos al 669 162 085 y darnos ese código: en muchos casos podemos orientarte por teléfono sobre si es algo que puedes resetear tú mismo o si necesita visita técnica. Nunca intentes manipular la caldera por tu cuenta más allá de un simple reseteo."
      },
      {
        q: "¿Cuánto cuesta cambiar una caldera completa?",
        a: "El precio de sustitución de una caldera depende del modelo elegido y la complejidad de la instalación. Una caldera estanca de condensación de gama media-alta (Saunier Duval, Junkers) instalada y legalizada suele costar entre 1.800€ y 2.500€. En muchos casos puedes beneficiarte del Plan Renove de la Comunidad de Madrid con descuentos de hasta 500€."
      },
      {
        q: "¿Reparáis calderas de gasoil y biomasa?",
        a: "Sí. Además de calderas de gas natural y butano, reparamos y mantenemos calderas de gasoil (muy comunes en chalets de la sierra) y sistemas de biomasa (pellets, leña). Disponemos de las herramientas específicas y recambios habituales para estas tecnologías."
      }
    ]
  },
  {
    id: "cerrajeria",
    name: "Cerrajería",
    title: "Cerrajero Urgente",
    slugBase: "cerrajero",
    emoji: "🔑",
    description: "Apertura de puertas sin romper, cambio de cerraduras, bombines y escudos de seguridad.",
    longDescription: [
      "Perder las llaves o dejarlas puestas por dentro es una de las situaciones más estresantes que existen. En la Sierra de Madrid, donde el clima puede ser extremo en invierno, quedarse fuera de casa requiere una respuesta inmediata de un cerrajero de confianza que no solo abra la puerta, sino que lo haga sin causar daños innecesarios.",
      "Nuestros cerrajeros son especialistas en aperturas técnicas de todo tipo de puertas: blindadas, acorazadas, portones de garaje y cajas fuertes. Trabajamos con las mejores marcas de seguridad del mercado como Tesa, Fichet, Cisa, MCM y Lince, garantizando que tu hogar vuelve a ser seguro tras nuestra intervención.",
      "Además de aperturas, instalamos cerrojos de seguridad suplementarios, escudos acorazados anti-taladro y bombines de última generación con tecnología anti-bumping, anti-ganzúa y anti-rotura. Si acabas de mudarte, cambiar el bombín es el primer paso esencial para tu seguridad.",
      "Servicio 24 horas real, con técnicos distribuidos por la zona para garantizar tiempos de llegada de menos de 20 minutos. Presupuesto cerrado por teléfono para evitar sorpresas desagradables."
    ],
    tasks: [
      "Apertura de puertas urgente 24h (sin destrozos)",
      "Cambio de cerraduras y bombines de seguridad",
      "Instalación de cerrojos anti-bumping",
      "Reparación de cierres metálicos y persianas de local",
      "Apertura de vehículos y cajas fuertes",
      "Instalación de escudos protectores acorazados",
      "Igualamiento y amaestramiento de llaves",
      "Desahucios y lanzamientos judiciales"
    ],
    faqs: [
      {
        q: "¿Podéis abrir mi puerta sin romper la cerradura?",
        a: "En el 95% de los casos de llaves olvidadas por dentro (portazo), podemos abrir la puerta mediante la técnica del 'resbalón' sin causar ningún daño a la cerradura ni a la propia puerta. Si la puerta tiene las vueltas echadas, utilizaremos técnicas de apertura técnica para minimizar el impacto y, en caso de ser necesario sustituir el bombín, te daremos el precio antes de proceder."
      },
      {
        q: "¿Qué es el 'bumping' y por qué mi cerradura puede ser vulnerable?",
        a: "El bumping es una técnica de robo silenciosa que permite abrir la mayoría de cerraduras convencionales en segundos sin dejar rastro. Si su bombín tiene más de 5-10 años, es muy probable que sea vulnerable. Recomendamos instalar bombines de alta seguridad con certificación oficial anti-bumping para proteger su hogar de forma efectiva."
      },
      {
        q: "¿Cuánto tardáis en llegar a una urgencia en la Sierra de Madrid?",
        a: "Disponemos de técnicos residentes en la zona que conocen perfectamente los accesos a urbanizaciones y pueblos. Nuestro tiempo medio de respuesta es de 15 a 25 minutos desde que recibimos la llamada. Estamos disponibles las 24 horas, incluso en festivos y fines de semana."
      },
      {
        q: "¿Dáis presupuesto cerrado por teléfono?",
        a: "Sí. Si nos describes el tipo de puerta y el problema (o nos envías una foto por WhatsApp), te daremos un presupuesto cerrado que incluye desplazamiento y mano de obra. La transparencia es uno de nuestros pilares fundamentales."
      }
    ]
  },
  {
    id: "persianas",
    name: "Persianas",
    title: "Reparación de Persianas",
    slugBase: "persianista",
    emoji: "🪟",
    description: "Reparación de cintas, lamas, motores y tambores de persianas domésticas y comerciales.",
    longDescription: [
      "Las persianas son fundamentales para el aislamiento térmico y la privacidad de nuestros hogares, especialmente en las zonas de montaña de Madrid donde el sol y el viento son intensos. Una persiana atascada o descolgada no solo es una molestia, sino que compromete la eficiencia energética de tu vivienda.",
      "Contamos con persianistas expertos en todo tipo de materiales: PVC, aluminio térmico, madera y persianas de seguridad. Reparamos desde el cambio de una simple cinta desgastada hasta la sustitución de lamas rotas, ejes doblados o poleas defectuosas.",
      "¿Cansado de subir persianas pesadas? Somos especialistas en motorización de persianas domésticas. Instalamos motores tubulares de alta calidad que pueden controlarse mediante pulsador, mando a distancia o incluso desde tu móvil (domótica), haciendo tu vida mucho más cómoda.",
      "También atendemos emergencias en persianas de locales comerciales y cierres metálicos que se quedan bloqueados, impidiendo la apertura o cierre de tu negocio. Servicio profesional, rápido y con materiales duraderos."
    ],
    tasks: [
      "Cambio de cintas, cuerdas y cables",
      "Sustitución de lamas de PVC y aluminio",
      "Reparación de motores de persianas",
      "Arreglo de persianas descolgadas o atascadas",
      "Instalación de persianas nuevas completas",
      "Motorización de persianas antiguas",
      "Cambio de recogedores, poleas y topes",
      "Mantenimiento de cierres metálicos de comercios"
    ],
    faqs: [
      {
        q: "¿Cuánto cuesta cambiar la cinta de una persiana?",
        a: "El cambio de cinta es una de las reparaciones más comunes y económicas. El precio suele oscilar entre 50€ y 80€ incluyendo el material y el desplazamiento, dependiendo del tamaño de la persiana y la dificultad de acceso al tambor. Siempre damos presupuesto previo."
      },
      {
        q: "¿Se puede motorizar una persiana que ya está instalada?",
        a: "Sí, la gran mayoría de persianas de eje estándar pueden motorizarse sin necesidad de cambiar la persiana completa. Solo es necesario instalar un motor tubular dentro del eje actual y realizar la conexión eléctrica. Ganarás en comodidad y alargarás la vida de la persiana al evitar tirones bruscos."
      },
      {
        q: "¿Por qué mi persiana se ha quedado atascada a mitad de altura?",
        a: "Las causas más frecuentes son: lamas que se han desplazado lateralmente y chocan con las guías, tirantes rotos dentro del tambor, o el eje que se ha salido de su sitio. No fuerces la persiana ya que podrías romper el motor o las lamas; un técnico puede alinearlas y fijarlas en pocos minutos."
      },
      {
        q: "¿Qué persianas son mejores contra el frío de la Sierra?",
        a: "Recomendamos las persianas de aluminio térmico inyectado con espuma de poliuretano. Ofrecen un aislamiento muy superior al PVC convencional, son más resistentes a las granizadas y vientos fuertes, y no se deforman con los cambios bruscos de temperatura habituales en nuestra zona."
      }
    ]
  },
  {
    id: "climatizacion",
    name: "Aire Acondicionado",
    title: "Aire Acondicionado",
    slugBase: "aire-acondicionado",
    emoji: "❄️",
    description: "Instalación, carga de gas, limpieza de filtros y reparación de fugas en splits y conductos.",
    longDescription: [
      "Aunque estemos en la Sierra, los veranos en Madrid son cada vez más calurosos y contar con un sistema de climatización eficiente es vital para el descanso. Un aire acondicionado que no enfría, que gotea o que desprende mal olor necesita la revisión de un técnico profesional frigorista.",
      "Realizamos instalaciones completas de sistemas split, multi-split y aire acondicionado por conductos. Trabajamos con las marcas líderes en eficiencia energética como Mitsubishi Electric, Daikin, Fujitsu, Panasonic y LG, asegurando el menor consumo eléctrico posible.",
      "El mantenimiento preventivo es clave: realizamos cargas de gas refrigerante (R32, R410A) localizando previamente posibles fugas, limpieza profunda de baterías y filtros para eliminar bacterias y hongos, y desinfección de la bandeja de condensados para evitar malos olores.",
      "Si tu equipo ha dejado de funcionar, diagnosticamos averías en placas electrónicas, compresores y ventiladores. Antes de dar por perdido un equipo antiguo, consúltanos; muchas veces una reparación puntual le devuelve años de vida útil."
    ],
    tasks: [
      "Instalación de aire acondicionado split y conductos",
      "Carga de gas refrigerante con detector de fugas",
      "Mantenimiento preventivo y limpieza de filtros",
      "Reparación de fugas de agua en la unidad interior",
      "Sustitución de compresores y placas electrónicas",
      "Desinfección de equipos contra hongos y bacterias",
      "Traslado de equipos de aire acondicionado",
      "Asesoramiento en eficiencia energética y aerotermia"
    ],
    faqs: [
      {
        q: "¿Por qué mi aire acondicionado echa aire pero no enfría?",
        a: "Lo más habitual es una falta de gas refrigerante debido a una pequeña fuga en el circuito, o que los filtros estén tan sucios que impidan el intercambio de calor. También podría ser un fallo en el condensador de arranque del compresor. Nuestros técnicos localizan la causa exacta y realizan la carga de gas solo tras asegurar que el circuito es estanco."
      },
      {
        q: "¿Cada cuánto tiempo hay que limpiar los filtros?",
        a: "En una vivienda particular, recomendamos limpiar los filtros al menos dos veces al año: antes de empezar la temporada de verano y antes de la de invierno si se usa como bomba de calor. Si hay personas con alergias o mascotas, la limpieza debería ser mensual durante los meses de uso intensivo."
      },
      {
        q: "¿Es normal que la unidad interior gotee agua dentro de casa?",
        a: "No es normal y suele indicar que el desagüe está obstruido por suciedad o algas, o que la bandeja de condensados está mal nivelada. Es una avería sencilla de solucionar pero debe hacerse pronto para evitar daños en la pared o el suelo. Podemos desatascar el conducto y desinfectar el sistema rápidamente."
      },
      {
        q: "¿Qué equipo de aire acondicionado gasta menos luz?",
        a: "Los equipos con tecnología Inverter y clasificación energética A+++ son los más eficientes. Marcas como Mitsubishi o Daikin son referentes en bajo consumo. Un equipo bien dimensionado para los metros de la estancia gastará mucho menos que uno pequeño funcionando siempre al máximo."
      }
    ]
  },
  {
    id: "manitas",
    name: "Manitas a Domicilio",
    title: "Manitas a Domicilio",
    slugBase: "manitas",
    emoji: "🛠️",
    description: "Pequeñas reparaciones del hogar: montaje de muebles, colgar cuadros, lámparas y arreglos generales.",
    longDescription: [
      "A veces lo que necesitas no es un fontanero ni un electricista, sino alguien que se encargue de esas diez pequeñas cosas que se han ido acumulando en casa: un estante que se cae, un mueble de IKEA a medio montar, o una bombilla que no sabes cómo cambiar.",
      "Nuestro servicio de 'Manitas' en la Sierra de Madrid está pensado para solucionar de una vez todos esos pequeños problemas. Somos profesionales multiskilled que van equipados con herramientas para madera, metal, pared y electricidad básica, listos para dejar tu hogar a punto en una sola visita.",
      "No hay trabajo demasiado pequeño para nosotros. Desde sellar con silicona una bañera que tiene moho hasta instalar un soporte de televisión en la pared del salón o ajustar las bisagras de las puertas que rozan en el suelo.",
      "Ideal para personas mayores que necesitan ayuda con el mantenimiento del hogar, o para familias que prefieren dedicar su tiempo libre a disfrutar de la Sierra en lugar de pelearse con una caja de herramientas. Servicio por horas o presupuesto cerrado según la tarea."
    ],
    tasks: [
      "Montaje de muebles (IKEA, Leroy Merlin, etc.)",
      "Colgar cuadros, espejos, cortinas y estores",
      "Instalación de lámparas, apliques y ventiladores de techo",
      "Sellado de bañeras y platos de ducha con silicona",
      "Reparación de persianas y ajuste de puertas",
      "Instalación de soportes para TV y baldas",
      "Arreglo de cisternas y cambio de grifos sencillos",
      "Pequeños arreglos de pintura y tapado de agujeros"
    ],
    faqs: [
      {
        q: "¿Cobráis por horas o por trabajo realizado?",
        a: "Ofrecemos ambas modalidades. Para listas de tareas variadas, solemos trabajar por horas (con una tarifa base la primera hora). Para tareas específicas como montar un mueble concreto o colgar un mueble de baño, damos un presupuesto cerrado por adelantado. Tú eliges lo que te resulte más cómodo."
      },
      {
        q: "¿Traéis vosotros los materiales como tacos y tornillos?",
        a: "Sí, nuestros manitas llevan siempre un surtido profesional de tacos, tornillos, siliconas, adhesivos y pequeñas piezas de repuesto. Estos materiales básicos suelen estar incluidos. Si se requiere algo específico como una lámpara, un grifo o un mueble, debe suministrarlo el cliente o podemos ir a comprarlo nosotros bajo presupuesto."
      },
      {
        q: "¿Podéis ayudarme a montar un mueble de IKEA muy grande?",
        a: "Por supuesto. Somos expertos en el montaje de armarios PAX, cómodas Malm y todo tipo de mobiliario de grandes superficies. Lo montamos de forma profesional, nivelado y anclado a la pared para total seguridad. ¡Ahorrarás horas de frustración!"
      },
      {
        q: "¿Hacéis trabajos de pintura pequeños?",
        a: "Sí, realizamos pequeños retoques: tapar agujeros de cuadros antiguos, pintar un techo de baño tras una humedad, o una sola pared. No realizamos pintura de viviendas completas, nos enfocamos en el mantenimiento y las pequeñas reparaciones que hacen que tu casa luzca perfecta."
      }
    ]
  }
];

// Helper to slugify names (e.g. "Colmenar Viejo" -> "colmenar-viejo")
export function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .normalize('NFD') // split accented characters
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/\s+/g, '-') // replace spaces with hyphens
    .replace(/[^\w\-]+/g, '') // remove non-word chars
    .replace(/\-\-+/g, '-') // replace multiple hyphens
    .replace(/^-+/, '') // trim start
    .replace(/-+$/, ''); // trim end
}
