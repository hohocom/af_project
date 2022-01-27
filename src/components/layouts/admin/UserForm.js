import { useForm, useModal } from "core/hooks";
import { db, auth } from "utils/firebase";

function UserForm({ user }) {
  const { close } = useModal();
  const { form, changeInput, resetForm, isCompleted } = useForm(
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
    const userCredential = await auth
      .createUserWithEmailAndPassword(form.email, form.password)
      .then(async (user) => {
        console.debug(user);
      });
    db.collection("users").doc(userCredential.user.uid).set({
      email: form.email,
      name: form.name,
      birthday: form.birthday,
      address: form.address,
      phone: form.phone,
    });
    resetForm();
    close();
  };

  const updateUser = async () => {
    await db.collection("users").doc(user.id).set(form);
    close();
  };

  const deleteUser = async () => {
    const result = window.prompt("데이터를 삭제하려면 '삭제'를 입력해주세요.");
    if (result !== "삭제") return;
    await db.collection("users").doc(user.id).delete();
    close();
  };

  return (
    <form className="min-w-[350px]">
      <h2 className="text-xl font-noto-regular">
        회원 {user ? "수정" : "생성"}
      </h2>
      <div className="flex flex-col mt-2">
        <label>email(회원 ID)</label>
        <input
          value={form.email}
          name="email"
          placeholder="이메일을 입력해주세요"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>회원명</label>
        <input
          value={form.name}
          name="name"
          placeholder="회원 성명 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>생년월일</label>
        <input
          value={form.birthday}
          name="birthday"
          placeholder="생년월일 입력 ex) 950621"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>주소</label>
        <input
          value={form.address}
          name="address"
          placeholder="주소 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>휴대전화번호</label>
        <input
          value={form.phone}
          name="phone"
          placeholder="전화번호 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          onChange={changeInput}
        />
      </div>
      {!user ? (
        <button
          type="button"
          className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={createUser}
          disabled={!isCompleted}
        >
          {isCompleted ? "생성" : "모든 항목을 입력해주세요.."}
        </button>
      ) : (
        <>
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-yellow-400 rounded-lg shadow-md hover:bg-yellow-500 focus:ring-yellow-300 focus:ring-offset-yellow-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={updateUser}
            disabled={!isCompleted}
          >
            {isCompleted ? "수정" : "모든 항목을 입력해주세요.."}
          </button>
          <button
            type="button"
            className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-red-400 rounded-lg shadow-md hover:bg-red-500 focus:ring-red-300 focus:ring-offset-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
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
