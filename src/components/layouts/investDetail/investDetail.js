/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { currency } from "utils/currency";
import { db } from "utils/firebase";

function InvestDetail({ fund }) {
  const [state, setState] = useState(0);
  //const [loading, setLoading] = useState(false);
  const [sumData, setSumData] = useState({});
  const changeState = (s) => {
    if (s === state) setState(0);
    else if (s === 1) setState(1);
    else if (s === 2) setState(2);
  };
  useEffect(() => {
    sumFundProfitByOption();
  }, []);
  const sumFundProfitByOption = async () => {
    console.log(fund.fundId);
    const dealRef = await db
      .collection("deals")
      .where("fundId", "==", fund.fundId)
      .where("type", "==", "sell")
      .get();
    let sumFundProfit = 0;
    let sumTransactionFee = 0;
    let sumAfterFundProfit = 0;
    dealRef.docs.forEach((deal) => {
      sumFundProfit += deal.data().fundProfit;
      sumTransactionFee += deal.data().transactionFee;
      sumAfterFundProfit += deal.data().afterFundProfit;
    });
    setSumData({
      sumFundProfit: sumFundProfit,
      sumTransactionFee: sumTransactionFee,
      sumAfterFundProfit: sumAfterFundProfit,
    });
  };

  return (
    <>
      {state !== 0 && (
        <div className="flex flex-col justify-center w-full p-2 pt-10 pb-4 -mt-6 text-xs text-white bg-blue-900 shadow-md rounded-b-xl">
          {state === 1 && (
            <>
              <div className="flex w-full">
                <p className="w-1/3 mr-4 text-right">가입금액</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(fund.joinPrice)}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">이메일</p>
                <p className="w-2/3 text-left font-apple-sb">{fund.userId}</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">거래은행</p>
                <p className="w-2/3 text-left font-apple-sb">하나은행</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">계좌번호</p>
                <p className="w-2/3 text-left font-apple-sb">3333-05-1254973</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">가입일자</p>
                <p className="w-2/3 text-left font-apple-sb">{fund.joinDate}</p>
              </div>
            </>
          )}
          {state === 2 && (
            <>
              <div className="flex w-full">
                <p className="w-1/3 mr-4 text-right">전체운용금액</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(fund.fundTotalCost)}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">전체실현손익</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(sumData.sumFundProfit)}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">수수료/제비용</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(sumData.sumTransactionFee)}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">수수료 후 실현손익</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {" "}
                  {currency(sumData.sumAfterFundProfit)}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">기본수수료</p>
                <p className="w-2/3 text-left font-apple-sb">0원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">인센티브</p>
                <p className="w-2/3 text-left font-apple-sb">0원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">지분율</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {fund.shareRatio * 100}%
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">순 실현손익</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(sumData.sumAfterFundProfit * fund.shareRatio)}원
                </p>
              </div>

              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">
                  당월실현손익
                </p>
                <p className="w-2/3 text-left font-apple-sb">8,745,600원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">수익률</p>
                <p className="w-2/3 text-left font-apple-sb">0.22%</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">인출가능금액</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(
                    Number(fund.joinPrice) +
                      sumData.sumAfterFundProfit * fund.shareRatio
                  )}
                  원
                </p>
              </div>
            </>
          )}
        </div>
      )}
      <div className="flex justify-between w-full mt-2">
        <button
          className="w-1/2 p-2 mr-2 bg-white border border-indigo-600 rounded-md"
          onClick={() => changeState(1)}
        >
          가입정보
        </button>
        <button
          className="w-1/2 p-2 text-white bg-blue-600 rounded-md"
          onClick={() => changeState(2)}
        >
          당월수익
        </button>
      </div>
    </>
  );
}

export default InvestDetail;
