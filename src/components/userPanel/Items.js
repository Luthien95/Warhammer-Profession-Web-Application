import React from "react";
import "./../../style/css/style.css";
import axios from "axios";
import ReactTooltip from "react-tooltip";
import AsyncSelect from "react-select/async";
import selectStyles from "./../../libraryStyles/selectStyles";

class Items extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedItems: [],
      additionalItems: [],
      filteredItems: [],
      editMode: false,
      editedItem: null,
      changedValue: null,
      newAdditionalItem: {
        name: null,
        weight: null,
        description: null,
        quantity: null,
      },
      inputValue: "",
    };

    this.inputChange = this.inputChange.bind(this);
    this.addAdditionalItem = this.addAdditionalItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.removeAdditionalItem = this.removeAdditionalItem.bind(this);
    this.changeItem = this.changeItem.bind(this);
    this.changeInputData = this.changeInputData.bind(this);
    this.saveChangedItem = this.saveChangedItem.bind(this);
    this.changeAdditionalItemInput = this.changeAdditionalItemInput.bind(this);
    this.saveChangedAdditionalItem = this.saveChangedAdditionalItem.bind(this);
    this.getFilteredItems = this.getFilteredItems.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.loadOptions = this.loadOptions.bind(this);
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
      .then((response) => {
        this.setState((previousState) => ({
          additionalItems: [...previousState.additionalItems, response.data],
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
        const index = this.state.ownedItems.findIndex((m) => m.id === itemId);

        this.setState((prevState) => {
          const items = [...prevState.ownedItems];
          items[index].quantity = itemQuantity;
          return { ownedItems: items };
        });
      })
      .catch((error) => console.log("Error" + error));

    this.setState({
      editMode: false,
      editedItem: null,
    });
  }

  saveChangedAdditionalItem(item) {
    axios
      .post(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/modifyAdditionalItem`,
        item,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {})
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
  }

  changeAdditionalItemInput(event) {
    let value;
    let targetName = event.target.name;

    if (event.target.type === "number") {
      value = JSON.parse(event.target.value);
    } else {
      value = event.target.value;
    }

    this.state.additionalItems.filter((item, id) =>
      item.id === this.state.editedItem
        ? this.setState((prevState) => {
            const items = [...prevState.additionalItems];
            items[id][targetName] = value;
            return { additionalItems: items };
          })
        : null
    );
  }

  getFilteredItems(event) {
    axios
      .get(
        `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getFilteredItems?filter='${event}'`,
        //`http://localhost:5000/api/characters/getFilteredItems?filter='${nazwa}'`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        /*this.setState((previousState) => ({
          additionalItems: [...previousState.additionalItems, response.data],
        }));*/
      })
      .catch((error) => console.log("Error" + error));

    console.log(event.target.value);
  }

  addNewItemFromList(item) {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/addItem",
        //"http://localhost:5000/api/characters/addItem",
        {
          id: item.value,
          changeMoney: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        this.setState((previousState) => ({
          ownedItems: [...previousState.ownedItems, response.data],
        }));
      })
      .catch((error) => console.log("Error" + error));
  }

  handleInputChange = (selectedOption) => {
    if (selectedOption) {
      this.setState({
        selectedOption,
      });
      this.addNewItemFromList(selectedOption);
    }
  };

  loadOptions = (inputValue, callback) => {
    if (!inputValue) {
      callback([]);
    } else {
      setTimeout(() => {
        axios
          .get(
            `http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/getFilteredItems?filter=${inputValue}`,
            //`http://localhost:5000/api/characters/getFilteredItems?filter='${nazwa}'`,
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
                label: `${element.name} | Cena: ${element.gold} Złotych koron ${element.silver} Srebrnych Szylingów ${element.bronze} Miedzuanych Pensów`,
                value: element.id,
              });
            });
            callback(tempArray);
          })
          .catch((error) => console.log("Error" + error));
      });
    }
  };

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
        <p className="user-panel__label">
          <i className="fas fa-th-large"></i> Dodatkowe przedmioty
        </p>
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
        <AsyncSelect
          defaultOptions={false}
          value={this.state.selectedOption}
          loadOptions={this.loadOptions}
          placeholder="Wpisz nazwę przedmiotu..."
          onChange={(e) => {
            this.handleInputChange(e);
          }}
          styles={selectStyles}
        />
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
            data-tip="Usuń przedmiot"
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
    <div key={item.id}>
      <p className="items-list__label">
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
                saveChangedItem(item);
              }}
              data-tip="Zapisz zmiany"
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
            data-tip="Usuń przedmiot"
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
            className="items-list__input input-number"
          />
        ) : (
          item.description
        )}
      </p>
    </div>
  ));
};
export default Items;
