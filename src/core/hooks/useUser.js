/* eslint-disable react-hooks/exhaustive-deps */
import { userListInitState, userListState } from "core/state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "utils/firebase";

export function useUserStream() {
  const setUserList = useSetRecoilState(userListState);
  const setUserListInit = useSetRecoilState(userListInitState);

  useEffect(() => {
    console.debug("%c[회원 실시간 감지..]", "color:red");
    const unsub = db.collection("users").onSnapshot((snapshot) => {
      const docs = snapshot.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      });
      setUserList(docs);
    });

    setUserListInit(true);
    return () => {
      console.debug("%c[회원 실시간 감지 종료]", "color:red");
      unsub();
    };
  }, []);
}

function useUser() {
  const userList = useRecoilValue(userListState);

  const store = async ({ form }) => {
    await db.collection("users").doc(form.email).set(form);
  };

  const edit = async ({ form, user }) => {
    await db.collection("users").doc(user.id).set(form);
  };

  const destroy = async ({ userId }) => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("users").doc(userId).delete();
    const userFundRef = await db
      .collection("userFunds")
      .where("userId", "==", userId)
      .get();
    if (!userFundRef.empty) {
      userFundRef.docs.forEach(async (doc) => {
        console.debug(doc.data());
        await doc.ref.delete();
      });
    }
  };

  return { userList, store, edit, destroy };
}

export default useUser;
