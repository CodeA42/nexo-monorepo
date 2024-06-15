import { binIntAsStringShema } from './big-int-as-string.schema';

export const BigIntFromString = binIntAsStringShema.transform((value) =>
  BigInt(value),
);
