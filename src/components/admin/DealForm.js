/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import { useDeal, useEvent, useForm, useFund, useModal } from "core/hooks";
import { useEffect, useState } from "react";
import { currency } from "utils/currency";
import FundListSelector from "./FundListSelector";

function DealForm({ deal, funds, events }) {
  const { close } = useModal();
  const { store, edit } = useEvent();
  const [fund, setFund] = useState(null);
  const [event, setEvent] = useState(null);
  const [latestDeal, setLatestDeal] = useState(null);
  const [checkFundList, setCheckFundList] = useState([]);
  const { fundList } = useFund();
  const { buyStore, sellStore, getLatestDealBy } = useDeal();
  const { form, setForm, changeInput, isCompleted, setIsCompletedIgnoreList } =
    useForm(
      deal
        ? deal
        : {
            eventName: "",
            dealDate: "", // 거래 일자
            buyPrice: 0, // 매수 금액
            salePrice: 0, // 매도 금액
            quantity: 0, // 매수/매도 수량
            transactionFee: 0, // 거래수수료(원)
            // totalQuantity: 0, // 전체 잔량
            type: "buy", // sell,
          }
    );

  // * 매수, 매도 토글 이벤트
  useEffect(() => {
    console.debug(event);
    if (form.type === "buy") {
      setIsCompletedIgnoreList(["totalQuantity", "salePrice"]);
    } else if (form.type === "sell") {
      setIsCompletedIgnoreList(["totalQuantity", "buyPrice"]);
    }
  }, [form.type]);
  useEffect(() => {
    const list = [];

    fundList.forEach((fund) => {
      list.push({
        ...fund,
        checked: false,
      });
    });

    setCheckFundList(list);
  }, [fundList]);
  //매수(일반종목) events에 저장
  const userEventStore = async (form) => {
    console.log(form);
    let eventId = await store({
      form: {
        eventName: form.eventName,
        fixedAmount: form.buyPrice,
        transactionDate: form.dealDate,
      },

      isPublicOffering: false,
    });
    userDealStore(eventId);
  };
  //매수(deals)
  const userDealStore = async (eventId) => {
    const filterList = checkFundList.filter((fund) => fund.checked === true);
    filterList.forEach(async (fund) => {
      let copyForm = { ...form, eventId: eventId, fundId: fund.id };
      buyStore({ form: copyForm });
    });
  };
  //매도(deals)
  const userDealSell = async (form) => {
    console.log("userDealSell");
    console.log(checkFundList);
    const filterList = checkFundList.filter((fund) => fund.checked === true);
    filterList.forEach(async (fund) => {
      let copyForm = { ...form, fundId: fund.id };
      sellStore({ form: copyForm, fundList: fundList });
    });
  };

  // ? 매도할 때 총거래잔량, 최근 거래날짜를 가져오기
  useEffect(async () => {
    if (form.type === "sell" && fund && event) {
      /**
       * ! 2022-03-10
       * ! 수정사항 : 의무보유기간이 지나지 않을 시 매도 못하게하기
       */
      if (new Date() < new Date(event.mandatoryDate)) {
        window.alert(
          "종목의 의무보유기간이 지나지 않았습니다.\n의무보유기간이 지나야 매도가 가능합니다."
        );
        return close();
      }

      const dealDoc = await getLatestDealBy({
        fundId: fund.id,
        eventId: event.id,
      });
      console.debug(dealDoc);
      setLatestDeal(dealDoc);
    }
  }, [form.type, fund, event]);

  // // * 올바른 거래날짜 채크
  // const isCorrectDate = ({ date = new Date() }) => {
  //   let result = false;
  //   if (
  //     new Date(event.startSubscribePeriod) <= new Date(date) &&
  //     new Date(event.endSubscribePeriod) >= new Date(date)
  //   ) {
  //     result = true;
  //   }
  //   return result;
  // };

  // * 생성 이벤트
  const onSubmit = () => {
    form.type === "buy" ? userEventStore(form) : userDealSell(form, fundList);
    close();
  };

  return (
    <form className="min-w-[350px] max-h-[800px] overflow-hidden overflow-y-scroll p-2">
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
        <label>
          펀드선택
          <FundListSelector
            checkFundList={checkFundList}
            setCheckFundList={setCheckFundList}
            form="select"
          />
        </label>
      </div>
      {form.type === "buy" ? (
        <div className="flex flex-col mt-2">
          <label className="font-noto-regular">
            종목입력
            <span className="ml-1 text-xs text-red-500"></span>
          </label>
          <input
            type="text"
            name="eventName"
            value={form.eventName}
            className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            onChange={changeInput}
          />
        </div>
      ) : (
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
                console.log(event);
                setEvent(event);
                setForm({
                  ...form,
                  eventId: event.id,
                  buyPrice: event.fixedAmount,
                  eventName: event.eventName,
                });
              }
            }}
          >
            <option value="0">선택</option>
            {events.map((event) => {
              if (
                new Date(event.paymentDate) <= new Date() ||
                !event.isPublicOffering
              )
                return (
                  <option key={event.id} value={JSON.stringify(event)}>
                    {event.eventName}
                  </option>
                );
            })}
          </select>
        </div>
      )}
      {/*<div className="flex flex-col mt-2">
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
      </div>*/}

      {
        <div>
          {form.type === "buy" ? (
            <div className="flex flex-col mt-2">
              <label className="font-noto-regular">매수금액</label>
              <input
                type="number"
                name="buyPrice"
                value={form.buyPrice}
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={changeInput}
              />
              <span className="p-2 text-xs rounded-md">
                {currency(form.buyPrice)} 원
              </span>
            </div>
          ) : (
            <div className="flex flex-col mt-2">
              <label className="font-noto-regular">
                매도금액
                {/* <span className="ml-1 text-xs text-blue-600">
                (최근 매도금액: {latestDeal ? latestDeal.salePrice : "?"})
              </span> */}
              </label>

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
            <label className="font-noto-regular">
              거래수량
              {/* {form.type === "sell" && (
                <span className="ml-1 text-xs text-blue-600">
                  (현재 총 거래잔량: {latestDeal ? latestDeal.totalQuantity : 0}
                  )
                </span>
              )} */}
            </label>
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
              //   onBlur={(e) => {
              //     console.debug("빠저나감");
              //     if (form.type === "sell") {
              //       const totalQuantity = latestDeal
              //         ? latestDeal.totalQuantity
              //         : 0;
              //       console.debug(totalQuantity, form.quantity);
              //       if (Number(totalQuantity) < Number(form.quantity)) {
              //         window.alert("총 거래잔량보다 많을 수 없습니다.");
              //         setForm({ ...form, quantity: totalQuantity });
              //         e.target.focus();
              //       }
              //     }
              //   }
              // }
            />
            <span className="p-2 text-xs rounded-md">
              {currency(form.quantity)}주
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-noto-regular">거래수수료(원)</label>
            <input
              type="number"
              name="transactionFee"
              value={form.transactionFee}
              className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onChange={(e) => {
                setForm({
                  ...form,
                  transactionFee: e.target.value,
                  totalQuantity: form.type === "buy" ? e.target.value : 0,
                });
              }}
            />
            <span className="p-2 text-xs rounded-md">
              {currency(form.transactionFee)}원
            </span>
          </div>
          <div className="flex flex-col mt-2">
            <label className="font-noto-regular">
              거래날짜
              {form.type === "sell" && (
                <span className="ml-1 text-xs text-blue-600">
                  (매수날짜: {event ? event.transactionDate : ""})
                </span>
              )}
              {/* {form.type === "sell" && (
                <span className="ml-1 text-xs text-blue-600">
                  (최근 거래날짜: {latestDeal ? latestDeal.dealDate : ""})
                </span>
              )} */}
            </label>
            {/* {form.type === "buy" ? (
              <>
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
                  onChange={(e) => {
                    if (!isCorrectDate({ date: e.target.value })) {
                      return window.alert("청약기간 내의 날짜를 입력해주세요!");
                    }
                    changeInput(e);
                  }}
                />
              </>
            ) : (
              <input
                type="date"
                name="dealDate"
                value={form.dealDate}
                className="flex-1 w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                onChange={(e) => {
                  const latestDate = latestDeal
                    ? new Date(latestDeal.dealDate)
                    : new Date();
                  if (new Date(e.target.value) <= latestDate) {
                    return window.alert(
                      "최근 거래날짜와 같거나 작을 수 없습니다."
                    );
                  }
                  changeInput(e);
                }}
              />
            )} */}
            <input
              type="date"
              name="dealDate"
              value={form.dealDate}
              className="flex-1 w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              onChange={(e) => {
                if (form.type === "sell" && event) {
                  if (
                    new Date(event.transactionDate) <= new Date(e.target.value)
                  ) {
                    changeInput(e);
                  }
                } else {
                  changeInput(e);
                }
              }}
            />
          </div>
        </div>
      }

      <button
        type="button"
        className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
        onClick={onSubmit}
        disabled={!isCompleted}
      >
        {isCompleted ? "거래 생성" : "모든 항목을 입력해주세요.."}
      </button>
    </form>
  );
}

export default DealForm;
