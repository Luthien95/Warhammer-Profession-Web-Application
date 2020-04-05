import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
} from "react-router-dom";
import { Redirect } from "react-router-dom";
import Home from "./components/Home";
import Select from "./components/Select";
import Register from "./components/Register";
import Login from "./components/Login";
import Skills from "./components/Skills";
import UserPanel from "./components/UserPanel";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      professionList: [],
      menuActive: false,
      isLogginIn: false,
    };

    this.getData = this.getData.bind(this);
    this.toogleNavigation = this.toogleNavigation.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  componentDidMount() {
    let token = localStorage.getItem("token"); //retriving the token from localStorage

    if (token != null) {
      this.setState({ isLogginIn: true });
    } else {
      this.setState({ isLogginIn: false });
    }
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/professions/",
        //"http://localhost:5000/api/professions/",
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((response) =>
        response.data.map((professions) => ({
          description: `${professions.description}`,
          name: `${professions.name}`,
          id: `${professions.id}`,
          imageId: `${professions.imageId}`,
        }))
      )
      .then((professionList) => {
        this.setState({
          professionList,
        });
      })
      .catch((error) => console.log("Error" + error));
  }

  toogleNavigation() {
    this.setState({ active: !this.state.active });
  }

  logOut = () => {
    localStorage.clear();
    return <Redirect to="/" />;
  };

  render() {
    if (this.state.professionList && this.state.professionList.length > 0) {
      return (
        <Router>
          <div
            className={
              this.state.active ? "navigation navigation--open" : "navigation"
            }
          >
            <nav className="navigation__container">
              <div className="navigation__bar" onClick={this.toogleNavigation}>
                <div className="navigation__button">
                  <div className="navigation__button-bar navigation__button-bar--open"></div>
                  <div className="navigation__button-bar navigation__button-bar--open"></div>
                  <div className="navigation__button-bar navigation__button-bar--open"></div>
                  <div className="navigation__button-bar navigation__button-bar--close"></div>
                  <div className="navigation__button-bar navigation__button-bar--close"></div>
                </div>
              </div>
              {localStorage.getItem("token") != null ? (
                <button
                  onClick={this.logOut}
                  className="navigation__logout-button"
                >
                  Wyloguj się <i className="fas fa-lock-open"></i>
                </button>
              ) : null}
            </nav>
            <div className="navigation__content">
              <div className="navigation__background">
                <div className="navigation__background-part"></div>
                <div className="navigation__background-part"></div>
                <div className="navigation__background-part"></div>
              </div>
              <div className="navigation__links">
                {localStorage.getItem("token") != null ? (
                  <ul className="navigation__list">
                    <li className="navigation__item">
                      <NavLink
                        to={"/"}
                        exact
                        className="navigation__link"
                        activeClassName="navigation__link--active"
                        onClick={this.toogleNavigation}
                      >
                        {" "}
                        Strona domowa{" "}
                      </NavLink>
                    </li>
                    <li className="navigation__item">
                      <NavLink
                        to={"/userpanel"}
                        className="navigation__link"
                        activeClassName="navigation__link--active"
                        onClick={this.toogleNavigation}
                      >
                        Panel użytkownika
                      </NavLink>
                    </li>
                    <li className="navigation__item">
                      <NavLink
                        to={"/select"}
                        className="navigation__link"
                        activeClassName="navigation__link--active"
                        onClick={this.toogleNavigation}
                      >
                        Select
                      </NavLink>
                    </li>
                    <li className="navigation__item">
                      <NavLink
                        to={"/skills"}
                        className="navigation__link"
                        activeClassName="navigation__link--active"
                        onClick={this.toogleNavigation}
                      >
                        Umiejętności
                      </NavLink>
                    </li>
                  </ul>
                ) : (
                  <ul className="navigation__list">
                    <li className="navigation__item">
                      <NavLink
                        to={"/register"}
                        className="navigation__link"
                        activeClassName="navigation__link--active"
                        onClick={this.toogleNavigation}
                      >
                        Rejestracja
                      </NavLink>
                    </li>
                    <li className="navigation__item">
                      <NavLink
                        to={"/login"}
                        exact
                        className="navigation__link"
                        activeClassName="navigation__link--active"
                        onClick={this.toogleNavigation}
                      >
                        Logowanie
                      </NavLink>
                    </li>
                  </ul>
                )}
              </div>
            </div>
          </div>
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => (
                <Home {...props} professionList={this.state.professionList} />
              )}
            />
            <Route
              path="/select"
              render={(props) => (
                <Select {...props} professionList={this.state.professionList} />
              )}
            />
            <Route path="/register" render={(props) => <Register />} />
            <Route path="/login" render={(props) => <Login />} />
            <Route
              path="/skills"
              render={(props) => (
                <Skills {...props} professionList={this.state.professionList} />
              )}
            />
            <Route
              path="/userpanel"
              render={(props) => (
                <UserPanel
                  {...props}
                  professionList={this.state.professionList}
                />
              )}
            />
          </Switch>
        </Router>
      );
    } else {
      return <p>loading</p>;
    }
  }
}

export default App;
