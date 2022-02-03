/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import {
  atom,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { db } from "utils/firebase";

const userListState = atom({
  key: "userListState",
  default: [],
});

export function useUserStream() {
  const [userList, setUserList] = useRecoilState(userListState);
  const [userListInit, setUserListInit] = useState(false);
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
      console.debug(userList);
      unsub();
    };
  }, []);

  return { userListInit };
}

function useUser() {
  const userList = useRecoilValue(userListState);

  const store = async ({ form }) => {
    db.collection("users").doc(form.email).set({
      email: form.email,
      name: form.name,
      birthday: form.birthday,
      address: form.address,
      phone: form.phone,
    });
  };

  const edit = async ({ form, user }) => {
    await db.collection("users").doc(user.id).set(form);
  };

  const destroy = async ({ userId }) => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("users").doc(userId).delete();
  };

  return { userList, store, edit, destroy };
}

export default useUser;
