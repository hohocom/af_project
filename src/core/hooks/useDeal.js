/* eslint-disable react-hooks/exhaustive-deps */
import { atom, useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { db } from "utils/firebase";

const dealListState = atom({
  key: "dealListState",
  default: [],
});

export function useDealStream() {
  const [dealList, setDealList] = useRecoilState(dealListState);
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

  return {
    dealList,
    dealListInit,
  };
}

function useDeal() {}

export default useDeal;
