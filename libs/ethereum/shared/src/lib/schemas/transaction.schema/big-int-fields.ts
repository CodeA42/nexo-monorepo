import {
  BigIntFromString,
  bigIntAsString,
  bigIntToString,
} from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';

export const bigIntSchema = z.object({
  blockNumber: z.bigint(),
  value: z.bigint(),
  gas: z.bigint(),
  gasPrice: z.bigint(),
  type: z.bigint(),
  maxFeePerGas: z.bigint(),
  maxPriorityFeePerGas: z.bigint(),
  nonce: z.bigint(),
  chainId: z.bigint(),
  gasLimit: z.bigint(),
  v: z.bigint(),
});

export const bigIntFromStringSchema = z.object({
  blockNumber: BigIntFromString,
  value: BigIntFromString,
  gas: BigIntFromString,
  gasPrice: BigIntFromString,
  type: BigIntFromString,
  maxFeePerGas: BigIntFromString,
  maxPriorityFeePerGas: BigIntFromString,
  nonce: BigIntFromString,
  chainId: BigIntFromString,
  gasLimit: BigIntFromString,
  v: BigIntFromString,
});

export const bigIntAsStringSchema = z.object({
  blockNumber: bigIntAsString,
  value: bigIntAsString,
  gas: bigIntAsString,
  gasPrice: bigIntAsString,
  type: bigIntAsString,
  maxFeePerGas: bigIntAsString,
  maxPriorityFeePerGas: bigIntAsString,
  nonce: bigIntAsString,
  chainId: bigIntAsString,
  gasLimit: bigIntAsString,
  v: bigIntAsString,
});

export const bigIntToStringSchema = z.object({
  blockNumber: bigIntToString,
  value: bigIntToString,
  gas: bigIntToString,
  gasPrice: bigIntToString,
  type: bigIntToString,
  maxFeePerGas: bigIntToString,
  maxPriorityFeePerGas: bigIntToString,
  nonce: bigIntToString,
  chainId: bigIntToString,
  gasLimit: bigIntToString,
  v: bigIntToString,
});
