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
      advancedStatistics: []
    };
  }

  getData() {
    axios
      .get("http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          ownedSkills: res.data.skills,
          ownedAbilities: res.data.abilities,
          character: res.data,
          basicStatistics: res.data.basicStatistics,
          advancedStatistics: res.data.advancedStatistics
        });
      })
      .catch(error => console.log("Error" + error));
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    return (
      <div className="subpage">
        <form>
          <Hero
            professionList={this.props.professionList}
            usersMoney={this.state.character.money}
          />
          <p>Cechy</p>
          <Table statistics={this.state.basicStatistics} step="5" />
          <Table statistics={this.state.advancedStatistics} step="1" />
          <Skills ownedSkills={this.state.ownedSkills} />
          <Abilities ownedAbilities={this.state.ownedAbilities} />
        </form>
      </div>
    );
  }
}

export default UserPanel;
