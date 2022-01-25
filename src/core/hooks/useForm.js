import { useState } from "react/cjs/react.development";

function useForm(formObj) {
  const [form, setForm] = useState(formObj);

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
    console.debug(newObj);
    setForm(newObj);
  };

  return {
    form,
    changeInput,
    resetForm,
  };
}

export default useForm;
