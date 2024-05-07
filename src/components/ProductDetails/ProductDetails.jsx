import axios from "axios";
import React, { useContext } from "react";
import Notfound from "../Notfound/Notfound";
import { Hourglass } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Navigate, useParams } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import toast from 'react-hot-toast';

export default function ProductDetails() {

  const { id } = useParams();

  const { addProductsToCart, setNumOfCartItems } = useContext(cartContext)

  // async function addToCart(id) {
  //   let data = await addProductsToCart(id);
  //   console.log(data);
  //   if (data.status == 'success') {
  //     toast.success('Product added successfully')
  //   }
  // }

  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  async function addProductInDetails(id) {
    const data = await addProductsToCart(id);
    if (data.status === "success") {
      toast.success('Added Successfully')
    }
    setNumOfCartItems(data.numOfCartItems)
  }

  const { data, isLoading, isError } = useQuery(
    `ProductDetails-${id}`,
    getProductDetails
  );

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

  if (isError) {
    return <Navigate to='/notFound'/>
  }

  return (
    <>
      <div className="container my-5 py-3">
        <div className="row align-items-center">
          <div className="col-md-3">
            <figure>
              <img
                src={data.data.data.imageCover}
                alt={data.data.data.title}
                className="w-100"
              />
            </figure>
          </div>
          <div className="col-md-9">
            <article>
              <h1>{data.data.data.title}</h1>
              <p>{data.data.data.description}</p>
              <div className="price d-flex justify-content-between">
              {data.data.data.priceAfterDiscount ? (
                <>
                  <p>
                    <span className="text-decoration-line-through">
                      {data.data.data.price} EGP
                    </span>{" "}
                    - {data.data.data.priceAfterDiscount} EGP
                  </p>
                </>
              ) : (
                <p>{data.data.data.price} EGP</p>
              )}
              <p>
                <span>
                  <i class="fa-solid fa-star text-warning"></i>
                </span>{" "}
                {data.data.data.ratingsAverage}
              </p>
            </div>
              <button onClick={()=>{
                addProductInDetails(data.data.data.id)
              }} className="btn bg-main w-100 text-white">+ Add</button>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}
