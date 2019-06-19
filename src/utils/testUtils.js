export const emptyFunction = () => {};
export const fakeTranslate = key => key;
export const fakeLoad = () => Promise.resolve();
export const fakeLogger = {
  info() {},
  error() {},
};
