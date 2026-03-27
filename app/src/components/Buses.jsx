import LinesSection from './LinesSection';
import busIcon from '../images/bus.svg';
import { busLines } from '../common/data.js';

const Buses = () => (
  <LinesSection 
    heading="Linie Autobusowe"
    icon={busIcon}
    lines={busLines}
  />
);

export default Buses;
