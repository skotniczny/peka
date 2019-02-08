import React, { Component } from 'react';
import Spinner from './Spinner.js';

import { API_URL } from '../common/data.js';

export default class StopPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      times: [],
      bollard: {}
    };
    this.intervalID = 0;
  }

  loadData() {
    const url = API_URL + "/times/" + this.props.tag;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            times: result.times,
            bollard: result.bollard
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  componentDidMount() {
    this.loadData();
    this.intervalID = setInterval(() => {this.loadData()}, 15000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  render() {
    const { error, isLoaded, times, bollard } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <Spinner />;
    } else {
      return (
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
              <div className="item-property item-minutes">{item.minutes} min</div>
            </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
