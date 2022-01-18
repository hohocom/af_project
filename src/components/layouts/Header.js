/* eslint-disable react-hooks/exhaustive-deps */
import img01 from "assets/images/header/01.svg";
import img02 from "assets/images/header/02.svg";
import img03 from "assets/images/header/03.svg";
import img04 from "assets/images/header/04.svg";
import img05 from "assets/images/header/05.svg";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header({ title = "타이틀" }) {
  const { pathname } = useLocation();

  const [sidebar, setSidebar] = useState(0);
  const [menus, setMenus] = useState([
    { title: "투자내역", url: "/invest-detail", seleted: true },
    { title: "배정현황", url: "/assignment-status", seleted: false },
    { title: "체결내역", url: "/conclusions", seleted: false },
    { title: "보유종목", url: "/hold-events", seleted: false },
    { title: "손익검색", url: "/profit-or-loss", seleted: false },
  ]);

  useEffect(() => {
    const newMenus = menus.map((menu) => {
      if (menu.url === pathname) {
        return {
          ...menu,
          seleted: true,
        };
      } else {
        return {
          ...menu,
          seleted: false,
        };
      }
    });
    setMenus(newMenus);
  }, [pathname]);

  return (
    <>
      <header className="bg-white border-b">
        <div className="flex items-center justify-between w-full pt-4 pb-2 pl-4 pr-2">
          <button className="w-[20px] mr-6" onClick={() => setSidebar(70)}>
            <img src={img01} alt="img_01" />
          </button>
          <div className="text-xl font-gong-light">{title}</div>
          <div>
            <button className="p-2">
              <i className="fas fa-search"></i>
            </button>
            <button className="p-2">
              <i className="fas fa-home"></i>
            </button>
          </div>
        </div>
        <nav className="flex w-full overflow-x-auto overscroll-x-auto whitespace-nowrap">
          {menus.map((menu, index) => {
            return (
              <Link
                key={index}
                to={menu.url}
                className={"inline-block p-2 border-b-4 border-white menu-item ".concat(
                  menu.seleted && "border-blue-900"
                )}
              >
                {menu.title}
              </Link>
            );
          })}
        </nav>
      </header>
      {sidebar > 0 && (
        <div
          className="fixed top-0 left-0 z-40 w-full h-full bg-black/70"
          onClick={() => setSidebar(0)}
        ></div>
      )}
      <aside
        className={`fixed top-0 ${sidebar > 0 ? "left-0" : "-left-20"} 
        h-full transition-all duration-300 bg-gradient-to-b from-[#5E00B6] to-[#3000FA] rounded-tr-3xl p-4
        flex flex-col font-gong-light z-50
        `}
        style={{ width: sidebar + "%" }}
      >
        <button className="w-[30px]">
          <img src={img02} alt="img_02" onClick={() => setSidebar(0)} />
        </button>
        {sidebar > 0 && (
          <>
            <div className="flex items-center justify-start mt-4 text-white">
              <div className="w-[60px] h-[60px] rounded-full bg-gray-50 mr-2"></div>
              <div>
                <p>
                  <strong>에이에프</strong>님의
                </p>
                <p>투자현황입니다</p>
              </div>
            </div>
            <div className="p-4 mt-4 text-xs bg-white rounded-xl">
              <div className="flex items-center justify-start">
                <div className="min-w-[50px]">
                  {/* tracking-[2rem] */}
                  <strong>아이디</strong>
                </div>
                <p className="font-apple-sb">afia@afassets.com</p>
              </div>
              <div className="flex items-center justify-start">
                <div className="min-w-[50px]">
                  <strong>생년월일</strong>
                </div>
                <p className="font-apple-sb">1968.01.10</p>
              </div>
              <div className="flex items-start justify-start">
                <div className="min-w-[50px]">
                  <strong>주소</strong>
                </div>
                <p className="font-apple-sb">
                  광주광역시 서구 상무중앙로 110(치평동)
                </p>
              </div>
              <div className="flex items-center justify-start">
                <div className="min-w-[50px]">
                  <strong>휴대전화</strong>
                </div>
                <p className="font-apple-sb">010-3884-2540</p>
              </div>
              <div className="flex items-center justify-start">
                <div className="min-w-[50px]">
                  <strong>이메일</strong>
                </div>
                <p className="font-apple-sb">afia@afassets.com</p>
              </div>
            </div>
            <Link
              to="/users/me"
              className="flex items-center justify-end mt-4 text-sm text-white"
            >
              개인 정보 변경
              <img src={img03} alt="img_03" className="w-[14px] ml-1 mb-0.5" />
            </Link>
            <div className="flex items-end justify-between mt-6 text-white">
              <div className="text-2xl ">투자리스트</div>
              <div className="text-sm">1월 10일 기준</div>
            </div>
            <ul>
              <li>
                <Link
                  to="/"
                  className="flex items-center justify-between w-full p-2 mt-2 bg-white rounded-xl"
                >
                  공모주펀딩A
                  <img src={img04} alt="img_04" className="h-[20px]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center justify-between w-full p-2 mt-2 bg-white rounded-xl"
                >
                  공모주펀딩B
                  <img src={img04} alt="img_04" className="h-[20px]" />
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="flex items-center justify-between w-full p-2 mt-2 bg-white rounded-xl"
                >
                  부동산개발펀딩
                  <img src={img04} alt="img_04" className="h-[20px]" />
                </Link>
              </li>
            </ul>

            <div className="absolute bottom-0 left-0 flex items-center justify-center w-full mb-4">
              <button className="flex items-start justify-center text-white">
                <img src={img05} alt="img_05" className="h-[20px]" />
                로그아웃하기
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

export default Header;
