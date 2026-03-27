import LinesSection from "./LinesSection";
import { nightLines } from "../common/data";
import nightLineIcon from "../images/night.svg";

const NightLines = () => (
  <LinesSection
    heading="Linie Nocne"
    icon={nightLineIcon}
    lines={nightLines}
  />
);

export default NightLines;
