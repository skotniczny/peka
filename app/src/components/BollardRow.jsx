const BollardRow = ({bollard}) => {
  return (
    <div className="stop-point__data">
      <h2 className="item-name">{bollard.name}</h2>
      <h3 className="item-tag" title={bollard.symbol}>{bollard.tag}</h3>
    </div>
  );
}

export default BollardRow;
