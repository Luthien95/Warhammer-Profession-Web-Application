import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import Hero from "./userPanel/Hero";
import Skills from "./userPanel/Skills";
import Abilities from "./userPanel/Abilities";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ownedSkills: [],
      ownedAbilities: [],
      character: {}
    };
  }

  getData() {
    axios
      .get("http://192.168.0.52:8020/WarhammerProfessionsApp/api/characters", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(res => {
        console.log(res.data);
        this.setState({
          ownedSkills: res.data.skills /*set response data in items array*/,
          ownedAbilities: res.data.abilities,
          character: res.data
        });
      })
      .catch(error => console.log("Error" + error));
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    console.log(this.state.character.gold);
    return (
      <div className="subpage">
        <form>
          <Hero
            professionList={this.props.professionList}
            usersMoney={this.state.character.money}
          />
          <p>Cechy</p>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>WW</th>
                <th>US</th>
                <th>K</th>
                <th>Odp</th>
                <th>Zr</th>
                <th>Int</th>
                <th>SW</th>
                <th>Ogd</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Główne</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <th>Początkowe</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <th>Schemat rozwoju</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <th>Aktualne</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>A</th>
                <th>Żyw</th>
                <th>S</th>
                <th>Wt</th>
                <th>Sz</th>
                <th>Mag</th>
                <th>PO</th>
                <th>PP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Drugorzędowe</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <th>Początkowe</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <th>Schemat rozwoju</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
              <tr>
                <th>Aktualne</th>
                <td>
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
                <td>
                  {" "}
                  <input type="number" />
                </td>
              </tr>
            </tbody>
          </table>
          <Skills ownedSkills={this.state.ownedSkills} />
          <Abilities ownedAbilities={this.state.ownedAbilities} />
        </form>
      </div>
    );
  }
}
export default UserPanel;
