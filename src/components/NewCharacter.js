import React from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import { Multiselect } from "multiselect-react-dropdown";
import Table from "./newCharacter/Table.js";
import BaseSkills from "./newCharacter/BaseSkills.js";
import selectStyles from "./../libraryStyles/selectStyles";
import "./../style/css/style.css";

const filterData = (src, arrayName) => {
  return axios
    .get(
      //`http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/${src}`,
      `http://localhost:5000/api/characters/${src}`,
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
      resolve(filterData(src, arrayName));
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
      baseRaceAbilities: [],
      baseProfessionSkills: [],
      optionalProfessionSkills: [],
      baseProfessionAbilities: [],
      optionalProfessionAbilities: [],
    };

    this.addDataToCharacter = this.addDataToCharacter.bind(this);
    this.addSelectOptionToCharacter = this.addSelectOptionToCharacter.bind(
      this
    );
    this.addNewCharacter = this.addNewCharacter.bind(this);
    this.getBasicStatistics = this.getBasicStatistics.bind(this);
    this.getProfessionData = this.getProfessionData.bind(this);
    this.changeStatistics = this.changeStatistics.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  addDataToCharacter(dataName, dataValue) {
    this.setState({
      newCharacter: {
        ...this.state.newCharacter,
        [dataName]: dataValue,
      },
    });
  }

  addSelectOptionToCharacter(dataName, optionSelected) {
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
    }

    if (dataName === "proffesionId") {
      this.getProfessionData(value);
    }

    console.log(this.state.newCharacter);
  }

  getBasicStatistics(classId) {
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
          if (element.race === classId) {
            this.setState({
              basicStatistics: element.statistics,
              baseRaceSkills: element.skillsSet,
              baseRaceAbilities: element.abilitiesSet,
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
        this.setState({
          baseProfessionSkills: response.data.skillsSet,
          optionalProfessionSkills: response.data.skillsChoice,
          baseProfessionAbilities: response.data.abilitiesSet,
          optionalProfessionAbilities: response.data.abilitiesChoice,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  changeStatistics(statisticName, statisticValue) {
    {
      this.state.newCharacter.statistics.map((statistic, i) => {
        if (statistic.type === statisticName) {
          let statisticsCopy = JSON.parse(
            JSON.stringify(this.state.newCharacter.statistics)
          );

          statisticsCopy[i].value = parseInt(statisticValue, 10);
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

  addNewCharacter() {}

  filterOptions(inputValue) {
    const reg = new RegExp(inputValue, "i");

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

  loadOptions = (inputValue) => {
    return new Promise((resolve) => resolve(this.filterOptions(inputValue)));
  };

  handleChange = (event) => {
    console.log(event.target.value);
  };

  onSelect(selectedList, selectedItem) {
    if (this.state.newCharacter.professionSkils) {
      let arrayClone = this.state.newCharacter.professionSkils.slice();
      arrayClone[arrayClone.length] = selectedItem;

      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionSkils: arrayClone,
        },
      });
    } else {
      this.setState({
        newCharacter: {
          ...this.state.newCharacter,
          professionSkils: selectedList,
        },
      });
    }
  }

  render() {
    const { inputValue, defaultOptions } = this.state;

    console.log(this.state.newCharacter);

    console.log(this.state.optionalProfessionSkills);

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
          loadOptions={() => promiseOptions("getRaces", "filteredRaces")}
          onChange={(value) => this.addSelectOptionToCharacter("race", value)}
          className="default-select"
        />
        <p className="user-panel__label">Klasa</p>
        <AsyncSelect
          placeholder="Wybierz klasę"
          defaultValue="Wybierz klasę"
          loadOptions={this.loadOptions}
          defaultOptions={defaultOptions}
          inputValue={inputValue}
          defaultValue={inputValue}
          onChange={(value) =>
            this.addSelectOptionToCharacter("proffesionId", value)
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
        <BaseSkills baseRaceSkills={this.state.baseRaceSkills} />
        <BaseSkills baseRaceSkills={this.state.baseProfessionSkills} />
        {this.state.optionalProfessionSkills.map((list) => (
          <Multiselect
            options={list.values} // Options to display in the dropdown
            onSelect={this.onSelect} // Function will trigger on select event
            onRemove={this.onRemove} // Function will trigger on remove event
            displayValue="name" // Property name to display in the dropdown options
            selectionLimit={list.quantity}
            value={list.values.name}
            onChange={this.handleChange}
            onSelect={this.onSelect}
          />
        ))}
        <p className="user-panel__label">Początkowe zdolności</p>
        <BaseSkills baseRaceSkills={this.state.baseRaceAbilities} />
        <BaseSkills baseRaceSkills={this.state.baseProfessionAbilities} />
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
- ciura obozowa - języki powinny być do wyboru










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
          //loadOptions={() => this.promiseOptions("getRaces", "filteredRaces")}
          //onFocus={() => this.promiseOptions("getRaces", "filteredRaces")}
          className="default-select"
        />
        <AsyncSelect
          //onFocus={this.handleInputChange}
          //loadOptions={this.fetchData}
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
          //loadOptions={() => this.getAsyncOptions()}
        />

<AsyncSelect
          placeholder="Wybierz rasę"
          defaultValue={true}
          defaultOptions={this.state.race != null ? true : false}
          styles={selectStyles}
          autoLoad={false}
          loadOptions={() => promiseOptions("getRaces", "filteredRaces")}
          onChange={(value) => this.addSelectOptionToCharacter("race", value)}
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

  filterData(src, arrayName) {
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
    this.loadOptions(inputValue).then((defaultOptions) =>
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
