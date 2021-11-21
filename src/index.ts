import { readInputFile, processInputFile } from "./utils/fileUtils";
import {
  sortWorkerEarliestIntervals,
  sortForEarliestInterval,
} from "./utils/questionOneSorts";
import {
  sortWorkerLatestIntervals,
  sortForLatestInterval,
} from "./utils/questionTwoSorts";

export type Interval = {
  start: Date;
  end: Date;
};

export type Worker = {
  id: string;
  intervals: Interval[];
};

export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  const inputFile: string[] = await readInputFile(inputFilePath);
  const workers: Worker[] = processInputFile(inputFile);
  // Sort earliest to latest.
  const sortedWorkerIntervals = sortWorkerEarliestIntervals(workers);
  const sortedWorkers = sortForEarliestInterval(sortedWorkerIntervals);

  return sortedWorkers[0].intervals[0].start.toISOString();
}

export async function solveSecondQuestion(
  inputFilePath: string
): Promise<string> {
  const inputFile: string[] = await readInputFile(inputFilePath);
  const workers: Worker[] = processInputFile(inputFile);
  // Sort latest to earliest
  const sortedWorkerIntervals = sortWorkerLatestIntervals(workers);
  const sortedWorkers = sortForLatestInterval(sortedWorkerIntervals);

  return sortedWorkers[0].intervals[0].end.toISOString();
}

export async function solveThirdQuestion(
  inputFilePath: string
): Promise<string[]> {
  // TODO: Solve me!

  // for each worker take an interval and see if another worker has an interval
  // that overlaps. Work out times of the overlap and push to an array.
  // Once the worker intervals have been checked for overlaps do the same
  // for the array you have been pushing to.
  // This is damn fiendish.

  // Hack: Forget the worker - get all the intervals for all workers in one array
  // and do the comarison with that

  const inputFile: string[] = await readInputFile(inputFilePath);
  const workers: Worker[] = processInputFile(inputFile);

  const allIntervals: Interval[] = getAllIntervals(workers);
  // this should really be of type Interval[]
  const overlapIntervals: any = [];

  allIntervals.forEach((interval) => {
    const start = interval.start;
    const end = interval.end;

    // another forEach to compare these start and end times
    // looking for overlap
    // push the overlap interval to a new array of intervals

    allIntervals.forEach((interval) => {
      const comparatorStart = interval.start;
      const comparatorEnd = interval.end;

      if (start < comparatorStart && end > comparatorStart) {
        // we have an overlap from comparatorStart to
        // the earliest of the ends
        const overlapStart = new Date(comparatorStart).toISOString();
        let overlapEnd = "";
        console.log("overlapStart ", overlapStart);

        if (end <= comparatorEnd) {
          // comparatorStart to end
          overlapEnd = new Date(end).toISOString();
        } else {
          overlapEnd = new Date(comparatorEnd).toISOString();
        }
        console.log("overlapEnd ", overlapEnd);
        const overlapInterval: any = overlapStart + "/" + overlapEnd;
        console.log("overlapInterval ", overlapInterval);

        overlapIntervals.push(overlapInterval);
      }
    });
  });

  return overlapIntervals;
}

const getAllIntervals = (workers: Worker[]) => {
  const intervals: Interval[] = [];
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      intervals.push(interval);
    });
  });

  return intervals;
};
