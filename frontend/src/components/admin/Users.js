import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../actions/userActions";
import { clearError } from "../../slices/productSlice";
import { clearUserDeleted } from "../../slices/userSlice";
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";

export default function Users() {
  const {
    users = [],
    loading = true,
    error,
    isUserDeleted,
  } = useSelector((state) => state.userState);

  const dispatch = useDispatch();

  const deleteHandler = (e, id) => {
    e.target.disabled = true;
    dispatch(deleteUser(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearError());

      return;
    }
    if (isUserDeleted) {
      dispatch(clearUserDeleted());

      return;
    }

    dispatch(getUsers);
  }, [dispatch, error, isUserDeleted]);
  return (
    <div className="w-full  sm:flex">
      <div className="sm:w-1/5 ">
        <Sidebar />
      </div>

      <div className="sm:w-4/5 ">
        <h2 className="text-center my-5">User Orders</h2>
        <div className="grid grid-cols-1  md:grid-cols-2 p-5">
          {users &&
            users.map((user) => (
              <div className="glass text-center p-1 my-2 sm:p-5 sm:m-5" key={user._id}>
                <div className="flex items-center justify-between">
                  <p>Id </p>
                  <p>{user._id}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Name</p>
                  <p>{user.name}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Email</p>
                  <p>{user.email}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p>Role</p>
                  <p>{user.role}</p>
                </div>
                <div className="flex my-3 items-center justify-between">
                  <Link className="btn" to={`/admin/user/${user._id}`}>
                    <i className="fa fa-pencil"></i> Edit User
                  </Link>
                  <button
                    className="btn"
                    onClick={(e) => deleteHandler(e, user._id)}
                  >
                    <i className="fa fa-trash mr-2"></i>
                    Delete User
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
