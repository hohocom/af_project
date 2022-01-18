import { Header } from "components/layouts";
import img01 from "assets/images/conclusion/01.svg";

function ProfitOrLossPage() {
  return (
    <div className="bg-[#EEEEEE] h-full font-gong-light">
      <Header title="손익검색" />
      <div className="flex flex-col w-full p-4">
        <div className="flex items-center justify-start w-full ">
          <img src={img01} alt="img_01" className="w-[20px] mr-2" />
          <p>조회기간</p>
        </div>
        <div className="flex justify-between items-center max-w-[100%] mt-4">
          <label htmlFor="date1" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date1"
              type="date"
              className="w-full bg-white outline-none"
            />
          </label>
          <div className="mx-2 text-xl">~</div>
          <label htmlFor="date2" className="bg-white w-[40%] rounded-md p-1">
            <input
              id="date2"
              type="date"
              className="w-full bg-white outline-none"
            />
          </label>
        </div>
        <div className="flex items-center justify-between mt-4">
          <button className="p-2 w-[80px] bg-white rounded-md">1개월</button>
          <button className="p-2 w-[80px] bg-white rounded-md">3개월</button>
          <button className="p-2 w-[80px] bg-white rounded-md">6개월</button>
          <button className="p-2 w-[80px] bg-white rounded-md">1년</button>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="p-2 w-[70%] bg-blue-600 rounded-md text-white">
            조회
          </button>
        </div>
        <div className="w-full mt-6 bg-white rounded-md">
          <table className="w-full text-xs table-fixed">
            <thead>
              <tr>
                <th className="p-2 border-r">날짜</th>
                <th className="p-2 border-r">수수료</th>
                <th className="p-2 border-r">실손익</th>
                <th>실손익</th>
              </tr>
            </thead>
            <tbody className="font-apple-sb">
              <tr className="border-t">
                <td className="border-r">
                  <div className="p-1">
                    <p>2021-03-04</p>
                  </div>
                </td>
                <td className="border-r">
                  <div className="flex flex-col items-end p-1">
                    <p>500,000원</p>
                  </div>
                </td>
                <td className="border-r">
                  <div className="flex flex-col items-end p-1">
                    <p>73,000원</p>
                  </div>
                </td>
                <td>
                  <div className="flex flex-col items-end p-1">
                    <p>9,800원</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-center mt-4">
          <button className="p-2 w-[70%] bg-blue-600 rounded-md text-white">
            더보기(1/2)
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfitOrLossPage;
