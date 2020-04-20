import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import ReactTooltip from "react-tooltip";

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedItems: [],
      additionalItems: [],
      editMode: false,
      editedItem: null,
      changedValue: null,
      newAdditionalItem: {
        name: null,
        weight: null,
        description: null,
        quantity: null,
      },
    };

    this.inputChange = this.inputChange.bind(this);
    this.addAdditionalItem = this.addAdditionalItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeAdditionalItem = this.removeAdditionalItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changeInputData = this.changeInputData.bind(this);
    this.saveChangedItem = this.saveChangedItem.bind(this);
    this.changeAdditionalItemInput = this.changeAdditionalItemInput.bind(this);
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

  inputChange(data, event) {
    let value = null;

    if (event.target.type === "text") {
      value = event.target.value;
    } else if (event.target.type === "number") {
      value = JSON.parse(event.target.value);
    }

    this.setState({
      newAdditionalItem: {
        ...this.state.newAdditionalItem,
        [data]: value,
      },
    });
  }

  removeItem(id) {
    axios
      .post(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeItem`,
        {
          id: id,
          changeMoney: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const items = this.state.ownedItems.filter((item) => item.id !== id);

        this.setState({ ownedItems: items });
      })
      .catch((error) => console.log("Error" + error));
  }

  addAdditionalItem() {
    {
      Object.keys(this.state.newAdditionalItem).filter((item) =>
        //item === null ? console.log("wara") : console.log("moszna")
        console.log(item === null)
      );
    }

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addAdditionalItem",
        //"http://localhost:5000/api/characters/addAdditionalItem/",
        this.state.newAdditionalItem,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.setState((previousState) => ({
          additionalItems: [
            ...previousState.additionalItems,
            this.state.newAdditionalItem,
          ],
        }));
      })
      .catch((error) => console.log("Error" + error));
  }

  removeAdditionalItem(id) {
    axios
      .delete(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeAdditionalItem?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const items = this.state.additionalItems.filter(
          (item) => item.id !== id
        );

        this.setState({ additionalItems: items });
      })
      .catch((error) => console.log("Error" + error));
  }

  changeItem(itemId) {
    /* axios
      .post(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/removeItem`,
        {
          id: id,
          changeMoney: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        const items = this.state.ownedItems.filter((item) => item.id !== id);

        this.setState({ ownedItems: items });
      })
      .catch((error) => console.log("Error" + error));*/
    this.setState({
      editMode: true,
      editedItem: itemId,
    });
  }

  saveChangedItem(itemId, quantity) {
    let itemQuantity = JSON.parse(quantity);
    axios
      .post(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/modifyItem`,
        {
          id: itemId,
          quantity: itemQuantity,
          changeMoney: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.state.ownedItems.filter((item, id) =>
          item.id === itemId
            ? this.setState((prevState) => {
                let ownedItems = Object.assign({}, prevState.ownedItems);
                ownedItems[id].quantity = itemQuantity;

                return { ownedItems };
              })
            : null
        );
      })
      .catch((error) => console.log("Error" + error));

    this.setState({
      editMode: false,
      editedItem: null,
    });
  }

  saveChangedAdditionalItem(itemId, quantity) {
    let itemQuantity = JSON.parse(quantity);
    axios
      .post(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/modifyAdditionalItem`,
        {
          id: itemId,
          quantity: itemQuantity,
          changeMoney: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        this.state.ownedItems.filter((item, id) =>
          item.id === itemId
            ? this.setState((prevState) => {
                let ownedItems = Object.assign({}, prevState.ownedItems);
                ownedItems[id].quantity = itemQuantity;

                return { ownedItems };
              })
            : null
        );
      })
      .catch((error) => console.log("Error" + error));

    this.setState({
      editMode: false,
      editedItem: null,
    });
  }

  changeInputData(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      changedValue: event.target.value,
    });

    console.log(this.state.changedValue);
  }

  changeAdditionalItemInput(event) {
    console.log(event.target.name);

    this.setState({
      editedItem: {
        [event.target.name]: event.target.value,
      },
    });
  }

  render() {
    return (
      <div className="character-panel items-list">
        <p className="user-panel__label">
          <i className="fas fa-th-large"></i> Posiadane przedmioty
        </p>
        <Item
          ownedItems={this.state.ownedItems}
          removeItem={this.removeItem}
          changeItem={this.changeItem}
          editMode={this.state.editMode}
          editedItem={this.state.editedItem}
          changeInputData={this.changeInputData}
          saveChangedItem={this.saveChangedItem}
          changedValue={this.state.changedValue}
        />
        <AdditionalItem
          ownedItems={this.state.additionalItems}
          removeItem={this.removeAdditionalItem}
          changeItem={this.changeItem}
          editMode={this.state.editMode}
          editedItem={this.state.editedItem}
          changeInputData={this.changeAdditionalItemInput}
          saveChangedItem={this.saveChangedAdditionalItem}
          changedValue={this.state.changedValue}
        />

        <p className="user-panel__label">
          <i className="fas fa-pencil-alt"></i> Dodaj nowy przedmiot
        </p>
        <input
          placeholder="Wpisz nazwę przedmiotu..."
          onChange={(event) => this.inputChange("name", event)}
          type="text"
          required
        ></input>
        <input
          placeholder="Ilość"
          onChange={(event) => this.inputChange("quantity", event)}
          type="number"
          className="input-number"
        ></input>
        <input
          placeholder="Waga"
          onChange={(event) => this.inputChange("weight", event)}
          type="number"
          className="input-number"
        ></input>
        <input
          placeholder="Opis przedmiotu"
          onChange={(event) => this.inputChange("description", event)}
          type="text"
        ></input>
        <button
          className="feature-table__button"
          onClick={this.addAdditionalItem}
        >
          +
        </button>
        <p className="user-panel__label">
          <i className="fas fa-pencil-alt"></i> Dodaj nowy przedmiot z listy
        </p>
      </div>
    );
  }
}

const Item = ({
  ownedItems,
  removeItem,
  changeItem,
  editMode,
  editedItem,
  changeInputData,
  saveChangedItem,
  changedValue,
}) => {
  const items = ownedItems;

  return items.map((item) => (
    <div key={item.id}>
      <p className="items-list__label">
        {item.name}{" "}
        {editMode && item.id === editedItem ? (
          <input
            type="number"
            name="quantity"
            placeholder={item.quantity}
            onChange={changeInputData}
            className="items-list__input input-number"
          />
        ) : (
          <span className="items-list__quantity">({item.quantity})</span>
        )}
        <span className="items-list__buttons">
          {editMode && item.id === editedItem ? (
            <i
              className="fas fa-check"
              onClick={() => {
                saveChangedItem(item.id, changedValue);
              }}
              data-tip="Zapisz zmiany"
              data-for="main"
            ></i>
          ) : (
            <i
              className="fas fa-pencil-alt"
              onClick={() => {
                changeItem(item.id);
              }}
              data-tip="Edutuj przedmiot"
            ></i>
          )}
          <i
            onClick={() => {
              removeItem(item.id);
            }}
            className="fas fa-trash-alt"
          ></i>
        </span>
      </p>
      <p className="items-list__description">
        Waga: {item.weight} | Opis: {item.description}
      </p>
      <ReactTooltip />
    </div>
  ));
};

const AdditionalItem = ({
  ownedItems,
  removeItem,
  changeItem,
  editMode,
  editedItem,
  changeInputData,
  saveChangedItem,
  changedValue,
}) => {
  const items = ownedItems;

  return items.map((item) => (
    <div>
      <p key={item.id} className="items-list__label">
        {editMode && item.id === editedItem ? (
          <input
            type="text"
            name="name"
            placeholder={item.name}
            onChange={changeInputData}
            className="items-list__input input-number"
          />
        ) : (
          item.name
        )}{" "}
        {editMode && item.id === editedItem ? (
          <input
            type="number"
            name="quantity"
            placeholder={item.quantity}
            onChange={changeInputData}
            className="items-list__input input-number"
          />
        ) : (
          <span className="items-list__quantity">({item.quantity})</span>
        )}
        <span className="items-list__buttons">
          {editMode && item.id === editedItem ? (
            <i
              className="fas fa-check"
              onClick={() => {
                saveChangedItem(item.id, changedValue);
              }}
              data-tip="Zapisz zmiany"
              data-for="main"
            ></i>
          ) : (
            <i
              className="fas fa-pencil-alt"
              onClick={() => {
                changeItem(item.id);
              }}
              data-tip="Edytuj przedmiot"
            ></i>
          )}
          <i
            onClick={() => {
              removeItem(item.id);
            }}
            className="fas fa-trash-alt"
          ></i>
        </span>
      </p>
      <p className="items-list__description">
        Waga:{" "}
        {editMode && item.id === editedItem ? (
          <input
            type="number"
            name="weight"
            placeholder={item.weight}
            onChange={changeInputData}
            className="items-list__input input-number"
          />
        ) : (
          item.weight
        )}{" "}
        | Opis:{" "}
        {editMode && item.id === editedItem ? (
          <input
            type="text"
            name="description"
            placeholder={item.description}
            onChange={changeInputData}
            className="items-list__input"
          />
        ) : (
          item.description
        )}
      </p>
    </div>
  ));
};
export default Items;
