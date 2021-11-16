export const byProperty = function (prop) {
    return function (a, b) {
      if (typeof a[prop] == "number") {
        return a[prop] - b[prop];
      } else {
        return a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0;
      }
    };
  };