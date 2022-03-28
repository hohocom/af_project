/* eslint-disable array-callback-return */
import {
  useDeal,
  useFund,
  useModal,
  usePager,
  useSearch,
  useUser,
  useUserFund,
} from "core/hooks";

import { withPrivate } from "components/common";
import { useRecoilValue } from "recoil";
import { userListInitState } from "core/state";
import { useSort } from "core/hooks/sortData";
import AdminUserPageView from "./AdminUserPageView";

function AdminUserPage() {
  const { sort, setSortForm } = useSort();
  const userListInit = useRecoilValue(userListInitState);
  const { destroy } = useUser();
  const { getUserJoinUserFundJoinFundList } = useUserFund();
  const { fundList } = useFund();
  const { matchedFundId, setMatchedFundId } = useDeal();

  const { open } = useModal();

  const { search, setSearch, searchEvent, setSearchList, getSearchList } =
    useSearch({
      list: getUserJoinUserFundJoinFundList({ joinForm: "leftOuterJoin" }),
    });
  const { currentPage, setCurrentPage, getPagerList, getTotalPageLength } =
    usePager({
      pageLimit: 10,
    });

  const props = {
    sort,
    setSortForm,
    userListInit,
    destroy,
    fundList,
    matchedFundId,
    setMatchedFundId,
    open,
    search,
    setSearch,
    searchEvent,
    setSearchList,
    getSearchList,
    currentPage,
    setCurrentPage,
    getPagerList,
    getTotalPageLength,
    getUserJoinUserFundJoinFundList,
  };

  return <AdminUserPageView {...props} />;
}

export default withPrivate(AdminUserPage);
