/* eslint-disable react-hooks/exhaustive-deps */
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
  const fundList = useRecoilValue(fundListState);
  const { getJoinUserFundList } = useUserFund(); //내가 가입한 펀드정보
  const [dealRef, setDealRef] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [open, setOpen] = useState(false);
  const d = new Date();
  const year = d.getFullYear(); // 년
  const month = d.getMonth(); // 월
  const day = d.getDate(); // 일

  const fundProfitAll = async () => {
    console.debug("fundProfitAll");
    let resultArray = [];
    await Promise.all(
      getJoinUserFundList({ fundList }).map(async (userFund, index) => {
        if (userFund.userId === user.id) {
          const dealRef = await db
            .collection("deals")
            .where("fundId", "==", userFund.fundId)
            .where("type", "==", "sell")
            .get();

          dealRef.docs.forEach((deal, index) => {
            resultArray.push(deal.data());
          });
        }
      })
    );
    // 결과 내림차순으로 정렬
    resultArray.sort(function (a, b) {
      return new Date(b.dealDate) - new Date(a.dealDate);
    });
    setDealRef(resultArray);
  };

  useEffect(() => {
    fundProfitAll(); //내가 가입한 펀드의 수익
  }, []);

  // 기간조회
  const getDateFilterList = () => {
    let result = [];
    dealRef.forEach((deal) => {
      if (
        new Date(deal.dealDate) >= new Date(startDate) &&
        new Date(deal.dealDate) <= new Date(endDate)
      ) {
        result.push(deal);
      }
    });
    return result;
  };
  useEffect(() => {
    console.log(startDate);
  }, [startDate, endDate]);
  useEffect(() => {
    console.log(endDate);
  }, [endDate]);
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
              onChange={(e) => {
                setStartDate(e.target.value);
              }}
            />
          </label>
          <div className="mx-2 text-xl">~</div>
          <label htmlFor="date2" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date2"
              type="date"
              className="w-full bg-white outline-none"
              onChange={(e) => {
                setEndDate(e.target.value);
              }}
            />
          </label>
        </div>

        <div className="flex items-center justify-between mt-4">
          <button
            className="p-2 w-[80px] bg-white rounded-md"
            onClick={() => {
              setStartDate(new Date(year, month - 1, day));
              setEndDate(new Date());
              setOpen(true);
            }}
          >
            1개월
          </button>
          <button
            className="p-2 w-[80px] bg-white rounded-md"
            onClick={() => {
              setStartDate(new Date(year, month - 3, day));
              setEndDate(new Date());
              setOpen(true);
            }}
          >
            3개월
          </button>
          <button
            className="p-2 w-[80px] bg-white rounded-md"
            onClick={() => {
              setStartDate(new Date(year, month - 6, day));
              setEndDate(new Date());
              setOpen(true);
            }}
          >
            6개월
          </button>
          <button
            className="p-2 w-[80px] bg-white rounded-md"
            onClick={() => {
              setStartDate(new Date(year, month - 12, day));
              setEndDate(new Date());
              setOpen(true);
            }}
          >
            1년
          </button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button
            className="p-2 w-[70%] bg-blue-600 rounded-md text-white"
            onClick={() => setOpen(true)}
          >
            조회
          </button>
        </div>

        {open && (
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
                {getDateFilterList().map((data, index) => {
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
        )}
      </div>
    </MobileLayout>
  );
}

export default withPrivate(ProfitOrLossPage);
