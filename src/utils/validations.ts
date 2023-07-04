export const required = (val: string): boolean => val.length > 0;
export const minLength = (val: string, length: number): boolean =>
  val.length >= length;