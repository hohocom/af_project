/* eslint-disable react-hooks/exhaustive-deps */
import { eventListInitState, eventListState } from "core/state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "utils/firebase";

export function useEventStream() {
  const setEventList = useSetRecoilState(eventListState);
  const setEventListInit = useSetRecoilState(eventListInitState);
  useEffect(() => {
    console.debug("%c[종목 실시간 감지..]", "color:red");
    const unsub = db.collection("events").onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((fund) => {
        return {
          id: fund.id,
          ...fund.data(),
        };
      });
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

  const store = async ({ form }) => {
    await db.collection("events").add(form);
  };

  const edit = async ({ id, form }) => {
    await db.collection("events").doc(id).set(form);
  };

  const destroy = async ({ id }) => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("events").doc(id).delete();
  };

  return {
    eventList,
    store,
    edit,
    destroy,
  };
}

export default useEvent;
