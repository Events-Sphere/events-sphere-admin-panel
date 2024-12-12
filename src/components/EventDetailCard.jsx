import React from "react";
import ImageSlider from "./ImageSlider";
import { BiMobileAlt, BiUser } from "react-icons/bi";
import { FcCallback, FcVip } from "react-icons/fc";
import { MdEmail, MdOutlineEmail } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";

const EventDetailCard = ({ data }) => {

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours} : ${minutes}`;
  };

  return (
    <div className="flex ml-8 flex-col items-center justify-center p-10 bg-white-smoke h-screen ">
      {data.map((event, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg w-full max-w-4xl mb-4 flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300"
        >

          <div className="relative">
            <ImageSlider />
          </div>


          <div className="bg-txt-color p-1 px-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold uppercase tracking-wide">{event.eventName}</h1>
            <p className="text-sm opacity-90">
              ID-<span className="font-bold">{event.eventId}</span>
            </p>
          </div>


          <div className="p-4 space-y-1 text-gray-700 bg-gray-100 rounded-lg">
            <div className="flex justify-between">
              <p className="text-sm">{event.description}</p>
              <div className="flex items-center justify-between gap-4">

                <div className="flex flex-col items-center justify-center w-16 h-16 bg-blue-600 text-txt-color rounded-md shadow-lg">
                  <span className="text-xs font-semibold uppercase">
                    {new Date(event.startDate).toLocaleString("en-US", { month: "short" })}
                  </span>
                  <span className="text-lg font-bold">{new Date(event.startDate).getDate()}</span>
                  <span className="text-xs">{new Date(event.startDate).getFullYear()}</span>
                </div>
              </div>
            </div>
            <div className="flex justify-between  items-center gap-4 p-1">
              <span className="text-sm font-semibold text-gray-800 flex items-center">
                <span className="  p-2 text-lg text-center border-[1px] border-txt-color rounded-sm  flex items-center justify-center mx-1">
                  {new Date(`1970-01-01T${event.startTime}`).getHours()}
                </span>
                :
                <span className=" p-2 text-lg text-center border-[1px] border-txt-color rounded-sm flex items-center justify-center mx-1">
                  {new Date(`1970-01-01T${event.startTime}`).getMinutes() === 0 ? '00' : new Date(`1970-01-01T${event.endTime}`).getMinutes()}
                </span>
                <strong className="m-3">-</strong>
                <span className=" p-2 text-lg text-center border-[1px] border-txt-color rounded-sm flex items-center justify-center mx-1">
                  {new Date(`1970-01-01T${event.endTime}`).getHours()}
                </span>
                :

                <span className=" p-2 text-lg text-center border-[1px] border-txt-color rounded-sm flex items-center justify-center mx-1">
                  {new Date(`1970-01-01T${event.endTime}`).getMinutes() === 0 ? '00' : new Date(`1970-01-01T${event.endTime}`).getMinutes()}
                </span>
              </span>
              <div className="px-5  pb-1 ">
                <span
                  className={`inline-block  px-5 py-1 rounded-xl text-white text-sm ${event.status === "active"
                    ? "bg-[#2bc926]"
                    : event.status === "pending"
                      ? "bg-[#FAB12F]"
                      : event.status === "rejected"
                        ? "bg-[#FA4032]"
                        : "bg-[#A6AEBF]"
                    }`}
                >
                  {event.status}
                </span>
                {event.status === "rejected" && (
                  <p className="text-red text-sm mt-2">
                    <strong>Reason:</strong> {event.reason}
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 p-1 mt-2">
              <BiUser />
              <span className="text-sm">
                <strong></strong> {event.hostName}
              </span>
              <span className="ml-5 flex items-center gap-2">
                <FcCallback />
                {event.countryCode}-{event.hostMobile}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <MdOutlineEmail />
              <span className="text-sm">
                <a href={`mailto:${event.hostEmail}`} className="text-[#37AFE1] ml-1">
                  {event.hostEmail}
                </a>
              </span>
              <div className="flex items-center gap-2 ml-3 text-txt-color">
                <span>Ticket Type - </span>
                <span className="text-sm">
                  {event.ticketType}
                </span>
              </div>
              <div>
                <span className="font-bold text-txt-color pr-1"> ${event.ticketPrice}</span>
                <span className="font-semibold text-template-1" >[Qty: {event.ticketQuantity}]</span>
              </div>
            </div>
          </div>
          <div className="bg-white
           p-4 text-right">
            {event.videoUrl && (
              <a
                href={event.videoUrl}
                target="_blank"
                className="text-blue-600  flex items-center gap-2"
                rel="noopener noreferrer"
              >
                <BsYoutube color="red" />
                Watch Video
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventDetailCard;
