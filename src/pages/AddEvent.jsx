import React, { useState } from 'react';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    eventName: '',
    eventAddress: '',
    userId: '',
    eventRegStDate: '',
    eventRegEndDate: '',
    latitude: '',
    longitude: '',
    eventCat: '',
    evTags: '',
    ticket_type: '',
    ticket_amount: '',
    No_of_ticket: '',
    image: '',
    coverImage: '',
    subEvents: []
  });

  const [currentSubEvent, setCurrentSubEvent] = useState({
    Sub_Event_name: '',
    description: '',
    type_of_event: '',
    Ev_image: '',
    event_video_url: '',
    Event_start_date: '',
    Event_start_time: '',
    ticketTypes: []
  });

  const [ticketType, setTicketType] = useState({
    ticket_type: '',
    ticket_amount: '',
    No_of_ticket: ''
  });

  const [addSubEvents, setAddSubEvents] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubEventChange = (e) => {
    setCurrentSubEvent({ ...currentSubEvent, [e.target.name]: e.target.value });
  };

  const handleTicketTypeChange = (e) => {
    setTicketType({ ...ticketType, [e.target.name]: e.target.value });
  };


  const addSubEvent = () => {
    setFormData({ ...formData, subEvents: [...formData.subEvents, currentSubEvent] });
    setCurrentSubEvent({ ...currentSubEvent, ticketTypes: [...currentSubEvent.ticketTypes, ticketType] });
    setCurrentSubEvent({
      Sub_Event_name: '',
      description: '',
      type_of_event: '',
      Ev_image: '',
      event_video_url: '',
      Event_start_date: '',
      Event_start_time: '',
      ticketTypes: []
    });
    setTicketType({ ticket_type: '', ticket_amount: '', No_of_ticket: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleSubmit} autoComplete='off' className="w-full max-w-3xl space-y-6 p-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Event</h2>
        <div className="space-y-4">
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Event Name:
                <input type="text" name="eventName" value={formData.eventName} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Event Address:
                <input type="text" name="eventAddress" value={formData.eventAddress} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
          </div>
          <label className="block font-semibold">
            User ID:
            <input type="text" name="userId" value={formData.userId} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Registration Start Date
                <input type="date" name="eventRegStDate" value={formData.eventRegStDate} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Registration End Date
                <input type="date" name="eventRegEndDate" value={formData.eventRegEndDate} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
          </div>
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Latitude:
                <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Longitude:
                <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
          </div>
          <label className="block font-semibold">
            Event Category:
            <input type="text" name="eventCat" value={formData.eventCat} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Event Tags (comma separated):
            <input type="text" name="evTags" value={formData.evTags} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Ticket Type:
            <input type="text" name="ticket_type" value={formData.ticket_type} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Ticket Amount:
            <input type="number" name="ticket_amount" value={formData.ticket_amount} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Number of Tickets:
            <input type="number" name="No_of_ticket" value={formData.No_of_ticket} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Image URL:
            <input type="text" name="image" value={formData.image} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Cover Images (comma separated):
            <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Add Sub Events:
            <input
              type="checkbox"
              checked={addSubEvents}
              onChange={() => setAddSubEvents(!addSubEvents)}
              className="ml-2"
            />
          </label>
        </div>

        {formData.subEvents.length > 0 && (
          <div className="mt-4">
            <h4 className="text-lg font-bold text-blue-600">Sub Events List</h4>
            {formData.subEvents.map((subEvent, index) => (
              <div key={index} className="p-2 border rounded mb-2">
                <p><strong>Name:</strong> {subEvent.Sub_Event_name}</p>
                <p><strong>Description:</strong> {subEvent.description}</p>
                <p><strong>Type:</strong> {subEvent.type_of_event}</p>
                <p><strong>Images:</strong> {subEvent.Ev_image}</p>
                <p><strong>Video URL:</strong> {subEvent.event_video_url}</p>
                <p><strong>Start Date:</strong> {subEvent.Event_start_date}</p>
                <p><strong>Start Time:</strong> {subEvent.Event_start_time}</p>
                <div>
                  <strong>Ticket Types:</strong>
                  {subEvent.ticketTypes.map((ticket, index) => (
                    <div key={index}>
                      <p>Type: {ticket.ticket_type}</p>
                      <p>Amount: {ticket.ticket_amount}</p>
                      <p>Number: {ticket.No_of_ticket}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {addSubEvents && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h3 className="text-xl font-semibold mb-2">Sub Event</h3>
            <div className="space-y-4">
              <label className="block">
                Sub Event Name:
                <input type="text" name="Sub_Event_name" value={currentSubEvent.Sub_Event_name} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Description:
                <textarea name="description" value={currentSubEvent.description} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"></textarea>
              </label>
              <label className="block">
                Type of Event:
                <input type="text" name="type_of_event" value={currentSubEvent.type_of_event} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Image URL (comma separated):
                <input type="text" name="Ev_image" value={currentSubEvent.Ev_image} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Video URL:
                <input type="text" name="event_video_url" value={currentSubEvent.event_video_url} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Start Date:
                <input type="date" name="Event_start_date" value={currentSubEvent.Event_start_date} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Start Time:
                <input type="time" name="Event_start_time" value={currentSubEvent.Event_start_time} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <div className="mt-4">
              <h4 className="text-lg font-medium mb-2">Ticket Types</h4>
              <div className="space-y-4">
                <label className="block">
                  Ticket Type:
                  <input type="text" name="ticket_type" value={ticketType.ticket_type} onChange={handleTicketTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
                </label>
                <label className="block">
                  Ticket Amount:
                  <input type="number" name="ticket_amount" value={ticketType.ticket_amount} onChange={handleTicketTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
                </label>
                <label className="block">
                  Number of Tickets:
                  <input type="number" name="No_of_ticket" value={ticketType.No_of_ticket} onChange={handleTicketTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
                </label>
              </div>
              <button type="button" onClick={addSubEvent} className="mt-4 w-full px-4 py-2 bg-blue text-white font-semibold rounded shadow">Add Sub Event</button>
            </div>
          </div>
        )}
        <button type="submit" className="mt-6 w-full px-4 py-2 bg-red text-white font-semibold rounded shadow">Submit</button>
      </form>
    </div>
  );
};

export default AddEvent;
