// TODO: 투자내역 페이지

import { Header } from "components/layouts";
import { Card } from "components/common";
import { InvestBody, InvestDetail } from "components/layouts/investDetail";

function InvestDetailPage() {
  return (
    <div className="bg-[#EEEEEE] h-full font-gong-light">
      <Header title="투자내역" />
      <div className="w-full flex flex-col p-4">
        <Card
          title="공모주 펀드A"
          body={<InvestBody />}
          bottomOutside={<InvestDetail />}
        />
        <Card
          title="공모주 펀드B"
          body={<InvestBody />}
          bottomOutside={<InvestDetail />}
        />
      </div>
    </div>
  );
}

export default InvestDetailPage;
