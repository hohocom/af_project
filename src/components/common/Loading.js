import "assets/styles/loading.css";

function Loading({
  isLoading = false,
  loadingUI = (
    <div className="fixed w-full h-full bg-indigo-800">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </div>
  ),
  children,
}) {
  return isLoading ? loadingUI : children;
}

export default Loading;
