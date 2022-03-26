function FundDetail({ fund }) {
  return (
    <div className="pt-4 min-w-[350px]">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-noto-regular">펀드 상세보기</h2>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">펀드명</p>
        <p>{fund.fundName}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">펀드전체금액</p>
        <p>
          {new Intl.NumberFormat("ko", {
            currency: "INR",
            minimumFractionDigits: 0,
          }).format(fund.fundTotalCost)}{" "}
          원
        </p>
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
