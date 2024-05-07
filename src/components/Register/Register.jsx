import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function Register() {
  const userData = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  function validationSchema() {
    let schema = new Yup.object({
      name: Yup.string().min(3).max(8).required(),
      email: Yup.string().email("email must be in format`").required(),
      password: Yup.string().min(6).max(12).required(),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "re password doesn't match password")
        .required(),
      phone: Yup.string()
        .matches(/^01[0125][0-9]{8}$/, "phone must be an egyptian number")
        .required(),
    });
    return schema;
  }

  async function mySubmit(values) {
    setIsLoading(true);
    console.log("submitted...", values);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      console.log("success", res.data);
      setIsSuccess(true);
      setTimeout(function () {
        setIsSuccess(false);
        navigate('/login')
      }, 1000);
    } catch (error) {
      console.log("error:", error.response.data.message);
      setErrMessage(error.response.data.message);
      setTimeout(function () {
        setErrMessage(undefined);
      }, 1000);
    }
    setIsLoading(false);
  }

  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const myFormik = useFormik({
    initialValues: userData,
    onSubmit: mySubmit,
    validationSchema,
    // validate: function (values) {
    //   const errors = {};
    //   const nameRegex = /^[A-Z][a-z]{3-7}$/;
    //   const phoneRegex = /^01[0125][0-9]{8}$/;

    //   if ( nameRegex.test( values.name ) === false ) {
    //     errors.name = 'Name must be from 4 to 8 characters starts with capital letter';
    //   }
    //   if ( values.email.includes('@') !== true || values.email.includes('.') !== true ) {
    //     errors.email = 'Email must be in format';
    //   }
    //   if ( values.password.length < 6 || values.password.length > 12 ) {
    //     errors.password = 'Password must be from 6 to 12 characters';
    //   }
    //   if ( values.rePassword !== values.password ) {
    //     errors.rePassword = "Re password and password don't match"
    //   }
    //   if (phoneRegex.test(values.phone) === false) {
    //     errors.phone = 'Phone must be an egyptian number';
    //   }
    //   return errors ;
    // }
  });

  return (
    <>
      <div className=" m-auto p-5 w-75 container">
        {isSuccess ? (
          <div className="alert alert-success text-center">
            Your account has been created
          </div>
        ) : (
          ""
        )}
        {errMessage ? (
          <div className="alert alert-danger text-center">{errMessage}</div>
        ) : (
          ""
        )}
        <h2>Register Now :</h2>
        <form onSubmit={myFormik.handleSubmit}>
          <label htmlFor="name">name :</label>
          <input
            type="text"
            className="form-control mb-3"
            id="name"
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            value={myFormik.values.name}
            placeholder="name"
          />
          {myFormik.errors.name && myFormik.touched.name ? (
            <div className="alert alert-danger">{myFormik.errors.name}</div>
          ) : (
            ""
          )}

          <label htmlFor="email">email :</label>
          <input
            type="email"
            className="form-control mb-3"
            id="email"
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            value={myFormik.values.email}
            placeholder="email"
          />
          {myFormik.errors.email && myFormik.touched.email ? (
            <div className="alert alert-danger">{myFormik.errors.email}</div>
          ) : (
            ""
          )}
          <label htmlFor="phone">phone :</label>
          <input
            type="tel"
            className="form-control mb-3"
            id="phone"
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            value={myFormik.values.phone}
            placeholder="phone"
          />
          {myFormik.errors.phone && myFormik.touched.phone ? (
            <div className="alert alert-danger">{myFormik.errors.phone}</div>
          ) : (
            ""
          )}

          <label htmlFor="password">password :</label>
          <input
            type="password"
            className="form-control mb-3"
            id="password"
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            value={myFormik.values.password}
            placeholder="password"
          />
          {myFormik.errors.password && myFormik.touched.password ? (
            <div className="alert alert-danger">{myFormik.errors.password}</div>
          ) : (
            ""
          )}

          <label htmlFor="rePassword">rePassword :</label>
          <input
            type="password"
            className="form-control mb-3"
            id="rePassword"
            onChange={myFormik.handleChange}
            onBlur={myFormik.handleBlur}
            value={myFormik.values.rePassword}
            placeholder="rePassword"
          />
          {myFormik.errors.rePassword && myFormik.touched.rePassword ? (
            <div className="alert alert-danger">
              {myFormik.errors.rePassword}
            </div>
          ) : (
            ""
          )}

          <button
            disabled={!(myFormik.isValid && myFormik.dirty)}
            type="submit"
            className="btn bg-main text-white"
          >
            {isLoading ? (
              <ColorRing
                visible={true}
                height="30"
                width="30"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
