import { atom } from "recoil";

const toastState = atom({
  key: "toastState",
  default: {
    open: false,
    type: "SUCCESS",
    message: "",
    second: "",
  },
});

export default toastState;
