import React from "react";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import AppRouter from "AppRouter";
import * as serviceWorkerRegistration from "utils/serviceWorkerRegistration";
import reportWebVitals from "utils/reportWebVitals";
import "assets/styles/index.css";

ReactDOM.render(
  <BrowserRouter>
    <RecoilRoot>
      <AppRouter />
    </RecoilRoot>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
