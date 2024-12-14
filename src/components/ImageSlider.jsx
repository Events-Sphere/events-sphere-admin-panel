import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const ImageSlider = ({ event }) => {
  const [cur, setCur] = useState(0);
  const length = event.images.length;

  const nextSlide = () => {
    setCur(cur === length - 1 ? 0 : cur + 1);
  };

  const prevSlide = () => {
    setCur(cur === 0 ? length - 1 : cur - 1);
  };

  return (
    <div className="relative flex items-center justify-center w-full bg-gray-800 rounded-tl-md rounded-tr-md overflow-hidden shadow-lg">
      <FaArrowCircleLeft
        className="absolute left-4 h-6 w-6 text-white-smoke z-20 top-1/2 transform -translate-y-1/2 text-4xl hover:cursor-pointer hover:text-[#FFF8E8] transition-colors duration-200"
        onClick={prevSlide}
      />

      <div className="w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${cur * 100}%)`,
          }}
        >
          {event.images.length > 0 ? (
            event.images.map((imageSrc, index) => (
              <img
                key={index}
                src={
                  imageSrc && imageSrc !== ""
                    ? `http://localhost:3000/ev_sub_img/${imageSrc}`
                    : "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_960_720.jpg"
                }
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover flex-shrink-0"
              />
            ))
          ) : (
            <img
              src={
                "https://cdn.pixabay.com/photo/2016/11/23/15/48/audience-1853662_960_720.jpg"
              }
              alt={`Slide  1`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          )}
        </div>
      </div>

      <FaArrowCircleRight
        className="absolute right-4 h-6 w-6 text-white-smoke z-20 top-1/2 transform -translate-y-1/2 text-4xl hover:cursor-pointer hover:text-[#FFF8E8] transition-colors duration-200"
        onClick={nextSlide}
      />

      <div className="absolute bottom-4 z-20 flex space-x-2">
        {event.images.length > 0 ? (
          event.images.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-3 cursor-pointer rounded-full border-2 ${
                index === cur
                  ? "bg-white border-white"
                  : "bg-[#A6AEBF] border-[#C5D3E8]"
              } transition-colors duration-200`}
              onClick={() => setCur(index)}
            />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default ImageSlider;
