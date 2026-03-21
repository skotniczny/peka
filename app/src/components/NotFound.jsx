import { Link } from 'react-router-dom';
import busIcon from '../images/bus.svg';

const NotFound = () => (
  <>
    <h2>404 </h2>
    <p>Tutaj nie dojeżdżamy. <Link className="action-link" to="/">Wróć na trasę</Link></p>
    <p><img src={busIcon} alt="" /></p>
  </>
)

export default NotFound