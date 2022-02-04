/* eslint-disable array-callback-return */
import { useForm, useModal } from "core/hooks";
import { currency } from "utils/currency";
import { db } from "utils/firebase";

function DealForm({ deal, funds, events }) {
  const { close } = useModal();
  const { form, changeInput, isCompleted } = useForm(
    deal
      ? deal
      : {
          fundId: null,
          eventId: null,
          dealDate: "",
          quantity: 0,
          type: "buy", // sell
        }
  );

  const create = async () => {
    const dealDocs = await db
      .collection("deals")
      .where("fundId", "==", form.fundId)
      .where("eventId", "==", form.eventId)
      .get();

    if (!dealDocs.empty) {
      window.alert("해당 펀드와 종목에 대한 매수내역이 이미 존재합니다.");
      return;
    }

    await db.collection("deals").add(form);
    // await db.collection("deals").doc(dealRef.id).collection("logs").add({
    //   dealDate: form.dealDate,
    //   buyQuntity: form.quantity,
    //   sellQuntity: null,
    //   type: "buy",
    // });

    close();
  };

  return (
    <form className="min-w-[350px] pt-4">
      <h2 className="text-xl font-noto-regular">거래 생성</h2>
      <div className="flex items-center justify-between w-full my-2">
        <button
          name="type"
          value="buy"
          type="button"
          className={"w-1/2 p-2 mr-4 border rounded-md cursor-pointer ".concat(
            form.type === "buy" && "bg-indigo-600 text-white"
          )}
          onClick={changeInput}
        >
          매수
        </button>
        <button
          name="type"
          value="sell"
          type="button"
          className={"w-1/2 p-2 border rounded-md cursor-pointer ".concat(
            form.type === "sell" && "bg-indigo-600 text-white"
          )}
          onClick={changeInput}
        >
          매도
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <label className="font-noto-regular">펀드선택</label>
        <select
          name="fundId"
          className="p-2 border rounded-md"
          onChange={changeInput}
        >
          <option value={null}>선택</option>
          {funds.map((fund) => {
            return (
              <option key={fund.id} value={fund.id}>
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
          onChange={changeInput}
        >
          <option value={null}>선택</option>
          {events.map((event) => {
            return (
              <option key={event.id} value={event.id}>
                {event.eventName}
              </option>
            );
          })}
        </select>
      </div>
      {events.map((event) => {
        console.debug(form);
        if (event.id === form.eventId) {
          return (
            <div key={event.id}>
              <div className="flex flex-col mt-2">
                <label className="font-noto-regular">공모가액</label>
                <div className="p-2 bg-gray-100 rounded-md">
                  {currency(event.fixedAmount)}원
                </div>
              </div>

              <div className="flex flex-col mt-2">
                <label className="font-noto-regular">거래수량</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  onChange={changeInput}
                />
              </div>
              <span className="p-2 text-xs rounded-md">
                {currency(form.quantity)}주
              </span>
              <div className="flex flex-col mt-2">
                <label className="font-noto-regular">거래날짜</label>
                <div className="text-sm">
                  {event.startSubscribePeriod} ~ {event.endSubscribePeriod}
                </div>
                <div className="text-sm">
                  * 위 청약기간 내에서 거래날짜를 입력해야합니다.
                </div>
                <input
                  type="date"
                  name="dealDate"
                  value={form.dealDate}
                  className="flex-1 w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  onChange={changeInput}
                />
              </div>
            </div>
          );
        }
      })}
      <button
        type="button"
        className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={create}
        disabled={!isCompleted}
      >
        {isCompleted ? "생성" : "모든 항목을 입력해주세요.."}
      </button>
    </form>
  );
}

export default DealForm;
