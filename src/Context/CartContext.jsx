import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { authContext } from "./AuthContext";
export const cartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);

  function getUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: { token: localStorage.getItem("token") },
      })
      .then((data) => data)
      .catch((error) => error);
  }

  async function addProductsToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => data)
      .catch((error) => error);
  }

  async function deleteProduct(id) {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart/" + id, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then(({ data }) => data)
      .catch((error) => error);
  }

  async function updateCount(id, count) {
    return axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/cart/" + id,
        { count },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then(({ data }) => data)
      .catch((error) => error);
  }

  let headers = {
    token: localStorage.getItem("token"),
  };
  function checkOutSession(cartId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
        {
          shippingAddress,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((err) => err);
  }

  return (
    <cartContext.Provider
      value={{
        addProductsToCart,
        numOfCartItems,
        getUserCart,
        setNumOfCartItems,
        deleteProduct,
        updateCount,
        setCartId,
        cartId,
        checkOutSession,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}
