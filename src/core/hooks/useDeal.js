/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { db } from "utils/firebase";

const dealListState = atom({
  key: "dealListState",
  default: [],
});

const joinDealListState = atom({
  key: "joinDealListState",
  default: [],
});

export function useDealStream() {
  const [dealList, setDealList] = useRecoilState(dealListState);
  const [dealListInit, setDealListInit] = useState(false);

  useEffect(() => {
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
    return () => unsub();
  }, []);

  return {
    dealList,
    dealListInit,
  };
}

function useDeal() {
  const [dealList, setDealList] = useRecoilState(dealListState);
  const [joinDealList, setJoinDealList] = useRecoilState(joinDealListState);
  const [matchedFundId, setMatchedFundId] = useState(null);

  const getMatchedList = ({ list }) => {
    const newList = [];
    list.forEach((item) => {
      if (item.fundId === matchedFundId) {
        newList.push(item);
      }
    });

    return newList;
  };

  const doJoinDealList = ({ fundList, eventList }) => {
    console.debug(dealList);
    if (dealList.length > 0 && fundList.length > 0 && eventList.length > 0) {
      const joinDealList = [];
      dealList.forEach((deal) => {
        eventList.forEach((event) => {
          if (deal.eventId === event.id) {
            console.debug(event);
            joinDealList.push({
              id: deal.id,
              fundId: deal.fundId,
              eventId: event.id,
              eventName: event.eventName,
              buyPrice: deal.buyPrice,
              salePrice: deal.salePrice,
              quantity: deal.quantity,
              totalQuantity: deal.totalQuantity,
              dealDate: deal.dealDate,
              type: deal.type,
            });
          }
        });
      });
      setJoinDealList(joinDealList);
    }
  };

  const store = async ({ form }) => {
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

    if (!dealDoc) {
      await db.collection("deals").add(form);
    } else {
      await db.collection("deals").add({
        fundId: form.fundId,
        eventId: form.eventId,
        dealDate: form.dealDate, // 거래 일자
        buyPrice: form.buyPrice, // 매수 금액
        salePrice: 0, // 매도 금액
        quantity: form.quantity, // 매수/매도 수량
        totalQuantity: dealDoc
          ? Number(dealDoc.totalQuantity) + Number(form.quantity)
          : 0, // 전체 잔량
        type: form.type, // sell
      });
    }
  };

  const edit = async ({ form }) => {
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
    getMatchedList,
    matchedFundId,
    setMatchedFundId,
    doJoinDealList,
    joinDealList,
    dealList,
    store,
    edit,
    destroy,
  };
}

export default useDeal;
