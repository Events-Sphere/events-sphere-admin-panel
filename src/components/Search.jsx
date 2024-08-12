import React from "react";

const Search = ({ placeholder,type,className,setSearch,search }) => {

  const handleSearch=(e)=>{
    setSearch(e.target.value)

  }
  return (
    <div className="">
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        value={search}
        onChange={handleSearch}
        
      />
    </div>
  );
};

export default Search;
