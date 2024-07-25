import React, { useEffect, useState } from "react";
import DisplayTable from "../components/DisplayTable";
import Paginate from "../components/Paginate";
import Filter from "../components/Filter";
import Search from "../components/Search";
import axiosInstance from "../utilities/axiosInstance";
const DisplayUser = ({ showMenu, setShowMenu }) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [title, setTitle] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [search, setSearch] = useState("");
  const [roles, setRoles] = useState([]);

  console.log(roles);

  const getAllUser = async () => {
    try {
      const response = await axiosInstance.get(
        `admin/get-all-users?page=${page}&search=${search}&roles=${roles}`
      );
      console.log(JSON.stringify(response, null, 2));
      if (response.data.success == true && response.data.data) {
        setData(response.data.data);
        setTitle(Object.keys(response.data.data[0]));
        setTotalPage(response.data.totalPage);
        console.log(Object.keys(response.data.data[0]));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUser();
  }, [page, search, roles]);
  // const keys = Object.keys(data[0]);

  return (
    <div className="">
      <h1 className="heading">USERS LIST</h1>
      <div className="flex justify-around items-center">
        <Search
          className="h-8 w-64 border-2 border-blue rounded p-2"
          placeholder="🔍 Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <Filter roles={roles} setRoles={setRoles} />
      </div>
      <div className="border w-full mt-2"></div>
      <div className="flex justify-center mt-4  ">
        <DisplayTable data={data} page={page} setPage={setPage} title={title} />
      </div>
      <div className="mt-4 absolute bottom-[10%] left-[56%]">
        <Paginate totalPage={totalPage} page={page} setPage={setPage} />
      </div>
    </div>
  );
};

export default DisplayUser;
