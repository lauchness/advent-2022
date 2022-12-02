import * as fs from "fs";

const rpsMap = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
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
    const me = getRpsMapping(round[2]);

    const validOpponent = typeof opponent === "number";
    const validMe = typeof me === "number";

    if (!validOpponent || !validMe) {
      throw new Error(
        `Input Error for round ${i} - opponent: ${opponent} me: ${me}`
      );
    }

    const result = me - opponent;

    if (result === -2 || result === 1) {
      return score + 6 + me;
    }

    if (result === 0) {
      return score + 3 + me;
    }

    return score + me;
  }, 0);
  console.log("final score", finalScore);
});
