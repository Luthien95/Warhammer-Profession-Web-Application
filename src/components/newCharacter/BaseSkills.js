import React from "react";
import "./../../style/css/style.css";

class BaseSkills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      baseSkills: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.baseSkills !== this.props.baseSkills) {
      this.setState({
        baseSkills: this.props.baseSkills,
      });
    }
  }

  render() {
    return (
      <div>
        {this.state.baseSkills
          ? this.state.baseSkills.map((item) => (
              <Skill key={`Owned skills - ${item.id}`} item={item} />
            ))
          : null}
      </div>
    );
  }
}

const Skill = ({ item }) => {
  const itemName = item.name;
  const itemId = item.id;

  return (
    <div>
      <p className="skill-panel__item" data-number={itemId}>
        {itemName}{" "}
      </p>
    </div>
  );
};

export default BaseSkills;
