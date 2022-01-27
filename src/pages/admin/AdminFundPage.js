import { Pager, Table, withPrivate } from "components/common";
import { AdminLayout } from "components/layouts";
import { FundDetail, FundForm } from "components/layouts/admin";
import { useModal } from "core/hooks";
import { useEffect, useState } from "react";
import { db } from "utils/firebase";

function AdminFundPage() {
  const { open } = useModal();
  const [init, setInit] = useState(false);
  const [funds, setFunds] = useState([]);

  const openUpdateFormEvent = ({ fund }) => {
    open({ setView: <FundForm fund={fund} /> });
  };

  const openCreateFormEvent = () => {
    open({ setView: <FundForm /> });
  };

  const openFundDetailEvent = ({ fund }) => {
    // setFundDetail(fund);
    open({
      setView: (
        <FundDetail fund={fund} openUpdateFormEvent={openUpdateFormEvent} />
      ),
    });
  };

  useEffect(() => {
    const unsub = db.collection("funds").onSnapshot((snapshot) => {
      const newFunds = snapshot.docs.map((fund) => {
        return {
          id: fund.id,
          ...fund.data(),
        };
      });
      setFunds(newFunds);
      setInit(true);
    });
    return () => unsub();
  }, []);

  return (
    <AdminLayout title="펀드관리">
      <div className="p-4">
        <div className="flex items-center justify-between py-4">
          <button
            onClick={openCreateFormEvent}
            type="button"
            className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            펀드 생성
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
          titles={[
            "펀드명",
            "펀드전체금액",
            "대상",
            "인센티브",
            "기본수수료",
            "거래수수료",
          ]}
          itemInit={init}
          itemLength={funds.length}
          colSpan={7}
        >
          {funds.map((fund, index) => {
            return (
              <tr
                key={fund.id}
                onClick={() => openFundDetailEvent({ fund })}
                className="text-gray-700 border-b cursor-pointer"
              >
                <td className="p-4 text-center border-r dark:border-dark-5">
                  {index + 1}
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
          })}
        </Table>
        <Pager />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminFundPage);
