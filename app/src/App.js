import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { BASENAME } from './common/data';

import './App.css';

import AppHeader from './components/AppHeader';
import Lines from './components/Lines';
import Line from './components/Line';
import StopPoint from './components/StopPoints';
import BollardsBy from './components/BollardsBy';

class App extends Component {
  render() {
    return (
      <Router basename={BASENAME}>
        <div className="App">
          <AppHeader />
          <main className="app-main">
            <div className="main-content">
              <Route exact path="/" component={Lines} />
              <Route path={`/linia/:number`} children={<Line />} />
              <Route path={`/przystanek/:tag`} children={<StopPoint />} />
              <Route path={`/przystanki/:name`} children={<BollardsBy method="bollardsByStopPoint" />} />
              <Route path={`/ulica/:name`} children={<BollardsBy method="bollardsByStreet" />} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
