export function sort(data, { form = "userName" }) {
  let sortData = data;
  //
  if (form === "userName") {
    sortData.sort(function (a, b) {
      return a.userName < b.userName ? -1 : a.userName > b.userName ? 1 : 0;
    });
  }
  //
  if (form === "userId") {
    sortData.sort(function (a, b) {
      return a.userId < b.userId ? -1 : a.userId > b.userId ? 1 : 0;
    });
  }
  if (form === "date") {
  }

  return sortData;
}
