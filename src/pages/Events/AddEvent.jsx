import React, { useState } from "react";
import { useAddEventMutation } from "../../App/Features/Api/eventApiSlice";
import { BiCurrentLocation, BiPlus } from "react-icons/bi";
import SubEventsDisplyCard from "../../components/SubEventsDisplyCard";
import { toast, Bounce } from "react-toastify";
import Config from "../../App/service/config";
import axios from "axios";

const AddEvent = () => {
  const currencies = ["USD", "EUR", "INR", "GBP", "JPY"];
  const districts = [
    "Pudukkottai",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Salem",
  ];
  const audienceTypes = ["General", "VIP", "Students", "Employees"];
  const eventCategories = [
    "Arts",
    "Music",
    "Sports",
    "Technology",
    "Education",
  ];
  const ticketTypes = ["General", "VIP", "Student", "Early Bird", "Group"];
  const countryCodes = ["+1", "+44", "+91", "+61", "+81"];

  const [mainImage, setMainImage] = useState(null);
  const [coverImages, setCoverImages] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [addSubEvents, setAddSubEvents] = useState(false);

  const [mainEventData, setMainEventData] = useState({
    name: "",
    location: "",
    description: "",
    reg_start_date: "",
    reg_end_date: "",
    latitude: "",
    longitude: "",
    category: "",
    tags: "",
    audience_type: "",
    multi_tickets: false,
    currency: "",
  });

  const [subEventsData, setSubEventsData] = useState([]);
  const [subEventCoverImages, setSubEventCoverImages] = useState([]);
  const [currentSubEvent, setCurrentSubEvent] = useState({
    name: "",
    description: "",
    video_url: "",
    start_date: "",
    start_time: "",
    end_time: "",
    host_name: "",
    country_code: "",
    host_mobile: "",
    host_email: "",
    ticket_type: "",
    ticket_price: "",
    ticket_qty: "",
    sub_event_img: [],
  });

  const addSubEvent = () => {
    setSubEventsData((prevData) => [
      ...(Array.isArray(prevData) ? prevData : []),
      currentSubEvent,
    ]);

    setSubEventCoverImages([
      ...subEventCoverImages,
      currentSubEvent.sub_event_img,
    ]);
    console.log(subEventsData);
    setCurrentSubEvent({
      name: "",
      description: "",
      video_url: "",
      start_date: "",
      start_time: "",
      end_time: "",
      host_name: "",
      country_code: "",
      host_mobile: "",
      host_email: "",
      ticket_type: "",
      ticket_price: "",
      ticket_qty: "",
      sub_event_img: [],
    });
  };

  const [submitEvent, { isLoading, isSuccess, isError }] =
    useAddEventMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (mainImage) {
      formData.append("main-img", mainImage);
    } else {
      toast.warning(
"Main image is not provided.",
{
  position: "top-right",
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
}
      )
    }

    coverImages?.forEach((image, index) => {
      if (image) {
        formData.append("cover-img", image);
      } else {
        toast.warning(
          `Cover image at index ${index} is not provided.`,
          {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Bounce,
          }
                )
      }
    });

    subEventCoverImages.forEach((subEvent, subIndex) => {
      subEvent.forEach((image, imgIndex) => {
        formData.append(`sub-event-img${subIndex + 1}`, image);
      });
    });

    const data = {
      name: mainEventData.name,
      location: mainEventData.location,
      description: mainEventData.description,
      reg_start_date: mainEventData.reg_start_date,
      reg_end_date: mainEventData.reg_end_date,
      latitude: userLocation.latitude,
      longitude: userLocation.longitude,
      category: mainEventData.category,
      tags: mainEventData.tags,
      audience_type: mainEventData.audience_type,
      multi_tickets: mainEventData.multi_tickets,
      currency: mainEventData.currency,
      sub_events: subEventsData.map((subEvent) => ({
        name: subEvent.name,
        description: subEvent.description,
        video_url: subEvent.video_url,
        start_date: subEvent.start_date,
        start_time: subEvent.start_time,
        end_time: subEvent.end_time,
        host_name: subEvent.host_name,
        country_code: subEvent.country_code,
        host_mobile: subEvent.host_mobile,
        host_email: subEvent.host_email,
        ticket_type: subEvent.ticket_type,
        ticket_price: subEvent.ticket_price,
        ticket_qty: subEvent.ticket_qty,
      })),
    };

    formData.append("data", JSON.stringify(data));

    const headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "multipart/form-data",
    };

    try {
      const response = await axios.post(
        `${Config.baseUrl}${Config.createEvent}`,
        formData,
        {
          headers: headers,
        },
      );

      if (response.status === 200) {
        toast.success(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error(response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    } catch (error) {
      if (error.response.data.message) {
        toast.error(error.response.data.message, {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      } else {
        toast.error("Something went wrong. Try again!", {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        });
      }
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => {
          toast.warning(
            "Error while getting location",
            {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              transition: Bounce,
            }
                  )
        },
      );
    } else {
      toast.warning(
        "Geolocation is not supported by this browser.",
        {
          position: "top-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
        }
              )
    }
  };
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
    }
  };

  const handlesubEventCoverImageFileChange = (e, idx = null) => {
    setCurrentSubEvent((prevState) => ({
      ...prevState,
      sub_event_img: [...prevState.sub_event_img, e.target.files[0]],
    }));
  };

  const handleChange = (e) => {
    setMainEventData({ ...mainEventData, [e.target.name]: e.target.value });
  };

  const handleSubEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentSubEvent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCoverImageFileChange = (e) => {
    const files = e.target.files;
    const updatedCoverImages = [...coverImages];
    for (let i = 0; i < files.length; i++) {
      updatedCoverImages.push(files[i]);
    }
    setCoverImages(updatedCoverImages);
  };

  const handleRemoveImage = (index) => {
    const updatedCoverImages = coverImages.filter((_, idx) => idx !== index);
    setCoverImages(updatedCoverImages);
  };

  return (
    <div className="flex justify-center items-center min-h-screen  ml-10">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-6xl space-y-6 p-6 bg-white rounded shadow-md backdrop-filter backdrop-blur-lg bg-opacity-40 m-2"
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">
          Admin Event Creator
        </h2>
        <div className="space-y-4">
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <InputField
                label="Event Name:"
                name="name"
                value={mainEventData.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block font-semibold">
                District:
                <select
                  name="location"
                  value={mainEventData.location}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                >
                  <option value="">Select District</option>
                  {districts.map((district) => (
                    <option key={district} value={district}>
                      {district}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
          <InputField
            label="Description:"
            name="description"
            value={mainEventData.description}
            onChange={handleChange}
            textarea={true}
          />

          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <label className="block font-semibold">
                Registration Start Date:
                <input
                  type="date"
                  name="reg_start_date"
                  value={mainEventData.reg_start_date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
            <div className="w-full md:w-1/2 px-2">
              <label className="block font-semibold">
                Registration End Date:
                <input
                  type="date"
                  name="reg_end_date"
                  value={mainEventData.reg_end_date}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
          </div>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <div className="flex gap-2 justify-between items-center">
                <div className="flex gap-2" onClick={getUserLocation}>
                  <BiCurrentLocation className="pt-1" size={55} color="black" />
                  <p className="pt-4">Get Location</p>
                </div>
                {userLocation && (
                  <div className="flex gap-3">
                    <p>Latitude: {userLocation.latitude}</p>
                    <p>Longitude: {userLocation.longitude}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <label className="block font-semibold">
            Event Tags (eg., http://exmple.com , http://example2.com):
            <input
              type="text"
              name="tags"
              value={mainEventData.tags}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
            />
          </label>

          <div className="flex gap-2 justify-between">
            <label className="w-[50%] font-semibold">
              Audience type:
              <select
                name="audience_type"
                value={mainEventData.audience_type}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              >
                <option value="">Select Audience Type</option>
                {audienceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label className="w-[50%] font-semibold">
              Event Category:
              <select
                name="category"
                value={mainEventData.category}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              >
                <option value="">Select Event Category</option>
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex gap-2 justify-between">
            <label className="block  font-semibold">
              Multy-tickets:
              <div className="h-6 w-6  border-[1px] rounded-sm m-2 ">
                <input
                  type="checkbox"
                  name="multi_tickets"
                  value={mainEventData.multi_tickets}
                  checked={mainEventData.multi_tickets}
                  onChange={(e) =>
                    setMainEventData({
                      ...mainEventData,
                      [e.target.name]: e.target.checked,
                    })
                  }
                  className="mt-1  block w-full  p-1 border border-bannar rounded shadow-sm"
                />
              </div>
            </label>
            <label className="block font-semibold">
              Currency:
              <select
                name="currency"
                value={mainEventData.currency}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </label>
            <label className="block font-semibold">
              Number of Tickets:
              <input
                type="number"
                name="No_of_ticket"
                value={mainEventData.No_of_ticket}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>

          <div className="mt-4">
            <div
              className={`mt-2 flex items-center justify-center p-2 border-2 ${mainImage ? "border-[1px]" : "border-dashed"} border-gray-400 rounded-lg hover:border-blue transition duration-300`}
            >
              <label className="flex flex-col items-center justify-center w-full h-[30vh] cursor-pointer">
                {mainImage ? (
                  <img
                    src={URL.createObjectURL(mainImage)}
                    alt="main-event-img"
                    className="w-full h-full object-cover rounded-lg overflow-hidden"
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V4m10 12V4m-6 8V4m8 4H3"
                      ></path>
                    </svg>
                    <span className="text-sm text-gray-600">
                      Click here to select an image
                    </span>
                  </>
                )}
                <input
                  type="file"
                  name="main_img"
                  onChange={handleMainImageChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>

            <div className="flex flex-wrap w-full gap-2 mt-4">
              {coverImages.length > 0 &&
                coverImages.map((coverImage, idx) => (
                  <div
                    key={idx}
                    className="relative w-[100px] h-[100px] flex items-center justify-center p-1 border-[1px] border-gray-400 rounded-lg hover:border-blue-500 transition duration-300"
                  >
                    <button
                      className="absolute top-0 right-0 text-white font-semibold bg-red rounded-full w-5 h-5 flex items-center justify-center text-md cursor-pointer"
                      onClick={() => handleRemoveImage(idx)}
                    >
                      X
                    </button>

                    <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                      <img
                        src={URL.createObjectURL(coverImage)}
                        alt={`cover-img-${idx}`}
                        className="w-full h-full object-cover rounded"
                      />
                      <input
                        type="file"
                        name={`cover_img_${idx}`}
                        onChange={handleCoverImageFileChange}
                        className="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                ))}

              <div className="w-[100px] h-[100px] flex items-center justify-center p-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                  <BiPlus size={35} className="text-gray-500" />
                  <input
                    type="file"
                    name="cover_img"
                    onChange={handleCoverImageFileChange}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>
          </div>

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

        {subEventsData.length > 0 && (
          <div className="mt-2 ">
            <h4 className="text-2xl font-semibold text-txt-color mb-2">
              Sub Event List
            </h4>
            <div className="space-y-1 flex flex-wrap items-center justify-center">
              {subEventsData.map((subEvent, idx) => (
                <SubEventsDisplyCard key={idx} event={subEvent} />
              ))}
            </div>
          </div>
        )}

        {addSubEvents && (
          <div className="mt-4 p-4 bg-gray-200 rounded">
            <h3 className="text-xl font-semibold mb-2">Sub Event</h3>
            <div className="space-y-4">
              <InputField
                label="Sub Event Name:"
                name="name"
                value={currentSubEvent.name}
                onChange={handleSubEventChange}
              />
              <InputField
                label="Description:"
                name="description"
                value={currentSubEvent.description}
                onChange={handleSubEventChange}
                type="textarea"
              />
              <InputField
                label="Event Video URL:"
                name="video_url"
                value={currentSubEvent.video_url}
                onChange={handleSubEventChange}
              />
              <div className="flex justify-between gap-2">
                <InputField
                  label="Event Start Date:"
                  name="start_date"
                  value={currentSubEvent.start_date}
                  onChange={handleSubEventChange}
                  type="date"
                />
                <InputField
                  label="Event Start Time:"
                  name="start_time"
                  value={currentSubEvent.start_time}
                  onChange={handleSubEventChange}
                  type="time"
                />
                <InputField
                  label="Event End Time:"
                  name="end_time"
                  value={currentSubEvent.end_time}
                  onChange={handleSubEventChange}
                  type="time"
                />
              </div>
              <div className="flex justify-between gap-2">
                <InputField
                  label="Host name:"
                  name="host_name"
                  value={currentSubEvent.host_name}
                  onChange={handleSubEventChange}
                />
                <InputField
                  label="Host Email:"
                  name="host_email"
                  value={currentSubEvent.host_email}
                  onChange={handleSubEventChange}
                />
              </div>

              <div className="flex justify-between gap-2">
                <label className="w-[40%]">
                  Country Code:
                  <select
                    name="country_code"
                    value={currentSubEvent.country_code}
                    onChange={handleSubEventChange}
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded shadow-sm"
                  >
                    <option value="">Select Country Code</option>
                    {countryCodes.map((code) => (
                      <option key={code} value={code}>
                        {code}
                      </option>
                    ))}
                  </select>
                </label>
                <InputField
                  label="Host Mobile:"
                  name="host_mobile"
                  value={currentSubEvent.host_mobile}
                  onChange={handleSubEventChange}
                  type="number"
                />
              </div>

              <div className="flex align-middle justify-between gap-1">
                <label className="w-full">
                  Ticket Type:
                  <select
                    name="ticket_type"
                    value={currentSubEvent.ticket_type}
                    onChange={handleSubEventChange}
                    className="mt-1 block w-full p-2.5 border border-gray-300 rounded shadow-sm"
                  >
                    <option value="">Select Ticket Type</option>
                    {ticketTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </label>
                <InputField
                  label="Ticket Amount:"
                  name="ticket_price"
                  value={currentSubEvent.ticket_price}
                  onChange={handleSubEventChange}
                  type="number"
                />
                <InputField
                  label="Number of Tickets:"
                  name="ticket_qty"
                  value={currentSubEvent.ticket_qty}
                  onChange={handleSubEventChange}
                  type="number"
                />
              </div>

              <div className="flex flex-wrap w-full gap-2 mt-4">
                {currentSubEvent.sub_event_img.length > 0 &&
                  currentSubEvent.sub_event_img.map((coverImg, idx) => (
                    <div
                      key={idx}
                      className={`relative w-[100px] h-[100px] flex items-center justify-center p-1 ${coverImg ? "border-[1px]" : "border-dashed"} border-gray-400 rounded-lg hover:border-blue-500 transition duration-300`}
                    >
                      <button
                        className="absolute top-1 right-1 bg-blue text-white font-semibold rounded-full w-5 h-5 flex items-center justify-center text-md cursor-pointer"
                        onClick={() => handleSubCoverImageRemove(idx)}
                      >
                        X
                      </button>

                      <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                        <img
                          src={URL.createObjectURL(coverImg)}
                          alt={`cover-img-${idx}`}
                          className="w-full h-full object-cover rounded"
                        />
                        <input
                          type="file"
                          name={`cover_img_${idx}`}
                          onChange={(e) =>
                            handlesubEventCoverImageFileChange(e, idx)
                          }
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  ))}

                <div className="w-[100px] h-[100px] flex items-center justify-center p-2 border-2 border-dashed border-gray-400 rounded-lg hover:border-blue-500 transition duration-300">
                  <label className="flex flex-col items-center justify-center w-full h-full cursor-pointer">
                    <BiPlus size={35} className="text-gray-500" />
                    <input
                      type="file"
                      name="cover_img"
                      onChange={(e) => handlesubEventCoverImageFileChange(e, 0)}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={addSubEvent}
              className="mt-4 w-full px-4 py-2 bg-blue text-white font-semibold rounded shadow"
            >
              Add Sub Event
            </button>
          </div>
        )}
        <button
          type="submit"
          className="mt-6 w-full px-4 py-2 bg-red text-white font-semibold rounded shadow"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <label className="block font-semibold w-full">
    {label}
    {type === "textarea" ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
      />
    )}
  </label>
);

export default AddEvent;
