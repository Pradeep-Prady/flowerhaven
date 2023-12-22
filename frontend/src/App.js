import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Toaster } from "react-hot-toast";
import { HelmetProvider } from "react-helmet-async";

import Home from "./components/Home";
import Navbar from "./components/layouts/Navbar";
import Login from "./components/user/Login";
import Header from "./components/layouts/Header";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import { useEffect, useState } from "react";
import store from "./store";
import { loadUser } from "./actions/userActions";
import ProductSearch from "./components/product/ProductSearch";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ProductDetail from "./components/product/ProductDetail";
import Star from "./components/product/Star";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import OrderSuccess from "./components/cart/OrderSuccess";
import Payment from "./components/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/route/ProtectedRoute";
import UserOrders from "./components/order/UserOrders";
import OrderDetails from "./components/order/OrderDetails";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Dashboard from "./components/admin/Dashboard";
import AllProducts from "./components/admin/AllProducts";
import UpdateProduct from "./components/admin/UpdateProduct";
import CreateProduct from "./components/admin/CreateProduct";
import Orders from "./components/admin/Orders";
import UpdateOrder from "./components/admin/UpdateOrder";
import Users from "./components/admin/Users";
import UpdateUser from "./components/admin/UpdateUser";
import Reviews from "./components/admin/Reviews";
import Footer from "./components/layouts/Footer";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser);
    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <>
      <Router>
        <div>
          <HelmetProvider>
            <Toaster />
            <Navbar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/update" element={<UpdateProfile />} />
              <Route
                path="/profile/update/password"
                element={<UpdatePassword />}
              />
              <Route path="/password/forgot" element={<ForgotPassword />} />

              <Route
                path="/password/reset/:token"
                element={<ResetPassword />}
              />
              <Route path="/search/:keyword" element={<ProductSearch />} />

              <Route path="/product/:id" element={<ProductDetail />} />

              <Route path="/cart" element={<Cart />} />

              <Route
                path="/shipping"
                element={
                  <ProtectedRoute>
                    <Shipping />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/confirm"
                element={
                  <ProtectedRoute>
                    <ConfirmOrder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <UserOrders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order/:id"
                element={
                  <ProtectedRoute>
                    <OrderDetails />
                  </ProtectedRoute>
                }
              />

              {stripeApiKey && (
                <Route
                  path="/payment"
                  element={
                    <ProtectedRoute>
                      <Elements stripe={loadStripe(stripeApiKey)}>
                        <Payment />
                      </Elements>
                    </ProtectedRoute>
                  }
                />
              )}
            </Routes>

            <Routes>
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <AllProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/products/create"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <CreateProduct />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/product/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateProduct />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/orders"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Orders />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/order/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateOrder />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/user/:id"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <UpdateUser />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reviews"
                element={
                  <ProtectedRoute isAdmin={true}>
                    <Reviews />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </HelmetProvider>
        </div>
      </Router>
    </>
  );
}

export default App;
