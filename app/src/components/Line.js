import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import LineNumber from './LineNumber.js';
import Spinner from './Spinner.js';

import { API_URL } from '../common/data.js';

function Line() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [directions, setDirections] = useState(null);
  const { number } = useParams();

  const getData = (number) => {
    const url = `${API_URL}/bollardsByLine/${number}`;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setDirections(result.directions);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);

        }
      );
  };

  useEffect(() => {
    getData(number)
  }, [number]);

  return (
    <React.Fragment>
      {!isLoaded && (<Spinner />) }
      {error && (<div className="error"><LineNumber line={number} /> Coś poszło nie tak!</div>)}
      {directions && (
        <div className="directions">
          {directions.map(direction => (
            <div className="direction" key={direction.direction.direction}>
              <div className="direction-heading">
                <LineNumber line={direction.direction.lineName} />
                <h2 className="direction-direction">Kierunek: {direction.direction.direction}
                  <span title={'returnVariant:' + direction.direction.returnVariant.toString()}>{direction.direction.returnVariant ? '\u2B06' : '\u2B07' }</span>
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
    </React.Fragment>
  );
}

export default Line;
