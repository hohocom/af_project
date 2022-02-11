import { Pager, Search, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts/admin";
import { FundForm } from "components/layouts/admin";
import { useFund, useModal, usePager, useSearch } from "core/hooks";
import { fundListInitState } from "core/state";
import { useRecoilValue } from "recoil";
import { currency } from "utils/currency";

function AdminFundPage() {
  const fundListInit = useRecoilValue(fundListInitState);
  const { fundList, destroy } = useFund();
  const { open } = useModal();
  const { search, setSearch, searchEvent, setSearchList, getSearchList } =
    useSearch({ list: fundList });
  const { currentPage, setCurrentPage, getPagerList, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  return (
    <AdminLayout title="펀드관리">
      <div className="p-4">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={() => open({ setView: <FundForm /> })}
            type="button"
            className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            펀드 생성
          </button>

          <div className="text-end">
            <Search
              text="펀드 이름을 입력하세요."
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
            "펀드명",
            "펀드전체금액",
            "대상",
            "인센티브",
            "기본수수료",
            "거래수수료",
            "가입기간",
            "수정",
            "삭제",
          ]}
          itemInit={fundListInit}
          itemLength={fundList.length}
          colSpan={7}
        >
          {getPagerList({ list: getSearchList() }).map((fund, i) => {
            return (
              <tr
                key={fund.id}
                // onClick={() =>
                //   open({
                //     setView: <FundDetail fund={fund} />,
                //   })
                // }
                className="text-gray-700 border-b hover:bg-gray-100"
              >
                <td className="p-4 text-center border-r dark:border-dark-5">
                  {i + 1}
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {fund.fundName}
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {currency(fund.fundTotalCost)} 원
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {fund.target}
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {fund.incentive} %
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {fund.defaultFee} %
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {fund.transactionFee} %
                </td>
                <td className="p-4 border-r dark:border-dark-5">
                  {fund.startJoinPeriod} ~ {fund.endJoinPeriod}
                </td>
                <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                  <button
                    onClick={() => open({ setView: <FundForm fund={fund} /> })}
                  >
                    <i className="text-gray-500 hover:text-red-400 fas fa-edit"></i>
                  </button>
                </td>
                <td className="p-4 font-normal dark:border-dark-5 whitespace-nowrap">
                  <button onClick={() => destroy({ id: fund.id })}>
                    <i className="text-gray-500 hover:text-red-400 fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </Table>

        <Pager
          totalPageLength={getTotalPageLength({ list: fundList })}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminFundPage);
