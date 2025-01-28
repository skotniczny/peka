import { Link } from 'react-router-dom';

import { tramLines, tramsColors } from '../common/data.js';

const LineNumber = ({line}) => {
  if (tramLines.indexOf(line) !== -1) {
    return (
      <h2 className="direction-line direction-line__tram" style={tramsColors[line]}>
        <Link to={`/linia/${line}`} className="direction-line__link">
          <div className="line-signature">{line}</div>
        </Link>
      </h2>
    );
  } else {
    return (
      <h2 className="direction-line">
        <Link to={`/linia/${line}`} className="direction-line__link">
          {line}
        </Link>
      </h2>
    );
  }
}

export default LineNumber;