function MobileContainer({ children }) {
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden bg-gray-100">
      <div className="relative h-full w-full max-w-[500px] bg-white overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default MobileContainer;
