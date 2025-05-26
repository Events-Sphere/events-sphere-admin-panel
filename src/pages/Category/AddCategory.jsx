import React, { useState } from "react";
import { useAddCategoryMutation } from "../../App/Features/Api/categoryApiSlice";
import { toast, Bounce } from "react-toastify";

const AddCategory = () => {
  const [formData, setFormData] = useState({
    category_name: "",
    category_img: null,
  });

  const [addCategory] = useAddCategoryMutation();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "category_img") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    data.append("categoryName", formData.category_name);
    if (formData.category_img) {
      data.append("file", formData.category_img);
    }
    try {
      const response = await addCategory(data).unwrap();
      if (response.status === true) {
        toast.success(response.message ?? "category created successfully", {
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
        toast.warning(response.message, {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error(error.data?.message || "Something went wrong. try again!", {
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
    } finally {
      setLoading(false);
      setFormData({
        category_name: "",
        category_img: null,
      });
    }
  };

  return (
    <div className="flex justify-center  h-[100vh] items-center   ">
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className="w-full text-black max-w-lg p-8  rounded-lg  bg-white  shadow-md"
      >
        <h2 className="text-3xl font-bold text-txt-color mb-6 text-start">
          ADD MORE CATEGORY
        </h2>
        <div className="space-y-6">
          <div className="flex flex-col">
            <label className="font-semibold text-black">Category Name:</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="mt-2 p-3 border  rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue"
              placeholder="eg. science"
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-black">Category Image:</label>
            <div className=" mt-2 flex items-center justify-center p-2 border-2 border-dashed border-black rounded-lg hover:border-blue transition">
              <label className="flex h-[25vh] w-full flex-col items-center justify-center  cursor-pointer">
                {formData.category_img ? (
                  <img
                    src={URL.createObjectURL(formData.category_img)}
                    alt="category-img"
                    className="w-full h-full object-cover rounded-lg overflow-hidden"
                  />
                ) : (
                  <>
                    <svg
                      className="w-10 h-10 text-black"
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
                    <span className="text-sm text-black">
                      Click here to select a image
                    </span>
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

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 flex align-middle justify-center gap-2 ${
              loading ? "bg-btn-color opacity-35 " : "bg-btn-color"
            }  text-white font-semibold rounded-lg shadow hover:bg-primary-dark transition`}
          >
            {loading && (
              <div className="flex items-center justify-center">
                <div className="h-6 w-6 border-4 border-t-[#640D5F] border-[#A888B5] rounded-full animate-spin"></div>
              </div>
            )}
            <span>Add Category</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
