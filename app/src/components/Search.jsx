import { useEffect, useState, useRef } from 'react';
import SearchResults from './SearchResults';

import { API_URL } from '../common/data.js';
import { handleResponse } from '../common/utils.js';

const Search = ({config}) => {
  const ref = useRef();

  const { method, label, path, placeholder } = config
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOnChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value === "") setResults([]);
  }

  const handleOnFocus = () => {
    if (results.length > 0) setIsOpen(true);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    const url = API_URL + '/' + method + '/' + query;
    setIsLoading(true);
    fetch(url)
      .then(handleResponse)
      .then(
        (result) => {
          setIsLoading(false);
          setResults(result);
          setIsOpen(true);
        },
        (error) => {
          setIsLoading(false);
          console.debug(error);
        }
      );
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside)
  }, []);

  return (
    <div className="search-component" ref={ref}>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <label className="form-label">{label}</label>
          <div className="form-container has-loader">
            <input 
              className="search-form"
              type="text"
              value={query}
              onChange={handleOnChange}
              onFocus={handleOnFocus}
              placeholder={placeholder} />
            <span className={`loader ${isLoading ? "loading" : ""}`}></span>
          </div>
        </div>
      </form>
      <div className="results-container">
        {isOpen && <SearchResults key={label} path={path} result={results} isEmpty={query.length === 0} />}
      </div>
    </div>
  );
}

export default Search;