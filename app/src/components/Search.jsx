import { Component } from 'react';
import SearchResults from './SearchResults';

import { API_URL } from '../common/data.js';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      error: null,
      isLoading: false,
      isLoaded: false,
      results: []
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInput(event) {
    const value = event.target.value;
    this.setState({ query: value });
    if (value === '') this.setState({ results: [] });
  }

  handleSubmit(event) {
    const url = API_URL + '/' + this.props.config.method + '/' + this.state.query;
    this.setState({ isLoading: true });
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoading: false,
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
    const { path, label, placeholder } = this.props.config;
    return (
      <div className="search-component">
        <form onSubmit={this.handleSubmit}>
          <div className="search-bar">
            <label className="form-label">{label}</label>
            <div className="form-container has-loader">
              <input className="search-form" type="text" value={this.state.query} onChange={this.handleInput} placeholder={placeholder} />
              <span className={`loader ${this.state.isLoading ? "loading" : ""}`}></span>
            </div>
          </div>
        </form>
        <div className="results-container">
          <SearchResults key={label} path={path} result={this.state.results} isEmpty={this.state.query.length === 0} />
        </div>
      </div>
    );
  }
}
