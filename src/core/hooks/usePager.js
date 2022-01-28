import { useState } from "react";

function usePager({ pageLimit = 10 }) {
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지

  const getTotalPageLength = ({ list }) => {
    return Math.ceil(list.length / pageLimit);
  };

  const tableBodyList = ({ list, callback }) => {
    let result = [];

    for (
      let i = currentPage * pageLimit - (pageLimit - 1);
      getTotalPageLength({ list }) === currentPage
        ? i <= list.length
        : i <= currentPage * pageLimit;
      i++
    ) {
      if (list[i - 1]) {
        const item = list[i - 1];

        result.push(callback({ item, i }));
      }
    }
    return result;
  };

  return {
    pageLimit,
    currentPage,
    setCurrentPage,
    getTotalPageLength,
    tableBodyList,
  };
}

export default usePager;
