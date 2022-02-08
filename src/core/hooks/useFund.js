/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { db } from "utils/firebase";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

const fundListState = atom({
  key: "fundListState",
  default: [],
});

export const fundListInitState = atom({
  key: "fundListInitState",
  default: false,
});

export function useFundStream() {
  const setFundList = useSetRecoilState(fundListState);
  const setFundListInit = useSetRecoilState(fundListInitState);
  useEffect(() => {
    console.debug("%c[펀드 실시간 감지..]", "color:red");
    const unsub = db.collection("funds").onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((fund) => {
        return {
          id: fund.id,
          ...fund.data(),
        };
      });
      setFundList(docs);
    });

    setFundListInit(true);
    return () => {
      console.debug("%c[펀드 실시간 감지 종료]", "color:red");
      unsub();
    };
  }, []);
}

function useFund() {
  const fundList = useRecoilValue(fundListState);

  const store = async ({ form }) => {
    await db.collection("funds").add(form);
  };

  const edit = async ({ id, form }) => {
    await db.collection("funds").doc(id).set(form);
  };

  const destroy = async ({ id }) => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("funds").doc(id).delete();
  };

  return {
    fundList,
    store,
    edit,
    destroy,
  };
}

export default useFund;
