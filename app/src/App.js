import React, { Component } from 'react';
import { tramLines, busLines, tramsColors } from './common/data.js';
import './App.css';
import tramIcon from './images/tram.svg';
import busIcon from './images/bus.svg';

const SearchResults = props => {
  if (props.result.length && !props.isEmpty) {
    return (
      <div className="results-list">
        {props.result.map(item => (<div className="search-row">{item.name} <span className="tag">{item.symbol}</span></div>))}
      </div>
    )
  } else {
    return (<div className="no-results"></div>)
  }
}

class SearchStopPoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      query: '',
      error: null,
      isLoaded: false,
      stopPoints: []
    }
 
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInput(event) {
    const value = event.target.value
    this.setState({query: value})
    if (value === '') this.setState({stopPoints: []})
  }

  handleSubmit(event) {
    const url = "http://localhost:3001/stopPoints/" + this.state.query
    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          times: result.times,
          stopPoints: result
        })
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
    event.preventDefault()
  }

  render() {
    return (
      <div className="search-component">
        <form onSubmit={this.handleSubmit}>
          <div className="search-bar">
            <input className="search-form" type="text" value={this.state.query} onChange={this.handleInput} placeholder="Wpisz nazwę przystanku" />
          </div>
        </form>
        <div className="results-container">
          <SearchResults result={this.state.stopPoints} isEmpty={this.state.query.length === 0} />
        </div>
      </div>
    )
  }
}

const LineNumber = props => {
  if (tramLines.indexOf(props.line) !== -1) {
    return (
      <h2 className="direction-line direction-line__tram" style={tramsColors[props.line]}>
        <div className="line-signature">{props.line}</div>
      </h2>
    )
  } else {
    return (
      <h2 className="direction-line">{props.line}</h2>
    )
  }
}

class Line extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      directions: []
    }
  }

  componentDidMount() {
    const url = "http://localhost:3001/bollardsByLine/" + this.props.number
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            times: result.times,
            directions: result.directions
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, directions } = this.state
    if (error) {
      return <div className="error"><LineNumber line={this.props.number} /> Coś poszło nie tak!</div>
    } else if (!isLoaded) {
      return <div>Wczytywanie danych...</div>
    } else {
      return (
        <div className="directions">
          {directions.map(direction => (
            <div className="direction" key={direction.direction.direction}>
              <div className="direction-heading">
                <LineNumber line={direction.direction.lineName} />
                <h2 className="direction-direction">Kierunek: {direction.direction.direction}
                  <span title={'returnVariant:' + direction.direction.returnVariant.toString()}>{direction.direction.returnVariant ? '\u2B06' : '\u2B07' }</span>
                </h2> 
              </div>
              {direction.bollards.map(bollard => (
                <div className="direction-bollards" key={bollard.name}>
                  <div><div className={"order-no " + (bollard.orderNo === 1 && "first")}>{bollard.orderNo}.</div> <span className="bollard-name">{bollard.name}</span> <span className="tag">{bollard.tag}</span></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    }
  }
}

class StopPoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      times: [],
      bollard: {}
    }
  }

  loadData() {
    const url = "http://localhost:3001/times/" + this.props.tag;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            times: result.times,
            bollard: result.bollard
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  componentDidMount() {
    this.loadData()
    setInterval(() => {this.loadData()}, 15000)
  }

  render() {
    const { error, isLoaded, times, bollard } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Wczytywanie danych...</div>;
    } else {
      return (
        <div className="stop-point">
          <div className="stop-point__data">
            <h2 className="item-name">{bollard.name}</h2>
            <h3 className="item-tag" title={bollard.symbol}>{bollard.tag}</h3>
          </div>
          <div className="stop-point__rows">
            <div className="stop-point__headings">
              <div className="item-property item-line">Linia</div>
              <div className="item-property item-direction">Kierunek</div>
              <div className="item-property item-minutes">Odjazd</div>
            </div>
            {times.map((item, index) => (
            <div className="stop-point__item" key={index}>
              <div className="item-property item-line">{item.line}</div>
              <div className="item-property item-direction">{item.direction}</div>
              <div className="item-property item-info">
                { item.lowFloorBus &&
                  <span title="pojazd niskopodłgowy">{"\u267F"}</span>
                }
              </div>
              <div className="item-property item-minutes">{item.minutes} min</div>
            </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const BollardRow = props => {
  return (
    <div className="stop-point__data">
      <h2 className="item-name">{props.bollard.name}</h2>
      <h3 className="item-tag" title={props.bollard.symbol}>{props.bollard.tag}</h3>
    </div>
  )
}

const Directions = props => {
  return (
    <div>
      <div className="stop-point__headings">
        <div className="item-property item-line">Linia</div>
         <div className="item-property item-direction">Kierunek</div>
      </div>
      {props.directions.map((item, index) => (
        <div className="stop-point__item" key={index}>
          <div className="item-property item-line">{item.lineName}</div>
          <div className="item-property item-direction">{item.direction}</div>
        </div>
      ))}
    </div>
  )
}

class BollardByStopPoint extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isLoaded: false,
      bollards: []
    }
  }

  componentDidMount() {
    const url = "http://localhost:3001/bollardsByStopPoint/" + this.props.name
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            bollards: result.bollards
          })
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          })
        }
      )
  }

  render() {
    const { error, isLoaded, bollards } = this.state
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Wczytywanie danych...</div>;
    } else {
      return (
        <div className="stop-point">
          <div className="stop-point__rows">
            {bollards.map((item, index) => (
              <div className="stop-point__card" key={index}>
                <BollardRow bollard={item.bollard} />
                <Directions directions={item.directions} />
              </div>
            ))}
          </div>
        </div>
      );
    }
  }
}

const Trams = () => {
  return (
    <div>
      <h2 className="heading">Linie Tramwajowe <img className="icon" src={tramIcon} alt="Ikonka tramwaju" /></h2>
      <div className="row">
        {tramLines.map(item => (
          <div className="col" key={item}>
            <LineNumber line={item} />
          </div>
        ))}
      </div>
    </div>
  )
}

const Buses = () => (
  <div>
    <h2 className="heading">Linie Autobusowe <img className="icon" src={busIcon} alt="Ikonka tramwaju" /></h2>
    <div className="row">
      {busLines.map(item => (
        <div className="col" key={item}>
          <LineNumber line={item} />
        </div>
      ))}
    </div>
  </div>
)

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
