/* eslint-disable react-hooks/exhaustive-deps */
import { useFund, useModal, useUser, useUserFund } from "core/hooks";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import UserFormView from "./UserFormView";
import { dateObjectParser } from "utils/dateObjectParser";

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

    // const currentUfList = userFundList.filter(
    //   (uf) => uf.userId === user?.userId
    // );

    // if (currentUfList.length) {
    //   fundList.forEach((fund) => {
    //     let result = false;
    //     currentUfList.forEach((uf) => {
    //       if (uf.fundId === fund.id) {
    //         list.push({
    //           ...fund,
    //           checked: true,
    //           joinPrice: uf.joinPrice,
    //         });
    //         result = true;
    //       }
    //     });
    //     if (!result) {
    //       list.push(fund);
    //     }
    //   });
    // } else {
    //   fundList.forEach((fund) => {
    //     list.push({
    //       ...fund,
    //       checked: false,
    //       joinPrice: null,
    //     });
    //   });
    // }

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
            joinDate: dateObjectParser(new Date()),
            joinPrice: fund.joinPrice,
          },
        });
      });
      close();
    }),
  };

  return <UserFormView {...props} />;
}
