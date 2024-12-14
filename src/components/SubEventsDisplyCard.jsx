import React from "react";
import { BiUser } from "react-icons/bi";
import { FcCallback } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { BsYoutube } from "react-icons/bs";

const SubEventsDisplyCard = ({ event }) => {
  return (
    <div className=" flex w-[550px] min-h-[600px] flex-wrap gap-1 justify-center p-2">
      <div className="bg-white shadow-md rounded-lg  h-auto flex flex-col overflow-hidden hover:shadow-2xl transition-shadow duration-300 justify-between">
        <div className="relative">
          <div className="bg-txt-color p-1 px-4 text-white flex justify-between items-center">
            <h1 className="text-xl font-bold uppercase tracking-wide">
              {event?.name ?? "Event Name"}
            </h1>
            <p className="text-sm opacity-90">
              ID-<span className="font-bold">{event?.eventID ?? "0000"}</span>
            </p>
          </div>

          {event?.sub_event_img?.length > 0 && (
            <div className="space-y-4  mt-2 px-4">
              <div className="grid grid-cols-4 gap-2">
                {event.sub_event_img.map((img, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(img)}
                    alt={`Sub Event Image ${index + 1}`}
                    className="w-[8rem] h-[6rem] object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 space-y-1 text-txt-color bg-gray-100 rounded-lg">
          <p className="text-sm truncate">{event?.description}</p>
          <div className="flex justify-between items-center gap-4">
            <div className="flex flex-col items-center justify-center w-20 h-16 bg-[#E9EFEC] text-txt-color rounded-md shadow-lg">
              <span className="text-xs font-semibold uppercase">
                {new Date(event.startDate).toLocaleString("en-US", {
                  month: "short",
                })}
              </span>
              <span className="text-lg font-bold">
                {new Date(event.startDate).getDate()}
              </span>
              <span className="text-xs">
                {new Date(event?.startDate).getFullYear()}
              </span>
            </div>
            <span className="text-sm font-semibold text-txt-color flex items-center">
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.startTime, "hours")}
              </span>
              :
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.startTime, "minutes")}
              </span>
              <strong className="m-3">-</strong>
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.endTime, "hours")}
              </span>
              :
              <span className="p-1 text-lg border-[1px] border-txt-color rounded-sm mx-1">
                {getValidTime(event.endTime, "minutes")}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <BiUser />
            <span className="text-sm">{event?.host_name}</span>
            <span className="ml-5 flex items-center gap-2">
              <FcCallback />
              {event?.country_code}-{event?.host_mobile}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <MdOutlineEmail />
            <span className="text-sm">
              <a
                href={`mailto:${event?.host_email}`}
                className="text-[#37AFE1] ml-1"
              >
                {event?.host_email}
              </a>
            </span>
            <div className="flex items-center gap-2 ml-3 text-txt-color">
              <span>Ticket Type - </span>
              <span className="text-sm">{event?.ticket_type}</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-2 text-right flex justify-between">
          {event?.video_url && (
            <>
              <a
                href={event.video_url}
                target="_blank"
                className="text-blue-600 flex items-center gap-2"
                rel="noopener noreferrer"
              >
                <BsYoutube color="red" />
                Watch Video
              </a>
              <div>
                <span className="font-bold text-txt-color pr-1">
                  ${event?.ticket_price}
                </span>
                <span className="font-semibold text-template-1">
                  [Qty: {event?.ticket_qty}]
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

function getValidTime(time, type) {
  if (!time || typeof time !== "string") return "00";

  const date = new Date(`1970-01-01T${time}`);
  if (isNaN(date)) return "00";
  if (type === "hours") {
    const hours = date.getHours();
    return hours < 10 ? `0${hours}` : hours;
  } else if (type === "minutes") {
    const minutes = date.getMinutes();
    return minutes < 10 ? `00` : minutes;
  }
  return "00";
}

export default SubEventsDisplyCard;
