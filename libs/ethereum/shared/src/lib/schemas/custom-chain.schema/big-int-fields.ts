import {
  BigIntFromString,
  bigIntAsString,
  bigIntToString,
} from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';

export const bigIntSchema = z.object({
  networkId: z.bigint(),
  chainId: z.bigint(),
});

export const bigIntFromStringSchema = z.object({
  networkId: BigIntFromString,
  chainId: BigIntFromString,
});

export const bigIntAsStringSchema = z.object({
  networkId: bigIntAsString,
  chainId: bigIntAsString,
});

export const bigIntToStringSchema = z.object({
  networkId: bigIntToString,
  chainId: bigIntToString,
});
