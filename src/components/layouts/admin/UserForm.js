import { useForm } from "core/hooks";
import { db, auth } from "utils/firebase";

function UserForm({ user, changeStep }) {
  const { form, changeInput, resetForm } = useForm(
    user
      ? user
      : {
          email: "",
          password: "",
          name: "",
          birthday: "",
          address: "",
          phone: "",
        }
  );

  const createUser = async () => {
    const userCredential = await auth.createUserWithEmailAndPassword(
      form.email,
      form.password
    );
    db.collection("users").doc(userCredential.user.uid).set({
      email: form.email,
      name: form.name,
      birthday: form.birthday,
      address: form.address,
      phone: form.phone,
    });
    resetForm();
    changeStep({ step: 0 });
  };

  const updateUser = async () => {
    await db.collection("users").doc(user.id).set(form);
    changeStep({ step: 0 });
  };

  const deleteUser = async () => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("users").doc(user.id).delete();
    changeStep({ step: 0 });
  };

  return (
    <form>
      <h2 className="text-xl font-noto-regular">
        회원 {user ? "수정" : "생성"}
      </h2>
      <div className="flex flex-col mt-2">
        <label>email(회원 ID)</label>
        <input
          value={form.email}
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
          value={form.password}
          name="password"
          placeholder="비밀번호 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>회원명</label>
        <input
          value={form.name}
          name="name"
          placeholder="회원 성명 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>생년월일</label>
        <input
          value={form.birthday}
          name="birthday"
          placeholder="생년월일 입력 ex) 950621"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>주소</label>
        <input
          value={form.address}
          name="address"
          placeholder="주소 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>휴대전화번호</label>
        <input
          value={form.phone}
          name="phone"
          placeholder="전화번호 입력"
          className="p-2 border rounded-md"
          onChange={changeInput}
        />
      </div>
      {!user ? (
        <button
          type="button"
          className="px-4 py-2 bg-blue-500 rounded-md text-white mt-2 w-full"
          onClick={createUser}
        >
          생성
        </button>
      ) : (
        <>
          <button
            type="button"
            className="px-4 py-2 bg-yellow-500 rounded-md text-white mt-2 w-full"
            onClick={updateUser}
          >
            수정
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-500 rounded-md text-white mt-2 w-full"
            onClick={deleteUser}
          >
            삭제
          </button>
        </>
      )}
    </form>
  );
}

export default UserForm;
