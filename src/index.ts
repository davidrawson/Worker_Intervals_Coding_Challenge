import { start } from "repl";
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

  const inputFile: string[] = await readInputFile(inputFilePath);
  const workers: Worker[] = processInputFile(inputFile);

  const allIntervals: Interval[] = getAllIntervals(workers);
  // this should really be of type Interval[]
  const overlapIntervals: any = checkForOverlaps(allIntervals);

  console.log("overlapIntervals ", overlapIntervals);

  // here, I am trying to...remove the fragments.
  overlapIntervals.forEach((interval: Interval, index: number) => {
    const start = interval.start;
    const end = interval.end;
    const intervalIndex = index;

    overlapIntervals.forEach((interval: Interval, index: number) => {
      if (
        interval.start >= start &&
        interval.end <= end &&
        intervalIndex != index
      ) {
        overlapIntervals.splice(index, 1);
      }
    });
  });

  // *** This isn't working because checkForOverlaps is an
  // exclusive check - it only uses the bit where there is overlap.
  // I need inclusive - if there is overlap go from earliest to latest.

  // const remainingOverlaps = checkForOverlaps(overlapIntervals);
  // console.log("RemainingOverlaps ", remainingOverlaps);

  // if (remainingOverlaps.length > 0) {
  //   overlapIntervals.push(conjoinIntervals(remainingOverlaps));
  // }

  console.log("overlapIntervals2 ", overlapIntervals);

  const isoIntervals: Interval[] = [];
  overlapIntervals.forEach((interval: Interval) => {
    const isoStart = new Date(interval.start).toISOString();
    const isoEnd = new Date(interval.end).toISOString();
    const isoInterval: any = isoStart + "/" + isoEnd;
    isoIntervals.push(isoInterval);
  });

  console.log("isoIntervals", isoIntervals);

  const uniqueIntervals: any[] = [...Array.from(new Set(isoIntervals))];

  console.log("uniqueIntervals", uniqueIntervals);

  // return overlapIntervals;
  return uniqueIntervals;
}

const getAllIntervals = (workers: Worker[]) => {
  const intervals: Interval[] = [];
  workers.forEach((worker) => {
    worker.intervals.forEach((interval) => {
      intervals.push(interval);
    });
  });

  const conjoinedIntervals = conjoinIntervals(intervals);
  // conjoin consequecutive intervals
  // intervals.forEach((interval: Interval, index: number) => {
  //   const start = interval.start;
  //   const end = interval.end;
  //   const intervalIndex = index;

  //   intervals.forEach((interval: Interval, index: number) => {
  //     if (interval.start === end) {
  //       const newInterval: any = { start: start, end: interval.end };

  //       // intervals.splice(index, 1);
  //       // intervals.splice(intervalIndex, 1);
  //       intervals.push(newInterval);
  //     }

  //     if (start === interval.end) {
  //       const newInterval: any = { start: interval.start, end: end };

  //       // intervals.splice(index, 1);
  //       // intervals.splice(intervalIndex, 1);
  //       intervals.push(newInterval);
  //     }
  //   });
  // });
  console.log("conjoinedIntervals  ", conjoinedIntervals);

  return conjoinedIntervals;
};

const checkForOverlaps = (allIntervals: any[]) => {
  const overlapIntervals: any = [];

  allIntervals.forEach((interval: Interval, index: number) => {
    const start = interval.start;
    const end = interval.end;
    const intervalIndex = index;

    console.log("Interval ", interval);

    allIntervals.forEach((interval: Interval, index: number) => {
      const comparatorStart = interval.start;
      const comparatorEnd = interval.end;

      if (
        start < comparatorStart &&
        end > comparatorStart &&
        intervalIndex != index
      ) {
        // we have an overlap from comparatorStart to
        // the earliest of the ends
        let overlapInterval = {};

        if (end <= comparatorEnd) {
          // comparatorStart to end
          overlapInterval = { start: comparatorStart, end: end };
        } else {
          // comparatorStart to comparatorEnd
          overlapInterval = { start: comparatorStart, end: comparatorEnd };
        }
        // console.log("overlapInterval ", overlapInterval);

        overlapIntervals.push(overlapInterval);
      }

      if (
        start > comparatorStart &&
        start < comparatorEnd &&
        intervalIndex != index
      ) {
        // we have an overlap from start to the earliest of the ends
        let overlapInterval = {};

        if (end <= comparatorEnd) {
          // start to end
          overlapInterval = { start: start, end: end };
        } else {
          // start to comparatorEnd
          overlapInterval = { start: start, end: comparatorEnd };
        }
        console.log("overlapInterval ", overlapInterval);

        overlapIntervals.push(overlapInterval);
      }
    });
  });

  return overlapIntervals;
};

const conjoinIntervals = (intervals: any) => {
  intervals.forEach((interval: Interval, index: number) => {
    const start = interval.start;
    const end = interval.end;
    const intervalIndex = index;

    intervals.forEach((interval: Interval, index: number) => {
      if (interval.start === end) {
        const newInterval: any = { start: start, end: interval.end };

        // intervals.splice(index, 1);
        // intervals.splice(intervalIndex, 1);
        intervals.push(newInterval);
      }

      if (start === interval.end) {
        const newInterval: any = { start: interval.start, end: end };

        // intervals.splice(index, 1);
        // intervals.splice(intervalIndex, 1);
        intervals.push(newInterval);
      }
    });
  });
  return intervals;
};
