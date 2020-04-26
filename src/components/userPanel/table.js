import React from "react";
import "./../../style/css/style.css";
import axios from "axios";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroStatistic: [],
    };

    //this.changeBaseStatisticValue = this.changeBaseStatisticValue.bind(this);
    this.changeStatisticValue = this.changeStatisticValue.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.statistics !== this.props.statistics) {
      this.setState({
        heroStatistic: [...this.state.heroStatistic, ...this.props.statistics],
      });
    }
  }

  /*changeBaseStatisticValue(event, type) {
    const valueOfFeature = parseInt(event.target.value, 10);
    const typeOfFeature = parseInt(type, 10);

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeBaseStatisticValue",
        //"http://localhost:5000/api/characters/changeBaseStatisticValue/",
        {
          value: valueOfFeature,
          type: typeOfFeature,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .catch((error) => console.log("Error" + error));
  }*/

  changeStatisticValue(type, value) {
    const typeOfFeature = parseInt(type, 10);

    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters/changeStatisticValue",
        //"http://localhost:5000/api/characters/changeBaseStatisticValue/",
        {
          incrementingValue: value,
          type: typeOfFeature,
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
      <table className="feature-table">
        <thead>
          <tr>
            <td className="feature-table__item"></td>
            {this.state.heroStatistic.map((item) => (
              <td key={item.name} className="feature-table__item">
                {item.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <InputRow
            header={{ text: "Podstawowa wartość" }}
            value="baseValue"
            statistics={this.state.heroStatistic}
          />
          <Row
            header={{ text: "Obecna wartość / Wartość maksymalna" }}
            value={["currentValue", "maximumValue", "details"]}
            statistics={this.state.heroStatistic}
            type="number"
          />
          <Buttons
            value={["canBeDecreased", "canBeIncreased", "type"]}
            statistics={this.state.heroStatistic}
            changeStatisticValue={this.changeStatisticValue}
          />
        </tbody>
      </table>
    );
  }
}

const InputRow = ({ header, value, statistics }) => {
  const currentValue = value;

  return (
    <tr>
      <td className="feature-table__item feature-table__item--row-header">
        {header.text}
      </td>
      {statistics.map((item) => {
        return (
          <td className="feature-table__item" key={item.name}>
            <p>{item[currentValue]}</p>
          </td>
        );
      })}
    </tr>
  );
};

const Row = ({ header, value, statistics }) => {
  const currentValue = value[0];
  const maximumValue = value[1];
  const details = value[2];

  return (
    <tr>
      <td className="feature-table__item feature-table__item--row-header">
        {header.text}
      </td>
      {statistics.map((item) => {
        return (
          <td className="feature-table__item" key={item.name}>
            <p>{item[currentValue] + " / " + item[maximumValue]}</p>
            <span className="feature-table__details-description">
              {item[details]}
            </span>
          </td>
        );
      })}
    </tr>
  );
};

const Buttons = ({ value, statistics, changeStatisticValue }) => {
  const canBeDecreased = value[0];
  const canBeIncreased = value[1];
  const inputType = value[2];

  return (
    <tr>
      <td className="feature-table__item feature-table__item--row-header"></td>
      {statistics.map((item) => {
        return (
          <td
            className="feature-table__item feature-table__item"
            key={item.name}
          >
            <button
              className={`feature-table__button ${
                item[canBeIncreased] ? "" : "feature-table__button--not-active"
              }`}
              onClick={() => {
                changeStatisticValue(item[inputType], true);
              }}
            >
              +
            </button>
            <button
              className={`feature-table__button ${
                item[canBeDecreased] ? "" : "feature-table__button--not-active"
              }`}
              onClick={() => {
                changeStatisticValue(item[inputType], false);
              }}
            >
              -
            </button>
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
