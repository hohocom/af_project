/* eslint-disable array-callback-return */
import { useForm } from "core/hooks";
import { db } from "utils/firebase";

function DealForm({ deal, funds, events }) {
  const { form, changeInput, resetForm } = useForm(
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
    await db.collection("deals").add(form);
  };

  return (
    <form>
      <h2 className="text-xl font-noto-regular">매수 생성</h2>
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
                <input
                  value={event.fixedAmount}
                  disabled
                  className="p-2 border rounded-md"
                />
              </div>
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
                  className="p-2 border rounded-md"
                  onChange={changeInput}
                />
              </div>
              <div className="flex flex-col mt-2">
                <label className="font-noto-regular">거래수량</label>
                <input
                  type="number"
                  name="quantity"
                  value={event.quantity}
                  className="p-2 border rounded-md"
                  onChange={changeInput}
                />
              </div>
            </div>
          );
        }
      })}
      <button
        type="button"
        className="w-full px-4 py-2 mt-6 text-white bg-blue-500 rounded-md"
        onClick={create}
      >
        생성
      </button>
    </form>
  );
}

export default DealForm;
