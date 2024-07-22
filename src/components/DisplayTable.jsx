import React from "react";
const DisplayTable = ({ title, data, page }) => {
  return (
    <table className="border-2 border-b-dark-blue">
      <thead>
        <tr className="border-b-2 border-b-dark-blue">
          {title.map((key, index) => (
            <th className="py-2 px-5" key={index}>
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="">
        {data.map(
          (data, index) => (
            <tr className=" border-b-dark-blue shadow-md table-td" key={index}>
              <td>{data.Id}</td>
              <td>{data.UserId}</td>
              <td>{data.Name}</td>
              <td>{data.Email}</td>
              <td>{data.Mobile}</td>
              <td>{data.Role}</td>
              <td>{data.V_status}</td>
            </tr>
          )
        )}
      </tbody>
    </table>
  );
};

export default DisplayTable;
