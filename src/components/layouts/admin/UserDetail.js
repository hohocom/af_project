/* eslint-disable array-callback-return */
import { useFund, useModal, useUserFund } from "core/hooks";
import { UserFundEditForm, UserFundForm } from ".";

function UserDetail({ user }) {
  const { open } = useModal();
  const { fundList } = useFund();
  const { getJoinUserFundList, destroy } = useUserFund();

  return (
    <>
      <div className="pt-4 min-w-[500px]">
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
                setView: <UserFundForm user={user} />,
              })
            }
            className="px-2 py-1 mb-2 text-sm text-white bg-blue-500 rounded-md"
          >
            펀드 추가
          </button>
        </div>

        <table>
          <thead>
            <tr className="text-gray-700 bg-gray-100 border-b">
              <th className="p-2">펀드명</th>
              <th className="p-2">가입날짜</th>
              <th className="p-2">가입금액</th>
              <th className="p-2">지분율</th>
              <th className="p-2">수정</th>
              <th className="p-2">삭제</th>
            </tr>
          </thead>
          <tbody>
            {getJoinUserFundList({ fundList }).length === 0 ? (
              <tr>
                <td colSpan={6}>가입한 펀드가 없습니다.</td>
              </tr>
            ) : (
              getJoinUserFundList({ fundList }).map((userFund) => {
                if (userFund.userId === user.id) {
                  return (
                    <tr className="text-gray-700 border-b" key={userFund.id}>
                      <td className="p-2">{userFund.fundName}</td>
                      <td className="p-2">{userFund.joinDate}</td>
                      <td className="p-2">{userFund.joinPrice}</td>
                      <td className="p-2">
                        {Number(userFund.joinPrice) /
                          Number(userFund.fundTotalCost)}
                      </td>
                      <td className="p-2">
                        <button
                          onClick={() =>
                            open({
                              setView: (
                                <UserFundEditForm
                                  user={user}
                                  userFund={userFund}
                                />
                              ),
                            })
                          }
                        >
                          <i className="text-gray-500 hover:text-red-400 fas fa-edit"></i>
                        </button>
                      </td>
                      <td className="p-2">
                        <button onClick={() => destroy({ id: userFund.id })}>
                          <i className="text-gray-500 hover:text-red-400 fas fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  );
                }
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default UserDetail;
