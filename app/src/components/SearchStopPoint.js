import React, { Component } from 'react';
import SearchResults from './SearchResults.js';

import { API_URL } from '../common/data.js';

export default class SearchStopPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error: null,
      isLoaded: false,
      stopPoints: []
    };
 
    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const value = event.target.value;
    this.setState({query: value});
    if (value === '') this.setState({stopPoints: []});
  }

  handleSubmit(event) {
    const url = API_URL + '/stopPoints/' + this.state.query;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          times: result.times,
          stopPoints: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
    event.preventDefault();
  }

  render() {
    return (
      <div className="search-component">
        <form onSubmit={this.handleSubmit}>
          <div className="search-bar">
            <input className="search-form" type="text" value={this.state.query} onChange={this.handleInput} placeholder="Wpisz nazwę przystanku" />
          </div>
        </form>
        <div className="results-container">
          <SearchResults result={this.state.stopPoints} isEmpty={this.state.query.length === 0} />
        </div>
      </div>
    );
  }
}
