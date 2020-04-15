import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Abilities extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      abilitiesList: [],
      activeAbilitiesList: [],
    };

    this.getFilteredAbilities = this.getFilteredAbilities.bind(this);
    this.addSkillToList = this.addSkillToList.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  componentWillMount() {
    this.getFilteredAbilities();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ownedAbilities !== this.props.ownedAbilities) {
      this.setState({
        activeAbilitiesList: [
          ...this.state.activeAbilitiesList,
          ...this.props.ownedAbilities,
        ],
      });
    }
  }

  getFilteredAbilities() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getFilteredAbilities",
        //"http://localhost:5000/api/characters/getFilteredAbilities",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) =>
        response.data.map((skill) => ({
          id: `${skill.id}`,
          name: `${skill.name}`,
          description: `${skill.description}`,
        }))
      )
      .then((abilitiesList) => {
        this.setState({
          abilitiesList,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  addSkillToList(event) {
    let currentAbility = event.target.value;
    let currentId = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-number");

    let newAbility = [{ name: currentAbility, id: currentId }];

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addAbility",
        currentId,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({
          activeAbilitiesList: [
            ...this.state.activeAbilitiesList,
            ...newAbility,
          ],
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  deleteSkill(itemId, e) {
    const items = this.state.activeAbilitiesList.filter(
      (item) => item.id !== itemId
    );

    axios
      .delete(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeAbility?id=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({ activeAbilitiesList: items });
      })
      .catch((error) => console.log("Error" + error));
  }

  render() {
    return (
      <div className="ability-panel">
        <p className="user-panel__label">
          <i className="fas fa-magic"></i> Zdolności
        </p>
        {this.state.activeAbilitiesList.map((item) => (
          <p
            className="ability-panel__item"
            key={`Owned abilities - ${item.id}`}
            data-number={item.id}
          >
            {item.name}
            <i
              onClick={(e) => this.deleteSkill(item.id, e)}
              className="fas fa-trash-alt"
            ></i>
          </p>
        ))}
        <div className="ability-panel__select-container">
          <select
            id="skillList"
            name="skillList"
            form="skillList"
            onChange={this.addSkillToList}
            value={this.state.value}
            defaultValue="Dodaj nową zdolność"
            className="ability-panel__select"
          >
            <option value="Dodaj nową zdolność" disabled>
              Dodaj nową zdolność
            </option>
            {this.state.abilitiesList.map((item) => (
              <option
                value={item.name}
                className="ability-panel__option"
                key={`All abilities - ${item.id}`}
                data-number={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Abilities;
