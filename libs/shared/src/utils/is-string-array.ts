export function isStringArray(data: unknown[]): data is string[] {
  return data.every((entry) => typeof entry === 'string');
}
