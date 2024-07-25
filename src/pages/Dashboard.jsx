import React from "react";
import { MdEvent } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";
import {LineChart,Line, XAxis, YAxis,CartesianGrid,Tooltip,Legend,BarChart,Bar} from "recharts";

const Dashboard = () => {
  const data = [
    {
      title: "Total Users",
      numbers: "600",
      icons: <FiUsers />,
    },
    {
      title: "Total Organizer",
      numbers: "120",
      icons: <GoOrganization />,
    },
    {
      title: "Total Events",
      numbers: "20",
      icons: <MdEvent />,
    },
    {
      title: "Total Completed Events",
      numbers: "60",
      icons: <MdEvent />,
    },
    {
      title: "Total Cancelled Events",
      numbers: "60",
      icons: <MdEvent />,
    },
  ];

   const userDemographicsData = [
    { year: "2019", count: 100 },
    { year: "2020", count: 200 },
    { year: "2021", count: 300 },
    { year: "2022", count: 250 },
    { year: "2023", count: 150 },
  ];
  
   const eventsBookedData = [
    { year: "2019", count: 100 },
    { year: "2020", count: 200 },
    { year: "2021", count: 150 },
    { year: "2022", count: 250 },
    { year: "2023", count: 300 },
  ];

  

  return (
    <div className="pt-1 px-4 w-full">
      <div>
        <h1 className="heading">DASHBOARD</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {data.map((data , index) => (
          <div key={index} className="flex justify-between items-center  bg-white p-2 px-4 rounded shadow-lg hover:scale-105 w-56">
            <div className="flex flex-col  text-center gap-2">
              <span className="flex flex-wrap">{data.title}</span>
              <span span className="text-xl font-bold">
                {data.numbers}
              </span>
            </div>
            <span className="bg-grey p-4 text-xl rounded-full">
              {data.icons}
            </span>
          </div>
        ))}
      </div>


      <div className="sm:grid sm:grid-cols-2 sm:gap-8 mt-6 flex flex-col gap-2 sm:px-4">
        {/* user's Demographics */}
        <div className="bg-white p-4 rounded-lg shadow-md overflow-hidden ">
          <h3 className="text-lg font-semibold mb-4">User's Demographics</h3>
          <LineChart width={450} height={300} data={userDemographicsData}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
 

        {/* Events bookings */}
        <div className=" bg-white p-4 rounded-lg shadow-md overflow-hidden">
          <h3 className="text-lg font-semibold mb-4">Events bookings</h3>
          <BarChart  width={450} height={300}  data={eventsBookedData}>
            <XAxis dataKey="year" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#829232" />
          </BarChart>
        </div>
      </div>
        </div>
  
  );
};

export default Dashboard;
