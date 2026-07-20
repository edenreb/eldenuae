import holidayInn1 from "@/assets/holiday-inn-al-barsha/1.png";
import holidayInn2 from "@/assets/holiday-inn-al-barsha/2.png";
import holidayInn3 from "@/assets/holiday-inn-al-barsha/3.png";
import holidayInn4 from "@/assets/holiday-inn-al-barsha/4.png";
import warehouseGym1 from "@/assets/warehouse-gym-ibn-battuta/1.jpg";
import foretCafe1 from "@/assets/foret-cafe/1.jpg";
import bikanerwala1 from "@/assets/bikanerwala/1.jpg";
import jumeiraClubhouse1 from "@/assets/jumeira-park-clubhouse/1.jpg";
import flagshipBoutique1 from "@/assets/flagship-boutique/1.jpg";
import flagshipBoutique2 from "@/assets/flagship-boutique/2.jpg";
import corporateHeadquarters1 from "@/assets/corporate-headquarters/1.jpg";
import fineDining1 from "@/assets/fine-dining-restaurant/1.jpg";
import fineDining2 from "@/assets/fine-dining-restaurant/2.jpg";
import hotelSuite1 from "@/assets/boutique-hotel-suite/1.jpg";
import wellnessSpa1 from "@/assets/wellness-spa/1.jpg";
import artGallery1 from "@/assets/contemporary-art-gallery/1.jpg";

export interface Project {
  slug: string;
  name: string;
  sector: string;
  location: string;
  client: string;
  scope: string;
  year: string;
  image: string;
  gallery: string[];
  summary: string;
  narrative: string[];
}

export const projects: Project[] = [
  {
    slug: "holiday-inn-al-barsha",
    name: "Holiday Inn — Al Barsha",
    sector: "Hospitality",
    location: "Al Barsha, Dubai",
    client: "Holiday Inn",
    scope: "Fit-out & MEP Works",
    year: "2026",
    image: holidayInn1,
    gallery: [holidayInn2, holidayInn3, holidayInn4],
    summary:
      "A full hotel renovation across all rooms and floors, delivering a cohesive upgrade in finishes, systems and guest experience.",
    narrative: [
      "The renovation scope covered a full interior upgrade across all guest rooms, corridors and public areas, with a consistent design language applied across every floor.",
      "We coordinated a complete refresh of finishes, joinery, lighting and MEP services to improve durability, guest comfort and operational efficiency without compromising the hotel's existing structure.",
      "The works included room-by-room refurbishment, upgraded FF&E, revised circulation planning and technical integration to deliver a cohesive, modern hospitality environment at scale.",
    ],
  },
  {
    slug: "warehouse-gym-ibn-battuta",
    name: "Warehouse Gym — Ibn Battuta",
    sector: "Fitness",
    location: "Ibn Battuta Mall, Dubai",
    client: "The Warehouse Fitness Center LLC",
    scope: "Fit-out, Joinery & MEP Works",
    year: "2022",
    image: warehouseGym1,
    gallery: [warehouseGym1, corporateHeadquarters1, artGallery1],
    summary:
      "A raw, industrial temple to strength — polished concrete, exposed services and warm timber, tuned for performance.",
    narrative: [
      "The brief was to translate Warehouse Gym's DNA — grit, honesty, and precision — into a mall footprint without softening a single edge.",
      "We opened the ceiling, blacked out the services and let acoustic baffles carry the rhythm of the space. Every duct run was coordinated to double as visual language.",
      "Full MEP design and execution was delivered in-house, from load calculations to smart lighting scenes that shift with the training programme.",
    ],
  },
  {
    slug: "foret-cafe",
    name: "Forêt Café",
    sector: "Restaurants",
    location: "Downtown Dubai",
    client: "Forêt Hospitality",
    scope: "Design, Fit-out & Joinery",
    year: "2023",
    image: foretCafe1,
    gallery: [foretCafe1, fineDining1, fineDining2],
    summary:
      "A Parisian-inspired garden café where a solid emerald marble bar anchors a living wall of greenery.",
    narrative: [
      "Every element — from the hand-tufted banquettes to the aged brass pendants — was joinery-crafted at our Al Quoz workshop.",
      "The signature emerald marble was sourced as a single slab, book-matched, then wet-polished on site to preserve the veining.",
      "MEP was engineered for silence: the plant is invisible, the acoustics are cinema-grade, and the guest hears only conversation.",
    ],
  },
  {
    slug: "bikanerwala",
    name: "Bikanerwala",
    sector: "Retail & Restaurants",
    location: "Al Karama, Dubai",
    client: "Bikanerwala Foods",
    scope: "Turnkey Fit-out & MEP",
    year: "2022",
    image: bikanerwala1,
    gallery: [bikanerwala1, foretCafe1, fineDining1],
    summary:
      "A jewel-box sweet shop and dining room dressed in ruby velvet, aged brass and hand-cut lattice work.",
    narrative: [
      "We rebuilt a heritage narrative in modern skins — every pattern digitised, CNC-cut in our joinery, then finished by hand.",
      "Kitchen extraction, refrigeration and gas were coordinated inside a 3.2m ceiling void with zero visible services in the guest zones.",
      "Delivered from empty shell to opening night in 74 days.",
    ],
  },
  {
    slug: "jumeira-park-clubhouse",
    name: "Jumeira Park Clubhouse",
    sector: "Leisure",
    location: "Jumeira Park, Dubai",
    client: "Private Residence Owner",
    scope: "Interior Fit-out, Joinery & MEP",
    year: "2023",
    image: jumeiraClubhouse1,
    gallery: [jumeiraClubhouse1, hotelSuite1, wellnessSpa1],
    summary:
      "A double-height private clubhouse framing the pool through a curtain of travertine, walnut and glass.",
    narrative: [
      "A single continuous travertine plane runs from lobby to poolside, laid on site with 2mm tolerance across 340m².",
      "The sculptural chandelier was built in-house as a bespoke steel armature clad in hand-blown glass.",
      "Smart HVAC zones balance the double-height volume with the intimate lounges without a single visible grille.",
    ],
  },
  {
    slug: "flagship-boutique",
    name: "Atelier Flagship Boutique",
    sector: "Retail",
    location: "The Dubai Mall",
    client: "Confidential Fashion House",
    scope: "Design Development & Fit-out",
    year: "2024",
    image: flagshipBoutique1,
    gallery: [flagshipBoutique1, flagshipBoutique2, artGallery1],
    summary:
      "A quiet-luxury retail environment in micro-cement, oak and brushed brass — every fixture custom-joinered.",
    narrative: [
      "The brief called for a moving canvas: podiums that slide, walls that reconfigure, lighting scenes that shift with each capsule launch.",
      "We built the entire kit of parts in our joinery so that the store can be re-choreographed overnight, without a contractor on site.",
      "Delivered under an active mall, working 22:00 to 06:00 for 46 nights with zero disruption to the neighbouring tenants.",
    ],
  },
  {
    slug: "corporate-headquarters",
    name: "Corporate Headquarters",
    sector: "Commercial",
    location: "Business Bay, Dubai",
    client: "Regional Holding Group",
    scope: "Full Interior Fit-out & MEP",
    year: "2024",
    image: corporateHeadquarters1,
    gallery: [corporateHeadquarters1, flagshipBoutique2, warehouseGym1],
    summary:
      "Three floors of executive workplace articulated around a backlit onyx feature wall and a terrazzo ground plane.",
    narrative: [
      "We integrated an intelligent BMS — lighting, HVAC, blinds and AV — into a single tablet interface for facilities.",
      "The onyx wall is 6m tall, illuminated by a bespoke tunable-white LED plenum tuned to circadian rhythms.",
      "All acoustics were modelled before construction: open-plan zones perform at NRC 0.85 without a single ceiling panel visible.",
    ],
  },
  {
    slug: "fine-dining-restaurant",
    name: "The Green Room",
    sector: "Hospitality",
    location: "DIFC, Dubai",
    client: "Independent Restaurateur",
    scope: "Turnkey Design & Delivery",
    year: "2023",
    image: fineDining1,
    gallery: [fineDining1, foretCafe1, fineDining2],
    summary:
      "A dark, intimate fine-dining room in tufted emerald velvet, walnut millwork and hand-forged brass.",
    narrative: [
      "The banquettes were built in-house with sprung seat construction — comfort tuned for a three-hour tasting menu.",
      "Lighting is dimmed to 2400K after 19:00 by an automated scene, with candle-light supplemented by hidden low-glare fixtures.",
      "Kitchen ventilation was engineered to keep aroma inside the pass and out of the dining room.",
    ],
  },
  {
    slug: "boutique-hotel-suite",
    name: "Boutique Hotel Suite Prototype",
    sector: "Hospitality",
    location: "Downtown Dubai",
    client: "International Hotel Operator",
    scope: "Prototype Suite Fit-out",
    year: "2024",
    image: hotelSuite1,
    gallery: [hotelSuite1, jumeiraClubhouse1, wellnessSpa1],
    summary:
      "A prototype guest suite balancing warm materials, quiet technology and a framed view of the Dubai skyline.",
    narrative: [
      "We built two mirrored prototype suites to allow the operator to A/B test finishes, lighting and acoustics under real conditions.",
      "Custom walnut headboard and joinery house every guest touchpoint — controls, lighting, minibar — behind a single continuous surface.",
      "Bathroom marble was templated with laser scans to eliminate visible joints across the shower enclosure.",
    ],
  },
  {
    slug: "wellness-spa",
    name: "Amara Wellness Spa",
    sector: "Leisure",
    location: "Palm Jumeirah, Dubai",
    client: "Five-star Resort Operator",
    scope: "Fit-out, Joinery, Stone & MEP",
    year: "2023",
    image: wellnessSpa1,
    gallery: [wellnessSpa1, jumeiraClubhouse1, hotelSuite1],
    summary:
      "A vaulted subterranean spa in Jerusalem limestone, candlelight and mirror-still water.",
    narrative: [
      "Every stone was numbered, dry-laid off-site, then re-laid on the vaults with a 1mm joint tolerance.",
      "The reflecting pool uses a silent gravity-return system engineered by our MEP team to keep the surface glass-flat.",
      "Air handling was designed for humidity control without airflow — you feel warmth, never a draught.",
    ],
  },
  {
    slug: "contemporary-art-gallery",
    name: "Meridian Art Gallery",
    sector: "Cultural",
    location: "Alserkal Avenue, Dubai",
    client: "Private Collector",
    scope: "Base Build & Fit-out",
    year: "2024",
    image: artGallery1,
    gallery: [artGallery1, flagshipBoutique1, corporateHeadquarters1],
    summary:
      "A neutral, museum-grade gallery volume with a reconfigurable wall system and tunable track lighting.",
    narrative: [
      "The wall system was engineered in-house: freestanding, structural, movable in a single hour by a two-person team.",
      "Environmental control is museum-spec — 50% RH ±5, 20°C ±1 — while remaining fully invisible in the gallery volume.",
      "Track lighting is DALI-controlled with scene presets for each exhibition, saved directly from the curator's tablet.",
    ],
  },
];

export const getProjectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
