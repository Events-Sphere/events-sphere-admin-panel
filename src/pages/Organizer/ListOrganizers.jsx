import React, { useEffect, useState } from "react";
import DisplayTable from "../../components/DisplayTable";
import Paginate from "../../components/Paginate";
import Filter from "../../components/Filter";
import NotFound from "../../pages/NotFound";
import Search from "../../components/Search";
import axiosInstance from "../../utilities/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import UserDetails from "../../components/UserDetails";
import OrganizerDetailCard from "./OrganizerDetailCard";
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
      const response = await axiosInstance.get(
        `admin/users?page=${page}&search=${search}&roles=${roles}&limit=${limit}&v_status=${status}`,
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
  return (
    <div className="h-screen ml-8 bg-white ">
      <div className="flex justify-between mt-10 mx-3 items-center ">
        <h1 className="heading text-txt-color">USERS LIST</h1>
        <Search
          className="h-10 w-[100%] ml-1 border-2 border-blue  rounded-lg p-2"
          placeholder="Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <div>
          {user.length > 0 && (
            <div className="flex">
              <h1 className="font-bold text-black">STATUS</h1>
              {user.map((user, index) => (
                <div className="px-2 flex align-middle " key={index}>
                  <input
                    className=""
                    type="checkbox"
                    id={user}
                    value={user}
                    onChange={handleStatus}
                  />
                  <label className="pl-1 text-black" htmlFor={user}>
                    {user === "true" ? "Verified" : "Unverified"}
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
          <div className="flex justify-center mt-4 ">
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
        </div>
      ) : (
        <NotFound />
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
          <OrganizerDetailCard
            popup={popup}
            setPopup={setPopup}
            userDetail={userDetail}
          />
        )
      )}

      {data.length > 0 && !loading && (
        <div className="absolute bottom-0 left-[calc(100vw-55%)]">
          <Paginate totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export default ListOrganizer;
