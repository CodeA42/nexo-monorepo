/**
 * Checks if obj2 is a subset of obj1
 */
export function subsetChecker(obj1: unknown, obj2: unknown) {
  if (obj1 === obj2) {
    return true;
  }

  // Check if both objects are objects and not null.
  if (
    typeof obj1 !== 'object' ||
    typeof obj2 !== 'object' ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }
  // Get the keys of both objects.
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  // Iterate through the keys and compare their values recursively.
  for (const key of keys2) {
    if (!keys1.includes(key) || !subsetChecker(obj1[key], obj2[key])) {
      return false;
    }
  }
  // If all checks pass, the objects are deep equal.
  return true;
}
