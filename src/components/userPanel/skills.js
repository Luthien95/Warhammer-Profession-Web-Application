import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skillList: [],
      activeSkillList: []
    };

    this.getData = this.getData.bind(this);
    this.addSkillToList = this.addSkillToList.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  getData() {
    axios
      .get("http://192.168.0.52:8020/WarhammerProfessionsApp/api/skills", {
        headers: { "Content-Type": "application/json" }
      })
      .then(response =>
        response.data.map(skill => ({
          id: `${skill.id}`,
          name: `${skill.name}`,
          description: `${skill.description}`,
          skillLevel: `${skill.skillLevel}`,
          trait: `${skill.trait}`
        }))
      )
      .then(skillList => {
        this.setState({
          skillList
        });
      })
      .catch(error => console.log("Error" + error));
  }

  componentWillMount() {
    this.getData();
  }

  addSkillToList(event) {
    let currentTrait = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data");
    let currentSkill = event.target.value;
    let currentId = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-key");

    let ifSkillInArray = false;

    for (var i = 0; i < this.state.activeSkillList.length; i++) {
      if (currentId === this.state.activeSkillList[i].id) {
        ifSkillInArray = true;
      }
    }

    if (!ifSkillInArray) {
      let newSkill = [
        { name: currentSkill, trait: currentTrait, id: currentId }
      ];

      this.setState({
        activeSkillList: [...this.state.activeSkillList, ...newSkill]
      });
    }
  }

  deleteSkill(itemId) {
    const items = this.state.activeSkillList.filter(item => item.id !== itemId);
    this.setState({ activeSkillList: items });
  }

  render() {
    return (
      <div>
        <p>Umiejętności</p>
        {this.state.activeSkillList.map(item => (
          <p>
            {item.name}, {item.trait}{" "}
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
          {this.state.skillList.map(item => (
            <option value={item.name} data={item.trait} data-key={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

export default Skills;
