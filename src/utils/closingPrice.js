import axios from "axios";
//종가 얻어오기
export async function getClosingPrice(eventName) {
  const url =
    "https://api.odcloud.kr/api/GetStockSecuritiesInfoService/v1/getStockPriceInfo";
  const serviceKey =
    "N7SieJxvk8AVxfM4SrmQOiAc5hOjevbbE9DJepEi0ibB1mZ0otnwK9ytSSDwTcxdDR4/X/OtQ8keM0XcEFQ2Gg==";
  const stockData = await axios.get(
    `${url}?numOfRows=1&resultType=json&itmsNm=${eventName}&serviceKey=${serviceKey}`
  );
  const stockItem = stockData.data.response.body.items.item;
  try {
    return stockItem[0].clpr;
  } catch (e) {
    return 0;
  }
}
