import React from "react";
import logo from "../../images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
import { useState } from "react";
import { useEffect } from "react";

export default function Navbar() {
  const { myToken, setToken } = useContext(authContext);
  const navigate = useNavigate();
  function logout() {
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }
  const { numOfCartItems, getUserCart, setNumOfCartItems } =
    useContext(cartContext);
  const [cartData, setCartData] = useState(null);

  async function getCartItemsNav() {
    let { data } = await getUserCart();
    setNumOfCartItems(data?.numOfCartItems);
  }
  useEffect(() => {
    getCartItemsNav();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary py-3 sticky-top">
        <div className="container">
          <NavLink className="navbar-brand" to="/home">
            <img src={logo} alt="freshCart" />
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {myToken ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/home"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/cart"
                  >
                    Cart
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/brands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link active"
                    aria-current="page"
                    to="/allOrders"
                  >
                    All orders
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              {myToken ? (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link  active position-relative"
                      aria-current="page"
                      to="/cart"
                    >
                      <i class="fa-solid fa-cart-shopping fs-3 position-relative "></i>
                      {numOfCartItems ? (
                        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                          {numOfCartItems}
                          <span class="visually-hidden">unread messages</span>
                        </span>
                      ) : (
                        ""
                      )}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <span
                      onClick={logout}
                      role="button"
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
