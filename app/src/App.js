import React, { Component } from 'react';
import { tramLines } from './common/data.js';
import './App.css';

import SearchStopPoint from './components/SearchStopPoint.js';
import Trams from './components/Trams.js';
import Buses from './components/Buses.js';
import StopPoint from './components/StopPoints.js';
import Line from './components/Line.js';
import BollardByStopPoint from './components/BollardsByStopPoint.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchStopPoint />
        <Trams />
        <Buses />
        <StopPoint tag="SCIE03" />
        <StopPoint tag="ALSO42" />
        {tramLines.map((line, index) => (<Line number={line} key={index} />))}
        <BollardByStopPoint name="Poznań Główny"/>
      </div>
    );
  }
}

export default App;
