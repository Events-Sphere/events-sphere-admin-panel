import React from 'react'

import { IoMenuOutline } from "react-icons/io5";
const NavBar = ({showMenu,setShowMenu}) => {
 
  return (
    <div className='h-12 bg-white '>
      <IoMenuOutline className='menu' onClick={()=>setShowMenu(!showMenu)} />
    </div>
  )
}

export default NavBar