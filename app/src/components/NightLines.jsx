import { nightLines } from "../common/data";
import LineNumber from "./LineNumber";
import nightLineIcon from "../images/night.svg";

const NightLines = () => {
  return (
    <section>
      <h2 className="heading">Linie Nocne <img className="icon" src={nightLineIcon} alt="" /></h2>
      <div className="row">
        {nightLines.map(item => (
          <div className="col" key={item}>
            <LineNumber line={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NightLines;
