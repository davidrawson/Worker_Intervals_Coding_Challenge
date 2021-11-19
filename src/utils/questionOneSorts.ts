import { Worker, Interval } from "../index";

export const sortWorkerEarliestIntervals = (workers: Worker[]) => {
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

  return workers;
};

export const sortForEarliestInterval = (workers: Worker[]) => {
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
