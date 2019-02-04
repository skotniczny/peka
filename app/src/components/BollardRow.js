import React from 'react';

const BollardRow = props => {
  return (
    <div className="stop-point__data">
      <h2 className="item-name">{props.bollard.name}</h2>
      <h3 className="item-tag" title={props.bollard.symbol}>{props.bollard.tag}</h3>
    </div>
  );
}

export default BollardRow;
