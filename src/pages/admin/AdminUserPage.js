import { useEffect, useState } from "react";
import { AdminLayout } from "components/layouts";
import { useStep } from "core/hooks";
import { db } from "utils/firebase";

import {
  CloseButton,
  UserDetail,
  UserCreateForm,
} from "components/layouts/admin";

function AdminUserPage() {
  const { step, changeStep } = useStep();
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [userDetail, setUserDetail] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsub = db.collection("users").onSnapshot((snapshot) => {
      const newUsers = snapshot.docs.map((user) => {
        return {
          id: user.id,
          ...user.data(),
        };
      });
      setUsers(newUsers);
    });

    return () => unsub();
  }, []);

  return (
    <AdminLayout
      step={step}
      main={
        <div className="p-4 bg-white border">
          <div className="flex justify-start items-center">
            <h2 className="text-3xl mb-2 mr-2 font-noto-regular">회원 목록</h2>
            <button
              onClick={() => {
                changeStep({ step: 1 });
                setUserDetail(null);
                setOpenCreateForm(true);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2"
            >
              회원 생성
            </button>
          </div>
          <table className="w-full bg-white border table-fixed table-type-a">
            <thead>
              <tr>
                <th>No</th>
                <th>이름</th>
                <th>ID(email)</th>
                <th>생년월일</th>
                <th>주소</th>
                <th>전화번호</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr
                    key={user.id}
                    onClick={() => {
                      changeStep({ step: 1 });
                      setOpenCreateForm(false);
                      setUserDetail(user);
                    }}
                    className="cursor-pointer"
                  >
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.birthday}</td>
                    <td>{user.address}</td>
                    <td>{user.phone}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      }
      sub={
        <>
          <div className="min-w-[400px] border-l h-full bg-white p-4">
            <CloseButton changeStep={changeStep} />
            {userDetail && (
              <UserDetail changeStep={changeStep} userDetail={userDetail} />
            )}
            {openCreateForm && <UserCreateForm />}
          </div>
          <div className="min-w-[400px] border-l h-full bg-white p-4">
            <CloseButton changeStep={changeStep} step={1} />
            <h2 className="font-noto-regular text-xl">회원 펀드 추가</h2>
            <div className="flex flex-col mt-2">
              <label>펀드선택</label>
              <select className="border rounded-md p-2">
                <option>펀드1</option>
                <option>펀드2</option>
                <option>펀드3</option>
              </select>
            </div>

            <div className="flex flex-col mt-2">
              <label>펀드명</label>
              <input value="펀드1" className="p-2 border rounded-md" disabled />
            </div>
            <div className="flex flex-col mt-2">
              <label>가입날짜</label>
              <input type="date" className="p-2 rounded-md" />
            </div>
            <div className="flex flex-col mt-2">
              <label>가입금액</label>
              <input value="100,000,000" className="p-2 border rounded-md" />
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => changeStep({ step: 1 })}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mb-2 mr-2"
              >
                수정
              </button>
              <button
                onClick={() => changeStep({ step: 1 })}
                className="bg-red-400 text-white px-4 py-2 rounded-md mb-2"
              >
                삭제
              </button>
            </div>
          </div>
        </>
      }
      subTotal={2}
    />
  );
}

export default AdminUserPage;
