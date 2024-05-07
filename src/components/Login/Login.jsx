import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../Context/AuthContext";

export default function Login() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [errMessage, setErrMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(authContext);

  const userData = {
    email: "",
    password: "",
  };

  function validationSchema() {
    let schema = new Yup.object({
      email: Yup.string().email("email must be in format`").required(),
      password: Yup.string().min(6).max(12).required(),
    });
    return schema;
  }

  async function mySubmit(values) {
    setIsLoading(true);
    console.log("submitted...", values);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      setIsSuccess(true);
      setTimeout(function () {
        setIsSuccess(false);
        navigate("/home");
      }, 2000);
    } catch (error) {
      console.log("error:", error.response.data.message);
      setErrMessage(error.response.data.message);
      setTimeout(function () {
        setErrMessage(undefined);
      }, 2000);
    }
    setIsLoading(false);
  }

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
          <div className="alert alert-success text-center">Hello!</div>
        ) : (
          ""
        )}
        {errMessage ? (
          <div className="alert alert-danger text-center">{errMessage}</div>
        ) : (
          ""
        )}
        <h2>Login Now :</h2>
        <form onSubmit={myFormik.handleSubmit}>
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
              "Login"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
