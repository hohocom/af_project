import { useModal } from "core/hooks";

function UserDetail({ changeStep, user, openUpdateFormEvent }) {
  const { open } = useModal();
  return (
    <>
      <div className="pt-4 min-w-[350px]">
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-noto-regular">회원 상세정보</h2>

          <button
            type="button"
            className="px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={openUpdateFormEvent}
          >
            수정
          </button>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-sm text-gray-700">ID(email)</p>
          <p>{user.email}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-sm text-gray-700">회원명</p>
          <p>{user.name}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-sm text-gray-700">생년월일</p>
          <p>{user.birthday}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-sm text-gray-700">주소</p>
          <p>{user.address}</p>
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-sm text-gray-700">휴대전화번호</p>
          <p>{user.phone}</p>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex justify-between items-start">
          <h2 className="font-noto-regular">가입한 펀드목록</h2>
          <button
            onClick={() =>
              open({
                setView: <div>펀드 추가</div>,
              })
            }
            className="bg-blue-500 text-white px-2 py-1 rounded-md mb-2 text-sm"
          >
            펀드 추가
          </button>
        </div>

        <table>
          <thead>
            <tr className="border-b text-gray-700">
              <th className="p-2">펀드명</th>
              <th className="p-2">가입날짜</th>
              <th className="p-2">가입금액</th>
              <th className="p-2">지분율</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b text-gray-700">
              <td className="p-2">AF공모주1호</td>
              <td className="p-2">2021.12.31</td>
              <td className="p-2">100,000,000</td>
              <td className="p-2">2.5%</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserDetail;
