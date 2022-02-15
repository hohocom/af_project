/* eslint-disable react-hooks/exhaustive-deps */
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useEffect, useState } from "react";
import { db } from "utils/firebase";
import { dealListInit, dealListState, joinDealListState } from "core/state";

export function useDealStream() {
  const setDealList = useSetRecoilState(dealListState);
  const setDealListInit = useSetRecoilState(dealListInit);

  useEffect(() => {
    console.debug("%c[거래 실시간 감지..]", "color:red");
    const unsub = db
      .collection("deals")
      .orderBy("dealDate", "desc")
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
  const [matchedFundId, setMatchedFundId] = useState(null);

  const doJoinDealList = ({ fundList, eventList, type = "all" }) => {
    if (dealList.length > 0 && fundList.length > 0 && eventList.length > 0) {
      const joinDealList = [];

      //events 와 deals join
      dealList.forEach((deal, index) => {
        eventList.forEach((event) => {
          let fundName = "";
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
            });
          }
        });
      });
      setJoinDealList(joinDealList);
    }
  };

  const getFilterDeal = async ({ form }) => {
    const dealDocs = await db
      .collection("deals")
      .where("fundId", "==", form.fundId)
      .where("eventId", "==", form.eventId)
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

  const buyStore = async ({ form }) => {
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
      transactionFee:
        Number(form.quantity) *
        Number(form.buyPrice) *
        Number(form.transactionFee / 100),
      type: form.type,
      fundProfit: 0,
      afterFundProfit:
        0 -
        Number(form.quantity) *
          Number(form.buyPrice) *
          Number(form.transactionFee / 100),
    });
  };

  const sellStore = async ({ form, fundList }) => {
    const dealDoc = await getFilterDeal({ form });

    if (!dealDoc) {
      window.alert("먼저 해당 종목을 매수해야합니다.");
      return;
    }

    if (
      new Date(form.dealDate).getTime() < new Date(dealDoc.dealDate).getTime()
    ) {
      window.alert("이전 거래날짜 이후로 설정해주세요.");
      return;
    }

    // 거래 수수료(transitionfee) = (매도금액*매도수량) * 거래수수료(fundList참조)
    // let transactionFee = 0;
    // let fundRatio = 0;

    // fundList.forEach((fund) => {
    //   if (fund.id === form.fundId) {
    //     fundRatio = fund.transactionFee;
    //   }
    // });
    // transactionFee = form.salePrice * form.quantity * (fundRatio / 100);
    // console.debug(transactionFee);
    // 펀드 수익 (fundProfit) = (매도금액*매도수량)-(매수금액*매도수량)-거래수수료
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
    // let afterFundProfit = 0;
    // afterFundProfit =
    //   form.salePrice * form.quantity -
    //   buyPrice * form.quantity -
    //   transactionFee;
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
  };

  const destroy = async ({ dealId, fundId, eventId }) => {
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
  };

  return {
    matchedFundId,
    setMatchedFundId,
    doJoinDealList,
    joinDealList,
    dealList,
    buyStore,
    sellStore,
    destroy,
  };
}

export default useDeal;
