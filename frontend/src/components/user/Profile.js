import React, { useEffect } from "react";
import profile from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "./../layouts/MetaData";

export default function Profile() {
  const { user } = useSelector((state) => state.authState);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout);
    navigate("/");
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, dispatch, navigate]);

  return (
    <>
      <MetaData title={"Profile"} />

      <div className="w-full h-auto  text-sm sm:text-base  flex items-center justify-center">
        <div className="w-full sm:w-7/12  md:w-4/12 bg-myligh px-2 py-5 sm:p-10 rounded-md ">
          <div className=" flex items-center justify-center">
            <img
              className="w-[150px] h-[150px] sm:w-[160px] sm:h-[160px] rounded-full "
              alt="profileImg"
              src={user?.avatar ?? profile}
            />
          </div>
          <div className="text-center mt-5 w-full">
            <p className=""> {user?.name}</p>
            <p className="my-3"> {user?.email}</p>

            <div className="flex items-center my-5 justify-between">
              <Link to="/profile/update" className="btn">
                Edit Profile
              </Link>
              <Link to="/profile/update/password" className="btn">
                Change Key
              </Link>
            </div>
          </div>
          <div className="w-full flex items-center justify-evenly ">
            <Link to="/orders" className="btn">
              My Orders
            </Link>
            <button
              onClick={logoutHandler}
              className="bg-mydark cursor-pointer px-3 py-1 rounded-md text-mywhite"
            >
              Lock
            </button>
          </div>
          <div className="w-full my-5 flex items-center justify-evenly ">
            <Link to="/admin/dashboard" className="btn">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
