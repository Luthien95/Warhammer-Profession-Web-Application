import React from "react";
import "./../../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

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

    console.log(currentPath, activeId);
    return (
      <div className="select-subpage__full-description">
        <p className="select-subpage__number">
          {activeId < 10 ? "0" + (activeId + 1) + "." : activeId + 1 + "."}
        </p>
        <p>{activeId}</p>
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
              <td className="select-subpage__table-item">Walka wręcz</td>
              <td className="select-subpage__table-item">Zwinność</td>
              <td className="select-subpage__table-item">Atak</td>
              <td className="select-subpage__table-item">Punkty uderzenia</td>
              <td className="select-subpage__table-item">Intelignecja</td>
              <td className="select-subpage__table-item">Magia</td>
              <td className="select-subpage__table-item">Ogłada</td>
              <td className="select-subpage__table-item">Odporność</td>
              <td className="select-subpage__table-item">
                Umiejętności strzeleckie
              </td>
              <td className="select-subpage__table-item">Szybkość</td>
              <td className="select-subpage__table-item">Wytrzymałość</td>
              <td className="select-subpage__table-item">Siła woli</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(currentPath.statistics).map((item, i) => (
                <td className="select-subpage__table-item">
                  {currentPath.statistics[item].originalValue}
                </td>
              ))}
            </tr>
            <tr>
              {Object.keys(currentPath.statistics).map((item, i) => (
                <td className="select-subpage__table-item">
                  {currentPath.statistics[item].newValue}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      // <p>fef</p>
    );
  }
}
export default SelectDetails;

/*
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
        <table>
          <thead>
            <tr>
              <td>Walka wręcz</td>
              <td>Zwinność</td>
              <td>Atak</td>
              <td>Punkty uderzenia</td>
              <td>Intelignecja</td>
              <td>Magia</td>
              <td>Ogłada</td>
              <td>Odporność</td>
              <td>Umiejętności strzeleckie</td>
              <td>Szybkość</td>
              <td>Wytrzymałość</td>
              <td>Siła woli</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Object.keys(currentPath.statistics).map((item, i) => (
                <td>{item}</td>
              ))}
            </tr>
          </tbody>
        </table>

        */
