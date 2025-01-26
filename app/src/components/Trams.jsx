import React from 'react';
import LineNumber from './LineNumber';
import tramIcon from '../images/tram.svg';
import { tramLines } from '../common/data.js';

const Trams = () => {
  return (
    <div>
      <h2 className="heading">Linie Tramwajowe <img className="icon" src={tramIcon} alt="Ikonka tramwaju" /></h2>
      <div className="row">
        {tramLines.map(item => (
          <div className="col" key={item}>
            <LineNumber line={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Trams;
