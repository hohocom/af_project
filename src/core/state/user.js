import { atom } from "recoil";

export const userListState = atom({
  key: "userListState",
  default: [],
});

export const userListInitState = atom({
  key: "userListInitState",
  default: false,
});
