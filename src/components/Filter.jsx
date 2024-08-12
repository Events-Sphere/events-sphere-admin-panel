import React, { useState } from "react";

const Filter = ({roles,setRoles,userCategory,status,setStatus}) => {
  const [user, setUser] = useState(["true", "false"]);
  const handleFilter=(e)=>{
    if(roles.includes(e.target.value)){
      const role=roles.filter((data)=>data != e.target.value);
      setRoles(role);
    }
    else{
      setRoles([...roles,e.target.value])
    }

  }
  const handleStatus=(e)=>{
    if(status.includes(e.target.value)){
      const role=status.filter((data)=>data != e.target.value);
      setStatus(role);
    }
    else{
      setStatus([...status,e.target.value])
    }

  }
  
   

  
  return (
    <div className="px-2">
      {userCategory.length > 0 && (
        <div className="flex">
          <h1 className="font-bold text-black">ROLE:</h1>
          {userCategory.map((role, index) => (
            <div className="px-4 flex align-middle text-black" key={index}>
              <input type="checkbox" id={role} value={role} onChange={handleFilter} />
              <label className="pl-1" htmlFor={role}>
                {role}
              </label>
            </div>
          ))}
        </div>
      )}
      {user.length > 0 && (
        <div className="flex">
          <h1 className="font-bold text-black">STATUS:</h1>
          {user.map((user, index) => (
            <div className="px-2 flex align-middle " key={index}>
              <input className="" type="checkbox" id={user} value={user} onChange={handleStatus} />
              <label className="pl-1 text-black" htmlFor={user}>
                {user === 'true'?'Verified':'Unverified'}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Filter;
