import memoizee from 'memoizee';

export const memoizeFunc = (...args) => memoizee(...args);

export const isRunningInJest = () => {
  return process.env.JEST_WORKER_ID !== undefined;
};
