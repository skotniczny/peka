import { Link } from 'react-router-dom';

const SearchResults = ({result, isEmpty, path}) => {
  if (result.length && !isEmpty) {
    return (
      <div className="results-list">
        {result.map((item, index) => (
          <div className="search-row" key={`${path}-${index}`}>
            <Link to={`/${path}/${encodeURIComponent(item.name)}`} className="search-row-link">
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
