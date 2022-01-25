import { atom } from "recoil";

const modalState = atom({
  key: "modalState",
  default: {
    isOpen: false,
    view: <div>모달창 내용</div>,
  },
});

export default modalState;
