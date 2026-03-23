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

export const services = [
  {
    id: "fontaneria",
    name: "Fontanería",
    title: "Fontanero Urgente",
    slugBase: "fontanero",
    emoji: "💧",
    description: "Servicio rápido de fontanería: desatascos, fugas de agua, cambio de grifería y sanitarios."
  },
  {
    id: "electricidad",
    name: "Electricidad",
    title: "Electricista Urgente",
    slugBase: "electricista",
    emoji: "⚡",
    description: "Solución a apagones, cortocircuitos, cuadros eléctricos y boletines oficiales."
  },
  {
    id: "calderas",
    name: "Calderas",
    title: "Reparación de Calderas",
    slugBase: "reparacion-calderas",
    emoji: "🔥",
    description: "Servicio técnico multimarca: mantenimiento y reparación de calderas de gas, gasoil y biomasa."
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
