import Buses from "./Buses";
import NightLines from "./NightLines";
import Trams from "./Trams";

const Lines = () => (
  <div className="lines-list">
    <Trams />
    <Buses />
    <NightLines />
  </div>
)

export default Lines;