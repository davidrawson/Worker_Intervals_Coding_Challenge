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
  return [];
}
