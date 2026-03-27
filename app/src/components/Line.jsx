import { Link, useParams } from 'react-router-dom';

import LineNumber from './LineNumber';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';
import Tag from './Tag.jsx';

import { API_URL } from '../common/data.js';
import useFetch from '../common/useFetch.js';

const getBollardOrderClass = (bollards, index) => {
  const current = bollards[index];
  const next = bollards[index + 1];
  const isFirst = current.orderNo === 1;
  const isLast = !next || current.orderNo > next.orderNo;
  return ["order-no", isFirst && "first", isLast && "last"].filter(Boolean).join(" ");
}

const Line = () => {
  const { number } = useParams();

  const url = `${API_URL}/bollardsByLine/${number}`;
  const { data, error, loading } = useFetch(url);
  const directions = data?.directions;

  return (
    <>
      {loading && (<Spinner />)}
      {error && (<ErrorMessage><LineNumber line={number} /> Coś poszło nie tak!</ErrorMessage>)}
      {directions && (
        <div className="directions">
          {directions.map(({ bollards, direction }) => (
            <div className="direction" key={direction.direction}>
              <h2 className="direction-heading">
                <LineNumber line={direction.lineName} />
                <span className="direction-direction">Kierunek: {direction.direction}
                  <span title={'returnVariant:' + direction.returnVariant.toString()}>{direction.returnVariant ? '\u2B06' : '\u2B07'}</span>
                </span>
              </h2>
              <ol className="direction-bollards">
              {bollards.map((bollard, index, arr) => (
                <li className="direction-bollard" key={bollard.name}>
                  <Link to={`/przystanek/${bollard.tag}`} className="direction-bollard__link">
                    <span className={getBollardOrderClass(arr, index)}>{bollard.orderNo}.</span> <span className="bollard-name">{bollard.name}</span> <Tag>{bollard.tag}</Tag>
                  </Link>
                </li>
              ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Line;
