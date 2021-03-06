import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BollardRow from './BollardRow.js';
import Directions from './Directions.js';
import Spinner from './Spinner.js';

import { API_URL } from '../common/data'

export default class BollardsBy extends Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      bollards: []
    };
  }

  componentDidMount() {
    const url = API_URL + "/" + this.props.method + "/" + this.props.name;
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
              <Link to={`/przystanek/${item.bollard.tag}`} className="stop-point__card" key={index}>
                <BollardRow bollard={item.bollard} />
                <Directions directions={item.directions} />
              </Link>
            ))}
          </div>
        </div>
      );
    }    
  }
}
