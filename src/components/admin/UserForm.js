/* eslint-disable react-hooks/exhaustive-deps */
import { useFund, useModal, useUser, useUserFund } from "core/hooks";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import FundListSelector from "./FundListSelector";

function UserForm({ user }) {
  const { close } = useModal();
  const { store, edit } = useUser();
  const { fundList } = useFund();
  const { fundStore } = useUserFund();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [checkFundList, setCheckFundList] = useState([]);
  const { userFundList } = useUserFund();

  useEffect(() => {
    const list = [];

    if (userFundList.length && user) {
      userFundList.forEach((userFund) => {
        console.debug(userFund);
      });
    }

    fundList.forEach((fund) => {
      list.push({
        ...fund,
        checked: true,
        joinPrice: null,
      });
    });
    setCheckFundList(list);
  }, [fundList]);

  const userFundStore = async (email) => {
    const filterList = checkFundList.filter(
      (fund) => fund.checked === true && fund.joinPrice > 0
    );

    filterList.forEach(async (fund) => {
      await fundStore({
        form: {
          userId: email,
          fundId: fund.id,
          joinDate: new Date(),
          joinPrice: fund.joinPrice,
        },
      });
    });
  };

  const onSubmit = async (data) => {
    !user
      ? await store({ form: data })
      : await edit({ form: data, user: user });
    userFundStore(data.email);
    close();
  };

  return (
    <form
      className="min-w-[350px] max-h-[800px] overflow-hidden overflow-y-scroll p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-xl font-noto-regular">
        회원 {user ? "수정" : "생성"}
      </h2>
      <div className="flex flex-col mt-2">
        <label>
          관리자코드
          <span className="ml-1 text-xs text-red-500">
            {errors.name && errors.name.message}
          </span>
        </label>
        <input
          {...register("code", {
            required: "관리자은 필수 입력값입니다.",
            pattern: {
              // value: /{2,4}/,
              message: "한글 이름 2~4자 이내만 허용합니다.",
            },
          })}
          defaultValue={user ? user.code : null}
          placeholder="관리자 코드 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>
          email(회원 ID)
          <span className="ml-1 text-xs text-red-500">
            {errors.email && errors.email.message}
          </span>
        </label>
        <input
          {...register("email", {
            required: "이메일은 필수 입력값입니다.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "이메일형식이 아닙니다.",
            },
          })}
          defaultValue={user ? user.email : null}
          placeholder="이메일 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          회원명
          <span className="ml-1 text-xs text-red-500">
            {errors.name && errors.name.message}
          </span>
        </label>
        <input
          {...register("name", {
            required: "이름은 필수 입력값입니다.",
            pattern: {
              value: /^[가-힣]{2,4}$/,
              message: "한글 이름 2~4자 이내만 허용합니다.",
            },
          })}
          defaultValue={user ? user.name : null}
          placeholder="회원 이름 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          생년월일
          <span className="ml-1 text-xs text-red-500">
            {errors.birthday && errors.birthday.message}
          </span>
        </label>
        <input
          {...register("birthday", {
            required: "생년월일은 필수 입력값입니다.",
            pattern: {
              value:
                /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
              message: "8자리의 형태로 특수문자 없이 입력해주세요.",
            },
          })}
          defaultValue={user ? user.birthday : null}
          placeholder="생년월일(8자리) 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          주소
          <span className="ml-1 text-xs text-red-500">
            {errors.address && errors.address.message}
          </span>
        </label>
        <input
          {...register("address", {
            required: "주소는 필수 입력값입니다.",
          })}
          defaultValue={user ? user.address : null}
          placeholder="주소 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          휴대전화번호
          <span className="ml-1 text-xs text-red-500">
            {errors.phone && errors.phone.message}
          </span>
        </label>
        <input
          {...register("phone", {
            required: "휴대폰번호는 필수 입력값입니다.",
            pattern: {
              value: /^01([0|1|6|7|8|9])-([0-9]{3,4})-([0-9]{4})$/,
              message: "xxx-xxxx-xxxx 형태로 입력해주세요.",
            },
          })}
          defaultValue={user ? user.phone : null}
          placeholder="휴대폰번호를 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          거래은행
          <span className="ml-1 text-xs text-red-500">
            {errors.bankName && errors.bankName.message}
          </span>
        </label>
        <input
          {...register("bankName", {
            required: "거래은행은 필수 입력값입니다.",
          })}
          defaultValue={user ? user.bankName : null}
          placeholder="거래은행 이름 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          계좌번호
          <span className="ml-1 text-xs text-red-500">
            {errors.bankNumber && errors.bankNumber.message}
          </span>
        </label>
        <input
          {...register("bankNumber", {
            required: "계좌번호는 필수 입력값입니다.",
          })}
          defaultValue={user ? user.bankNumber : null}
          placeholder="계좌번호 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>

      <div className="flex flex-col mt-2">
        <label>
          가입일자
          <span className="ml-1 text-xs text-red-500">
            {errors.birthday && errors.birthday.message}
          </span>
        </label>
        <input
          {...register("createDate", {
            required: "가입일자는 필수 입력값입니다.",
            pattern: {
              value:
                /^(19[0-9][0-9]|20\d{2})(0[0-9]|1[0-2])(0[1-9]|[1-2][0-9]|3[0-1])$/,
              message: "8자리의 형태로 특수문자 없이 입력해주세요.",
            },
          })}
          defaultValue={user ? user.createDate : null}
          placeholder="가입일자(8자리) 입력"
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        />
      </div>
      <div className="flex flex-col mt-2">
        <label>
          펀드가입
          <FundListSelector
            checkFundList={checkFundList}
            setCheckFundList={setCheckFundList}
            form="insert"
          />
        </label>
      </div>
      <button className="w-full px-4 py-2 mt-4 text-base font-semibold text-center text-white transition duration-200 ease-in bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2">
        {!user ? "생성" : "수정"}
      </button>
    </form>
  );
}

export default UserForm;
