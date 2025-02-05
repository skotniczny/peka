import { Link } from 'react-router-dom';
import Clock from './Clock';
import Search from './Search';

const AppHeader = () => (
  <header className="app-header">
    <div className="app-title">
      <h1 className="app-name"><Link className="app-name-link" to="/">Wirtualny Monitor</Link></h1>
      <Clock />
    </div>
    <div className="header-description">
      <p>Monitor pokazuje rzeczywisty czas przyjazdu tramwaju lub autobusu na konkretny przystanek.</p>
      <p>Znajdź linię, która cię interesuje oraz przystanek z którego chcesz jechać, a system pokaże rzeczywisty czas przyjazdu.</p>
    </div>
    <Search config={{ method: 'stopPoints', label: 'przystanki', path: 'przystanki', placeholder: 'Wpisz nazwę przystanku' }} />
    <Search config={{ method: 'streets', label: 'ulice', path: 'ulica', placeholder: 'Wpisz ulicę lub miejscowość' }} />
  </header>
)

export default AppHeader;