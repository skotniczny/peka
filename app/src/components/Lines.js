import React  from 'react';
import Buses from "./Buses";
import Trams from "./Trams";

const Lines = () => (
  <div className="lines-list">
    <Trams />
    <Buses />
  </div>
)

export default Lines;