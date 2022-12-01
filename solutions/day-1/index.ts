import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("err", err);
    return;
  }
  const elfLoads = data.split("\n\n");
  const largestLoads = elfLoads.reduce(
    (acc, load) => {
      const loadValue = load
        .split("\n")
        .reduce((acc, unit) => acc + parseInt(unit), 0);
      if (loadValue > acc.first) {
        acc.third = acc.second;
        acc.second = acc.first;
        acc.first = loadValue;
        return acc;
      }
      if (loadValue > acc.second) {
        acc.third = acc.second;
        acc.second = loadValue;
        return acc;
      }
      if (loadValue > acc.third) {
        acc.third = loadValue;
        return acc;
      }
      return acc;
    },
    { first: 0, second: 0, third: 0 }
  );
  console.table(largestLoads);
  const total = Object.values(largestLoads).reduce((acc, load) => acc + load);
  console.log("total of largest loads", total);
});
