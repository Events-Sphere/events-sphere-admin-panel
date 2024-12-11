import React, { useState } from "react";

const Paginate = ({ totalPage, page, setPage }) => {
  const prevPage = () => {
    if (page !== 1) {
      setPage(page - 1);
    }
  };
  const changePage = (index) => {
    setPage(index);
  };
  const nextPage = () => {
    if (page != totalPage) {
      setPage(page + 1);
    }
  };
  //

  return (
    <div className=" flex justify-center mb-2 ">
      <ul className="flex justify-center items-center paginate gap-1">
        {/* <li>
          <a className="bg-bannar" href="#" onClick={prevPage}>
            Prev
          </a>
        </li> */}
        <div className="bg-bannar px-4 py-2 rounded-sm text-white "onClick={prevPage}>
          Prev
        </div>
        {/* ...Array(totalPage) */}
        {[1,2,3,4,5].map((_, index) => (
          <li key={index} >
            <div  onClick={() => changePage(index + 1)} className={`${ page === index + 1 ? "bg-bannar" : "bg-[#B9B4C7]"} font-semibold  px-4 py-2 rounded-sm text-white `}>
              {index+1}
            </div>
          </li>
        ))}

        <li>
          {page < totalPage ? (
             <div className="bg-bannar px-4 py-2 rounded-sm text-white "onClick={nextPage}>
             Next
           </div>
          )
          :
          (
            <div className="bg-bannar px-4 py-2 rounded-sm text-white  opacity-50 cursor-not-allowed" href="#" >
              Next
            </div>
          )
        }
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
