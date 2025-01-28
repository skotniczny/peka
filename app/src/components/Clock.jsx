import { Component} from 'react';
import { formatDate } from '../common/utils';

export default class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }  

  render() {
    const offset = this.state.date.getTimezoneOffset() * 60000;
    const localDateISOString = (new Date(this.state.date - offset)).toISOString();
    return (
      <div className="clock">
        <div className="clock-time">{formatDate(localDateISOString, "HH:mm:ss")}</div>
        <div className="clock-date">{formatDate(localDateISOString, "dd.MM.yyyy")}</div>
      </div>
    );
  }
}
