import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { BASENAME } from './common/data';

import './App.css';

import Lines from './components/Lines';
import Line from './components/Line';
import StopPoint from './components/StopPoints';
import SearchStopPoint from './components/SearchStopPoint';

class App extends Component {
  render() {
    return (
      <Router basename={BASENAME}>
        <div className="App">
          <header className="app-header">
            <h1 className="app-name"><Link className="app-name-link" to="/">Wirtualny Monitor</Link></h1>
            <SearchStopPoint />
          </header>
          <Route exact path="/" component={Lines} />
          <Route path={`/linia/:number`} render={({match}) =>  (<Line number={match.params.number} />)} />
          <Route path={`/przystanek/:tag`} render={({match}) => (<StopPoint tag={match.params.tag} />)} />
        </div>
      </Router>
    );
  }
}

export default App;
