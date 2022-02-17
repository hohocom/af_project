/* eslint-disable react-hooks/exhaustive-deps */
import { loadingState, userListInitState, userListState } from "core/state";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "utils/firebase";
import axios from "axios";

export function useUserStream() {
  const setUserList = useSetRecoilState(userListState);
  const setUserListInit = useSetRecoilState(userListInitState);

  useEffect(() => {
    console.debug("%c[회원 실시간 감지..]", "color:red");
    const unsub = db
      .collection("users")
      .where("role", "!=", "ADMIN")
      .onSnapshot((snapshot) => {
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
  const setLoading = useSetRecoilState(loadingState);

  const store = async ({ form }) => {
    setLoading(true);

    await axios({
      method: "get",
      url: `https://asia-northeast3-af-project-83d10.cloudfunctions.net/users/create-user?email=${form.email}&birthday=${form.birthday}`,
    })
      .then(async (result) => {
        console.debug(result.data);
        await db
          .collection("users")
          .doc(form.email)
          .set({
            ...form,
            role: "USER",
            uid: result.data.uid,
          });
        setLoading(false);
      })
      .catch((err) => {
        console.debug(err);
        console.debug("에러");
        setLoading(false);
      });
  };

  const edit = async ({ form, user }) => {
    setLoading(true);
    await db.collection("users").doc(user.id).set(form);
    setLoading(false);
  };

  const destroy = async ({ user }) => {
    setLoading(true);
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;

    await axios({
      method: "delete",
      url: `https://asia-northeast3-af-project-83d10.cloudfunctions.net/users/delete-user?uid=${user.uid}`,
    })
      .then(async () => {
        console.debug("회원 삭제 성공");
        await db.collection("users").doc(user.id).delete();
        const userFundRef = await db
          .collection("userFunds")
          .where("userId", "==", user.id)
          .get();
        if (!userFundRef.empty) {
          userFundRef.docs.forEach(async (doc) => {
            console.debug(doc.data());
            await doc.ref.delete();
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        console.debug(err);
        console.debug("에러");
        setLoading(false);
      });
  };

  return { userList, store, edit, destroy };
}

export default useUser;
