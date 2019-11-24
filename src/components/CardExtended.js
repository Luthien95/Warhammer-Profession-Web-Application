import React from "react";
import "./../style/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

class CardExtended extends React.Component {
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
    this.setState(prevState => ({ active: false }), function() {
      this.props.parentCallback(this.state.active);
    });
  }

  render() {
    return (
      <div className="card-interface card-interface--active">
        <div className="card-interface__image-field">
          <div className="header-icons">
            <i
              className="fas fa-times header-icons__icon"
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
              <h1 className="basic-data__profession-name">{this.props.name}</h1>

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
        <div className="card-interface__description card-interface__description--active">
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
export default CardExtended;
