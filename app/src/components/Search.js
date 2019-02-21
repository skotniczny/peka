import React, { Component } from 'react';
import SearchResults from './SearchResults.js';

import { API_URL } from '../common/data.js';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error: null,
      isLoaded: false,
      results: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const value = event.target.value;
    this.setState({query: value});
    if (value === '') this.setState({results: []});
  }

  handleSubmit(event) {
    const url = API_URL + '/' + this.props.config.method + '/' + this.state.query;
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          results: result
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
    const {path, label, placeholder} = this.props.config;
    return (
      <div className="search-component">
        <form onSubmit={this.handleSubmit}>
          <div className="search-bar">
            <label className="form-label">{label}</label>
            <input className="search-form" type="text" value={this.state.query} onChange={this.handleInput} placeholder={placeholder} />
          </div>
        </form>
        <div className="results-container">
          <SearchResults key={label} path={path} result={this.state.results} isEmpty={this.state.query.length === 0} />
        </div>
      </div>
    );
  }
}
