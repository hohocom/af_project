import { AdminLayout, UserDetail } from "components/layouts/admin";
import { useModal, usePager, useSearch, useUser } from "core/hooks";

import { UserForm } from "components/layouts/admin";
import { Pager, Search, Table, withPrivate } from "components/common";
import { useRecoilValue } from "recoil";
import { userListInitState } from "core/state";

function AdminUserPage() {
  const userListInit = useRecoilValue(userListInitState);
  const { userList, destroy } = useUser();
  const { open } = useModal();

  const { search, setSearch, searchEvent, setSearchList, getSearchList } =
    useSearch({ list: userList });
  const { currentPage, setCurrentPage, getPagerList, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  return (
    <AdminLayout title="회원관리">
      <div className="p-4">
        <div className="flex items-center justify-between mt-4 mb-4">
          <button
            onClick={() => open({ setView: <UserForm /> })}
            className="w-32 px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            회원 생성
          </button>
          <div className="text-end">
            <Search
              text="회원 이름을 입력하세요."
              search={search}
              setSearch={setSearch}
              setSearchList={setSearchList}
              searchEvent={() => {
                searchEvent({
                  list: userList,
                  key: "name",
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
            "이름",
            "email(id)",
            "생년월일",
            "주소",
            "전화번호",
            "수정",
            "삭제",
          ]}
          itemInit={userListInit}
          itemLength={userList.length}
          colSpan={6}
        >
          {getPagerList({ list: getSearchList() }).map((user, index) => {
            return (
              <tr
                key={user.id}
                className="text-gray-700 border-b hover:bg-gray-100"
              >
                <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
                  {index + 1}
                </td>
                <td
                  className="p-4 font-normal border-r cursor-pointer hover:bg-gray-200 dark:border-dark-5 whitespace-nowrap"
                  onClick={() =>
                    open({
                      setView: <UserDetail user={user} />,
                    })
                  }
                >
                  {user.name}
                </td>
                <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
                  {user.email}
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
                  <button
                    onClick={() => open({ setView: <UserForm user={user} /> })}
                  >
                    <i className="text-gray-500 hover:text-red-400 fas fa-edit"></i>
                  </button>
                </td>
                <td className="p-4 font-normal dark:border-dark-5 whitespace-nowrap">
                  <button onClick={() => destroy({ userId: user.id })}>
                    <i className="text-gray-500 hover:text-red-400 fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </Table>

        <Pager
          totalPageLength={getTotalPageLength({ list: userList })}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminUserPage);
