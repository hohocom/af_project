import { useState } from "react";

function useSearch() {
  const [search, setSearch] = useState("");
  const [searchList, setSearchList] = useState([]); //필터에 맞는 종목

  // 검색 버튼 클릭 이벤트
  const searchEvent = ({ list, callback }) => {
    let result = [];
    if (search === "") {
      setSearchList([]);
    } else {
      let isFinded = false;
      for (let i = 0; i < list.length; i++) {
        // eventName 바꿔야함 각 객체명에 맞게
        if (list[i].eventName.includes(search)) {
          isFinded = true;
          result.push(list[i]);
        }
      }
      if (!isFinded) window.alert("검색결과가 존재하지 않습니다!");

      setSearchList(result);
    }
    callback();
  };

  // 기본배열 또는 검색 배열 반환
  const getListOrSearchList = ({ list }) => {
    return searchList.length > 0 ? searchList : list;
  };

  return {
    search,
    setSearch,
    searchList,
    searchEvent,
    setSearchList,
    getListOrSearchList,
  };
}

export default useSearch;
