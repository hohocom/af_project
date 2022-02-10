/* eslint-disable array-callback-return */
// TODO: 투자내역 페이지

import { Header, MobileLayout } from "components/layouts";
import { Card, withPrivate } from "components/common";
import { InvestBody, InvestDetail } from "components/layouts/investDetail";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userDetailState } from "core/state";
import { fundListState } from "core/state";
import { userFundListState, useUserFund } from "core/hooks";
import { db } from "utils/firebase";

function InvestDetailPage() {
  const user = useRecoilValue(userDetailState);
  const fundList = useRecoilValue(fundListState);
  const { getJoinUserFundList } = useUserFund();

  return (
    <MobileLayout>
      <div className="flex flex-col w-full p-4">
        {getJoinUserFundList({ fundList }).map((userFund, index) => {
          if (userFund.userId === user.id)
            return (
              <Card
                key={index}
                title={userFund.fundName}
                body={<InvestBody fund={userFund} />}
                bottomOutside={<InvestDetail fund={userFund} />}
              />
            );
        })}
      </div>
    </MobileLayout>
  );
}

export default withPrivate(InvestDetailPage);
