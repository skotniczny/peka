import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import BollardRow from './BollardRow';
import Directions from './Directions';
import Spinner from './Spinner';
import ErrorMessage from './ErrorMessage';

import { API_URL } from '../common/data.js'
import useFetch from '../common/useFetch.js';

const BollardsBy = ({ method }) => {
  const { name } = useParams();
  const url = `${API_URL}/${method}/${encodeURIComponent(name)}`;
  const { data, error, loading } = useFetch(url);
  const bollards = data?.bollards;

  return (
    <>
      {loading && (<Spinner />)}
      {error && (<ErrorMessage>Error: {error.message}</ErrorMessage>)}
      {bollards && (
        <div className="stop-point">
          <div className="stop-point__rows">
            {bollards.map((item, index) => (
              <Link to={`/przystanek/${item.bollard.tag}`} className="stop-point__card" key={index}>
                <BollardRow bollard={item.bollard} />
                <Directions directions={item.directions} />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default BollardsBy;
