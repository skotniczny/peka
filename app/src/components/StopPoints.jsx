import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import StopPointDepartureTime from './StopPointDepartureTime';

import { API_URL } from '../common/data';
import { handleResponse } from '../common/utils';

const StopPoint = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [times, setTimes] = useState(null);
  const [bollard, setBollard] = useState(null);
  const { tag } = useParams();

  const getData = useCallback(() => {
    const controller = new AbortController();
    const url = `${API_URL}/times/${tag}`;
    fetch(url, { signal: controller.signal })
      .then(handleResponse)
      .then(
        (result) => {
          setError(null);
          setTimes(result.times);
          setBollard(result.bollard);
          setIsLoaded(true);
        },
        (error) => {
          if (error.name !== 'AbortError') {
            setError(error);
            setIsLoaded(true);
          }
        }
      );

    return controller;
  }, [tag]);

  useEffect(() => {
    let controller = getData();
    const id = setInterval(() => {
      controller.abort();
      controller = getData();
    }, 15000);
    return () => {
      controller.abort();
      clearInterval(id);
    };
  }, [getData]);

  return (
    <>
      {!isLoaded && (<Spinner />)}
      {error && (<div className="error">Error: {error.message}</div>)}
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
            {times.map((item) => (
              <div className="stop-point__item" key={`${item.departure}_${item.line}`}>
                <div className="item-property item-line">{item.line}</div>
                <div className="item-property item-direction">{item.direction}</div>
                <div className="item-property item-info">
                  {item.lowFloorBus &&
                    <span title="pojazd niskopodłgowy">{"\u267F"}</span>
                  }
                  {item.lowEntranceBus &&
                    <span title="pojazd z niską podłogą w środkowym członie">{"\u267F"}</span>
                  }
                  {item.lfRamp &&
                    <span title="pojazd niskopodłogowy z rampą">{"\u267F"}</span>
                  }
                  {item.leRamp &&
                    <span title="pojazd z niską podłogą w środkowym członie z rampą">{"\u267F"}</span>
                  }
                  {item.airCnd &&
                    <span title="klimatyzacja">{"\u2744"}</span>
                  }
                  {item.bike &&
                    <span title="możliwość przewozu rowerów">{"\u{1F6B2}"}</span>
                  }
                </div>
                <StopPointDepartureTime item={item} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default StopPoint;
