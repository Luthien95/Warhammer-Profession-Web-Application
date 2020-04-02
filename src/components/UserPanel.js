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
      changedSkill: 0
    };
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters",
        //"http://localhost:5000/api/characters/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log(res.data);
        this.setState({
          ownedSkills: res.data.skills,
          ownedAbilities: res.data.abilities,
          character: res.data,
          basicStatistics: res.data.basicStatistics,
          advancedStatistics: res.data.advancedStatistics,
          basicInformations: res.data.basicValues
        });
      })
      .catch(error => console.log("Error" + error));
  }

  componentWillMount() {
    this.getData();
  }

  callbackFunction = childData => {
    this.setState(prevState => {
      return { changedSkill: prevState.changedSkill + childData };
    });
  };

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
          <Table statistics={this.state.basicStatistics} step="5" />
          <Table statistics={this.state.advancedStatistics} step="1" />
          <div className="user-abilities">
            <Skills
              ownedSkills={this.state.ownedSkills}
              parentCallback={this.callbackFunction}
            />
            <Abilities ownedAbilities={this.state.ownedAbilities} />
          </div>
        </div>
      </div>
    );
  }
}

export default UserPanel;
