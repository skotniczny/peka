import LineNumber from "./LineNumber";

const LinesSection = ({ heading, icon, lines }) => (
  <section>
    <h2 className="heading">{heading} <img className="icon" src={icon} alt="" /></h2>
    <div className="row">
      {lines.map(item => (
        <div className="col" key={item}>
          <LineNumber line={item} />
        </div>
      ))}
    </div>
  </section>
);

export default LinesSection;
