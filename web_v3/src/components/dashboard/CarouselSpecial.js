import React, { Component } from "react";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";

class CarouselSpecial extends Component {
  componentDidMount() {
    const options = {
      fullWidth: true,
      indicators: true
    };
    M.Carousel.init(this.Carousel, options);
  }

  render() {
    return (
      <div
        ref={Carousel => {
          this.Carousel = Carousel;
        }}
        className="carousel carousel-slider center" style={{marginTop:15, marginBottom: 15}}
      >
        {/* <div className="carousel-fixed-item center">
          <a className="btn waves-effect white grey-text darken-text-2">
            button
          </a>
        </div> */}
        <div className="carousel-item red-text" href="#one!">
            <img src="https://due.udn.vn/Portals/0/Banner%20Truong/website2.jpg" alt="a"/>
            {/* <h2>First Panel</h2>
            <p className="white-text">This is your first panel</p> */}
          
        </div>
        <div className="carousel-item red-text" href="#two!">
            <img src="https://due.udn.vn/Portals/0/Banner%20Truong/MICAbanner_2501.png" alt="a"/>
            {/* <h2>Second Panel</h2>
            <p className="white-text">This is your second panel</p> */}
        </div>
        <div className="carousel-item red-text" href="#three!">
            <img src="https://due.udn.vn/Portals/0/Banner%20Truong/banner_datchuan_clgd.jpg" alt="a"/>
            {/* <h2>Third Panel</h2>
            <p className="white-text">This is your third panel</p> */}
        </div>
        <div className="carousel-item red-text" href="#four!">
            <img src="https://due.udn.vn/Portals/0/Banner%20Truong/tssdh.jpg" alt="a"/>
            {/* <h2>Fourth Panel</h2>
            <p className="white-text">This is your fourth panel</p> */}
        </div>
      </div>
    );
  }
}

export default CarouselSpecial;
