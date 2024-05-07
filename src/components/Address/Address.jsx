import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";

export default function Address() {
  const { checkOutSession } = useContext(cartContext);
  let { cartId } = useParams();

  async function checkOut(values) {
    let { data } = await checkOutSession(cartId, values);
    console.log(data);
    if (data.status == "success") {
      window.location.href = data.session.url;
    }
  }

  const myFormik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: checkOut,
  });

  return (
    <>
      <div className=" m-auto p-5 w-75 container">
        <h2>Adress :</h2>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="details">details :</label>
          <textarea
            type="text"
            className="form-control mb-3"
            id="details"
            onChange={myFormik.handleChange}
            placeholder="details"
          ></textarea>

          <label htmlFor="phone">phone :</label>
          <input
            type="text"
            className="form-control mb-3"
            id="phone"
            onChange={myFormik.handleChange}
            placeholder="phone"
          />

          <label htmlFor="city">city :</label>
          <input
            type="text"
            className="form-control mb-3"
            id="city"
            onChange={myFormik.handleChange}
            placeholder="city"
          />

          <button
            disabled={!(myFormik.isValid && myFormik.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
            Check out
          </button>
        </form>
      </div>
    </>
  );
}
