import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import Paginate from "../components/Paginate";
import Filter from "../components/Filter";
import Search from "../components/Search";
import axiosInstance from "../utilities/axiosInstance";
import UserDetails from "../components/UserDetails";
import EditCard from "../components/EditCard";
const InternalTeamList = ({ showMenu, setShowMenu }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [limit, setLimit] = useState("");
  const [status, setStatus] = useState([]);
  const [sortColumn, setsortColumn] = useState("");
  const [userCategory, setUserCategory] = useState([]);
  const [popup, setPopup] = useState(false);
  const [popupEdit, setPopupEdit] = useState(false);
  const [userID, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [userDetailEdit, setUserDetailEdit] = useState([]);
  const[circle,setCircle]=useState(false);
  const[circles,setCircles]=useState(false);
  

  const getAllEmployee = async () => {
    try {
      const response = await axiosInstance.get(
        `admin/internal-teams?page=${page}&search=${search}&limit=${limit}`
      );
      if (response.data.status == true && response.data.data) {
        setData(response.data.data);
        setTitle(Object.keys(response.data.data[0]));
        setTotalPage(response.data.totalPage);
        setUserCategory(response.data.category);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const viewInternalTeam = async () => {
    try {
      const response = await axiosInstance.post(`admin/internal-teams/single`, {
        emp_id: userID,
      });
      if (response.data.status == true && response.data.data) {
        console.log("hiiiiiiii", response.data.data);
        setUserDetail(response.data.data);
        setCircles(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const editInternalTeam = async () => {
    try {
      const response = await axiosInstance.post(`admin/internal-teams/single`, {
        emp_id: userID,
      });
      if (response.data.status == true && response.data.data) {
        console.log("hiiiiiiii", response.data.data);
        setUserDetailEdit(response.data.data);
        setCircle(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllEmployee();
  }, [page, search, limit]);
  useEffect(() => {
    viewInternalTeam();
    
  }, [popup]);
  useEffect(() => {
    editInternalTeam();
    
  }, [popupEdit]);

  return (
    <div className="h-[100vh] w-[86vw] bg-white">
      <h1 className="heading text-black ">USERS LIST</h1>
      {
        popup ? (
          circles ? (<UserDetails
            popup={popup}
            setPopup={setPopup}
            userDetail={userDetail}
          />):(<p>..LOADING</p>)
        ):''
      }
      {popupEdit && circle &&  (
          <EditCard
            popupEdit={popupEdit}
            setPopupEdit={setPopupEdit}
            userDetailEdit={userDetailEdit}
            
          />
        
      )}

      <div className="flex justify-around items-center ">
        <Search
          className="h-10 w-[30%] ml-1 border-2 border-blue  rounded-lg p-2"
          placeholder="🔍 Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
      </div>

      <div className="border w-full mt-2 border-white "></div>
      <div className="">
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
          data={data}
          page={page}
          setPage={setPage}
          title={title}
          popup={popup}
          setPopup={setPopup}
          popupEdit={popupEdit}
          setPopupEdit={setPopupEdit}
          setUserId={setUserId}
        />
      </div>
      <div className="mt-4 absolute bottom-[10%] left-[56%]">
        <Paginate totalPage={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default InternalTeamList;
