import img02 from "assets/images/user-detail/02.svg";
import { withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { useForm } from "core/hooks";
import { useNavigate } from "react-router-dom";
import { auth } from "utils/firebase";

function UserEditPwPage() {
  const navigate = useNavigate();
  const { form, changeInput, isCompleted } = useForm({
    password: "",
  });

  const changePassword = () => {
    auth.currentUser
      .updatePassword(form.password)
      .then((result) => {
        console.debug(result);
      })
      .catch((error) => {
        console.debug(error);
      });
  };

  return (
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
          onSubmit={(e) => {
            e.preventDefault();
            changePassword();
          }}
        >
          <input
            type="password"
            name="password"
            onChange={changeInput}
            value={form.password}
            className="w-full p-2 border rounded-md"
            placeholder="변경할 비밀번호를 입력해주세요."
          />
          <button className="p-2 mt-2 text-white bg-blue-500 rounded-md">
            생성
          </button>
        </form>
      </div>
    </MobileLayout>
  );
}

export default withPrivate(UserEditPwPage);
