import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      skillList: [],
      activeSkillList: [],
    };

    this.getFilteredSkills = this.getFilteredSkills.bind(this);
    this.addSkillToList = this.addSkillToList.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.sendInformationToParent = this.sendInformationToParent.bind(this);
  }

  componentWillMount() {
    this.getFilteredSkills();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.ownedSkills !== this.props.ownedSkills) {
      this.setState({
        activeSkillList: [
          ...this.state.activeSkillList,
          ...this.props.ownedSkills,
        ],
      });
    }
  }

  sendInformationToParent(value) {
    this.props.parentCallback(value);
  }

  getFilteredSkills() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getFilteredSkills",
        //"http://localhost:5000/api/characters/getFilteredSkills/",
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
          skillLevel: `${skill.skillLevel}`,
          trait: `${skill.trait}`,
        }))
      )
      .then((skillList) => {
        this.setState({
          skillList,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  addSkillToList(event) {
    let currentTrait = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-trait");
    let currentSkill = event.target.value;
    let currentId = event.target.options[
      event.target.selectedIndex
    ].getAttribute("data-number");

    let newSkill = [
      { id: +currentId, name: currentSkill, trait: currentTrait },
    ];

    this.getFilteredSkills();

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addCharacterSkill",
        //"http://localhost:5000/api/characters/addCharacterSkill/",
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
          activeSkillList: [...this.state.activeSkillList, ...newSkill],
        });

        this.sendInformationToParent(1);
      })
      .catch((error) => console.log("Error" + error));
  }

  deleteSkill(itemId, e) {
    const items = this.state.activeSkillList.filter(
      (item) => item.id !== itemId
    );

    axios
      .delete(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeCharacterSkill?id=${itemId}`,
        //`http://localhost:5000/api/characters/removeCharacterSkill?id=${itemId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState({ activeSkillList: items });
      })
      .then(this.sendInformationToParent(-1))
      .catch((error) => console.log("Error" + error));

    this.getFilteredSkills();
  }

  render() {
    return (
      <div className="skill-panel">
        <p className="user-panel__label">
          <i className="fas fa-book-open"></i> Umiejętności
        </p>
        {this.state.activeSkillList.map((item) => (
          <p
            className="skill-panel__item"
            key={`Owned skills - ${item.id}`}
            data-number={item.id}
          >
            {item.name} <span>| {item.trait}</span>
            <i
              onClick={(e) => this.deleteSkill(item.id, e)}
              className="fas fa-trash-alt"
            ></i>
          </p>
        ))}
        <div className="skill-panel__select-container">
          <select
            id="skillList"
            name="skillList"
            form="skillList"
            onChange={this.addSkillToList}
            value={this.state.value}
            defaultValue="Dodaj nową umiejętność"
            className="skill-panel__select-skill"
          >
            <option value="Dodaj nową umiejętność" disabled>
              Dodaj nową umiejętność
            </option>
            {this.state.skillList.map((item) => (
              <option
                value={item.name}
                data-trait={item.trait}
                key={`All skills - ${item.id}`}
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

export default Skills;
