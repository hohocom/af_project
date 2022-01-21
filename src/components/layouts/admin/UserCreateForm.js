import { useState } from "react";
import { db, auth } from "utils/firebase";

function UserCreateForm({ changeStep }) {
  const [createForm, setCreateForm] = useState({
    email: "",
    password: "",
    name: "",
    birthday: "",
    address: "",
    phone: "",
  });
  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "email") setCreateForm({ ...createForm, email: value });
    else if (name === "password")
      setCreateForm({ ...createForm, password: value });
    else if (name === "name") setCreateForm({ ...createForm, name: value });
    else if (name === "birthday")
      setCreateForm({ ...createForm, birthday: value });
    else if (name === "address")
      setCreateForm({ ...createForm, address: value });
    else if (name === "phone") setCreateForm({ ...createForm, phone: value });
  };
  const createUser = async () => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      createForm.email,
      createForm.password
    );
    console.debug(userCredential.user.uid);
    db.collection("users").doc(userCredential.user.uid).set({
      email: createForm.email,
      name: createForm.name,
      birthday: createForm.birthday,
      address: createForm.address,
      phone: createForm.phone,
    });
    window.alert("회원 생성이 완료되었습니다.");
    setCreateForm({
      email: "",
      password: "",
      name: "",
      birthday: "",
      address: "",
      phone: "",
    });
  };
  return (
    <>
      <h2 className="text-xl font-noto-regular">회원 생성</h2>
      <div className="flex flex-col mt-2">
        <label>email(회원 ID)</label>
        <input
          value={createForm.email}
          name="email"
          placeholder="이메일을 입력해주세요"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>비밀번호</label>
        <input
          type="password"
          value={createForm.password}
          name="password"
          placeholder="비밀번호 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>회원명</label>
        <input
          value={createForm.name}
          name="name"
          placeholder="회원 성명 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>생년월일</label>
        <input
          value={createForm.birthday}
          name="birthday"
          placeholder="생년월일 입력 ex) 950621"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>주소</label>
        <input
          value={createForm.address}
          name="address"
          placeholder="주소 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>휴대전화번호</label>
        <input
          value={createForm.phone}
          name="phone"
          placeholder="전화번호 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <button
        className="px-4 py-2 bg-blue-500 rounded-md text-white mt-2 w-full"
        onClick={createUser}
      >
        생성
      </button>
    </>
  );
}

export default UserCreateForm;
