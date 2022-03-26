/* eslint-disable array-callback-return */
import { useForm, useFund, useModal, useUserFund } from "core/hooks";
import { useState } from "react";
import { currency } from "utils/currency";

function UserFundForm({ user }) {
  const { close } = useModal();
  const { form, changeInput, setForm, isCompleted } = useForm({
    userId: user ? user.id : null,
    fundId: null,
    joinPrice: 0,
    joinDate: "",
  });
  const { fundList } = useFund();
  const { store } = useUserFund();
  const [fund, setFund] = useState(null);

  return (
    <form className="min-w-[350px]">
      <h2 className="text-xl font-noto-regular">회원 펀드 가입</h2>
      <div className="flex flex-col mt-2 mb-2">
        <label>가입자 이름</label>
        <div className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          {user.name}
        </div>
      </div>
      <label>펀드 선택</label>
      <select
        name="eventId"
        className="w-full p-2 border rounded-md"
        onChange={(e) => {
          if (e.target.value === "0") {
            setFund(null);
            setForm({ ...form, fundId: null, joinDate: "" });
          } else {
            const fund = JSON.parse(e.target.value);
            setFund(fund);
            setForm({ ...form, fundId: fund.id });
          }
        }}
      >
        <option value="0">펀드선택</option>
        {fundList.map((fund) => {
          return (
            <option key={fund.id} value={JSON.stringify(fund)}>
              {fund.fundName}
            </option>
          );
        })}
      </select>
      <div className="flex flex-col mt-2">
        <label className="font-noto-regular">가입금액</label>
        <input
          type="number"
          name="joinPrice"
          value={form.joinPrice}
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
        <span className="p-2 text-xs rounded-md">
          {currency(form.joinPrice)} 원
        </span>
      </div>

      {fund && (
        <div className="flex-1 w-full text-base">
          <label>지분율</label>
          <div className="flex flex-col px-4 py-2 mt-2 mb-2 text-gray-700 bg-gray-100 border border-transparent border-gray-300 rounded-lg shadow-sm">
            <div>{Number(form.joinPrice) / Number(fund.fundTotalCost)}</div>
          </div>
        </div>
      )}

      {fund && (
        <div className="flex flex-col mt-2">
          <label className="font-noto-regular">가입날짜</label>
          <div className="text-sm">
            {fund.startJoinPeriod} ~ {fund.endJoinPeriod}
          </div>
          <div className="text-sm">
            * 위 가입기간 내에서 가입날짜를 입력해야합니다.
          </div>

          <input
            type="date"
            name="joinDate"
            value={form.joinDate}
            className="flex-1 w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
        </div>
      )}

      <button
        type="button"
        className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={async () => {
          await store({ form });
          close();
        }}
        disabled={!isCompleted}
      >
        {isCompleted ? "가입" : "모든 항목을 입력해주세요.."}
      </button>
    </form>
  );
}

export default UserFundForm;
