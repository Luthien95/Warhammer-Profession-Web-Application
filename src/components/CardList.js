import React from "react";
import "./../style/css/style.css";
import Cards from "./../data/data.json";
import "@fortawesome/fontawesome-free/css/all.min.css";

class CardList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: null
    };
  }
  componentDidMount() {
    this.state = {
      active: this.props.active
    };

    console.log(this.state.active);
  }

  render() {
    return Cards.map((item, key) => (
      <li
        className={
          item.Name == this.state.active
            ? "cards-list__item cards-list__item--active"
            : "cards-list__item"
        }
      >
        {item.Name}
      </li>
    ));
  }
}
export default CardList;
