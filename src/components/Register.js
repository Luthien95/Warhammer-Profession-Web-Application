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
    this.handleChange = this.handleChange.bind(this);
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

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value,
    });
  }

  render() {
    return (
      <form method="post" className="login-form">
        <input
          type="text"
          name="login"
          placeholder="Login"
          value={this.state.login}
          onChange={this.handleChange}
          required
          className="login-form__input"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
          className="login-form__input"
        />

        <button
          type="submit"
          className="login-form__button"
          onClick={this.sendData}
        >
          Get Started
        </button>
      </form>
    );
  }
}
export default Register;
