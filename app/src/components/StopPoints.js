import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import StopPointDepartureTime from './StopPointDepartureTime';

import { API_URL } from '../common/data';

function StopPoint() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [times, setTimes] = useState(null);
  const [bollard, setBollard] = useState(null);
  const { tag } = useParams();

  const getData = (tag) => {
    const url = `${API_URL}/times/${tag}`;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setTimes(result.times);
          setBollard(result.bollard);
          setIsLoaded(true);
        },
        (error) => {
          setError(error);
          setIsLoaded(true);

        }
      );
  };
  
  useEffect(() => {
    getData(tag)
    const id = setInterval(() => {
      getData(tag)
    }, 15000);
    return () => clearInterval(id)
  }, [tag]); 
  
  return (
    <React.Fragment>
      {!isLoaded && (<Spinner />) }
      {error && (<div>Error: {error.message}</div>)}
      {bollard && times && (
        <div className="stop-point">
          <div className="stop-point__data">
            <h2 className="item-name">{bollard.name}</h2>
            <h3 className="item-tag" title={bollard.tag}>{bollard.symbol}</h3>
          </div>
          <div className="stop-point__rows">
            <div className="stop-point__headings">
              <div className="item-property item-line">Linia</div>
              <div className="item-property item-direction">Kierunek</div>
              <div className="item-property item-minutes">Odjazd</div>
            </div>
            {times.map((item, index) => (
            <div className="stop-point__item" key={index}>
              <div className="item-property item-line">{item.line}</div>
              <div className="item-property item-direction">{item.direction}</div>
              <div className="item-property item-info">
                { item.lowFloorBus &&
                  <span title="pojazd niskopodłgowy">{"\u267F"}</span>
                }
              </div>
              <StopPointDepartureTime item={item} />
            </div>
            ))}
          </div>
        </div>
      )}
    </React.Fragment>
  )
}

export default StopPoint;
