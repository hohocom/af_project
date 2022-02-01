import { Pager, Search, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { FundDetail, FundForm } from "components/layouts/admin";
import {
  useFund,
  useFundStream,
  useModal,
  usePager,
  useSearch,
} from "core/hooks";

function AdminFundPage() {
  const { open } = useModal();
  const { fundListInit } = useFundStream();
  const { fundList } = useFund();
  const { search, setSearch, searchEvent, setSearchList, getListOrSearchList } =
    useSearch();
  const { pageLimit, currentPage, setCurrentPage, getPagerList } = usePager({
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
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: fundList,
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
          ]}
          itemInit={fundListInit}
          itemLength={fundList.length}
          colSpan={7}
        >
          {getPagerList({ list: getListOrSearchList({ list: fundList }) }).map(
            (fund, i) => {
              return (
                <tr
                  key={fund.id}
                  onClick={() =>
                    open({
                      setView: (
                        <FundDetail
                          fund={fund}
                          openUpdateFormEvent={() =>
                            open({ setView: <FundForm fund={fund} /> })
                          }
                        />
                      ),
                    })
                  }
                  className="text-gray-700 border-b cursor-pointer"
                >
                  <td className="p-4 text-center border-r dark:border-dark-5">
                    {i}
                  </td>
                  <td className="p-4 border-r dark:border-dark-5">
                    {fund.fundName}
                  </td>
                  <td className="p-4 border-r dark:border-dark-5">
                    {fund.fundTotalCost}
                  </td>
                  <td className="p-4 border-r dark:border-dark-5">
                    {fund.target}
                  </td>
                  <td className="p-4 border-r dark:border-dark-5">
                    {fund.incentive}
                  </td>
                  <td className="p-4 border-r dark:border-dark-5">
                    {fund.defaultFee}
                  </td>
                  <td className="p-4 dark:border-dark-5">
                    {fund.transactionFee}
                  </td>
                </tr>
              );
            }
          )}
        </Table>

        <Pager
          totalPageLength={Math.ceil(
            getListOrSearchList({ list: fundList }).length / pageLimit
          )}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminFundPage);
