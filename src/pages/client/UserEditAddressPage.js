import img02 from "assets/images/user-detail/02.svg";
import { LoadingType2, withPrivate } from "components/common";
import { MobileLayout } from "components";
import { useLoading } from "core/hooks";
import { userDetailState } from "core/state";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { db } from "utils/firebase";

function UserEditAddress() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState(userDetailState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loading, setLoading } = useLoading();

  const changeAddress = async (form) => {
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
            onSubmit={handleSubmit(changeAddress)}
          >
            <div className="flex flex-col mt-2">
              <label>
                주소
                <span className="ml-1 text-xs text-red-500">
                  {errors.address && errors.address.message}
                </span>
              </label>
              <input
                {...register("address", {
                  required: "주소는 필수 입력값입니다.",
                })}
                placeholder="변경할 주소를 입력하세요."
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

export default withPrivate(UserEditAddress);
