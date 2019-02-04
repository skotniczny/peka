import React from 'react';

const SearchResults = props => {
  if (props.result.length && !props.isEmpty) {
    return (
      <div className="results-list">
        {props.result.map(item => (<div className="search-row">{item.name} <span className="tag">{item.symbol}</span></div>))}
      </div>
    );
  } else {
    return (<div className="no-results"></div>);
  }
}

export default SearchResults;