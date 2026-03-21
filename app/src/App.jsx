import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BASENAME } from './common/data';

import './App.css';

import AppHeader from './components/AppHeader';
import Lines from './components/Lines';
import Line from './components/Line';
import StopPoint from './components/StopPoints';
import BollardsBy from './components/BollardsBy';
import NotFound from './components/NotFound';

const App = () => {
  return (
    <Router basename={BASENAME}>
      <div className="App">
        <AppHeader />
        <main className="app-main">
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Lines />} />
              <Route path={`/linia/:number`} element={<Line />} />
              <Route path={`/przystanek/:tag`} element={<StopPoint />} />
              <Route path={`/przystanki/:name`} element={<BollardsBy method="bollardsByStopPoint" />} />
              <Route path={`/ulica/:name`} element={<BollardsBy method="bollardsByStreet" />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
