import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import "@fortawesome/fontawesome-free/css/all.min.css";
import selectStyles from "./../../libraryStyles/selectStyles";

const filterColors = (src, arrayName) => {
  return axios
    .get(
      `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/${src}`,
      //`http://localhost:5000/api/characters/${url}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    .then((response) => {
      const tempArray = [];
      response.data.forEach((element) => {
        tempArray.push({
          label: `${element.name}`,
          value: element.id,
        });
      });

      return tempArray;
    })
    .catch((error) => console.log("Error" + error));
};

const promiseOptions = (src, arrayName) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(filterColors(src, arrayName));
    }, 1000);
  });

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
    this.passData = this.passData.bind(this);
    this.getData = this.getData.bind(this);
    this.changeCurrentProfession = this.changeCurrentProfession.bind(this);
    this.removeLastProfession = this.removeLastProfession.bind(this);
    this.changeName = this.changeName.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.changeCurrentRace = this.changeCurrentRace.bind(this);
    this.changeExperience = this.changeExperience.bind(this);
    this.changeProfessionActive = this.changeProfessionActive.bind(this);
    this.changeCurrentState = this.changeCurrentState.bind(this);
    //this.loadOptions = this.loadOptions.bind(this);
    //this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate(prevProps) {
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

  getData(url, arrayName) {
    axios
      .get(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/${url}`,
        //`http://localhost:5000/api/characters/${url}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.setState({
          [arrayName]: res.data,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  passData(event) {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeMoney",
        //"http://localhost:5000/api/characters/changeMoney/",
        this.state.money,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  changeCurrentProfession(optionSelected) {
    const value = optionSelected.value;
    const label = optionSelected.label;

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/setNextProfession",
        //"http://localhost:5000/api/characters/setNextProfession/",
        value,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(
        this.setState({
          //previousProffesion: this.state.heroInformations
          //  .actualProfessionName,
          heroInformations: {
            ...this.state.heroInformations,
            actualProfessionName: label,
          },
        }),
        console.log(this.state.heroInformations.actualProfessionName)
      )
      .catch((error) => console.log("Error" + error));
  }

  removeLastProfession() {
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

  saveNote() {
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

  changeCurrentRace(e) {
    let newRace = JSON.parse(e.target.value);
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/setRace",
        //"http://localhost:5000/api/characters/setRace",
        newRace.id,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(
        this.setState({
          heroInformations: {
            ...this.state.heroInformations,
            race: {
              id: newRace.id,
              name: newRace.name,
            },
          },
        })
      )
      .catch((error) => console.log("Error" + error));
  }

  changeExperience() {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeMaximumExperience",
        //"http://localhost:5000/api/characters/changeMaximumExperience/",
        this.state.heroInformations.experienceSum,
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
    this.setState({
      money: {
        ...this.state.money,
        [event.target.name]: +event.target.value,
      },
    });
  };

  changeCurrentState = (event, array, name) => {
    this.setState({
      [array]: {
        ...this.state[array],
        [name]: event.target.value,
      },
    });
  };

  /*handleInputChange = (selectedOption) => {
    if (selectedOption) {
      this.setState({
        selectedOption,
      });
    }
  };*/

  render() {
    //let currentRace = Object.assign({}, this.state.heroInformations.race);
    return (
      <div className="user-panel__description">
        {this.state.heroInformations.race ? (
          <p>{this.state.heroInformations.race.name}</p>
        ) : null}
        <select
          name="changeRace"
          form="changeRace"
          className="user-panel__race"
          defaultValue={
            this.state.heroInformations.race
              ? this.state.heroInformations.race.name
              : "Wybierz rasę"
          }
          onClick={() => {
            this.getData("getRaces", "filteredRaces");
          }}
          onChange={this.changeCurrentRace}
        >
          <option value="Wybierz rasę" disabled>
            Wybierz rasę
          </option>
          {this.state.filteredRaces.map((item, key) => (
            <option
              key={key}
              value={JSON.stringify({ name: item.name, id: item.id })}
            >
              {item.name}
            </option>
          ))}{" "}
        </select>

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
        <p className="user-panel__profession-options">
          <AsyncSelect
            placeholder={
              this.state.heroInformations.actualProfessionName
                ? this.state.heroInformations.actualProfessionName
                : "Wybierz profesję"
            }
            defaultValue={true}
            defaultOptions={true}
            styles={selectStyles}
            key="dd"
            date="date"
            loadOptions={(value) =>
              promiseOptions("getFilteredProfessions", "filteredProfessions")
            }
            onChange={this.changeCurrentProfession}
            menuIsOpen={true}
          />
          <button
            onClick={this.removeLastProfession}
            className="user-panel__remove-profession"
          >
            <i className="far fa-trash-alt"></i>
            <span className="user-panel__delete-span">
              Usuń ostatnią profesję
            </span>
          </button>
        </p>

        <div>
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
        <div>
          <input
            type="number"
            name="gold"
            className="user-panel__input input-number"
            defaultValue={this.state.money.gold}
            onChange={this.changeMoneyAssets}
            onBlur={this.passData}
          />
          <label>Złotych Koron (ZK)</label>
        </div>
        <div>
          <input
            type="number"
            name="silver"
            className="user-panel__input input-number"
            defaultValue={this.state.money.silver}
            onChange={this.changeMoneyAssets}
            onBlur={this.passData}
          />
          <label>Srebrnych Szylingów (S)</label>
        </div>
        <div>
          <input
            type="number"
            name="bronze"
            className="user-panel__input input-number"
            defaultValue={this.state.money.bronze}
            onChange={this.changeMoneyAssets}
            onBlur={this.passData}
          />
          <label>Miedzianych Pensów (P)</label>
        </div>

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
      </div>
    );
  }
}

export default Hero;
