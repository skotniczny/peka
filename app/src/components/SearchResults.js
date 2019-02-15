import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = props => {
  if (props.result.length && !props.isEmpty) {
    return (
      <div className="results-list">
        {props.result.map(item => (
          <div className="search-row" key={item.symbol}>
            <Link to={`/przystanki/${encodeURIComponent(item.name)}`} className="search-row-link">
              {item.name} <span className="tag">{item.symbol}</span>
            </Link>
          </div>
        ))}
      </div>
    );
  } else {
    return (<div className="no-results"></div>);
  }
}

export default SearchResults;