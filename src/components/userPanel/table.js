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
      <div className="user-panel__table-container">
        <table>
          <thead>
            <tr>
              <td></td>
              {this.state.statistics.map(item => (
                <td key={item.name}>{item.name}</td>
              ))}
            </tr>
          </thead>
          <tbody>
            <InputRow
              header={{ text: "Podstawowa wartość" }}
              value="baseValue"
              statistics={this.state.statistics}
              type="number"
              step={this.state.step}
              changeStatisticValue={this.changeStatisticValue}
            />
            <Row
              header={{ text: "Obecna wartość" }}
              value="currentValue"
              statistics={this.state.statistics}
              type="number"
              step={this.state.step}
            />
            <Row
              header={{ text: "Działanie" }}
              value="maximumDescription"
              statistics={this.state.statistics}
              type="text"
            />
          </tbody>
        </table>
      </div>
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
  const currentValue = value;

  return (
    <tr>
      <td>{header.text}</td>
      {statistics.map(item => {
        return (
          <td>
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
            />
          </td>
        );
      })}
    </tr>
  );
};

const Row = ({
  header,
  value,
  statistics,
  type,
  step,
  changeStatisticValue
}) => {
  const currentValue = value;

  return (
    <tr>
      <td>{header.text}</td>
      {statistics.map(item => {
        return (
          <td>
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
            />
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
