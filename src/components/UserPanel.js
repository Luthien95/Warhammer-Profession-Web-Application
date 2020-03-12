import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Table from "./userPanel/Table";
import Skills from "./userPanel/Skills";
import Abilities from "./userPanel/Abilities";

class UserPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="subpage">
        <form>
          <p>Bohater</p>
          <label for="userName">Imię: </label>
          <input type="text" name="userName" placeholder="Imię" />
          <label for="userRace">Rasa: </label>
          <input type="text" name="userRace" placeholder="Rasa" />
          <label for="proffesionList">Obecna profesja:</label>
          <select id="cars" name="proffesionList" form="carform">
            {this.props.professionList.map((item, key) => (
              <option key={key} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          <label for="proffesionList">Poprzednia profesja:</label>
          <select id="cars" name="proffesionList" form="carform">
            {this.props.professionList.map((item, key) => (
              <option key={key} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <p>Opis bohatera</p>
          <p>
            Pozostałe doświadczenie: <input type="number" />
          </p>
          <p>
            Wykorzystane doświadczenie: <input type="number" />
          </p>
          <p>Pieniądze</p>
          <p>
            Złote Korony(ZK): <input type="number" />
          </p>
          <p>
            Srebrne Szylingi(S): <input type="number" />
          </p>
          <p>
            Miedziane Pensy(P): <input type="number" />
          </p>
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
          <Skills />
          <Abilities />
        </form>
      </div>
    );
  }
}
export default UserPanel;
