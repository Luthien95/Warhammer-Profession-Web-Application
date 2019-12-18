import React from "react";
import "./../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Select extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startProfessionId: 0,
      endProfessionId: 0
    };

    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.setState({ id: this.props.id });
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
    const { profession } = this.state;
    console.log(this.state.endProfessionId, this.state.startProfessionId);
    return (
      <div className="select">
        <select
          onChange={e => this.setState({ startProfessionId: e.target.value })}
        >
          {this.props.data.map((item, key) => (
            <option key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          onChange={e => this.setState({ endProfessionId: e.target.value })}
        >
          {this.props.data.map((item, key) => (
            <option key={key} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        <button onClick={this.getData}>search</button>
      </div>
    );
  }
}
export default Select;
