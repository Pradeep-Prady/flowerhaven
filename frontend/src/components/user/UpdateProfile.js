import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updateProfile } from "../../actions/userActions";
import { clearUpdateProfile } from "../../slices/authSlice";
import profile from "../../assets/account.jpg";
import toast from "react-hot-toast";
import MetaData from "../layouts/MetaData";

export default function UpdateProfile() {
  const { error, user, isUpdated } = useSelector((state) => state.authState);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(profile);

  const dispatch = useDispatch();

  const onChangeAvatar = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(e.target.files[0]);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("avatar", avatar);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }

    if (isUpdated) {
      toast.success(`Profile Updated Successfully`, {
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
      dispatch(clearUpdateProfile());

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
  }, [user, isUpdated, error, dispatch]);

  return (
    <>
      <MetaData title={"Update Profile"} />

      <div className="w-full h-auto   text-mydark   flex items-center justify-center">
        <div className="w-11/12 sm:w-8/12 md:w-4/12">
          <form
            onSubmit={submitHandler}
            className="sm:m-10 p-5 z-0 sm:p-10 glass rounded-lg"
          >
            <h2 className="text-center mb-5 text-xl font-bold">Update</h2>
            <div className="flex items-center justify-center">
              <img
                className="w-[60px] rounded-full h-[60px]"
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
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="my-5">
              <p className="text-mydark">Email*</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="my-5">
              <p className="text-mydark">Avatar</p>
              <input
                className="outline-none w-full py-1 bg-transparent border-b-2 border-mydark"
                type="file"
                name="avatar"
                onChange={onChangeAvatar}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full border-2 py-2 border-mydark"
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
