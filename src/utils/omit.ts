/**
 * Omit given set of keys from object.
 * @param initialObject
 * @param keysToOmit
 */
export default (initialObject: object, keysToOmit: string[]) => {
  const objEntries = Object.entries(initialObject);

  return objEntries.reduce((accu, [key, value]) => {
    if (keysToOmit.includes(key)) {
      return accu;
    }

    return {
      ...accu,
      [key]: value,
    };
  }, {});
};
