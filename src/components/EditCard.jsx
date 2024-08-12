import React, { useState } from "react";

const EditCard = ({userDetailEdit,popupEdit,setPopupEdit,circle}) => {
   
   const[value,setValue]=useState({
    full_name:userDetailEdit[0].full_name,
    mobile:userDetailEdit[0].mobile,
    email:userDetailEdit[0].email,
    password:'',
   });
   console.log("value",value)
    const handleChange=()=>{

    }
    const handleSubmit=()=>{

    }
  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <>
      <div className="flex justify-between">
       <h3 className="text-xl font-bold mb-4 text-primary">Edit Internal Team</h3>
       <button onClick={()=>setPopupEdit(!popupEdit)} className="bg-red px-2">X</button>
       </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              value={value.full_name}
              onChange={handleChange}
              className="mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter category name"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Mobile No:
            </label>
            <input
              type="text"
              name="image"
              value={value.mobile}
              onChange={handleChange}
              className="mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Email:
            </label>
            <input
              type="text"
              name="image"
              value={value.email}
              onChange={handleChange}
              className="mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Password:
            </label>
            <input
              type="text"
              name="image"
              value={value.password}
              onChange={handleChange}
              className="mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Image:
            </label>
            <input
                  type="file"
                  name="profile"
                  onChange={handleChange}
                  
                  accept="image/*"
                  className="mt-1 p-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter image URL"
                />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="py-2 px-4 bg-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2 px-4 bg-primary text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </>
      
      </div>
    </div>
  );
};

export default EditCard;
