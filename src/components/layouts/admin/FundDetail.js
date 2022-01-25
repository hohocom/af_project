function FundDetail({ fund, openUpdateFormEvent }) {
  return (
    <div className="pt-4">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-noto-regular">펀드 상세보기</h2>
        <button
          type="button"
          class="py-2 px-4 bg-yellow-400 hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-yellow-200 text-white transition ease-in 
            duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
          onClick={() => {
            openUpdateFormEvent({ fund: fund });
          }}
        >
          수정
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">펀드명</p>
        <p>{fund.fundName}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">펀드전체금액</p>
        <p>{fund.fundTotalCost}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">대상</p>
        <p>{fund.target}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">인센티브</p>
        <p>{fund.incentive}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">기본수수료</p>
        <p>{fund.defaultFee}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">거래수수료</p>
        <p>{fund.transactionFee}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">가입기간</p>
        <p>
          {fund.startJoinPeriod} ~ {fund.endJoinPeriod}
        </p>
      </div>
    </div>
  );
}

export default FundDetail;
