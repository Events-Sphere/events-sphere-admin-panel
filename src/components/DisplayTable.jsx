import React from "react";
const DisplayTable = ({ title, data, page, popup, setPopup,popupEdit, setPopupEdit, setUserId }) => {
  const userTitle = [...title, "DETAIL"];
  const employeeTitle = [...title, "DETAIL", "EDIT"];

  const handleUserId = (id) => {
    console.log("idddd", id);
    setPopup(!popup);
    setUserId(id);
  };
  const handleUserEdit = (id) => {
    console.log("emp", id);
    setUserId(id);
    setPopupEdit(!popupEdit);
    
  };
  return (
    <div className=" p-4 container">
      <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg">
        <thead className="">
          <tr className="bg-dark-blue text-white">
            {
              data && userTitle.includes("user_id")
                ? userTitle.map((key, index) => (
                    <th
                      className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider"
                      key={index}
                    >
                      {key === "email"
                        ? key + ""
                        : key === "full_name"
                        ? key + ""
                        : key}
                    </th>
                  ))
                : employeeTitle.map((key, index) => (
                    <th
                      className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider"
                      key={index}
                    >
                      {key === "email"
                        ? key + ""
                        : key === "full_name"
                        ? key + ""
                        : key}
                    </th>
                  ))
            }
          </tr>
        </thead>
        <tbody className="">
          {data.map((item, index) =>
            item.user_id ? (
              <>
                <tr
                  className={`border-b ${
                    index % 2 === 0 ? "bg-grey" : "bg-light-gray"
                  }`}
                  key={index}
                >
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6">{item.user_id}</td>
                  <td className="py-4 px-6">{item.full_name}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.mobile}</td>
                  <td className="py-4 px-6">{item.role}</td>
                  <td
                    className={
                      item.verified_status === 0
                        ? "py-4 px-6  text-red-700 font-semibold  text-center"
                        : "py-4 px-6  text-green-700 font-semibold rounded-lg text-center"
                    }
                  >
                    {item.verified_status === 0 ? "Unverified" : "Verified"}
                  </td>
                  <td className=" text-center text-1xl ">
                    {item.verified_status === 1 ? (
                      <button
                        className="bg-blue text-white py-1 px-4 rounded"
                        onClick={() => handleUserId(item.user_id)}
                      >
                        view
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserId(item.user_id)}
                        className="bg-red text-white py-1 px-4 rounded"
                      >
                        view
                      </button>
                    )}
                  </td>{" "}
                </tr>
              </>
            ) : (
              <>
                <tr
                  className={`border-b ${
                    index % 2 === 0 ? "bg-grey" : "bg-light-gray"
                  }`}
                  key={index}
                >
                  <td className="py-4 px-6">{item.id}</td>
                  <td className="py-4 px-6">{item.emp_id}</td>
                  <td className="py-4 px-6">{item.full_name}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">{item.mobile}</td>
                  <td className=" text-center text-1xl ">
                    <button
                      className="bg-blue text-white py-1 px-4 rounded"
                      onClick={() => handleUserId(item.emp_id)}
                    >
                      view
                    </button>
                  </td>
                  <td className=" text-center text-1xl ">
                    <button
                      className="bg-blue text-white py-1 px-4 rounded"
                      onClick={() => handleUserEdit(item.emp_id)}
                    >
                      EDIT
                    </button>
                  </td>{" "}
                </tr>
              </>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
