import React from "react";
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
import { AdminLoginPage, AdminUserPage } from "pages/admin";

function App() {
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
    { path: "/admin/login", element: <AdminLoginPage /> },
    { path: "/admin/users", element: <AdminUserPage /> },
  ]);

  return route;
}

export default App;
