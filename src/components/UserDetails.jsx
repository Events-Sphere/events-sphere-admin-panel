import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import axiosInstance from "../utilities/axiosInstance";
import Config from "../App/service/config";
import { useNavigate } from "react-router-dom";
const UserDetails = ({ popup, setPopup, userDetail }) => {
  const navigate = useNavigate();
  const[reason,setReason]=useState(false);
  const[orgreason,setOrgReason]=useState(false);
  console.log(userDetail)
  const[value,setValue]=useState("");
  console.log(reason)
  const handleApprove = async (role, id) => {
    try {
      console.log(role, id);
      let response;
      if (role == "organizer") {
        response = await axiosInstance.put(Config.approveOrganizer, {
          org_id: id,
        });
      } else {
        response = await axiosInstance.put(Config.approveUser, {
          user_id: id,
        });
      }

      // navigate('/get-all-user')
      setPopup(!popup);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReject = async (role, id) => {
    try {
      console.log(role, id);
      let response;
      if (role == "organizer") {
        response = await axiosInstance.put(Config.rejectOrganizer, {
          org_id: id,
          reason:value
        });
      } else {
        response = await axiosInstance.put(Config.rejectUser, {
          user_id: id,
          reason:value
        });
      }

      // navigate('/get-all-user')
      setPopup(!popup);

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center w-full z-40  bg-black bg-opacity-75 pt-8 pb-8">
      <div className="bg-white px-8 pb-3  rounded-lg shadow-lg  w-full h-full max-w-md overflow-scroll relative ">
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
                          <button
                            onClick={() =>
                              handleApprove(data.user_role, data.org_id)
                            }
                            className="bg-primary text-white px-4 py-2 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button 
                          onClick={() =>
                            setOrgReason(!orgreason)
                          }
                          className="bg-red text-white px-4 py-2 rounded">
                            Reject
                          </button>
                        </>
                      )}
                      {data.verified_status === "active" && (
                        <button onClick={() =>
                          setOrgReason(!orgreason)
                        } className="bg-red text-white px-4 py-2 rounded">
                          Reject
                        </button>
                      )}
                      {data.verified_status === "rejected" && (
                        <button
                          onClick={() =>
                            handleApprove(data.user_role, data.org_id)
                          }
                          className="bg-primary text-white px-4 py-2 rounded"
                        >
                          Approve
                        </button>
                      )}
                      {
                  orgreason && <div className="bg-blue bottom-52 py-7 px-2 text-white absolute">
                    <label htmlFor="">Reason</label>
                    <input type="text" onChange={(e)=>setValue(e.target.value)} className="text-black" />
                    <div className="mt-2 flex justify-around">
                      <button className="bg-red text-white px-4 py-2 rounded" onClick={()=>setOrgReason(!orgreason)}>cancel</button>
                      <button className="bg-primary text-white px-4 py-2 rounded" onClick={() =>
                            handleReject(data.user_role, data.org_id)
                          }>confirm</button>
                    </div>
                    </div>
                }
                    </div>
                  </div>
                )}
               

                
                
                {data.role == "it_team" && (
                  <div>
                    <p>
                      <span className="font-bold">User ID:</span> {data.emp_id}
                    </p>
                    
                    <p>
                      <span className="font-bold">Email ID:</span> {data.email}
                    </p>
                    <p>
                      <span className="font-bold">Full Name:</span> {data.full_name}
                    </p>
                  
                    
                    <p>
                      <span className="font-bold">Mobile No:</span> {data.mobile}

                    </p>
                    {/* <img src={} alt="" /> */}

                    
                    <div className="mt-4 flex justify-center">
                     
                      
                      
                    </div>
                  </div>
                )}

{data.user_role == "student" && (
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
                          <button
                            onClick={() =>
                              handleApprove(data.user_role, data.user_id)
                            }
                            className="bg-primary text-white px-4 py-2 rounded mr-2"
                          >
                            Approve
                          </button>
                          <button onClick={() =>
                            setReason(!reason)
                          } className="bg-red text-white px-4 py-2 rounded">
                            Reject
                          </button>
                        </>
                      )}
                      {data.verified_status === "active" && (
                        <button onClick={() =>
                          setReason(!reason)
                        } className="bg-red text-white px-4 py-2 rounded">
                          Reject
                        </button>
                      )}
                      {data.verified_status === "rejected" && (
                        <button
                          onClick={() =>
                            handleApprove(data.user_role, data.user_id)
                          }
                          className="bg-primary text-white px-4 py-2 rounded"
                        >
                          Approve
                        </button>
                      )}
                       {
                  reason && <div className="bg-blue bottom-52 py-7 px-2 text-white absolute">
                    <label htmlFor="">Reason</label>
                    <input type="text" onChange={(e)=>setValue(e.target.value)} className="text-black" />
                    <div className="mt-2 flex justify-around">
                      <button className="bg-red text-white px-4 py-2 rounded" onClick={()=>setReason(!reason)}>cancel</button>
                      <button className="bg-primary text-white px-4 py-2 rounded" onClick={() =>
                            handleReject(data.user_role, data.user_id)
                          }>confirm</button>
                    </div>
                    </div>
                }
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
