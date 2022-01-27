/* eslint-disable array-callback-return */
import { Pager, Table, withPrivate } from "components/common";
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
              className="p-2 mr-6 bg-white border rounded-md"
              onChange={(e) => {
                setCheckedFundId(e.target.value);
                deals.map(async (deal) => {
                  console.debug(deal);
                  if (checkedFundId !== null && deal.fundId === checkedFundId) {
                    console.debug(deal.fundId);
                    console.debug(deal.eventId);
                    const eventRef = await db
                      .collection("events")
                      .doc(deal.eventId)
                      .get();
                    console.debug(eventRef.data());
                  }
                });
              }}
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
                <input type="radio" name="vehicle" className="w-5 h-5" />
                <span className="ml-2 text-gray-700">전체</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="vehicle" className="w-5 h-5" />
                <span className="ml-2 text-gray-700">매수</span>
              </label>
              <label className="inline-flex items-center">
                <input type="radio" name="vehicle" className="w-5 h-5" />
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
        <div className="flex flex-wrap mb-4">
          {deals.map((deal) => {
            if (deal.fundId === checkedFundId) {
              return (
                <div
                  className="p-4 m-2 bg-white rounded-md shadow-md"
                  key={deal.id}
                >
                  <p>
                    종목명: <strong className="text-xl">카카오뱅크</strong>
                  </p>
                  <p>
                    거래잔량(주): <strong className="text-xl">100</strong>
                  </p>
                </div>
              );
            }
          })}
        </div>
        <Table
          titles={[
            "거래날짜",
            "종목명",
            "매수가",
            "매도가",
            "수량",
            "거래잔량",
          ]}
          itemInit={init}
          itemLength={deals.length}
        >
          {deals.map((deal, index) => {
            if (deal.fundId === checkedFundId) {
              return (
                <tr
                  key={deal.id}
                  onClick={() => openEventDetailEvent({ deal })}
                  className="text-gray-700 border-b cursor-pointer"
                >
                  <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
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
          })}
        </Table>

        <Pager />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminDealPage);
