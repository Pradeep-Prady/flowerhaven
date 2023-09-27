import React from "react";
import Search from "./Search";

export default function Footer() {
  return (
    <div className="w-full h-auto bg-mydark mt-20  py-10">
      <h2 className="text-center text-mywhite mb-5">Flower Haven</h2>
      <Search />

      <div className="w-full text-mywhite flex items-center justify-center my-5">
        <div className="flex gap-5">
          <a
            href="https://www.linkedin.com/in/pradeep83/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:scale-110 cursor-pointer hover:text-mylight"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="https://github.com/Pradeep-Prady/flowerhaven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:scale-110 cursor-pointer hover:text-mylight"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="mailto:pradeepprady005@gmail.com"
            className="text-2xl hover:scale-110 cursor-pointer hover:text-mylight"
          >
            <i className="far fa-envelope"></i>
          </a>
        </div>
      </div>
      <div className="text-center text-mywhite text-sm">
        <p>
          &copy; {new Date().getFullYear()} Flower Haven. All rights reserved.
        </p>
        <p className="my-5 text-gray-300">Developed by Pradeep M</p>
      </div>
    </div>
  );
}
