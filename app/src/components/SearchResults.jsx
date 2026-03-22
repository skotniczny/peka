import { Link } from 'react-router-dom';

const SearchResults = ({ result, isEmpty, path }) => {
  if (!result.length || isEmpty) return null;

  return (
    <ul className="results-list">
      {result.map((item, index) => (
        <li className="search-row" key={`${path}-${index}`}>
          <Link to={`/${path}/${encodeURIComponent(item.name)}`} className="search-row-link">
            {item.name} {(item.symbol ? <span className="tag">{item.symbol}</span> : "")}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
