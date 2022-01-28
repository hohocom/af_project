function Search({ search, setSearch, setSearchList, searchEvent }) {
  return (
    <form
      className="flex flex-col justify-center w-3/4 max-w-sm space-y-3 md:flex-row md:w-full md:space-x-3 md:space-y-0"
      onSubmit={(e) => {
        e.preventDefault();
        searchEvent();
      }}
    >
      <div className="relative">
        <input
          type="text"
          id='"form-subscribe-Filter'
          className="flex-1 w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border border-transparent border-gray-300 rounded-lg shadow-sm appearance-none focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
          placeholder="name"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyUp={(e) => {
            // console.debug(e.key);
            if (e.key === "Backspace" && e.target.value === "") {
              setSearchList([]);
            }
          }}
        />
      </div>
      <button className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-purple-600 rounded-lg shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-purple-200">
        검색
      </button>
    </form>
  );
}

export default Search;
