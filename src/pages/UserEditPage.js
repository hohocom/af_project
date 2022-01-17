import img01 from "assets/images/user-detail/01.svg";
import img02 from "assets/images/user-detail/02.svg";
import img03 from "assets/images/user-detail/03.svg";
import { useNavigate } from "react-router-dom";

function UserEditPage() {
  const navigate = useNavigate();
  return (
    <div className="bg-[#EEEEEE] w-full h-full flex flex-col items-center font-gong-light p-4">
      <div className="flex justify-start items-center w-full">
        <button
          onClick={() => {
            navigate("/invest-detail");
          }}
        >
          <img src={img02} alt="img_02" className="w-[20px]" />
        </button>
        <p className="ml-2">개인정보견경</p>
      </div>
      <div className="relative mt-6 ">
        <img src={img01} alt="img_01" className="w-28" />
        <img
          src={img03}
          alt="img_03"
          className="absolute right-0 bottom-0 w-8"
        />
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-start mt-6 mb-4">
        <p className="min-w-[80px]">이름</p>
        <p>에이에프</p>
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-start mb-4">
        <p className="min-w-[80px]">아이디</p>
        <p>afia@afassets.com</p>
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-between  mb-4">
        <div className="flex justify-start items-center">
          <p className="min-w-[80px]">비밀번호</p>
          <p>*********</p>
        </div>
        <button className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800">
          변경
        </button>
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-start mb-4">
        <p className="min-w-[80px]">생년월일</p>
        <p>1968.01.10</p>
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-between mb-4">
        <div className="flex justify-start">
          <p className="min-w-[80px]">주소</p>
          <p>광주광역시 서구 상무중앙로 110 (치평동) 우체국보험회관 7층</p>
        </div>
        <button className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800 min-w-[50px] max-h-[30px]">
          변경
        </button>
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-between mb-4">
        <div className="flex justify-start">
          <p className="min-w-[80px]">휴대전화</p>
          <p>010-3884-2540</p>
        </div>
        <button className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800">
          변경
        </button>
      </div>
      <div className="bg-white rounded-md w-full p-2 flex justify-between mb-4">
        <div className="flex justify-start">
          <p className="min-w-[80px]">이메일</p>
          <p>afia@afassets.com</p>
        </div>
        <button className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800">
          변경
        </button>
      </div>

      <button className="bg-[#3000FA] rounded-xl text-white w-2/3 p-2 mt-6 mb-20">
        수정완료
      </button>
    </div>
  );
}

export default UserEditPage;
