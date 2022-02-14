import { Header, MobileLayout } from "components/layouts";
import img01 from "assets/images/conclusion/01.svg";
import { withPrivate } from "components/common";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userDetailState } from "core/state";
import { fundListState } from "core/state";
import { useUserFund } from "core/hooks";
import { db } from "utils/firebase";

function ConclusionPage() {
  const user = useRecoilValue(userDetailState);
  const fundList = useRecoilValue(fundListState);
  const { getJoinUserFundList } = useUserFund(); //내가 가입한 펀드정보
  const [buyList, setBuyList] = useState();

  const getBuyList = async () => {
    console.debug("getBuyList");
    let result = [];
    await Promise.all(
      getJoinUserFundList({ fundList }).map(async (userFund, index) => {
        if (userFund.userId === user.id) {
          const dealRef = await db
            .collection("deals")
            .where("fundId", "==", userFund.fundId)
            .get();
          dealRef.docs.forEach((deal) => {
            result.push(deal.data());
          });
        }
      })
    );
    setBuyList(result);
  };

  useEffect(() => {
    getBuyList();
  }, []);
  useEffect(() => {
    console.log(buyList);
  }, [buyList]);

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
                <th className="p-2 border-r">
                  날짜
                  <br />
                  종목명
                </th>
                <th className="p-2 border-r">
                  매수가
                  <br />
                  매수량
                </th>
                <th className="p-2 border-r">
                  매도가
                  <br />
                  매도량
                </th>
                <th>
                  금액
                  <br />
                  비고
                </th>
              </tr>
            </thead>
            <tbody className="font-apple-sb">
              <tr className="border-t">
                <td className="border-r">
                  <div className="p-1">
                    <p>2021-03-04</p>
                    <p>케이티비 네트워크 솔루션</p>
                  </div>
                </td>
                <td className="border-r">
                  <div className="flex flex-col items-end p-1">
                    <p>500,000원</p>
                    <nobr>300주</nobr>
                  </div>
                </td>
                <td className="border-r">
                  <div className="flex flex-col items-end p-1">
                    <p>150,000,000원</p>
                    <p>300주</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-end p-1">
                    <p>9,800원</p>
                    <p>5,000,000원</p>
                  </div>
                </td>
              </tr>
              <tr className="border-t">
                <td className="border-r">
                  <div className="p-1">
                    <p>2021-03-04</p>
                    <p>케이티비 네트워크 솔루션</p>
                  </div>
                </td>
                <td className="border-r">
                  <div className="flex flex-col items-end p-1">
                    <p>500,000원</p>
                    <nobr>300주</nobr>
                  </div>
                </td>
                <td className="border-r">
                  <div className="flex flex-col items-end p-1">
                    <p>150,000,000원</p>
                    <p>300주</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-end p-1">
                    <p>9,800원</p>
                    <p>5,000,000원</p>
                  </div>
                </td>
              </tr>
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

export default withPrivate(ConclusionPage);
