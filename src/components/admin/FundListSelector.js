import FundListSelectorView from "./FundListSelectorView";

export default function FundListSelector({ checkFundList, setCheckFundList }) {
  const props = {
    checkFundList,
    changeJoinPrice: (f, e) => {
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
    },
    clickCheckBox: (f) => {
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
    },
  };

  return <FundListSelectorView {...props} />;
}
