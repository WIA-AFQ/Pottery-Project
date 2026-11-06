import { STORAGE_URL } from "./api";
import tajin1 from "./assets/images/tajin1.jpg";
import vase1 from "./assets/images/vase1.jpg";
import bol1 from "./assets/images/bol1.jpg";
import Assiettes3 from "./assets/images/Assiettes3.jpg";
import Tasses4 from "./assets/images/Tasses4.jpg";
import Tasses5 from "./assets/images/Tasses5.jpg";
import Tasses3 from "./assets/images/Tasses3.jpg";
import zlaif2 from "./assets/images/zlaif2.jpg";
import deco from "./assets/images/deco.jpg";
import ffr from "./assets/images/ffr.jpeg";
import fr from "./assets/images/fr.jpeg";

const local = {
  "tajin1.jpg": tajin1, "vase1.jpg": vase1, "bol1.jpg": bol1,
  "Assiettes3.jpg": Assiettes3, "Tasses4.jpg": Tasses4, "Tasses5.jpg": Tasses5,
  "Tasses3.jpg": Tasses3, "zlaif2.jpg": zlaif2, "deco.jpg": deco,
  "ffr.jpeg": ffr, "fr.jpeg": fr,
};

export const defaultImage = tajin1;

export function resolveImage(image) {
  if (!image) return tajin1;
  if (/^https?:\/\//.test(image)) return image;
  if (local[image]) return local[image];
  return `${STORAGE_URL}/${image}`;
}

// Laravel (prix/description) -> shape your components already use (price/desc)
export const mapProduct = (p) => ({
  id: p.id,
  name: p.name,
  price: Number(p.prix),
  desc: p.description,
  image: resolveImage(p.image),
});