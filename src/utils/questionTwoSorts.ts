import { Worker, Interval } from "../index";

export const sortWorkerLatestIntervals = (workers: Worker[]) => {
  for (let worker of workers) {
    worker.intervals.sort((a, b) => {
      let dateA = a.end;
      let dateB = b.end;

      if (dateA > dateB) {
        return -1;
      }
      if (dateA < dateB) {
        return 1;
      }

      return 0;
    });
  }

  return workers;
};

export const sortForLatestInterval = (workers: Worker[]) => {
  workers.sort((a, b) => {
    let dateA = a.intervals[a.intervals.length - 1].end;
    let dateB = b.intervals[b.intervals.length - 1].end;

    if (dateA > dateB) {
      return -1;
    }
    if (dateA < dateB) {
      return 1;
    }

    return 0;
  });

  return workers;
};
