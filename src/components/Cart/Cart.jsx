import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import { Hourglass } from "react-loader-spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Cart() {
  let [Loading, setLoading] = useState(true);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [allProducts, setAllProducts] = useState(null);
  const [cart, setCart] = useState(null);
  const [cartUser, setCartUser] = useState(null);

  const {
    numOfCartItems,
    getUserCart,
    setNumOfCartItems,
    deleteProduct,
    updateCount,
    setCartId,
    cartId,
  } = useContext(cartContext);

  // getItems
  async function getCartItems() {
    let { data } = await getUserCart();
    setCart(data);
    setTotalCartPrice(data?.data.totalCartPrice);
    setAllProducts(data?.data.products);
    setCartId(data?.data._id);
    setCartUser(data?.data.cartOwner);
    setNumOfCartItems(data?.numOfCartItems);
    console.log(allProducts);
    console.log(totalCartPrice);
    console.log(cartId);
    console.log(data);
    console.log(cart);
    setLoading(false);
  }

  // clearCart
  async function clearCart() {
    const res = await axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setNumOfCartItems(0);
        setTotalCartPrice(0);
        setAllProducts([]);
        return true;
      })
      .catch((err) => {
        console.log("err", err);
        return false;
      });
  }

  // deleteCart
  async function deleteItem(id) {
    let data = await deleteProduct(id);
    if (data.status == "success") {
      toast.error("Product deleted successfully");
    }
    setNumOfCartItems(data.numOfCartItems);
    setTotalCartPrice(data.data.totalCartPrice);
    setAllProducts(data.data.products);
  }

  // updateCart
  async function updateItem(id, count) {
    let data = await updateCount(id, count);
    if (data.status == "success") {
      toast.success("Product updated successfully");
    }
    setTotalCartPrice(data.data.totalCartPrice);
    setAllProducts(data.data.products);
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      {Loading ? (
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
      ) : cart ? (
        <div className="container bg-main-light my-4">
          <h2 className="pt-3">Shop Cart:</h2>
          <h5 className="text-main">Total cart price:{totalCartPrice}</h5>
          {/* <h5 className="text-main">Cart id:{cartId}</h5>
          <h5 className="text-main">Cart owner:{cartUser}</h5> */}
          {localStorage.setItem("cart owner", cartUser)}
          <h5 className="text-main">Number of cart items:{numOfCartItems}</h5>
          <button className="btn btn-outline-danger" onClick={clearCart}>
            Clear Cart
          </button>
          {allProducts?.map((product, idx) => {
            return (
              <div
                key={idx}
                className="row align-items-center py-2 border-1 border-bottom border-success "
              >
                <div className="col-md-1">
                  <figure>
                    <img
                      src={product.product.imageCover}
                      className="w-100"
                      alt={product.product.title}
                    />
                  </figure>
                </div>
                <div className="col-md-9">
                  <article>
                    <h3>{product.product.title}</h3>
                    <h5 className="text-main">price: {product.price} LE</h5>
                    <button
                      onClick={() => {
                        deleteItem(product.product._id);
                      }}
                      className="btn btn-outline-danger"
                    >
                      Remove
                    </button>
                  </article>
                </div>
                <div className="col-md-2 d-flex justify-content-between ">
                  <button
                    onClick={() => {
                      updateItem(product.product._id, product.count + 1);
                    }}
                    className="btn btn-outline-success"
                  >
                    +
                  </button>
                  <p>{product.count}</p>
                  <button
                    disabled={product.count <= 1}
                    onClick={() => {
                      updateItem(product.product._id, product.count - 1);
                    }}
                    className="btn btn-outline-success"
                  >
                    -
                  </button>
                </div>
              </div>
            );
          })}
          <Link
            to={`/address/${cartId}`}
            className="btn bg-main text-white my-3 w-100"
          >
            Place order
          </Link>
        </div>
      ) : (
        <figure className="d-flex align-items-center justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
            alt="emptyCart"
          />
        </figure>
      )}
    </>
  );
}
