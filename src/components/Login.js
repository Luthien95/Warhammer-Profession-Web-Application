import React from "react";
import { Redirect } from "react-router-dom";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
      redirectToReferrer: false,
    };

    this.sendData = this.sendData.bind(this);
    this.changeInputData = this.changeInputData.bind(this);
  }

  sendData(e) {
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/users/Authenticate",
        //"http://localhost:5000/api/users/Authenticate",
        {
          login: this.state.login,
          password: this.state.password,
        }
      )
      .then((response) => {
        localStorage.setItem("token", response.data.token);

        this.setState({
          redirectToReferrer: true,
        });
      })
      .catch((error) => console.log("Error" + error));

    e.preventDefault();
  }

  changeInputData(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    const redirectToReferrer = this.state.redirectToReferrer;

    if (redirectToReferrer === true) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="login-page">
          <form className="login-form" onSubmit={this.sendData}>
            <p>Zaloguj się!</p>
            <div className="login-form__input-container login-form__input-container--user">
              <input
                type="text"
                name="login"
                placeholder="Login"
                value={this.state.login}
                onChange={this.changeInputData}
                required
                className="login-form__input"
              />
            </div>
            <div className="login-form__input-container login-form__input-container--password">
              <input
                type="password"
                name="password"
                placeholder="Hasło"
                value={this.state.password}
                onChange={this.changeInputData}
                className="login-form__input"
              />
            </div>

            <button type="submit" className="login-form__button">
              Zaloguj
            </button>
          </form>
        </div>
      );
    }
  }
}

export default Login;
