import { Link } from 'react-router-dom';
import { useState } from 'react';
import Clock from './Clock';
import Search from './Search';

const AppHeader = () => {
  const [open, setOpen] = useState(false);
  return (<header className="app-header">
    <div className="app-title">
      <h1 className="app-name"><Link className="app-name-link" to="/">Wirtualny Monitor</Link></h1>
      <button 
        type="button"
        className="btn mobile-only"
        aria-controls="app-search"
        aria-expanded={open}
        aria-label={open ? "Zamknij menu wyszukiwania" : "Otwórz menu wyszukiwania"}
        onClick={() => setOpen(!open)}>
          <span aria-hidden="true">☰</span>
      </button>
      <Clock />
    </div>
    <div className="header-description">
      <p>Monitor pokazuje rzeczywisty czas przyjazdu tramwaju lub autobusu na konkretny przystanek.</p>
      <p>Znajdź linię, która cię interesuje oraz przystanek z którego chcesz jechać, a system pokaże rzeczywisty czas przyjazdu.</p>
    </div>
    <div id="app-search" className={`app-search ${open ? "app-search_open" : ""}`}>
      <Search config={{ method: 'stopPoints', label: 'przystanki', path: 'przystanki', placeholder: 'Wpisz nazwę przystanku' }} />
      <Search config={{ method: 'streets', label: 'ulice', path: 'ulica', placeholder: 'Wpisz ulicę lub miejscowość' }} />
    </div>
  </header>);
}

export default AppHeader;