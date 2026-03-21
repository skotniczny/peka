import { useState } from 'react';
import SearchResults from './SearchResults';

import { API_URL } from '../common/data.js';
import { handleResponse } from '../common/utils.js';

const Search = ({config}) => {
  const { method, label, path, placeholder } =  config
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleOnChange = (event) => {
    setQuery(event.target.value)
    if (event.target.value === "") setResults([])
  }

  const handleSubmit = (event) => {
    const url = API_URL + '/' + method + '/' + query;
    setIsLoading(true);
    fetch(url)
      .then(handleResponse)
      .then(
        (result) => {
          setIsLoading(false);
          setResults(result);
        },
        (error) => {
          setIsLoading(false);
          console.debug(error)
        }
      );
    event.preventDefault();
  }

  return (
    <div className="search-component">
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <label className="form-label">{label}</label>
          <div className="form-container has-loader">
            <input className="search-form" type="text" value={query} onChange={handleOnChange} placeholder={placeholder} />
            <span className={`loader ${isLoading ? "loading" : ""}`}></span>
          </div>
        </div>
      </form>
      <div className="results-container">
        <SearchResults key={label} path={path} result={results} isEmpty={query.length === 0} />
      </div>
    </div>
  );
}

export default Search;