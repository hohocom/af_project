/* eslint-disable react-hooks/exhaustive-deps */
import { useFund, useModal, useUser, useUserFund } from "core/hooks";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import UserFormView from "./UserFormView";

export default function UserForm({ user }) {
  const { close } = useModal();
  const { store, edit } = useUser();
  const { fundList } = useFund();
  const { fundStore, userFundList } = useUserFund();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [checkFundList, setCheckFundList] = useState([]);

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
        checked: false,
        joinPrice: null,
      });
    });
    setCheckFundList(list);
  }, [fundList]);

  const props = {
    checkFundList,
    setCheckFundList,
    register,
    user,
    errors,
    onSubmit: handleSubmit(async (data) => {
      !user
        ? await store({ form: data })
        : await edit({ form: data, user: user });

      const filterList = checkFundList.filter(
        (fund) => fund.checked === true && fund.joinPrice > 0
      );

      filterList.forEach(async (fund) => {
        await fundStore({
          form: {
            userId: data.email,
            fundId: fund.id,
            joinDate: new Date(),
            joinPrice: fund.joinPrice,
          },
        });
      });
      close();
    }),
  };

  return <UserFormView {...props} />;
}
