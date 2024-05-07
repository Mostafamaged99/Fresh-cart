import React from "react";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Products from "./components/Products/Products";
import Notfound from "./components/Notfound/Notfound";
import Home from "./components/Home/Home";
import Cart from "./components/Cart/Cart";
import Address from "./components/Address/Address";
import Wishlist from "./components/Wishlist/Wishlist";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { ToastContainer } from "react-toastify";
import AllOrders from "./components/AllOrders/AllOrders";

export default function App() {
  const myRouter = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "register", element: <Register /> },
        { path: "home", element: <Home /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              {" "}
              <Cart />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              {" "}
              <Wishlist />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              {" "}
              <Categories />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "brands",
          element: (
            <ProtectedRoute>
              {" "}
              <Brands />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "ProductDetails/:id",
          element: (
            <ProtectedRoute>
              {" "}
              <ProductDetails />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "address/:cartId",
          element: (
            <ProtectedRoute>
              {" "}
              <Address />{" "}
            </ProtectedRoute>
          ),
        },
        {
          path: "allOrders",
          element: (
            <ProtectedRoute>
              {" "}
              <AllOrders />{" "}
            </ProtectedRoute>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "products", element: <Products /> },
        { path: "*", element: <Notfound /> },
        { path: "notFound", element: <Notfound /> },
      ],
    },
  ]);

  const myClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={myClient}>
        <AuthContextProvider>
          <CartContextProvider>
            <RouterProvider router={myRouter} />
          </CartContextProvider>
        </AuthContextProvider>
      </QueryClientProvider>
      <ToastContainer theme="colored" />
    </>
  );
}
