import { parseISO, format, formatISO } from "date-fns";
import { Worker, Interval } from "../index";

export const readInputFile = async (inputFilePath: string) => {
  const fs = require("fs");

  const data = await fs.readFileSync(
    inputFilePath,
    "utf8",
    (err: any, data: any) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );

  return data.toString().split("\n");
};

export const processInputFile = (inputFile: Array<string>) => {
  const workers: Worker[] = [];
  for (let inputLine of inputFile) {
    // isolate workerId
    const workerId: string = inputLine.slice(0, inputLine.indexOf("@"));

    // trim intervals and break up into array
    const workerIntervals = inputLine.slice(inputLine.indexOf("@") + 1);
    const frontTrim = workerIntervals.replace("[", "");
    const trimmedIntervals = frontTrim.replace("]", "");
    const periods = trimmedIntervals.split(",");

    const parsedPeriods: Interval[] = [];
    for (let period of periods) {
      // sort into start and end periods
      const start: Date = parseISO(period.split("/")[0]);
      const end: Date = parseISO(period.split("/")[1]);

      parsedPeriods.push({ start: start, end: end });
    }

    const worker: Worker = { id: workerId, intervals: parsedPeriods };
    workers.push(worker);
  }

  return workers;
};
