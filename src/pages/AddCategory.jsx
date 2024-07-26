import React, { useState } from 'react';
import { useAddCategoryMutation } from '../App/Features/Api/categoryApiSlice';

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category_name: '',
    category_img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'category_img') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [addCategory ]  = useAddCategoryMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('category_name', formData.category_name);
    if (formData.category_img) {
      data.append('category_img', formData.category_img);
    }

    try {
      const response = await addCategory(data).unwrap();
      console.log(response);

      if (response.status === true) {
        alert(response.message);
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(error.data?.message || 'An error occurred');
    } finally {
      setFormData({
        category_name: '',
        category_img: null,
      });
    }
  };

  return (
    <div className="flex justify-center h-[100vh] items-center  bg-[url('../../public/bg.jpg')] bg-cover bg-no-repeat">
      <form onSubmit={handleSubmit} autoComplete="off" className="w-full max-w-lg p-8 backdrop-filter backdrop-blur-lg bg-opacity-30 rounded-lg shadow-lg  border-2 border-sky-blue">
        <h2 className="text-3xl font-bold text-sky-blue mb-6 text-center">Add Category</h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-semibold text-white">Category Name:</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="mt-2 p-3 border border-grey rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="Enter category name"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-grey">Category Image:</label>
            <div className="mt-2 flex items-center justify-center p-4 border-2 border-dashed border-grey rounded-lg hover:border-blue transition">
              <label className="flex flex-col items-center justify-center w-full h-32 cursor-pointer">
                {formData.category_img ? (
                  <span className="text-sm text-white">{formData.category_img.name}</span>
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-grey"
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
                    <span className="text-sm text-grey">Click to select a file</span>
                  </>
                )}
                <input
                  type="file"
                  name="category_img"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full py-3 bg-white text-blue font-semibold rounded-lg shadow hover:bg-blue hover:text-white transition"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
