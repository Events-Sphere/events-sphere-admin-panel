import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Config from "../../App/service/config";
import axiosInstance from "../../utilities/axiosInstance";
import EventDetailCard from "../../components/EventDetailCard";
import { ClipLoader } from "react-spinners";
import NotFound from "../NotFound";
const EventDetail = () => {
  const location = useLocation();
  const id = location.state.id;
  const [loading, setLoading] = useState(false);
const[data,setData]=useState([])
  const handleSubevents = async () => {
    try {
      setLoading(true)
      console.log(id);
      const response = await axiosInstance.post(Config.subEvents, { id: id });
      console.log(response);
      setData(response.data.data)
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    handleSubevents();
  },[]);

  return (
    <div className="">
      {
        loading ?  <ClipLoader
        className="flex items-center self-center justify-center mt-[45vh] ml-[40vw]"
        loading={loading}
        color="#1312f2"
        speedMultiplier={3}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
      
      data.length > 0 ? 
      <div>
        <EventDetailCard data={data}/>
      </div> :
      <NotFound/>

      }
    </div>
  );
};

export default EventDetail;
