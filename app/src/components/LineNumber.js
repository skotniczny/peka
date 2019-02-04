import React from 'react';
import { tramLines, tramsColors } from '../common/data.js';

const LineNumber = props => {
  if (tramLines.indexOf(props.line) !== -1) {
    return (
      <h2 className="direction-line direction-line__tram" style={tramsColors[props.line]}>
        <div className="line-signature">{props.line}</div>
      </h2>
    );
  } else {
    return (
      <h2 className="direction-line">{props.line}</h2>
    );
  }
}

export default LineNumber;