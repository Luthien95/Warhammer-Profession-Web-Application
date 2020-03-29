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
      previousProffesion: null,
      filteredRaces: [],
      ifChangeProfessionActive: false
    };

    this.handleBasicFromInputValue = this.handleBasicFromInputValue.bind(this);
    this.passData = this.passData.bind(this);
    this.getData = this.getData.bind(this);
    this.getRaces = this.getRaces.bind(this);
    this.changeCurrentProfession = this.changeCurrentProfession.bind(this);
    this.removeLastProfession = this.removeLastProfession.bind(this);
    this.changeName = this.changeName.bind(this);
    this.changeNameState = this.changeNameState.bind(this);

    this.changeCurrentRace = this.changeCurrentRace.bind(this);
    this.changeSumExperience = this.changeSumExperience.bind(this);
    this.changeExperience = this.changeExperience.bind(this);
  }

  componentWillMount() {
    this.getData();
    this.getRaces();
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

  getRaces() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getRaces",
        //"http://localhost:5000/api/characters/getRaces/",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      )
      .then(res => {
        this.setState({
          filteredRaces: res.data
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
        [event.target.name]: +event.target.value
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

  changeCurrentRace(e) {
    let newRace = JSON.parse(e.target.value);
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/setCharacterRace",
        //"http://localhost:5000/api/characters/setCharacterRace",
        newRace.id,
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
            race: {
              id: newRace.id,
              name: newRace.name
            }
          }
        })
      )
      .then(this.getData())
      .catch(error => console.log("Error" + error));
  }

  changeSumExperience = event => {
    this.setState({
      heroInformations: {
        ...this.state.heroInformations,
        experienceSum: event.target.value
      }
    });
  };

  changeExperience() {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeCharacterMaximumExperience",
        //"http://localhost:5000/api/characters/changeCharacterMaximumExperience/",
        this.state.heroInformations.experienceSum,
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
    let currentRace = Object.assign({}, this.state.heroInformations.race);

    return (
      <div className="user-panel__description">
        <select
          name="changeRace"
          form="changeRace"
          className="user-panel__race"
          defaultValue="Wybierz rasę"
          onChange={this.changeCurrentRace}
        >
          {this.state.filteredRaces.map((item, key) => {
            return item.id === currentRace.id ? (
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
          })}{" "}
        </select>
        <input
          type="text"
          name="userName"
          placeholder="Imię"
          className="user-panel__login"
          defaultValue={this.state.heroInformations.name}
          onChange={this.changeNameState}
          onBlur={this.changeName}
        />
        <p className="user-panel__profession-options">
          {this.state.heroInformations.actualProfessionName}{" "}
          {this.state.ifChangeProfessionActive == true ? (
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
          ) : (
            <i className="fas fa-ellipsis-h"></i>
          )}
          <button
            onClick={this.removeLastProfession}
            className="user-panel__change-button"
          >
            <i class="far fa-trash-alt"></i>
            <span className="user-panel__delete-span">
              Usuń ostatnią profesję
            </span>
          </button>
        </p>

        <div className="user-panel__experience-box">
          <input
            type="text"
            name="userLeftExperience"
            className="user-panel__experience-input"
            disabled
            defaultValue={this.state.heroInformations.experienceLeft}
          />
          <label
            for="userLeftExperience"
            className="user-panel__experience-label"
          >
            Pozostałe doświadczenie
          </label>
        </div>
        <div className="user-panel__experience-box">
          <input
            type="text"
            name="userExperience"
            className="user-panel__experience-input"
            defaultValue={this.state.heroInformations.experienceSum}
            onChange={this.changeSumExperience}
            onBlur={this.changeExperience}
          />
          <label for="userExperience" className="user-panel__experience-label">
            Doświadczenie
          </label>
        </div>

        <p className="user-panel__label">
          <i className="fas fa-coins"></i> Pieniądze
        </p>
        <div>
          <input
            type="number"
            name="gold"
            className="user-panel__input"
            defaultValue={this.state.money.gold}
            onChange={this.handleBasicFromInputValue}
            onBlur={this.passData}
          />
          <label for="userGoldCoins">Złotych Koron (ZK)</label>
        </div>
        <div>
          <input
            type="number"
            name="silver"
            className="user-panel__input"
            defaultValue={this.state.money.silver}
            onChange={this.handleBasicFromInputValue}
            onBlur={this.passData}
          />
          <label for="userSilverCoins">Srebrnych Szylingów (S)</label>
        </div>
        <div>
          <input
            type="number"
            name="bronze"
            className="user-panel__input"
            defaultValue={this.state.money.bronze}
            onChange={this.handleBasicFromInputValue}
            onBlur={this.passData}
          />
          <label for="userBonzeCoins">Miedzianych Pensów (P)</label>
        </div>

        <p className="user-panel__label">
          <i className="far fa-sticky-note"></i> Notatki
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    );
  }
}

export default Hero;

/*
 {this.state.filteredRaces.length > 0 ? (
          /*<select
            name="changeRace"
            form="changeRace"
            className="user-panel__select"
            defaultValue="Wybierz rasę"
            onChange={this.changeCurrentRace}
          >
            {this.state.filteredRaces.map((item, key) => {
              return item.id === this.state.heroInformations.race.id ? (
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
            })}{" "}
          </select>
          
          ) : null}*/
