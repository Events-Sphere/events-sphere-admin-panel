import React, { useState } from "react";

const Filter = ({roles,setRoles}) => {
  const [role, setRole] = useState(["student", "teacher"]);
  const [user, setUser] = useState(["verified", "unVerified"]);
  const handleFilter=(e)=>[
    setRoles([...roles,e.target.value])

  ]
  return (
    <div className="">
      {role.length > 0 && (
        <div className=" flex">
          <h1 className="font-bold">ROLES:</h1>
          {role.map((role, index) => (
            <div className="px-2" key={index}>
              <input type="checkbox" id={role} value={role} onChange={handleFilter} />
              <label className="pl-1" htmlFor={role}>
                {role}
              </label>
            </div>
          ))}
        </div>
      )}
      {user.length > 0 && (
        <div className="p-2 flex">
          <h1 className="font-bold">V_STATUS:</h1>
          {user.map((user, index) => (
            <div className="px-2" key={index}>
              <input className="" type="checkbox" id={user}  />
              <label className="pl-1" htmlFor={user}>
                {user}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
