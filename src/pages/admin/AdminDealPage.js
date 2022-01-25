import { AdminLayout } from "components/layouts";
import {
  CloseButton,
  DealForm,
  EventDetail,
  EventForm,
} from "components/layouts/admin";
import { useStep } from "core/hooks";
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function AdminDealPage() {
  const { step, changeStep } = useStep();
  const [init, setInit] = useState(false);
  const [deals, setDeals] = useState([]);
  const [dealDetail, setDealDetail] = useState(null);

  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openUpdateForm, setOpenUpdateForm] = useState(false);

  const [checkedFundId, setCheckedFundId] = useState(null);

  const openUpdateFormEvent = () => {
    changeStep({ step: 1 });
    setOpenUpdateForm(true);
    setOpenCreateForm(false);
  };

  const openCreateFormEvent = () => {
    changeStep({ step: 1 });
    setOpenCreateForm(true);
    setOpenUpdateForm(false);
    setDealDetail(null);
  };

  const setEventDetailEvent = ({ event }) => {
    changeStep({ step: 1 });
    setDealDetail(event);
    setOpenCreateForm(false);
    setOpenUpdateForm(false);
  };

  useEffect(() => {
    const unsub = db.collection("deals").onSnapshot((snapshot) => {
      const newDeals = snapshot.docs.map((deal) => {
        return {
          id: deal.id,
          ...deal.data(),
        };
      });
      setDeals(newDeals);
      setInit(true);
    });
    return () => unsub();
  }, []);

  const [funds, setFunds] = useState([]);
  useEffect(() => {
    const unsub = db.collection("funds").onSnapshot((snapshot) => {
      const newFunds = snapshot.docs.map((fund) => {
        return {
          id: fund.id,
          ...fund.data(),
        };
      });
      setFunds(newFunds);
    });
    return () => unsub();
  }, []);

  const [events, setEvents] = useState([]);
  useEffect(() => {
    const unsub = db.collection("events").onSnapshot((snapshot) => {
      const newEvents = snapshot.docs.map((event) => {
        return {
          id: event.id,
          ...event.data(),
        };
      });
      setEvents(newEvents);
    });
    return () => unsub();
  }, []);

  const getEventValue = async () => {
    return deals.map(async (deal, index) => {
      console.debug(deal);
      if (deal.fundId === checkedFundId) {
        const snapshot = await db.collection("events").doc(deal.eventId).get();
        console.debug(snapshot.data());
        return (
          <tr
            key={deal.id}
            onClick={() => setEventDetailEvent({ deal })}
            className="cursor-pointer"
          >
            <td>{index + 1}</td>
            <td>{deal.dealDate}</td>
            <td>{snapshot.data().eventName}</td>
            <td>공모가격</td>
            <td>-</td>
            <td>{deal.quantity}주</td>
            <td>{deal.quantity}주</td>
          </tr>
        );
      }
    });
  };

  return (
    <AdminLayout
      step={step}
      sidebar={
        <div className="min-w-[400px] border-l h-full bg-white p-4">
          <CloseButton changeStep={changeStep} />
          {openCreateForm && (
            <DealForm changeStep={changeStep} funds={funds} events={events} />
          )}
          {openUpdateForm && (
            <EventForm event={dealDetail} changeStep={changeStep} />
          )}
          {!openUpdateForm && dealDetail && (
            <EventDetail
              event={dealDetail}
              openUpdateFormEvent={openUpdateFormEvent}
            />
          )}
        </div>
      }
    >
      <div className="p-4 bg-white border">
        <div className="flex items-center justify-between">
          <div className="flex">
            <h2 className="mb-2 mr-2 text-3xl font-noto-regular">거래 목록</h2>
            <select
              className="p-2 border rounded-md bg-gray-50"
              onChange={(e) => {
                console.debug(e.target.value);
                setCheckedFundId(e.target.value);
              }}
            >
              <option className="p-2">펀드선택</option>
              {funds.map((fund) => {
                return (
                  <option key={fund.id} value={fund.id} className="p-2">
                    {fund.fundName}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={openCreateFormEvent}
            className="px-4 py-2 mb-2 text-white bg-blue-500 rounded-md"
          >
            거래 생성
          </button>
        </div>
        <div className="flex items-center justify-start mt-2 mb-2">
          <button
            onClick={openCreateFormEvent}
            className="px-4 py-2 mb-2 mr-4 bg-gray-100 rounded-md"
          >
            전체
          </button>
          <button
            onClick={openCreateFormEvent}
            className="px-4 py-2 mb-2 mr-4 bg-gray-100 rounded-md"
          >
            매수
          </button>
          <button
            onClick={openCreateFormEvent}
            className="px-4 py-2 mb-2 bg-gray-100 rounded-md"
          >
            매도
          </button>
        </div>
        <table className="w-full bg-white border table-fixed table-type-a">
          <thead>
            <tr>
              <th>No</th>
              <th>거래날짜</th>
              <th>종목명</th>
              <th>공모가</th>
              <th>매도가</th>
              <th>수량</th>
              <th>거래잔량</th>
            </tr>
          </thead>
          <tbody>
            {init ? (
              <>
                {deals.length > 0 ? (
                  deals.map((deal, index) => {
                    console.debug(deal);
                    if (deal.fundId === checkedFundId) {
                      return (
                        <tr
                          key={deal.id}
                          onClick={() => setEventDetailEvent({ deal })}
                          className="cursor-pointer"
                        >
                          <td>{index + 1}</td>
                          <td>{deal.dealDate}</td>
                          <td>{deal.dealDate}</td>
                          <td>공모가격</td>
                          <td>-</td>
                          <td>{deal.quantity}주</td>
                          <td>{deal.quantity}주</td>
                        </tr>
                      );
                    }
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

export default AdminDealPage;
