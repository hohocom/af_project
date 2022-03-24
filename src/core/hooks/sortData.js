import { useState } from "react";

export function useSort() {
  const [sortForm, setSortForm] = useState("");
  const sort = (data) => {
    let sortData = [...data];

    // 회원(user)
    if (sortForm === "userName") {
      sortData.sort(function (a, b) {
        return a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0;
      });
    }
    if (sortForm === "userId") {
      sortData.sort(function (a, b) {
        return a.userId < b.userId ? -1 : a.userId > b.userId ? 1 : 0;
      });
    }
    if (sortForm === "date") {
    }

    // 펀드(fund)
    if (sortForm === "fundName") {
      sortData.sort(function (a, b) {
        return a.fundName < b.fundName ? -1 : a.fundName > b.fundName ? 1 : 0;
      });
    }
    if (sortForm === "fundTotalCost") {
      sortData.sort(function (a, b) {
        return Number(b.fundTotalCost) - Number(a.fundTotalCost);
      });
    }

    return sortData;
  };

  return { sort, sortForm, setSortForm };
}
