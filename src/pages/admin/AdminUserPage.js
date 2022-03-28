/* eslint-disable array-callback-return */
import { AdminLayout, UserDetail } from "components/admin";
import {
  useDeal,
  useFund,
  useModal,
  usePager,
  useSearch,
  useUser,
  useUserFund,
} from "core/hooks";

import { UserForm } from "components/admin";
import { Pager, Search, Table, withPrivate } from "components/common";
import { useRecoilValue } from "recoil";
import { userListInitState } from "core/state";
import { currency } from "utils/currency";
import { useSort } from "core/hooks/sortData";

function AdminUserPage() {
  const { sort, setSortForm } = useSort();
  const userListInit = useRecoilValue(userListInitState);
  const { destroy } = useUser();
  const { getUserJoinUserFundJoinFundList } = useUserFund();
  const { fundList } = useFund();
  const { matchedFundId, setMatchedFundId } = useDeal();

  const { open } = useModal();

  const { search, setSearch, searchEvent, setSearchList, getSearchList } =
    useSearch({
      list: getUserJoinUserFundJoinFundList({ joinForm: "leftOuterJoin" }),
    });
  const { currentPage, setCurrentPage, getPagerList, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  return (
    <AdminLayout title="회원관리">
      <div className="p-4">
        <div className="flex items-center justify-between mt-4 mb-4">
          <div>
            <button
              onClick={() => open({ setView: <UserForm /> })}
              className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              회원 생성
            </button>
            <select
              className="p-2 ml-4 mr-6 bg-white border rounded-md"
              onChange={(e) => {
                setMatchedFundId(
                  e.target.value === "전체" ? null : e.target.value
                );
              }}
            >
              <option key={null} value={null} className="p-2">
                전체
              </option>
              {fundList.map((fund) => {
                return (
                  <option key={fund.id} value={fund.id} className="p-2">
                    {fund.fundName}
                  </option>
                );
              })}
            </select>
            <button
              onClick={() => {
                setSortForm("userName");
              }}
              className="px-4 py-2 mr-1 text-xs font-semibold text-center transition duration-200 ease-in rounded-lg shadow-md hover:text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              이름순
            </button>
            <button
              onClick={() => {
                setSortForm("userId");
              }}
              className="px-4 py-2 mr-1 text-xs font-semibold text-center transition duration-200 ease-in rounded-lg shadow-md hover:text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              email(id)순
            </button>
            <button
              onClick={() => {
                setSortForm("userId");
              }}
              className="px-4 py-2 text-xs font-semibold text-center transition duration-200 ease-in rounded-lg shadow-md hover:text-white hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              가입일자 순
            </button>
          </div>

          <div className="text-end">
            <Search
              text="회원 이름을 입력하세요."
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: getUserJoinUserFundJoinFundList({
                    joinForm: "leftOuterJoin",
                  }),
                  key: "userName",
                  callback: () => {
                    setCurrentPage(1);
                  },
                });
              }}
            />
          </div>
        </div>

        <Table
          titles={[
            "관리자코드",
            "이름",
            "email(id)",
            "생년월일",
            "주소",
            "전화번호",
            "거래은행",
            "계좌번호",
            "펀드이름",
            "펀드 가입 금액 ",
            "펀드 가입 날짜",
            "수정",
            "삭제",
          ]}
          itemInit={userListInit}
          itemLength={
            getUserJoinUserFundJoinFundList({ joinForm: "leftOuterJoin" })
              .length
          }
          colSpan={10}
        >
          {getPagerList({
            list: sort(getSearchList()),
          }).map((user, index) => {
            if (
              user.role !== "ADMIN" &&
              (matchedFundId == null ? true : user.fundId === matchedFundId)
            )
              return (
                <tr
                  key={index}
                  className="text-gray-700 border-b hover:bg-gray-100"
                >
                  <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {123123}
                  </td>
                  <td
                    className="p-4 font-normal border-r cursor-pointer hover:bg-gray-200 dark:border-dark-5 whitespace-nowrap"
                    onClick={() =>
                      open({
                        setView: <UserDetail user={user} />,
                      })
                    }
                  >
                    {user.userName}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.userId}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.birthday}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.address}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.phone}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.bankName}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.bankNumber}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.fundName}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user.joinPrice ? currency(user.joinPrice) + "원" : ""}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    {user?.joinDate}
                  </td>
                  <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                    <button
                      onClick={() =>
                        open({ setView: <UserForm user={user} /> })
                      }
                    >
                      <i className="text-gray-500 hover:text-red-400 fas fa-edit"></i>
                    </button>
                  </td>
                  <td className="p-4 font-normal dark:border-dark-5 whitespace-nowrap">
                    <button onClick={() => destroy({ user })}>
                      <i className="text-gray-500 hover:text-red-400 fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
          })}
        </Table>

        <Pager
          totalPageLength={getTotalPageLength({
            list: getUserJoinUserFundJoinFundList({
              joinForm: "leftOuterJoin",
            }),
          })}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminUserPage);
