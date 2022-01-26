import { withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { DealForm } from "components/layouts/admin";
import { useModal } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function AdminDealPage() {
  const { open } = useModal();
  const [init, setInit] = useState(false);
  const [deals, setDeals] = useState([]);

  const [checkedFundId, setCheckedFundId] = useState(null);
  const [funds, setFunds] = useState([]);
  const [events, setEvents] = useState([]);

  const openUpdateFormEvent = ({ event }) => {
    open({ setView: <DealForm events={events} funds={funds} /> });
  };

  const openCreateFormEvent = () => {
    open({ setView: <DealForm events={events} funds={funds} /> });
  };

  const openEventDetailEvent = ({ event }) => {
    open({ setView: <DealForm /> });
  };

  useEffect(() => {
    const unsub = db.collection("deals").onSnapshot((snapshot) => {
      const newDeals = snapshot.docs.map((deal) => {
        return {
          id: deal.id,
          ...deal.data(),
        };
      });
      setDeals(newDeals);
      setInit(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = db.collection("funds").onSnapshot((snapshot) => {
      const newFunds = snapshot.docs.map((fund) => {
        return {
          id: fund.id,
          ...fund.data(),
        };
      });
      setFunds(newFunds);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    const unsub = db.collection("events").onSnapshot((snapshot) => {
      const newEvents = snapshot.docs.map((event) => {
        return {
          id: event.id,
          ...event.data(),
        };
      });
      setEvents(newEvents);
    });
    return () => unsub();
  }, []);

  const getEventValue = async () => {
    return deals.map(async (deal, index) => {
      console.debug(deal);
      if (deal.fundId === checkedFundId) {
        const snapshot = await db.collection("events").doc(deal.eventId).get();
        console.debug(snapshot.data());
        return (
          <tr
            key={deal.id}
            onClick={() => openEventDetailEvent({ deal })}
            className="cursor-pointer"
          >
            <td>{index + 1}</td>
            <td>{deal.dealDate}</td>
            <td>{snapshot.data().eventName}</td>
            <td>공모가격</td>
            <td>-</td>
            <td>{deal.quantity}주</td>
            <td>{deal.quantity}주</td>
          </tr>
        );
      }
    });
  };

  return (
    <AdminLayout title="거래관리">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex">
            <button
              onClick={openCreateFormEvent}
              className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              거래 생성
            </button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex">
            <select
              className="p-2 border rounded-md bg-white mr-6"
              onChange={(e) => setCheckedFundId(e.target.value)}
            >
              <option className="p-2">펀드선택</option>
              {funds.map((fund) => {
                return (
                  <option key={fund.id} value={fund.id} className="p-2">
                    {fund.fundName}
                  </option>
                );
              })}
            </select>
            <div className="flex items-center gap-8">
              <label className="inline-flex items-center">
                <input type="radio" name="vehicle" className="h-5 w-5" />
                <span className="ml-2 text-gray-700">전체</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="vehicle" className="h-5 w-5" />
                <span className="ml-2 text-gray-700">매수</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="vehicle" className="h-5 w-5" />
                <span className="ml-2 text-gray-700">매도</span>
              </label>
            </div>
          </div>

          <div className="text-end">
            <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="name"
                />
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                검색
              </button>
            </div>
          </div>
        </div>
        <table className="table w-full p-4 bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b text-gray-900">
              <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                No
              </th>
              <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                거래날짜
              </th>
              <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                종목명
              </th>
              <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                매수가
              </th>
              <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                매도가
              </th>
              <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                수량
              </th>
              <th className="p-4 font-normal dark:border-dark-5 whitespace-nowrap">
                거래잔량
              </th>
            </tr>
          </thead>
          <tbody>
            {init ? (
              <>
                {deals.length > 0 ? (
                  deals.map((deal, index) => {
                    if (deal.fundId === checkedFundId) {
                      return (
                        <tr
                          key={deal.id}
                          onClick={() => openEventDetailEvent({ deal })}
                          className="border-b cursor-pointer text-gray-700"
                        >
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap text-center">
                            {index + 1}
                          </td>
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                            {deal.dealDate}
                          </td>
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                            {deal.dealDate}
                          </td>
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                            공모가격
                          </td>
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                            -
                          </td>
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                            {deal.quantity}주
                          </td>
                          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                            {deal.quantity}주
                          </td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <tr>
                    <td className="p-4" colSpan={5}>
                      생성된 종목이 없습니다.
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td className="p-4" colSpan={5}>
                  로딩중..
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex flex-col items-center px-5 py-5 xs:flex-row xs:justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
            >
              <svg
                width="9"
                fill="currentColor"
                height="8"
                className=""
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
            >
              1
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
            >
              2
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
            >
              3
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
            >
              4
            </button>
            <button
              type="button"
              className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
            >
              <svg
                width="9"
                fill="currentColor"
                height="8"
                className=""
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminDealPage);
