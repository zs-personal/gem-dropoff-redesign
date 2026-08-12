import type { Lang } from "../types";

export interface Mission {
  id: string;
  year: string;
  active: boolean;
  image: string;
  title: Record<Lang, string>;
  place: Record<Lang, string>;
  blurb: Record<Lang, string>;
}

/** Mission details as published on globalempowermentmission.org. */
export const missions: Mission[] = [
  {
    id: "venezuela",
    year: "2026",
    active: true,
    image: "/missions/venezuela.webp",
    title: { es: "Terremotos en Venezuela", en: "Venezuela Earthquakes" },
    place: { es: "Venezuela", en: "Venezuela" },
    blurb: {
      es: "La noche del 24 de junio, dos sismos consecutivos golpearon Venezuela: uno de magnitud 7.1 seguido un minuto después por otro de 7.5, con epicentro justo al oeste de la capital. Hay edificios colapsados en Caracas.",
      en: "On the evening of June 24th, back-to-back earthquakes struck Venezuela — a 7.1 magnitude quake followed roughly a minute later by an even stronger 7.5, centered just west of the capital. Buildings have collapsed across Caracas.",
    },
  },
  {
    id: "colombia",
    year: "2026",
    active: true,
    image: "/missions/field.webp",
    title: { es: "Terremoto en Colombia", en: "Colombia Earthquake" },
    place: { es: "Colombia", en: "Colombia" },
    blurb: {
      es: "El 10 de agosto, un sismo de magnitud 7.4 golpeó la región occidental de Colombia, causando daños y destrucción inmediata en muchas zonas. El equipo GEM ya está desplegado.",
      en: "On August 10th, a 7.4 magnitude quake struck the Western region of Colombia, causing immediate damage and destruction across many areas. The GEM team has already deployed to the area.",
    },
  },
  {
    id: "washington",
    year: "2026",
    active: false,
    image: "/missions/spokane.jpeg",
    title: { es: "Incendios en Washington", en: "Washington State Wildfires" },
    place: { es: "Estados Unidos", en: "United States" },
    blurb: {
      es: "El condado de Spokane atraviesa el mayor desastre natural de su historia: los incendios Old Trails, Fairview y Autumn Lane han arrasado miles de acres.",
      en: "Spokane County is facing the largest natural disaster in its history, with the Old Trails, Fairview and Autumn Lane fires destroying thousands of acres.",
    },
  },
  {
    id: "philippines",
    year: "2026",
    active: false,
    image: "/missions/philippines.jpg",
    title: { es: "Terremoto en Filipinas", en: "Philippines Earthquake" },
    place: { es: "Filipinas", en: "Philippines" },
    blurb: {
      es: "El 8 de junio, Mindanao fue sacudida por un sismo de magnitud 7.8. La infraestructura sufrió daños severos y se emitieron alertas de tsunami.",
      en: "Early June 8th, Mindanao was struck by a 7.8 magnitude quake. Infrastructure was severely damaged and tsunami warnings were issued for the region.",
    },
  },
  {
    id: "lebanon",
    year: "2026",
    active: false,
    image: "/missions/lebanon.jpg",
    title: { es: "Crisis en Líbano", en: "Lebanon Crisis" },
    place: { es: "Líbano", en: "Lebanon" },
    blurb: {
      es: "El equipo GEM MENA, junto a HCI y ONSUR, apoya a familias desplazadas en Tiro. La crisis ha dejado a cerca del 80% de la población en pobreza.",
      en: "The GEM MENA team, alongside partners HCI and ONSUR, supports displaced families in Tyre. The ongoing crisis has left roughly 80% of the population in poverty.",
    },
  },
  {
    id: "oklahoma",
    year: "2026",
    active: false,
    image: "/missions/oklahoma.jpg",
    title: { es: "Tornado en Oklahoma", en: "Oklahoma Tornado" },
    place: { es: "Estados Unidos", en: "United States" },
    blurb: {
      es: "GEM está en Enid, Oklahoma, donde un tornado masivo destruyó más de 40 viviendas. Es considerado el más fuerte del año hasta ahora.",
      en: "GEM is on the ground in Enid, Oklahoma, where a massive tornado destroyed over 40 homes. It is considered the strongest tornado of the year so far.",
    },
  },
];
