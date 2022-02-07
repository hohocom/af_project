/* eslint-disable array-callback-return */
import { useDeal, useForm, useModal } from "core/hooks";
import { useEffect, useState } from "react";
import { currency } from "utils/currency";
import { db } from "utils/firebase";

function DealForm({ deal, funds, events }) {
  const { close } = useModal();

  const [fund, setFund] = useState(null);
  const [event, setEvent] = useState(null);

  const { store, edit } = useDeal();
  const { form, setForm, changeInput, isCompleted, setIsCompletedIgnoreList } =
    useForm(
      deal
        ? deal
        : {
            fundId: null,
            eventId: null,
            dealDate: "", // 거래 일자
            buyPrice: 0, // 매수 금액
            salePrice: 0, // 매도 금액
            quantity: 0, // 매수/매도 수량
            totalQuantity: 0, // 전체 잔량
            type: "buy", // sell
          }
    );

  // 매수, 매도 토글 이벤트
  useEffect(() => {
    if (form.type === "buy") {
      setIsCompletedIgnoreList(["totalQuantity", "salePrice"]);
    } else if (form.type === "sell") {
      setIsCompletedIgnoreList(["totalQuantity", "buyPrice"]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.type]);

  return (
    <form className="min-w-[350px] pt-4">
      <h2 className="text-xl font-noto-regular">거래 생성</h2>
      <div className="flex items-center justify-between w-full my-2">
        <button
          type="button"
          className={"w-1/2 p-2 mr-4 border rounded-md cursor-pointer ".concat(
            form.type === "buy" && "bg-indigo-600 text-white"
          )}
          onClick={() => {
            setForm({
              ...form,
              buyPrice: event ? event.fixedAmount : 0,
              salePrice: 0,
              type: "buy",
            });
          }}
        >
          매수
        </button>
        <button
          type="button"
          className={"w-1/2 p-2 border rounded-md cursor-pointer ".concat(
            form.type === "sell" && "bg-indigo-600 text-white"
          )}
          onClick={() => {
            setForm({
              ...form,
              buyPrice: 0,
              type: "sell",
            });
          }}
        >
          매도
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <label className="font-noto-regular">펀드선택</label>
        <select
          className="p-2 border rounded-md"
          onChange={(e) => {
            if (e.target.value === "0") {
              setFund(null);
              setForm({ ...form, fundId: null });
            } else {
              const fund = e.target.value && JSON.parse(e.target.value);
              setFund(fund);
              setForm({ ...form, fundId: fund.id });
            }
          }}
        >
          <option value="0">선택</option>
          {funds.map((fund) => {
            return (
              <option key={fund.id} value={JSON.stringify(fund)}>
                {fund.fundName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col mt-2">
        <label className="font-noto-regular">종목선택</label>
        <select
          name="eventId"
          className="p-2 border rounded-md"
          onChange={(e) => {
            console.debug(e.target.value);
            if (e.target.value === "0") {
              setEvent(null);
              setForm({ ...form, eventId: null });
            } else {
              const event = e.target.value && JSON.parse(e.target.value);
              setEvent(event);
              setForm({
                ...form,
                eventId: event.id,
                buyPrice: event.fixedAmount,
              });
            }
          }}
        >
          <option value="0">선택</option>
          {events.map((event) => {
            return (
              <option key={event.id} value={JSON.stringify(event)}>
                {event.eventName}
              </option>
            );
          })}
        </select>
      </div>

      {event && fund && (
        <div>
          {form.type === "buy" ? (
            <div className="flex flex-col mt-2">
              <label className="font-noto-regular">매수금액</label>
              <div className="p-2 bg-gray-100 rounded-md">
                {currency(event.fixedAmount)}원
              </div>
            </div>
          ) : (
            <div className="flex flex-col mt-2">
              <label className="font-noto-regular">매도금액</label>
              <input
                type="number"
                name="salePrice"
                value={form.salePrice}
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={changeInput}
              />
              <span className="p-2 text-xs rounded-md">
                {currency(form.salePrice)} 원
              </span>
            </div>
          )}

          <div className="flex flex-col mt-2">
            <label className="font-noto-regular">거래수량</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onChange={(e) => {
                setForm({
                  ...form,
                  quantity: e.target.value,
                  totalQuantity: form.type === "buy" ? e.target.value : 0,
                });
              }}
            />
            <span className="p-2 text-xs rounded-md">
              {currency(form.quantity)}주
            </span>
          </div>

          <div className="flex flex-col mt-2">
            <label className="font-noto-regular">거래날짜</label>
            {form.type === "buy" && (
              <>
                <div className="text-sm">
                  {event.startSubscribePeriod} ~ {event.endSubscribePeriod}
                </div>
                <div className="text-sm">
                  * 위 청약기간 내에서 거래날짜를 입력해야합니다.
                </div>
              </>
            )}
            <input
              type="date"
              name="dealDate"
              value={form.dealDate}
              className="flex-1 w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onChange={changeInput}
            />
          </div>
        </div>
      )}

      <button
        type="button"
        className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={() => {
          form.type === "buy" ? store({ form }) : edit({ form });
          close();
        }}
        disabled={!isCompleted}
      >
        {isCompleted ? "거래 생성" : "모든 항목을 입력해주세요.."}
      </button>
    </form>
  );
}

export default DealForm;
