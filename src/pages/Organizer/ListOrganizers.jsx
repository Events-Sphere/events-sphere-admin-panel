import React, { useEffect, useState } from "react";
// import DisplayTable from "../../components/DisplayTable";
// import Paginate from "../../components/Paginate";
// import Filter from "../../components/Filter";
// import NotFound from "../../pages/NotFound";
// import Search from "../../components/Search";
import axiosInstance from "../../utilities/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import UserDetails from "../../components/UserDetails";
import OrganizerDetailCard from "./OrganizerDetailCard";
import UserEdit from "../Users/Components/UserEdit";
import UserFilterPanel from "../Users/Components/UserFilterPanel";
import UserTable from "../Users/Components/UserTable";
import UserPagination from "../Users/Components/UserPagination";
import UserTableRow from "../Users/Components/UserTableRow";
import OrganizerDetails from "./Components.jsx/OrganizerDetails";
const ListOrganizer = () => {
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
    const [active, setActive] = useState(false);
  const [modelType, setModelType] = useState(null);
  const [refresh, setRefresh] = useState(false);


  const handleStatus = (e) => {
    if (status.includes(e.target.value)) {
      const role = status.filter((data) => data != e.target.value);
      setStatus(role);
    } else {
      setStatus([...status, e.target.value]);
    }
  };
  const getAllUser = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `admin/organizers`,
        {
          "page": page,
          "search": search,
          "roles": roles,
          "limit": limit,
          "status": status,
        }
      );
      if (response.data.status == true && response.data.data) {
        setData(response.data.data.organizers);
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
      setLoadingDetail(true);
      console.log("function called", userID);
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
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [page, search, roles, limit, status]);

  const handleViewChange = async (_id) => {
    setModelType("view")
    getUserDetail(_id)
  }

  const handleEditChange = async (_id) => {
    setModelType("edit");
    getUserDetail(_id)
  }


  return (
       <div className="h-[100vh] overflow-x-hidden overflow-y-hidden">
      {
        modelType === "view" && (<OrganizerDetails setModelType={setModelType} singleUserData={userDetail} />)
      }
      {
        modelType === "edit" && (<UserEdit setModelType={setModelType} data={userDetail} setRefresh={setRefresh} />)
      }
      {
        loading && (
          <div className="h-screen w-full flex items-center justify-center">
            <ClipLoader size={80} />
          </div>

        )
      }
      <>
        <UserFilterPanel search={search} setSearch={setSearch} setStatus={setStatus} />
        <UserTable>
          {data && data.length > 0 ? (
            <UserTableRow
              user={data}
              active={active}
              setActive={setActive}
              handleViewChange={handleViewChange}
              handleEditChange={handleEditChange}
            />
          ) : (
            <div className="text-center text-gray-500 py-8 w-full">No users found.</div>
          )}
        </UserTable>
        <UserPagination totalPage={totalPage} page={page} setPage={setPage} />
      </>

    </div>
  );
};

export default ListOrganizer;
