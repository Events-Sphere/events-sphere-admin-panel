import React from "react";
import { MdEvent } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { GoOrganization } from "react-icons/go";

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
  return (
    <div className="pt-1 px-4 w-full">
      <div>
        <h1 className="heading">DASHBOARD</h1>
      </div>
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {data.map((data) => (
          <div className="flex justify-between items-center  bg-white p-2 px-4 rounded shadow-lg hover:scale-105 w-56">
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
    </div>
  );
};

export default Dashboard;
