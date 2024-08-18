import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { RiMenuFold4Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../App/Features/Auth/authSlice";
import { useSelector } from "react-redux";

import Config from "../App/service/config";

const SideMenuBar = ({ showMenu, setShowMenu }) => {
  const [selected, setSelected] = useState(null);
  const toggle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  const general = [
    {
      selector: "Dashboard",
      initialIcon: <MdOutlineHome />,
      endIcon: <RiArrowDropDownLine />,
      link: "/dashboard",
      options: [
        {
          value: "",
          link: "",
        },
      ],
    },
    {
      selector: "Category",
      initialIcon: <RiMenuFold4Line />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        {
          value: "Add Category",
          link: "/add-category",
        },
        {
          value: "List Category",
          link: "/categories-list",
        },
      ],
    },
    {
      selector: "Users",
      initialIcon: <FiUsers />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        {
          value: "List Users",
          link: "/get-all-user",
        },
        
      ],
    },
    {
      selector: "Organizer",
      initialIcon: <GoOrganization />,
      endIcon: <RiArrowDropDownLine />,

      options: [
        {
          value: "Add Organizer",
          link: "/add-organizer",
        },
        {
          value: "List Organizer",
          link: "/organizers",
        },
       
      ],
    },
    {
      selector: "Internal Team",
      initialIcon: <GoOrganization />,
      endIcon: <RiArrowDropDownLine />,

      options: [
        {
          value: "Add Employee",
          link: "/add-internal-team",
        },
        {
          value: "List Employee",
          link: "/list-internal-team",
        },
      ],
    },
    {
      selector: "Events",
      initialIcon: <GoOrganization />,
      endIcon: <RiArrowDropDownLine />,

      options: [
        {
          value: "Add Event",
          link: "/add-event",
        },
        {
          value: "Active Events",
          link: "/events/active",
        },
        {
          value: "Pending Events",
          link: "/events/pending",
        },
        {
          value: "Completed Events",
          link: "/events/completed",
        },
        {
          value: "Rejected Events",
          link: "/events/rejected",
        },

      ],
    }
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hanldleLogOut = () => {
    localStorage.clear();
    dispatch(logOut());
    navigate('/login');
  }

  // const { token } = useSelector((state) => state.auth);
  const token = localStorage.getItem('token');

  return (
    <div className={token ? "bg-blue h-screen text-white w-52 fixed top-0" : 'hidden'}>
      <div className="flex justify-between p-2 ">
        <h1 className="pt-1 text-xl">Event Sphere</h1>
        <IoCloseOutline
          className="menu  "
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      <div className="px-2 pt-4">
        {general.map((data, index) => (
          <div key={index} className="py-2 px-2 flex justify-start gap-2 ">
            <span className="text-xl">{data.initialIcon}</span>
            <div className="w-36">
              <div className="flex justify-between">
                <div>
                  {data.link ? (
                    <a href={data.link}>{data.selector}</a>
                  ) : (
                    <h1
                      className="hover:cursor-pointer"
                      onClick={() => toggle(index)}
                    >
                      {data.selector}
                    </h1>
                  )}
                </div>
                {data.link ? (
                  ""
                ) : (
                  <span
                    onClick={() => toggle(index)}
                    className="text-2xl hover:cursor-pointer"
                  >
                    {data.endIcon}
                  </span>
                )}
              </div>

              <div className="flex flex-col">
                {data.options.map((data, i) =>
                  selected == index ? (
                    <span key={i} className="flex gap-1">
                      <a className="pt-3" href="">
                        <VscDebugBreakpointLog />
                      </a>
                      <a className="pt-2" href={data.link}>
                        {data.value}
                      </a>
                    </span>
                  ) : (
                    ""
                  )
                )}
              </div>
            </div>
          </div>
        ))}
        <div className="fixed bottom-6 flex align-middle px-2 py-4 cursor-pointer " onClick={hanldleLogOut}>
          <span className="pr-2  pt-1 "> <BiLogOut /></span>
          <span className="pb-1">Log out</span>
        </div>
      </div>
    </div>

  );
};

export default SideMenuBar;
