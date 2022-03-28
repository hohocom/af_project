export default function FundListSelectorView({
  checkFundList,
  clickCheckBox,
  changeJoinPrice,
}) {
  return checkFundList.map((fund) => {
    return (
      <div key={fund.id} className="flex justify-between p-2">
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

        <input
          className="border"
          type="number"
          step="any"
          defaultValue={fund.joinPrice}
          onChange={(e) => changeJoinPrice(fund, e)}
          placeholder="가입금액을 입력해주세요."
        />
      </div>
    );
  });
}
