import {
  BigIntFromString,
  bigIntAsString,
  bigIntToString,
} from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';

export const bigIntSchema = z.object({
  amount: z.bigint(),
  index: z.bigint(),
  validatorIndex: z.bigint(),
});

export const bigIntFromStringSchema = z.object({
  amount: BigIntFromString,
  index: BigIntFromString,
  validatorIndex: BigIntFromString,
});

export const bigIntAsStringSchema = z.object({
  amount: bigIntAsString,
  index: bigIntAsString,
  validatorIndex: bigIntAsString,
});

export const bigIntToStringSchema = z.object({
  amount: bigIntToString,
  index: bigIntToString,
  validatorIndex: bigIntToString,
});
