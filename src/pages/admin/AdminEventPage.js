/* eslint-disable react-hooks/exhaustive-deps */
import { Pager, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { EventDetail, EventForm } from "components/layouts/admin";
import { useModal } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function AdminEventPage() {
  const { open } = useModal();
  const [init, setInit] = useState(false);
  const [events, setEvents] = useState([]);
  const pageLimit = 10; // 페이지당 몇개 보여줄건지
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지

  // const [totalPageLength, setTotalPageLength] = useState();

  //상태

  const openUpdateFormEvent = ({ event }) => {
    open({ setView: <EventForm event={event} /> });
  };

  const openCreateFormEvent = () => {
    open({ setView: <EventForm /> });
  };

  const openEventDetailEvent = ({ event }) => {
    open({
      setView: (
        <EventDetail event={event} openUpdateFormEvent={openUpdateFormEvent} />
      ),
    });
  };

  useEffect(() => {
    const unsub = db.collection("events").onSnapshot((snapshot) => {
      const newEvents = snapshot.docs.map((event) => {
        return {
          id: event.id,
          ...event.data(),
        };
      });
      setEvents(newEvents);
      //총길이
      Math.ceil(events.length / pageLimit);
      // setTotalPageLength(Math.ceil(events.length / pageLimit));
      setInit(true);
    });
    return () => unsub();
  }, []);

  const tableData = (events) => {
    const totalPage = Math.ceil(events.length / pageLimit); //총 페이지 갯수
    let result = [];
    for (let i = currentPage; i < currentPage * 10 + 1; i++) {
      result.push(
        <tr
          key={events[i].id}
          onClick={() => openEventDetailEvent({ events })}
          className="text-gray-700 border-b cursor-pointer"
        >
          <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
            {i + 1}
          </td>
          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
            {events[i].eventsName}
          </td>
          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
            {events[i].fixedAmount}
          </td>
          <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
            {events[i].startSubscribePeriod}~{events[i].endSubscribePeriod}
          </td>
          <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
            {events[i].paymentDate}
          </td>
        </tr>
      );
    }
    return result;
  };
  return (
    <AdminLayout title="종목관리">
      <div className="p-4">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={openCreateFormEvent}
            type="button"
            className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            종목명 생성
          </button>

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

        <Table
          titles={["종목명", "확정공모가액", "청약기간", "납입일"]}
          itemInit={init}
          itemLength={events.length}
          colSpan={5}
        >
          {events.length !== 0 ? tableData(events) : null}
        </Table>
        <Pager dataLength={events.length} />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminEventPage);
