import type { ImageSet } from "@/assets/generated/images";
import {
  foretCafe1,
  foretCafe2,
  bikanerwala3,
  tbk1,
  tbk5,
  commongrounds1,
  warehouseGymDIFC1,
  warehouseGymDSP1,
  natureland1,
  barakaOffice5,
  amano1,
  goldenGoose5,
  octagonOffice4,
  trouvaille1,
  equitiesFirst1,
  flor4,
  haldirams6,
  londonSkin1,
  zaraMarina2,
  warehouseGymJumeirahPark5,
} from "@/assets/generated/images";

export type HeroImage = {
  image: ImageSet;
  alt: string;
};

// Curated, ordered list of photos shown in the homepage hero ring
// (src/components/HeroCurved.tsx). Cherry-picked directly — not tied to
// individual project entries, so this can be edited freely without touching
// src/lib/projects.ts. Add/remove/reorder entries here to change the hero.
export const heroImages: HeroImage[] = [
  { image: foretCafe1, alt: "Foret Cafe interior" },
  { image: tbk1, alt: "TBK interior" },
  { image: tbk5, alt: "TBK interior" },
  { image: foretCafe2, alt: "Foret Cafe interior" },
  { image: bikanerwala3, alt: "Bikanerwala restaurant interior" },
  { image: commongrounds1, alt: "Common Grounds interior" },
  { image: warehouseGymDIFC1, alt: "Warehouse Gym DIFC interior" },
  { image: warehouseGymDSP1, alt: "Warehouse Gym Dubai Science Park interior" },
  { image: natureland1, alt: "Natureland Supermarket interior" },
  { image: barakaOffice5, alt: "Baraka Office interior" },
  { image: amano1, alt: "Amano Restaurant interior" },
  { image: goldenGoose5, alt: "Golden Goose store interior" },
  { image: octagonOffice4, alt: "Octagon Office interior" },
  { image: trouvaille1, alt: "Trouvaille Coffee Shop interior" },
  { image: equitiesFirst1, alt: "Equities First Office interior" },
  { image: flor4, alt: "Flor Restaurant interior" },
  { image: haldirams6, alt: "Haldiram's Restaurant interior" },
  { image: londonSkin1, alt: "London Skin Clinic interior" },
  { image: zaraMarina2, alt: "Zara Marina Mall interior" },
  { image: warehouseGymJumeirahPark5, alt: "Warehouse Gym Jumeirah Park interior" },
];
