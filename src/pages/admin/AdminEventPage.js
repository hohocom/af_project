/* eslint-disable react-hooks/exhaustive-deps */
import { Pager, Search, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/admin";
import { EventForm } from "components/admin";
import { useEvent, useModal, usePager, useSearch } from "core/hooks";
import { eventListInitState } from "core/state";
import { useRecoilValue } from "recoil";
import { currency } from "utils/currency";

function AdminEventPage() {
  const eventListInit = useRecoilValue(eventListInitState);
  const { eventList, destroy } = useEvent();
  const { open } = useModal();
  const { search, setSearch, searchEvent, setSearchList, getSearchList } =
    useSearch({ list: eventList });
  const { currentPage, setCurrentPage, getPagerList, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  return (
    <AdminLayout title="종목관리">
      <div className="p-4">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => open({ setView: <EventForm /> })}
            type="button"
            className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            종목 생성
          </button>

          <div className="text-end">
            <Search
              text="종목 이름을 입력하세요."
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: eventList,
                  key: "eventName",
                  callback: () => {
                    setCurrentPage(1);
                  },
                });
              }}
            />
          </div>
        </div>

        <Table
          titles={[
            "종목명",
            "확정공모가액",
            "배정수량",
            "청약수수료",
            "의무보유기간",
            "배정날짜",
            "상장일",
            "수정",
            "삭제",
          ]}
          itemInit={eventListInit}
          itemLength={eventList.length}
          colSpan={8}
        >
          {getPagerList({ list: getSearchList() }).map((event, i) => {
            if (
              event.isPublicOffering &&
              new Date(event.paymentDate) > new Date()
            )
              return (
                // 공모주만 보여주기
                <tr
                  key={event.id}
                  // onClick={() =>
                  //   open({
                  //     setView: <EventDetail event={event} />,
                  //   })
                  // }
                  className="text-gray-700 border-b hover:bg-gray-100"
                >
                  <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {event.eventName}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {/* {item.fixedAmount} */}
                    {currency(event.fixedAmount)} 원
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {/* {item.fixedAmount} */}
                    {20} 주
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {event.subscribeFee
                      ? currency(event.subscribeFee) + "원"
                      : ""}
                  </td>
                  <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                    {event.mandatoryDate}
                  </td>
                  <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                    {event.assignmentDate}
                  </td>
                  <td className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                    {event.paymentDate}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    <button
                      onClick={() =>
                        open({ setView: <EventForm event={event} /> })
                      }
                    >
                      <i className="text-gray-500 hover:text-red-400 fas fa-edit"></i>
                    </button>
                  </td>
                  <td className="p-4 font-normal dark:border-dark-5 whitespace-nowrap">
                    <button onClick={() => destroy({ id: event.id })}>
                      <i className="text-gray-500 hover:text-red-400 fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
          })}
        </Table>

        <Pager
          totalPageLength={getTotalPageLength({ list: eventList })}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminEventPage);
