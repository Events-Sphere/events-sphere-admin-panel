import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import Paginate from "../components/Paginate";
import Filter from "../components/Filter";
import Search from "../components/Search";
import ClipLoader from "react-spinners/ClipLoader";
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
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [circles, setCircles] = useState(false);
const[loadingEdit,setLoadingEdit]=useState(false)
 
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
  const getUserDetail = async (userID) => {
    try {
      setLoadingDetail(true)
      const response = await axiosInstance.post(`admin/internal-teams/single`, {
        emp_id: userID,
      });
      if (response.data.status == true && response.data.data) {
        setUserDetail(response.data.data);
       
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoadingDetail(false)
    }
  };
  const viewInternalTeam = async () => {
    
  };
  const editInternalTeam = async (userId) => {
    try {
      console.log("------")
      setLoadingEdit(true)
      const response = await axiosInstance.post(`admin/internal-teams/single`, {
        emp_id: userId,
      });
      if (response.data.status == true && response.data.data) {
        setUserDetailEdit(response.data.data);
       
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoadingEdit(false)

    }
  };

  useEffect(() => {
    getAllEmployee();
  }, [page, search, limit]);
  // useEffect(() => {
  //   viewInternalTeam();
  // }, [popup]);
  // useEffect(() => {
  //   editInternalTeam();
  // }, [popupEdit]);

  return (
    <div className="h-[100vh] bg-white ">
      <h1 className="heading ">INTERNAL TEAM LIST</h1>
      <div className="flex justify-around items-center ">
        <Search
          className="h-10 w-[100%] ml-1 border-2 border-blue  rounded-lg p-2"
          placeholder="🔍 Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
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
              data={data}
              page={page}
              setPage={setPage}
              title={title}
              popup={popup}
              getUserDetail={getUserDetail}
              setPopup={setPopup}
              setUserId={setUserId}
              popupEdit={popupEdit}
              setPopupEdit={setPopupEdit}
              editInternalTeam={editInternalTeam}
            />
          </div>
          <div className="">
            <Paginate totalPage={totalPage} page={page} setPage={setPage} />
          </div>
        </div>
      ) : (
        <div className="flex justify-center text-2xl mt-40">No data found</div>
      )}
      {loadingDetail ? (
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
      ) : (
        popup && (
          <UserDetails
            popup={popup}
            setPopup={setPopup}
            userDetail={userDetail}
          />
        )
      )}

{loadingEdit ? (
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
      ) : (
        popupEdit && (
          <EditCard
                 popupEdit={popupEdit}
                 setPopupEdit={setPopupEdit}
                 userDetailEdit={userDetailEdit}
               />
        )
      )}
    </div>
    // <div className="h-[100vh]  bg-white">
    //   <h1 className="heading text-black ">USERS LIST</h1>
    //   {popup ? (
    //     circles ? (
    //       <UserDetails
    //         popup={popup}
    //         setPopup={setPopup}
    //         userDetail={userDetail}
    //       />
    //     ) : (
    //       <p>..LOADING</p>
    //     )
    //   ) : (
    //     ""
    //   )}
    //   {popupEdit && circle && (
    //     <EditCard
    //       popupEdit={popupEdit}
    //       setPopupEdit={setPopupEdit}
    //       userDetailEdit={userDetailEdit}
    //     />
    //   )}

    //   <div className="flex justify-around items-center ">
    //     <Search
    //       className="h-10 w-[120%] ml-1 border-2 border-blue  rounded-lg p-2"
    //       placeholder="🔍 Search user"
    //       type="text"
    //       setSearch={setSearch}
    //       search={search}
    //     />
    //   </div>

    //   <div className="border w-full mt-2 border-white "></div>
    //   <div className="">
    //     <select value={limit} onChange={(e) => setLimit(e.target.value)}>
    //       <option value="" disabled>
    //         select
    //       </option>
    //       <option value="10">10</option>
    //       <option value="20">20</option>
    //       <option value="50">50</option>
    //       <option value="100">100</option>
    //     </select>
    //   </div>

    //   <div className="flex justify-center ">
    //     <DisplayTable
    //       data={data}
    //       page={page}
    //       setPage={setPage}
    //       title={title}
    //       popup={popup}
    //       setPopup={setPopup}
    //       popupEdit={popupEdit}
    //       setPopupEdit={setPopupEdit}
    //       setUserId={setUserId}
    //     />
    //   </div>
    //   <div className="mt-4 absolute bottom-[10%] left-[56%]">
    //     <Paginate totalPage={totalPage} page={page} setPage={setPage} />
    //   </div>
    // </div>
  );
};

export default InternalTeamList;
