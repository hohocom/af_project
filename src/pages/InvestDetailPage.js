// TODO: 투자내역 페이지

import { Header, MobileLayout } from "components/layouts";
import { Card, withPrivate } from "components/common";
import { InvestBody, InvestDetail } from "components/layouts/investDetail";

function InvestDetailPage() {
  return (
    <MobileLayout>
      <div className="flex flex-col w-full p-4">
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
    </MobileLayout>
  );
}

export default withPrivate(InvestDetailPage);
