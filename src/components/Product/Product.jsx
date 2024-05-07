import React, { useContext } from "react";
import {toast}  from 'react-toastify';
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";

export default function Product({ product }) {
  const { addProductsToCart,setNumOfCartItems } = useContext(cartContext);

  async function addToCart(id) {
    let data = await addProductsToCart(id);
    if (data.status == 'success') {
      toast.success('Product added successfully')
    }
    setNumOfCartItems(data.numOfCartItems)
  }

  return (
    <>
      <div className="col-md-3">
        <div className="product p-3">
          <Link to={`/ProductDetails/${product._id}`}>
            <img
              src={product.imageCover}
              className="w-100"
              alt={product.title}
            />
            <h3 className="h6 text-success fw-bold pt-2">
              {product.category.name}
            </h3>
            <h2 className="h5 text-center">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </h2>
            <div className="price d-flex justify-content-between">
              {product.priceAfterDiscount ? (
                <>
                  <p>
                    <span className="text-decoration-line-through">
                      {product.price} EGP
                    </span>{" "}
                    - {product.priceAfterDiscount} EGP
                  </p>
                </>
              ) : (
                <p>{product.price} EGP</p>
              )}
              <p>
                <span>
                  <i class="fa-solid fa-star text-warning"></i>
                </span>{" "}
                {product.ratingsAverage}
              </p>
            </div>
          </Link>
          <button
            onClick={() => {
              addToCart(product._id);
            }}
            className="btn bg-main w-100 text-white"
          >
            + Add
          </button>
        </div>
      </div>
    </>
  );
}
