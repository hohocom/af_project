/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { Pager, Search, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { DealForm } from "components/layouts/admin";
import {
  useDeal,
  useDealStream,
  useEventStream,
  useFundStream,
  useModal,
  usePager,
  useSearch,
} from "core/hooks";
import { useEffect, useState } from "react";
import { currency } from "utils/currency";
import { db } from "utils/firebase";

function AdminDealPage() {
  const { open } = useModal();

  const { dealList } = useDealStream();
  const { setMatchedFundId, getMatchedList, doJoinDealList, joinDealList } =
    useDeal();
  const { eventList } = useEventStream();
  const { fundList } = useFundStream();

  useEffect(() => {
    doJoinDealList({ eventList, fundList });
  }, [eventList, fundList, dealList]);

  const { search, setSearch, searchEvent, setSearchList, getListOrSearchList } =
    useSearch();
  const { currentPage, setCurrentPage, getPagerList, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  return (
    <AdminLayout title="거래관리">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex"></div>
        </div>
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex">
            <button
              onClick={() =>
                open({
                  setView: <DealForm events={eventList} funds={fundList} />,
                })
              }
              className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              거래 생성
            </button>
            <select
              className="p-2 ml-4 mr-6 bg-white border rounded-md"
              onChange={(e) => {
                setMatchedFundId(e.target.value);
              }}
            >
              <option className="p-2">펀드 선택</option>
              {fundList.map((fund) => {
                return (
                  <option key={fund.id} value={fund.id} className="p-2">
                    {fund.fundName}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="text-end">
            <Search
              text="종목 이름을 입력하세요."
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: joinDealList,
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
            "거래날짜",
            "종목명",
            "매수가",
            "매도가",
            "수량 (주)",
            "거래잔량 (주)",
          ]}
          itemInit={joinDealList}
          itemLength={joinDealList.length}
          colSpan={7}
        >
          {getMatchedList({ list: joinDealList }).length > 0 ? (
            getPagerList({
              list: getListOrSearchList({
                list: getMatchedList({ list: joinDealList }),
              }),
            }).map((deal, i) => {
              return (
                <tr
                  key={deal.id}
                  className="text-gray-700 border-b cursor-pointer hover:bg-gray-100"
                >
                  <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
                    {i + 1}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {deal.dealDate}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {deal.eventName}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {currency(deal.fixedAmount)}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    -
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {currency(deal.quantity)} 주
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {currency(deal.quantity)} 주
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    <button>매도</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={7} className="p-3">
                펀드를 선택해주세요.
              </td>
            </tr>
          )}
        </Table>

        <Pager
          totalPageLength={getTotalPageLength({
            list: dealList,
          })}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminDealPage);
