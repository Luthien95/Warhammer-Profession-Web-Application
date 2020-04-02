import React from "react";
import "./../../style/css/style.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: [],
      step: ""
    };

    this.changeValue = this.changeValue.bind(this);
    this.changeStatisticValue = this.changeStatisticValue.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.statistics !== this.props.statistics) {
      this.setState({
        statistics: [...this.state.statistics, ...this.props.statistics],
        step: [...this.state.step, ...this.props.step]
      });
    }
  }

  changeValue() {}

  changeStatisticValue = (event, name) => {
    console.log(name);
    /* this.setState({
      heroInformations: {
        ...this.state.heroInformations,
        name: event.target.value
      }
    });*/

    /* this.setState({
      statistics: {
        ...this.state.statistics
      }
    });*/

    /*this.setState({
      statistics: this.state.statistics.filter(function(stat) {
        if(stat.name === name) {
          ...this.state.statistics,

        }
      })
    });*/
    /*
    this.setState(prevState => ({
      items: {
        ...prevState.items,
        [prevState.items[1].name]: e.target.value
      }
    }));*/
    /*
    this.setState(prevState => ({
      statistics: this.state.statistics.filter()

    }))*/
  };

  render() {
    return (
      <table className="feature-table">
        <thead>
          <tr>
            <td className="feature-table__item"></td>
            {this.state.statistics.map(item => (
              <td key={item.name} className="feature-table__item">
                {item.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          <InputRow
            header={{ text: "Podstawowa wartość" }}
            value={["baseValue", "isReadOnly"]}
            statistics={this.state.statistics}
            type="number"
            step={this.state.step}
            changeStatisticValue={this.changeStatisticValue}
            isDisabled="false"
          />
          <Row
            header={{ text: "Obecna wartość / Wartość maksymalna" }}
            value={["currentValue", "maximumValue", "details"]}
            statistics={this.state.statistics}
            type="number"
            step={this.state.step}
          />
        </tbody>
      </table>
    );
  }
}

const InputRow = ({
  header,
  value,
  statistics,
  type,
  step,
  changeStatisticValue
}) => {
  const currentValue = value[0];
  const isReadOnly = value[1];

  return (
    <tr>
      <td className="feature-table__item feature-table__item--row-header">
        {header.text}
      </td>
      {statistics.map(item => {
        console.log(item[isReadOnly]);
        return (
          <td className="feature-table__item">
            <input
              type={type}
              name={item.name}
              defaultValue={item[currentValue]}
              step={step}
              onChange={
                changeStatisticValue
                  ? event => changeStatisticValue(event, item.name)
                  : undefined
              }
              //onBlur={this.changeValue}
              disabled={item[isReadOnly]}
            />
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
      {statistics.map(item => {
        return (
          <td className="feature-table__item">
            <p>{item[currentValue] + " / " + item[maximumValue]}</p>
            <span className="feature-table__details-description">
              {item[details]}
            </span>
            <button>+</button>
            <button>-</button>
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
