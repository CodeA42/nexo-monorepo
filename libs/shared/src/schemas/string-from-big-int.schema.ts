import { z } from 'nestjs-zod/z';

export const StringFromBigInt = z
  .bigint()
  .transform((value) => value.toString());
