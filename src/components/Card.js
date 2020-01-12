import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CardExtended from "./CardExtended";
import Background from "./../images/tlo-1.jpg";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  handleClick(e) {
    this.setState({ active: true });
  }

  callbackFunction = childData => {
    this.setState({ active: childData });
  };

  renderExtendedCard() {
    return (
      <CardExtended id={this.props.id} parentCallback={this.callbackFunction} />
    );
  }

  render() {
    return (
      <div
        className="card-interface"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%), linear-gradient(0deg, rgba(0,0,0,.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,.8) 100%), url(${Background})`
        }}
      >
        <div className="card-interface__text-container">
          <h1 className="card-interface__header">{this.props.name}</h1>
          <p className="card-interface__description">
            {this.props.description.substring(0, 200) + "..."}
          </p>
          <button
            className="card-interface__button"
            onClick={this.handleClick.bind(this)}
          >
            czytaj więcej
          </button>
        </div>
        {this.state.active ? this.renderExtendedCard() : null}
      </div>
    );
  }
}
export default Card;
