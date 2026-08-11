export interface PortfolioItem {
  id: string;
  img: string;
  title: string;
  place: string;
  desc: string;
  alt: string;
  titleAttr: string;
  width: number;
  height: number;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: "piscina-manzanares",
    img: "/trabajos/reforma-piscina-manzanares-el-real.jpg",
    title: "Rehabilitación Integral de Piscina",
    place: "Manzanares el Real",
    desc: "Impermeabilización, sustitución de tuberías del vaso y solado exterior en chalet perimetral.",
    alt: "Reforma integral de piscina y pavimentación exterior en Manzanares el Real",
    titleAttr: "Obra de piscina y solado exterior en Manzanares el Real",
    width: 800,
    height: 600
  },
  {
    id: "cocina-soto",
    img: "/trabajos/reforma-cocina-moderna-blanca.jpg",
    title: "Instalación de Fontanería de Cocina",
    place: "Soto del Real",
    desc: "Montaje de tomas multicapa, desagües de fregadero y lavavajillas en cocina moderna.",
    alt: "Instalación de fontanería de cocina moderna en Soto del Real",
    titleAttr: "Montaje de fontanería y tomas en cocina de Soto del Real",
    width: 800,
    height: 600
  },
  {
    id: "porche-colmenar",
    img: "/trabajos/cerramiento-porche-madera-exterior.jpg",
    title: "Instalación Estructural en Porche",
    place: "Colmenar Viejo",
    desc: "Estructura de madera tratada y fijación de aislamiento térmico exterior en jardín.",
    alt: "Cerramiento estructural de porche de madera exterior en Colmenar Viejo",
    titleAttr: "Estructura de madera para porche exterior en Colmenar Viejo",
    width: 800,
    height: 600
  },
  {
    id: "muro-miraflores",
    img: "/trabajos/construccion-muro-piedra-rustica.jpg",
    title: "Construcción de Muro de Cierre",
    place: "Miraflores de la Sierra",
    desc: "Muro tradicional de piedra de granito local para cierre perimetral de parcela.",
    alt: "Construcción de muro rústico de piedra de granito en Miraflores de la Sierra",
    titleAttr: "Mano de obra en muro de piedra tradicional en Miraflores",
    width: 800,
    height: 600
  },
  {
    id: "solado-moralzarzal",
    img: "/trabajos/solado-porcelanico-jardin-piscina.jpg",
    title: "Pavimentación Exterior Porcelánica",
    place: "Moralzarzal",
    desc: "Solado antideslizante alrededor de piscina con sumideros integrados en chalet.",
    alt: "Solado porcelánico antideslizante exterior para piscina en Moralzarzal",
    titleAttr: "Pavimentación y solado exterior en moralzarzal",
    width: 800,
    height: 600
  },
  {
    id: "techo-guadarrama",
    img: "/trabajos/cerramiento-porche-madera-interior.jpg",
    title: "Aislamiento de Techo en Porche",
    place: "Guadarrama",
    desc: "Montaje de friso de madera de pino y canalizaciones eléctricas ocultas en porche.",
    alt: "Aislamiento de techo interior de porche en madera en Guadarrama",
    titleAttr: "Acabado de friso de madera interior en Guadarrama",
    width: 800,
    height: 600
  },
  {
    id: "muro-alpedrete",
    img: "/trabajos/construccion-muro-bloques-jardin.jpg",
    title: "Muro de Contención de Tierras",
    place: "Alpedrete",
    desc: "Construcción con bloques de hormigón y drenaje perimetral para jardín en pendiente.",
    alt: "Muro de contención de bloques de hormigón para jardín en Alpedrete",
    titleAttr: "Construcción de muro divisor de bloques en Alpedrete",
    width: 800,
    height: 600
  },
  {
    id: "patio-elboalo",
    img: "/trabajos/reforma-piscina-solado-exterior.jpg",
    title: "Borde de Piscina y Césped",
    place: "El Boalo",
    desc: "Reforma perimetral de piedra de coronación y césped artificial de alta gama.",
    alt: "Instalación de césped artificial y borde de piscina en El Boalo",
    titleAttr: "Reforma de jardín y coronación de piscina en El Boalo",
    width: 800,
    height: 600
  }
];
