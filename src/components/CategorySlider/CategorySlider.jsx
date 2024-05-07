import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Hourglass } from "react-loader-spinner";

function CategorySlider() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }
  const { data, isLoading } = useQuery("getCategories", getCategories);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    autoplaySpeed: 2000,
    autoplay: true,
  };

  if (isLoading) {
    return (
      <div className="d-flex vh-100 bg-success bg-opacity-50 justify-content-center align-items-center">
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#fff", "#fff"]}
        />
      </div>
    );
  }

  return (
    <div className=" pt-3">
        <h2 className="mb-3 text-success fw-bold">Shop popular Categories</h2>
      <Slider {...settings}>
        { data.data.data.map( ( category )=>{
           return <div className="" key={category._id}>
                <img className="w-100" style={ {height : '300px'} } src={category.image} alt={category.name} />
                <h4>{category.name}</h4>
            </div>
        } ) }
      </Slider>
    </div>
  );
}

export default CategorySlider;
