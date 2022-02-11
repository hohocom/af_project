import { MobileLayout } from "components/layouts";
import img01 from "assets/images/conclusion/01.svg";
import { withPrivate } from "components/common";
import { useEffect, useState } from "react";
import { useUserFund } from "core/hooks";
import { useRecoilValue } from "recoil";
import { fundListState } from "core/state";
import { db } from "utils/firebase";
import { userDetailState } from "core/state";
import { currency } from "utils/currency";

function ProfitOrLossPage() {
  const user = useRecoilValue(userDetailState);
  const [datas, setDatas] = useState([]);
  const fundList = useRecoilValue(fundListState);
  const { getJoinUserFundList } = useUserFund(); //내가 가입한 펀드정보
  const [dealRef, setDealRef] = useState();
  useEffect(() => {
    FundProfitAll(); //내가 가입한 펀드의 수익률
  }, []);
  const resultArray = [];
  const FundProfitAll = async () => {
    const joinUserFundList = getJoinUserFundList({ fundList });
    joinUserFundList.forEach(async (userFund, index) => {
      // 펀드 갯수만큼!
      if (userFund.userId === user.id) {
        const dealRef = await db
          .collection("deals")
          .where("fundId", "==", userFund.fundId)
          .where("type", "==", "sell")
          .get();

        setDealRef(dealRef);
        // dealRef.docs.forEach((deal, index) => {
        //   resultArray.push({
        //     dealDate: deal.data().dealDate,
        //     fundProfit: deal.data().fundProfit,
        //     transactionFee: deal.data().transactionFee,
        //     afterFundProfit: deal.data().afterFundProfit,
        //   });
        // });
      }
    });
    console.log(resultArray);
  };
  useEffect(() => {
    console.log(dealRef);
    // dealRef.docs.forEach((deal, index) => {
    //   resultArray.push({
    //     dealDate: deal.data().dealDate,
    //     fundProfit: deal.data().fundProfit,
    //     transactionFee: deal.data().transactionFee,
    //     afterFundProfit: deal.data().afterFundProfit,
    //   });
    // });
    // setDatas(resultArray);
  }, [dealRef]);

  useEffect(() => {
    console.log("Data");
    // console.log(datas);
    // console.log(datas);
  }, [datas]);

  return (
    <MobileLayout>
      <div className="flex flex-col w-full p-4">
        <div className="flex items-center justify-start w-full ">
          <img src={img01} alt="img_01" className="w-[20px] mr-2" />
          <p>조회기간</p>
        </div>
        <div className="flex justify-between items-center max-w-[100%] mt-4">
          <label htmlFor="date1" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date1"
              type="date"
              className="w-full bg-white outline-none"
            />
          </label>
          <div className="mx-2 text-xl">~</div>
          <label htmlFor="date2" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date2"
              type="date"
              className="w-full bg-white outline-none"
            />
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button className="p-2 w-[80px] bg-white rounded-md">1개월</button>
          <button className="p-2 w-[80px] bg-white rounded-md">3개월</button>
          <button className="p-2 w-[80px] bg-white rounded-md">6개월</button>
          <button className="p-2 w-[80px] bg-white rounded-md">1년</button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="p-2 w-[70%] bg-blue-600 rounded-md text-white">
            조회
          </button>
        </div>

        <div className="w-full mt-6 bg-white rounded-md">
          <table className="w-full text-xs table-fixed">
            <thead>
              <tr>
                <th className="p-2 border-r">날짜</th>
                <th className="p-2 border-r">수수료</th>
                <th className="p-2 border-r">손익</th>
                <th>수수료 후 실손익</th>
              </tr>
            </thead>
            <tbody className="font-apple-sb">
              {datas.map((data, index) => {
                return (
                  <tr className="border-t" key={index}>
                    <td className="border-r">
                      <div className="p-1">
                        <p>{data.dealDate}</p>
                      </div>
                    </td>
                    <td className="border-r">
                      <div className="flex flex-col items-end p-1">
                        <p>{currency(data.transactionFee)}원</p>
                      </div>
                    </td>
                    <td className="border-r">
                      <div className="flex flex-col items-end p-1">
                        <p>{currency(data.fundProfit)}원</p>
                      </div>
                    </td>
                    <td>
                      <div className="flex flex-col items-end p-1">
                        <p>{currency(data.afterFundProfit)}원</p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="p-2 w-[70%] bg-blue-600 rounded-md text-white">
            더보기(1/2)
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

export default withPrivate(ProfitOrLossPage);
