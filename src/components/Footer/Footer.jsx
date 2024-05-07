import React from "react";

export default function Footer() {
  return (
    <div>
      <section className=" py-3 bg-body-tertiary ">
        <div className="footerContent container">
          <h2>Get the FreshCart app</h2>
          <span>
            we will send your link, open it on your phone to download the app.
          </span>
          <div className="row container my-3">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control "
                placeholder="Email..."
              />
            </div>
            <div className="col-md-3">
              <button className="btn bg-main text-white">Share App Link</button>
            </div>
          </div>
          <hr />
          <div className="footerOfFooter py-3 d-flex justify-content-between ">
            <div className="payment d-flex ">
              <h4>Payment Partners</h4>
              <ul className="list-unstyled d-flex pt-1">
                <li>
                  <a href="/">
                    <i class="fa-brands fa-amazon-pay fs-4 px-2"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i class="fa-brands fa-cc-mastercard fs-4 px-2"></i>
                  </a>
                </li>
                <li>
                  <a href="/">
                    <i class="fa-brands fa-cc-paypal fs-4 px-2"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="footerApp d-flex ">
              <h4>Get deliveries with FreshCart</h4>
              <i class="fa-brands fa-apple px-2 fs-3"></i>
              <i class="fa-brands fa-google-play px-2 fs-3"></i>
            </div>
          </div>
          <hr />
        </div>
      </section>
    </div>
  );
}
