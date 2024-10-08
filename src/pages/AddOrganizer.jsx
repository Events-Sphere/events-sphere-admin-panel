import React, { useState } from "react";
import axiosInstance from "../utilities/axiosInstance";

const AddOrganizer = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    country_code: "+91",
    mobile: "",
    user_role: "organizer",
    college_name: "",
    college_code: "",
    location: "",
    longitude: "",
    latitude: "",
  });
  const [noc, setNoc] = useState(null);
  const [idCard, setIdCard] = useState([]);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.name == "noc") {
      setNoc(e.target.files[0]);
    }
    if (e.target.name == "idCard") {
      const files = Array.from(e.target.files);
      if (files.length > 2) {
        alert("max 2 image");
      } else {
        setIdCard(files);
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("org-noc", noc);

    idCard.forEach((file, index) => {
      data.append("org-id-card", file);
    });
    data.append("data", JSON.stringify(formData));
    try {
      const response = await axiosInstance.post(
        "/admin/organizer/create",
        data,
        {
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      if (response.data.status == true) {
        alert("Org added successfully");
        setFormData({
          full_name: "",
          email: "",
          password: "",
          country_code: "+91",
          mobile: "",
          user_role: "organizer",
          college_name: "",
          college_code: "",
          location: "",
          longitude: "",
          latitude: "",
        });
        setIdCard([]);
        setNoc(null);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      if (error.response.data) {
        alert(error.response.data.message);
      }
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full max-w-3xl space-y-6 p-6 bg-white rounded shadow-md "
      >
        <h2 className="text-2xl font-bold text-blue-600 mb-4">Add Organizer</h2>
        <div className="flex flex-wrap w-full">
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Full Name:
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Email:
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="flex w-1/2">
            <div className="w-1/2 px-2">
              <label className="block font-semibold">
                Code:
                <select
                  onChange={() => handleChange}
                  value={formData.college_code}
                  className="mt-1 block w-full py-2  border border-gray-300 rounded shadow-sm"
                  name="college_code"
                  id=""
                >
                  <option value="+91">+91</option>
                  <option value="+65">+91</option>
                </select>
              </label>
            </div>
            <div className="w-full px-2">
              <label className="block font-semibold">
                Mobile No:
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              College Name:
              <input
                type="text"
                name="college_name"
                value={formData.college_name}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              College Code:
              <input
                type="text"
                name="college_code"
                value={formData.college_code}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Location:
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Password:
              <input
                type="text"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="flex w-1/2">
            <div className="w-1/2 px-2">
              <label className="block font-semibold">
                Latitude:
                <input
                  type="text"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
            <div className="w-1/2 px-2">
              <label className="block font-semibold">
                Longitude:
                <input
                  type="text"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded shadow-sm"
                />
              </label>
            </div>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              Noc:
              {noc && <p>{noc.name}</p>}
              <input
                type="file"
                accept="application/pdf"
                name="noc"
                onChange={handleChange}
                className="mt-1 bg-white block w-full p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
          <div className="w-1/2 px-2">
            <label className="block font-semibold">
              ID Card:
              {idCard.length > 0 &&
                idCard.map((data) => (
                  <div className="flex">
                    <p>{data.name}</p>
                  </div>
                ))}
              <input
                type="file"
                multiple
                accept="image/*"
                name="idCard"
                onChange={handleChange}
                className="mt-1 block w-full bg-white p-2 border border-gray-300 rounded shadow-sm"
              />
            </label>
          </div>
        </div>

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

export default AddOrganizer;
