import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from './Spinner';
import StopPointDepartureTime from './StopPointDepartureTime';
import ErrorMessage from './ErrorMessage';

import { API_URL } from '../common/data';
import { handleResponse } from '../common/utils';

const vehicleFeatures = [
  { key: "lowFloorBus", icon: "\u267F", title: "pojazd niskopodłogowy" },
  { key: "lowEntranceBus", icon: "\u267F", title: "pojazd z niską podłogą w środkowym członie" },
  { key: "lfRamp", icon: "\u267F", title: "pojazd niskopodłogowy z rampą" },
  { key: "leRamp", icon: "\u267F", title: "pojazd z niską podłogą w środkowym członie z rampą" },
  { key: "airCnd", icon: "\u2744", title: "klimatyzacja" },
  { key: "bike", icon: "\u{1F6B2}", title: "możliwość przewozu rowerów" },
];

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
      {error && (<ErrorMessage>Error: {error.message}</ErrorMessage>)}
      {bollard && times && (
        <div className="stop-point">
          <div className="stop-point__data">
            <h2 className="item-name">{bollard.name}</h2>
            <h3 className="item-tag" title={bollard.tag}>{bollard.symbol}</h3>
          </div>
          <div className="stop-point__rows" role="table">
            <div className="stop-point__headings" role="row">
              <div className="item-property item-line" role="columnheader">Linia</div>
              <div className="item-property item-direction" role="columnheader">Kierunek</div>
              <div className="item-property item-minutes" role="columnheader">Odjazd</div>
            </div>
            {times.map((item) => (
              <div className="stop-point__item" role="row" key={`${item.departure}_${item.line}`}>
                <div className="item-property item-line" role="cell">{item.line}</div>
                <div className="item-property item-direction" role="cell">{item.direction}</div>
                <div className="item-property item-info" role="cell">
                {vehicleFeatures.map(feature => item[feature.key] && (
                  <span key={feature.key} title={feature.title}>{feature.icon}</span>
                ))}
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
