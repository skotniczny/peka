import React from 'react';
import LineNumber from './LineNumber';
import busIcon from '../images/bus.svg';
import { busLines } from '../common/data.js';

const Buses = () => (
  <div>
    <h2 className="heading">Linie Autobusowe <img className="icon" src={busIcon} alt="Ikonka tramwaju" /></h2>
    <div className="row">
      {busLines.map(item => (
        <div className="col" key={item}>
          <LineNumber line={item} />
        </div>
      ))}
    </div>
  </div>
)

export default Buses;