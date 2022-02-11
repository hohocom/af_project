import { useState } from "react";
import { LoadingType2, withPublic } from "components/common";
import { useForm } from "core/hooks";
import { auth } from "utils/firebase";

function AdminLoginPage() {
  const { form, changeInput, isCompleted } = useForm({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const login = async () => {
    await auth.signInWithEmailAndPassword(form.email, form.password);
  };

  return (
    <LoadingType2 isLoading={loading}>
      <div className="flex items-center justify-center w-full h-screen bg-indigo-800">
        <div className="flex flex-col w-[350px] max-w-md px-4 py-8 bg-white rounded-lg shadow dark:bg-gray-800 sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-light text-gray-600 sm:text-2xl dark:text-white">
            Login To Your Account
          </div>
          <div className="mt-8">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                await login();
                setLoading(false);
              }}
            >
              <div className="flex flex-col mb-2">
                <div className="relative flex ">
                  <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="email"
                    id="sign-in-email"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your email"
                    onChange={changeInput}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="relative flex ">
                  <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-white border-t border-b border-l border-gray-300 shadow-sm rounded-l-md">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    name="password"
                    id="sign-in-email"
                    className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-gray-300 rounded-r-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Your password"
                    onChange={changeInput}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  className="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:ring-purple-500 focus:ring-offset-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 "
                  disabled={!isCompleted}
                >
                  {isCompleted ? (
                    "Login"
                  ) : (
                    <span className="text-xs">
                      email, passworld를 입력해주세요.
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </LoadingType2>
  );
}

export default withPublic(AdminLoginPage);
