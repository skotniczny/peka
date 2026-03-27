import LinesSection from './LinesSection';
import tramIcon from '../images/tram.svg';
import { tramLines } from '../common/data.js';

const Trams = () => (
  <LinesSection
    heading="Linie Tramwajowe"
    icon={tramIcon}
    lines={tramLines}
  />
);

export default Trams;
