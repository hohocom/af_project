/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useState } from "react/cjs/react.development";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

  const [isCompleted, setIsCompleted] = useState(false);

  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.debug(value);
    // console.debug(name);
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
      if (
        form[f] === null ||
        form[f] === "" ||
        form[f] === " " ||
        form[f] === undefined ||
        form[f] === "undefinded"
      ) {
        // console.debug(`${f} : ${form[f]}`);
        result = false;
      }
    }
    // console.debug(result);
    setIsCompleted(result);
  };

  useEffect(() => {
    checkFormData();
  }, [form]);

  return {
    form,
    changeInput,
    resetForm,
    isCompleted,
  };
}

export default useForm;
