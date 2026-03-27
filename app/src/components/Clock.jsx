import { useState, useEffect } from 'react';
import { formatDate, HHmmss, ddMMyyyy } from '../common/utils';

const Clock = () => {
  const [date, setDate] = useState(() => new Date());
  const tick = () => setDate(new Date());

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="clock">
      <div className="clock-time">{formatDate(date, HHmmss)}</div>
      <div className="clock-date">{formatDate(date, ddMMyyyy)}</div>
    </div>
  );
}

export default Clock
