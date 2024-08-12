import React from "react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../utilities/axiosInstance";
const UserDetails = ({ popup, setPopup, userDetail }) => {
  const handleApprove = async (role, id) => {
    try {
      let response;
      if (role == "organizer") {
        response = await axiosInstance.put("/organizers/approve", {
          org_id: id,
        });
      } else {
        response = await axiosInstance.put("/users/approve", {
          user_id: id,
        });
      }
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-40  bg-black bg-opacity-75 pt-8 pb-8">
      <div className="bg-white px-8 pb-3  rounded-lg shadow-lg  w-full h-full max-w-md overflow-scroll ">
        {userDetail.length > 0 ? (
          <div>
            <div className="flex justify-between items-center sticky top-0 bg-white z-20">
              <h1 className="text-xl font-bold mb-2 text-primary pt-2 ">
                USER DETAIL
              </h1>
              <span
                onClick={() => setPopup(!popup)}
                className=" bg-grey text-red rounded hover:cursor-pointer hover: text-2xl"
              >
                <IoClose />
              </span>
            </div>
            {userDetail.map((data, index) => (
              <div key={index}>
               

                {data.user_role === "organizer" && (
                  <div>
                    <p>
                      <span className="font-bold">Org ID:</span> {data.org_id}
                    </p>
                    <p>
                      <span className="font-bold">Full Name:</span>{" "}
                      {data.full_name}
                    </p>
                    <p>
                      <span className="font-bold">Email ID:</span> {data.email}
                    </p>
                    <div className="flex justify-between">
                      <p>
                        <span className="font-bold">Country Code:</span>{" "}
                        {data.country_code}
                      </p>
                      <p>
                        <span className="font-bold">Mobile No:</span>{" "}
                        {data.mobile}
                      </p>
                    </div>
                    <p>
                      <span className="font-bold">College Name: </span>
                      {data.college_name}
                    </p>
                    <p>
                      <span className="font-bold">College Code:</span>{" "}
                      {data.college_code}
                    </p>
                    <p>
                      <span className="font-bold">Location: </span>
                      {data.location}
                    </p>
                    <div className="flex ">
                      <p>
                        <span className="font-bold">Longitude:</span>{" "}
                        {data.longitude}
                      </p>
                      <p>
                        <span className="font-bold pl-5">Latitude: </span>
                        {data.latitude}
                      </p>
                    </div>
                    <p>
                      <span className="font-bold">Created At:</span>{" "}
                      {data.created_at}
                    </p>
                    {data.verified_status !== "pending" && (
                      <>
                        <p>
                          <span className="font-bold">Approved At:</span>
                          {data.approved_at}
                        </p>
                        <p>
                          <span className="font-bold">Approved By:</span>
                          {data.approved_by}
                        </p>
                      </>
                    )}
                    <div className="flex justify-start">
                      <p>
                        <span className="font-bold">Role:</span>{" "}
                        {data.user_role}
                      </p>
                      <p className="">
                        <span className="font-bold pl-6 bg-white">
                          Status:{" "}
                        </span>
                        {data.verified_status}
                      </p>
                    </div>
                    {data.reason !== "no reason" && (
                      <p>
                        <span className="font-bold">Reason:</span> {data.reason}
                      </p>
                    )}
                    <p>
                      <span className="font-bold">ID Card:</span>
                    </p>
                    <a
                      href={`http://localhost:3000/org_noc/${data.noc}`}
                      download
                      className="text-blue-500 underline"
                    >
                      Download NOC
                    </a>

                    <div className="flex img">
                      <img
                        src={`http://localhost:3000/verified_user/${data.id_card[0]}`}
                        alt=""
                      />
                      <img
                        src={`http://localhost:3000/verified_user/${data.id_card[1]}`}
                        alt=""
                      />
                    </div>
                    <div className="mt-4 flex justify-center">
                      {data.verified_status === "pending" && (
                        <>
                          <button className="bg-primary text-white px-4 py-2 rounded mr-2">
                            Approve
                          </button>
                          <button className="bg-red text-white px-4 py-2 rounded">
                            Reject
                          </button>
                        </>
                      )}
                      {data.verified_status === "active" && (
                        <button
                          onClick={() => handle(data.user_role, data.org_id)}
                          className="bg-red text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      )}
                      {data.verified_status === "rejected" && (
                        <button className="bg-primary text-white px-4 py-2 rounded">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                )}

                

                {data.user_role !== "organizer" && (
                  <div>
                    <p>
                      <span className="font-bold">User ID:</span> {data.user_id}
                    </p>
                    <p>
                      <span className="font-bold">Full Name:</span>{" "}
                      {data.full_name}
                    </p>
                    <p>
                      <span className="font-bold">Email ID:</span> {data.email}
                    </p>
                    <div className="flex justify-between">
                      <p>
                        <span className="font-bold">Country Code:</span>{" "}
                        {data.country_code}
                      </p>
                      <p>
                        <span className="font-bold">Mobile No:</span>{" "}
                        {data.mobile}
                      </p>
                    </div>

                    <p>
                      <span className="font-bold">Created At:</span>{" "}
                      {data.created_at}
                    </p>
                    {data.verified_status !== "pending" && (
                      <>
                        <p>
                          <span className="font-bold">Approved At:</span>
                          {data.approved_at}
                        </p>
                        <p>
                          <span className="font-bold">Approved By:</span>
                          {data.approved_by}
                        </p>
                      </>
                    )}
                    <div className="flex justify-start">
                      <p>
                        <span className="font-bold">Role:</span>{" "}
                        {data.user_role}
                      </p>
                      <p className="">
                        <span className="font-bold pl-6 bg-white">Status:</span>
                        {data.verified_status}
                      </p>
                    </div>
                    {data.reason !== "no reason" && (
                      <p>
                        <span className="font-bold">Reason:</span> {data.reason}
                      </p>
                    )}
                    <p>
                      <span className="font-bold">ID Card:</span>
                    </p>

                    <div className="flex img">
                      <img
                        src={`http://localhost:3000/verified_user/${data.id_card[0]}`}
                        alt=""
                      />
                      <img
                        src={`http://localhost:3000/verified_user/${data.id_card[1]}`}
                        alt=""
                      />
                    </div>
                    <div className="mt-4 flex justify-center">
                      {data.verified_status === "pending" && (
                        <>
                          <button className="bg-primary text-white px-4 py-2 rounded mr-2">
                            Approve
                          </button>
                          <button className="bg-red text-white px-4 py-2 rounded">
                            Reject
                          </button>
                        </>
                      )}
                      {data.verified_status === "active" && (
                        <button
                          onClick={() => handle(data.user_role, data.org_id)}
                          className="bg-red text-white px-4 py-2 rounded"
                        >
                          Reject
                        </button>
                      )}
                      {data.verified_status === "rejected" && (
                        <button className="bg-primary text-white px-4 py-2 rounded">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
