/* eslint-disable react-hooks/exhaustive-deps */
import { Pager, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { EventDetail, EventForm } from "components/layouts/admin";
import { useEvent, useEventStream, useModal } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function AdminEventPage() {
  const { open } = useModal();
  const { eventListInit } = useEventStream();
  const { eventList } = useEvent();
  const pageLimit = 10; // 페이지당 몇개 보여줄건지
  const [currentPage, setCurrentPage] = useState(1); //현재 페이지

  const [search, setSearch] = useState("");

  const [filterList, setFilterList] = useState([]); //필터에 맞는 종목

  const getList = () => {
    return filterList.length > 0 ? filterList : eventList;
  };

  const tableData = () => {
    let result = [];
    const newList = getList();
    const totalPageLength = Math.ceil(newList.length / pageLimit);
    console.log(totalPageLength);
    for (
      let i = currentPage * pageLimit - (pageLimit - 1);
      totalPageLength === currentPage
        ? i <= newList.length
        : i <= currentPage * pageLimit;
      i++
    ) {
      result.push(tableUI(newList[i - 1], i));
    }

    return result;
  };

  const filter = () => {
    console.log(search);
    let result = [];
    if (search === "") {
      setFilterList([]);
    } else {
      let isFinded = false;
      for (let i = 0; i < eventList.length; i++) {
        if (eventList[i].eventName.includes(search)) {
          isFinded = true;
          result.push(eventList[i]);
        }
      }
      if (!isFinded) window.alert("검색결과가 존재하지 않습니다!");

      setFilterList(result);
    }
    setCurrentPage(1);
  };

  const tableUI = (event, i) => {
    return (
      <tr
        key={event.id}
        onClick={() =>
          open({
            setView: (
              <EventDetail
                event={event}
                openUpdateFormEvent={() =>
                  open({ setView: <EventForm event={event} /> })
                }
              />
            ),
          })
        }
        className="text-gray-700 border-b cursor-pointer"
      >
        <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
          {i}
        </td>
        <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
          {event.eventName}
        </td>
        <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
          {event.fixedAmount}
        </td>
        <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
          {event.startSubscribePeriod}~{event.endSubscribePeriod}
        </td>
        <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
          {event.paymentDate}
        </td>
      </tr>
    );
  };
  return (
    <AdminLayout title="종목관리">
      <div className="p-4">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => open({ setView: <EventForm /> })}
            type="button"
            className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            종목명 생성
          </button>

          <div className="text-end">
            <form
              className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 
            md:flex-row md:w-full md:space-x-3 md:space-y-0"
              onSubmit={(e) => {
                e.preventDefault();
                filter();
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="name"
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  onKeyUp={(e) => {
                    // console.debug(e.key);
                    if (e.key === "Backspace" && e.target.value === "") {
                      setFilterList([]);
                    }
                  }}
                />
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                검색
              </button>
            </form>
          </div>
        </div>

        <Table
          titles={["종목명", "확정공모가액", "청약기간", "납입일"]}
          itemInit={eventListInit}
          itemLength={eventList.length}
          colSpan={5}
        >
          {eventListInit && tableData()}
        </Table>
        {eventListInit && (
          <Pager
            totalPageLength={Math.ceil(getList().length / pageLimit)}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminEventPage);
