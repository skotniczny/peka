import { useState} from 'react';
import { formatDate } from '../common/utils';
import { useEffect } from 'react';

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const tick = () => {
    setDate(new Date())
  }

  useEffect(() => {
    const id = setTimeout(() => (tick(), 1000));
    return () => clearTimeout(id)
  }, [date]);

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
