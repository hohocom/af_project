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

  return { eventListInit };
}

function useEvent() {
  const [eventList, setEventList] = useRecoilState(eventListState);

  return {
    eventList,
  };
}

export default useEvent;
