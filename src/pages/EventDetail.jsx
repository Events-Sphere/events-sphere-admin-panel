import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Config from "../App/service/config";
import axiosInstance from "../utilities/axiosInstance";
import EventDetailCard from "../components/EventDetailCard";
import { ClipLoader } from "react-spinners";
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
    <div>
      {
        loading ?  <ClipLoader
        className=""
        loading={loading}
        color="#1312f2"
        speedMultiplier={3}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />:
      
      data.length > 0 ? 
      <div>
        <h1>SUB EVENTS</h1>
        <EventDetailCard data={data}/>
      </div> :
      <div>NO DATA</div>

      }
    </div>
  );
};

export default EventDetail;
