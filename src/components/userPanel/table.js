import React from "react";
import "./../../style/css/style.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      statistics: [],
      step: ""
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.statistics !== this.props.statistics) {
      this.setState({
        statistics: [...this.state.statistics, ...this.props.statistics],
        step: [...this.state.step, ...this.props.step]
      });
    }
  }

  render() {
    return (
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
          <Row
            header={{ text: "Podstawowa wartość" }}
            value="baseValue"
            statistics={this.state.statistics}
            type="number"
            step={this.state.step}
          />
          <Row
            header={{ text: "Maksymalna wartość" }}
            value="maximumValue"
            statistics={this.state.statistics}
            type="number"
            step={this.state.step}
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
    );
  }
}

const Row = ({ header, value, statistics, type, step }) => {
  const currentValue = value;

  return (
    <tr>
      <td>{header.text}</td>
      {statistics.map(item => {
        return (
          <td>
            <input
              type={type}
              name={header}
              defaultValue={item[currentValue]}
              step={step}
            />
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
