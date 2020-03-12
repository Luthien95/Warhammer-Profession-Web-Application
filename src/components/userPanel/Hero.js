import React from "react";
import "./../../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Hero extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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
          Pozostałe doświadczenie: <input type="number" />
        </p>
        <p>
          Wykorzystane doświadczenie: <input type="number" />
        </p>
        <p>Pieniądze</p>
        <p>
          Złote Korony(ZK): <input type="number" />
        </p>
        <p>
          Srebrne Szylingi(S): <input type="number" />
        </p>
        <p>
          Miedziane Pensy(P): <input type="number" />
        </p>
      </div>
    );
  }
}

export default Hero;
