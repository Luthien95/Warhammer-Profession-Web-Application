import React from "react";
import Cards from "./data/data.json";
import Card from "./components/Card";
import Slider from "react-slick";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });

    let slickListDiv = document.getElementsByClassName("name-list")[0];

    slickListDiv.addEventListener("wheel", event => {
      event.preventDefault();

      if (event.deltaY > 0) {
        this.slider2.slickNext();
        this.slider1.slickNext();
      } else {
        this.slider2.slickPrev();
        this.slider1.slickPrev();
      }
    });
  }

  render() {
    var settings = {
      infinite: false,
      slidesToSrcoll: 1,
      vertical: true,
      arrows: false,
      dots: false,
      verticalSwiping: true
    };

    return (
      <div>
        <Slider
          asNavFor={this.state.nav2}
          ref={slider => (this.slider1 = slider)}
          slidesToShow={1}
          fade={true}
          className="profession-list"
          swipe={false}
          speed={100}
          {...settings}
        >
          {Cards.map((item, key) => (
            <Card name={item.Name} key={key} />
          ))}
        </Slider>
        <Slider
          asNavFor={this.state.nav1}
          ref={slider => (this.slider2 = slider)}
          slidesToShow={5}
          focusOnSelect={true}
          className="name-list"
          centerMode={true}
          swipeToSlide={true}
          speed={100}
          {...settings}
        >
          {Cards.map((item, key) => (
            <li className="name-list__item" key={key}>
              <p className="name-list__header">{item.Name}</p>
            </li>
          ))}
        </Slider>
      </div>
    );
  }
}

export default App;
