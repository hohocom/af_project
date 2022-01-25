import { atom } from "recoil";

const fundState = atom({
  key: "fundState",
  default: {
    id: "", // ID
    fundName: "", // 펀드이름
    defaultFee: 0.0, // 기본 수수료
    transactionFee: 0.0, // 거래 수수료
    target: "", // 대상
    fundTotalCost: 0, //펀드 전체금액
    incentive: 0.0, // 인센티브
    startJoinPeriod: new Date(), // 가입기간(시작)
    endJoinPeriod: new Date(), // 가입기간(종료)
  },
});
export default fundState;
