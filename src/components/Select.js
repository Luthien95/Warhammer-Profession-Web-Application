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
      changePaths: []
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      professionList: this.props.professionList
    });
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/Professions/GetProfessionsPaths?startProfessionId=" +
          this.state.startProfessionId +
          "&endProfessionId=" +
          this.state.endProfessionId +
          "&mappingLevels=4&includeStartingProfession=false&includeEndingProfession=true&race=1",
        {
          params: { id: this.state.id },
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(
        response =>
          response.data.paths.map(path => ({
            path: path.summary
          }))
        //console.log(response.data.paths)
      )
      .then(path => {
        this.setState({
          changePaths: path
        });
        console.log(this.state.changePaths);
      })
      // http://192.168.0.52:8020/WarhammerProfessionsApp/api/Professions/GetProfessionsPaths?startProfessionId=20&endProfessionId=98&mappingLevels=4&includeStartingProfession=false&includeEndingProfession=true&race=1&fbclid=IwAR1GqA7mM2RWXc0e_6SZIELJUK37glHTWL0yZIlXqQH2taJt4w0kv1L-xlA
      .then(res => {
        /* var data = res.data;

        var profession = {
          id: data.id,
          name: data.name
        };

        this.setState({
          profession: profession
        });*/
        console.log(res);
      })
      .catch(error => console.log("Error" + error));
  }

  render() {
    const { professionList } = this.state;
    console.log(this.state.endProfessionId, this.state.startProfessionId);

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
              <li key={key} className="select-subpage__item">
                {item.path.path}
                <button className="select-subpage__button">Read more</button>
              </li>
            ))}
          </ul>
        ) : (
          <p></p>
        )}
      </div>
    );
  }
}
export default Select;
