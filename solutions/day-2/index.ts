import * as fs from "fs";

const rpsMap = {
  A: 1,
  B: 2,
  C: 3,
  X: 0,
  Y: 3,
  Z: 6,
};

type mappingKey = keyof typeof rpsMap;

const isMappingKey = (s: string): s is mappingKey => {
  return !!Object.keys(rpsMap).find((rps) => rps === s);
};

const getRpsMapping = (s: string) => {
  if (isMappingKey(s)) {
    return rpsMap[s];
  }
};

fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.log("err", err);
    return;
  }
  const rounds = data.split("\n");
  const finalScore = rounds.reduce((score, round, i) => {
    const opponent = getRpsMapping(round[0]);
    const result = getRpsMapping(round[2]);

    const validOpponent = typeof opponent === "number";
    const validResult = typeof result === "number";

    if (!validOpponent || !validResult) {
      throw new Error(
        `Input Error for round ${i} - opponent: ${opponent} result: ${result}`
      );
    }

    let me = 0;
    if (result === 6) {
      me = (opponent % 3) + 1;
    }
    if (result === 3) {
      me = opponent;
    }
    if (result === 0) {
      me = ((opponent + 1) % 3) + 1;
    }
    return score + result + me;
  }, 0);
  console.log("final score", finalScore);
});
