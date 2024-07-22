import React, { useState } from "react";
import axiosInstance from "../utilities/axiosInstance";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ shoeMenu, setShowMenu }) => {
  const [showEvent, setShowEvent] = useState(false);
  const navigate = useNavigate();
 const[tagInput,setTagInput]=useState("")
  const [values, setValues] = useState({
    eventName: "",
    eventAddress: "",
    userId: "",
    eventRegStDate: "",
    eventRegEndDate: "",
    latitude:0,
    longitude: 0,
    eventCat: "",
    evTags: [],
    subEvents: [], 
  });

  console.log(values);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputSub = (e, index) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const newSubEvents = [...prevValues.subEvents];
      newSubEvents[index] = { ...newSubEvents[index], [name]: value };
      return {
        ...prevValues,
        subEvents: newSubEvents,
      };
    });
  };

  const handleImageChange = (e, index) => {
    const files = Array.from(e.target.files);
    setValues((prevValues) => {
      const newSubEvents = [...prevValues.subEvents];
      const newImages = files.map((file) => URL.createObjectURL(file)); 
      newSubEvents[index] = { ...newSubEvents[index], Ev_image: [...newSubEvents[index].Ev_image, ...newImages] };
      return {
        ...prevValues,
        subEvents: newSubEvents,
      };
    });
  };

  const handleDeleteImage = (subIndex, imgIndex) => {
    setValues((prevValues) => {
      const newSubEvents = [...prevValues.subEvents];
      newSubEvents[subIndex].Ev_image = newSubEvents[subIndex].Ev_image.filter((_, index) => index !== imgIndex);
      return {
        ...prevValues,
        subEvents: newSubEvents,
      };
    });
  };
console.log(tagInput)
const handleAddTag = () => {
  if (tagInput.trim() !== "") {
    setValues((prevValues) => ({
      ...prevValues,
      evTags: [...prevValues.evTags, tagInput.trim()],
    }));
    setTagInput("");
  }
};

const handleDeleteTag = (removeTag) => {
  setValues((prevValues) => ({
    ...prevValues,
    evTags: prevValues.evTags.filter((tag) => tag !== removeTag),
  }));
};

  // const handleKey = (e) => {
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleInput();
  //   }
  // };
  
 

  const addSubEvent = () => {
    setValues((prevValues) => ({
      ...prevValues,
      subEvents: [
        ...prevValues.subEvents,
        {
          Sub_Event_name: "",
          description: "",
          type_of_event: "",
          Ev_image: [""], 
          event_video_url: "",
          Event_start_date: "",
          Event_start_time: "",
          ticketTypes: [
            { ticket_type: "", ticket_amount: "", No_of_ticket: "" },
          ],
        },
      ],
    }));
  };

  const addTicket = (subIndex) => {
    setValues((prevValues) => {
      const newSubEvents = [...prevValues.subEvents];
      const newTicketTypes = [...newSubEvents[subIndex].ticketTypes];
      newTicketTypes.push({ ticket_type: "", ticket_amount: "", No_of_ticket: "" });
      newSubEvents[subIndex] = { ...newSubEvents[subIndex], ticketTypes: newTicketTypes };
      return {
        ...prevValues,
        subEvents: newSubEvents,
      };
    });
  };

  const handleTicket = (e, subIndex, ticketIndex) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      const newSubEvents = [...prevValues.subEvents];
      const newTicketTypes = [...newSubEvents[subIndex].ticketTypes];
      newTicketTypes[ticketIndex] = { ...newTicketTypes[ticketIndex], [name]: value };
      newSubEvents[subIndex] = { ...newSubEvents[subIndex], ticketTypes: newTicketTypes };
      return {
        ...prevValues,
        subEvents: newSubEvents,
      };
    });
  };

  const handleDeleteTicket = (subIndex, ticketIndex) => {
    setValues((prevValues) => {
      const newSubEvents = [...prevValues.subEvents];
      const newTicketTypes = newSubEvents[subIndex].ticketTypes.filter((_, index) => index !== ticketIndex);
      newSubEvents[subIndex] = { ...newSubEvents[subIndex], ticketTypes: newTicketTypes };
      return {
        ...prevValues,
        subEvents: newSubEvents,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // const formData = new FormData();
      
      // Object.keys(values).forEach((key) => {
      //   if (Array.isArray(values[key])) {
      //     values[key].forEach((item, index) => {
      //       if (key === 'subEvents') {
      //         item.Ev_image.forEach((img, imgIndex) => {
      //           formData.append(`subEvents[${index}].Ev_image[${imgIndex}]`, img);
      //         });
      //       }
      //       formData.append(`${key}[${index}]`, JSON.stringify(item));
      //     });
      //   } else {
      //     formData.append(key, values[key]);
      //   }
      // });
      const jsonData = JSON.stringify(values);

     
      const response = await axiosInstance.post('event/addevent', jsonData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // const response = await axiosInstance.post('event/addevent', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // });
      console.log(JSON.stringify(response, null, 2));
      if (response.data) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="w-full">
        <h1>Add Event</h1>
        <div className={`flex flex-wrap justify-center gap-4 pt-8 px-4`}>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="eventName">Event Name</label>
              <input name="eventName" type="text" value={values.eventName} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="eventAddress">Event Address</label>
              <textarea name="eventAddress" value={values.eventAddress} onChange={handleInput}></textarea>
            </div>
            <div>
              <label htmlFor="userId">User Id</label>
              <input type="text" name="userId" value={values.userId} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="eventRegStDate">Event Registration Start Date</label>
              <input type="text" name="eventRegStDate" value={values.eventRegStDate} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="eventRegEndDate">Event Registration End Date</label>
              <input type="text" name="eventRegEndDate" value={values.eventRegEndDate} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="latitude">Latitude</label>
              <input type="text" name="latitude" value={values.latitude} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="longitude">Longitude</label>
              <input type="text" name="longitude" value={values.longitude} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="eventCat">Event Category</label>
              <input type="text" name="eventCat" value={values.eventCat} onChange={handleInput} />
            </div>
            <div>
              <label htmlFor="evTags">Event Tags</label>
              <div className="flex">
                {values.evTags.length >0 && values.evTags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <span className="text-blue">{tag}</span>
                    <button 
                      type="button"
                      onClick={() => handleDeleteTag(tag)}
                      className="text-red  p-1 rounded"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
              <input
                type="text"
                value={tagInput}
                onChange={(e)=>setTagInput(e.target.value)}
                placeholder="Add Tag"
              />
              <button type="button" onClick={()=>handleAddTag()}>Add Tag</button>
            </div>
            <div>
              <button type="button" onClick={() => setShowEvent(!showEvent)}>
                {showEvent ? "Hide Sub Events" : "Add Sub Event"}
              </button>
              {showEvent && (
                <div>
                  <h1>Sub Events</h1>
                  {values.subEvents.map((subEvent, subIndex) => (
                    <div key={subIndex}>
                      <h2>Sub Event {subIndex + 1}</h2>
                      <label htmlFor={`Sub_Event_name_${subIndex}`}>Sub Event Name</label>
                      <input
                        type="text"
                        name="Sub_Event_name"
                        value={subEvent.Sub_Event_name}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`description_${subIndex}`}>Description</label>
                      <input
                        type="text"
                        name="description"
                        value={subEvent.description}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`type_of_event_${subIndex}`}>Type Of Event</label>
                      <input
                        type="text"
                        name="type_of_event"
                        value={subEvent.type_of_event}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`event_video_url_${subIndex}`}>Event Video URL</label>
                      <input
                        type="text"
                        name="event_video_url"
                        value={subEvent.event_video_url}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`Event_start_date_${subIndex}`}>Event Start Date</label>
                      <input
                        type="text"
                        name="Event_start_date"
                        value={subEvent.Event_start_date}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`Event_start_time_${subIndex}`}>Event Start Time</label>
                      <input
                        type="text"
                        name="Event_start_time"
                        value={subEvent.Event_start_time}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`No_of_ticket_${subIndex}`}>No of Tickets</label>
                      <input
                        type="text"
                        name="No_of_ticket"
                        value={subEvent.No_of_ticket}
                        onChange={(e) => handleInputSub(e, subIndex)}
                      />
                      <label htmlFor={`subEvent_images_${subIndex}`}>Event Images</label>
                      <input
                        type="file"
                        multiple
                        onChange={(e) => handleImageChange(e, subIndex)}
                      />
                      <div>
                        {subEvent.Ev_image.map((img, imgIndex) => (
                          <div key={imgIndex} className="relative inline-block mr-2">
                            <img
                              src={img}
                              alt={`Sub Event ${subIndex} Image ${imgIndex}`}
                              style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                            <button
                              type="button"
                              onClick={() => handleDeleteImage(subIndex, imgIndex)}
                              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={() => addTicket(subIndex)}>Add Ticket</button>
                      {subEvent.ticketTypes.map((ticket, ticketIndex) => (
                        <div key={ticketIndex}>
                          <label htmlFor={`ticket_type_${subIndex}_${ticketIndex}`}>Ticket Type</label>
                          <input
                            type="text"
                            name="ticket_type"
                            value={ticket.ticket_type}
                            onChange={(e) => handleTicket(e, subIndex, ticketIndex)}
                          />
                          <label htmlFor={`ticket_amount_${subIndex}_${ticketIndex}`}>Ticket Amount</label>
                          <input
                            type="text"
                            name="ticket_amount"
                            value={ticket.ticket_amount}
                            onChange={(e) => handleTicket(e, subIndex, ticketIndex)}
                          />
                          <label htmlFor={`No_of_ticket_${subIndex}_${ticketIndex}`}>No of Tickets</label>
                          <input
                            type="text"
                            name="No_of_ticket"
                            value={ticket.No_of_ticket}
                            onChange={(e) => handleTicket(e, subIndex, ticketIndex)}
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteTicket(subIndex, ticketIndex)}
                            className="bg-red-500 text-white p-1 rounded"
                          >
                            Delete Ticket
                          </button>
                        </div>
                      ))}
                    </div>
                  ))}
                  <button type="button" onClick={addSubEvent}>Add Another Sub Event</button>
                </div>
              )}
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;
