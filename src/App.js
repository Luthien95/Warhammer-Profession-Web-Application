import React from "react";
import Cards from "./data/data.json";
import Card from "./components/Card";
import CardExtended from "./components/CardExtended";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      name: null
    };

    this.handleData = this.handleData.bind(this);
  }

  handleData = (value, name) => {
    this.setState({ isActive: value, name: name });
  };

  render() {
    return (
      /* <div className="professy-interface">
        <h1 className="professy-interface__header">Pick professy</h1>
        {Cards.map((item, key) => (
          <Card name={item.Name} key={key} parentCallback={this.handleData} />
        ))}
        {this.state.isActive ? (
          <CardExtended
            name={this.state.name}
            parentCallback={this.handleData}
          />
        ) : null}
      </div>*/
      <Card />
    );
  }
}

export default App;
