import img02 from "assets/images/user-detail/02.svg";
import { LoadingType2, withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { useForm, useLoading } from "core/hooks";
import { userDetailState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "utils/firebase";

function UserEditPwPage() {
  const navigate = useNavigate();
  const user = useRecoilValue(userDetailState);
  const { form, changeInput, isCompleted } = useForm({
    password: "",
    newPassword: "",
  });
  const { loading, setLoading } = useLoading();

  const changePassword = async () => {
    setLoading(true);
    await auth
      .signInWithEmailAndPassword(user.id, form.password)
      .then(async () => {
        await auth.currentUser
          .updatePassword(form.newPassword)
          .then(async () => {
            setLoading(false);
            await auth.signOut();
            window.alert("비밀번호가 변경되었습니다. 다시 로그인해주세요.");
          })
          .catch((error) => {
            setLoading(false);
            window.alert(error);
            throw new Error(error);
          });
      })
      .catch((error) => {
        setLoading(false);
        window.alert("비밀번호가 일치하지 않습니다.");
        throw new Error(error);
      });
  };

  return (
    <LoadingType2 isLoading={loading}>
      <MobileLayout hideHeader={true}>
        <div className="bg-[#EEEEEE] w-full h-full flex flex-col items-center font-gong-light p-4">
          <div className="flex items-center justify-start w-full">
            <button
              onClick={() => {
                navigate("/users/me");
              }}
            >
              <img src={img02} alt="img_02" className="w-[20px]" />
            </button>
            <p className="ml-2">비밀번호 변경</p>
          </div>

          <form
            className="flex flex-col justify-start w-full p-2 mt-6 mb-4 bg-white rounded-md"
            onSubmit={async (e) => {
              e.preventDefault();
              await changePassword();
            }}
          >
            <input
              type="password"
              name="password"
              onChange={changeInput}
              value={form.password}
              className="w-full p-2 border rounded-md"
              placeholder="기존 비밀번호를 입력해주세요."
            />
            <input
              type="password"
              name="newPassword"
              onChange={changeInput}
              value={form.newPassword}
              className="w-full p-2 border rounded-md"
              placeholder="변경할 비밀번호를 입력해주세요."
            />
            <button
              className="p-2 mt-2 text-white bg-blue-500 rounded-md"
              disabled={!isCompleted}
            >
              {isCompleted ? "생성" : "내용을 모두 입력해주세요."}
            </button>
          </form>
        </div>
      </MobileLayout>
    </LoadingType2>
  );
}

export default withPrivate(UserEditPwPage);
