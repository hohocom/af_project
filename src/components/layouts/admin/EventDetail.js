function EventDetail({ event, openUpdateFormEvent }) {
  return (
    <div>
      <div className="flex items-center justify-between w-full">
        <h2 className="text-xl font-noto-regular">종목 상세보기</h2>
        <button
          type="button"
          className="px-4 py-2 text-sm text-white bg-yellow-400 rounded-md"
          onClick={() => openUpdateFormEvent({ event })}
        >
          수정
        </button>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">종목명</p>
        <p>{event.eventName}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">확정공모가액</p>
        <p>{event.fixedAmount}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">납입일</p>
        <p>{event.paymentDate}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="font-noto-regular">청약기간</p>
        <p>
          {event.startSubscribePeriod} ~ {event.endSubscribePeriod}
        </p>
      </div>
    </div>
  );
}

export default EventDetail;
