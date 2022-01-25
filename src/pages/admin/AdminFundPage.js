import { AdminLayout } from "components/layouts";
import { FundDetail, FundForm } from "components/layouts/admin";
import { useModal } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
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

        <table className="table w-full p-4 bg-white rounded-lg shadow">
          <thead>
            <tr className="border-b">
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                #
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                펀드명
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                펀드전체금액
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                대상
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                인센티브
              </th>
              <th className="p-4 font-normal text-gray-900 border-r dark:border-dark-5 whitespace-nowrap">
                기본수수료
              </th>
              <th className="p-4 font-normal text-gray-900 dark:border-dark-5 whitespace-nowrap">
                거래수수료
              </th>
            </tr>
          </thead>
          <tbody>
            {init ? (
              <>
                {funds.length > 0 ? (
                  funds.map((fund, index) => {
                    return (
                      <tr
                        key={fund.id}
                        onClick={() => openFundDetailEvent({ fund })}
                        className="text-gray-700 border-b cursor-pointer"
                      >
                        <td className="p-4 border-r dark:border-dark-5 text-center">
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
                  })
                ) : (
                  <tr>
                    <td className="p-4" colSpan={7}>
                      펀드목록이 없습니다.
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td className="p-4" colSpan={7}>
                  로딩중..
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="flex flex-col items-center px-5 py-5 xs:flex-row xs:justify-between">
          <div className="flex items-center">
            <button
              type="button"
              className="w-full p-4 text-base text-gray-600 bg-white border rounded-l-xl hover:bg-gray-100"
            >
              <svg
                width="9"
                fill="currentColor"
                height="8"
                className=""
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-indigo-500 bg-white border-t border-b hover:bg-gray-100 "
            >
              1
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
            >
              2
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-gray-600 bg-white border-t border-b hover:bg-gray-100"
            >
              3
            </button>
            <button
              type="button"
              className="w-full px-4 py-2 text-base text-gray-600 bg-white border hover:bg-gray-100"
            >
              4
            </button>
            <button
              type="button"
              className="w-full p-4 text-base text-gray-600 bg-white border-t border-b border-r rounded-r-xl hover:bg-gray-100"
            >
              <svg
                width="9"
                fill="currentColor"
                height="8"
                className=""
                viewBox="0 0 1792 1792"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminFundPage;
