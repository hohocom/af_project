/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable array-callback-return */
import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";

import {
  AssignmentStatusPage,
  ConclusionPage,
  HoldEventPage,
  InvestDetailPage,
  LoadingPage,
  LoginPage,
  ProfitOrLossPage,
  UserEditPage,
} from "pages";

import {
  AdminDealPage,
  AdminEventPage,
  AdminFundPage,
  AdminLoginPage,
  AdminUserPage,
} from "pages/admin";
import { useState } from "react/cjs/react.development";
import { auth, db } from "utils/firebase";
import { Loading } from "components/common";
import {
  useDealStream,
  useEventStream,
  useFundStream,
  useUserFundStream,
  useUserStream,
} from "core/hooks";

function App() {
  useUserStream();
  useFundStream();
  useUserFundStream();
  useEventStream();
  useDealStream();

  const [manager, setManager] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const managerRef = await db.collection("managers").get();
        managerRef.docs.forEach((manager) => {
          if (manager.id === user.uid) {
            setManager({
              id: manager.id,
              ...manager.data(),
            });
          }
        });
      } else {
        setManager(null);
      }
      setLoading(true);
    });
  }, []);

  const route = useRoutes([
    // 모바일, 회원 전용 페이지 리스트
    { path: "/", element: <LoadingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/users/me", element: <UserEditPage /> },
    { path: "/invest-detail", element: <InvestDetailPage /> },
    { path: "/assignment-status", element: <AssignmentStatusPage /> },
    { path: "/conclusions", element: <ConclusionPage /> },
    { path: "/hold-events", element: <HoldEventPage /> },
    { path: "/profit-or-loss", element: <ProfitOrLossPage /> },
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
