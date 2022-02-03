/* eslint-disable array-callback-return */
import { Pager, Search, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { DealForm } from "components/layouts/admin";
import {
  useDealStream,
  useEventStream,
  useFundStream,
  useModal,
  usePager,
  useSearch,
} from "core/hooks";
import { useState } from "react";
import { db } from "utils/firebase";

function AdminDealPage() {
  const { open } = useModal();

  const { dealList, dealListInit } = useDealStream();
  const { eventList } = useEventStream();
  const { fundList } = useFundStream();

  const [checkedFundId, setCheckedFundId] = useState(null);

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
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 mb-4">
          <div className="flex">
            <select
              className="p-2 mr-6 bg-white border rounded-md"
              onChange={(e) => {
                setCheckedFundId(e.target.value);
                dealList.map(async (deal) => {
                  if (checkedFundId !== null && deal.fundId === checkedFundId)
                    await db.collection("events").doc(deal.eventId).get();
                });
              }}
            >
              <option className="p-2">펀드선택</option>
              {fundList.map((fund) => {
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
            <Search
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: fundList,
                  key: "fundName",
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
            "수량",
            "거래잔량",
          ]}
          itemInit={dealListInit}
          itemLength={dealList.length}
          colSpan={7}
        >
          {getPagerList({ list: getListOrSearchList({ list: dealList }) }).map(
            (deal, index) => {
              if (deal.fundId === checkedFundId) {
                return (
                  <tr
                    key={deal.id}
                    onClick={() => open({ setView: <DealForm /> })}
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
            }
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
