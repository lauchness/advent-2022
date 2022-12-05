import * as fs from "fs";

const getRange = (rangeString: string) => {
  const [startString, endString] = rangeString.split("-");
  const start = parseInt(startString);
  const end = parseInt(endString);

  return { start, end };
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("err", err);
    return;
  }

  const sections = data.split("\n");
  const { fullyContainedCount, overlapCount } = sections.reduce(
    (acc, section, i) => {
      const [elf1, elf2] = section.split(",");
      const { start: elf1Start, end: elf1End } = getRange(elf1);
      const { start: elf2Start, end: elf2End } = getRange(elf2);
      const fullyContained =
        (elf1Start <= elf2Start && elf1End >= elf2End) ||
        (elf2Start <= elf1Start && elf2End >= elf1End);
      const overlap = !(elf1Start > elf2End) && !(elf2Start > elf1End);

      return {
        fullyContainedCount: acc.fullyContainedCount + (fullyContained ? 1 : 0),
        overlapCount: acc.overlapCount + (overlap ? 1 : 0),
      };
    },
    { fullyContainedCount: 0, overlapCount: 0 }
  );
  console.log({ fullyContainedCount, overlapCount });
});
