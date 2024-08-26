import React from "react";
import ImageSlider from "./ImageSlider";

const EventDetailCard = ({ data }) => {
  return (
    <div className=" flex flex-wrap justify-start gap-4 p-4">
      {data.map((data, index) => (
        <div className="bg-white py-2 px-4 rounded event max-w-80">
            <h1 className="text-center text-xl uppercase text-dark-blue font-bold  ">{data.eventName}</h1>
          <ImageSlider/>
          <p>
            <span>Main Event ID: </span>
            {data.eventId}
          </p>
          <p>
            <span>Event ID: </span>
            {data.id}
          </p>
          
          <p>
            <span>Description: </span>
            {data.description}
          </p>
          <p>
            <span>Video URL: </span>
            <a className="text-blue underline" href={data.videoUrl}>Click Here</a>
          </p>
          <p>
            <span>Date: </span>
            {data.startDate}
          </p>
          <p>
            <span>Time: </span>
            {data.startTime}-{data.endTime}
          </p>
          <p>
            <span>Host Name: </span>
            {data.hostName}
          </p>
          <p>
            <span>Host Mobile: </span>+
            {data.countryCode}-{data.hostMobile}
          </p>
          <p>
            <span>Host Email ID: </span>
            <a href={`mailto:${data.hostEmail}`}>{data.hostEmail}</a>
          </p>
          <p>
            <span>Ticket Type: </span>
            {data.ticketType}
          </p>
          <p>
            <span>Ticket Price: </span>
            {data.ticketPrice}
          </p>
          <p>
            <span>Ticket Quantity: </span>
            {data.ticketQuantity}
          </p>
          <p>
            <span >Status: </span>
            {
                data.status == 'active' ? 
                <p className="bg-green-700 inline-block rounded px-1 text-white uppercase">{data.status}</p> : data.status == 'pending' ?
                 <p className="bg-blue inline-block rounded px-1 text-white uppercase">{data.status}</p> :
                  data.status == 'rejected' ? <p className="bg-red inline-block rounded px-1 text-white uppercase">{data.status}</p> : <p className="bg-sky-blue inline-block rounded px-1 text-white uppercase">{data.status}</p>
            }
          </p>
         
            {
                data.reason && <p>
                <span>Rejected Reason : </span>
                {data.reason}
              </p>
            }
        
        </div>
      ))}
    </div>
  );
};

export default EventDetailCard;
