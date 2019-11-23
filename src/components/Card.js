import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      transition: 0,
      active: false
    };

    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    this.state = {
      transition:
        this.descriptionElement.clientHeight - this.headerElement.clientHeight
    };

    this.descriptionElement.style.setProperty(
      "--element-height",
      this.state.transition + "px"
    );
  }

  changeState() {
    this.setState(prevState => ({
      active: !prevState.active
    }));

    document.getElementsByTagName("body")[0].classList.toggle("active");
  }

  render() {
    return (
      <div className={this.state.active ? "card card--active" : "card"}>
        <div className="wrapper">
          <div className="header">
            <i
              className={
                this.state.active
                  ? "fas fa-times header__icon"
                  : "fas fa-angle-double-right header__icon"
              }
              onClick={this.changeState}
            ></i>
          </div>
          <div
            className="data"
            ref={descriptionElement =>
              (this.descriptionElement = descriptionElement)
            }
          >
            <div
              className="header2"
              ref={headerElement => (this.headerElement = headerElement)}
            >
              <span className="author">Profesja podstawowa</span>
              <h1 className="title">
                <a href="#">Akolita</a>
              </h1>

              <p>{this.state.headerHeight}px</p>
            </div>
            <div className="content">
              <p className="text">
                W hierarchii wartości mieszkańców Starego Świata religia spadła
                na drugie miejsce, ustępując bogactwu, ale wciąż jeszcze wielu
                młodych ludzi obojga płci znajduje w sobie powołanie do służby
                bożej.
              </p>
              <a href="#" className="button">
                Read more
              </a>
            </div>
          </div>
        </div>
        <div className={this.state.active ? "rest rest--active" : "rest"}>
          <p className="text">
            W hierarchii wartości mieszkańców Starego Świata religia spadła na
            drugie miejsce, ustępując bogactwu, ale wciąż jeszcze wielu młodych
            ludzi obojga płci znajduje w sobie powołanie do służby bożej.
          </p>
        </div>
      </div>
    );
  }
}
export default Card;
