/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { db } from "utils/firebase";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { fundListInitState, fundListState } from "core/state";

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
    const dealRef = await db
      .collection("deals")
      .where("fundId", "==", id)
      .get();
    if (!dealRef.empty) {
      dealRef.docs.forEach(async (doc) => {
        console.debug(doc.data());
        await doc.ref.delete();
      });
    }
    const userFundRef = await db
      .collection("userFunds")
      .where("fundId", "==", id)
      .get();
    if (!userFundRef.empty) {
      userFundRef.docs.forEach(async (doc) => {
        console.debug(doc.data());
        await doc.ref.delete();
      });
    }
  };

  return {
    fundList,
    store,
    edit,
    destroy,
  };
}

export default useFund;
