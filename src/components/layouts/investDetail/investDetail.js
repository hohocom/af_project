/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { currency } from "utils/currency";
import { db } from "utils/firebase";

function InvestDetail({ fund, user }) {
  const [state, setState] = useState(0);
  const [sumData, setSumData] = useState({});
  const d = new Date();
  const year = d.getFullYear(); // 년
  const month = d.getMonth() + 1; // 월

  const changeState = (s) => {
    if (s === state) setState(0);
    else if (s === 1) setState(1);
    else if (s === 2) setState(2);
  };
  useEffect(() => {
    sumFundProfitByOption();
  }, []);

  const sumFundProfitByOption = async () => {
    const dealRef = await db
      .collection("deals")
      .where("fundId", "==", fund.fundId)
      .orderBy("dealDate", "desc")
      .get();
    console.log(fund.incentive / 100);
    let sumFundProfit = 0;
    let sumTransactionFee = 0;
    let sumAfterFundProfit = 0;
    let allSumFundProfit = [];
    let date = 0;

    dealRef.docs.forEach((deal) => {
      if (new Date(fund.joinDate) < new Date(deal.data().dealDate)) {
        console.log(new Date(fund.joinDate));
        console.log(new Date(deal.data().dealDate));
        if (date === deal.data().dealDate.substring(0, 7)) {
          //달별 총 수익 구하기 (실현손익기준)
          allSumFundProfit[allSumFundProfit.length - 1].sumFundProfit +=
            deal.data().fundProfit;
          date = deal.data().dealDate.substring(0, 7);
        } else {
          allSumFundProfit.push({
            date: deal.data().dealDate.substring(0, 7),
            sumFundProfit: deal.data().fundProfit,
          });
          date = deal.data().dealDate.substring(0, 7);
        }
      }

      // 가입일자 이후로부터 수익 구하기!
      // 펀드가입기간 == 이전달(전달수익)
      if (
        fund.joinDate.substring(0, 7) ===
        `${year}-${month.toString.length === 1 ? 0 + month.toString() : month}`
      ) {
        // ex ) 가입일자~ 00월 31일
        if (
          new Date(fund.joinDate) < new Date(deal.data().dealDate) &&
          new Date(year, month, 0) >= new Date(deal.data().dealDate)
        ) {
          sumFundProfit += deal.data().fundProfit;
          sumTransactionFee += Number(deal.data().transactionFee);
          sumAfterFundProfit += deal.data().afterFundProfit;
        }
      }
      // 펀드가입기간 > 이전달(전달수익)
      else if (
        fund.joinDate.substring(0, 7) >
        `${year}-${month.toString.length === 1 ? 0 + month.toString() : month}`
      ) {
        sumFundProfit += 0;
        sumTransactionFee += 0;
        sumAfterFundProfit += 0;
      }
      // 펀드가입기간 <  이전달(전달수익)
      else {
        //ex ) 00월 1일 ~ 00월 31일
        if (
          new Date(year, month - 1, 1) < new Date(deal.data().dealDate) &&
          new Date(year, month, 0) >= new Date(deal.data().dealDate)
        ) {
          sumFundProfit += deal.data().fundProfit;
          sumTransactionFee += Number(deal.data().transactionFee);
          sumAfterFundProfit += deal.data().afterFundProfit;
        }
      }
    });

    setSumData({
      sumFundProfit: sumFundProfit,
      sumTransactionFee: sumTransactionFee,
      sumAfterFundProfit: sumAfterFundProfit,
      allSumFundProfit: allSumFundProfit,
    });
  };

  //기본 수수료 구하기
  const getDefaultFee = () => {
    //펀드 가입금액 * 기본수수료  * ((현재날짜 - 가입날짜 % 365) +1)
    const minusTimeStamp =
      new Date().getTime() - new Date(fund.joinDate).getTime();
    const result =
      fund.joinPrice *
      (fund.fundDefaultFee / 100) *
      Math.floor(new Date(minusTimeStamp) / 1000 / 60 / 60 / 24 / 365 + 1);
    return result;
  };
  const getIncentive = () => {
    let incentivePrice = 0;
    let LastMonthFundProfit = 0; // 바로전달 수익의 합
    let PreviousMonthFundProfitSum = 0; // 모든 전달 수익의 합
    sumData.allSumFundProfit.forEach((data) => {
      if (
        new Date(fund.joinDate) >
        new Date(data.date.substring(0, 4), data.date.substring(5, 7) - 1, 1)
      ) {
        PreviousMonthFundProfitSum += data.sumFundProfit;
      }

      if (
        new Date(year, month - 1, 1).getTime() ===
        new Date(
          data.date.substring(0, 4),
          data.date.substring(5, 7) - 1,
          1
        ).getTime()
      ) {
        LastMonthFundProfit = data.sumFundProfit;
      }
    });
    if (PreviousMonthFundProfitSum >= 0) {
      incentivePrice = LastMonthFundProfit;
    } else if (PreviousMonthFundProfitSum < 0) {
      incentivePrice = PreviousMonthFundProfitSum + LastMonthFundProfit;
    }

    return (incentivePrice * fund.incentive) / 100 < 0
      ? 0
      : (incentivePrice * fund.incentive) / 100;
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
                <p className="w-1/3 mr-4 text-right">거래은행</p>
                <p className="w-2/3 text-left font-apple-sb">{user.bankName}</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">계좌번호</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {user.bankNumber}
                </p>
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
                  {currency(Math.floor(fund.fundTotalCost))}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">전체실현손익</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(Math.floor(sumData.sumFundProfit))}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">수수료/제비용</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(Math.floor(sumData.sumTransactionFee))}원
                </p>
              </div>

              <div className="flex">
                <p className="w-1/3 mr-4 text-right">기본수수료</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(Math.floor(getDefaultFee()))}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right ">인센티브</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(Math.floor(getIncentive()))}원
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">수수료 후 실현손익</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(
                    Math.floor(
                      sumData.sumAfterFundProfit -
                        Number(getDefaultFee()) -
                        Number(getIncentive())
                    )
                  )}
                  원
                </p>
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
                  {currency(
                    Math.floor(
                      (sumData.sumAfterFundProfit - Number(getIncentive())) *
                        fund.shareRatio -
                        Number(getDefaultFee())
                    )
                  )}
                  원
                </p>
              </div>

              <div className="flex">
                <p className="w-1/3 mr-4 text-right text-red-500">
                  당월실현손익
                </p>
                <p className="w-2/3 text-left font-apple-sb">x원</p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">수익률</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {" "}
                  {currency(sumData.sumFundProfit / fund.fundTotalCost) * 100}%
                </p>
              </div>
              <div className="flex">
                <p className="w-1/3 mr-4 text-right">인출가능금액</p>
                <p className="w-2/3 text-left font-apple-sb">
                  {currency(
                    Number(fund.joinPrice) +
                      (sumData.sumAfterFundProfit - Number(getIncentive())) *
                        fund.shareRatio -
                      Number(getDefaultFee()) <
                      0
                      ? 0
                      : Math.floor(
                          Number(fund.joinPrice) +
                            (sumData.sumAfterFundProfit -
                              Number(getIncentive())) *
                              fund.shareRatio -
                            Number(getDefaultFee())
                        )
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
          당월수익({month}월)
        </button>
      </div>
    </>
  );
}

export default InvestDetail;
