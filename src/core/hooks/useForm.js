/* eslint-disable no-empty-pattern */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCompletedIgnoreList, setIsCompletedIgnoreList] = useState([]);

  // TODO: form 객체가 변경하거나, 유효성 검사 제외 리스트가 바뀔 때마다 formData 검사
  useEffect(() => {
    checkFormData();
  }, [form, isCompletedIgnoreList]);

  // TODO: form을 순회하며 form 객체의 key와 입력값의 name이 같은 곳의 값을 변경
  const changeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    // console.debug(name, value);
    if (!name) throw new Error("name 없음!");
    for (let f in form) {
      if (name === f) {
        setForm({ ...form, [f]: value });
      }
    }
  };

  // TODO: form 객체 값 모두 초기화
  const resetForm = () => {
    const newObj = {};
    for (let f in form) {
      newObj[f] = "";
    }
    // console.debug(newObj);
    setForm(newObj);
  };

  /**
   * TODO: form 객체에 null, "", " ", undefined, 0 값 체크
   * 하나라도 값이 충족되지 않으면 isCompleted 값은 false
   */
  const checkFormData = () => {
    let result = true;
    // console.debug("폼데이터 감시중..");
    for (let f in form) {
      if (checkIgnore({ key: f })) {
      } else if (
        form[f] === null ||
        form[f] === "" ||
        form[f] === " " ||
        form[f] === undefined ||
        form[f] === "undefinded" ||
        form[f] === 0
      ) {
        result = false;
      }
    }
    setIsCompleted(result);
  };

  // TODO: 유효성 검사 제외 항목 체크
  const checkIgnore = ({ key }) => {
    let result = false;
    isCompletedIgnoreList.forEach((k) => {
      if (k === key) result = true;
    });
    return result;
  };

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
