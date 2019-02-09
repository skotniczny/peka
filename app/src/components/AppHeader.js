import React from 'react';
import SearchStopPoint from './SearchStopPoint';
import { Link } from 'react-router-dom';

const AppHeader = () => (
  <header className="app-header">
  <h1 className="app-name"><Link className="app-name-link" to="/">Wirtualny Monitor</Link></h1>
  <div className="header-description">
    <p>Monitor pokazuje rzeczywisty czas przyjazdu tramwaju lub autobusu na konkretny przystanek.</p>
    <p>Znajdź linię, która cię interesuje oraz przystanek z którego chcesz jechać, a system pokaże rzeczywisty czas przyjazdu.</p>
  </div>
  <SearchStopPoint />
</header>
)

export default AppHeader;