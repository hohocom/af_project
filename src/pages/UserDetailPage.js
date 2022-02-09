import img02 from "assets/images/user-detail/02.svg";
import { withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { useForm, useModal } from "core/hooks";
import { userDetailState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { auth } from "utils/firebase";

function UserDetailPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userDetailState);
  const { form, changeInput, isCompleted } = useForm({
    password: "",
    name: "",
  });
  const { open } = useModal();
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
          <button
            className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800"
            onClick={() => {
              open({
                setView: (
                  <form className="flex flex-col w-full pt-2">
                    <input
                      // type="password"
                      name="password"
                      value={form.password}
                      onChange={changeInput}
                      className="p-2 border rounded-md"
                      placeholder="변경할 비밀번호를 입력해주세요."
                    />
                    <button
                      className="w-full p-2 mt-2 text-white bg-blue-600 rounded-md"
                      disabled={!isCompleted}
                      onClick={() => {
                        auth.currentUser
                          .updatePassword(form.password)
                          .then()
                          .catch();
                      }}
                    >
                      {isCompleted ? "변경" : "비밀번호를 입력해주세요"}
                    </button>
                  </form>
                ),
              });
            }}
          >
            변경
          </button>
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
          <button className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800 min-w-[50px] max-h-[30px]">
            변경
          </button>
        </div>
        <div className="flex justify-between w-full p-2 mb-4 bg-white rounded-md">
          <div className="flex justify-start">
            <p className="min-w-[80px]">휴대전화</p>
            <p className="font-apple-sb">{user.phone}</p>
          </div>
          <button className="rounded-3xl border border-purple-800 px-2 text-sm pt-0.5 text-purple-800">
            변경
          </button>
        </div>
      </div>
    </MobileLayout>
  );
}

export default withPrivate(UserDetailPage);
