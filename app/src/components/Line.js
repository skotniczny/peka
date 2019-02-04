import React, { Component } from 'react';
import LineNumber from './LineNumber.js';

export default class Line extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      directions: []
    };
  }

  componentDidMount() {
    const url = "http://localhost:3001/bollardsByLine/" + this.props.number;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            times: result.times,
            directions: result.directions
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

  render() {
    const { error, isLoaded, directions } = this.state;
    if (error) {
      return (<div className="error"><LineNumber line={this.props.number} /> Coś poszło nie tak!</div>);
    } else if (!isLoaded) {
      return (<div>Wczytywanie danych...</div>);
    } else {
      return (
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
                  <div><div className={"order-no " + (bollard.orderNo === 1 && "first")}>{bollard.orderNo}.</div> <span className="bollard-name">{bollard.name}</span> <span className="tag">{bollard.tag}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }
  }
}