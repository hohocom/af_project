/* eslint-disable array-callback-return */
// TODO: 투자내역 페이지

import { MobileLayout } from "components";
import { Card, withPrivate } from "components/common";
import { InvestBody, InvestDetail } from "components/investDetail";
import { useRecoilValue } from "recoil";
import { userDetailState } from "core/state";
import { useUserFund } from "core/hooks";

function InvestDetailPage() {
  const user = useRecoilValue(userDetailState);
  const { getJoinUserFundList } = useUserFund(); //내가 가입한 펀드정보

  return (
    <MobileLayout>
      <div className="flex flex-col w-full p-4">
        {getJoinUserFundList().map((userFund, index) => {
          if (userFund.userId === user.id)
            return (
              <Card
                key={index}
                title={userFund.fundName}
                body={<InvestBody fund={userFund} />}
                bottomOutside={<InvestDetail fund={userFund} user={user} />}
              />
            );
        })}
      </div>
    </MobileLayout>
  );
}

export default withPrivate(InvestDetailPage);
