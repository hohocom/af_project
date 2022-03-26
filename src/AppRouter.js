/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable array-callback-return */
import React from "react";
import { useRoutes } from "react-router-dom";

import {
  AssignmentStatusPage,
  ConclusionPage,
  HoldEventPage,
  InvestDetailPage,
  LoginPage,
  ProfitOrLossPage,
  UserDetailPage,
  UserEditAddressPage,
  UserEditPhone,
  UserEditPwPage,
} from "pages/client";

import {
  AdminDealPage,
  AdminEventPage,
  AdminFundPage,
  AdminLoginPage,
  AdminUserPage,
} from "pages/admin";
import { Loading } from "components/common";
import {
  useDealStream,
  useEventStream,
  useFund,
  useFundStream,
  useSignObserver,
  useUserFundStream,
  useUserStream,
} from "core/hooks";
import { useRecoilValue } from "recoil";
import { managerDetailState, userDetailState } from "core/state";
import { useClosingPriceStream } from "core/hooks/useUserFund";

function App() {
  useUserStream();
  useFundStream();
  useUserFundStream();
  useEventStream();
  useDealStream();

  const { loading } = useSignObserver();
  const manager = useRecoilValue(managerDetailState);
  const user = useRecoilValue(userDetailState);

  const route = useRoutes([
    // 모바일, 회원 전용 페이지 리스트
    {
      path: "/",
      element: <InvestDetailPage user={user} redirectURL="/login" />,
    },
    {
      path: "/login",
      element: (
        <LoginPage user={user} restricted={true} redirectURL="/invest-detail" />
      ),
    },
    {
      path: "/users/me",
      element: <UserDetailPage user={user} redirectURL="/login" />,
    },
    {
      path: "/users/me/re-password",
      element: <UserEditPwPage user={user} redirectURL="/login" />,
    },
    {
      path: "/users/me/re-address",
      element: <UserEditAddressPage user={user} redirectURL="/login" />,
    },
    {
      path: "/users/me/re-phone",
      element: <UserEditPhone user={user} redirectURL="/login" />,
    },
    {
      path: "/invest-detail",
      element: <InvestDetailPage user={user} redirectURL="/login" />,
    },
    {
      path: "/assignment-status",
      element: <AssignmentStatusPage user={user} redirectURL="/login" />,
    },
    {
      path: "/conclusions",
      element: <ConclusionPage user={user} redirectURL="/login" />,
    },
    {
      path: "/hold-events",
      element: <HoldEventPage user={user} redirectURL="/login" />,
    },
    {
      path: "/profit-or-loss",
      element: <ProfitOrLossPage user={user} redirectURL="/login" />,
    },
    // 데스크톱, 관리자 전용 페이지 리스트
    {
      path: "/admin",
      element: (
        <AdminLoginPage
          user={manager}
          restricted={true}
          redirectURL="/admin/users"
        />
      ),
    },
    {
      path: "/admin/users",
      element: <AdminUserPage user={manager} redirectURL="/admin" />,
    },
    {
      path: "/admin/funds",
      element: <AdminFundPage user={manager} redirectURL="/admin" />,
    },
    {
      path: "/admin/events",
      element: <AdminEventPage user={manager} redirectURL="/admin" />,
    },
    {
      path: "/admin/deals",
      element: <AdminDealPage user={manager} redirectURL="/admin" />,
    },
  ]);

  return <Loading isLoading={!loading}>{route}</Loading>;
}

export default App;
