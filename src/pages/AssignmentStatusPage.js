import { Card } from "components/common";
import { Header, MobileLayout } from "components/layouts";
import { useState } from "react";

function AssignmentStatusPage() {
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
  });
  return (
    <MobileLayout>
      <div className="relative flex flex-col w-full p-4">
        <Card
          title="공모주펀딩"
          body={
            <table className="w-full text-xs table-fixed">
              <thead>
                <tr>
                  <th className="p-2 border-r">날짜/종목명</th>
                  <th className="p-2 border-r">매수가/매수량</th>
                  <th>금액/비고</th>
                </tr>
              </thead>
              <tbody className="font-apple-sb">
                <tr
                  className="border-t"
                  onClick={() => setModal({ ...modal, isOpen: true })}
                >
                  <td className="border-r">
                    <div className="p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>2021-03-04</p>
                      <nobr>케이티비 네트워크 솔루션</nobr>
                    </div>
                  </td>
                  <td className="border-r">
                    <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>500,000원</p>
                      <nobr>300주</nobr>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>150,000,000원</p>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="border-r">
                    <div className="p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>2021-03-04</p>
                      <nobr>케이티비 네트워크 솔루션</nobr>
                    </div>
                  </td>
                  <td className="border-r">
                    <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>500,000원</p>
                      <nobr>300주</nobr>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>9,000,000,000원</p>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="border-r">
                    <div className="p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>2021-03-04</p>
                      <nobr>케이티비 네트워크 솔루션</nobr>
                    </div>
                  </td>
                  <td className="border-r">
                    <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>500,000원</p>
                      <nobr>300주</nobr>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>9,000,000,000원</p>
                    </div>
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="border-r">
                    <div className="p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>2021-03-04</p>
                      <nobr>케이티비 네트워크 솔루션</nobr>
                    </div>
                  </td>
                  <td className="border-r">
                    <div className="flex flex-col items-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>500,000원</p>
                      <nobr>300주</nobr>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-end p-1 overflow-hidden overflow-ellipsis whitespace-nowrap">
                      <p>9,000,000,000원</p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          }
          bottomOutside={
            <div className="flex justify-center w-full mt-2">
              <button
                className="w-1/2 p-2 text-white bg-blue-600 rounded-md"
                // onClick={() => changeState(2)}
              >
                더보기(1/10)
              </button>
            </div>
          }
        />
        {modal.isOpen && (
          <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full p-4 bg-black/80">
            <Card
              title="배정결과"
              body={
                <div className="flex w-full text-xs">
                  <div className="flex flex-col items-end w-4/12 p-4 border-r">
                    <p>계좌번호</p>
                    <p>계좌명</p>
                    <p>참여종목명</p>
                    <p>확정공모가액</p>
                    <p>청약기간</p>
                    <p>납입일</p>
                    <p>의무보유</p>
                    <p>배정주식수</p>
                    <p>배정금액</p>
                    <p>청약수수료</p>
                    <p>총 납입금액</p>
                  </div>
                  <div className="flex flex-col items-start w-8/12 p-4 font-apple-sb">
                    <p>664-43-527481</p>
                    <p>(주)에이에프투자자문</p>
                    <p>알비더블유</p>
                    <p>21,400원</p>
                    <p>2021.11.11~2021.11.12</p>
                    <p>2021.11.16</p>
                    <p>미확약</p>
                    <p>200주</p>
                    <p>4,280,000원</p>
                    <p>42,800원</p>
                    <p>4,322,800원</p>
                  </div>
                </div>
              }
              bottomOutside={
                <button
                  className="p-3 pt-3.5 w-2/3 bg-blue-800 text-white rounded-md mt-4"
                  onClick={() => setModal({ ...modal, isOpen: false })}
                >
                  확인
                </button>
              }
            />
          </div>
        )}
      </div>
    </MobileLayout>
  );
}

export default AssignmentStatusPage;
