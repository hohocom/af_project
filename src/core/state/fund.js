import { atom } from "recoil";

export const fundListState = atom({
  key: "fundListState",
  default: [],
});

export const fundListInitState = atom({
  key: "fundListInitState",
  default: false,
});
