import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePassword as updatePasswordAction,
  clearAuthError,
} from "../../actions/userActions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import MetaData from "../layouts/MetaData";

export default function UpdatePassword() {
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const dispatch = useDispatch();
  const { isUpdated, error } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("password", password);
    dispatch(updatePasswordAction(formData));
  };

  useEffect(() => {
    if (isUpdated) {
      toast.success(`Password Updated Successfully`, {
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
      setOldPassword("");
      setPassword("");
      return;
    }
    if (error) {
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
      dispatch(clearAuthError);
      return;
    }
  }, [isUpdated, error, dispatch]);

  return (
    <>
      <MetaData title={"Update Password"} />

      <div className="w-full h-auto   text-mydark   flex items-center justify-center">
        <div className="w-11/12 sm:w-8/12 md:w-4/12">
          <form
            onSubmit={submitHandler}
            className="sm:m-10 p-5 z-0 sm:p-10 glass rounded-lg"
          >
            <h2 className="text-center mb-5 text-xl font-bold">Register</h2>

            <div className="my-5">
              <p className="text-mydark">Old Password*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="password"
                name="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <p className="text-mydark">New Password*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full border-2 py-2 border-mydark"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
