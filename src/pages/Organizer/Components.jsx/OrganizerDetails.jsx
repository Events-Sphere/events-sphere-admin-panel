const OrganizerDetails = ({ setModelType, singleUserData: data }) => {
    return (
        <>
            {
                (data !== null && data.length > 0) && (
                    <div className="fixed inset-0 z-50 flex items-center pl-[15%] justify-center bg-black bg-opacity-40 backdrop-blur-sm">
                        <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl text-left space-y-6">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-blue-600">User Information</h2>
                                <div className="absolute top-0 right-0 h-[40px] w-[40px] bg-[#78281f] flex items-center justify-center text-white font-bold text-2xl cursor-pointer rounded-bl rounded-tr hover:bg-[#ec7063]"
                                    onClick={()=>setModelType(null)}
                                > X </div>                                
                            </div>

                            {/* Profile Info */}
                            <div className="flex items-center gap-6">
                                <img
                                    src={`${Config.orgIdCardImgBaseUrl}${data[0].profile || ""}`}
                                    alt="Profile"
                                    className="w-24 h-24 rounded-lg border border-gray-300 object-cover shadow-sm"
                                />
                                <div>
                                    <div className="flex gap-3">
                                    <h3 className="text-xl font-semibold text-gray-800">{data[0].name}</h3>
                                    <span className={`text-sm px-3 py-1 rounded-md flex items-center gap-1 ${
                                    data[0].status === "active"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                }`}>
                                    {data[0].status === "active" ? <MdVerified /> : <MdCancel />}
                                    {data[0].status}
                                </span>
                                    </div>
                                    <p className="text-sm text-gray-500 flex items-center gap-2"><MdEmail className="text-blue-500" /> {data[0].email}</p>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Contact Info</h4>
                                <div className="flex items-center gap-3 text-gray-700">
                                    <IoCallOutline className="text-green-600" />
                                    <p className="text-md font-medium">
                                        {data[0].c_code}-{data[0].mobile}
                                    </p>
                                </div>
                            </div>

                            {/* Meta Info */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Meta Info</h4>
                                <div className="grid grid-cols-2 gap-4 text-gray-600 text-sm">
                                    <p><span className="font-semibold text-gray-800">User ID:</span> {data[0]._id}</p>
                                    <p><span className="font-semibold text-gray-800">Approver ID:</span> {data[0].approvedBy}</p>
                                    <p><span className="font-semibold text-gray-800">Approved At:</span> {new Date(data[0].approvedAt).toLocaleString()}</p>
                                    <p><span className="font-semibold text-gray-800">Requested At:</span> {new Date(data[0].requestedAt).toLocaleString()}</p>
                                    <p><span className="font-semibold text-gray-800">Created At:</span> {new Date(data[0].createdAt).toLocaleString()}</p>
                                    <p><span className="font-semibold text-gray-800">Bookings:</span> {data[0].bookings}</p>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-700 mb-2">Location</h4>
                                <div className="flex items-center gap-2 text-gray-700 mb-2">
                                    <MdLocationPin className="text-red-500" />
                                    <p>{data[0].location}</p>
                                </div>
                                <iframe
                                    src={`https://www.google.com/maps?q=${data[0].latitude},${data[0].longitude}&z=15&output=embed`}
                                    width="100%"
                                    height="180"
                                    className="rounded-md border"
                                    loading="lazy"
                                ></iframe>
                            </div>

                            {/* Footer */}
                            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                                <a
                                    href="#"
                                    className="px-4 py-2 border border-blue-500 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
                                >
                                    Open PDF
                                </a>
                                {data[0].denial_reason && (
                                    <p className="text-red-600 text-sm font-medium">
                                        Reason for denial: {data[0].denial_reason}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );
};


export default OrganizerDetails;