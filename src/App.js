import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Select from "./components/Select";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      professionList: []
    };

    this.getData = this.getData.bind(this);
  }

  getData() {
    axios
      .get(
        "http://192.168.0.52:8020/WarhammerProfessionsApp/api/professions/",
        {
          headers: { "Content-Type": "application/json" }
        }
      )
      .then(response =>
        response.data.map(professions => ({
          description: `${professions.description}`,
          name: `${professions.name}`,
          id: `${professions.id}`,
          imageId: `${professions.imageId}`
        }))
      )
      .then(professionList => {
        this.setState({
          professionList
        });
        console.log(this.state.professionList);
      })
      .catch(error => console.log("Error" + error));

    /* this.setState({
      professionList: [
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. \r\n\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. \r\n\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. ",
          id: 1,
          imageId: null,
          name: "Akolita"
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. ",
          id: 2,
          imageId: null,
          name: "Banita"
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. \r\n\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. \r\n\r\n\r\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. ",
          id: 3,
          imageId: null,
          name: "Berserker z norski"
        },
        {
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque libero sem, maximus eu rhoncus ac, semper a lectus. Etiam rutrum nisl a faucibus feugiat. Aenean quis posuere nisl, volutpat mattis sapien. Maecenas non condimentum nulla. Etiam viverra justo sit amet erat lobortis, non viverra nisi molestie. Etiam sagittis vel mauris vel tincidunt. Pellentesque vitae arcu gravida, tristique purus sit amet, semper justo. Aliquam ac nunc sed orci rutrum fringilla quis eu diam. ",
          id: 4,
          imageId: null,
          name: "Chłop"
        }
      ]
    });*/
  }

  componentWillMount() {
    this.getData();
  }

  render() {
    const { professionList } = this.state;
    if (this.state.professionList && this.state.professionList.length > 0) {
      return (
        <Router>
          <div>
            <h2>Welcome to React Router Tutorial</h2>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <ul className="navbar-nav mr-auto">
                <li>
                  <Link to={"/"} className="nav-link">
                    {" "}
                    Home{" "}
                  </Link>
                </li>
                <li>
                  <Link to={"/select"} className="nav-link">
                    Select
                  </Link>
                </li>
              </ul>
            </nav>
            <hr />
            <Switch>
              <Route
                exact
                path="/"
                render={props => (
                  <Home {...props} professionList={this.state.professionList} />
                )}
              />
              <Route
                path="/select"
                render={props => (
                  <Select
                    {...props}
                    professionList={this.state.professionList}
                  />
                )}
              />
            </Switch>
          </div>
        </Router>
      );
    } else {
      return <p>loading</p>;
    }
  }
}

export default App;
