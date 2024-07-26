import React from "react";
const DisplayTable = ({ title, data, page }) => {
  return (
    <div className="overflow-x-hidden p-4 container">
      <table className="w-full bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-dark-blue text-white">
            {title.map((key, index) => (
              <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider" key={index}>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr className={`border-b ${index % 2 === 0 ? 'bg-grey' : 'bg-light-gray'}`} key={index}>
              <td className="py-4 px-6">{item.Id}</td>
              <td className="py-4 px-6">{item.UserId}</td>
              <td className="py-4 px-6">{item.Name}</td>
              <td className="py-4 px-6">{item.Email}</td>
              <td className="py-4 px-6">{item.Mobile}</td>
              <td className="py-4 px-6">{item.Role}</td>
              <td className={item.V_status === 0 ? "py-4 px-6  text-red-700 font-semibold  text-center" : "py-4 px-6  text-green-700 font-semibold rounded-lg text-center"}>
                {item.V_status === 0 ? 'Unverified' : 'Verified'}
              </td>  </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayTable;
