// import { Buffer } from "buffer";
// import { promises as fs } from "fs";
import { parseISO, format, formatISO } from "date-fns";

interface Interval {
  start: Date;
  end: Date;
}

interface Worker {
  id: string;
  intervals: Interval[];
}

export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  // TODO: Solve me!
  const inputFile: string[] = await readInputFile(inputFilePath);
  const workers: Worker[] = processInputFile(inputFile);
  // Sort earliest to latest.
  const sortedWorkers = sortForEarliestInterval(workers);
  // Convert first to UTC
  // const earliestUTC = workers[0].intervals[0].start.getUTCDate();
  // Reeturn

  // format(workers[0].intervals[0].start, "SSS");

  // console.log("Final format ", workers[0].intervals[0].start);
  // return formatISO(workers[0].intervals[0].start);
  // return earliestUTC;
  return workers[0].intervals[0].start.toISOString();
}

export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {
  // TODO: Solve me!
  return "";
}

export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  // TODO: Solve me!
  return [];
}

const readInputFile = async (inputFilePath: string) => {
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

const processInputFile = (inputFile: Array<string>) => {
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

const sortForEarliestInterval = (workers: Worker[]) => {
  for (let worker of workers) {
    worker.intervals.sort((a, b) => {
      let dateA = a.start;
      let dateB = b.start;

      if (dateA < dateB) {
        return -1;
      }
      if (dateA > dateB) {
        return 1;
      }

      return 0;
    });
  }
  workers.sort((a, b) => {
    let dateA = a.intervals[0].start;
    let dateB = b.intervals[0].start;

    if (dateA < dateB) {
      return -1;
    }
    if (dateA > dateB) {
      return 1;
    }

    return 0;
  });

  return workers;
};
