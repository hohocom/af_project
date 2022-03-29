/* eslint-disable array-callback-return */
import { useForm, useModal, useUserFund } from "core/hooks";
import { currency } from "utils/currency";

function UserFundEditForm({ user, userFund }) {
  const { close } = useModal();
  const { form, changeInput, isCompleted } = useForm({
    userId: userFund ? userFund.userId : null,
    fundId: userFund ? userFund.fundId : null,
    joinPrice: userFund ? userFund.joinPrice : null,
    joinDate: userFund ? userFund.joinDate : null,
  });
  const { edit } = useUserFund();

  return (
    <form className="min-w-[350px]">
      <h2 className="text-xl font-noto-regular">회원 펀드 수정</h2>
      <div className="flex flex-col mt-2 mb-2">
        <label>가입자 이름</label>
        <div className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          {user.userName}
        </div>
      </div>
      <div className="flex flex-col mt-2 mb-2">
        <label>가입된 펀드 이름</label>
        <div className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
          {userFund.fundName}
        </div>
      </div>

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

      <div className="flex-1 w-full text-base">
        <label>지분율</label>
        <div className="flex flex-col px-4 py-2 mt-2 mb-2 text-gray-700 bg-gray-100 border border-transparent border-gray-300 rounded-lg shadow-sm">
          <div>{Number(form.joinPrice) / Number(userFund.fundTotalCost)}</div>
        </div>
      </div>

      <button
        type="button"
        className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={async () => {
          await edit({ form, id: userFund.id });
          close();
        }}
        disabled={!isCompleted}
      >
        {isCompleted ? "수정" : "모든 항목을 입력해주세요.."}
      </button>
    </form>
  );
}

export default UserFundEditForm;
