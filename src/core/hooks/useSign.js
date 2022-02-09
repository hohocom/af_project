/* eslint-disable react-hooks/exhaustive-deps */
import { managerDetailState, userDetailState } from "core/state";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { auth, db } from "utils/firebase";

export function useSignObserver() {
  const setManager = useSetRecoilState(managerDetailState);
  const setUser = useSetRecoilState(userDetailState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (user) => {
      console.debug("%c[로그인/로그아웃 감지]", "color:purple");
      if (user) {
        const userRef = await db.collection("users").doc(user.email).get();

        //로그인은 되었는데 문서가 없는 상황
        if (userRef.data() === undefined) return;

        if (userRef.data().role === "ADMIN") {
          setManager({
            id: userRef.id,
            ...userRef.data(),
          });
        } else {
          setUser({
            id: userRef.id,
            ...userRef.data(),
          });
        }
      } else {
        setManager(null);
        setUser(null);
      }
      setLoading(true);
    });

    return () => {
      console.debug("%c[로그인/로그아웃 감지 종료]", "color:purple");
      unsub();
    };
  }, []);

  return {
    loading,
  };
}
