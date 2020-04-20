import React from "react";
import "./../style/css/style.css";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: "",
    };

    this.sendData = this.sendData.bind(this);
    this.changeInputData = this.changeInputData.bind(this);
  }

  sendData() {
    axios.post(
      "http://192.168.0.52:8020/WarhammerProfessionsApp/api/users/Register",
      {
        login: this.state.login,
        password: this.state.password,
      }
    );
  }

  changeInputData(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="login-page">
        <form method="post" className="login-form">
          <p>Zarejestruj się!</p>
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
          <div className="login-form__input-container login-form__input-container--user">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.changeInputData}
              className="login-form__input"
            />
          </div>

          <button
            type="submit"
            className="login-form__button"
            onClick={this.sendData}
          >
            Zarejestruj
          </button>
        </form>
      </div>
    );
  }
}

export default Register;
