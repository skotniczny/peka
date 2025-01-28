const Directions = ({directions}) => {
  return (
    <div>
      <div className="stop-point__headings">
        <div className="item-property item-line">Linia</div>
         <div className="item-property item-direction">Kierunek</div>
      </div>
      {directions.map((item, index) => (
        <div className="stop-point__item" key={index}>
          <div className="item-property item-line">{item.lineName}</div>
          <div className="item-property item-direction">{item.direction}</div>
        </div>
      ))}
    </div>
  );
}

export default Directions;