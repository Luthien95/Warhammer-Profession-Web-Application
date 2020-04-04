import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Hero from "./userPanel/Hero";
import Table from "./userPanel/Table";
import Skills from "./userPanel/Skills";
import Abilities from "./userPanel/Abilities";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedSkills: [],
      ownedAbilities: [],
      character: {},
      basicStatistics: [],
      advancedStatistics: [],
      basicInformations: {},
      changedSkill: 0,
    };
  }

  componentWillMount() {
    this.getCharacterData();
  }

  callbackFunction = (childData) => {
    this.setState((prevState) => {
      return { changedSkill: prevState.changedSkill + childData };
    });
  };

  getCharacterData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters",
        //"http://localhost:5000/api/characters/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          ownedSkills: res.data.skills,
          ownedAbilities: res.data.abilities,
          character: res.data,
          basicStatistics: res.data.basicStatistics,
          advancedStatistics: res.data.advancedStatistics,
          basicInformations: res.data.basicValues,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  render() {
    return (
      <div className="subpage user-panel">
        <Hero
          professionList={this.props.professionList}
          usersMoney={this.state.character.money}
          basicInformations={this.state.basicInformations}
          changedSkill={this.state.changedSkill}
        />
        <div className="user-panel__statistics">
          <Table statistics={this.state.basicStatistics} />
          <Table statistics={this.state.advancedStatistics} />
          <div className="user-abilities">
            <Skills
              ownedSkills={this.state.ownedSkills}
              parentCallback={this.callbackFunction}
            />
            <Abilities
              ownedAbilities={this.state.ownedAbilities}
              parentCallback={this.callbackFunction}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default UserPanel;
