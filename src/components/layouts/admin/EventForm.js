import { useForm } from "core/hooks";
import { db } from "utils/firebase";

function EventForm({ event, changeStep }) {
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
    changeStep({ step: 0 });
  };

  const updateFund = async () => {
    await db.collection("events").doc(event.id).set(form);
    changeStep({ step: 0 });
  };

  const deleteFund = async () => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("events").doc(event.id).delete();
    changeStep({ step: 0 });
  };

  return (
    <form>
      <h2 className="text-xl font-noto-regular">
        종목 {event ? "수정" : "생성"}
      </h2>
      <div className="flex flex-col mt-2">
        <label>종목명</label>
        <input
          value={form.eventName}
          name="eventName"
          placeholder="종목명 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>확정공모가액</label>
        <input
          value={form.fixedAmount}
          name="fixedAmount"
          placeholder="확정공모가액 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>납입일</label>
        <input
          type="date"
          value={form.paymentDate}
          name="paymentDate"
          placeholder="납입일 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>청약기간</label>
        <div className="w-full flex justify-between">
          <input
            type="date"
            value={form.startSubscribePeriod}
            name="startSubscribePeriod"
            className="p-2 border rounded-md"
            onChange={changeInput}
          />
          <input
            type="date"
            value={form.endSubscribePeriod}
            name="endSubscribePeriod"
            className="p-2 border rounded-md"
            onChange={changeInput}
          />
        </div>
      </div>
      {!event ? (
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 rounded-md text-white mt-2 w-full"
          onClick={createFund}
        >
          생성
        </button>
      ) : (
        <>
          <button
            type="button"
            className="px-4 py-2 bg-yellow-500 rounded-md text-white mt-2 w-full"
            onClick={updateFund}
          >
            수정
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 rounded-md text-white mt-2 w-full"
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
