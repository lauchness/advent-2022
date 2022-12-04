import * as fs from "fs";

const findCommonItem = (c1: string, c2: string, c3?: string) => {
  const c1Arr = c1.split("");
  const c2Map: Record<string, true> = c2
    .split("")
    .reduce((acc, char) => ({ ...acc, [char]: true }), {});
  const c3Map: Record<string, true> | null = c3
    ? c3.split("").reduce((acc, char) => ({ ...acc, [char]: true }), {})
    : null;

  let commonItem = "";
  while (!commonItem) {
    let indexOfItem = c1Arr.findIndex((char) => c2Map[char]);
    if (c3Map) {
      indexOfItem = c1Arr.findIndex((char) => c2Map[char] && c3Map[char]);
    }

    if (indexOfItem > -1) {
      commonItem = c1Arr[indexOfItem];
      break;
    }
  }
  if (!commonItem) {
    throw new Error("No common item");
  }

  return commonItem;
};

const priorityFromChar = (s: string) => {
  if (s.length !== 1) {
    throw new Error("Invalid char for priority");
  }
  return s.toLowerCase() === s
    ? s.charCodeAt(0) - 96
    : s.charCodeAt(0) - 64 + 26;
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("err", err);
    return;
  }

  const rucksacks = data.split("\n");
  const group: string[] = [];
  const sumOfPriorities = rucksacks.reduce(
    (acc, rucksack, i) => {
      const groupMemberIndex = i % 3;
      group[groupMemberIndex] = rucksack;
      const compartmentSize = rucksack.length / 2;
      const compartment1 = rucksack.slice(0, compartmentSize);
      const compartment2 = rucksack.slice(compartmentSize, rucksack.length);

      const commonItem = findCommonItem(compartment1, compartment2);
      const rucksackCommonItemPriority = priorityFromChar(commonItem);
      let badgePriority = 0;
      if (i % 3 === 2) {
        const badge = findCommonItem(group[0], group[1], group[2]);
        badgePriority = priorityFromChar(badge);
      }

      return {
        totalSum: acc.totalSum + rucksackCommonItemPriority,
        badgeSum: acc.badgeSum + badgePriority,
      };
    },
    { totalSum: 0, badgeSum: 0 }
  );
  console.log("priority sums", sumOfPriorities);
});
