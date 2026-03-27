import { Link } from 'react-router-dom';
import Tag from './Tag';

const SearchResults = ({ result, isEmpty, path }) => {
  if (!result.length || isEmpty) return null;

  return (
    <ul className="results-list">
      {result.map((item, index) => (
        <li className="search-row" key={`${path}-${index}`}>
          <Link to={`/${path}/${encodeURIComponent(item.name)}`} className="search-row-link">
            {item.name} {item.symbol && <Tag>{item.symbol}</Tag>}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default SearchResults;
