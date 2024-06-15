export function jsonify(data: unknown) {
  return JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value));
}
