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
      name: null,
      lastScroll: 0,
      currentId: 0,
      index: 0
    };

    this.handleShow = this.handleShow.bind(this);
    this.handleData = this.handleData.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }

  handleData = (value, name) => {
    this.setState({ isActive: value, name: name });
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(e) {
    var element = document.getElementsByClassName("cards-list")[0];

    if (this.state.lastScroll == undefined) {
      this.state = {
        lastScroll: element.scrollTop
      };
    } else if (element.scrollTop > this.state.lastScroll) {
      // downscroll rules will be here
      this.state = {
        lastScroll: element.scrollTop
      };
      /*   this.setState(prevState => {
        return {currentId: prevState.currentId + 1}
     })
      this.scrollTo(this.state.currentId + 1);*/
      // console.log("dfsf");
      element.scrollTo(0, this.myRef);
      console.log(this.myRef);
    } else if (element.scrollTop < this.state.lastScroll) {
      this.state = {
        lastScroll: element.scrollTop
      };

      /*   this.setState(prevState => {
        return {currentId: prevState.currentId - 1}
     })
      console.log("fdfdf");
      this.scrollTo(this.state.currentId - 1);*/
      this.handleShow(10);
    }
  }

  handleShow(i) {
    this.setState({ index: i });
    // console.log(i);
    // console.log(this.refs[i]);
    // this.refs[i].scrollIntoView({ block: "end", behavior: "smooth" });
  }

  scrollTo(id) {
    this.itemRefs[id].scrollIntoView();
  }

  render() {
    var settings = {
      dots: true,
      appendDots: dots => (
        <div>
          <ul className="cards-list" onScroll={this.handleScroll}>
            {" "}
            {dots}
          </ul>
        </div>
      ),
      customPaging: (
        i //i moze byc inne niz mysle!!! sprawdzic!!!
      ) => (
        <li key={i} ref={i => (this.myRef = i)}>
          {Cards[i].Name + i}
        </li>
      ),
      infinite: false,
      slidesToShow: 1,
      slidesToSrcoll: 1,
      speed: 1200,
      vertical: true,
      arrows: false,
      verticalSwiping: true
    };

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
