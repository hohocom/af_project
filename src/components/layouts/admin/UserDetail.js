import { useRef } from "react";
import { useState } from "react/cjs/react.development";
import { db } from "utils/firebase";

function UserDetail({ changeStep, userDetail }) {
  const formRef = useRef();
  const [readOnly, setReadOnly] = useState(true);
  const [editForm, setEditForm] = useState({
    name: userDetail.name,
    birthday: userDetail.birthday,
    address: userDetail.address,
    phone: userDetail.phone,
  });

  const inputsDisabled = ({ result = true }) => {
    const inputs = formRef.current.querySelectorAll("input");
    for (let i of inputs) {
      if (i.name !== "email") i.disabled = result;
    }
  };
  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "password") setEditForm({ ...editForm, password: value });
    else if (name === "name") setEditForm({ ...editForm, name: value });
    else if (name === "birthday") setEditForm({ ...editForm, birthday: value });
    else if (name === "address") setEditForm({ ...editForm, address: value });
    else if (name === "phone") setEditForm({ ...editForm, phone: value });
  };
  const editUser = async () => {
    await db.collection("users").doc(userDetail.id).set({
      email: userDetail.email,
      name: editForm.name,
      birthday: editForm.birthday,
      address: editForm.address,
      phone: editForm.phone,
    });
    inputsDisabled({ result: true });
    setReadOnly(true);
  };

  return (
    <>
      <form ref={formRef}>
        <div className="w-full flex justify-between items-center">
          <h2 className="text-xl font-noto-regular">회원 상세정보</h2>
          {readOnly && (
            <button
              type="button"
              className="text-sm py-2 px-4 rounded-md bg-yellow-400 text-white"
              onClick={() => {
                changeStep({ step: 1 });
                setReadOnly(false);
                inputsDisabled({ result: false });
              }}
            >
              수정
            </button>
          )}
        </div>
        <div className="flex flex-col mt-2">
          <label>ID(email)</label>
          <input
            name="email"
            value={userDetail.email}
            className="p-2 border rounded-md"
            disabled
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>회원명</label>
          <input
            name="name"
            value={editForm.name}
            className="p-2 border rounded-md"
            onChange={changeInput}
            disabled
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>생년월일</label>
          <input
            name="birthday"
            value={editForm.birthday}
            className="p-2 border rounded-md"
            onChange={changeInput}
            disabled
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>주소</label>
          <input
            name="address"
            value={editForm.address}
            className="p-2 border rounded-md"
            onChange={changeInput}
            disabled
          />
        </div>
        <div className="flex flex-col mt-2">
          <label>휴대전화번호</label>
          <input
            name="phone"
            value={editForm.phone}
            className="p-2 border rounded-md"
            onChange={changeInput}
            disabled
          />
        </div>
        {!readOnly && (
          <>
            <div className="w-full flex justify-between items-center mt-4">
              <button
                type="button"
                className="p-2 px-4 bg-gray-200 rounded-md"
                onClick={() => {
                  setReadOnly(true);
                  setEditForm({
                    email: userDetail.email,
                    name: userDetail.name,
                    birthday: userDetail.birthday,
                    address: userDetail.address,
                    phone: userDetail.phone,
                  });
                  inputsDisabled({ result: true });
                }}
              >
                취소
              </button>
              <button
                type="button"
                className="p-2 px-4 bg-yellow-400 rounded-md text-white"
                onClick={editUser}
              >
                완료
              </button>
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="text-xs bg-red-500 text-white px-4 py-1 rounded-md"
              >
                삭제
              </button>
            </div>
          </>
        )}
      </form>

      {readOnly && (
        <div className="flex flex-col mt-4">
          <div className="flex justify-between items-start">
            <h2 className="font-noto-regular">가입한 펀드목록</h2>
            <button
              onClick={() => changeStep({ step: 2 })}
              className="bg-blue-500 text-white px-2 py-1 rounded-md mb-2 text-sm"
            >
              펀드 추가
            </button>
          </div>

          <table className="table-type-a">
            <thead>
              <tr>
                <th>펀드명</th>
                <th>가입날짜</th>
                <th>가입금액</th>
                <th>지분율</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>AF공모주1호</td>
                <td>2021.12.31</td>
                <td>100,000,000</td>
                <td>2.5%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}

export default UserDetail;
