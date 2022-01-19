import { Header } from ".";

function MobileLayout({
  hideHeader = false,
  themeColor = "#EEEEEE",
  children,
}) {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-gray-100">
      <div className="relative h-full w-full max-w-[500px] bg-white overflow-y-auto">
        <div
          className="h-full font-gong-light"
          style={{ backgroundColor: themeColor }}
        >
          {!hideHeader && <Header title="배정현황" />}
          {children}
        </div>
      </div>
    </div>
  );
}

export default MobileLayout;
