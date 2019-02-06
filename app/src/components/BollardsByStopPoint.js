import React, { Component } from 'react';
import BollardRow from './BollardRow.js';
import Directions from './Directions.js';
import Spinner from './Spinner.js';

import { API_URL } from '../common/data.js'

export default class BollardByStopPoint extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bollards: []
    };
  }

  componentDidMount() {
    const url = API_URL + '/bollardsByStopPoint/' + this.props.name;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            bollards: result.bollards
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      );
  }

  render() {
    const { error, isLoaded, bollards } = this.state;
    if (error) {
      return (<div>Error: {error.message}</div>);
    } else if (!isLoaded) {
      return <Spinner />;
    } else {
      return (
        <div className="stop-point">
          <div className="stop-point__rows">
            {bollards.map((item, index) => (
              <div className="stop-point__card" key={index}>
                <BollardRow bollard={item.bollard} />
                <Directions directions={item.directions} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}
