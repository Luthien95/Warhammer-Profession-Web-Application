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
        <p>Bohater</p>
        <label for="userName">Imię: </label>
        <input type="text" name="userName" placeholder="Imię" />
        <label for="userRace">Rasa: </label>
        <input type="text" name="userRace" placeholder="Rasa" />
        <label for="proffesionList">Obecna profesja:</label>
        <select id="cars" name="proffesionList" form="carform">
          {this.props.professionList.map((item, key) => (
            <option key={key} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
        <label for="proffesionList">Poprzednia profesja:</label>
        <select id="cars" name="proffesionList" form="carform">
          {this.props.professionList.map((item, key) => (
            <option key={key} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>

        <p>Opis bohatera</p>
        <p>
          Pozostałe doświadczenie: <input type="number"></input>
        </p>
        <p>
          Wykorzystane doświadczenie: <input type="number" />
        </p>
        <p>Pieniądze</p>
        <p>
          Złote Korony(ZK):{" "}
          <input
            type="number"
            name="gold"
            defaultValue={this.state.money.gold}
            onChange={this.handleBasicFromInputValue}
            onBlur={this.passData}
          />
        </p>
        <p>
          Srebrne Szylingi(S):{" "}
          <input
            type="number"
            name="silver"
            defaultValue={this.state.money.silver}
            onChange={this.handleBasicFromInputValue}
            onBlur={this.passData}
          />
        </p>
        <p>
          Miedziane Pensy(P):{" "}
          <input
            type="number"
            name="bronze"
            defaultValue={this.state.money.bronze}
            onChange={this.handleBasicFromInputValue}
            onBlur={this.passData}
          />
        </p>
      </div>
    );
  }
}

export default Hero;
