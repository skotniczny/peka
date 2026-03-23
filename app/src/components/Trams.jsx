import LineNumber from './LineNumber';
import tramIcon from '../images/tram.svg';
import { tramLines } from '../common/data.js';

const Trams = () => {
  return (
    <section>
      <h2 className="heading">Linie Tramwajowe <img className="icon" src={tramIcon} alt="" /></h2>
      <div className="row">
        {tramLines.map(item => (
          <div className="col" key={item}>
            <LineNumber line={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Trams;
