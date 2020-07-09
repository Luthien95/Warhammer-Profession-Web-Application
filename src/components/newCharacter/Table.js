import React from "react";
import "./../../style/css/style.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      heroStatistic: [],
      baseStatistics: [],
    };

    this.addStatisticValue = this.addStatisticValue.bind(this);
    this.checkIfAllFilled = this.checkIfAllFilled.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.statistics !== this.props.statistics) {
      this.setState({
        baseStatistics: this.props.statistics,
      });
    }
  }

  addStatisticValue(event, type) {
    const statisticValue = event.target.value;
    const statisticType = type;

    this.setState(
      {
        heroStatistic: [
          ...this.state.heroStatistic,
          {
            type: statisticType,
            value: statisticValue,
          },
        ],
      },
      this.checkIfAllFilled
    );
  }

  checkIfAllFilled() {
    if (this.state.heroStatistic.length === 10) {
      this.props.addDataToCharacter("statistics", this.state.heroStatistic);
    }
  }

  render() {
    return (
      <InputRow
        header={[
          "Walka wręcz",
          "Umiejętności strzeleckie",
          "Krzepa",
          "Odporność",
          "Zręczność",
          "Inteligencja",
          "Siła woli",
          "Ogłada",
          "Punkty życia",
          "Punkty przeznaczenia",
        ]}
        type={["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]}
        statistics={this.state.statistics}
        baseStatistics={this.state.baseStatistics}
        addStatisticValue={this.addStatisticValue}
      />
    );
  }
}

const InputRow = ({
  header,
  type,
  statistics,
  baseStatistics,
  addStatisticValue,
}) => {
  return (
    <table className="default-table">
      <thead className="default-table__thead">
        <tr className="default-table__row">
          {header.map((item) => {
            return <th className="default-table__header-item">{item}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        <tr className="default-table__row">
          {header.map((item, id) => {
            return (
              <td
                key={item.name}
                className="default-table__item"
                data-label={item}
              >
                <input
                  type="number"
                  name={item.name}
                  placeholder={
                    baseStatistics.length > 0 ? baseStatistics[id].value : "0"
                  }
                  onBlur={(event) => addStatisticValue(event, type[id])}
                  className="default-table__input default-imput--number-type"
                />
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
