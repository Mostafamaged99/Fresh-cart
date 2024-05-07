// import axios from "axios";
// import React, { useState } from "react";
// import { useEffect } from "react";

// export default function AllOrders() {
//   const [allOrders, setAllOrders] = useState([]);
//   function getUserOrders() {
//     const userId = localStorage.getItem("userId");
//     axios
//       .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
//       .then((res) => {
//         setAllOrders(res.data);
//         console.log(userId);
//       })
//       .catch((err) => {
//         console.log("err", err);
//       });
//   }

//   useEffect(() => {
//     getUserOrders();
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <div className="row">
//           {allOrders.map((order, idx) => {
//             <div key={idx} className="col-md-6">
//               <div className="order bg-light">
//                 <h5>Order price: {order.totalOrderPrice}</h5>
//                 <p>Delivering to: {order.shippingAddress.city}</p>
//                 <p>Phone: {order.shippingAddress.phone}</p>
//                 <p>Details: {order.shippingAddress.details}</p>
//               </div>
//             </div>;
//           })}
//         </div>
//       </div>
//     </>
//   );
//

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";

export default function AllOrders() {
  const [allOrders, setAllOrders] = useState(null);
  function getUserOrders() {
    axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${localStorage.getItem(
          "cart owner"
        )}`
      )
      .then(({ data }) => {
        setAllOrders(data);
      })
      .catch((err) => err);
  }
  useEffect(() => {
    getUserOrders();
  }, []);

  if (!allOrders) {
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
      <div className="container bg-main-light my-4">
        <h2 className="py-3 text-center">All orders</h2>
        <div className="row text-center">
          {allOrders?.map((order, key) => {
            return (
              <div key={key} className="col-md-12">
                <div className="order h-100">
                  <h5 className="text-main">
                    Payment method: {order.paymentMethodType}
                  </h5>
                  <h5 className="text-main">
                    Total order price: {order.totalOrderPrice}
                  </h5>
                  <p>This order is deliverd to: {order.shippingAddress.city}</p>
                  <p>Phone: {order.shippingAddress.phone}</p>
                  <p>Details:{order.shippingAddress.details}</p>
                  <div className="container-fluid">
                    <div className="row">
                      {order?.cartItems.map((item, idx) => {
                        return (
                          <div key={idx} className="col-md-4">
                            <div className="product p-3 h-100">
                              <img
                                className="w-100"
                                src={item.product.imageCover}
                                alt={item.product.title}
                              />
                              <h3 className="h6 text-success fw-bold pt-2">
                                {item.product.category.name}
                              </h3>
                              <h2 className="h5 text-center">
                                {item.product.title
                                  .split(" ")
                                  .slice(0, 2)
                                  .join("")}
                              </h2>
                              <p>{item.price} EGP</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <hr />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
