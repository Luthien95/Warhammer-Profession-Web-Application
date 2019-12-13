import React from "react";
import axios from "axios";

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      proffesions: []
    };

    this.getData = this.getData.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios
      .get("http://192.168.0.52:8020/WarhammerProfessionsApp/api/Professions", {
        headers: { "Content-Type": "application/json" }
      })
      .then(response =>
        response.data.map(proffesion => ({
          name: `${proffesion.name}`,
          description: `${proffesion.name}`,
          equipment: `${proffesion.name}`,
          abilities: `${proffesion.name}`,
          entranceProfessions: `${proffesion.name}`,
          outputProfessions: `${proffesion.name}`,
          skills: `${proffesion.name}`
        }))
      )
      .then(proffesions => {
        this.setState({
          proffesions
        });
      })
      .catch(error => console.log("Error" + error));
  }

  sendData = event => {
    event.preventDefault();
    /*const form = new FormData();

    const user = {
      name: "dfdf",
      description: "dfdf",
      equipment: [],
      abilities: [],
      entranceProfessions: [],
      outputProfessions: [],
      skills: []
    };
    //form.set({});

    console.log(user); */

    /*axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/Professions",
        { user },
        { headers: { "Content-Type": "application/json" } }
      )
      .catch(error => console.log("Error" + error.message));*/

    const options = {
      method: "post",
      url: "http://192.168.0.52:8020/WarhammerProfessionsApp/api/Professions",
      data: {
        name: "dfdf",
        description: "dfdf",
        equipment: [],
        abilities: [],
        entranceProfessions: [],
        outputProfessions: [],
        skills: []
      },
      transformResponse: [
        data => {
          // transform the response
          // return data;
          console.log("response" + data);
          this.getData();
        }
      ]
    };

    // send the request
    axios(options);
  };

  render() {
    const { proffesions } = this.state;
    return (
      <form>
        <input type="text" name="city" placeholder="City..." />
        <input type="text" name="country" placeholder="Country..." />
        <button onClick={this.sendData}>Send Data</button>
        <button onClick={this.getDataFetch}>Get Data</button>
        {proffesions.map(el => (
          <p key={el.index}>{el.name}</p>
        ))}
      </form>
    );
  }
}
export default Form;


abilities: `${professions.description}`,
          equipment: `${professions.equipment}`,
          professionLevel: `${professions.name}`,
          professionRaceAllowed: `${professions.name}`,
          skills: `${professions.name}`,
          agility: `${professions.name}`,
          attacks: `${professions.name}`,
          closeCombat: `${professions.name}`,
          description: `${professions.name}`,
          entranceProfessions: `${professions.name}`,
          hitpoints: `${professions.name}`,
          id: `${professions.name}`,
          imageId: `${professions.name}`,
          inteligence: `${professions.name}`,
          magic: `${professions.name}`,
          name: `${professions.name}`,
          outputProfessions: `${professions.name}`,
          polish: `${professions.name}`,
          resistance: `${professions.name}`,
          shooting: `${professions.name}`,
          speed: `${professions.name}`,
          stamina: `${professions.name}`,
          willpower: `${professions.name}`