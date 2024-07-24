import React, { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineHome } from "react-icons/md";
import { RiMenuFold4Line } from "react-icons/ri";
import { FiUsers } from "react-icons/fi";
import { VscDebugBreakpointLog } from "react-icons/vsc";
import { GoOrganization } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";

const SideMenuBar = ({showMenu,setShowMenu }) => {
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
        {
          value: "Verify Users",
          link: "",
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
          link: "",
        },
        {
          value: "List Organizer",
          link: "",
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
          link: "add-event",
        },
       
      ],
    }
  ];
  return (
    <div className="bg-blue h-screen text-white w-52 fixed top-0 ">
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
                {data.options.map((data) =>
                  selected == index ? (
                    <span className="flex gap-1">
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
      </div>
    </div>
  );
};

export default SideMenuBar;
