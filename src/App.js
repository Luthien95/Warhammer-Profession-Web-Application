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
      <div>
        {Cards.map((item, key) => (
          <Card name={item.Name} parentCallback={this.handleData} />
        ))}
        {this.state.isActive ? (
          <CardExtended
            name={this.state.name}
            parentCallback={this.handleData}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
