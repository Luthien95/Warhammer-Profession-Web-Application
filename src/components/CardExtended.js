import React from "react";
import "./../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class CardExtended extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profession: {},
      id: null
    };

    this.getData = this.getData.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    this.setState(prevState => ({ active: false }), function() {
      this.props.parentCallback(this.state.active);
    });
  }

  componentDidMount() {
    this.setState({ id: this.props.id }, () => this.getData());
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/professions/" +
          this.state.id,
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(response => {
        console.log(response.data);
      })
      .then(data =>
        this.setState({
          profession: {
            ...this.state.profession,
            data
          }
        })
      )
      .catch(error => console.log("Error" + error));
  }

  render() {
    const { profession } = this.state;

    console.log(this.state.profession);
    return (
      <div className="card-extended">
        <div className="">
          <div className="header-icons">
            <i
              className="fas fa-times header-icons__icon"
              onClick={this.changeState}
            ></i>
          </div>
          {this.state.profession}
          {this.state.description}
        </div>
      </div>
    );
  }
}
export default CardExtended;
