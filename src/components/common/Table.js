function Table({
  titles = [],
  itemInit = false,
  itemLength = 0,
  colSpan = 5,
  children,
}) {
  return (
    <table className="table w-full p-4 bg-white rounded-lg shadow">
      <thead>
        <tr className="text-gray-900 border-b">
          <th className="p-4 font-normal border-r dark:border-dark-5 whitespace-nowrap">
            No
          </th>
          {titles.map((th, index) => {
            return (
              <th
                className={`p-4 font-normal ${
                  titles.length - 1 !== index && "border-r"
                } dark:border-dark-5 whitespace-nowrap`}
                key={index}
              >
                {th}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {itemInit ? (
          <>
            {itemLength > 0 ? (
              children
            ) : (
              <tr>
                <td className="p-4" colSpan={colSpan}>
                  생성된 종목이 없습니다.
                </td>
              </tr>
            )}
          </>
        ) : (
          <tr>
            <td className="p-4" colSpan={colSpan}>
              로딩중..
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default Table;
