import React from "react";
import "./../../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Table extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      headers: []
    };

    this.addRow = this.addRow.bind(this);
  }

  componentWillMount() {
    this.setState(
      {
        headers: [...this.state.headers, ...this.props.date]
      },
      () => {
        console.log(this.state.headers);
      }
    );
  }

  addRow(e) {
    e.preventDefault();
    let { data } = this.state;
    data.push(data.length);
    this.setState({ data });
  }

  render() {
    //console.log(this.props.date);
    return (
      <div>
        <table>
          <thead>
            {this.state.headers.map(item => (
              <th>{item}</th>
            ))}
          </thead>
          <tbody>
            <Row headers={this.state.headers} />
            {this.state.data.map(id => (
              <Row headers={this.state.headers} />
            ))}
          </tbody>
        </table>
        <button onClick={this.addRow}>Add</button>
      </div>
    );
  }
}

const Row = ({ headers }) => {
  return (
    <tr>
      {headers.map(item => {
        return (
          <td>
            <input type="text" />
          </td>
        );
      })}
    </tr>
  );
};

export default Table;
