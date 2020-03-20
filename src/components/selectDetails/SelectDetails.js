import React from "react";
import "./../../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import statistics from "./../../data/statistics.json";

class SelectDetails extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: [],
      activeId: 0
    };
  }

  componentWillMount() {
    this.setState({
      currentPath: this.props.path.path,
      activeId: parseInt(this.props.activeId, 10)
    });
  }

  render() {
    const { currentPath, activeId } = this.state;

    return (
      <div className="select-subpage__full-description">
        <p className="select-subpage__number">
          {activeId < 10 ? "0" + (activeId + 1) + "." : activeId + 1 + "."}
        </p>
        <p className="select-subpage__paragraph">
          Minimalny koszt doświadczenia: {currentPath.minimalExperienceCost}
        </p>
        <p className="select-subpage__paragraph">
          Maksymalny koszt doświadczenia: {currentPath.maximumExperienceCost}
        </p>
        <p className="select-subpage__paragraph">Zdolności do wyuczenia:</p>
        <ul className="select-subpage__list">
          {currentPath.abilitiesToLearn.map((item, key) => (
            <li className="select-subpage__list-item" key={key}>
              {item}
            </li>
          ))}
        </ul>
        <p className="select-subpage__paragraph">Umiejętności do wyuczenia:</p>
        <ul className="select-subpage__list">
          {currentPath.skillsToLearn.map((item, key) => (
            <li className="select-subpage__list-item" key={key}>
              {item}
            </li>
          ))}
        </ul>
        <table className="select-subpage__table">
          <thead>
            <tr>
              <td className="select-subpage__table-item"></td>
              {Object.keys(statistics).map((item, i) => (
                <td className="select-subpage__table-item">
                  {statistics[item].Name}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="select-subpage__table-item">Wartość początkowa</td>
              {Object.keys(currentPath.statistics).map((item, i) => (
                <td className="select-subpage__table-item">
                  {currentPath.statistics[item].originalValue}
                </td>
              ))}
            </tr>
            <tr>
              <td className="select-subpage__table-item">Wartość końcowa</td>
              {Object.keys(currentPath.statistics).map((item, i) => (
                <td className="select-subpage__table-item">
                  {currentPath.statistics[item].newValue}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default SelectDetails;
