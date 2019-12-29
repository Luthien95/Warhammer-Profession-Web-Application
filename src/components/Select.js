import React from "react";
import "./../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startProfessionId: 0,
      endProfessionId: 0,
      id: 0,
      professionList: [],
      changePaths: [],
      activeId: 0
    };

    this.getData = this.getData.bind(this);
    this.activeProfessionPath = this.activeProfessionPath.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      professionList: this.props.professionList
    });
  }

  activeProfessionPath(e) {
    this.setState({ activeId: e.target.dataset.index }, function() {
      console.log(this.state.activeId);
    });
  }

  getData() {
    axios
      .get(
        /* "http://192.168.0.52:8020/WarhammerProfessionsApp/api/Professions/GetProfessionsPaths?startProfessionId=" +
          this.state.startProfessionId +
          "&endProfessionId=" +
          this.state.endProfessionId +
          "&mappingLevels=4&includeStartingProfession=false&includeEndingProfession=true&race=1",*/
        "http://localhost:5000/api/Professions/GetProfessionsPaths?startProfessionId=" +
          this.state.startProfessionId +
          "&endProfessionId=" +
          this.state.endProfessionId +
          "&mappingLevels=4&includeStartingProfession=false&includeEndingProfession=true&race=1",
        {
          params: { id: this.state.id },
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(response =>
        response.data.paths.map(path => ({
          path: path.summary
        }))
      )
      .then(path => {
        this.setState({
          changePaths: path
        });
      })
      .catch(error => console.log("Error" + error));
  }

  render() {
    const { professionList } = this.state;
    const reactStringReplace = require("react-string-replace");

    return (
      <div className="select-subpage">
        <div className="select-subpage__search">
          <select
            onChange={e => this.setState({ startProfessionId: e.target.value })}
            className="select-subpage__start-professions"
          >
            {professionList.map((item, key) => (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <select
            onChange={e => this.setState({ endProfessionId: e.target.value })}
            className="select-subpage__end-professions"
          >
            {professionList.map((item, key) => (
              <option key={key} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <button className="select-subpage__button" onClick={this.getData}>
            search
          </button>
        </div>
        {this.state.changePaths && this.state.changePaths.length > 0 ? (
          <ul className="select-subpage__list">
            {" "}
            {this.state.changePaths.map((item, key) => (
              <li
                key={key}
                className={
                  this.state.activeId == key
                    ? "select-subpage__item select-subpage__item--active"
                    : "select-subpage__item"
                }
              >
                <p className="select-subpage__path">
                  {reactStringReplace(item.path.path, "=>", (match, i) => (
                    <i className="fas fa-chevron-right select-subpage__path--icon"></i>
                  ))}
                </p>
                <button
                  className="select-subpage__button"
                  data-index={key}
                  onClick={this.activeProfessionPath}
                >
                  {this.state.activeId == key ? (
                    <i class="fas fa-times-circle"></i>
                  ) : (
                    <i class="fas fa-plus-circle"></i>
                  )}
                </button>
                {this.state.activeId == key ? (
                  <div className="select-subpage__full-description">
                    <p className="select-subpage__number">
                      {key < 10 ? "0" + (key + 1) + "." : key + 1 + "."}
                    </p>
                    <p className="select-subpage__paragraph">
                      Minimal Experience Cost: {item.path.minimalExperienceCost}
                    </p>
                    <p className="select-subpage__paragraph">
                      Maximum Experience Cost: {item.path.maximumExperienceCost}
                    </p>
                    <p className="select-subpage__paragraph">
                      Abilities to learn:
                    </p>
                    <ul className="select-subpage__list">
                      {item.path.abilitiesToLearn.map((item, key) => (
                        <li className="select-subpage__list-item">{item}</li>
                      ))}
                    </ul>
                    <p className="select-subpage__paragraph">
                      Skills to learn:
                    </p>
                    <ul className="select-subpage__list">
                      {item.path.skillsToLearn.map((item, key) => (
                        <li className="select-subpage__list-item">{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    );
  }
}
export default Select;
