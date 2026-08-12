import type { Lang } from "./types";

const es = {
  brand: "Red de acopio",
  brandSub: "Sur de Florida",
  nav: { find: "Centros", missions: "Misiones", how: "Cómo funciona", what: "Qué donar", register: "Registrar centro" },
  live: (n: number) => `${n} recibiendo ahora`,

  hero: {
    badge: "Misiones activas",
    eyebrow: "GEM 2026 · Respuesta a desastres",
    title: ["Dónde dejar", "tus donaciones"],
    lede: "Los centros de acopio del sur de Florida reciben donaciones para las misiones activas de GEM en Venezuela y Colombia. Encuentra el más cercano que esté recibiendo en este momento.",
    zipLabel: "Tu código postal",
    zipPlaceholder: "33166",
    submit: "Buscar",
    geo: "Usar mi ubicación",
    geoLoading: "Ubicando…",
    geoError: "No pudimos obtener tu ubicación. Escribe tu código postal.",
    zipError: "No reconocemos ese código postal. Intenta con otro.",
    scroll: "Desliza",
  },

  ticker: [
    "Venezuela · Terremotos 2026",
    "Colombia · Terremoto 2026",
    "Sur de Florida",
    "Actualizado hoy",
    "Entrega directa y transparente",
  ],

  stats: {
    title: "La red en números",
    receiving: "recibiendo hoy",
    centers: "centros en la red",
    cities: "ciudades",
    missions: "misiones activas",
    receivingShort: "recibiendo",
    fullShort: "llenos",
    updated: "Actualizado hoy",
  },

  missions: {
    eyebrow: "Respuesta a desastres",
    title: "Misiones activas",
    lede: "Lo que dejas en un centro de acopio se consolida en el almacén de GEM en Doral y viaja al terreno con los equipos de respuesta.",
    active: "Activa",
    recent: "Misiones recientes",
    recentLede: "GEM responde a desastres en todo el mundo. Estas son algunas de las operaciones de este año.",
  },

  how: {
    eyebrow: "Cómo funciona",
    title: "De tu barrio al terreno",
    lede: "Sin registro previo y sin coordinar nada. Llega, entrega y nosotros nos encargamos del resto.",
    steps: [
      {
        title: "Encuentra un centro",
        body: "Pon tu código postal y ordenamos los centros por cercanía, con su estado en tiempo real.",
        image: "/missions/doral-volunteers.jpg",
      },
      {
        title: "Lleva tu donación",
        body: "Revisa el horario, llega y entrega. Los centros en verde están recibiendo ahora mismo.",
        image: "/missions/doral-warehouse.jpg",
      },
      {
        title: "GEM la mueve",
        body: "Los centros consolidan en el almacén de Doral y la carga viaja hacia la sede LATAM y el terreno.",
        image: "/missions/latam-warehouse.jpg",
      },
    ],
  },

  impact: {
    quote:
      "Con décadas de experiencia en respuesta a desastres, GEM entrega ayuda de forma rápida, transparente y digna.",
    source: "Global Empowerment Mission",
    context: "Fase 1 · Respuesta inmediata",
  },

  what: {
    eyebrow: "Qué donar",
    title: "Qué se necesita",
    lede: "Prioriza artículos nuevos o en buen estado. Si tienes algo especial, confirma primero con el centro.",
    items: [
      { label: "Medicinas e insumos médicos", note: "Sin abrir y vigentes" },
      { label: "Alimentos no perecederos", note: "Enlatados, granos, harina" },
      { label: "Higiene personal", note: "Jabón, pasta dental, toallas" },
      { label: "Artículos para bebés", note: "Pañales, fórmula, teteros" },
      { label: "Carpas y ropa de cama", note: "Refugio para familias" },
      { label: "Agua y filtros", note: "Botellas y purificadores" },
    ],
    disclaimer: "Lista de referencia. Cada centro puede tener necesidades distintas.",
  },

  directory: {
    eyebrow: "Encontrar centro",
    title: "Centros de acopio",
    lede: "Elige uno que esté recibiendo. Si un centro aparece lleno, por favor no lleves donaciones ahí.",
    search: "Buscar por nombre, ciudad o dirección",
    filters: { receiving: "Recibiendo", all: "Todos", warehouse: "Almacenes" },
    sort: { near: "Por cercanía", name: "Por nombre" },
    sortLabel: "Orden",
    resultsNear: (n: number, label: string) => `${n} centros cerca de ${label}`,
    results: (n: number) => `${n} centros`,
    more: (n: number) => `Ver ${n} centros más`,
    showing: (shown: number, total: number) => `Mostrando ${shown} de ${total}`,
    clear: "Limpiar",
    empty: {
      title: "Sin resultados",
      body: "Prueba con otro término de búsqueda o quita los filtros.",
      action: "Quitar filtros",
    },
    listTab: "Lista",
    mapTab: "Mapa",
  },

  card: {
    receiving: "Recibiendo",
    full: "Lleno",
    fullNotice: "Este centro está lleno ahora mismo. Por favor no lleves donaciones aquí.",
    warehouse: "Almacén",
    collection: "Punto de recolección",
    directions: "Cómo llegar",
    call: "Ver en el mapa",
    openNow: (until: string) => `Abierto · cierra ${until}`,
    opensLater: (at: string) => `Abre hoy a las ${at}`,
    closedToday: "Cerrado hoy",
    hoursUnknown: "Consulta el horario",
    approx: "Ubicación aproximada",
  },

  register: {
    eyebrow: "Para negocios y organizaciones",
    title: "¿Tu local puede recibir donaciones?",
    lede: "Regístralo y te enviamos donantes. Tú controlas el horario y puedes marcarlo como lleno cuando necesites una pausa. Puedes registrar varios locales.",
    bullets: [
      "Apareces en el mapa en minutos",
      "Marca “lleno” o “recibiendo” cuando quieras",
      "Sin costo y sin compromiso de tiempo",
    ],
    form: {
      name: "Nombre del local",
      namePlaceholder: "Ej: Panadería La Esquina",
      address: "Dirección",
      addressPlaceholder: "Calle, ciudad, estado, ZIP",
      contact: "Teléfono o correo",
      contactPlaceholder: "Para coordinar la recogida",
      hours: "Horario en que reciben",
      hoursPlaceholder: "Ej: Lun – Vie 9:00 AM – 5:00 PM",
      type: "Tipo de espacio",
      typeCollection: "Punto de recolección",
      typeWarehouse: "Almacén",
      submit: "Registrar mi centro",
      already: "Ya tengo mi centro registrado",
      demoNote: "Demostración de diseño: este formulario no envía datos.",
      successTitle: "¡Listo!",
      successBody: "En la versión real, tu centro quedaría en revisión y aparecería en el mapa el mismo día.",
      successAction: "Registrar otro",
    },
  },

  footer: {
    tagline: "Red de acopio del sur de Florida para las misiones de respuesta a desastres de Global Empowerment Mission.",
    concept: "Concepto de rediseño",
    conceptBody:
      "Propuesta de dirección visual construida sobre los datos reales de la red de centros de acopio. No es un sitio oficial de GEM.",
    dataNote: (n: number) => `${n} centros tomados del directorio existente.`,
    rights: "Hecho con cariño por voluntarios.",
  },
};

const en: typeof es = {
  brand: "Drop-off network",
  brandSub: "South Florida",
  nav: { find: "Centers", missions: "Missions", how: "How it works", what: "What to donate", register: "Register center" },
  live: (n: number) => `${n} receiving now`,

  hero: {
    badge: "Active missions",
    eyebrow: "GEM 2026 · Disaster response",
    title: ["Drop off your", "donations"],
    lede: "Drop-off centers across South Florida are collecting donations for GEM's active missions in Venezuela and Colombia. Find the closest one receiving right now.",
    zipLabel: "Your ZIP code",
    zipPlaceholder: "33166",
    submit: "Search",
    geo: "Use my location",
    geoLoading: "Locating…",
    geoError: "We couldn't get your location. Enter your ZIP code instead.",
    zipError: "We don't recognize that ZIP code. Try another one.",
    scroll: "Scroll",
  },

  ticker: [
    "Venezuela · 2026 Earthquakes",
    "Colombia · 2026 Earthquake",
    "South Florida",
    "Updated today",
    "Direct, transparent delivery",
  ],

  stats: {
    title: "The network in numbers",
    receiving: "receiving today",
    centers: "centers in the network",
    cities: "cities",
    missions: "active missions",
    receivingShort: "receiving",
    fullShort: "full",
    updated: "Updated today",
  },

  missions: {
    eyebrow: "Disaster response",
    title: "Active missions",
    lede: "What you drop off is consolidated at GEM's Doral warehouse and travels to the field with the response teams.",
    active: "Active",
    recent: "Recent missions",
    recentLede: "GEM responds to disasters worldwide. These are some of this year's operations.",
  },

  how: {
    eyebrow: "How it works",
    title: "From your block to the field",
    lede: "No sign-up, no advance coordination. Show up, hand it over, and we handle the rest.",
    steps: [
      {
        title: "Find a center",
        body: "Enter your ZIP and we sort centers by distance, with live status for each one.",
        image: "/missions/doral-volunteers.jpg",
      },
      {
        title: "Drop off your donation",
        body: "Check the hours, show up, hand it over. Centers in green are receiving right now.",
        image: "/missions/doral-warehouse.jpg",
      },
      {
        title: "GEM moves it",
        body: "Centers consolidate at the Doral warehouse, and cargo travels to the LATAM hub and the field.",
        image: "/missions/latam-warehouse.jpg",
      },
    ],
  },

  impact: {
    quote:
      "With decades of global disaster response experience, GEM is committed to rapid, transparent and dignified aid delivery.",
    source: "Global Empowerment Mission",
    context: "Phase 1 · Immediate response",
  },

  what: {
    eyebrow: "What to donate",
    title: "What's needed",
    lede: "Favor new or good-condition items. For anything unusual, check with the center first.",
    items: [
      { label: "Medicine & medical supplies", note: "Sealed and unexpired" },
      { label: "Non-perishable food", note: "Canned goods, grains, flour" },
      { label: "Personal hygiene", note: "Soap, toothpaste, towels" },
      { label: "Baby supplies", note: "Diapers, formula, bottles" },
      { label: "Tents & bedding", note: "Shelter for families" },
      { label: "Water & filters", note: "Bottles and purifiers" },
    ],
    disclaimer: "Reference list. Individual centers may have different needs.",
  },

  directory: {
    eyebrow: "Find a center",
    title: "Drop-off centers",
    lede: "Pick one that's receiving. If a center shows as full, please don't bring donations there.",
    search: "Search by name, city or address",
    filters: { receiving: "Receiving", all: "All", warehouse: "Warehouses" },
    sort: { near: "By distance", name: "By name" },
    sortLabel: "Sort",
    resultsNear: (n: number, label: string) => `${n} centers near ${label}`,
    results: (n: number) => `${n} centers`,
    more: (n: number) => `Show ${n} more centers`,
    showing: (shown: number, total: number) => `Showing ${shown} of ${total}`,
    clear: "Clear",
    empty: {
      title: "No results",
      body: "Try a different search term or clear your filters.",
      action: "Clear filters",
    },
    listTab: "List",
    mapTab: "Map",
  },

  card: {
    receiving: "Receiving",
    full: "Full",
    fullNotice: "This center is full right now. Please don't bring donations here.",
    warehouse: "Warehouse",
    collection: "Collection point",
    directions: "Directions",
    call: "Show on map",
    openNow: (until: string) => `Open · closes ${until}`,
    opensLater: (at: string) => `Opens today at ${at}`,
    closedToday: "Closed today",
    hoursUnknown: "Check hours",
    approx: "Approximate location",
  },

  register: {
    eyebrow: "For businesses & organizations",
    title: "Can your space receive donations?",
    lede: "Register it and we'll send donors your way. You control the hours and can mark yourself full whenever you need a break. Multiple locations welcome.",
    bullets: [
      "You appear on the map within minutes",
      "Toggle “full” or “receiving” at any time",
      "Free, with no time commitment",
    ],
    form: {
      name: "Business name",
      namePlaceholder: "e.g. La Esquina Bakery",
      address: "Address",
      addressPlaceholder: "Street, city, state, ZIP",
      contact: "Phone or email",
      contactPlaceholder: "So we can coordinate pickup",
      hours: "Hours you can receive",
      hoursPlaceholder: "e.g. Mon – Fri 9:00 AM – 5:00 PM",
      type: "Type of space",
      typeCollection: "Collection point",
      typeWarehouse: "Warehouse",
      submit: "Register my center",
      already: "I already have a center registered",
      demoNote: "Design demo: this form doesn't submit anywhere.",
      successTitle: "All set!",
      successBody: "In the real version your center would go into review and appear on the map the same day.",
      successAction: "Register another",
    },
  },

  footer: {
    tagline: "South Florida drop-off network for Global Empowerment Mission's disaster response.",
    concept: "Redesign concept",
    conceptBody:
      "A visual direction proposal built on the real drop-off network data. Not an official GEM site.",
    dataNote: (n: number) => `${n} centers sourced from the existing directory.`,
    rights: "Made with care by volunteers.",
  },
};

export const copy: Record<Lang, typeof es> = { es, en };
export type Copy = typeof es;
