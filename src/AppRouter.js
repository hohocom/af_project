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
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.debug("로그인/로그아웃 감지");
      if (user) {
        const userRef = await db.collection("users").doc(user.email).get();

        //로그인은 되었는데 문서가 없는 상황
        if (userRef.data() === undefined) return;

        if (userRef.data().role === "ADMIN") {
          setManager(userRef.data());
        } else {
          setUser(userRef.data());
        }
      } else {
        setManager(null);
        setUser(null);
      }
      setLoading(true);
    });
  }, []);

  const route = useRoutes([
    // 모바일, 회원 전용 페이지 리스트
    {
      path: "/",
      element: (
        <LoadingPage
          user={user}
          restricted={true}
          redirectURL="/invest-detail"
        />
      ),
    },
    {
      path: "/login",
      element: (
        <LoginPage user={user} restricted={true} redirectURL="/invest-detail" />
      ),
    },
    {
      path: "/users/me",
      element: <UserEditPage user={user} redirectURL="/login" />,
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
