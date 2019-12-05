import React from "react";
import Cards from "./data/data.json";
import Card from "./components/Card";
import Slider from "react-slick";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
      name: null
    };

    this.handleData = this.handleData.bind(this);
    this.bla = this.bla.bind(this);
  }

  handleData = (value, name) => {
    this.setState({ isActive: value, name: name });
  };

  bla(e) {
    e.preventDefault();

    if (e.originalEvent.deltaY < 0) {
      this.slick("slickNext");
    } else {
      this.slick("slickPrev");
    }
  }

  render() {
    var settings = {
      dots: true,
      appendDots: dots => (
        <div>
          <ul className="cards-list"> {dots}</ul>
        </div>
      ),
      customPaging: i => <li key={i}>{Cards[i].Name}</li>,
      infinite: false,
      slidesToShow: 1,
      slidesToSrcoll: 1,
      speed: 1200,
      vertical: true,
      arrows: false,
      verticalSwiping: true
    };

    const slider = document.getElementsByClassName(".slick-track");

    console.log(slider);
    //slider[0].onwheel = this.bla;

    return (
      /* <div className="professy-interface">
        <h1 className="professy-interface__header">Pick professy</h1>
        {Cards.map((item, key) => (
          <Card name={item.Name} key={key} parentCallback={this.handleData} />
        ))}
        {this.state.isActive ? (
          <CardExtended
            name={this.state.name}
            parentCallback={this.handleData}
          />
        ) : null}
      </div>
      
       <CardList active="Łowca nagród" />
      */
      /* <div class="app">
        <Carousel auto axis={"y"} widgets={[CardList]}>
          {Cards.map((item, key) => (
            <Card name={item.Name} key={key} />
          ))}
        </Carousel>
      </div>*/
      <Slider {...settings}>
        {Cards.map((item, key) => (
          <Card name={item.Name} key={key} />
        ))}
      </Slider>
    );
  }
}

export default App;
