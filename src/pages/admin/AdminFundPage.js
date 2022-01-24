import { AdminLayout } from "components/layouts";
import { CloseButton, FundDetail, FundForm } from "components/layouts/admin";
import { useStep } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function AdminFundPage() {
  const { step, changeStep } = useStep();
  const [init, setInit] = useState(false);
  const [funds, setFunds] = useState([]);
  const [fundDetail, setFundDetail] = useState(null);

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const openUpdateFormEvent = () => {
    changeStep({ step: 1 });
    setOpenUpdateForm(true);
    setOpenCreateForm(false);
  };

  const openCreateFormEvent = () => {
    changeStep({ step: 1 });
    setOpenCreateForm(true);
    setOpenUpdateForm(false);
    setFundDetail(null);
  };

  const setFundDetailEvent = ({ fund }) => {
    changeStep({ step: 1 });
    setFundDetail(fund);
    setOpenCreateForm(false);
    setOpenUpdateForm(false);
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
    <AdminLayout
      step={step}
      sidebar={
        <div className="min-w-[400px] border-l h-full bg-white p-4">
          <CloseButton changeStep={changeStep} />
          {openCreateForm && <FundForm changeStep={changeStep} />}
          {openUpdateForm && (
            <FundForm fund={fundDetail} changeStep={changeStep} />
          )}
          {!openUpdateForm && fundDetail && (
            <FundDetail
              fund={fundDetail}
              openUpdateFormEvent={openUpdateFormEvent}
            />
          )}
        </div>
      }
    >
      <div className="p-4 bg-white border">
        <div className="flex justify-start items-center">
          <h2 className="text-3xl mb-2 mr-2 font-noto-regular">펀드 목록</h2>
          <button
            onClick={openCreateFormEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
          >
            펀드 생성
          </button>
        </div>
        <table className="w-full bg-white border table-fixed table-type-a">
          <thead>
            <tr>
              <th>No</th>
              <th>펀드명</th>
              <th>펀드전체금액</th>
              <th>대상</th>
              <th>인센티브</th>
              <th>기본수수료</th>
              <th>거래수수료</th>
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
                        onClick={() => setFundDetailEvent({ fund })}
                        className="cursor-pointer"
                      >
                        <td>{index + 1}</td>
                        <td>{fund.fundName}</td>
                        <td>{fund.fundTotalCost}</td>
                        <td>{fund.target}</td>
                        <td>{fund.incentive}</td>
                        <td>{fund.defaultFee}</td>
                        <td>{fund.transactionFee}</td>
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
      </div>
    </AdminLayout>
  );
}

export default AdminFundPage;
