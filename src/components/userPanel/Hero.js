import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      money: {}
    };

    this.handleBasicFromInputValue = this.handleBasicFromInputValue.bind(this);
    this.passData = this.passData.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.usersMoney !== this.props.usersMoney) {
      this.setState({
        money: this.props.usersMoney
      });
    }
  }

  passData(event) {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeCharacterMoney",
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

  handleBasicFromInputValue = event => {
    this.setState({
      money: {
        ...this.state.money,
        [event.target.name]: +event.target.value
      }
    });
  };

  render() {
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
        />
        <label for="userRace">Rasa: </label>
        <input
          type="text"
          name="userRace"
          placeholder="Rasa"
          className="user-panel__input"
        />
        <label for="proffesionList">Obecna profesja:</label>
        <select
          id="cars"
          name="proffesionList"
          form="carform"
          className="user-panel__select"
        >
          {this.props.professionList.map((item, key) => (
            <option key={key} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <label for="proffesionList">Poprzednia profesja:</label>
        <select
          id="cars"
          name="proffesionList"
          form="carform"
          className="user-panel__select"
        >
          {this.props.professionList.map((item, key) => (
            <option key={key} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <p className="user-panel__text">Opis bohatera</p>
        <label for="userLeftExperience">Pozostałe doświadczenie: </label>
        <input
          type="text"
          name="userLeftExperience"
          className="user-panel__input"
        />
        <label for="userUsedExperience">Wykorzystane doświadczenie: </label>
        <input
          type="text"
          name="userUsedExperience"
          className="user-panel__input"
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
