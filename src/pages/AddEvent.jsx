import React, { useState } from 'react';
import { useAddEventMutation } from '../App/Features/Api/eventApiSlice';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    description: '',
    reg_start_date: '',
    reg_end_date: '',
    latitude: '',
    longitude: '',
    category: '',
    tags: '',
    audience_type: '',
    multi_tickets: false,
    currency: '',
    main_img: '',
    cover_image: [],
    subEvents: []
  });

  const [currentSubEvent, setCurrentSubEvent] = useState({
    name: '',
    description: '',
    video_url: '',
    start_date: '',
    start_time: '',
    end_time: '',
    host_name: '',
    country_code: '',
    host_mobile: '',
    host_email: '',
    ticket_type: '',
    ticket_price: '',
    ticket_qty: '',
    sub_event_img: []
  });

  const [addSubEvents, setAddSubEvents] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubEventChange = (e) => {
    setCurrentSubEvent({ ...currentSubEvent, [e.target.name]: e.target.value });
  };

  const addSubEvent = () => {
    setFormData({
      ...formData,
      subEvents: [...formData.subEvents, currentSubEvent]
    });
    setCurrentSubEvent({
     name: '',
    description: '',
    video_url: '',
    start_date: '',
    start_time: '',
    end_time: '',
    host_name: '',
    country_code: '',
    host_mobile: '',
    host_email: '',
    ticket_type: '',
    ticket_price: '',
    ticket_qty: '',
    sub_event_img: []
    });
  };

  const [submitEvent, { isLoading, isSuccess, isError }] = useAddEventMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      await submitEvent(formData).unwrap();
      if (isSuccess) {
        alert('Event added successfully');

        // <-------------------------------------->
        console.log(formData);

        setFormData({
          name: '',
          location: '',
          description: '',
          reg_start_date: '',
          reg_end_date: '',
          latitude: '',
          longitude: '',
          category: '',
          tags: '',
          audience_type: '',
          multi_tickets: false,
          currency: '',
          main_img: '',
          cover_image: [],
          subEvents: []
        });
      }
       else if (isError) {
        throw new Error('Failed to add event');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit} autoComplete='off' className="w-full max-w-3xl space-y-6 p-6 bg-white rounded shadow-md backdrop-filter backdrop-blur-lg bg-opacity-40 m-2">
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Event</h2>
        <div className="space-y-4">
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Event Name:
                <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Location:
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
          </div>
          <label className="block font-semibold">
            Description:
            <textarea onDrag={false} type="text" name="description" value={formData.description} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <div className='flex flex-wrap -mx-2'>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Registration Start Date:
                <input type="date" name="reg_start_date" value={formData.reg_start_date} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <div className='w-full md:w-1/2 px-2'>
              <label className="block font-semibold">
                Registration End Date:
                <input type="date" name="reg_end_date" value={formData.reg_end_date} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
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
            <input type="text" name="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Event Tags (eg., http://exmple.com , http://example2.com):
            <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Audience type:
            <input type="text" name="audience_type" value={formData.audience_type} onChange={handleChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
          </label>
          <label className="block font-semibold">
            Allow multiple Tickets:
            <input type="checkbox" name="multi_tickets" value={formData.multi_tickets } onChange={(e)=> setFormData({ ...formData, [e.target.name]: e.target.checked })}  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
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
                  <strong>Ticket Type:</strong>
                  <p>Type: {subEvent.ticket_type}</p>
                  <p>Amount: {subEvent.ticket_amount}</p>
                  <p>Number: {subEvent.No_of_ticket}</p>
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
                <input type="text" name="name" value={currentSubEvent.name} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Description:
                <textarea name="description" value={currentSubEvent.description} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"></textarea>
              </label>
    
              <label className="block">
                Event Video URL:
                <input type="text" name="video_url" value={currentSubEvent.video_url} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Start Date:
                <input type="date" name="Event_start_date" value={currentSubEvent.Event_start_date} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Start Time:
                <input type="time" name="Event_start_time" value={currentSubEvent.Event_start_time} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event End Time:
                <input type="time" name="end_time" value={currentSubEvent.end_time} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>





              <label className="block">
                Host name:
                <input type="text" name="host_name" value={currentSubEvent.host_name} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              
              <label className="block">
                Country Code:
                <input type="text" name="contry_code" value={currentSubEvent.country_code} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              
              <label className="block">
                Host Mobile:
                <input type="text" name="host_mobile" value={currentSubEvent.host_mobile} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              
              <label className="block">
                Host Email:
                <input type="text" name="host_email" value={currentSubEvent.host_email} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>


              <label className="block">
                Ticket Type:
                <input type="text" name="ticket_type" value={currentSubEvent.ticket_type} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Ticket Amount:
                <input type="number" name="ticket_price" value={currentSubEvent.ticket_price} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Number of Tickets:
                <input type="number" name="ticket_qty" value={currentSubEvent.ticket_qty} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
              <label className="block">
                Event Image URL (comma separated):
                <input type="text" name="sub_event_img" value={currentSubEvent.sub_event_img} onChange={handleSubEventChange} className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm" />
              </label>
            </div>
            <button type="button" onClick={addSubEvent} className="mt-4 w-full px-4 py-2 bg-blue text-white font-semibold rounded shadow">Add Sub Event</button>
          </div>
        )}
        <button type="submit" className="mt-6 w-full px-4 py-2 bg-red text-white font-semibold rounded shadow">Submit</button>
      </form>
    </div>
  );
};

export default AddEvent;
