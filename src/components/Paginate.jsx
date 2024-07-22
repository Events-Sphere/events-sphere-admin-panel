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
    <>
      <ul className="flex justify-center items-center paginate  ">
        <li>
          <a className="bg-blue" href="#" onClick={prevPage}>
            Prev
          </a>
        </li>
        {[...Array(totalPage)].map((_, index) => (
          <li key={index} >
            <a
              className={`bg-blue ${page == index + 1 ? " bg-red" : ""}`}
              href="#"
              onClick={() => changePage(index + 1)}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li>
          {page < totalPage && (
            <a className="bg-blue" href="#" onClick={nextPage}>
              Next
            </a>
          )}
        </li>
      </ul>
    </>
  );
};

export default Paginate;
