const Directions = ({ directions }) => {
  return (
    <div role="table">
      <div className="stop-point__headings" role="row">
        <div className="item-property item-line" role="columnheader">Linia</div>
        <div className="item-property item-direction" role="columnheader">Kierunek</div>
      </div>
      {directions.map((item, index) => (
        <div className="stop-point__item" role="row" key={index}>
          <div className="item-property item-line" role="cell">{item.lineName}</div>
          <div className="item-property item-direction" role="cell">{item.direction}</div>
        </div>
      ))}
    </div>
  );
}

export default Directions;