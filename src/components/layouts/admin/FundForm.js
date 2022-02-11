import { useForm, useFund, useModal } from "core/hooks";
import { currency } from "utils/currency";

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
          startJoinPeriod: "",
          endJoinPeriod: "",
        }
  );
  const { store, edit } = useFund();

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
        <span className="p-2 text-xs rounded-md">
          {currency(form.fundTotalCost)} 원
        </span>
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
          인센티브(%)
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
          기본수수료(%)
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
          onClick={() => {
            store({ form });
            resetForm();
            close();
          }}
          disabled={!isCompleted}
        >
          {isCompleted ? "생성" : "모든 항목을 입력해주세요.."}
        </button>
      ) : (
        <button
          type="button"
          className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={() => {
            edit({ id: fund.id, form: form });
            close();
          }}
          disabled={!isCompleted}
        >
          {isCompleted ? "수정" : "모든 항목을 입력해주세요.."}
        </button>
      )}
    </form>
  );
}

export default FundForm;
