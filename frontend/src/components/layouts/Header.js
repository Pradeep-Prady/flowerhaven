import React from "react";

import Navbar from "./Navbar";

import xs1 from "../../assets/xs/1.png";
import xs2 from "../../assets/xs/2.png";
import xs3 from "../../assets/xs/3.png";
import xs4 from "../../assets/xs/4.png";
import xs5 from "../../assets/xs/5.png";

import sm1 from "../../assets/sm/1.png";
import sm2 from "../../assets/sm/2.png";
import sm3 from "../../assets/sm/3.png";
import sm4 from "../../assets/sm/4.png";
import sm5 from "../../assets/sm/5.png";

import md1 from "../../assets/md/1.png";
import md2 from "../../assets/md/2.png";
import md3 from "../../assets/md/3.png";
import md4 from "../../assets/md/4.png";
import md5 from "../../assets/md/5.png";

const banner = [
  {
    img: "banner1",
  }
]

export default function Header() {
  return (
    <div className="w-full h-screen bg-mylight ">
      
      <div>
        
      </div>
      {
        banner.map(b=> (
          <div className={` w-full h-full ${b.img}`}>

          </div>
        ))
      }


    </div>
  );
}
