/* eslint-disable react-hooks/exhaustive-deps */
import { Pager, Search, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { EventDetail, EventForm } from "components/layouts/admin";
import {
  useEvent,
  useEventStream,
  useModal,
  usePager,
  useSearch,
} from "core/hooks";

function AdminEventPage() {
  const { open } = useModal();
  const { eventListInit } = useEventStream();
  const { eventList } = useEvent();
  const { search, setSearch, searchEvent, setSearchList, getListOrSearchList } =
    useSearch();
  const {
    pageLimit,
    currentPage,
    setCurrentPage,
    getTotalPageLength,
    tableBodyList,
  } = usePager({
    pageLimit: 10,
  });

  // const tableBodyList = () => {
  //   let result = [];
  //   const newList = getListOrSearchList({ list: eventList });
  //   for (
  //     let i = currentPage * pageLimit - (pageLimit - 1);
  //     getTotalPageLength({ list: newList }) === currentPage
  //       ? i <= newList.length
  //       : i <= currentPage * pageLimit;
  //     i++
  //   ) {
  //     if (newList[i - 1]) {
  //       const item = newList[i - 1];
  //       result.push(
  //         <tr
  //           key={item.id}
  //           onClick={() =>
  //             open({
  //               setView: (
  //                 <EventDetail
  //                   event={item}
  //                   openUpdateFormEvent={() =>
  //                     open({ setView: <EventForm event={item} /> })
  //                   }
  //                 />
  //               ),
  //             })
  //           }
  //           className="text-gray-700 border-b cursor-pointer"
  //         >
  //           <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
  //             {i}
  //           </td>
  //           <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
  //             {item.eventName}
  //           </td>
  //           <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
  //             {item.fixedAmount}
  //           </td>
  //           <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
  //             {item.startSubscribePeriod}~{item.endSubscribePeriod}
  //           </td>
  //           <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
  //             {item.paymentDate}
  //           </td>
  //         </tr>
  //       );
  //     }
  //   }
  //   return result;
  // };

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
            <Search
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: eventList,
                  callback: () => {
                    setCurrentPage(1);
                  },
                });
              }}
            />
          </div>
        </div>

        <Table
          titles={["종목명", "확정공모가액", "청약기간", "납입일"]}
          itemInit={eventListInit}
          itemLength={eventList.length}
          colSpan={5}
        >
          {eventListInit &&
            tableBodyList({
              list: getListOrSearchList({ list: eventList }),
              callback: (item, i) => {
                return (
                  <tr
                    key={item.id}
                    onClick={() =>
                      open({
                        setView: (
                          <EventDetail
                            event={item}
                            openUpdateFormEvent={() =>
                              open({ setView: <EventForm event={item} /> })
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
                      {item.eventName}
                    </td>
                    <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                      {item.fixedAmount}
                    </td>
                    <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                      {item.startSubscribePeriod}~{item.endSubscribePeriod}
                    </td>
                    <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                      {item.paymentDate}
                    </td>
                  </tr>
                );
              },
            })}
        </Table>
        {eventListInit && (
          <Pager
            totalPageLength={Math.ceil(
              getListOrSearchList({ list: eventList }).length / pageLimit
            )}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        )}
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminEventPage);
