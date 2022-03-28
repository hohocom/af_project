/* eslint-disable react-hooks/exhaustive-deps */
import { useFund, useModal, useUser, useUserFund } from "core/hooks";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import UserFormView from "./UserFormView";

export default function UserForm({ user }) {
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

  const onSubmit = handleSubmit(async (data) => {
    !user
      ? await store({ form: data })
      : await edit({ form: data, user: user });
    userFundStore(data.email);
    close();
  });

  const props = {
    onSubmit,
    checkFundList,
    setCheckFundList,
    register,
    errors,
    user,
  };
  
  return <UserFormView {...props} />;
}
