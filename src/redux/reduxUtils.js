export const createActionTypes = (actionTypes, duckName) => {
  return Object.keys(actionTypes).reduce(
    (res, key) => ({
      ...res,
      [key]: `${duckName.toUpperCase()}/${actionTypes[key].toUpperCase()}`,
    }),
    {},
  );
};
