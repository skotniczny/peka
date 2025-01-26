import React, { useEffect, useState} from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import BollardRow from './BollardRow';
import Directions from './Directions';
import Spinner from './Spinner';

import { API_URL } from '../common/data.js'

function BollardsBy({method}) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [bollards, setBollards] = useState(null);
  const { name } = useParams();
  const location = useLocation();

  const getData = (method, name) => {
    const url = `${API_URL}/${method}/${encodeURIComponent(name)}`;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setBollards(result.bollards);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);
        }
      );
  };

  useEffect(() => {
    getData(method, name)
  }, [location, method, name]);

  return (
    <React.Fragment>
      {!isLoaded && (<Spinner />)}
      {error && (<div className="error">Error: {error.message}</div>)}
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
    </React.Fragment>
  )
}

export default BollardsBy;
