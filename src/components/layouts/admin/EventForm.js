import { useDeal, useFund, useModal, useUserFund } from "core/hooks";
import { useEvent } from "core/hooks";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { currency } from "utils/currency";
import FundListSelector from "./FundListSelector";

function EventForm({ event }) {
  const { close } = useModal();
  const { store, edit } = useEvent();
  const { fundList } = useFund();
  const { dealStore } = useDeal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [checkFundList, setCheckFundList] = useState([]);
  const watchAllFields = watch();

  useEffect(() => {
    const list = [];

    fundList.forEach((fund) => {
      list.push({
        ...fund,
        checked: true,
      });
    });

    setCheckFundList(list);
  }, [fundList]);

  const userDealStore = async (data, eventId) => {
    const filterList = checkFundList.filter((fund) => fund.checked === true);
    filterList.forEach(async (fund) => {
      await dealStore({
        form: {
          fundId: fund.id,
          eventId: eventId,
          dealDate: data.paymentDate, //// 거래 일자
          buyPrice: data.fixedAmount, // 매수 금액
          salePrice: 0, // 매도 금액
          quantity: data.quantity, //  매도 수량
          totalQuantity: data.quantity,
          transactionFee: data.subscribeFee,
          afterFundProfit:
            Number(data.quantity) * Number(data.buyPrice) -
            Number(data.subscribeFee),
          type: "reservation",
          fundProfit: 0,
          paymentDate: data.paymentDate,
        },
      });
    });
  };

  const onSubmit = async (data) => {
    let eventId = "";
    !event
      ? (eventId = await store({ form: data }))
      : await edit({ form: data, id: event.id });
    userDealStore(data, eventId);
    close();
  };

  return (
    <form
      className="min-w-[350px] max-h-[800px] overflow-hidden overflow-y-scroll p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-noto-regular">
        종목 {event ? "수정" : "생성"}
      </h2>

      <div className="flex flex-col mt-2">
        <label>
          종목명
          <span className="ml-1 text-xs text-red-500">
            {errors.eventName && errors.eventName.message}
          </span>
        </label>
        <input
          {...register("eventName", {
            required: "종목이름은 필수 입력값입니다.",
          })}
          defaultValue={event ? event.eventName : null}
          placeholder="종목이름 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          확정공모가액(원)
          <span className="ml-1 text-xs text-red-500">
            {errors.fixedAmount && errors.fixedAmount.message}
          </span>
        </label>
        <input
          type="number"
          {...register("fixedAmount", {
            required: "확정공모가액은 필수 입력값입니다.",
            pattern: {
              value: /\d/,
              message: "숫자만 입력가능합니다.",
            },
          })}
          defaultValue={event ? event.fixedAmount : null}
          placeholder="확정공모가액 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <span className="p-2 text-xs rounded-md">
          {currency(
            watchAllFields.fixedAmount ? watchAllFields.fixedAmount : 0
          )}{" "}
          원
        </span>
      </div>
      <div className="flex flex-col mt-2">
        <label>
          배정수량
          <span className="ml-1 text-xs text-red-500">
            {errors.quantity && errors.quantity.message}
          </span>
        </label>
        <input
          {...register("quantity", {
            required: "수량은 필수 입력값입니다.",
          })}
          defaultValue={event ? event.quantity : null}
          placeholder="수량 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      {/**
       * 2022-03-10
       * 수정사항 : 의무보유기간, 배정날짜 컬럼 추가
       */}

      <div className="flex flex-col mt-2">
        <label>
          배정날짜
          <span className="ml-1 text-xs text-red-500">
            {errors.assignmentDate && errors.assignmentDate.message}
          </span>
        </label>
        <div className="flex justify-between w-full">
          <input
            {...register("assignmentDate", {
              required: "배정날짜는 필수 입력값입니다.",
            })}
            defaultValue={event ? event.assignmentDate : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <label>
          의무보유기간
          <span className="ml-1 text-xs text-red-500">
            {errors.mandatoryDate && errors.mandatoryDate.message}
          </span>
        </label>
        <div className="flex justify-between w-full">
          <input
            {...register("mandatoryDate", {
              required: "의무보유기간은 필수 입력값입니다.",
            })}
            defaultValue={event ? event.mandatoryDate : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <label>
          상장일
          <span className="ml-1 text-xs text-red-500">
            {errors.paymentDate && errors.paymentDate.message}
          </span>
        </label>
        <div className="flex justify-between w-full">
          <input
            {...register("paymentDate", {
              required: "상장일은 필수 입력값입니다.",
            })}
            defaultValue={event ? event.paymentDate : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <label>
          청약수수료(원)
          <span className="ml-1 text-xs text-red-500">
            {errors.subscribeFee && errors.subscribeFee.message}
          </span>
        </label>
        <input
          type="number"
          {...register("subscribeFee", {
            required: "청약수수료는 필수 입력값입니다.",
          })}
          defaultValue={event ? event.subscribeFee : null}
          placeholder="청약수수료 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
        <span className="p-2 text-xs rounded-md">
          {currency(
            watchAllFields.subscribeFee ? watchAllFields.subscribeFee : 0
          )}{" "}
          원
        </span>
      </div>

      <div className="flex flex-col mt-2">
        <label>
          청약기간
          <span className="ml-1 text-xs text-red-500">
            {errors.startSubscribePeriod && errors.startSubscribePeriod.message}
            {!errors.startSubscribePeriod &&
              errors.endSubscribePeriod &&
              errors.endSubscribePeriod.message}
          </span>
        </label>
        <div className="flex justify-between w-full">
          <input
            {...register("startSubscribePeriod", {
              required: "청약기간은 필수 입력값입니다.",
            })}
            defaultValue={event ? event.startSubscribePeriod : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
          <input
            {...register("endSubscribePeriod", {
              required: "청약기간은 필수 입력값입니다.",
            })}
            defaultValue={event ? event.endSubscribePeriod : null}
            type="date"
            className="flex-1 w-2/5 px-4 py-2 ml-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          />
        </div>
      </div>
      <div className="flex flex-col mt-2">
        <label>
          펀드선택
          <FundListSelector
            checkFundList={checkFundList}
            setCheckFundList={setCheckFundList}
            form="select"
          />
        </label>
      </div>

      <button className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
        {!event ? "생성" : "수정"}
      </button>
    </form>
  );
}

export default EventForm;
