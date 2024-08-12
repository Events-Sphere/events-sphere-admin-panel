import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import Paginate from "../components/Paginate";
import Filter from "../components/Filter";
import Search from "../components/Search";
import axiosInstance from "../utilities/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import UserDetails from "../components/UserDetails";
const DisplayUser = ({ showMenu, setShowMenu }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [limit, setLimit] = useState('');
  const [status,setStatus] = useState([]);
  const[sortColumn,setsortColumn]=useState('');
  const[userCategory,setUserCategory]=useState([]);
  const[popup,setPopup]=useState(false);
  const[userID,setUserId]=useState('');
  const[userDetail,setUserDetail]=useState([]);
  const[loading,setLoading]=useState(false);

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
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  };
  const getUserDetail = async () => {
    try {
      const response = await axiosInstance.post(
        `admin/users/single`,{user_id:userID}
      );
      console.log("response",response.data);
      if (response.data.status == true && response.data.data) {
        console.log(response.data.data)
        setUserDetail(response.data.data);
      }
    } catch (error) {
      if(error.response.status == 500){
        alert('Check internet connection')

      }
      
    }
  };

  useEffect(() => {
    getAllUser();
  }, [page, search, roles,limit,status]);

  // useEffect(() => {
  //   getUserDetail();
  // }, [popup]);

  return (
    <div className="h-[100vh] bg-white ">
      <h1 className="heading">USERS LIST</h1>
      {/* {
        loading ?
         (<div className="flex justify-center items-center mt-56">
          <ClipLoader
       className=""
       loading={loading}
       color="#1312f2"
       speedMultiplier={3}
       size={50}
       aria-label="Loading Spinner"
       data-testid="loader"
     />
       </div> ):
    ( data.length > 0 ? <div>data</div>:<div>NO data found</div>) :data.length > 0?
         
         
         
      } */}
      


{/* 
      <h1 className="heading text-white ">USERS LIST</h1>
      {loading && 
      <ClipLoader
        className="flex justify-center"
        loading={loading}
        color="#1312f2"
        speedMultiplier={3}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />}
      {
        popup && <div className="fixed  inset-0 z-50 flex items-center justify-center  bg-black bg-opacity-75">
        <UserDetails popup={popup} setPopup={setPopup} userDetail={userDetail}/>
   </div>
      }
      
      <div className="flex justify-around items-center ">
        <Search
          className="h-10 w-[30%] ml-1 border-2 border-blue  rounded-lg p-2"
          placeholder="🔍 Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <Filter roles={roles} setRoles={setRoles} status={status} setStatus={setStatus} userCategory={userCategory} />
      </div>
     
      <div className="border w-full mt-2 border-white "></div>
      <div className="">
        <select  value={limit} onChange={(e)=>setLimit(e.target.value)} >
        <option value='' disabled>select</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <>
      <div className="flex justify-center ">
        <DisplayTable data={data} page={page} setPage={setPage} title={title} popup={popup} setPopup={setPopup} setUserId={setUserId} />
      </div>
      <div className="mt-4 absolute bottom-[10%] left-[56%]">
        <Paginate totalPage={totalPage} page={page} setPage={setPage} />
      </div></> */}
     
    </div>
  );
};

export default DisplayUser;
