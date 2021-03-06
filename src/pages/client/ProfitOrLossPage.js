/* eslint-disable react-hooks/exhaustive-deps */
import { MobileLayout } from "components";
import img01 from "assets/images/conclusion/01.svg";
import { withPrivate } from "components/common";
import { useEffect, useState } from "react";
import { useDeal } from "core/hooks";
import { useRecoilValue } from "recoil";
import { fundListState } from "core/state";
import { db } from "utils/firebase";
import { userDetailState, eventListState } from "core/state";
import { currency } from "utils/currency";

function ProfitOrLossPage() {
  const user = useRecoilValue(userDetailState);
  const fundList = useRecoilValue(fundListState);
  const eventList = useRecoilValue(eventListState);
  const { joinDealList, doJoinDealList } = useDeal();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const d = new Date();
  const year = d.getFullYear(); // 년
  const month = d.getMonth(); // 월
  const day = d.getDate(); // 일
  const monthBtn = [1, 3, 6, 12, "all"];
  const [clickMonth, SetclickMonth] = useState(0);

  // * 배정현황 페이지 시작시 필터링된 JoinDealList를 받기위함
  useEffect(() => {
    getFilterJoinDealList();
  }, [eventList]);

  /**
   * @필터링된_JoinDealList
   * 1. 로그인한 회원이 가입한 펀드목록 가져오기
   * 2. 전역에 저장된 펀드리스트를 회원펀드목록과 일치하는 펀드만 뽑아서 새로운 배열로 추출
   * 3. 기존의 doJoinDealList의 인자값인 fundList에 필터링된 펀드리스트 던지기
   * 4. 결과: 회원이 가입한 펀드로 필터링된 거래 리스트 가져옴
   * * 매수 내역만 가져오는 것은 화면에서 그려줄 때 조건처리
   */
  const getFilterJoinDealList = async () => {
    const filterFundList = [];

    const userFundRef = await db
      .collection("userFunds")
      .where("userId", "==", user.id)
      .get();

    userFundRef.docs.forEach((userFund) => {
      fundList.forEach((fund) => {
        if (userFund.data().fundId === fund.id) {
          filterFundList.push(fund);
        }
      });
    });

    doJoinDealList({ eventList, fundList: filterFundList });
  };

  // 기간조회
  const getDateFilterList = () => {
    let result = [];
    if (startDate == null && endDate == null) {
      return joinDealList;
    }
    joinDealList.forEach((deal) => {
      if (
        new Date(deal.dealDate) >= new Date(startDate) &&
        new Date(deal.dealDate) <= new Date(endDate)
      ) {
        result.push(deal);
      }
      if (clickMonth !== 0 && new Date(deal.dealDate) > new Date(endDate)) {
        result.push(deal);
      }
    });

    return result;
  };
  return (
    <MobileLayout>
      <div className="flex flex-col w-full p-4">
        <div className="flex items-center justify-start w-full ">
          <img src={img01} alt="img_01" className="w-[20px] mr-2" />
          <p>조회기간</p>
        </div>
        <div className="flex justify-between items-center max-w-[100%] mt-4">
          <label htmlFor="date1" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date1"
              type="date"
              className="w-full bg-white outline-none"
              onChange={(e) => {
                setStartDate(e.target.value);
                SetclickMonth(0);
              }}
            />
          </label>
          <div className="mx-2 text-xl">~</div>
          <label htmlFor="date2" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date2"
              type="date"
              className="w-full bg-white outline-none"
              onChange={(e) => {
                setEndDate(e.target.value);
                SetclickMonth(0);
              }}
            />
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          {monthBtn.map((m) => {
            return m === "all" ? (
              <button
                key={m}
                className={`p-2 w-[80px]   rounded-md   ${
                  clickMonth === "all" ? `bg-[#1E3A8A] text-white` : `bg-white`
                }`}
                onClick={() => {
                  setStartDate(null);
                  setEndDate(null);
                  SetclickMonth("all");
                }}
              >
                전체
              </button>
            ) : (
              <button
                key={m}
                className={`p-2 w-[80px]   rounded-md   ${
                  clickMonth === m ? `bg-[#1E3A8A] text-white` : `bg-white`
                }`}
                onClick={() => {
                  setStartDate(new Date(year, month - m, day));
                  setEndDate(new Date());
                  SetclickMonth(m);
                }}
              >
                {m}개월
              </button>
            );
          })}
        </div>

        {
          <div className="w-full mt-6 bg-white rounded-md">
            <table className="w-full text-xs table-fixed">
              <thead>
                <tr>
                  <th className="p-2 border-r">날짜</th>
                  <th className="p-2 border-r">거래수수료</th>
                  <th className="p-2 border-r">손익</th>
                  <th>수수료 후 실손익</th>
                </tr>
              </thead>
              <tbody className="font-apple-sb">
                {getDateFilterList().map((deal, index) => {
                  return (
                    <tr className="border-t" key={index}>
                      <td className="border-r">
                        <div className="p-1">
                          <p>{deal.dealDate}</p>
                        </div>
                      </td>
                      <td className="border-r">
                        <div className="flex flex-col items-end p-1">
                          <p>{currency(deal.transactionFee)}원</p>
                        </div>
                      </td>
                      <td className="border-r">
                        <div className="flex flex-col items-end p-1">
                          <p>{currency(deal.fundProfit)}원</p>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col items-end p-1">
                          <p>{currency(deal.afterFundProfit)}원</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        }
      </div>
    </MobileLayout>
  );
}

export default withPrivate(ProfitOrLossPage);
