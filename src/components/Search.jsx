import React from "react";

const Search = ({ placeholder,type,className,setSearch,search }) => {

  const handleSearch=(e)=>{
    setSearch(e.target.value)

  }
  return (
    <>
      <input
        className={className}
        placeholder={placeholder}
        type={type}
        value={search}
        onChange={handleSearch}
        
      />
    </>
  );
};

export default Search;
