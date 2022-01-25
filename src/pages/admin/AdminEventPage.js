/* eslint-disable react-hooks/exhaustive-deps */
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
      setInit(true);
    });
    return () => unsub();
  }, []);

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

        <table className="table w-full p-4 bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                #
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                종목명
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                확정공모가액
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                청약기간
              </th>
              <th className="p-4 font-normal text-gray-900 dark:border-dark-5 whitespace-nowrap">
                납입일
              </th>
            </tr>
          </thead>
          <tbody>
            {init ? (
              <>
                {events.length > 0 ? (
                  events.map((event, index) => {
                    return (
                      <tr
                        key={event.id}
                        onClick={() => openEventDetailEvent({ event })}
                        className="border-b"
                      >
                        <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                          {index + 1}
                        </td>
                        <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                          {event.eventName}
                        </td>
                        <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                          {event.fixedAmount}
                        </td>
                        <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                          {event.startSubscribePeriod}~
                          {event.endSubscribePeriod}
                        </td>
                        <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                          {event.paymentDate}
                        </td>
                      </tr>
                    );
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
      </div>
    </AdminLayout>
  );
}

export default AdminEventPage;
