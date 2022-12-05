import * as fs from "fs";

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("err", err);
    return;
  }

  const [stacksInput, instructionsInput] = data.split("\n\n");

  const stackRows = stacksInput.split("\n");
  const stacks: Record<string, string[]> = {};
  stackRows.reverse().forEach((row, index) => {
    if (index > 0) {
      for (let i = 0; i < 9; i++) {
        const column = row
          .slice(i * 4, (i + 1) * 4)
          .replace("[", "")
          .replace("]", "")
          .replace(" ", "");
        if (!stacks[i + 1]) {
          stacks[i + 1] = [];
        }
        if (/[A-Z]/.test(column)) {
          stacks[i + 1].push(column);
        }
      }
    }
  });
  const altStacks: Record<string, string[]> = JSON.parse(
    JSON.stringify(stacks)
  );

  instructionsInput.split("\n").map((instruction) => {
    const fromIndex = instruction.search("from");
    const toIndex = instruction.search("to");

    const move = parseInt(instruction.slice(4, fromIndex));
    const from = parseInt(instruction.slice(fromIndex + 4, toIndex));
    const to = parseInt(instruction.slice(toIndex + 2));

    for (let i = 0; i < move; i++) {
      const popped = stacks[from].pop();
      if (popped) {
        stacks[to].push(popped);
      }
    }

    const spliced = altStacks[from].splice(altStacks[from].length - move);
    altStacks[to].push(...spliced);
  });

  const message = Object.values(stacks).reduce((acc, stack) => {
    return acc + stack[stack.length - 1];
  }, "");
  const alt = Object.values(altStacks).reduce((acc, stack) => {
    return acc + stack[stack.length - 1];
  }, "");

  console.log("9000", message);
  console.log("9001", alt);
});
