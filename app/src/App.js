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
              <Route path={`/przystanek/:tag`} render={({match}) => (<StopPoint tag={match.params.tag} />)} />
              <Route path={`/przystanki/:name`} render={({match}) => (<BollardsBy method="bollardsByStopPoint" name={match.params.name} key={`przystanki-${match.params.name}`} />)} />
              <Route path={`/ulica/:name`} render={({match}) => (<BollardsBy method="bollardsByStreet" name={match.params.name} key={`ulice-${match.params.name}`} />)} />
            </div>
          </main>
        </div>
      </Router>
    );
  }
}

export default App;
