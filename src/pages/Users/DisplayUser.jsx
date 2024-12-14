import React, { useEffect, useState } from "react";
import DisplayTable from "../../components/DisplayTable";
import Paginate from "../../components/Paginate";
import Filter from "../../components/Filter";
import Search from "../../components/Search";
import axiosInstance from "../../utilities/axiosInstance";
import ClipLoader from "react-spinners/ClipLoader";
import UserDetails from "../../components/UserDetails";

const DisplayUser = ({ showMenu, setShowMenu }) => {
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [limit, setLimit] = useState(11);
  const [status, setStatus] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [userCategory, setUserCategory] = useState([]);
  const [popup, setPopup] = useState(false);
  const [userID, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const { data: allUsers, error } = useFetch(
    () =>
      axiosInstance.get(
        `admin/users?page=${page}&search=${search}&roles=${roles}&limit=${limit}&v_status=${status}`,
      ),
    [page, search, roles, limit, status],
  );

  useErrorHandling(error);

  const fetchUserDetail = async (userID) => {
    try {
      setLoadingDetail(true);
      const response = await axiosInstance.post(`/admin/users/single`, {
        user_id: userID,
      });
      const userValues = Object.values(response.data);
      setUserDetail(userValues[2] || null);
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    if (allUsers?.data?.length) {
      setData(allUsers.data);
      setTitle(Object.keys(allUsers.data[0] || {}));
      setTotalPage(allUsers.totalPage || 1);
      setUserCategory(allUsers.category || []);
    }
  }, [allUsers]);

  return (
    <div className="h-[100vh] overflow-x-hidden overflow-y-hidden">
      <div className="h-[15vh] shadow-md z-50 w-full flex justify-around items-center space-y-2 pl-10 pr-10">
        <Search
          placeholder="search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <Filter
          roles={roles}
          setRoles={setRoles}
          status={status}
          setStatus={setStatus}
          userCategory={userCategory}
        />
      </div>
      {loading ? (
        <div>
          <div
            className="grid ml-10 gap-x-1 border-b py-2 bg-bannar"
            style={{
              gridTemplateColumns: "1fr 1.5fr 2fr 3fr 2fr 2fr 1.5fr 2fr",
            }}
          >
            <div>ID</div>
            <div>USER ID</div>
            <div>EMAIL</div>
            <div>FULL NAME</div>
            <div>MOBILE</div>
            <div>ROLE</div>
            <div>VERIFIED STATUS</div>
            <div>DETAILS</div>
          </div>
          <div>
            {Array.from({ length: 10 }).map((_, index) => (
              <React.Fragment key={index}>{shimmerRow}</React.Fragment>
            ))}
          </div>
        </div>
      ) : data.length > 0 ? (
        <div>
          <DisplayTable
            getUserDetail={fetchUserDetail}
            data={data}
            page={page}
            setPage={setPage}
            title={title}
            popup={popup}
            setPopup={setPopup}
            setUserId={setUserId}
          />
        </div>
      ) : (
        <div className="h-screen w-full flex flex-col justify-center items-center">
          <div className="text-center">
            <img
              src="no_data.jpg"
              alt="No data found"
              className="h-[200px] w-[200px] mb-5 rounded-full"
            />
            <div className="text-3xl text-template-1 mb-8">Data not found</div>
            <button
              className="h-8 w-20 rounded-md border text-blue hover:bg-blue-100 self-center"
              onClick={() => setPage(1)}
            >
              Retry
            </button>
          </div>
        </div>
      )}
      {loadingDetail ? (
        <div className="flex justify-center items-center -mt-72">
          <ClipLoader loading={loadingDetail} color="#1312f2" size={50} />
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
      {data.length > 0 && !loading && (
        <div className="absolute bottom-0 left-[calc(100vw-54%)]">
          <Paginate totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      )}
    </div>
  );
};

export const useFetch = (apiCall, dependencies = []) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await apiCall();
        setData(response.data);
      } catch (err) {
        setError(err);
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { loading, data, error };
};

export const useErrorHandling = (error) => {
  useEffect(() => {
    if (error) {
      if (error.response?.status === 500) {
        alert("Check your internet connection.");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  }, [error]);
};

const shimmerRow = (
  <div
    className="grid ml-10  gap-x-1 border-b py-2 bg-white animate-pulse"
    style={{
      gridTemplateColumns: "1fr 1.5fr 2fr 3fr 2fr 2fr 1.5fr 2fr",
    }}
  >
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="h-10 bg-gray-300 rounded-md bg-light-gray"
        style={{ width: index === 3 ? "80%" : "60%" }}
      />
    ))}
  </div>
);

export default DisplayUser;
