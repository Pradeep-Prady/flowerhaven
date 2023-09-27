import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { getUser, updateUser } from "../../actions/userActions";
import { clearUserUpdated } from "../../slices/userSlice";
import { clearError } from "../../slices/productSlice";
import toast from "react-hot-toast";

export default function UpdateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const { id: userId } = useParams();

  const { loading, isUserUpdated, error, user } = useSelector(
    (state) => state.userState
  );
  const { user: authUser } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("role", role);
    dispatch(updateUser(userId, formData));
  };
  useEffect(() => {
    if (isUserUpdated) {
      toast.success(`User Updated Succesfully!`, {
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
      dispatch(clearUserUpdated());

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
      dispatch(clearError());
      return;
    }

    dispatch(getUser(userId));
  }, [isUserUpdated, error, userId, dispatch]);

  useEffect(() => {
    if (user._id) {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);
  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>
      <div className="w-full flex items-center justify-center ">
        <div className="w-full sm:w-4/5 md:w-2/5 glass my-5">
          <h2 className="text-center my-5">Update User</h2>
          <div>
            <div className="bg-mywhite p-3 m-2 my-3">
              <p>Name</p>
              <input
                type="text"
                className="w-full outline-none py-3 my-2 px-2"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div className="bg-mywhite p-3 m-2 my-3">
              <p>Email</p>
              <input
                type="text"
                className="w-full outline-none py-3 my-2 px-2"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="bg-mywhite p-3 m-2 my-3">
              <p>Role</p>

              <select
                className="w-full outline-none py-3 my-2 px-2"
                disabled={user._id === authUser._id}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <div className="bg-mywhite p-3 m-2 my-3">
              <button
                type="submit"
                onClick={submitHandler}
                className="w-full outline-none btn my-2 px-2"
                value=""
              >
                Upadte
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
