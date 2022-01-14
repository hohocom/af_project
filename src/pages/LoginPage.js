import img01 from "assets/images/login/01.svg";
import img02 from "assets/images/login/02.svg";
import img03 from "assets/images/login/03.svg";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <img src={img01} alt="img_01" className="absolute top-0 left-0 z-0" />
      <div className="absolute top-0 left-0 w-full h-full font-gong-light">
        <div className="pt-16 pl-6 text-3xl">
          <p>에이에프</p>
          <p>투자자문</p>
          <img src={img02} alt="img_02" className="w-[50%]" />
          <img src={img03} alt="img_03" className="w-[45%]" />
        </div>

        <div className="flex flex-col items-center w-full mt-16">
          <label className="border border-[#2B24F8] rounded-3xl w-[80%] p-4 flex justify-center items-center">
            <i className="mr-2 fas fa-user"></i>
            <input
              className="text-xs w-[90%] outline-none "
              placeholder="가입된 아이디를 입력해 주세요."
            />
          </label>
          <label className="border border-[#2B24F8] rounded-3xl w-[80%] p-4 flex justify-center items-center mt-[10px]">
            <i className="mr-2 fas fa-lock"></i>
            <input
              type="password"
              className="text-xs w-[90%] outline-none"
              placeholder="비밀번호를 입력해주세요."
            />
          </label>

          <Link
            to="/invest-detail"
            className="bg-[#2B24F8] text-white rounded-3xl w-[80%] p-3 flex justify-center items-center mt-[10px]"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
