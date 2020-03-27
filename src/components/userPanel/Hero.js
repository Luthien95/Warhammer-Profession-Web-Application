import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      money: {},
      heroInformations: {},
      change: 0,
      filteredProfessions: [],
      previousProffesion: null
    };

    this.handleBasicFromInputValue = this.handleBasicFromInputValue.bind(this);
    this.passData = this.passData.bind(this);
    this.getData = this.getData.bind(this);
    this.changeCurrentProfession = this.changeCurrentProfession.bind(this);
    this.removeLastProfession = this.removeLastProfession.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeNameState = this.changeNameState.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.usersMoney !== this.props.usersMoney ||
      prevProps.basicInformations !== this.props.basicInformations
    ) {
      this.setState({
        money: this.props.usersMoney,
        heroInformations: this.props.basicInformations
      });
    }
    if (prevProps.changedSkill !== this.props.changedSkill) {
      this.setState({
        change: this.props.changedSkill
      });

      if (this.props.changedSkill > this.state.change) {
        this.setState({
          heroInformations: {
            ...this.state.heroInformations,
            experienceLeft: this.state.heroInformations.experienceLeft - 100
          },
          change: this.props.changedSkill
        });
      } else if (this.props.changedSkill < this.state.change) {
        this.setState({
          heroInformations: {
            ...this.state.heroInformations,
            experienceLeft: this.state.heroInformations.experienceLeft + 100
          },
          change: this.props.changedSkill
        });
      }
    }
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getFilteredProfessions",
        //"http://localhost:5000/api/characters/getFilteredProfessions/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        this.setState({
          filteredProfessions: res.data
        });
      })
      .catch(error => console.log("Error" + error));
  }

  passData(event) {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeCharacterMoney",
        //"http://localhost:5000/api/characters/changeCharacterMoney/",
        this.state.money,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .catch(error => console.log("Error" + error));
  }

  changeCurrentProfession(e) {
    let newProfession = JSON.parse(e.target.value);

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/setNextCharacterProfession",
        //"http://localhost:5000/api/characters/setNextCharacterProfession/",
        newProfession.id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(
        this.setState({
          previousProffesion: this.state.heroInformations.actualProfessionName,
          heroInformations: {
            ...this.state.heroInformations,
            actualProfessionName: newProfession.name
          }
        })
      )
      .then(this.getData())
      .catch(error => console.log("Error" + error));
  }

  removeLastProfession() {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeLastCharacterProfession",
        //"http://localhost:5000/api/characters/removeLastCharacterProfession/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(
        this.setState({
          heroInformations: {
            ...this.state.heroInformations,
            actualProfessionName: this.state.previousProffesion
          }
        })
      )
      .then(this.getData())
      .catch(error => console.log("Error" + error));
  }

  handleBasicFromInputValue = event => {
    this.setState({
      money: {
        ...this.state.money,
        experienceLeft: +event.target.value
      }
    });
  };

  changeNameState = event => {
    this.setState({
      heroInformations: {
        ...this.state.heroInformations,
        name: event.target.value
      }
    });
  };

  changeCurrentState = (event, array, value) => {
    this.setState({
      array: {
        ...this.state.array,
        name: event.target.value
      }
    });
  };

  changeName() {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeCharacterName",
        //"http://localhost:5000/api/characters/changeCharacterName/",
        JSON.stringify(this.state.heroInformations.name),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .catch(error => console.log("Error" + error));
  }

  render() {
    console.log(this.state.heroInformations.name);
    return (
      <div>
        <p className="user-panel__header">
          <span className="user-panel__header--span">Twój</span> bohater
        </p>
        <p>
          Tutaj możesz wprowadzić lub zuaktualizować informacje dotyczące Twojej
          postaci.
        </p>
        <br />
        <label for="userName">Imię: </label>
        <input
          type="text"
          name="userName"
          placeholder="Imię"
          className="user-panel__input"
          defaultValue={this.state.heroInformations.name}
          onChange={this.changeNameState}
          onBlur={this.changeName}
        />
        <label for="userRace">Rasa: </label>
        <input
          type="text"
          name="userRace"
          placeholder="Rasa"
          className="user-panel__input"
        />
        <label for="currentProffesion">Obecna profesja:</label>
        <input
          type="text"
          name="userProfession"
          className="user-panel__input"
          defaultValue={this.state.heroInformations.actualProfessionName}
        />

        <label for="previousProffesion">Zmień profesję:</label>
        <select
          name="changeProffesion"
          form="changeProffesion"
          className="user-panel__select"
          onChange={this.changeCurrentProfession}
        >
          {this.state.filteredProfessions.map((item, key) => {
            return item.name ===
              this.state.heroInformations.actualProfessionName ? (
              <option key={key} value={[item.name, item.id]} selected>
                {item.name}
              </option>
            ) : (
              <option
                key={key}
                value={JSON.stringify({ name: item.name, id: item.id })}
              >
                {item.name}
              </option>
            );
          })}
        </select>

        <button onClick={this.removeLastProfession}>
          Usuń ostatnią profesję
        </button>
        <p className="user-panel__text">Opis bohatera</p>
        <label for="userLeftExperience">Pozostałe doświadczenie: </label>
        <input
          type="text"
          name="userLeftExperience"
          className="user-panel__input"
          defaultValue={this.state.heroInformations.experienceLeft}
        />
        <label for="userExperience">Doświadczenie: </label>
        <input
          type="text"
          name="userExperience"
          className="user-panel__input"
          defaultValue={this.state.heroInformations.experienceSum}
        />
        <p>Pieniądze</p>
        <label for="userGoldCoins">Złote Korony(ZK): </label>
        <input
          type="number"
          name="userGoldCoins"
          className="user-panel__input"
          defaultValue={this.state.money.gold}
          onChange={this.handleBasicFromInputValue}
          onBlur={this.passData}
        />
        <label for="userSilverCoins">Srebrne Szylingi(S): </label>
        <input
          type="number"
          name="userSilverCoins"
          className="user-panel__input"
          defaultValue={this.state.money.silver}
          onChange={this.handleBasicFromInputValue}
          onBlur={this.passData}
        />
        <label for="userBonzeCoins">Miedziane Pensy(P): </label>
        <input
          type="number"
          name="userBronzeCoins"
          className="user-panel__input"
          defaultValue={this.state.money.bronze}
          onChange={this.handleBasicFromInputValue}
          onBlur={this.passData}
        />
      </div>
    );
  }
}

export default Hero;
