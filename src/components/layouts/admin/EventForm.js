import { useForm, useModal } from "core/hooks";
import { db } from "utils/firebase";

function EventForm({ event }) {
  const { close } = useModal();
  const { form, changeInput, resetForm } = useForm(
    event
      ? event
      : {
          eventName: "",
          fixedAmount: "",
          paymentDate: "",
          startSubscribePeriod: "",
          endSubscribePeriod: "",
        }
  );

  const createFund = async () => {
    await db.collection("events").add(form);
    resetForm();
    close();
  };

  const updateFund = async () => {
    await db.collection("events").doc(event.id).set(form);
    close();
  };

  const deleteFund = async () => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("events").doc(event.id).delete();
    close();
  };

  return (
    <form>
      <h2 className="text-xl font-noto-regular">
        종목 {event ? "수정" : "생성"}
      </h2>
      <div className="flex flex-col mt-2">
        <label htmlhtmlFor="name-with-label" className="text-gray-700">
          종목명
        </label>
        <input
          value={form.eventName}
          name="eventName"
          placeholder="종목명 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlhtmlFor="name-with-label" className="text-gray-700">
          확정공모가액
        </label>
        <input
          value={form.fixedAmount}
          name="fixedAmount"
          placeholder="확정공모가액 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlhtmlFor="name-with-label" className="text-gray-700">
          납입일
        </label>
        <input
          type="date"
          value={form.paymentDate}
          name="paymentDate"
          placeholder="납입일 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label htmlhtmlFor="name-with-label" className="text-gray-700">
          청약기간
        </label>
        <div className="flex justify-between w-full">
          <input
            type="date"
            value={form.startSubscribePeriod}
            name="startSubscribePeriod"
            className="flex-1 w-2/5 px-4 py-2 mr-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
          <input
            type="date"
            value={form.endSubscribePeriod}
            name="endSubscribePeriod"
            className="flex-1 w-2/5 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
        </div>
      </div>
      {!event ? (
        <button
          type="button"
          className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={createFund}
        >
          생성
        </button>
      ) : (
        <>
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={updateFund}
          >
            수정
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

export default EventForm;
