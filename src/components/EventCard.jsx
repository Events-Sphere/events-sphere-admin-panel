import React from "react";
import image from "../../public/bg.jpg";
import Config from "../App/service/config";
import axiosInstance from "../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";
const EventCard = ({ data }) => {
  const navigate=useNavigate()
  const handleEvent = async (id) => {
    navigate('/eventdetail',{state:{
      id:id
    }})
  }
    
  return (
    <div className="flex flex-wrap gap-2">
      {data.map((data, index) => (
        <div className="bg-white p-2 text-center  text-black">
          <img
            className="w-52 h-32"
            src={Config.eventMainImage + data.image}
            alt=""
          />
          <h1>{data.name}</h1>
          <h1>{data.location}</h1>
          <h1>{data.startDate}</h1>
          <h1>{data.endDate}</h1>
          <button
            className="bg-blue text-white rounded py-1 px-2"
            onClick={() => handleEvent(data.id)}
          >
            CLICK
          </button>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
