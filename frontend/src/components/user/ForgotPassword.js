import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword, clearAuthError } from "../../actions/userActions";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import MetaData from "./../layouts/MetaData";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.authState);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    dispatch(forgotPassword(formData));
  };

  useEffect(() => {
    if (message) {
      toast.success(message, {
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
      setEmail("");
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
    }
  }, [message, error, dispatch]);
  return (
    <>
      <MetaData title={"Forgot Password"} />
      <div className="w-full h-auto   text-mydark   flex items-center justify-center">
        <div className="w-11/12 sm:w-8/12 md:w-4/12">
          <form
            onSubmit={submitHandler}
            className="sm:m-10 p-5 z-0 sm:p-10 glass rounded-lg"
          >
            <h2 className="text-center mb-5 text-xl font-bold">
              Forgot Password
            </h2>

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

            <div>
              <button
                type="submit"
                className="w-full border-2 py-2 border-mydark"
              >
                Send Email
              </button>
            </div>
            <div className="border-t-2 mt-5 pt-5 border-mydark text-center">
              <Link to="/login" className="text-sm text-mydark cursor-pointer">
                Login here?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
