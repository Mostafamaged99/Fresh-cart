import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "../Product/Product";
import { Bars, Hourglass } from "react-loader-spinner";
import { useQuery } from "react-query";
export default function Products() {

  async function getAllProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery("getAllProducts", getAllProducts);

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
      <div className="container my-5">
        <div className="row">
          {data?.data.data.map((product) => {
            return <Product product={product} key={product._id} />;
          })}
        </div>
      </div>
    </>
  );
}
