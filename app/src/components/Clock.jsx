import { useState, useEffect } from 'react';
import { formatDate } from '../common/utils';

const Clock = () => {
  const [date, setDate] = useState(() => new Date());
  const tick = () => setDate(new Date());

  useEffect(() => {
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const offset = date.getTimezoneOffset() * 60000;
  const localDateISOString = (new Date(date - offset)).toISOString();
  return (
    <div className="clock">
      <div className="clock-time">{formatDate(localDateISOString, "HH:mm:ss")}</div>
      <div className="clock-date">{formatDate(localDateISOString, "dd.MM.yyyy")}</div>
    </div>
  );
}

export default Clock
