import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdEvent, MdOutlineHome } from "react-icons/md";
import { RiMenuFold4Line, RiTeamLine } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loading, logOut } from "../App/Features/Auth/authSlice";
import { Link } from "react-router-dom";

const SideMenuBar = ({ showMenu, setShowMenu, setLoading }) => {
  const [selected, setSelected] = useState(null);
  const [selectedLinkOption, setSelectedLinkOption] = useState(null);

  const toggle = (i) => {
    setSelected(selected === i ? null : i);
  };

  const general = [
    {
      selector: "Dashboard",
      initialIcon: <MdOutlineHome />,
      endIcon: <RiArrowDropDownLine />,
      link: "/dashboard",
      options: [],
    },
    {
      selector: "Category",
      initialIcon: <RiMenuFold4Line />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Category", link: "/add-category" },
        { value: "List Category", link: "/categories-list" },
      ],
    },
    {
      selector: "Users",
      initialIcon: <FiUsers />,
      endIcon: <RiArrowDropDownLine />,
      options: [{ value: "List Users", link: "/get-all-user" }],
    },
    {
      selector: "Organizer",
      initialIcon: <GoOrganization />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Organizer", link: "/add-organizer" },
        { value: "List Organizer", link: "/organizers" },
      ],
    },
    {
      selector: "Internal Team",
      initialIcon: <RiTeamLine />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Employee", link: "/add-internal-team" },
        { value: "List Employee", link: "/list-internal-team" },
      ],
    },
    {
      selector: "Events",
      initialIcon: <MdEvent />,
      endIcon: <RiArrowDropDownLine />,
      options: [
        { value: "Add Event", link: "/add-event" },
        { value: "Active Events", link: "/events/active" },
        { value: "Pending Events", link: "/events/pending" },
        { value: "Completed Events", link: "/events/completed" },
        { value: "Rejected Events", link: "/events/rejected" },
      ],
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    localStorage.clear();
    dispatch(logOut());
    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <div
      className={
        token ? "bg-template-1 h-screen text-white w-60 fixed top-0" : "hidden"
      }
    >
      <div className="flex justify-between p-2">
        <h1 className="pt-1 text-xl">Event Sphere</h1>
        <IoCloseOutline
          className="menu"
          onClick={() => setShowMenu(!showMenu)}
        />
      </div>
      <div className="px-2 py-4 select-none">
        {general.map((data, index) => (
          <div key={index} className="py-2 px-2 flex justify-start gap-2">
            <span className="text-xl">{data.initialIcon}</span>
            <div className="w-44">
              <div
                onClick={() => toggle(index)}
                className="flex cursor-pointer justify-between"
              >
                <div>
                  {data.link ? (
                    <Link to={data.link}>{data.selector}</Link>
                  ) : (
                    <h1>{data.selector}</h1>
                  )}
                </div>
                {!data.link && (
                  <span
                    onClick={() => toggle(index)}
                    className="text-2xl hover:cursor-pointer"
                  >
                    {data.endIcon}
                  </span>
                )}
              </div>

              {selected === index && (
                <div className="flex flex-col self-center">
                  {data.options.map((option, i) => (
                    <span key={i} className="flex items-center gap-1 pt-2">
                      <VscDebugBreakpointLog
                        color={`${option.value === selectedLinkOption ? "blue" : "white"}`}
                      />
                      <Link
                        className={`${option.value === selectedLinkOption ? "text-light-blue" : "text-white"} pt-1 select-none self-center`}
                        to={option.link}
                        onClick={() => setSelectedLinkOption(option.value)}
                      >
                        {option.value}
                      </Link>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div
          className="fixed bottom-6 flex align-middle px-2 py-4 cursor-pointer"
          onClick={handleLogOut}
        >
          <span className="pr-2 pt-1">
            <BiLogOut />
          </span>
          <span className="pb-1">Log out</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenuBar;
