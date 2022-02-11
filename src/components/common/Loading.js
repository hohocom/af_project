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

export function LoadingType2({ children, isLoading = false }) {
  return (
    <>
      {isLoading && (
        <div className="fixed z-50 w-full h-full bg-black/30">
          <div className="loader">
            <div className="inner one"></div>
            <div className="inner two"></div>
            <div className="inner three"></div>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
