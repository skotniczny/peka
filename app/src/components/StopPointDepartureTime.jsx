import { formatDate, HHmm } from '../common/utils';

const StopPointDepartureTime = ({ item }) => {
  const { realTime, minutes, departure } = item
  const isBlink = realTime && minutes === 0;
  const display = realTime ? 
    `${isBlink ? "<1" : minutes} min` : 
    formatDate(departure, HHmm);

  return (
    <div className={`item-property item-minutes${isBlink ? " blink" : ""}`} role="cell">
      {display}
    </div>
  );
}

export default StopPointDepartureTime;
