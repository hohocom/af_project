/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedIgnoreList, setIsCompletedIgnoreList] = useState([]);

  useEffect(() => {
    checkFormData();
  }, [isCompletedIgnoreList]);

  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.debug(name, value);
    if (!name) throw new Error("name 없음!");

    for (let f in form) {
      // console.debug(f);
      if (name === f) {
        setForm({ ...form, [f]: value });
      }
    }
  };

  const resetForm = () => {
    const newObj = {};
    for (let f in form) {
      newObj[f] = "";
    }
    // console.debug(newObj);
    setForm(newObj);
  };

  const checkFormData = () => {
    let result = true;
    // console.debug("폼데이터 감시중..");
    for (let f in form) {
      if (checkIgnore({ key: f })) {
        console.debug(f);
        console.debug("유효성 이그노어");
      } else if (
        form[f] === null ||
        form[f] === "" ||
        form[f] === " " ||
        form[f] === undefined ||
        form[f] === "undefinded" ||
        form[f] === 0
      ) {
        console.debug(`${f} : ${form[f]}`);
        console.debug("유효성 검사 불합격!!");
        result = false;
      }
    }
    console.debug(form);
    setIsCompleted(result);
  };

  const checkIgnore = ({ key }) => {
    let result = false;
    isCompletedIgnoreList.forEach((k) => {
      if (k === key) result = true;
    });
    return result;
  };

  useEffect(() => {
    checkFormData();
  }, [form]);

  return {
    form,
    setForm,
    changeInput,
    resetForm,
    isCompleted,
    setIsCompletedIgnoreList,
  };
}

export default useForm;
