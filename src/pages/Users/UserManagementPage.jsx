import { ClipLoader } from "react-spinners";
import UserActions from "./Components/UserActions";
import UserFilterPanel from "./Components/UserFilterPanel";
import UserPagination from "./Components/UserPagination";
import UserTable from "./Components/UserTable";
import UserTableRow from "./Components/UserTableRow";
import { useEffect, useState } from "react";
import axiosInstance from "../../utilities/axiosInstance";
import UserDetails from "./Components/UserDetails";
import UserEdit from "./Components/UserEdit";
import NotFound from "../NotFound";

const UserManagementPage = () => {
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([{}]);
  const [title, setTitle] = useState([]);
  const [totalPage, setTotalPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [popup, setPopup] = useState(false);
  const [userID, setUserId] = useState("");
  const [userDetail, setUserDetail] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [active, setActive] = useState(false);
  const [modelType, setModelType] = useState(null);
  const [refresh, setRefresh] = useState(false);


  const { data: allUsers, error } = useFetch(
    () =>
      axiosInstance.post(
        `admin/users`,
        {
          "status": status,
          "limit": limit,
          "search": search,
          "page": page,
          "roles": roles,
        }
      ),
    [page, search, roles, limit, status, refresh],
  );

  useErrorHandling(error);

  const fetchUserDetail = async (userID) => {
    try {
      setLoadingDetail(true);
      const response = await axiosInstance.post(`/admin/users/single`, {
        _id: userID,
      });
      const userValues = Object.values(response.data);
      setUserDetail(userValues[1].users || null);
    } catch (err) {
      console.error("Error fetching user details:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (allUsers?.status) {
      setData(allUsers.data.users);
      setTotalPage(allUsers.data.totalPage || 1);
      setLoading(false);
    }
  }, [allUsers]);

  const handleViewChange = async (_id) => {
    setActive(!active);
    setModelType("view")
    fetchUserDetail(_id)
  }

  const handleEditChange = async (_id) => {
    setActive(!active);
    setModelType("edit");
    fetchUserDetail(_id)
  }

  return (
    <div className="h-[100vh] overflow-x-hidden overflow-y-hidden">
      {
        modelType === "view" && (<UserDetails setModelType={setModelType} singleUserData={userDetail} />)
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


export default UserManagementPage;
