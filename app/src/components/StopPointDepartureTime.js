import React from 'react';
import { getTime } from '../common/utils';

const StopPointDepartureTime = props => {
  const { realTime, minutes, departure } = props.item;

  let isBlink = false;
  let display = minutes;
  if (realTime) {
    if (minutes === 0) {
      display = "<1";
      isBlink = true;
    }
    display += " min";
  }

  return (
    <div className={"item-property item-minutes " + (isBlink ? "blink" : "")}>
      {realTime ? display : getTime(departure)}
    </div>
  );
}

export default StopPointDepartureTime;


