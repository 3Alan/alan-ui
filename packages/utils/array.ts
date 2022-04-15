/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateRange = (start: number, end: number) => {
  return Array.from(Array(end - start + 1)).map((_, index) => start + index);
};

export const uniqueArray = (arr: any[]) => {
  return arr.filter((item: any, index) => {
    return arr.indexOf(item) === index;
  });
};

export const isEmptyArray = (arr: unknown) => {
  return Array.isArray(arr) && arr.length === 0;
};
