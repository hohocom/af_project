import { atom } from "recoil";

export const eventListState = atom({
  key: "eventListState",
  default: [],
});

export const eventListInitState = atom({
  key: "eventListInitState",
  default: false,
});
