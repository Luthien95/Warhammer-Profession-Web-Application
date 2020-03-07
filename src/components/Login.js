import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import axios from "axios";
import { useCookies } from "react-cookie";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login: "",
      password: ""
    };

    this.sendData = this.sendData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  sendData(e) {
    //const [cookies, setCookie] = useCookies(["token"]);
    //e.preventDefault();
    //e.stopPropagation();
    axios
      .post(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/users/Authenticate",
        {
          login: this.state.login,
          password: this.state.password
        }
      )
      /* .then(response => {
        setCookie("token", response.data.token, {
          path: "/",
          httpOnly: true,
          secure: true,
          sameSite: true
        });
      })*/
      .then(response => {
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token); //storing the token in localStorage.
      })
      .catch(error => console.log("Error" + error));

    e.preventDefault();
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: event.target.value
    });
  }

  render() {
    console.log(localStorage.getItem("token"));
    return (
      <form className="login-form" onSubmit={this.sendData}>
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

        <button type="submit" className="button button-block">
          Zaloguj
        </button>
      </form>
    );
  }
}
export default Login;
