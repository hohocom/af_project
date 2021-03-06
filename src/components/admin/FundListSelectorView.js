export default function FundListSelectorView({
  checkFundList,
  clickCheckBox,
  changeJoinPrice,
  inputHidden,
}) {
  return checkFundList.map((fund) => {
    return (
      <div
        key={fund.id}
        className="flex justify-between p-2 mb-1 mb-2 border rounded-md"
      >
        <div className="flex">
          <button
            type="button"
            onClick={() => clickCheckBox(fund)}
            style={{
              color: fund.checked ? "blue" : "gray",
            }}
          >
            <i className="mr-2 fa-solid fa-circle-check"></i>
          </button>
          <span>{fund.fundName}</span>
        </div>
        {!inputHidden && (
          <input
            className="pl-2 bg-gray-500 border"
            type="number"
            step="any"
            defaultValue={fund.joinPrice}
            onChange={(e) => changeJoinPrice(fund, e)}
            placeholder="가입금액을 입력해주세요."
          />
        )}
      </div>
    );
  });
}
