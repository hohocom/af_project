import img02 from "assets/images/user-detail/02.svg";
import { LoadingType2, withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { useLoading } from "core/hooks";
import { userDetailState } from "core/state";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { auth } from "utils/firebase";

function UserEditPwPage() {
  const navigate = useNavigate();
  const user = useRecoilValue(userDetailState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, setLoading } = useLoading();

  const changePassword = async (form) => {
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
            onSubmit={handleSubmit(changePassword)}
          >
            <div className="flex flex-col mt-2">
              <label>
                기존 비밀번호
                <span className="ml-1 text-xs text-red-500">
                  {errors.password && errors.password.message}
                </span>
              </label>
              <input
                {...register("password", {
                  required: "현재 비밀번호는 필수 입력값입니다.",
                  minLength: {
                    value: 8,
                    message:
                      "비밀번호는 최소 8자, 최대 20자까지 입력가능합니다.",
                  },
                  maxLength: {
                    value: 16,
                    message:
                      "비밀번호는 최소 8자, 최대 20자까지 입력가능합니다.",
                  },
                })}
                type="password"
                placeholder="현재 비밀번호를 입력하세요."
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col mt-2">
              <label>
                기존 비밀번호
                <span className="ml-1 text-xs text-red-500">
                  {errors.newPassword && errors.newPassword.message}
                </span>
              </label>
              <input
                {...register("newPassword", {
                  required: "변경할 비밀번호는 필수 입력값입니다.",
                  minLength: {
                    value: 8,
                    message:
                      "비밀번호는 최소 8자, 최대 20자까지 입력가능합니다.",
                  },
                  maxLength: {
                    value: 16,
                    message:
                      "비밀번호는 최소 8자, 최대 20자까지 입력가능합니다.",
                  },
                })}
                type="password"
                placeholder="변경할 비밀번호를 입력하세요."
                className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>
            <button className="p-2 mt-2 text-white bg-blue-500 rounded-md">
              변경
            </button>
          </form>
        </div>
      </MobileLayout>
    </LoadingType2>
  );
}

export default withPrivate(UserEditPwPage);
