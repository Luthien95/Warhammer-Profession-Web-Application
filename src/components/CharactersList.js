import React from "react";
import { NavLink } from "react-router-dom";
import "./../style/css/style.css";

class CharacterList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="character-list">
        <div className="character-list__item">
          <NavLink to={"/newcharacter"} className="character-list__link">
            <i className="fas fa-plus"></i> Dodaj nową postać
          </NavLink>
        </div>
      </div>
    );
  }
}

export default CharacterList;
