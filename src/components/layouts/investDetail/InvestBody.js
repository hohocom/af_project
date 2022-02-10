import { currency } from "utils/currency";

function InvestBody({ fund }) {
  return (
    <>
      <div className="flex flex-col items-center w-1/2 text-sm border-r">
        <span>전체금액</span>
        <span className="text-xs font-apple-sb">
          {currency(fund.fundTotalCost)}원
        </span>
        <br />
        <span>가입금액</span>
        <span className="text-xs font-apple-sb">
          {currency(fund.joinPrice)}원
        </span>
        <br />
        <span>지분율</span>
        <span className="text-xs font-apple-sb">{fund.shareRatio * 100}%</span>
      </div>
      <div className="flex flex-col items-center w-1/2 text-sm">
        <span>수익률</span>
        <span className="text-xs font-apple-sb">실적배당</span>
        <br />
        <span>기간</span>
        <span className="text-xs font-apple-sb">{fund.joinPeriod}</span>
        <br />
        <span>대상</span>
        <span className="text-xs font-apple-sb">{fund.target}</span>
      </div>
    </>
  );
}

export default InvestBody;
