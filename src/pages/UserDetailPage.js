import img02 from "assets/images/user-detail/02.svg";
import { withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { userDetailState } from "core/state";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

function UserDetailPage() {
  const navigate = useNavigate();
  const user = useRecoilValue(userDetailState);
  return (
    <MobileLayout hideHeader={true}>
      <div className="bg-[#EEEEEE] w-full h-full flex flex-col items-center font-gong-light p-4">
        <div className="flex items-center justify-start w-full">
          <button
            onClick={() => {
              navigate("/invest-detail");
            }}
          >
            <img src={img02} alt="img_02" className="w-[20px]" />
          </button>
          <p className="ml-2">개인정보변경</p>
        </div>

        <div className="flex justify-start w-full p-2 mt-6 mb-4 bg-white rounded-md">
          <p className="min-w-[80px]">이름</p>
          <p className="font-apple-sb">{user.name}</p>
        </div>
        <div className="flex justify-start w-full p-2 mb-4 bg-white rounded-md">
          <p className="min-w-[80px]">이메일</p>
          <p className="font-apple-sb">{user.id}</p>
        </div>
        <div className="flex justify-between w-full p-2 mb-4 bg-white rounded-md">
          <div className="flex items-center justify-start">
            <p className="min-w-[80px]">비밀번호</p>
            <p className="font-apple-sb">*********</p>
          </div>
          <Link
            to="/users/me/re-password"
            className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800"
          >
            변경
          </Link>
        </div>
        <div className="flex justify-start w-full p-2 mb-4 bg-white rounded-md">
          <p className="min-w-[80px]">생년월일</p>
          <p className="font-apple-sb">{user.birthday}</p>
        </div>
        <div className="flex justify-between w-full p-2 mb-4 bg-white rounded-md">
          <div className="flex justify-start">
            <p className="min-w-[80px]">주소</p>
            <p className="font-apple-sb">{user.address}</p>
          </div>
          <Link
            to="/users/me/re-address"
            className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800 min-w-[50px] max-h-[30px]"
          >
            변경
          </Link>
        </div>
        <div className="flex justify-between w-full p-2 mb-4 bg-white rounded-md">
          <div className="flex justify-start">
            <p className="min-w-[80px]">휴대전화</p>
            <p className="font-apple-sb">{user.phone}</p>
          </div>
          <Link
            to="/users/me/re-phone"
            className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800 min-w-[50px] max-h-[30px]"
          >
            변경
          </Link>
        </div>
      </div>
    </MobileLayout>
  );
}

export default withPrivate(UserDetailPage);
