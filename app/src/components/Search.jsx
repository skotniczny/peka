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
  const inputId = `search-${method}`

  const handleChange = (event) => {
    setQuery(event.target.value);
    if (event.target.value === "") setResults([]);
  }

  const handleFocus = () => {
    if (results.length > 0) setIsOpen(true);
  }

  const handleBlur = (event) => {
    if (!ref.current.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
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
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside)
  }, []);

  return (
    <div className="search-component" ref={ref} onBlur={handleBlur}>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <label htmlFor={inputId} className="form-label">{label}</label>
          <div className="form-container has-loader">
            <input 
              id={inputId}
              className="search-form"
              type="text"
              value={query}
              onChange={handleChange}
              onFocus={handleFocus}
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