/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Card, withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { eventListState, userDetailState } from "core/state";
import { fundListState } from "core/state";
import { useDeal, useUserFund } from "core/hooks";
import { db } from "utils/firebase";
import { currency } from "utils/currency";
function AssignmentStatusPage() {
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });
  useEffect(() => {
    console.log(modal);
  }, [modal]);
  const user = useRecoilValue(userDetailState);
  const fundList = useRecoilValue(fundListState);
  const eventList = useRecoilValue(eventListState);
  const { joinDealList, doJoinDealList } = useDeal();

  // * 배정현황 페이지 시작시 필터링된 JoinDealList를 받기위함
  useEffect(() => {
    getFilterJoinDealList();
  }, []);

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

    userFundRef.docs.map((userFund) => {
      fundList.forEach((fund) => {
        if (userFund.data().fundId === fund.id) {
          filterFundList.push(fund);
        }
      });
    });

    doJoinDealList({ eventList, fundList: filterFundList });
    console.log(joinDealList);
  };

  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full p-4">
        <Card
          title="공모주펀딩"
          body={
            <table className="w-full text-xs table-fixed">
              <thead>
                <tr>
                  <th className="p-2 border-r">
                    날짜
                    <br />
                    펀드명/종목명
                  </th>
                  <th className="p-2 border-r">매수가/매수량</th>
                  <th>금액/비고</th>
                </tr>
              </thead>
              <tbody className="font-apple-sb">
                {joinDealList.map((deal) => {
                  if (deal.type === "buy")
                    return (
                      <tr
                        key={deal.id}
                        className="border-t"
                        onClick={() =>
                          setModal({ ...modal, isOpen: true, data: deal })
                        }
                      >
                        <td className="border-r">
                          <div className="p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            <p>{deal.dealDate}</p>
                            <nobr>
                              {deal.fundName}/{deal.eventName}
                            </nobr>
                          </div>
                        </td>
                        <td className="border-r">
                          <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            <p>{currency(deal.buyPrice)}원</p>
                            <nobr>{deal.quantity}주</nobr>
                          </div>
                        </td>
                        <td>
                          <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                            <p>{currency(deal.buyPrice * deal.quantity)}원</p>
                            <br />
                          </div>
                        </td>
                      </tr>
                    );
                })}
              </tbody>
            </table>
          }
        />
        {modal.isOpen && (
          <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full p-4 bg-black/80">
            <Card
              title="배정결과"
              body={
                <div className="flex w-full text-xs">
                  <div className="flex flex-col items-end w-4/12 p-4 border-r">
                    <p>계좌번호</p>
                    <p>계좌명</p>
                    <p>참여종목명</p>
                    <p>확정공모가액</p>
                    <p>청약기간</p>
                    <p>납입일</p>
                    <p>의무보유</p>
                    <p>배정주식수</p>
                    <p>배정금액</p>
                    <p>청약수수료</p>
                    <p>총 납입금액</p>
                  </div>
                  <div className="flex flex-col items-start w-8/12 p-4 font-apple-sb">
                    <p>x</p>
                    <p>x</p>
                    <p>{modal.data.eventName}</p>
                    <p>{currency(modal.data.buyPrice)}원</p>
                    <p>
                      {modal.data.subscribePeriod
                        ? modal.data.subscribePeriod
                        : "없음"}
                    </p>
                    <p>
                      {modal.data.paymentDate ? modal.data.paymentDate : "없음"}
                    </p>
                    <p>x</p>
                    <p>{currency(modal.data.quantity)}주</p>
                    <p>
                      {currency(modal.data.quantity * modal.data.buyPrice)}원
                    </p>
                    <p>x</p>
                    <p>청약수수료 + 배정금액</p>
                  </div>
                </div>
              }
              bottomOutside={
                <button
                  className="p-3 pt-3.5 w-2/3 bg-blue-800 text-white rounded-md mt-4"
                  onClick={() => setModal({ ...modal, isOpen: false })}
                >
                  확인
                </button>
              }
            />
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

export default withPrivate(AssignmentStatusPage);
