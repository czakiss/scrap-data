const REGEX_FLOAT = /[+-]?([0-9]*[.])?[0-9]+/g;
export const convertToNumber = (string: string): number | undefined => {
  const value = string.match(REGEX_FLOAT).map((text) => {
    return parseFloat(text);
  });
  if (
    value != null &&
    Array.isArray(value) &&
    value.length >= 1 &&
    !isNaN(value[0])
  ) {
    return value[0];
  }
  return undefined;
};
