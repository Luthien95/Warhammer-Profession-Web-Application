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

    //this.changeState = this.changeState.bind(this);
  }
  /*
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
    this.setState(prevState => ({ active: true }), function() {
      this.props.parentCallback(this.state.active, this.props.name);
    });
  }
*/
  render() {
    return (
      <div className="card-interface">
        <div className="container">
          <h1>{this.props.name}</h1>
          <p>
            {" "}
            W hierarchii wartości mieszkańców Starego Świata religia spadła na
            drugie miejsce, ustępując bogactwu, ale wciąż jeszcze wielu młodych
            ludzi obojga płci znajduje w sobie powołanie do służby bożej.
          </p>
          <button>czytaj więcej</button>
        </div>
      </div>
    );
  }
}
export default Card;

/*
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
    this.setState(prevState => ({ active: true }), function() {
      this.props.parentCallback(this.state.active, this.props.name);
    });
  }

  render() {
    return (
      <div className="card-interface">
        <div className="card-interface__image-field">
          <div className="header-icons">
            <i
              className="fas fa-angle-double-right header-icons__icon"
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
      </div>
    );
  }
}
export default Card;*/

/*
.card-interface 
    float: left
    margin: 40px 20px 20px 20px
    display: flex
    .menu-content 
        margin: 0
        padding: 0
        list-style-type: none
        li 
            display: inline-block
        a 
            color: white
            span 
            position: absolute
            left: 50%
            top: 0
            font-size: 10px
            font-weight: 700
            font-family: 'Open Sans'
            transform: translate(-50%, 0)
    &__image-field
        background-color: white
        width: 250px
        min-height: 350px
        position: relative
        overflow: hidden
        box-shadow: 0 19px 38px rgba(black, 0.3), 0 15px 12px rgba(black, 0.2)
        background-image: url('https://4.bp.blogspot.com/-j-tskMcBdKk/WaQ1lCLUDQI/AAAAAAAAK9Q/6kP9M98nI64m6m9cjfpRDLnus181ZPEGQCKgBGAs/s1600/nurgle.png');
        background-size: cover
        &:before
            content: ""
            display: block
            position: absolute
            top: 0
            bottom: 0
            left: 0
            right: 0
            background: rgb(3,1,32)
            background: radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 62%, rgba(0,0,0,0.9) 100%)
            transition: background .3s linear
        &:hover 
            .basic-data 
                transform: translateY(0)
        .header-icons
            position: absolute
            top: 0
            left: 0
            width: 100%
            display: flex
            justify-content: flex-end
            &__icon
                color: white
                font-size: 26px
                padding: 20px
                &:hover
                    cursor: pointer
    .basic-data 
        position: absolute
        margin: 0 20px
        bottom: 20px
        width: 100%
        transform: translateY(calc(var(--element-height) + .5em))
        transition: transform 0.3s
        width: calc(100% - 40px)
        &__profession-type,
        &__profession-name
            color: white
            text-decoration: none
        &__profession-type
            font-size: 12px
        &__profession-name
            margin: 10px 0 20px 0
        &__content 
            position: relative
            z-index: 1
            font-size: 14px
        &__description
            color: white
            font-weight: 200
            margin-bottom: 20px
        &__button
            color: white
            text-decoration: none
            text-transform: uppercase
            font-weight: 600
    &__description
        width: 0
        background: black
        color: white
        transition: width 1s
        transition-delay: 1s
        .full-description
            opacity: 0
            transition: opacity 1s
        &--active
            width: calc(100% - 350px)
            transition: width 1s
            .full-description
                opacity: 1
                transition: opacity 1s
                transition-delay: 1s
    &--active
        position: fixed
        z-index: 10
        margin: 0
        width: 90%
        height: 90%
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)
        .card-interface__image-field
            width: 400px
            .basic-data  
                transform: translateY(0)
        .card-interface__description--active
            width: calc(100% - 400px)

.professy-interface
    width: 80vw
    display: flex
    justify-content: space-around
    flex-wrap: wrap
    &__header
        width: 80%
        margin: 30px 10%
        padding-bottom: 10px
        border-bottom: 1px solid rgba(255,255,255,0.3)
        text-align: center
        text-transform: uppercase
        color: white

        */
