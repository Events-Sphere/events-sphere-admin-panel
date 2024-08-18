import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import Paginate from "../components/Paginate";
import Filter from "../components/Filter";
import Search from "../components/Search";
import axiosInstance from "../utilities/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import UserDetails from "../components/UserDetails";
const ListOrganizer = ({ showMenu, setShowMenu }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [user, setUser] = useState(["true", "false"]);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState("organizer");
  const [limit, setLimit] = useState("");
  const [status, setStatus] = useState([]);
  const [sortColumn, setsortColumn] = useState("");
  const [userCategory, setUserCategory] = useState([]);
  const [popup, setPopup] = useState(false);
  const [userID, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const handleStatus=(e)=>{
    if(status.includes(e.target.value)){
      const role=status.filter((data)=>data != e.target.value);
      setStatus(role);
    }
    else{
      setStatus([...status,e.target.value])
    }

  }
  const getAllUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `admin/users?page=${page}&search=${search}&roles=${roles}&limit=${limit}&v_status=${status}`
      );

      if (response.data.success == true && response.data.data) {
        setData(response.data.data);
        setTitle(Object.keys(response.data.data[0]));
        setTotalPage(response.data.totalPage);
        setUserCategory(response.data.category);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  const getUserDetail = async (userID) => {
    try {
      setLoadingDetail(true)
      console.log("function called",userID)
      const response = await axiosInstance.post(`/admin/users/single`, {
        user_id: userID,
      });
      console.log("response", response.data);
      if (response.data.status == true && response.data.data) {
        console.log(response.data.data);
        setUserDetail(response.data.data);
      }
    } catch (error) {
      if (error.response.status == 500) {
        alert("Check internet connection");
      }
    }
    finally{
      setLoadingDetail(false)
    }
  };

  useEffect(() => {
    getAllUser();
  }, [page, search, roles, limit, status]);
  return (
    <div className="h-[100vh] bg-white ">
      <h1 className="heading ">USERS LIST</h1>
      <div className="flex justify-around items-center ">
        <Search
          className="h-10 w-[100%] ml-1 border-2 border-blue  rounded-lg p-2"
          placeholder="🔍 Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <div>
        {user.length > 0 && (
        <div className="flex">
          <h1 className="font-bold text-black">STATUS:</h1>
          {user.map((user, index) => (
            <div className="px-2 flex align-middle " key={index}>
              <input className="" type="checkbox" id={user} value={user} onChange={handleStatus} />
              <label className="pl-1 text-black" htmlFor={user}>
                {user === 'true'?'Verified':'Unverified'}
              </label>
            </div>
          ))}
        </div>
      )}
        </div>
      </div>
      {loading ? (
        <div className="flex justify-center items-center mt-56">
          <ClipLoader
            className=""
            loading={loading}
            color="#1312f2"
            speedMultiplier={3}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : data.length > 0 ? (
        <div>
          
          <div className="border-black border-2 inline-block ml-4">
            <select value={limit} onChange={(e) => setLimit(e.target.value)}>
              <option value="" disabled>
                select
              </option>
              <option value="10">10</option>
              
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="flex justify-center ">
            <DisplayTable
              getUserDetail={getUserDetail}
              data={data}
              page={page}
              setPage={setPage}
              title={title}
              popup={popup}
              setPopup={setPopup}
              setUserId={setUserId}
            />
          </div>
          <div className="">
            <Paginate totalPage={totalPage} page={page} setPage={setPage} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-2xl mt-40">No data found</div>
      )}
      {
        loadingDetail ?(
          <div className="flex justify-center items-center -mt-72">
            <ClipLoader
              className=""
              loadingDetail={loadingDetail}
              color="#1312f2"
              speedMultiplier={3}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ): popup && (
          <UserDetails
            popup={popup}
            setPopup={setPopup}
            userDetail={userDetail}
          />
        )
      }
    </div>
  );
};

export default ListOrganizer;
