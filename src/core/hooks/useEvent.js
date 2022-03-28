/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { eventListInitState, eventListState, loadingState } from "core/state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getClosingPrice } from "utils/closingPrice";
import { db } from "utils/firebase";

export function useEventStream() {
  const setEventList = useSetRecoilState(eventListState);
  const setEventListInit = useSetRecoilState(eventListInitState);
  useEffect(() => {
    console.debug("%c[종목 실시간 감지..]", "color:red");
    const unsub = db.collection("events").onSnapshot(async (snapshot) => {
      const docs = await Promise.all(
        snapshot.docs.map(async (fund) => {
          let closingPrice = await getClosingPrice(fund.data().eventName);
          return {
            id: fund.id,
            ...fund.data(),
            closingPrice: closingPrice,
          };
        })
      );
      setEventList(docs);
      setEventListInit(true);
    });

    return () => {
      console.debug("%c[종목 실시간 감지 종료]", "color:red");
      unsub();
    };
  }, []);
}

function useEvent() {
  const eventList = useRecoilValue(eventListState);
  const setLoading = useSetRecoilState(loadingState);

  const store = async ({ form, isPublicOffering }) => {
    setLoading(true);
    const result = await db
      .collection("events")
      .add({ ...form, isPublicOffering: isPublicOffering });
    setLoading(false);
    return result.id;
  };

  const edit = async ({ id, form }) => {
    setLoading(true);
    await db.collection("events").doc(id).set(form);
    setLoading(false);
  };

  const destroy = async ({ id }) => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    setLoading(true);
    await db.collection("events").doc(id).delete();
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
    setLoading(false);
  };

  return {
    eventList,
    store,
    edit,
    destroy,
  };
}

export default useEvent;
