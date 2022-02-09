import { Modal } from "components/common";
import { Header } from ".";

function MobileLayout({
  hideHeader = false,
  themeColor = "#EEEEEE",
  children,
}) {
  return (
    <div className="flex items-start justify-center w-full h-screen ">
      <div className="relative h-full bg-gray-100 w-full max-w-[500px] overflow-y-auto">
        <div
          className="h-full font-gong-light"
          style={{ backgroundColor: themeColor }}
        >
          {!hideHeader && <Header title="배정현황" />}
          {children}
        </div>
      </div>
      <Modal />
    </div>
  );
}

export default MobileLayout;
