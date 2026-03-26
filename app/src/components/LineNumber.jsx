import { Link } from 'react-router-dom';
import { tramLines, tramsColors, nightTramLines, nightLines } from '../common/data.js';

const LineNumber = ({line}) => {
  const isTram = tramLines.includes(line) || nightTramLines.includes(line); 
  const isNight = nightLines.includes(line);

  const className = [
    "direction-line",
    isTram && "direction-line__tram",
    isNight && "direction-line__night",
  ].filter(Boolean).join(" ");

  return (
    <span className={className} style={tramsColors[line] && { ...tramsColors[line], borderColor: "transparent" }}>
      <Link to={`/linia/${line}`} className="direction-line__link">{line}</Link>
    </span>
  );
}

export default LineNumber;