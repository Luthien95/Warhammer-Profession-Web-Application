import React from "react";
import "./../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

class CardExtended extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      profession: {},
      id: 3
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
          params: { id: this.state.id },
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(res => {
        var data = res.data;

        var profession = {
          abilities: data.abilities,
          equipment: data.equipment,
          professionLevel: data.professionLevel,
          professionRaceAllowed: data.professionRaceAllowed,
          skills: data.skills,
          agility: data.agility,
          attacks: data.attacks,
          closeCombat: data.closeCombat,
          description: data.description,
          entranceProfessions: data.entranceProfessions,
          hitpoints: data.hitpoints,
          id: data.id,
          imageId: data.imageId,
          inteligence: data.inteligence,
          magic: data.magic,
          name: data.name,
          outputProfessions: data.outputProfessions,
          polish: data.polish,
          resistance: data.resistance,
          shooting: data.shooting,
          speed: data.speed,
          stamina: data.stamina,
          willpower: data.willpower
        };

        this.setState({
          profession: profession
        });
      })
      .catch(error => console.log("Error" + error));
  }

  render() {
    const { profession } = this.state;

    return (
      <div className="card-extended">
        <div className="">
          <div className="header-icons">
            <i
              className="fas fa-times header-icons__icon"
              onClick={this.changeState}
            ></i>
          </div>
          {this.state.profession.name}
          {this.state.profession.description}
        </div>
      </div>
    );
  }
}
export default CardExtended;
