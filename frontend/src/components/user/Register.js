import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, register } from "./../../actions/userActions";
import { toast } from "react-hot-toast";
import MetaData from './../layouts/MetaData';

export default function Register() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.authState
  );

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(e.target.files[0]);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: [e.target.value] });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userData.name);
    formData.append("email", userData.email);
    formData.append("password", userData.password);
    formData.append("avatar", avatar);
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
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
  }, [error, isAuthenticated, dispatch, navigate]);

  return (
    <>
      <MetaData title={"Register"} />
      <div className="w-full h-auto   text-mydark   flex items-center justify-center">
        <div className="w-11/12 sm:w-8/12 md:w-4/12">
          <form
            onSubmit={submitHandler}
            className="sm:m-10 p-5 z-0 sm:p-10 glass rounded-lg"
          >
            <h2 className="text-center mb-5 text-xl font-bold">Register</h2>
            <div className="flex items-center justify-center">
              <img
                className="w-[80px] rounded-full h-[80px]"
                alt="profileImg"
                src={avatarPreview}
              />
            </div>
            <div className="mb-5">
              <p className="text-mydark">Name*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="text"
                name="name"
                onChange={onChange}
              />
            </div>
            <div className="my-5">
              <p className="text-mydark">Email*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="email"
                name="email"
                onChange={onChange}
              />
            </div>
            <div className="my-5">
              <p className="text-mydark">Password*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="password"
                name="password"
                onChange={onChange}
              />
            </div>
            <div className="my-5">
              <p className="text-mydark">Avatar</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="file"
                name="avatar"
                onChange={onChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full border-2 py-2 border-mydark"
              >
                Register
              </button>
            </div>
            <div className="border-t-2 mt-5 pt-5 border-mydark text-center">
              <Link to="/login" className="text-sm text-mydark cursor-pointer">
                Already have an account? Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
