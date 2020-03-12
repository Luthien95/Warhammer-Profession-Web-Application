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
      .get("http://192.168.0.52:8020/WarhammerProfessionsApp/api/abilities", {
        headers: { "Content-Type": "application/json" }
      })
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

  addSkillToList(event) {
    let currentAbility = event.target.value;
    let currentId = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-key");

    let ifAbilityInArray = false;

    for (var i = 0; i < this.state.activeAbilitiesList.length; i++) {
      if (currentId === this.state.activeAbilitiesList[i].id) {
        ifAbilityInArray = true;
      }
    }

    if (!ifAbilityInArray) {
      let newAbility = [{ name: currentAbility, id: currentId }];

      this.setState({
        activeAbilitiesList: [...this.state.activeAbilitiesList, ...newAbility]
      });
    }
  }

  deleteSkill(itemId) {
    const items = this.state.activeAbilitiesList.filter(
      item => item.id !== itemId
    );
    this.setState({ activeAbilitiesList: items });
  }

  render() {
    return (
      <div>
        <p>Zdolności</p>
        {this.state.activeAbilitiesList.map(item => (
          <p>
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
        >
          {this.state.abilitiesList.map(item => (
            <option value={item.name} data-key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Abilities;
