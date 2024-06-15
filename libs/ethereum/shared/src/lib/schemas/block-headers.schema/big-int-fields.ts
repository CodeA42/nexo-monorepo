import {
  BigIntFromString,
  bigIntAsString,
  bigIntToString,
} from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';

export const bigIntSchema = z.object({
  blobGasUsed: z.bigint(),
  excessBlobGas: z.bigint(),
  difficulty: z.bigint(),
  number: z.bigint(),
  gasLimit: z.bigint(),
  gasUsed: z.bigint(),
  timestamp: z.bigint(),
  nonce: z.bigint(),
  totalDifficulty: z.bigint(),
  baseFeePerGas: z.bigint(),
  size: z.bigint(),
});

export const bigIntFromStringSchema = z.object({
  blobGasUsed: BigIntFromString,
  excessBlobGas: BigIntFromString,
  difficulty: BigIntFromString,
  number: BigIntFromString,
  gasLimit: BigIntFromString,
  gasUsed: BigIntFromString,
  timestamp: BigIntFromString,
  nonce: BigIntFromString,
  totalDifficulty: BigIntFromString,
  baseFeePerGas: BigIntFromString,
  size: BigIntFromString,
});

export const bigIntAsStringSchema = z.object({
  blobGasUsed: bigIntAsString,
  excessBlobGas: bigIntAsString,
  difficulty: bigIntAsString,
  number: bigIntAsString,
  gasLimit: bigIntAsString,
  gasUsed: bigIntAsString,
  timestamp: bigIntAsString,
  nonce: bigIntAsString,
  totalDifficulty: bigIntAsString,
  baseFeePerGas: bigIntAsString,
  size: bigIntAsString,
});

export const bigIntToStringSchema = z.object({
  blobGasUsed: bigIntToString,
  excessBlobGas: bigIntToString,
  difficulty: bigIntToString,
  number: bigIntToString,
  gasLimit: bigIntToString,
  gasUsed: bigIntToString,
  timestamp: bigIntToString,
  nonce: bigIntToString,
  totalDifficulty: bigIntToString,
  baseFeePerGas: bigIntToString,
  size: bigIntToString,
});
