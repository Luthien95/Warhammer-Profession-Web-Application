import React from "react";
import "./../style/css/style.css";
import axios from "axios";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };

    this.sendData = this.sendData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendData() {
    axios.post(
      "http://192.168.0.52:8020/WarhammerProfessionsApp/api/users/Register",
      {
        login: this.state.login,
        password: this.state.password
      }
    );
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: event.target.value
    });

    console.log(this.state.login);
  }

  render() {
    return (
      <form action="/" method="post">
        <div class="field-wrap">
          <label>
            Login<span class="req">*</span>
          </label>
          <input
            type="text"
            autocomplete="off"
            name="login"
            value={this.state.login}
            onChange={this.handleChange}
            required
          />
        </div>

        <div class="field-wrap">
          <label>
            Password<span class="req">*</span>
          </label>
          <input
            type="password"
            autocomplete="off"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
        </div>

        <button
          type="submit"
          class="button button-block"
          onClick={this.sendData}
        >
          Get Started
        </button>
      </form>
    );
  }
}
export default Register;
