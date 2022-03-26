/* eslint-disable react-hooks/exhaustive-deps */
import { Card, withPrivate } from "components/common";
import { MobileLayout } from "components";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { eventListState, userDetailState } from "core/state";
import { fundListState } from "core/state";
import { useDeal } from "core/hooks";
import { db } from "utils/firebase";
import { currency } from "utils/currency";
function HoldEventPage() {
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });
  const user = useRecoilValue(userDetailState);
  const fundList = useRecoilValue(fundListState);
  const eventList = useRecoilValue(eventListState);
  const { joinDealEventFund, doJoinDealEventFund } = useDeal();
  const [joinDealRemainderList, setjoinDealRemainderList] = useState([]);

  // * 배정현황 페이지 시작시 필터링된 JoinDealList를 받기위함
  useEffect(async () => {
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
    const filterUserFundList = [];
    const userFundRef = await db
      .collection("userFunds")
      .where("userId", "==", user.id)
      .get();

    userFundRef.docs.forEach((userFund) => {
      fundList.forEach((fund) => {
        if (userFund.data().fundId === fund.id) {
          filterFundList.push(fund);
          filterUserFundList.push(userFund.data());
        }
      });
    });

    doJoinDealEventFund({
      eventList,
      fundList: filterFundList,
      userFund: filterUserFundList,
    });
  };

  const getHoldDealList = () => {
    let fundHoldList = {};
    for (let fund in joinDealEventFund) {
      let temp = [];
      joinDealEventFund[fund].map((deal) => {
        let vaild = false;
        if (temp.length === 0) {
          temp.push({ eventId: deal.eventId, fundId: deal.fundId, deal: deal });
        } else {
          for (let i = 0; i < temp.length; i++) {
            if (
              temp[i].eventId === deal.eventId &&
              temp[i].fundId === deal.fundId
            ) {
              vaild = true;
            }
          }
          if (!vaild) {
            temp.push({
              eventId: deal.eventId,
              fundId: deal.fundId,
              deal: deal,
            });
          }
        }
      });
      fundHoldList[fund] = temp;
    }

    setjoinDealRemainderList(fundHoldList);
  };
  useEffect(() => {
    getHoldDealList();
  }, [joinDealEventFund]);

  const getDealEventFund = () => {
    const fundList = [];
    for (let fund in joinDealRemainderList) {
      fundList.push(
        <Card
          key={fund}
          title={fund}
          body={
            <table className="w-full text-xs table-fixed">
              <thead>
                <tr>
                  <th className="p-2 border-r">
                    날짜
                    <br />
                    종목명
                  </th>
                  <th className="p-2 border-r">
                    매수가
                    <br />
                    전일종가
                  </th>
                  <th className="p-2 border-r">
                    수량
                    <br />
                    확약기간
                  </th>
                  <th className="p-2">
                    매수금액
                    <br />
                    평가금액
                  </th>
                </tr>
              </thead>
              <tbody className="font-apple-sb">
                {joinDealRemainderList[fund].map((deal) => {
                  var deal = deal.deal;

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
                          <p>{deal.assignmentDate ?? "-"}</p>
                          <nobr>{deal.eventName}</nobr>
                        </div>
                      </td>
                      <td className="border-r">
                        <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <p>{currency(deal.fixedAmount)}원</p>
                          <p>{currency(Number(deal.closingPrice))}원</p>
                        </div>
                      </td>
                      <td className="border-r">
                        <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <p>{deal.quantity}주</p>
                          <p>{deal.mandatoryDate}</p>
                          {/* <p>{currency(deal.fixedAmount * deal.quantity)}원</p> */}
                        </div>
                      </td>
                      <td className="">
                        <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                          <p>{currency(deal.fixedAmount * deal.quantity)}원</p>
                          <p>{currency(deal.closingPrice * deal.quantity)}원</p>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          }
        />
      );
    }

    return fundList;
  };
  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full p-4">
        {getDealEventFund()}
      </div>
      {modal.isOpen && (
        <div className="absolute top-0 left-0 z-20 flex items-center justify-center w-full h-full p-4 bg-black/80">
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
                  <p>보유주식수</p>
                  <p>금액</p>
                  <p>청약수수료</p>
                  <p>총 납입금액</p>
                </div>
                <div className="flex flex-col items-start w-8/12 p-4">
                  <p>{modal.data.bankName ?? "없음"}</p>
                  <p>{modal.data.bankNumber ?? "없음"}</p>
                  <p>{modal.data.eventName}</p>
                  <p>{currency(modal.data.fixedAmount)}원</p>
                  <p>
                    {modal.data.subscribePeriod
                      ? modal.data.subscribePeriod
                      : "없음"}
                  </p>
                  <p>
                    {modal.data.paymentDate ? modal.data.paymentDate : "없음"}
                  </p>
                  <p>{modal.data.mandatoryDate ?? "없음"}</p>
                  <p>{currency(modal.data.totalQuantity)}주</p>
                  <p>
                    {currency(
                      modal.data.totalQuantity * modal.data.fixedAmount
                    )}
                    원
                  </p>
                  <p>{currency(modal.data.subscribeFee) ?? "없음"}원</p>
                  <p>
                    {currency(
                      Number(modal.data.subscribeFee) +
                        modal.data.totalQuantity * modal.data.fixedAmount
                    )}
                    원
                  </p>
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
    </MobileLayout>
  );
}

export default withPrivate(HoldEventPage);
