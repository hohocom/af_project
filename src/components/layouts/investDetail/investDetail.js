import { useState } from "react";

function InvestDetail() {
  const [state, setState] = useState(0);

  const changeState = (s) => {
    if (s === state) setState(0);
    else if (s === 1) setState(1);
    else if (s === 2) setState(2);
  };
  return (
    <>
      {state !== 0 && (
        <div className="w-full bg-blue-900 p-2 pb-4 -mt-6  rounded-b-xl flex flex-col justify-center text-white pt-10 text-xs shadow-md">
          {state === 1 && (
            <>
              <div className="flex w-full">
                <p className="w-1/3 text-right mr-4">가입금액</p>
                <p className="w-2/3 text-left">4,000,000,000원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">이메일</p>
                <p className="w-2/3 text-left">afia@afassets.com</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">거래은행</p>
                <p className="w-2/3 text-left">하나은행</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">계좌번호</p>
                <p className="w-2/3 text-left">3333-05-1254973</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">가입일자</p>
                <p className="w-2/3 text-left">2021-03-09</p>
              </div>
            </>
          )}
          {state === 2 && (
            <>
              <div className="flex w-full">
                <p className="w-1/3 text-right mr-4">전체운용금액</p>
                <p className="w-2/3 text-left">4,000,000,000원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">전체실현손익</p>
                <p className="w-2/3 text-left">87,88,000원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">수수료/제비용</p>
                <p className="w-2/3 text-left">42,400원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">수수료 후 실현손익</p>
                <p className="w-2/3 text-left">8,745,600원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">기본수수료</p>
                <p className="w-2/3 text-left">0원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">인센티브</p>
                <p className="w-2/3 text-left">0원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">인센티브</p>
                <p className="w-2/3 text-left">0원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">순 실현손익</p>
                <p className="w-2/3 text-left">8,745,600원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">지분율</p>
                <p className="w-2/3 text-left">100%</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">당월실현손익</p>
                <p className="w-2/3 text-left">8,745,600원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">수익률</p>
                <p className="w-2/3 text-left">0.22%</p>
              </div>
              <div className="flex">
                <p className="w-1/3 text-right mr-4">인출가능금액</p>
                <p className="w-2/3 text-left">4,008,745,600원</p>
              </div>
            </>
          )}
        </div>
      )}
      <div className="w-full flex justify-between mt-2">
        <button
          className="bg-white w-1/2 p-2 mr-2 rounded-md border border-indigo-600"
          onClick={() => changeState(1)}
        >
          가입정보
        </button>
        <button
          className="bg-blue-600 p-2 w-1/2 rounded-md text-white"
          onClick={() => changeState(2)}
        >
          당월수익
        </button>
      </div>
    </>
  );
}

export default InvestDetail;
