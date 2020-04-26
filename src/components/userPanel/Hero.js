import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import ReactTooltip from "react-tooltip";
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
      ifChangeProfessionActive: false,
    };

    this.changeMoneyAssets = this.changeMoneyAssets.bind(this);
    this.changeMoney = this.changeMoney.bind(this);
    // this.getData = this.getData.bind(this);
    //this.changeCurrentProfession = this.changeCurrentProfession.bind(this);
    this.removeLastProfession = this.removeLastProfession.bind(this);
    this.changeName = this.changeName.bind(this);
    this.saveNote = this.saveNote.bind(this);
    //this.changeCurrentRace = this.changeCurrentRace.bind(this);
    this.changeExperience = this.changeExperience.bind(this);
    this.changeProfessionActive = this.changeProfessionActive.bind(this);
    this.changeCurrentState = this.changeCurrentState.bind(this);
    //this.loadOptions = this.loadOptions.bind(this);
  }

  componentDidUpdate(prevProps) {
    // Zerknąć czy to jest wgl teraz potrzebne!!!
    if (
      prevProps.usersMoney !== this.props.usersMoney ||
      prevProps.basicInformations !== this.props.basicInformations
    ) {
      this.setState({
        money: this.props.usersMoney,
        heroInformations: this.props.basicInformations,
      });
    }
  }

  changeProfessionActive() {
    this.setState((prevState) => ({
      ifChangeProfessionActive: !prevState.ifChangeProfessionActive,
    }));
  }

  changeMoney(event) {
    const newMonneyAssets = this.state.money;

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeMoney",
        //"http://localhost:5000/api/characters/changeMoney/",
        newMonneyAssets,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  removeLastProfession() {
    // refactoring
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeLastProfession",
        //"http://localhost:5000/api/characters/removeLastProfession/",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      /*.then(
        this.setState({
          heroInformations: {
            ...this.state.heroInformations,
            actualProfessionName: this.state.previousProffesion,
          },
        })
      )*/
      .then((res) => {
        if (res.data === 0) {
          this.setState({
            heroInformations: {
              ...this.state.heroInformations,
              actualProfessionName: null,
            },
          });
        } else {
          this.setState({
            heroInformations: {
              ...this.state.heroInformations,
              actualProfessionName: this.state.previousProffesion,
            },
          });
        }
      })
      .catch((error) => console.log("Error" + error));
  }

  changeExperience() {
    const newExperienceSummary = this.state.heroInformations.experienceSum;

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeMaximumExperience",
        //"http://localhost:5000/api/characters/changeMaximumExperience/",
        newExperienceSummary,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  changeMoneyAssets = (event) => {
    // sprawdzić czy potrzebne
    this.setState({
      money: {
        ...this.state.money,
        [event.target.name]: +event.target.value,
      },
    });
  };

  saveNote() {
    // ujednolicic z changeName
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeNotes",
        //"http://localhost:5000/api/characters/changeNotes/",
        JSON.stringify(this.state.heroInformations.notes),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  changeName() {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeName",
        //"http://localhost:5000/api/characters/changeName/",
        JSON.stringify(this.state.heroInformations.name),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  changeCurrentState = (event, array, name) => {
    // sprawdzić czy potrzebne
    this.setState({
      [array]: {
        ...this.state[array],
        [name]: event.target.value,
      },
    });
  };

  render() {
    return (
      <div className="quick-informations">
        <p>
          {this.state.heroInformations.race
            ? this.state.heroInformations.race.name
            : null}
        </p>
        {/*<p className="user-panel__login">{this.state.heroInformations.name}</p>*/}
        <input
          type="text"
          name="userName"
          placeholder="Imię"
          className="user-panel__login"
          defaultValue={this.state.heroInformations.name}
          onChange={(event) =>
            this.changeCurrentState(event, "heroInformations", "name")
          }
          onBlur={this.changeName}
        />

        <div className="user-panel__profession-options">
          <p>{this.state.heroInformations.actualProfessionName}</p>
          <button
            onClick={this.removeLastProfession}
            className="user-panel__remove-profession"
            data-tip="Usuń ostatnią profesję"
          >
            <i className="far fa-trash-alt"></i>
          </button>
        </div>
        <div className="user-panel__experience">
          <div className="user-panel__experience-box">
            <input
              type="text"
              name="userLeftExperience"
              className="user-panel__experience-input"
              disabled
              defaultValue={this.state.heroInformations.experienceLeft}
            />
            <label
              htmlFor="userLeftExperience"
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
              onChange={(event) =>
                this.changeCurrentState(
                  event,
                  "heroInformations",
                  "experienceSum"
                )
              }
              onBlur={this.changeExperience}
            />
            <label
              htmlFor="userExperience"
              className="user-panel__experience-label"
            >
              Doświadczenie
            </label>
          </div>
        </div>
        <p className="user-panel__label">
          <i className="fas fa-coins"></i> Pieniądze
        </p>
        <MoneyList
          name={["gold", "silver", "bronze"]}
          onChange={this.changeMoneyAssets}
          money={this.state.money}
          onBlur={this.changeMoney}
          label={[
            "Złotych Koron (ZK)",
            "Srebrnych Szylingów (S)",
            "Miedzianych Pensów (P)",
          ]}
        />
        <p className="user-panel__label">
          <i className="far fa-sticky-note"></i> Notatki
        </p>
        <textarea
          className="user-panel__textarea"
          defaultValue={
            this.state.heroInformations.notes
              ? this.state.heroInformations.notes
              : ""
          }
          onChange={(event) =>
            this.changeCurrentState(event, "heroInformations", "notes")
          }
        />
        <button className="user-panel__textarea-button" onClick={this.saveNote}>
          Zapisz notatkę
        </button>
        <ReactTooltip />
      </div>
    );
  }
}

const MoneyList = ({ name, money, onChange, onBlur, label }) => {
  return name.map((item, id) => (
    <div>
      <input
        type="number"
        name={item}
        className="default-input default-input--number-type"
        defaultValue={money[item]}
        onChange={onChange}
        onBlur={onBlur}
      />
      <label>{label[id]}</label>
    </div>
  ));
};

export default Hero;
