import { Buffer } from "buffer";
// import { promises as fs } from "fs";

interface Interval {
  start: string;
  end: string;
}

interface Worker {
  id: number;
  intervals: Interval[];
}

export async function solveFirstQuestion(
  inputFilePath: string
): Promise<string> {
  // TODO: Solve me!
  const inputFile: any = await readInputFile(inputFilePath);
  processInputFile(inputFile);

  return inputFile;
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
  // console.log("Data here", data);

  // const buf = Buffer.from(data);

  // buf.subarray
  // return buf.toString();
  return data.toString().split("\n");
};

const processInputFile = (inputFile: Array<string>) => {
  for (let worker of inputFile) {
    const workerId = worker.slice(0, worker.indexOf("@"));
    console.log("workerId ", workerId);
  }
};
