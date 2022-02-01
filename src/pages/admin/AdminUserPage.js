import { useEffect, useState } from "react";
import { AdminLayout } from "components/layouts";
import { useModal, usePager, useSearch } from "core/hooks";
import { db } from "utils/firebase";

import { UserDetail, UserForm } from "components/layouts/admin";
import { Pager, Table, withPrivate } from "components/common";

function AdminUserPage() {
  const { open } = useModal();

  const [init, setInit] = useState(false);
  const [users, setUsers] = useState([]);

  const { search, setSearch, searchEvent, setSearchList, getListOrSearchList } =
    useSearch();
  const { pageLimit, currentPage, setCurrentPage, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  useEffect(() => {
    const unsub = db.collection("users").onSnapshot((snapshot) => {
      const newUsers = snapshot.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      });
      setUsers(newUsers);
      setInit(true);
    });

    return () => unsub();
  }, []);

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
            <div className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0">
              <div className="relative">
                <input
                  type="text"
                  id='"form-subscribe-Filter'
                  className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="name"
                />
              </div>
              <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
                검색
              </button>
            </div>
          </div>
        </div>

        <Table
          titles={["이름", "email(id)", "생년월일", "주소", "전화번호"]}
          itemInit={init}
          itemLength={users.length}
          colSpan={6}
        >
          {users.map((user, index) => {
            return (
              <tr
                key={user.id}
                onClick={() =>
                  open({
                    setView: (
                      <UserDetail
                        user={user}
                        openUpdateFormEvent={() =>
                          open({ setView: <UserForm user={user} /> })
                        }
                      />
                    ),
                  })
                }
                className="text-gray-700 border-b cursor-pointer"
              >
                <td className="p-4 font-normal text-center border-r dark:border-dark-5 whitespace-nowrap">
                  {index + 1}
                </td>
                <td className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
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
              </tr>
            );
          })}
        </Table>
        <Pager />
      </div>
    </AdminLayout>
  );
}

export default withPrivate(AdminUserPage);
