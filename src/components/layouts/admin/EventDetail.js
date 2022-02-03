function EventDetail({ event, openUpdateFormEvent }) {
  return (
    <div className="pt-4">
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
        <p className="text-sm text-gray-700">종목명</p>
        <p>{event.eventName}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">확정공모가액</p>
        <p>
          {new Intl.NumberFormat("ko", {
            currency: "INR",
            minimumFractionDigits: 0,
          }).format(event.fixedAmount)}{" "}
          원
        </p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">납입일</p>
        <p>{event.paymentDate}</p>
      </div>
      <div className="flex flex-col mt-2">
        <p className="text-sm text-gray-700">청약기간</p>
        <p>
          {event.startSubscribePeriod} ~ {event.endSubscribePeriod}
        </p>
      </div>
    </div>
  );
}

export default EventDetail;
