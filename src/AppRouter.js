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
import { MobileContainer } from "components/layouts";

function App() {
  const route = useRoutes([
    { path: "/", element: <LoadingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/users/me", element: <UserEditPage /> },
    { path: "/invest-detail", element: <InvestDetailPage /> },
    { path: "/assignment-status", element: <AssignmentStatusPage /> },
    { path: "/conclusions", element: <ConclusionPage /> },
    { path: "/hold-events", element: <HoldEventPage /> },
    { path: "/profit-or-loss", element: <ProfitOrLossPage /> },
  ]);

  return <MobileContainer>{route}</MobileContainer>;
}

export default App;
