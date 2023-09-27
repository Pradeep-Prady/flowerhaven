import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, login } from "./../../actions/userActions";
import toast from "react-hot-toast";
import MetaData from "../layouts/MetaData";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const redirect = location.search ? "/" + location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirect);
    }

    if (error) {
      dispatch(clearAuthError);
      toast.error(error, {
        position: "bottom-center",
        duration: 2000,
        style: {
          border: "1px solid white",
          background: "rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          color: "black",
        },
      });

      return;
    }
  }, [error, isAuthenticated, dispatch, navigate, redirect]);

  return (
    <>
      <MetaData title={"Login"} />

      <div className="w-full h-   text-mydark  flex items-center justify-center">
        <div className="w-11/12   sm:w-7/12 md:w-4/12">
          <form
            onSubmit={submitHandler}
            className="sm:m-10  p-5 z-0 sm:p-10 glass    rounded-lg"
          >
            <h2 className="text-center mb-5 text-xl font-bold">Login</h2>
            <div className="my-7">
              <p className="text-mydark">Email*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="">
              <p className="text-mydark">Password*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-end my-1">
              <Link
                to="/password/forgot"
                className="text-sm text-mydark cursor-pointer"
              >
                forgot password
              </Link>
            </div>
            <div className="my-7">
              <button
                type="submit"
                className="w-full border-2 py-2 border-mydark"
              >
                Login
              </button>
            </div>
            <div className="border-t-2 my-5 pt-5 border-mydark text-center">
              <Link
                to="/register"
                className="text-sm text-mydark cursor-pointer"
              >
                Don't have an account? Register here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
