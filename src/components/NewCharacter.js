import React from "react";
import axios from "axios";
import AsyncSelect from "react-select/async";
import Table from "./newCharacter/Table.js";
import selectStyles from "./../libraryStyles/selectStyles";
import "./../style/css/style.css";

const filterData = (src, arrayName) => {
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
      resolve(filterData(src, arrayName));
    }, 1000);
  });

class NewCharacter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newCharacter: {},
    };

    this.addDataToCharacter = this.addDataToCharacter.bind(this);
    this.addSelectOptionToCharacter = this.addSelectOptionToCharacter.bind(
      this
    );
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
    });
  }

  render() {
    console.log(this.state.newCharacter);

    return (
      <div className="new-character">
        <input
          type="text"
          name="userName"
          placeholder="Imię..."
          className="default-input"
          onBlur={(e) => this.addDataToCharacter("name", e.target.value)}
        />{" "}
        <AsyncSelect
          placeholder="Wybierz rasę"
          defaultValue={true}
          defaultOptions={true}
          styles={selectStyles}
          loadOptions={() => promiseOptions("getRaces", "filteredRaces")}
          onChange={(value) => this.addSelectOptionToCharacter("race", value)}
          className="default-select"
        />
        <AsyncSelect
          placeholder="Wybierz profesję"
          defaultValue={true}
          defaultOptions={true}
          styles={selectStyles}
          loadOptions={() =>
            promiseOptions("getFilteredProfessions", "filteredProfessions")
          }
          onChange={(value) =>
            this.addSelectOptionToCharacter("profession", value)
          }
          className="default-select"
        />
        <p className="user-panel__label">
          <i className="fas fa-coins"></i> Początkowe statystyki
        </p>
        <Table addDataToCharacter={this.addDataToCharacter} />
        <p className="user-panel__label">
          <i className="fas fa-coins"></i> Początkowe umiejętności
        </p>
        <p className="user-panel__label">
          <i className="fas fa-coins"></i> Początkowe zdolności
        </p>
        <button className="new-character__button">Zapisz postać</button>
      </div>
    );
  }
}

export default NewCharacter;

/*
    imie, rasa, profesja, staty poczatkowe, skille, zdolnosci
    

*/
