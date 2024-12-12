import React, { useState } from "react";

const Filter = ({roles,setRoles,userCategory,status,setStatus}) => {
  const [user, setUser] = useState(["true", "false"]);
  const [selectedRoles , setSelectedRoles] = useState([]);
 
  const handleFilter=(role)=>{
    if(selectedRoles.includes(role)){
      setSelectedRoles(selectedRoles.filter((e)=> e !== role));
    }else{
      setSelectedRoles([...selectedRoles , role]);
    }

    if(roles.includes(role)){
      const fRole=roles.filter((data)=>data != role);
      setRoles(fRole);
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
    <div className="px-2  md:flex gap-4  ">
      {userCategory.length > 0 && (
        <div className="flex gap-3 ">
          {/* <h1 className="font-bold text-black">ROLE:</h1> */}
          {userCategory.map((role, index) => (
            // <div className="px-4 flex align-middle text-black" key={index}>
            //   <input type="checkbox" id={role} value={role} onChange={handleFilter} />
            //   <label className="pl-1" htmlFor={role}>
            //     {role}
            //   </label>
            // </div>
<div key={index} id={role} className={`px-4 py-1 rounded-md text-white cursor-pointer items-center self-center  ${selectedRoles.includes(role) ? "bg-[#2F3645]": "bg-gradient-to-r from-[#6d879b] via-[#526D82] to-[#bed1df]"}`}
onClick={()=>handleFilter(role)}>
  {role }
</div>
            
          ))}
        </div>
        
      )}
      {user.length > 0 && (
        <div className="flex pt-5 md:p-0 gap-2 text-white">
          {/* <h1 className="font-bold text-black">STATUS:</h1> */}
          {user.map((user, index) => (
            <div className={`text-white  ${user=== 'true' ? " border-[1px] border-[#A2FF86]" : " border-[1px] border-[#E76161]"} px-2 py-1 flex align-middle rounded-md gap-1 `} key={index}>
              <input className="" type="checkbox" id={user} value={user} onChange={handleStatus} />
              <label className="pl-1 text-txt-color" htmlFor={user}>
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
