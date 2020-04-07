import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Hero from "./userPanel/Hero";
import Table from "./userPanel/Table";
import Skills from "./userPanel/Skills";
import Abilities from "./userPanel/Abilities";
import Items from "./userPanel/Items";
import * as signalR from "@aspnet/signalr";

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
      hubConnection: null,
    };

    this.hubConnection = this.hubConnection.bind(this);
  }

  componentWillMount() {
    this.getCharacterData();
  }

  callbackFunction = (childData) => {
    this.setState((prevState) => {
      return { changedSkill: prevState.changedSkill + childData };
    });
  };

  hubConnection() {
    let hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/characterhub?characterId=${this.state.basicInformations.id}`
      )
      .build();

    hubConnection.on("receiveMessage", (data) => {
      console.log(data);
    });

    hubConnection.on("changeMoney", (gold, silver, bronze) => {
      this.setState({
        character: {
          ...this.state.character,
          money: {
            ...this.state.money,
            gold: +gold,
            silver: +silver,
            bronze: +bronze,
          },
        },
      });
    });

    hubConnection.on("changeExperience", (value) => {
      this.setState({
        basicInformations: {
          ...this.state.basicInformations,
          experienceSum: value,
        },
      });
    });

    hubConnection.on("changeStatisticValue", (type, currentValue, maxValue) => {
      const basicStatistics = this.state.basicStatistics.filter((item) =>
        item.type === type
          ? this.setState({
              basicInformations: {
                ...this.state.basicInformations,
                [item]: {
                  ...this.state[item],
                  currentValue: currentValue,
                  maxValue: maxValue,
                },
              },
            })
          : null
      );
    });

    hubConnection.on("removeSkill", (skillId) => {
      const items = this.state.ownedSkills.filter(
        (item) => item.id !== skillId
      );
    });

    hubConnection.on("removeAbility", (abilityId) => {
      const items = this.state.ownedAbilities.filter(
        (item) => item.id !== abilityId
      );
    });

    hubConnection.start();
  }

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

        console.log(res);
      })
      .then(() => {
        this.hubConnection();
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
          <Items
            ownedItems={this.state.character.items}
            additionalItems={this.state.character.additionalValues}
          />
        </div>
      </div>
    );
  }
}

export default UserPanel;
