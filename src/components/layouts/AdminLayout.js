import { Link } from "react-router-dom";
import "assets/styles/table.css";

function AdminLayout({ main, step, sub, subMinWidth = 400, subTotal = 1 }) {
  return (
    <div className="fixed w-full h-full font-noto-light">
      <header className="flex items-center justify-start w-full bg-white border-b border-gray-200">
        <figure className="p-4">AF투자자문 관리페이지</figure>
        <ul>
          <li>
            <Link to="/admin/users" className="px-2 py-4">
              회원관리
            </Link>
            <Link to="/admin/funds" className="px-2 py-4">
              펀드관리
            </Link>
          </li>
        </ul>
      </header>
      <main id="main" className="flex w-full h-full transition-all bg-gray-100">
        <section className="w-full h-full p-4">{main}</section>
        <aside
          className="flex h-full duration-200"
          style={{
            marginRight: -subMinWidth * subTotal + subMinWidth * step + "px",
          }}
        >
          {sub}
        </aside>
      </main>
    </div>
  );
}

export default AdminLayout;
