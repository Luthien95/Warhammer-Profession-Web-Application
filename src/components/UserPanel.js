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
      hubConnection: null,
    };

    this.hubConnection = this.hubConnection.bind(this);
  }

  componentWillMount() {
    this.getCharacterData();
  }

  hubConnection() {
    let hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/characterhub?characterId=${this.state.basicInformations.id}`
        //`http://localhost:5000/characterhub?characterId=${this.state.basicInformations.id}`
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
          experienceLeft: value,
        },
      });
    });

    hubConnection.on("changeExperienceSummary", (value) => {
      this.setState({
        basicInformations: {
          ...this.state.basicInformations,
          experienceSum: value,
        },
      });
    });

    hubConnection.on(
      "changeStatisticValue",
      (type, currentValue, maxValue, canBeDecreased, canBeIncreased) => {
        this.state.basicStatistics.filter((item, id) =>
          item.type === type
            ? this.setState((prevState) => {
                let statistic = Object.assign({}, prevState.basicStatistics);
                statistic[id].currentValue = currentValue;
                statistic[id].maximumValue = maxValue;
                statistic[id].canBeDecreased = canBeDecreased;
                statistic[id].canBeIncreased = canBeIncreased;

                return { statistic };
              })
            : null
        );

        this.state.advancedStatistics.filter((item, id) =>
          item.type === type
            ? this.setState((prevState) => {
                let statistic = Object.assign({}, prevState.advancedStatistics);
                statistic[id].currentValue = currentValue;
                statistic[id].maximumValue = maxValue;
                statistic[id].canBeDecreased = canBeDecreased;
                statistic[id].canBeIncreased = canBeIncreased;

                return { statistic };
              })
            : null
        );
      }
    );

    hubConnection.on("removeSkill", (skillId) => {
      const items = this.state.ownedSkills.filter(
        (item) => item.id !== skillId
      );

      return items;
    });

    hubConnection.on("removeAbility", (abilityId) => {
      const items = this.state.ownedAbilities.filter(
        (item) => item.id !== abilityId
      );

      return items;
    });

    hubConnection.start();
  }

  getCharacterData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters",
        //"http://localhost:5000/api/characters",
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
        />
        <div className="user-panel__statistics">
          <Table statistics={this.state.basicStatistics} />
          <Table statistics={this.state.advancedStatistics} />
          <div className="user-abilities">
            <Skills ownedSkills={this.state.ownedSkills} />
            <Abilities ownedAbilities={this.state.ownedAbilities} />
          </div>
          <Items
            ownedItems={this.state.character.items}
            additionalItems={this.state.character.additionalItems}
          />
        </div>
      </div>
    );
  }
}

export default UserPanel;
