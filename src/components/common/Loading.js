import "assets/styles/loading.css";
import { useEffect } from "react";

function Loading({
  isLoading = false,
  loadingUI = (
    <div className="fixed w-full h-full bg-indigo-800">
      <div class="loader">
        <div class="inner one"></div>
        <div class="inner two"></div>
        <div class="inner three"></div>
      </div>
    </div>
  ),
  children,
}) {
  return isLoading ? loadingUI : children;
}

export default Loading;
