import { Modal } from "components/common";
import { Header } from ".";

function MobileLayout({
  hideHeader = false,
  themeColor = "#EEEEEE",
  children,
}) {
  return (
    <div className="flex items-start justify-center w-full h-screen font-gong-light">
      <div className="relative h-full bg-gray-100 w-full max-w-[500px] overflow-hidden ">
        {!hideHeader && <Header title="배정현황" />}
        <div
          className="h-[90%] overflow-y-auto"
          style={{ backgroundColor: themeColor }}
        >
          {children}
        </div>
        <Modal />
      </div>
    </div>
  );
}

export default MobileLayout;
