export function isEmptyObject(obj: any) {
  return !obj || Object.keys(obj).length <= 0;
}

export function isUndef(value: any) {
  return value === null || typeof value === 'undefined';
}

export function isBlank(value: any) {
  return isUndef(value) || value === '' || value.toString().trim() === '';
}
