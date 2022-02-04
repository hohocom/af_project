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
  const [joinDealList, setJoinDealList] = useRecoilState(joinDealListState);
  const [dealListInit, setDealListInit] = useState(false);

  useEffect(() => {
    const unsub = db.collection("deals").onSnapshot((snapshot) => {
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

  const doJoinDealList = ({ fundList, eventList }) => {
    if (dealList.length > 0 && fundList.length > 0 && eventList.length > 0) {
      const joinDealList = [];
      dealList.forEach((deal) => {
        eventList.forEach((event) => {
          if (deal.eventId === event.id) {
            console.debug(event);
            joinDealList.push({
              id: deal.id,
              fundId: deal.fundId,
              dealDate: deal.dealDate,
              eventName: event.eventName,
              fixedAmount: event.fixedAmount,
              quantity: deal.quantity,
              type: deal.type,
            });
          }
        });
      });
      setJoinDealList(joinDealList);
    }
  };

  return {
    dealList,
    joinDealList,
    dealListInit,
    doJoinDealList,
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
              dealDate: deal.dealDate,
              eventName: event.eventName,
              fixedAmount: event.fixedAmount,
              quantity: deal.quantity,
              type: deal.type,
            });
          }
        });
      });
      setJoinDealList(joinDealList);
    }
  };

  return {
    getMatchedList,
    matchedFundId,
    setMatchedFundId,
    doJoinDealList,
    joinDealList,
    dealList,
  };
}

export default useDeal;
