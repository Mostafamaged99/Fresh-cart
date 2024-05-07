import axios from "axios";
import React from "react";
import { Hourglass } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Categories() {
  function getCategories() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  const { data, isLoading } = useQuery("getCategories", getCategories);

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
    <>
      <div className="container">
        <div className="row">
          {data.data.data.map((category) => {
            return <div key={category._id} className="col-md-4">
              <div className="product my-3 border rounded-3">
                <img
                  src={category.image}
                  className="w-100"
                  style={ {height : '300px'} }
                  alt={category.name}
                />
                <h3 className="text-center py-3 text-success fw-bold">{category.name}</h3>
              </div>
            </div>;
          })}
        </div>
      </div>
    </>
  );
}
