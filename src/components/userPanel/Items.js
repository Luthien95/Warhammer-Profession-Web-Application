import React from "react";
import "./../../style/css/style.css";
import axios from "axios";

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedItems: [],
      additionalItems: [],
      additionalItemName: "",
    };

    this.inputChange = this.inputChange.bind(this);
    this.addAdditionalItem = this.addAdditionalItem.bind(this);
  }

  componentDidUpdate(prevProps) {
    const props = ["ownedItems", "additionalItems"];

    props.map((item) => {
      if (prevProps[item] !== this.props[item]) {
        this.setState({
          [item]: [...this.state[item], ...this.props[item]],
        });
      }

      return [item];
    });
  }

  inputChange(event) {
    this.setState({
      additionalItemName: event.target.value,
    });
  }

  addAdditionalItem() {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addCharacterAdditionalValue",
        //"http://localhost:5000/api/characters/addCharacterAdditionalValue/",
        {
          value: this.state.additionalItemName,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }

  render() {
    return (
      <div className="character-panel items-list">
        <p className="user-panel__label">
          <i className="fas fa-th-large"></i> Posiadane przedmioty
        </p>
        {this.state.ownedItems.map((item) => (
          <p key={item.id} className="items-list__items">
            {item.name} <span>({item.quantity})</span>
            <div className="items-list__buttons">
              <i className="fas fa-pencil-alt"></i>
              <i
                //onClick={(e) => this.deleteSkill(item.id, e)}
                className="fas fa-trash-alt"
              ></i>
            </div>
          </p>
        ))}
        {this.state.additionalItems.map((item) => (
          <p key={item.id} className="items-list__items">
            {item.name} <span>({item.quantity})</span>
            <div className="items-list__buttons">
              <i className="fas fa-pencil-alt"></i>
              <i
                //onClick={(e) => this.deleteSkill(item.id, e)}
                className="fas fa-trash-alt"
              ></i>
            </div>
          </p>
        ))}
        <p className="user-panel__label">
          <i className="fas fa-pencil-alt"></i> Dodaj nowy porzedmiot
        </p>
        <input
          defaultValue="Wpisz nazwę przedmiotu..."
          onChange={(event) => this.inputChange(event)}
        ></input>
        <button onClick={this.addAdditionalItem}>
          Dodaj przedmiot do listy
        </button>
      </div>
    );
  }
}

export default Items;
