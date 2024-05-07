import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HomeSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="container my-3 ">
      <div className="row">
        <div className="col-md-9 ">
          <Slider {...settings}>
            <div>
              <img
                className="w-100"
                style={{ height: "300px" }}
                src={require("../../images/slider-image-1.jpeg")}
                alt="slider1"
              />
            </div>
            <div>
              <img
                className="w-100"
                style={{ height: "300px" }}
                src={require("../../images/slider-image-2.jpeg")}
                alt="slider2"
              />
            </div>
            <div>
              <img
                className="w-100"
                style={{ height: "300px" }}
                src={require("../../images/slider-image-3.jpeg")}
                alt="slider3"
              />
            </div>
            <div>
              <img
                className="w-100"
                style={{ height: "300px" }}
                src={require("../../images/slider-2.jpeg")}
                alt="slider4"
              />
            </div>
          </Slider>
        </div>
        <div className="col-md-3">
            <div>
              <img
                className="w-100"
                style={{ height: "150px" }}
                src={require("../../images/grocery-banner-2.jpeg")}
                alt="slider1"
              />
            </div>
            <div>
              <img
                className="w-100"
                style={{ height: "150px" }}
                src={require("../../images/grocery-banner.png")}
                alt="slider1"
              />
            </div>

        </div>
      </div>
    </div>
  );
}

export default HomeSlider;
