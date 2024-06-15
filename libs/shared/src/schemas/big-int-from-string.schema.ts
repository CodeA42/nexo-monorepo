import { bigIntAsString } from './big-int-as-string.schema';

export const BigIntFromString = bigIntAsString.transform((value) =>
  BigInt(value),
);
