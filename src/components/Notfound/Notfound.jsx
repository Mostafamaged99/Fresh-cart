import React from "react";
import errorImg from "../../images/error.svg";
export default function Notfound() {
  return (
    <>
      <div className="errorImg d-flex  align-items-center justify-content-center my-5 py-5">
        <img src={errorImg} alt="notFound" />
      </div>
    </>
  );
}
