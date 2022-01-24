/* eslint-disable react-hooks/exhaustive-deps */
import { AdminLayout } from "components/layouts";
import {
  CloseButton,
  EventDetail,
  EventForm,
  FundDetail,
} from "components/layouts/admin";
import { useStep } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function AdminEventPage() {
  const { step, changeStep } = useStep();
  const [init, setInit] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventDetail, setEventDetail] = useState(null);

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const openUpdateFormEvent = () => {
    changeStep({ step: 1 });
    setOpenUpdateForm(true);
    setOpenCreateForm(false);
  };

  const openCreateFormEvent = () => {
    changeStep({ step: 1 });
    setOpenCreateForm(true);
    setOpenUpdateForm(false);
    setEventDetail(null);
  };

  const setEventDetailEvent = ({ event }) => {
    changeStep({ step: 1 });
    setEventDetail(event);
    setOpenCreateForm(false);
    setOpenUpdateForm(false);
  };

  useEffect(() => {
    const unsub = db.collection("events").onSnapshot((snapshot) => {
      const newEvents = snapshot.docs.map((event) => {
        return {
          id: event.id,
          ...event.data(),
        };
      });
      setEvents(newEvents);
      setInit(true);
    });
    return () => unsub();
  }, []);

  return (
    <AdminLayout
      step={step}
      sidebar={
        <div className="min-w-[400px] border-l h-full bg-white p-4">
          <CloseButton changeStep={changeStep} />
          {openCreateForm && <EventForm changeStep={changeStep} />}
          {openUpdateForm && (
            <EventForm event={eventDetail} changeStep={changeStep} />
          )}
          {!openUpdateForm && eventDetail && (
            <EventDetail
              event={eventDetail}
              openUpdateFormEvent={openUpdateFormEvent}
            />
          )}
        </div>
      }
    >
      <div className="p-4 bg-white border">
        <div className="flex justify-start items-center">
          <h2 className="text-3xl mb-2 mr-2 font-noto-regular">종목 목록</h2>
          <button
            onClick={openCreateFormEvent}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
          >
            종목 생성
          </button>
        </div>
        <table className="w-full bg-white border table-fixed table-type-a">
          <thead>
            <tr>
              <th>No</th>
              <th>종목명</th>
              <th>확정공모가액</th>
              <th>청약기간</th>
              <th>납입일</th>
            </tr>
          </thead>
          <tbody>
            {init ? (
              <>
                {events.length > 0 ? (
                  events.map((event, index) => {
                    return (
                      <tr
                        key={event.id}
                        onClick={() => setEventDetailEvent({ event })}
                        className="cursor-pointer"
                      >
                        <td>{index + 1}</td>
                        <td>{event.eventName}</td>
                        <td>{event.fixedAmount}</td>
                        <td>
                          {event.startSubscribePeriod}~
                          {event.endSubscribePeriod}
                        </td>
                        <td>{event.paymentDate}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td className="p-4" colSpan={5}>
                      생성된 종목이 없습니다.
                    </td>
                  </tr>
                )}
              </>
            ) : (
              <tr>
                <td className="p-4" colSpan={5}>
                  로딩중..
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminEventPage;
