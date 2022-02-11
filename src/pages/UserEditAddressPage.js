import img02 from "assets/images/user-detail/02.svg";
import { LoadingType2, withPrivate } from "components/common";
import { MobileLayout } from "components/layouts";
import { useForm, useLoading } from "core/hooks";
import { userDetailState } from "core/state";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { db } from "utils/firebase";

function UserEditAddressPage() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userDetailState);
  const { form, changeInput, isCompleted } = useForm({
    address: "",
  });
  const { loading, setLoading } = useLoading();

  const changePassword = async () => {
    setLoading(true);
    await db
      .collection("users")
      .doc(user.id)
      .set({
        ...user,
        address: form.address,
      });
    setUser({
      ...user,
      address: form.address,
    });
    setLoading(false);
    navigate("/users/me");
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
            <p className="ml-2">주소 변경</p>
          </div>

          <form
            className="flex flex-col justify-start w-full p-2 mt-6 mb-4 bg-white rounded-md"
            onSubmit={async (e) => {
              e.preventDefault();
              await changePassword();
            }}
          >
            <input
              name="address"
              onChange={changeInput}
              value={form.address}
              className="w-full p-2 border rounded-md"
              placeholder="변경할 주소를 입력하세요."
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

export default withPrivate(UserEditAddressPage);
