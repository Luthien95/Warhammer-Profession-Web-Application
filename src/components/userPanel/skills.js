import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      availableSkillList: [],
      activeSkillList: [],
    };

    this.getFilteredSkills = this.getFilteredSkills.bind(this);
    this.addSkillToList = this.addSkillToList.bind(this);
    this.deleteSkillFromList = this.deleteSkillFromList.bind(this);
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
      .then((availableSkillList) => {
        this.setState({
          availableSkillList,
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
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addSkill",
        //"http://localhost:5000/api/characters/addSkill/",
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
      })
      .catch((error) => console.log("Error" + error));
  }

  deleteSkillFromList(e, itemId) {
    const items = this.state.activeSkillList.filter(
      (item) => item.id !== itemId
    );

    axios
      .delete(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeSkill?id=${itemId}`,
        //`http://localhost:5000/api/removeSkill?id=${itemId}`,
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
          <Skill item={item} deleteSkillFromList={this.deleteSkillFromList} />
        ))}
        <div className="skill-panel__select-container">
          <select
            id="availableSkillList"
            name="availableSkillList"
            form="availableSkillList"
            onChange={this.addSkillToList}
            value={this.state.value}
            defaultValue="Dodaj nową umiejętność"
            className="skill-panel__select-skill"
          >
            <option value="Dodaj nową umiejętność" disabled>
              Dodaj nową umiejętność
            </option>
            {this.state.availableSkillList.map((item) => (
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

const Skill = ({ item, deleteSkillFromList }) => {
  const itemName = item.name;
  const itemId = item.id;
  const itemDescription = item.description;
  const itemTrait = item.trait;
  const itemLevel = item.level;

  return (
    <div key={`Owned skills - ${itemId}`}>
      <p className="skill-panel__item" data-number={itemId}>
        {itemName}{" "}
        {(() => {
          switch (itemLevel) {
            case 1:
              return "null";
            case 2:
              return "+10%";
            case 3:
              return "+20%";
          }
        })()}
        <span> | {itemTrait}</span>
        <i
          onClick={() => {
            deleteSkillFromList(itemId);
          }}
          className="fas fa-trash-alt"
        ></i>
      </p>
      <p>{itemDescription}</p>
    </div>
  );
};

export default Skills;
