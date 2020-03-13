import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      money: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.usersMoney !== this.props.usersMoney) {
      this.setState({
        money: this.props.usersMoney
      });
    }
  }

  handleChange(event) {
    //this.setState({money.bronze: event.target.value});
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeCharacterMoney",
        {
          gold: 2,
          silver: 3,
          bronze: 4
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        console.log(res);
        this.setState({
          ownedSkills: res.data.skills /*set response data in items array*/,
          ownedAbilities: res.data.abilities,
          character: res.data
        });
      })
      .catch(error => console.log("Error" + error));
  }

  render() {
    console.log(this.state.money);
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
          <input type="number" value={this.state.money.gold} />
        </p>
        <p>
          Srebrne Szylingi(S):{" "}
          <input type="number" value={this.state.money.silver} />
        </p>
        <p>
          Miedziane Pensy(P):{" "}
          <input
            type="number"
            value={this.state.money.bronze}
            onChange={this.handleChange}
          />
        </p>
      </div>
    );
  }
}

export default Hero;
