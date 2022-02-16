import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { toastState } from "core/state";

const Toast = () => {
  const toast = useRecoilValue(toastState);
  const resetToast = useResetRecoilState(toastState);

  useEffect(() => {
    if (toast.open) {
      const timer = setTimeout(() => {
        resetToast();
      }, toast.second);
      return () => {
        clearTimeout(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toast]);

  let bgColor = "bg-green-400";
  if (toast.type === "INFO") bgColor = "bg-blue-400";
  else if (toast.type === "WARNING") bgColor = "bg-yellow-400";
  else if (toast.type === "ERROR") bgColor = "bg-red-300";

  return (
    toast.open && (
      <div
        className={`fixed right-10 top-10 flex items-center justify-between px-4 py-2 ${bgColor} rounded-sm shadow-lg min-w-200 animate-bounce z-50 overflow-hidden`}
      >
        {toast.type === "SUCCESS" && <i className="far fa-check-circle"></i>}
        {toast.type === "INFO" && <i className="fas fa-info-circle"></i>}
        {toast.type === "WARNING" && (
          <i className="fas fa-exclamation-circle"></i>
        )}
        {toast.type === "ERROR" && <i className="fas fa-bomb"></i>}
        <p className="mx-2 overflow-visible truncate font-noto-light max-w-350 whitespace-nowrap">
          {toast.message}
        </p>
        <i
          className="cursor-pointer fas fa-times"
          onClick={() => resetToast()}
        ></i>
      </div>
    )
  );
};
export default Toast;
