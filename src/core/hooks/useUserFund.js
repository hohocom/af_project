/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { fundListState, userDetailState } from "core/state";
import { useEffect } from "react";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { db } from "utils/firebase";
import useUser from "./useUser";

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
  const { userList } = useUser();
  const userFundList = useRecoilValue(userFundListState); //user 가입한 fundList
  const fundList = useRecoilValue(fundListState); // 전체 fundList

  //joinform -> innerJoin 일때 innerJoin
  //joinform -> leftOuterJoin 일때 leftOuterJoin

  //user과 userfunds join
  const getUserJoinUserFundList = ({ joinForm = "innerJoin" }) => {
    const joinUserFundList = [];
    let isjoin = false;
    if (fundList.length > 0) {
      userList.forEach((user) => {
        isjoin = false;
        userFundList.forEach((userFund) => {
          if (userFund.userId === user.email) {
            isjoin = true;
            joinUserFundList.push({
              id: userFund.id,
              userName: user.name,
              userId: user.id,
              fundId: userFund.fundId,
              joinDate: userFund.joinDate,
              joinPrice: userFund.joinPrice,
            });
          }
        });
        if (isjoin === false && joinForm === "leftOuterJoin") {
          joinUserFundList.push({
            id: "",
            userName: user.name,
            userId: user.id,
            fundId: "",
            joinDate: "",
            joinPrice: "",
          });
        }
      });
    }

    return joinUserFundList;
  };

  //user과 userfunds 와 funds join
  const getUserJoinUserFundJoinFundList = ({ joinForm = "innerJoin" }) => {
    const joinUserFundList = [];
    let isjoin = false;
    if (fundList.length > 0) {
      userList.forEach((user) => {
        isjoin = false;
        userFundList.forEach((userFund) => {
          fundList.forEach((fund) => {
            if (userFund.fundId === fund.id) {
              if (userFund.userId === user.email) {
                isjoin = true;
                joinUserFundList.push({
                  id: userFund.id,
                  userName: user.name,
                  userId: user.id,
                  uid: user.uid,
                  address: user.address,
                  birthday: user.birthday,
                  phone: user.phone,
                  bankName: user.bankName,
                  bankNumber: user.bankNumber,
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
            }
          });
        });
        if (isjoin === false && joinForm === "leftOuterJoin") {
          joinUserFundList.push({
            id: "",
            userName: user.name,
            userId: user.id,
            uid: user.uid,
            birthday: user.birthday,
            address: user.address,
            phone: user.phone,
            bankName: user.bankName,
            bankNumber: user.bankNumber,
            fundId: "",
            fundName: "",
            incentive: "",
            joinDate: "",
            fundTotalCost: "",
            joinPrice: "",
            fundDefaultFee: "",
            shareRatio: "",
            joinPeriod: "",
            target: "",
            // totalFundProfit :
          });
        }
      });
    }

    return joinUserFundList;
  };

  // userfunds 와 funds join
  const getJoinUserFundList = () => {
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

  const fundStore = async ({ form }) => {
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
    getUserJoinUserFundJoinFundList,
    userFundList,
    fundStore,
    edit,
    destroy,
    getUserJoinUserFundList,
    getJoinUserFundList,
  };
}

export default useUserFund;
