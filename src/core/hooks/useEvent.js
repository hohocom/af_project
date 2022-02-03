/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import { db } from "utils/firebase";

const eventListState = atom({
  key: "eventListState",
  default: [],
});

export function useEventStream() {
  const [eventList, setEventList] = useRecoilState(eventListState);
  const [eventListInit, setEventListInit] = useState(false);
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

  return { eventList, eventListInit };
}

function useEvent() {
  const [eventList, setEventList] = useRecoilState(eventListState);

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