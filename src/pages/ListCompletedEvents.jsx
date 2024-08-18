import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Search from "../components/Search";
import axiosInstance from "../utilities/axiosInstance";
import Config from "../App/service/config";
import ClipLoader from "react-spinners/ClipLoader";
import Paginate from "../components/Paginate";

const ListCompletedEvents = () => {
  const [data, setData] = useState([]);
  const [totalPage, setTotalPage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(3);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState([]);

  const getMainEvent = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        Config.mainEventCompleted +
          `?page=${page}&search=${search}&location=${location}&limit=${limit}`
      );
      console.log(response);
      setData(response.data.data.eventData);
      setTotalPage(response.data.data.totalPage);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const district = [
    "Ariyalur",
    "Chengalpattu",
    "Chennai",
    "Coimbatore",
    "Cuddalore",
    "Dharmapuri",
    "Dindigul",
    "Erode",
    "Kallakurichi",
    "Kancheepuram",
    "Karur",
    "Krishnagiri",
    "Madurai",
    "Mayiladuthurai",
    "Nagapattinam",
    "Kanniyakumari",
    "Namakkal",
    "Perambalur",
    "Pudukottai",
    "Ramanathapuram",
    "Ranipet",
    "Salem",
    "Sivagangai",
    "Tenkasi",
    "Thanjavur",
    "Theni",
    "Thiruvallur",
    "Thiruvarur",
    "Thoothukudi",
    "Trichirappalli",
    "Thirunelveli",
    "Tirupathur",
    "Tiruppur",
    "Tiruvannamalai",
    "The Nilgiris",
    "Vellore",
    "Viluppuram",
    "Virudhunagar",
  ];
  console.log(location);
  const handleLocation = (e) => {
    console.log("start");

    const value = e.target.value;
    if (location.includes(value)) {
      const newLocation = location.filter((data) => data != value);
      setLocation(newLocation);
    } else {
      setLocation([...location, value]);
    }
  };

  useEffect(() => {
    getMainEvent();
  }, [search, page, location]);
  return (
    <div>
      <h1>COMPLETED EVENTS</h1>
      <div className="flex">
        <Search
          placeholder="🔍 Search user"
          type="text"
          setSearch={setSearch}
          search={search}
        />
        <div className="relative group w-12">
          <div className="bg-white  w-12">select</div>
          <div className="absolute hidden group-hover:block bg-white w-80 max-h-80 overflow-scroll">
            <ul className="grid grid-template-columns:1fr 1fr">
              {district.map((data, index) => (
                <li key={index} className="px-1">
                  <input
                    type="checkbox"
                    value={data}
                    onChange={handleLocation}
                  />
                  {data}
                </li>
              ))}
            </ul>
          </div>
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
          <EventCard data={data} />
          <Paginate totalPage={totalPage} page={page} setPage={setPage} />
        </div>
      ) : (
        <div className="flex justify-center text-2xl mt-40">No data found</div>
      )}
    </div>
  );
};

export default ListCompletedEvents;
