export default function FundListSelector({ checkFundList, setCheckFundList }) {
  return checkFundList.map((fund) => {
    return (
      <FundListSelectorView
        fund={fund}
        checkFundList={checkFundList}
        setCheckFundList={setCheckFundList}
      />
    );
  });
}

function FundListSelectorView({ fund, checkFundList, setCheckFundList }) {
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

    setCheckFundList(updateList);
  };

  const changeJoinPrice = (e) => {
    const value = e.target.value;
    const updateList = checkFundList.map((f) => {
      if (f.id === fund.id) {
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

  return (
    <div key={fund.id} className="flex justify-between p-2">
      <div className="flex">
        <button
          type="button"
          onClick={clickCheckBox}
          style={{
            color: fund.checked ? "blue" : "gray",
          }}
        >
          <i className="mr-2 fa-solid fa-circle-check"></i>
        </button>
        <span>{fund.fundName}</span>
      </div>

      <input
        className="border"
        type="number"
        step="any"
        defaultValue={fund.joinPrice}
        onChange={changeJoinPrice}
      />
    </div>
  );
}
