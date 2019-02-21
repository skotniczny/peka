import React from 'react';
import { Link } from 'react-router-dom';

const SearchResults = props => {
  if (props.result.length && !props.isEmpty) {
    return (
      <div className="results-list">
        {props.result.map((item, index) => (
          <div className="search-row" key={`${props.path}-${index}`}>
            <Link to={`/${props.path}/${encodeURIComponent(item.name)}`} className="search-row-link">
              {item.name} {(item.symbol ? <span className="tag">{item.symbol}</span> : "")}
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
