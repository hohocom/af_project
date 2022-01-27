/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { db } from "utils/firebase";
import { atom, useRecoilState } from "recoil";

const fundListState = atom({
  key: "fundListState",
  default: [],
});

export function useFundStream() {
  const [fundList, setFundList] = useRecoilState(fundListState);
  const [fundListInit, setFundListInit] = useState(false);
  useEffect(() => {
    let unsub = null;
    if (fundList.length <= 0) {
      console.debug("%c[펀드 실시간 감지..]", "color:red");
      unsub = db.collection("funds").onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((fund) => {
          return {
            id: fund.id,
            ...fund.data(),
          };
        });
        setFundList(docs);
      });
    }
    setFundListInit(true);
    return () => {
      if (unsub !== null) {
        console.debug("%c[펀드 실시간 감지 종료]", "color:red");
        unsub();
      }
    };
  }, []);

  return { fundListInit };
}

function useFund() {
  const [fundList, setFundList] = useRecoilState(fundListState);

  return {
    fundList,
  };
}

export default useFund;
