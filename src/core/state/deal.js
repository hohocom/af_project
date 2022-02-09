import { atom } from "recoil";

export const dealListState = atom({
  key: "dealListState",
  default: [],
});

export const dealListInit = atom({
  key: "dealListInit",
  default: [],
});

export const joinDealListState = atom({
  key: "joinDealListState",
  default: [],
});
