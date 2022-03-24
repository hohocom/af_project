import { useFund } from "core/hooks";
import { useEffect, useState } from "react";

export default function FundListSelector({ checkFundList, setCheckFundList }) {
  const clickCheckBox = (f) => {
    const updateList = checkFundList.map((fund) => {
      if (fund.id === f.id) {
        return {
          ...fund,
          checked: !f.checked,
        };
      } else {
        return fund;
      }
    });
    console.debug(updateList);
    setCheckFundList(updateList);
  };

  const changeJoinPrice = (f, e) => {
    const value = e.target.value;
    const updateList = checkFundList.map((fund) => {
      if (fund.id === f.id) {
        return {
          ...fund,
          joinPrice: value,
        };
      } else {
        return fund;
      }
    });
    setCheckFundList(updateList);
  };

  return checkFundList.map((fund, index) => {
    return (
      <div key={fund.id} className="p-2 flex justify-between">
        <div className="flex">
          <button
            type="button"
            onClick={() => clickCheckBox(fund)}
            style={{
              color: fund.checked ? "blue" : "gray",
            }}
          >
            <i className="fa-solid fa-circle-check mr-2"></i>
          </button>
          <span>{fund.fundName}</span>
        </div>
        <input
          className="border"
          type="number"
          step="any"
          defaultValue={fund.joinPrice}
          onChange={(e) => changeJoinPrice(fund, e)}
        />
      </div>
    );
  });
}
