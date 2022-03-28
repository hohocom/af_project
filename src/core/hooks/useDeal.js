/* eslint-disable react-hooks/exhaustive-deps */
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { db } from "utils/firebase";
import {
  dealListInit,
  dealListState,
  joinDealListState,
  loadingState,
} from "core/state";
import { joinDealEventFundState } from "core/state/deal";
import axios from "axios";

export function useDealStream() {
  const setDealList = useSetRecoilState(dealListState);
  const setDealListInit = useSetRecoilState(dealListInit);

  useEffect(() => {
    console.debug("%c[거래 실시간 감지..]", "color:red");
    const unsub = db
      .collection("deals")
      .where("type", "in", ["sell", "buy"])

      .orderBy("dealDate", "desc")
      .orderBy("totalQuantity", "asc")
      .onSnapshot((snapshot) => {
        const newDeals = snapshot.docs.map((deal) => {
          return {
            id: deal.id,
            ...deal.data(),
          };
        });
        setDealList(newDeals);
        setDealListInit(true);
      });
    return () => {
      console.debug("%c[거래 실시간 감지 종료..]", "color:red");
      unsub();
    };
  }, []);
}

function useDeal() {
  const dealList = useRecoilValue(dealListState);
  const [joinDealList, setJoinDealList] = useRecoilState(joinDealListState);
  const [joinDealEventFund, setJoinDealEventFund] = useRecoilState(
    joinDealEventFundState
  );
  const [matchedFundId, setMatchedFundId] = useState(null);
  const setLoading = useSetRecoilState(loadingState);

  const reverseToBuy = async () => {
    dealList.forEach(async (deal) => {
      if (deal.type === "reservation") {
        console.log(deal);
        //상장일이 지나면
        if (new Date() >= new Date(deal.paymentDate)) {
          await db.collection("deals").doc(deal.id).update({ type: "buy" });
        }
      }
    });
  };
  const doJoinDealList = ({ fundList, eventList, type = "all" }) => {
    if (dealList.length > 0 && fundList.length > 0 && eventList.length > 0) {
      const joinDealList = [];
      //events 와 deals join
      dealList.forEach((deal, index) => {
        eventList.forEach((event) => {
          let fundName = "";
          //fundname 가져오기
          fundList.forEach((fund) => {
            if (fund.id === deal.fundId) fundName = fund.fundName;
          });
          if (deal.eventId === event.id) {
            joinDealList.push({
              id: deal.id,
              fundId: deal.fundId,
              fundName: fundName,
              eventId: event.id,
              eventName: event.eventName,
              fixedAmount: event.fixedAmount,
              buyPrice: deal.buyPrice,
              salePrice: deal.salePrice,
              quantity: deal.quantity,
              totalQuantity: deal.totalQuantity,
              dealDate: deal.dealDate,
              type: deal.type,
              fundProfit: deal.fundProfit,
              transactionFee: deal.transactionFee,
              afterFundProfit: deal.afterFundProfit,
              subscribePeriod: `${event.startSubscribePeriod}~${event.endSubscribePeriod}`,
              paymentDate: event.paymentDate,
              subscribeFee: event.subscribeFee,
            });
          }
        });
      });
      setJoinDealList(joinDealList);
    }
  };

  //deal 과 event 와 (내가가입한) fund join!!!!
  const doJoinDealEventFund = async ({ fundList, eventList, userFund }) => {
    if (dealList.length > 0 && fundList.length > 0 && eventList.length > 0) {
      const joinDealEventFund = {};
      console.log(userFund);

      dealList.map(async (deal, index) => {
        eventList.map(async (event) => {
          fundList.forEach((fund) => {
            userFund.forEach((userfund) => {
              if (
                deal.eventId === event.id &&
                deal.fundId === fund.id &&
                userfund.fundId === fund.id
              ) {
                console.log(userfund);
                let data = {
                  id: deal.id,
                  fundName: fund.fundName,
                  fundId: fund.fundId,
                  bankName: fund.bankName,
                  bankNumber: fund.bankNumber,
                  eventId: event.id,
                  eventName: event.eventName,
                  fixedAmount: event.fixedAmount,
                  buyPrice: deal.buyPrice,
                  salePrice: deal.salePrice,
                  quantity: deal.quantity,
                  totalQuantity: deal.totalQuantity,
                  dealDate: deal.dealDate,
                  type: deal.type,
                  fundProfit: deal.fundProfit,
                  transactionFee: deal.transactionFee,
                  afterFundProfit: deal.afterFundProfit,
                  subscribePeriod: `${event.startSubscribePeriod}~${event.endSubscribePeriod}`,
                  paymentDate: event.paymentDate,
                  subscribeFee: event.subscribeFee,
                  assignmentDate: event.assignmentDate,
                  mandatoryDate: event.mandatoryDate,
                  closingPrice: event.closingPrice,
                  shareRatio:
                    Number(userfund.joinPrice) / Number(fund.fundTotalCost),
                };
                if (fund.fundName in joinDealEventFund) {
                  joinDealEventFund[fund.fundName].push(data);
                } else {
                  joinDealEventFund[fund.fundName] = [];
                  joinDealEventFund[fund.fundName].push(data);
                }
              }
            });
          });
        });
      });
      console.log(joinDealEventFund);
      setJoinDealEventFund(joinDealEventFund);
    }
  };

  const getLatestDealBy = async ({ fundId, eventId }) => {
    const dealDocs = await db
      .collection("deals")
      .where("fundId", "==", fundId)
      .where("eventId", "==", eventId)
      .orderBy("dealDate", "desc")
      .limit(1)
      .get();
    let dealDoc = null;
    dealDocs.docs.forEach((deal, index) => {
      if (index === 0) {
        dealDoc = deal.data();
      }
    });
    return dealDoc;
  };
  const dealStore = async ({ form }) => {
    console.debug(form);
    // const userEventRef = await db
    //   .collection("events")
    //   .where("eventName", "==", form.eventName)
    //   .limit(1)
    //   .get();
    // if (!userEventRef.empty) {
    //   window.alert("존재하는 종목 입니다");
    //   return;
    // }
    await db.collection("deals").add(form);
  };
  const buyStore = async ({ form }) => {
    console.log("form");
    console.log(form);
    setLoading(true);
    const dealDoc = await getLatestDealBy({
      fundId: form.fundId,
      eventId: form.eventId,
    });
    console.debug(dealDoc);
    if (dealDoc) {
      window.alert("해당하는 펀드와 종목에대한 매수내역이 이미 존재합니다.");
      setLoading(false);
      return;
    }
    console.log(form);
    console.log(`quantity ${form.quantity}`);
    console.log(`buyPrice ${form.buyPrice}`);
    console.log(`transactionFee ${form.transactionFee / 100}`);
    await db.collection("deals").add({
      fundId: form.fundId,
      eventId: form.eventId,
      dealDate: form.dealDate, // 거래 일자
      buyPrice: form.buyPrice, // 매수 금액
      salePrice: 0, // 매도 금액
      quantity: form.quantity, // 매수/매도 수량
      totalQuantity: form.quantity,
      transactionFee: form.transactionFee,
      type: form.type,
      fundProfit: 0,
      afterFundProfit:
        0 -
        Number(form.quantity) *
          Number(form.buyPrice) *
          Number(form.transactionFee / 100),
    });
    setLoading(false);
  };

  const sellStore = async ({ form, fundList }) => {
    console.log(form);
    setLoading(true);
    const dealDoc = await getLatestDealBy({
      fundId: form.fundId,
      eventId: form.eventId,
    });

    if (!dealDoc) {
      window.alert("먼저 해당 종목을 매수해야합니다.");
      setLoading(false);
      return;
    }

    /*if (
      new Date(form.dealDate).getTime() < new Date(dealDoc.dealDate).getTime()
    ) {
      window.alert("이전 거래날짜 이후로 설정해주세요.");
      setLoading(false);
      return;
    }
    */
    const dealRef = await db
      .collection("deals")
      .where("fundId", "==", form.fundId)
      .where("eventId", "==", form.eventId)
      .where("type", "==", "buy")
      .get();
    let fundProfit = 0;
    let buyPrice = 0; // 매수금액

    dealRef.docs.forEach((deal) => {
      buyPrice = deal.data().buyPrice;
    });
    fundProfit = form.salePrice * form.quantity - buyPrice * form.quantity;
    console.log(dealDoc.totalQuantity);
    console.log(form.quantity);

    await db.collection("deals").add({
      fundId: form.fundId,
      eventId: form.eventId,
      dealDate: form.dealDate, // 거래 일자
      buyPrice: 0, // 매수 금액
      salePrice: form.salePrice, // 매도 금액
      quantity: form.quantity, // 매수/매도 수량
      totalQuantity: dealDoc
        ? Number(dealDoc.totalQuantity) - Number(form.quantity)
        : 0, // 전체 잔량
      type: form.type, // sell
      fundProfit: fundProfit,
      transactionFee: form.transactionFee,
      afterFundProfit: fundProfit - form.transactionFee,
    });
    setLoading(false);
  };

  const destroy = async ({ dealId, fundId, eventId }) => {
    setLoading(true);
    const dealRef = await db
      .collection("deals")
      .where("fundId", "==", fundId)
      .where("eventId", "==", eventId)
      .orderBy("dealDate", "desc")
      .limit(1)
      .get();

    let message = "해당하는 거래기록을 삭제하시겠습니까?";
    dealRef.docs.forEach((deal) => {
      if (deal.id !== dealId) {
        message =
          "거래데이터 일관성을 유지하기 위해 가장 최신의 데이터가 삭제됩니다. 삭제하시겠습니까?";
      }
      const result = window.confirm(message);
      if (!result) return;
      db.collection("deals").doc(deal.id).delete();
    });
    setLoading(false);
  };

  return {
    getLatestDealBy,
    matchedFundId,
    setMatchedFundId,
    doJoinDealList,
    doJoinDealEventFund,
    joinDealList,
    joinDealEventFund,
    dealList,
    buyStore,
    sellStore,
    destroy,
    dealStore,
    reverseToBuy,
  };
}

export default useDeal;
