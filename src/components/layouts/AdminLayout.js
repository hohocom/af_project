function AdminLayout({ children }) {
  return (
    <div className="fixed w-full h-full bg-gray-100">
      <div id="main" className="w-[1000px] border-r h-full"></div>
      <div id="side" className=""></div>
    </div>
  );
}

export default AdminLayout;
