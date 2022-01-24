function FundDetail({ fund, openUpdateFormEvent }) {
  return (
    <div>
      <div className="w-full flex justify-between items-center">
        <h2 className="text-xl font-noto-regular">펀드 상세보기</h2>
        <button
          type="button"
          className="text-sm py-2 px-4 rounded-md bg-yellow-400 text-white"
          onClick={openUpdateFormEvent}
        >
          수정
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">펀드명</p>
        <p>{fund.fundName}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">펀드전체금액</p>
        <p>{fund.fundTotalCost}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">대상</p>
        <p>{fund.target}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">인센티브</p>
        <p>{fund.incentive}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">기본수수료</p>
        <p>{fund.defaultFee}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">거래수수료</p>
        <p>{fund.transactionFee}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">가입기간</p>
        <p>
          {fund.startJoinPeriod} ~ {fund.endJoinPeriod}
        </p>
      </div>
    </div>
  );
}

export default FundDetail;
