import { useState, useEffect } from 'react';
import axiosInstance from "../utilities/axiosInstance";


const DisplayUserVerification = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);


    const getAllUser = async () => {
        try {
            const response = await axiosInstance.get(
                `admin/get-all-users`
            );
            console.log(JSON.stringify(response, null, 2));
            if (response.data.success == true && response.data.data) {
                setData(response.data.data);
                setTitle(Object.keys(response.data.data[0]));
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllUser();
    }, []);
    // const keys = Object.keys(data[0]);


    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleApprove = () => {
        //<------- approve api call ----->
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        //<------- cancel api call ----->

        setIsModalOpen(false);
    };

    return (
        <div className="overflow-x-hidden p-4 container">
            <table className="w-full bg-white border border-grey shadow-lg rounded-lg overflow-hidden">
                <thead>
                    <tr className="bg-dark-blue text-white">
                        {title.map((key, index) => (
                            <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider" key={index}>
                                {key}
                            </th>
                        ))}
                        <th className="py-3 px-6 text-left font-semibold text-sm uppercase tracking-wider" >
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr className={`border-b ${index % 2 === 0 ? 'bg-grey' : 'bg-light-gray'}`} key={index}>
                            <td className="py-6 px-6">{item.Id}</td>
                            <td className="py-6 px-6">{item.UserId}</td>
                            <td className="py-6 px-6">{item.Name}</td>
                            <td className="py-6 px-6">{item.Email}</td>
                            <td className="py-6 px-6">{item.Mobile}</td>
                            <td className="py-6 px-6">{item.Role}</td>
                            <td className={`py-4 px-6 text-center font-semibold rounded-lg ${item.V_status === 0 ? 'text-red-700' : 'text-green-700'}`}>
                                {item.V_status === 0 ? 'Unverified' : 'Verified'}
                            </td>
                            <td className="py-4 px-6 text-center">
                                <button onClick={() => handleEdit(item)} className="text-accent hover:underline">
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                        <path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 19 6 L 24 11 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 17 8 L 5.2597656 19.740234 C 5.2597656 19.740234 6.1775313 19.658 6.5195312 20 C 6.8615312 20.342 6.58 22.58 7 23 C 7.42 23.42 9.6438906 23.124359 9.9628906 23.443359 C 10.281891 23.762359 10.259766 24.740234 10.259766 24.740234 L 22 13 L 17 8 z M 4 23 L 3.0566406 25.671875 A 1 1 0 0 0 3 26 A 1 1 0 0 0 4 27 A 1 1 0 0 0 4.328125 26.943359 A 1 1 0 0 0 4.3378906 26.939453 L 4.3632812 26.931641 A 1 1 0 0 0 4.3691406 26.927734 L 7 26 L 5.5 24.5 L 4 23 z"></path>
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed left-0 inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform scale-105">
                        <button onClick={handleClose} className="absolute top-4 right-4 text-grey hover:text-dark-gray">
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 30 30">
                                <path d="M15 13.586L26.293 2.293c0.391-0.391 1.023-0.391 1.414 0s0.391 1.023 0 1.414L16.414 15l11.293 11.293c0.391 0.391 0.391 1.023 0 1.414s-1.023 0.391-1.414 0L15 16.414l-11.293 11.293c-0.391 0.391-1.023 0.391-1.414 0s-0.391-1.023 0-1.414L13.586 15 2.293 3.707c-0.391-0.391-0.391-1.023 0-1.414s1.023-0.391 1.414 0L15 13.586z"></path>
                            </svg>
                        </button>
                        <h3 className="text-xl py-10 px-5 font-bold mb-4 text-primary">Approve or Cancel</h3>
                        <div className="flex justify-around">
                            <button onClick={handleApprove} className="py-2 px-4 bg-green-700 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition">
                                Approve
                            </button>
                            <button onClick={handleCancel} className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DisplayUserVerification;
