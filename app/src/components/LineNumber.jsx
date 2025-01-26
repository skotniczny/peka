import React from 'react';
import { Link } from 'react-router-dom';

import { tramLines, tramsColors } from '../common/data.js';

const LineNumber = props => {
  if (tramLines.indexOf(props.line) !== -1) {
    return (
      <h2 className="direction-line direction-line__tram" style={tramsColors[props.line]}>
        <Link to={`/linia/${props.line}`} className="direction-line__link">
          <div className="line-signature">{props.line}</div>
        </Link>
      </h2>
    );
  } else {
    return (
      <h2 className="direction-line">
        <Link to={`/linia/${props.line}`} className="direction-line__link">
          {props.line}
        </Link>
      </h2>
    );
  }
}

export default LineNumber;