import { NavLink } from "react-router-dom";
import "assets/styles/table.css";
import { Modal } from "components/common";

function AdminLayout({ children, title = "제목" }) {
  return (
    <div className="fixed flex w-full h-full overflow-x-auto font-noto-light">
      <div className="relative bg-white dark:bg-gray-800">
        <div className="flex flex-col sm:flex-row sm:justify-around">
          <div className="h-screen border-r shadow-sm w-72">
            <figure className="flex items-center justify-center mt-10 text-xl font-noto-bold">
              AF 관리자 페이지
            </figure>
            <nav className="px-6 mt-10 ">
              <NavLink
                style={(state) => ({
                  backgroundColor: state.isActive && "#F2F2F2",
                })}
                to="/admin/users"
                className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
              >
                <span className="mx-4 text-lg font-normal">회원관리</span>
                <span className="flex-grow text-right"></span>
              </NavLink>
              <NavLink
                style={(state) => ({
                  backgroundColor: state.isActive && "#F2F2F2",
                })}
                to="/admin/funds"
                className="flex items-center p-2 my-6 text-gray-800 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-100 dark:bg-gray-600"
              >
                <span className="mx-4 text-lg font-normal">펀드관리</span>
                <span className="flex-grow text-right"></span>
              </NavLink>
              <NavLink
                style={(state) => ({
                  backgroundColor: state.isActive && "#F2F2F2",
                })}
                to="/admin/events"
                className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
              >
                <span className="mx-4 text-lg font-normal">종목관리</span>
                <span className="flex-grow text-right"></span>
              </NavLink>
              <NavLink
                style={(state) => ({
                  backgroundColor: state.isActive && "#F2F2F2",
                })}
                to="/admin/deals"
                className="flex items-center p-2 my-6 text-gray-600 transition-colors duration-200 rounded-lg hover:text-gray-800 hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-600 dark:text-gray-400 "
              >
                <span className="mx-4 text-lg font-normal">거래관리</span>
                <span className="flex-grow text-right"></span>
              </NavLink>
            </nav>
          </div>
        </div>
      </div>
      <main
        id="main"
        className="flex flex-col w-full h-full transition-all bg-gray-100"
      >
        <header className="w-full p-4 text-xl bg-white border-b font-noto-bold">
          {title}
        </header>
        <section className="w-full h-full p-4 overflow-y-auto">{children}</section>
        <Modal />
      </main>
    </div>
  );
}

export default AdminLayout;
