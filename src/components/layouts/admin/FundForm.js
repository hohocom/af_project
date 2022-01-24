import { useForm } from "core/hooks";
import { db } from "utils/firebase";

function FundForm({ fund = null, changeStep }) {
  const { form, changeInput, resetForm } = useForm(
    fund
      ? fund
      : {
          fundName: "",
          fundTotalCost: "",
          target: "",
          incentive: "",
          defaultFee: "",
          transactionFee: "",
          startJoinPeriod: "",
          endJoinPeriod: "",
        }
  );

  const createFund = async () => {
    await db.collection("funds").add(form);
    resetForm();
    changeStep({ step: 0 });
  };

  const updateFund = async () => {
    await db.collection("funds").doc(fund.id).set(form);
    changeStep({ step: 0 });
  };

  const deleteFund = async () => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("funds").doc(fund.id).delete();
    changeStep({ step: 0 });
  };

  return (
    <form>
      <h2 className="text-xl font-noto-regular">
        펀드 {fund ? "수정" : "생성"}
      </h2>
      <div className="flex flex-col mt-2">
        <label>펀드명</label>
        <input
          value={form.fundName}
          name="fundName"
          placeholder="펀드명 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>펀드전체금액</label>
        <input
          value={form.fundTotalCost}
          name="fundTotalCost"
          placeholder="펀드전체금액 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>대상</label>
        <input
          value={form.target}
          name="target"
          placeholder="펀드 대상"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>인센티브</label>
        <input
          value={form.incentive}
          name="incentive"
          placeholder="인센티브 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>기본수수료</label>
        <input
          value={form.defaultFee}
          name="defaultFee"
          placeholder="기본 수수료 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>거래수수료</label>
        <input
          value={form.transactionFee}
          name="transactionFee"
          placeholder="거래 수수료"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>가입기간</label>
        <div className="w-full flex justify-between">
          <input
            type="date"
            value={form.startJoinPeriod}
            name="startJoinPeriod"
            className="p-2 border rounded-md"
            onChange={changeInput}
          />
          <input
            type="date"
            value={form.endJoinPeriod}
            name="endJoinPeriod"
            className="p-2 border rounded-md"
            onChange={changeInput}
          />
        </div>
      </div>
      {!fund ? (
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 rounded-md text-white mt-2 w-full"
          onClick={createFund}
        >
          생성
        </button>
      ) : (
        <>
          <button
            type="button"
            className="px-4 py-2 bg-yellow-500 rounded-md text-white mt-2 w-full"
            onClick={updateFund}
          >
            수정
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 rounded-md text-white mt-2 w-full"
            onClick={deleteFund}
          >
            삭제
          </button>
        </>
      )}
    </form>
  );
}

export default FundForm;
