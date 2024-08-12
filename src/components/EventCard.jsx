import React from "react";

const EventCard = ({ data }) => {
  const handleEvent = (id) => {
    console.log("idss", id);
  };
  return (
    <div className="flex gap-2" >
      {data.map((data, index) => (
        <div className="bg-blue text-white">
          <h1>{data.name}</h1>
          <h1>{data.image}</h1>
          <h1>{data.date}</h1>
          <button onClick={() => handleEvent(data.id)}>CLICK</button>
        </div>
      ))}
    </div>
  );
};

export default EventCard;
