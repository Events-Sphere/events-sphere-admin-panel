import React, { useState, useEffect } from "react";
import axiosInstance from "../utilities/axiosInstance";
import Config from "../App/service/config";

const CategoriesList = () => {
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
const[id,setId]=useState(null)
  const [image, setImage] = useState(null);
  const getCategory = async () => {
    try {
      const response = await axiosInstance.get(Config.getAllEventCategory);
      console.log("response", response.data);
      if (response.data.status == true && response.data.data) {
        console.log(response.data.data);
        setCategory(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (category) => {
    setName(category.name);
    setImage(category.image);
    setId(category.id)
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { files } = e.target;
    console.log(files[0]);
    setImage(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(name,image,id)
    const data = new FormData();
    data.append("name",name);
    data.append("category", image);
    data.append("id", id);
    
    try {
      const response = await axiosInstance.put(`admin/category`, data,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      } );
      console.log("response", response.data);
      if (response.data.status == true) {

        alert(response.data.message)
       
      }
    } catch (error) {
      console.log(error);
    }

    setIsModalOpen(false);
  };

  return (
    <div className=" container mx-auto p-6 h-screen bg-white ">
      <h2 className="text-2xl font-bold mb-4 text-black ">Categories List</h2>
      <div className="max-h-[32rem] overflow-y-scroll overflow-x-scroll flex justify-center">
        <table className="min-w-full  bg-white rounded-lg shadow">
          <thead className="sticky top-0">
            <tr className="bg-secondary text-white ">
              <th className="py-3 px-4 text-left">ID</th>
              <th className="py-3 px-4 text-left">Image</th>
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category) => (
              <tr key={category.id} className="border-b border-border">
                <td className="py-3 px-4">{category.id}</td>
                <td className="py-3 px-4">
                  <img
                    src={`https://event-backend-9.onrender.com/ev_category/${category.image}`}
                    alt=""
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{category.name}</td>
                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-accent hover:underline"
                  >
                    EDIT
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4 text-primary">
              Edit Category
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Category Name:
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter category name"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-semibold text-gray-700">
                  Category Image URL:
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
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
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesList;
