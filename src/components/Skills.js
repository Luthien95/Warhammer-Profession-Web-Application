import React from "react";
import "./../style/css/style.css";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";

const FilterableTable = require("react-filterable-table");

class Skills extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      listOfSkills: []
    };
  }

  getData() {
    axios
      .get("http://192.168.0.52:8020/WarhammerProfessionsApp/api/skills", {
        headers: { "Content-Type": "application/json" }
      })
      .then(response =>
        response.data.map(professions => ({
          description: `${professions.description}`,
          name: `${professions.name}`,
          id: `${professions.id}`,
          skillLevel: `${professions.skillLevel}`,
          trait: `${professions.trait}`
        }))
      )
      .then(listOfSkills => {
        this.setState({
          listOfSkills
        });
      })
      .catch(error => console.log("Error" + error));
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const { listOfSkills } = this.state;

    const fields = [
      {
        name: "name",
        displayName: "Name",
        inputFilterable: true,
        sortable: true
      },
      {
        name: "skillLevel",
        displayName: "Rodzaj umiejętności",
        inputFilterable: true,
        exactFilterable: true,
        sortable: true
      },
      {
        name: "trait",
        displayName: "Odpowiedzialna statystyka",
        inputFilterable: true,
        exactFilterable: true,
        sortable: true
      },
      {
        name: "description",
        displayName: "Opis",
        inputFilterable: true,
        exactFilterable: true,
        sortable: true
      }
    ];

    return (
      <FilterableTable
        namespace="People"
        initialSort="name"
        data={listOfSkills}
        fields={fields}
        noRecordsMessage="There are no people to display"
        noFilteredRecordsMessage="No people match your filters!"
        className="listOfSkills"
      />
    );
  }
}
export default Skills;
