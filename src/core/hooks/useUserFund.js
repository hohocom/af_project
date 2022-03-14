/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "utils/firebase";

export const userFundListState = atom({
  key: "userFundListState",
  default: [],
});
export const userFundListInitState = atom({
  key: "userFundListInitState",
  default: [],
});

export function useUserFundStream() {
  const setUserFundList = useSetRecoilState(userFundListState);
  const setUserFundListInit = useSetRecoilState(userFundListInitState);
  useEffect(() => {
    console.debug("%c[회원별펀드 실시간 감지..]", "color:red");
    const unsub = db
      .collection("userFunds")
      .orderBy("joinDate", "desc")
      .onSnapshot((snapshot) => {
        const newUfs = snapshot.docs.map((uf) => {
          return {
            id: uf.id,
            ...uf.data(),
          };
        });
        console.log(newUfs);
        setUserFundList(newUfs);
        setUserFundListInit(true);
      });

    return () => {
      console.debug("%c[회원별펀드 실시간 감지 종료..]", "color:red");
      unsub();
    };
  }, []);
}

function useUserFund() {
  const userFundList = useRecoilValue(userFundListState);

  const getJoinUserFundList = ({ fundList }) => {
    const joinUserFundList = [];
    if (fundList.length > 0) {
      userFundList.forEach((userFund) => {
        fundList.forEach((fund) => {
          if (userFund.fundId === fund.id) {
            joinUserFundList.push({
              id: userFund.id,
              userId: userFund.userId,
              fundId: userFund.fundId,
              fundName: fund.fundName,
              incentive: fund.incentive,
              joinDate: userFund.joinDate,
              fundTotalCost: fund.fundTotalCost,
              joinPrice: userFund.joinPrice,
              fundDefaultFee: fund.defaultFee,
              shareRatio:
                Number(userFund.joinPrice) / Number(fund.fundTotalCost),
              joinPeriod: `${fund.startJoinPeriod}~${fund.endJoinPeriod}`,
              target: fund.target,
              // totalFundProfit :
            });
          }
        });
      });
    }

    return joinUserFundList;
  };
  // 주식 종가 얻어오기

  const store = async ({ form }) => {
    console.debug(form);
    const userFundRef = await db
      .collection("userFunds")
      .where("userId", "==", form.userId)
      .where("fundId", "==", form.fundId)
      .limit(1)
      .get();
    if (!userFundRef.empty) {
      window.alert("이미 가입한 펀드입니다.");
      return;
    }
    await db.collection("userFunds").add(form);
  };

  const edit = async ({ form, id }) => {
    await db.collection("userFunds").doc(id).update(form);
  };

  const destroy = async ({ id }) => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("userFunds").doc(id).delete();
  };

  return {
    getJoinUserFundList,
    userFundList,
    store,
    edit,
    destroy,
  };
}

export default useUserFund;
