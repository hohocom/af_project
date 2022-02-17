import img01 from "assets/images/login/01.svg";
import img02 from "assets/images/login/02.svg";
import img03 from "assets/images/login/03.svg";
import { LoadingType2, withPublic } from "components/common";
import { MobileLayout } from "components/layouts";
import { useForm } from "core/hooks";
import { useState } from "react";
import { auth, db } from "utils/firebase";

function LoginPage() {
  const { form, changeInput, isCompleted } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const login = async () => {
    await auth
      .signInWithEmailAndPassword(form.email, form.password)
      .then((data) => {
        console.debug(data);
        console.debug("로그인 성공");
      })
      .catch(async (e) => {
        // 로그인 실패 -> 관리자 페이지에 등록된 유저 정보가 있는지 확인
        console.debug(e);
        console.debug("로그인 실패");
        const userRef = await db.collection("users").doc(form.email).get();

        // 유저 정보마져 없으면 로그인 실패 알림
        if (userRef.data() === undefined) {
          window.alert("이메일 또는 패스워드가 일치하지 않습니다.");
          setLoading(false);
          throw new Error("로그인 실패");
        }

        console.debug(form.password);
        // 유저 email이 일치하는 문서가 있으면 해당 유저의 생일과 입력한 페스워드가 맞는지 확인
        // 맞으면 회원가입 처리와 동시에 로그인
        console.debug(userRef.data().birthday !== form.password);
        console.debug(userRef.data().isJoined);

        if (!userRef.data().isJoined) {
          if (userRef.data().birthday !== form.password) {
            window.alert("이메일 또는 패스워드가 일치하지 않습니다.");
            setLoading(false);
            throw new Error("로그인 실패");
          } else {
            setLoading(false);
            console.debug(userRef.data());
            auth.createUserWithEmailAndPassword(form.email, form.password);
            db.collection("users")
              .doc(form.email)
              .set({
                ...userRef.data(),
                isJoined: true,
              });
          }
        } else {
          window.alert("이메일 또는 패스워드가 일치하지 않습니다.");
          setLoading(false);
          throw new Error("로그인 실패");
        }
      });
  };

  return (
    <LoadingType2 isLoading={loading}>
      <MobileLayout hideHeader={true} themeColor="white">
        <img src={img01} alt="img_01" className="absolute top-0 left-0 z-0" />
        <div className="absolute top-0 left-0 w-full h-full font-gong-light">
          <div className="pt-16 pl-6 text-3xl">
            <p>에이에프</p>
            <p>투자자문</p>
            <img src={img02} alt="img_02" className="w-[50%]" />
            <img src={img03} alt="img_03" className="w-[45%]" />
          </div>

          <form
            className="flex flex-col items-center w-full mt-16"
            onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              await login();
              setLoading(false);
            }}
          >
            <label className="border border-[#2B24F8] rounded-3xl w-[80%] p-4 flex justify-center items-center">
              <i className="mr-2 fas fa-user"></i>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={changeInput}
                className="text-xs w-[90%] outline-none "
                placeholder="가입된 이메일을 입력해 주세요."
              />
            </label>
            <label className="border border-[#2B24F8] rounded-3xl w-[80%] p-4 flex justify-center items-center mt-[10px]">
              <i className="mr-2 fas fa-lock"></i>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={changeInput}
                className="text-xs w-[90%] outline-none"
                placeholder="비밀번호를 입력해주세요."
              />
            </label>

            <button
              className="bg-[#2B24F8] text-white rounded-3xl w-[80%] p-3 flex justify-center items-center mt-[10px]"
              disabled={!isCompleted}
            >
              {isCompleted
                ? "로그인하기"
                : "이메일과 패스워드를 입력해주세요.."}
            </button>
          </form>
        </div>
      </MobileLayout>
    </LoadingType2>
  );
}

export default withPublic(LoginPage);
