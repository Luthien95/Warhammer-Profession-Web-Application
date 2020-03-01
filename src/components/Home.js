import React from "react";
import Card from "./Card";
import Slider from "react-slick";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mainSlider: null,
      listSlider: null,
      professionList: []
    };

    this.sendData = this.sendData.bind(this);
  }

  componentDidMount() {
    this.setState({
      mainSlider: this.mainSlider,
      listSlider: this.listSlider,
      professionList: this.props.professionList
    });

    let slickListDiv = document.getElementsByClassName("name-list")[0];

    slickListDiv.addEventListener("wheel", event => {
      event.preventDefault();

      if (event.deltaY > 0) {
        this.listSlider.slickNext();
        this.mainSlider.slickNext();
      } else {
        this.listSlider.slickPrev();
        this.mainSlider.slickPrev();
      }
    });
  }

  sendData = event => {};

  render() {
    const { professionList } = this.state;

    var settings = {
      infinite: false,
      slidesToSrcoll: 1,
      vertical: true,
      arrows: false,
      dots: false,
      verticalSwiping: true,
      speed: 200
    };

    return (
      <div>
        <Slider
          asNavFor={this.state.listSlider}
          ref={slider => (this.mainSlider = slider)}
          slidesToShow={1}
          swipe={false}
          {...settings}
        >
          {professionList.map((item, key) => (
            <Card
              name={item.name}
              description={item.description}
              id={item.id}
              imageId={item.imageId}
              key={key}
            />
          ))}
        </Slider>
        <Slider
          asNavFor={this.state.mainSlider}
          ref={slider => (this.listSlider = slider)}
          slidesToShow={5}
          focusOnSelect={true}
          className="name-list"
          centerMode={true}
          swipeToSlide={true}
          {...settings}
        >
          {professionList.map((item, key) => (
            <li className="name-list__item" key={key}>
              <p className="name-list__header">{item.name}</p>
            </li>
          ))}
        </Slider>
      </div>
    );
  }
}

export default App;
