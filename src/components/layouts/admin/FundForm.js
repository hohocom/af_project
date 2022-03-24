import { useFund, useModal } from "core/hooks";
import { useForm } from "react-hook-form";
import { currency } from "utils/currency";

function FundForm({ fund = null }) {
  const { close } = useModal();
  const { store, edit } = useFund();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchAllFields = watch();

  const onSubmit = async (data) => {
    !fund
      ? await store({ form: data })
      : await edit({ form: data, id: fund.id });
    close();
  };

  const onError = (error) => console.log(error);

  return (
    <form className="min-w-[350px] p-2" onSubmit={handleSubmit(onSubmit, onError)}>
      <h2 className="text-xl font-noto-regular">
        펀드 {fund ? "수정" : "생성"}
      </h2>

      <div className="flex flex-col mt-2">
        <label>
          펀드명
          <span className="ml-1 text-xs text-red-500">
            {errors.fundName && errors.fundName.message}
          </span>
        </label>
        <input
          {...register("fundName", {
            required: "펀드이름은 필수 입력값입니다.",
          })}
          defaultValue={fund ? fund.fundName : null}
          placeholder="펀드이름 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          펀드전체금액
          <span className="ml-1 text-xs text-red-500">
            {errors.fundTotalCost && errors.fundTotalCost.message}
          </span>
        </label>
        <input
          type="number"
          {...register("fundTotalCost", {
            required: "펀드금액은 필수 입력값입니다.",
            pattern: {
              value: /\d/,
              message: "숫자만 입력가능합니다.",
            },
          })}
          defaultValue={fund ? fund.fundTotalCost : null}
          placeholder="펀드금액 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <span className="p-2 text-xs rounded-md">
          {currency(
            watchAllFields.fundTotalCost ? watchAllFields.fundTotalCost : 0
          )}{" "}
          원
        </span>
      </div>

      <div className="flex flex-col mt-2">
        <label>
          대상
          <span className="ml-1 text-xs text-red-500">
            {errors.target && errors.target.message}
          </span>
        </label>
        <input
          {...register("target", {
            required: "대상 입력은 필수 입력값입니다.",
          })}
          defaultValue={fund ? fund.target : null}
          placeholder="대상 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          인센티브(%)
          <span className="ml-1 text-xs text-red-500">
            {errors.incentive && errors.incentive.message}
          </span>
        </label>
        <input
          {...register("incentive", {
            required: "인센티브는 필수 입력값입니다.",
          })}
          type="number"
          step="0.000000000001"
          defaultValue={fund ? fund.defaultFee : null}
          placeholder="인센티브 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          기본수수료(%)
          <span className="ml-1 text-xs text-red-500">
            {errors.defaultFee && errors.defaultFee.message}
          </span>
        </label>
        <input
          {...register("defaultFee", {
            required: "기본수수료는 필수 입력값입니다.",
          })}
          type="number"
          step="0.000000000001"
          defaultValue={fund ? fund.defaultFee : null}
          placeholder="기본수수료 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          계좌명
          <span className="ml-1 text-xs text-red-500">
            {errors.bankName && errors.bankName.message}
          </span>
        </label>
        <input
          {...register("bankName", {
            required: "계좌명은 필수 입력값입니다.",
          })}
          type="text"
          defaultValue={fund ? fund.bankName : null}
          placeholder="계좌명 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>
          계좌번호
          <span className="ml-1 text-xs text-red-500">
            {errors.bankNumber && errors.bankNumber.message}
          </span>
        </label>
        <input
          {...register("bankNumber", {
            required: "계좌번호는 필수 입력값입니다.",
          })}
          type="text"
          defaultValue={fund ? fund.bankNumber : null}
          placeholder="계좌번호 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          가입기간
          <span className="ml-1 text-xs text-red-500">
            {errors.startJoinPeriod && errors.startJoinPeriod.message}
            {!errors.startJoinPeriod &&
              errors.endJoinPeriod &&
              errors.endJoinPeriod.message}
          </span>
        </label>
        <div className="flex justify-between w-full">
          <input
            {...register("startJoinPeriod", {
              required: "가입기간은 필수 입력값입니다.",
            })}
            defaultValue={fund ? fund.startJoinPeriod : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <input
            {...register("endJoinPeriod", {
              required: "가입기간은 필수 입력값입니다.",
            })}
            defaultValue={fund ? fund.endJoinPeriod : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 ml-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>

      <button className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
        {!fund ? "생성" : "수정"}
      </button>
    </form>
  );
}

export default FundForm;
