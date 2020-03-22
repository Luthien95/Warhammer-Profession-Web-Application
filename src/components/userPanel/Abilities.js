import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Abilities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      abilitiesList: [],
      activeAbilitiesList: []
    };

    this.getData = this.getData.bind(this);
    this.addSkillToList = this.addSkillToList.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getFilteredAbilities",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(response =>
        response.data.map(skill => ({
          id: `${skill.id}`,
          name: `${skill.name}`,
          description: `${skill.description}`
        }))
      )
      .then(abilitiesList => {
        this.setState({
          abilitiesList
        });
      })
      .catch(error => console.log("Error" + error));
  }

  componentWillMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ownedAbilities !== this.props.ownedAbilities) {
      this.setState({
        activeAbilitiesList: [
          ...this.state.activeAbilitiesList,
          ...this.props.ownedAbilities
        ]
      });
    }
  }

  addSkillToList(event) {
    let currentAbility = event.target.value;
    let currentId = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-key");

    let newAbility = [{ name: currentAbility, id: currentId }];

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addCharacterAbility",
        currentId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(response => {
        this.setState({
          activeAbilitiesList: [
            ...this.state.activeAbilitiesList,
            ...newAbility
          ]
        });
      })
      .then(response => {})
      .catch(error => console.log("Error" + error));
  }

  deleteSkill(itemId, e) {
    const items = this.state.activeAbilitiesList.filter(
      item => item.id !== itemId
    );

    axios
      .delete(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeCharacterAbility?id=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(response => {
        this.setState({ activeAbilitiesList: items });
      })
      .catch(error => console.log("Error" + error));
  }

  render() {
    return (
      <div className="ability-panel">
        <p className="ability-panel__header">Zdolności</p>
        {this.state.activeAbilitiesList.map(item => (
          <p className="ability-panel__item" key={item.name}>
            {item.name}
            <i
              onClick={e => this.deleteSkill(item.id, e)}
              className="fas fa-trash-alt"
            ></i>
          </p>
        ))}
        <select
          id="skillList"
          name="skillList"
          form="skillList"
          onChange={this.addSkillToList}
          value={this.state.value}
          className="ability-panel__select"
        >
          {this.state.abilitiesList.map(item => (
            <option
              value={item.name}
              data-key={item.id}
              className="ability-panel__option"
              key={item.name}
            >
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Abilities;
