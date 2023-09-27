import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
// import "swiper/css/swiper.css"; // Import the core Swiper CSS

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

export default function Header() {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    // Update the screen size when the window is resized
    window.addEventListener("resize", handleResize);
    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Function to determine the screen size
  function getScreenSize() {
    if (window.innerWidth < 576) {
      return "xs";
    } else if (window.innerWidth < 992) {
      return "sm";
    } else {
      return "md";
    }
  }

  // Event handler for screen size changes
  function handleResize() {
    setScreenSize(getScreenSize());
  }

  // Define an object mapping screen sizes to image sources
  const imageSources = {
    xs: [xs1, xs2, xs3, xs4, xs5],
    sm: [sm1, sm2, sm3, sm4, sm5],
    md: [md1, md2, md3, md4, md5],
  };

  return (
    <div className="w-full h-auto  p-2 sm:p-5 md:p-14 flex items-center justify-center">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
      >
        {imageSources[screenSize].map((imageSrc, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full h-full rounded-md"
              src={imageSrc}
              alt={`SwiperSlide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
