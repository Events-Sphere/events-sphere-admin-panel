import React, { useState } from 'react';
import img1 from '../../public/bg.jpg';
import img2 from '../../public/bg1.jpg';
import img3 from '../../public/dash_bg.jpg';
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

const ImageSlider = () => {
  const [cur, setCur] = useState(0);
  const data = [img1, img2, img3];
  const length = data.length;

  const nextSlide = () => {
    setCur(cur === length - 1 ? 0 : cur + 1);
  };

  const prevSlide = () => {
    setCur(cur === 0 ? length - 1 : cur - 1);
  };

  return (
    <div className='flex relative items-center justify-center'>
      <FaArrowCircleLeft
        className='absolute left-7 text-white z-10 top-1/2 text-2xl hover:cursor-pointer'
        onClick={prevSlide}
      />
      <div className='flex'>
        {data.map((imageSrc, index) => (
          <div className='eventImage' key={index}>
            {index === cur && <img src={imageSrc} alt={`Slide ${index + 1}`} className="w-full" />}
          </div>
        ))}
      </div>
      <FaArrowCircleRight
        className='absolute right-7 text-white z-10 top-1/2 text-2xl hover:cursor-pointer'
        onClick={nextSlide}
      />

      <div className='absolute bottom-4 flex space-x-2'>
        {data.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${index === cur ? 'bg-red' : 'bg-white'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
