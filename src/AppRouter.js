import React from "react";
import { useRoutes } from "react-router-dom";

import { InvestDetailPage, LoadingPage, LoginPage } from "pages";
import { MobileContainer } from "components/layouts";

function App() {
  const route = useRoutes([
    { path: "/", element: <LoadingPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/invest-detail", element: <InvestDetailPage /> },
  ]);

  return <MobileContainer>{route}</MobileContainer>;
}

export default App;
