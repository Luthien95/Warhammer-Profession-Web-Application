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
      <div
        className={
          this.state.active
            ? "card-interface card-interface--active"
            : "card-interface"
        }
      >
        <div className="card-interface__image-field">
          <div className="header-icons">
            <i
              className={
                this.state.active
                  ? "fas fa-times header-icons__icon"
                  : "fas fa-angle-double-right header-icons__icon"
              }
              onClick={this.changeState}
            ></i>
          </div>
          <div
            className="basic-data"
            ref={descriptionElement =>
              (this.descriptionElement = descriptionElement)
            }
          >
            <div
              className="basic-data__header"
              ref={headerElement => (this.headerElement = headerElement)}
            >
              <span className="basic-data__profession-type">
                Profesja podstawowa
              </span>
              <h1 className="basic-data__profession-name">Akolita</h1>

              <p>{this.state.headerHeight}px</p>
            </div>
            <div className="basic-data__content">
              <p className="basic-data__description">
                W hierarchii wartości mieszkańców Starego Świata religia spadła
                na drugie miejsce, ustępując bogactwu, ale wciąż jeszcze wielu
                młodych ludzi obojga płci znajduje w sobie powołanie do służby
                bożej.
              </p>
              <a href="#" className="basic-data__button">
                Read more
              </a>
            </div>
          </div>
        </div>
        <div
          className={
            this.state.active
              ? "card-interface__description card-interface__description--active"
              : "card-interface__description"
          }
        >
          <p className="full-description">
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
