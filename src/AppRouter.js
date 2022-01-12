import React from "react";
import { useRoutes } from "react-router-dom";

import { Home } from "pages";

function App() {
  const route = useRoutes([{ path: "/", element: <Home /> }]);

  return route;
}

export default App;
