import React from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { Multiselect } from "multiselect-react-dropdown";
import Table from "./newCharacter/Table.js";
import BaseSkills from "./newCharacter/BaseSkills.js";
import selectStyles from "./../libraryStyles/selectStyles";
import "./../style/css/style.css";

const getFilteredRaces = () => {
  return axios
    .get(
      //`http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getRaces`,
      `http://localhost:5000/api/characters/getRaces`,
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

const promiseOptions = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(getFilteredRaces());
    }, 1000);
  });

class NewCharacter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCharacter: {},
      race: null,
      inputValue: "",
      defaultOptions: [],
      basicStatistics: [],
      baseRaceSkills: [],
      optionalRaceSkills: [],
      baseRaceAbilities: [],
      optionalRaceAbilities: [],
      baseProfessionSkills: [],
      optionalProfessionSkills: [],
      baseProfessionAbilities: [],
      optionalProfessionAbilities: [],
    };

    this.addDataToCharacter = this.addDataToCharacter.bind(this);
    this.addSelectedOptionToCharacter = this.addSelectedOptionToCharacter.bind(
      this
    );
    this.addNewCharacter = this.addNewCharacter.bind(this);
    this.getBasicStatistics = this.getBasicStatistics.bind(this);
    this.getProfessionData = this.getProfessionData.bind(this);
    this.changeStatistics = this.changeStatistics.bind(this);
    this.selectOptionalRaceSkill = this.selectOptionalRaceSkill.bind(this);
    this.selectOptionalRaceAbilities = this.selectOptionalRaceAbilities.bind(
      this
    );
    this.selectOptionalProfessionSkill = this.selectOptionalProfessionSkill.bind(
      this
    );
    this.selectOptionalProfessionAbilities = this.selectOptionalProfessionAbilities.bind(
      this
    );
    this.postFinishedCharacter = this.postFinishedCharacter.bind(this);
  }

  addDataToCharacter(dataName, dataValue) {
    this.setState({
      newCharacter: {
        ...this.state.newCharacter,
        [dataName]: dataValue,
      },
    });
  }

  addSelectedOptionToCharacter(dataName, optionSelected) {
    const value = optionSelected.value;

    this.setState({
      newCharacter: {
        ...this.state.newCharacter,
        [dataName]: value,
      },
      [dataName]: value,
    });

    if (dataName === "race") {
      this.getBasicStatistics(value);
    } else if (dataName === "professionId") {
      this.getProfessionData(value);
    }
  }

  getBasicStatistics(raceId) {
    return axios
      .get(
        //`http://192.168.0.52:8020/WarhammerProfessionsApp/api/charactercreator/GetNewCharacterData`,
        `http://localhost:5000/api/charactercreator/GetNewCharacterData`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        response.data.forEach((element) => {
          if (element.race === raceId) {
            this.setState({
              basicStatistics: element.statistics,
              baseRaceSkills: element.skillsSet,
              optionalRaceSkills: element.skillsChoice,
              baseRaceAbilities: element.abilitiesSet,
              optionalRaceAbilities: element.abilitiesChoice,
              newCharacter: {
                ...this.state.newCharacter,
                statistics: element.statistics,
              },
            });
          }
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  getProfessionData(professionId) {
    return axios
      .get(
        // `http://192.168.0.52:8020/WarhammerProfessionsApp/api/charactercreator/GetProfessionData?id=${professionId}`,
        `http://localhost:5000/api/charactercreator/GetProfessionData?id=${professionId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response);
        this.setState({
          baseProfessionSkills: response.data.skillsSet,
          optionalProfessionSkills: response.data.skillsChoice,
          baseProfessionAbilities: response.data.abilitiesSet,
          optionalProfessionAbilities: response.data.abilitiesChoice,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  changeStatistics(statisticsName, statisticsValue) {
    var newValue = parseInt(statisticsValue, 10);

    {
      this.state.newCharacter.statistics.map((statistic, i) => {
        if (statistic.type === statisticsName) {
          let statisticsCopy = JSON.parse(
            JSON.stringify(this.state.newCharacter.statistics)
          );

          statisticsCopy[i].value = newValue;
          this.setState({
            newCharacter: {
              ...this.state.newCharacter,
              statistics: statisticsCopy,
            },
          });
        }
      });
    }
  }

  addNewCharacter() {
    if (!this.state.newCharacter.raceSkills) {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          raceSkills: [],
        },
      });
    } else if (!this.state.newCharacter.raceAbilities) {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          raceAbilities: [],
        },
      });
    } else if (!this.state.newCharacter.professionSkills) {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionSkills: [],
        },
      });
    } else if (!this.state.newCharacter.professionAbilities) {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionAbilities: [],
        },
      });
    }

    if (
      this.state.newCharacter.raceSkills &&
      this.state.newCharacter.raceAbilities &&
      this.state.newCharacter.professionSkills &&
      this.state.newCharacter.professionAbilities
    ) {
      this.postFinishedCharacter();
    }
  }

  postFinishedCharacter() {
    axios
      .post(
        //`http://192.168.0.52:8020/WarhammerProfessionsApp/api/charactercreator/postFinishedCharacter`,
        `http://localhost:5000/api/charactercreator/postFinishedCharacter`,
        this.state.newCharacter,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  getFilteredProfessions(inputValue) {
    //const reg = new RegExp(inputValue, "i");

    return axios
      .get(
        //`http://192.168.0.52:8020/WarhammerProfessionsApp/api/charactercreator/GetAvailableProfessions?race=${this.state.race}`,
        `http://localhost:5000/api/charactercreator/GetAvailableProfessions?race=${this.state.race}`,
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
  }

  loadProfessions = (inputValue) => {
    return new Promise((resolve) =>
      resolve(this.getFilteredProfessions(inputValue))
    );
  };

  selectOptionalRaceSkill(selectedList, selectedItem, e) {
    console.log(e);
    if (this.state.newCharacter.raceSkills) {
      let arrayClone = this.state.newCharacter.raceSkills.slice();
      arrayClone[arrayClone.length] = selectedItem;

      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          raceSkills: arrayClone,
        },
      });
    } else {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          raceSkills: selectedList,
        },
      });
    }
  }

  selectOptionalRaceAbilities(selectedList, selectedItem) {
    if (this.state.newCharacter.raceAbilities) {
      let arrayClone = this.state.newCharacter.raceAbilities.slice();
      arrayClone[arrayClone.length] = selectedItem;

      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          raceAbilities: arrayClone,
        },
      });
    } else {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          raceAbilities: selectedList,
        },
      });
    }
  }

  selectOptionalProfessionSkill(selectedList, selectedItem) {
    if (this.state.newCharacter.professionSkills) {
      let arrayClone = this.state.newCharacter.professionSkills.slice();
      arrayClone[arrayClone.length] = selectedItem;

      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionSkills: arrayClone,
        },
      });
    } else {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionSkills: selectedList,
        },
      });
    }
  }

  selectOptionalProfessionAbilities(selectedList, selectedItem) {
    if (this.state.newCharacter.professionAbilities) {
      let arrayClone = this.state.newCharacter.professionAbilities.slice();
      arrayClone[arrayClone.length] = selectedItem;

      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionAbilities: arrayClone,
        },
      });
    } else {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionAbilities: selectedList,
        },
      });
    }
  }

  render() {
    const { inputValue, defaultOptions } = this.state;

    console.log(this.state.newCharacter);

    return (
      <div className="new-character">
        <p>Stwórz nową postać</p>
        <p className="user-panel__label">Imię postaci</p>
        <input
          type="text"
          name="userName"
          placeholder="Imię..."
          className="default-input"
          onBlur={(e) => this.addDataToCharacter("name", e.target.value)}
        />{" "}
        <p className="user-panel__label">Rasa</p>
        <AsyncSelect
          placeholder="Wybierz rasę"
          defaultValue="Wybierz rasę"
          defaultOptions={true}
          styles={selectStyles}
          autoLoad={true}
          loadOptions={() => promiseOptions()}
          onChange={(value) => this.addSelectedOptionToCharacter("race", value)}
          className="default-select"
        />
        <p className="user-panel__label">Klasa</p>
        <AsyncSelect
          placeholder="Wybierz klasę"
          defaultValue="Wybierz klasę"
          loadOptions={this.loadProfessions}
          defaultOptions={defaultOptions}
          inputValue={inputValue}
          defaultValue={inputValue}
          onChange={(value) =>
            this.addSelectedOptionToCharacter("professionId", value)
          }
          styles={selectStyles}
          className="default-select"
        />
        <p className="user-panel__label">Początkowe statystyki</p>
        <Table
          addDataToCharacter={this.addDataToCharacter}
          statistics={this.state.basicStatistics}
          changeStatistics={this.changeStatistics}
        />
        <p className="user-panel__label">Początkowe umiejętności</p>
        <BaseSkills baseSkills={this.state.baseRaceSkills} />
        {this.state.optionalRaceSkills.map((list) => (
          <Multiselect
            options={list.values}
            onSelect={this.selectOptionalRaceSkill}
            onRemove={this.onRemove}
            displayValue="name"
            selectionLimit={list.quantity}
            value={list.values.name}
            placeholder="Wybierz umiejętność"
          />
        ))}
        <BaseSkills baseSkills={this.state.baseProfessionSkills} />
        {this.state.optionalProfessionSkills.map((list) => (
          <Multiselect
            options={list.values}
            onSelect={this.selectOptionalProfessionSkill}
            onRemove={this.onRemove}
            displayValue="name"
            selectionLimit={list.quantity}
            value={list.values.name}
            placeholder="Wybierz umiejętność"
          />
        ))}
        <p className="user-panel__label">Początkowe zdolności</p>
        <BaseSkills baseSkills={this.state.baseRaceAbilities} />
        {this.state.optionalRaceAbilities.map((list) => (
          <Multiselect
            options={list.values}
            onSelect={this.selectOptionalRaceAbilities}
            onRemove={this.onRemove}
            displayValue="name"
            selectionLimit={list.quantity}
            value={list.values.name}
            placeholder="Wybierz zdolność"
          />
        ))}
        <BaseSkills baseSkills={this.state.baseProfessionAbilities} />
        {this.state.optionalProfessionAbilities.map((list) => (
          <Multiselect
            options={list.values}
            onSelect={this.selectOptionalProfessionAbilities}
            onRemove={this.onRemove}
            displayValue="name"
            selectionLimit={list.quantity}
            value={list.values.name}
            placeholder="Wybierz zdolność"
          />
        ))}
        <button
          className="new-character__button"
          onClick={this.addNewCharacter}
        >
          Zapisz postać
        </button>
      </div>
    );
  }
}

export default NewCharacter;

/*

Poprawki dla Grześka
- języki powinny być do wyboru, wszystkie zrobione podobnie tzn nazwa w nawiasach, dwa razy staroświatowy










*/

/*

{
  name: ,
  proffesionId,
  race,
  statistics: [{type, value}],
  raceSkills: [{id, dictionaryValueId}],
  raceAbilites: [],
  professionSkils[];
  professionAbilities: []
}

postFinishedCharacter

*/

/*
<AsyncSelect
          defaultValue={false}
          defaultOptions={false}
          styles={selectStyles}
          autoLoad={false}
          options={this.state.options}
          //loadProfessions={() => this.promiseOptions("getRaces", "filteredRaces")}
          //onFocus={() => this.promiseOptions("getRaces", "filteredRaces")}
          className="default-select"
        />
        <AsyncSelect
          //onFocus={this.handleInputChange}
          //loadProfessions={this.fetchData}
          //isSearchable={false}
          //cacheOptions={true}
          placeholder="Admin Name"
          defaultOptions={false}
        />

 <AsyncSelect
          cacheOptions
          defaultOptions={this.state.race ? true : false}
          isClearable
          className="basic-single"
          classNamePrefix="select"
          name="search"
          //loadProfessions={() => this.getAsyncOptions()}
        />

<AsyncSelect
          placeholder="Wybierz rasę"
          defaultValue={true}
          defaultOptions={this.state.race != null ? true : false}
          styles={selectStyles}
          autoLoad={false}
          loadProfessions={() => promiseOptions("getRaces", "filteredRaces")}
          onChange={(value) => this.addSelectedOptionToCharacter("race", value)}
          className="default-select"
        />
        <p className="user-panel__label">Profesja</p>
        <Select
          searchable={true}
          onBlurResetsInput={false}
          onCloseResetsInput={false}
          labelKey="label"
          valuekey="value"
          ref={this.simulateClick}
          autoload={false}
          isLoading={this.state.isLoading}
          options={this.state.options}
          onFocus={this.maybeLoadOptions}
        />

fetchData = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        axios
          .get(
            //`http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getRaces`,
            `http://localhost:5000/api/characters/getRaces`,
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
              tempArray.push({ label: `${element.name}`, value: element.id });
            });
            callback(tempArray);
          })
          .catch((error) => {
            console.log(error, "catch the hoop");
          });
      });
    }
  };

  getFilteredRaces(src, arrayName) {
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

        console.log(tempArray);
        return tempArray;
      })
      .catch((error) => console.log("Error" + error));
  }


 getAsyncOptions() {
    return new Promise((resolve, reject) => {
      const filtered = [
        { value: "one", label: "One" },
        { value: "two", label: "Two" },
      ];

      /* const tempArray = [];

      axios
        .get(
          `http://192.168.0.52:8020/WarhammerProfessionsApp/api/charactercreator/GetAvailableProfessions?race=${this.state.race}`,
          //`http://localhost:5000/api/characters/${url}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((response) => {
          response.data.forEach((element) => {
            tempArray.push({
              label: `${element.name}`,
              value: element.id,
            });
          });

          console.log(tempArray);
          //resolve(tempArray);
          return tempArray;
        })
        .catch((error) => console.log("Error" + error));

        resolve(filtered);
      });
    }
  
    handleLoadOptions = (input, callback) => {
      let options;
      setTimeout(() => {
        options = [
          { value: "one", label: "One" },
          { value: "two", label: "Two" },
        ];
        this.setState({
          optionsLoaded: true,
          options,
          isLoading: false,
        });
  
        this.simulateClick(this);
      }, 2000);
    };
  
    maybeLoadOptions = () => {
      if (!this.state.optionsLoaded) {
        this.setState({ isLoading: true });
        this.handleLoadOptions();
      }
    };
  
    simulateClick(e) {
      console.log(e);
    }
  
    //
handleInputChange() {
    const inputValue = ".";
    this.setState({ inputValue });

    console.log(this.state.inputValue);
    return inputValue;
  }

  componentDidMount() {
    const { inputValue } = this.state;
    this.loadDefaultOptions(inputValue);
  }

  loadDefaultOptions = (inputValue) => {
    this.loadProfessions(inputValue).then((defaultOptions) =>
      this.setState({ defaultOptions })
    );
  };

  onInputChange = (inputValue, { action }) => {
    console.log("action", action);
    if (action === "input-change") {
      this.setState({ inputValue });
    }
    if (action === "menu-close") {
      this.loadDefaultOptions(this.state.inputValue);
    }
  };
        
*/
