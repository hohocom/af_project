import { useForm, useModal } from "core/hooks";
import { db } from "utils/firebase";

function FundForm({ fund = null }) {
  const { close } = useModal();
  const { form, changeInput, resetForm, isCompleted } = useForm(
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
    close();
  };

  const updateFund = async () => {
    await db.collection("funds").doc(fund.id).set(form);
    close();
  };

  const deleteFund = async () => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("funds").doc(fund.id).delete();
    close();
  };

  return (
    <form>
      <h2 className="text-xl font-noto-regular">
        펀드 {fund ? "수정" : "생성"}
      </h2>
      <div className="mt-6">
        <div className="relative">
          <label htmlFor="name-with-label" className="text-gray-700">
            펀드명
          </label>
          <input
            name="fundName"
            value={form.fundName}
            placeholder="펀드명 입력"
            className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="name-with-label" className="text-gray-700">
          펀드전체금액
        </label>
        <input
          value={form.fundTotalCost}
          name="fundTotalCost"
          placeholder="펀드전체금액 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="name-with-label" className="text-gray-700">
          대상
        </label>
        <input
          value={form.target}
          name="target"
          placeholder="펀드 대상"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="name-with-label" className="text-gray-700">
          인센티브
        </label>
        <input
          value={form.incentive}
          name="incentive"
          placeholder="인센티브 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="name-with-label" className="text-gray-700">
          기본수수료
        </label>
        <input
          value={form.defaultFee}
          name="defaultFee"
          placeholder="기본 수수료 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlFor="name-with-label" className="text-gray-700">
          거래수수료
        </label>
        <input
          value={form.transactionFee}
          name="transactionFee"
          placeholder="거래 수수료"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
          // onBlur={(e) => {
          //   console.debug("sldkfjsalf");
          //   e.target.focus();
          //   return;
          // }}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>가입기간</label>
        <div className="flex justify-between w-full">
          <input
            type="date"
            value={form.startJoinPeriod}
            name="startJoinPeriod"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
          <input
            type="date"
            value={form.endJoinPeriod}
            name="endJoinPeriod"
            className="flex-1 w-2/5 px-4 py-2 ml-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
        </div>
      </div>
      {!fund ? (
        <button
          type="button"
          className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={createFund}
          disabled={!isCompleted}
        >
          {isCompleted ? "생성" : "모든 항목을 입력해주세요.."}
        </button>
      ) : (
        <>
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={updateFund}
            disabled={!isCompleted}
          >
            {isCompleted ? "수정" : "모든 항목을 입력해주세요.."}
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-400 rounded-lg shadow-md hover:bg-red-500 focus:ring-red-300 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
