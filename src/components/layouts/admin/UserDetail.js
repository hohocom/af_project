import { useModal } from "core/hooks";

function UserDetail({ changeStep, user }) {
  const { open } = useModal();
  return (
    <>
      <div className="pt-4 min-w-[350px]">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-xl font-noto-regular">회원 상세정보</h2>
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
        <div className="flex items-start justify-between">
          <h2 className="font-noto-regular">가입한 펀드목록</h2>
          <button
            onClick={() =>
              open({
                setView: <div>펀드 추가</div>,
              })
            }
            className="px-2 py-1 mb-2 text-sm text-white bg-blue-500 rounded-md"
          >
            펀드 추가
          </button>
        </div>

        <table>
          <thead>
            <tr className="text-gray-700 border-b">
              <th className="p-2">펀드명</th>
              <th className="p-2">가입날짜</th>
              <th className="p-2">가입금액</th>
              <th className="p-2">지분율</th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-gray-700 border-b">
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
