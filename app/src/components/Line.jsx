import { Link, useParams } from 'react-router-dom';

import LineNumber from './LineNumber';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

import { API_URL } from '../common/data.js';
import useFetch from '../common/useFetch.js';

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
          {directions.map(direction => (
            <div className="direction" key={direction.direction.direction}>
              <div className="direction-heading">
                <LineNumber line={direction.direction.lineName} />
                <h2 className="direction-direction">Kierunek: {direction.direction.direction}
                  <span title={'returnVariant:' + direction.direction.returnVariant.toString()}>{direction.direction.returnVariant ? '\u2B06' : '\u2B07'}</span>
                </h2>
              </div>
              {direction.bollards.map(bollard => (
                <div className="direction-bollards" key={bollard.name}>
                  <Link to={`/przystanek/${bollard.tag}`} className="direction-bollard__link">
                    <span className={"order-no " + (bollard.orderNo === 1 && "first")}>{bollard.orderNo}.</span> <span className="bollard-name">{bollard.name}</span> <span className="tag">{bollard.tag}</span>
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Line;
