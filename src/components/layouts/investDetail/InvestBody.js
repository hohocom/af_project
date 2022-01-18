function InvestBody() {
  return (
    <>
      <div className="flex flex-col items-center w-1/2 text-sm border-r">
        <span>전체금액</span>
        <span className="text-xs font-apple-sb">4,000,000,000원</span>
        <br />
        <span>가입금액</span>
        <span className="text-xs font-apple-sb">100,000,000원</span>
        <br />
        <span>지분율</span>
        <span className="text-xs font-apple-sb">2.5%</span>
      </div>
      <div className="flex flex-col items-center w-1/2 text-sm">
        <span>수익률</span>
        <span className="text-xs font-apple-sb">실적배당</span>
        <br />
        <span>기간</span>
        <span className="text-xs font-apple-sb">12개월</span>
        <br />
        <span>대상</span>
        <span className="text-xs font-apple-sb">공모주고유계정배정분</span>
      </div>
    </>
  );
}

export default InvestBody;
