import React, { useState } from "react";
import { IoCallOutline, IoClose } from "react-icons/io5";
import { toast, Bounce } from "react-toastify";
import Config from "../../../App/service/config";

const InternalTeamDetailCard = ({ popup, setPopup, userDetail }) => {
  const [reason, setReason] = useState("");
  const [showReasonInput, setShowReasonInput] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleAction = async (action, id) => {
    try {
      const endpoint = action === "approve" ? "approveEndpoint" : "rejectEndpoint";
      const payload = { user_id: id };
      if (action === "reject") payload.reason = reason;

      await axiosInstance.put(endpoint, payload);
      const successMessage = action === "approve" ? "User approved" : "User rejected";
      const toastType = action === "approve" ? "success" : "warning";

      toast[toastType](successMessage, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });

      setPopup(!popup);
    } catch (error) {
      toast.error("Something went wrong. Try again!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
        transition: Bounce,
      });
    } finally {
      setPopup(false);
    }
  };

  const renderUserInfo = (data) => (
    <div className="mb-4 select-none">
      <div className="flex items-center gap-4">
        <img
          src={`${Config.internalTeamImgBaseUrl}${data.profile}`}
          alt="No-Profile"
          className="w-20 h-20 rounded-md border-[1px] border-white-smoke"
        />
        <div>
          <h2 className="text-2xl text-txt-color font-semibold">{data.full_name}</h2>
          <p className="text-sm text-txt-color">{data.email}</p>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex items-center gap-1">
          <IoCallOutline color="green" />
          <span className="text-txt-color text-md font-semibold">{data.mobile}</span>
        </div>
        {data.role === "internal_team" && (
          <>
            <p>Employee ID: {data.emp_id}</p>
            <p>Role: {data.role}</p>
          </>
        )}
      </div>
    </div>
  );

  const renderActionButtons = (data) => (
    <div className="flex gap-4 mt-4">
      {data.verified_status === "pending" && (
        <>
          <button
            onClick={() => handleAction("approve", data.id)}
            className="bg-green-700 text-white px-4 py-2 rounded"
          >
            Approve
          </button>
          <button
            onClick={() => {
              setSelectedUser(data);
              setShowReasonInput(true);
            }}
            className="bg-red text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </>
      )}
      {data.verified_status === "rejected" && (
        <button
          onClick={() => handleAction("approve", data.id)}
          className="bg-green-700 text-white px-4 py-2 rounded"
        >
          Approve
        </button>
      )}
    </div>
  );

  return (
    <div className="fixed select-none inset-0 flex items-center justify-center bg-black bg-opacity-75 z-40">
      <div className="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative">
        <button
          onClick={() => setPopup(!popup)}
          className="absolute top-4 right-4 text-2xl"
        >
          <IoClose />
        </button>
        <h1 className="text-xl font-bold mb-6">User Details</h1>
        {userDetail.length > 0 ? (
          userDetail.map((data, index) => (
            <div key={index}>
              {renderUserInfo(data)}
              {renderActionButtons(data)}
            </div>
          ))
        ) : (
          <p>No user details available.</p>
        )}

        {showReasonInput && (
          <div className="mt-6">
            <label className="block mb-2">Reason for Rejection:</label>
            <input
              type="text"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  handleAction("reject", selectedUser.id);
                  setShowReasonInput(false);
                  setReason("");
                }}
                className="bg-red text-white px-4 py-2 rounded"
              >
                Submit
              </button>
              <button
                onClick={() => setShowReasonInput(false)}
                className="bg-white-smoke px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InternalTeamDetailCard;
