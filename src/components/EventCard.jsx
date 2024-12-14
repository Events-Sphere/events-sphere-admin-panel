import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { BiLocationPlus } from "react-icons/bi";
import Config from "../App/service/config";

const EventCard = ({ data }) => {
  const navigate = useNavigate();
  const handleEvent = async (id) => {
    navigate("/eventdetail", {
      state: {
        id: id,
      },
    });
  };
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyyy");
  };

  return (
    <div className="h-[80vh] bg-gray-100 p-4 overflow-auto">
      <div className="flex flex-wrap grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-6 justify-start">
        {data.map((data, index) => (
          <div
            key={index}
            className="relative bg-white rounded-lg shadow-md p-1 text-gray-800 hover:shadow-xl transition-shadow duration-300 w-[13rem]"
          >
            <div className="relative">
              <img
                className="w-full h-[8rem] object-cover rounded-t-lg"
                src={Config.eventMainImage + data.image}
                alt={data.name}
              />
              {/* <span className="absolute top-1 right-1 bg-green-600 text-xs px-2 py-1 rounded-md border-[1px] border-[#FFFF00] bg-[#FFFF00] text-black ">
                Pending
              </span> */}
            </div>

            <div className="p-2">
              <h1 className="text-lg text-txt-color font-bold truncate">
                {data.name}
              </h1>

              <div className=" text-xs text-gray-500">
                <div className="mt-1 flex flex-col items-start text-sm text-gray-600 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">
                      📅 Start:
                    </span>
                    <span>{formatDate(data.startDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-800">⏳ End:</span>
                    <span>{formatDate(data.endDate)}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="flex items-center text-sm text-gray-600 mt-1 gap-2">
                    <BiLocationPlus />
                    <span>{data.location}</span>
                  </div>
                  <button
                    className="mt-1 bg-blue-600 text-txt-color rounded-md h-8 px-3 text-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 border-[1px]"
                    onClick={() => handleEvent(data.id)}
                  >
                    View
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCard;
