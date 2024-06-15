import { z } from 'nestjs-zod/z';
import {
  transactionBigIntAsStringSchema,
  transactionBigIntFromStringSchema,
  transactionBigIntToStringSchema,
  transactionSchema,
} from '../transaction.schema';
import {
  withdrawalBigIntAsStringSchema,
  withdrawalBigIntFromStringSchema,
  withdrawalBigIntToStringSchema,
  withdrawalSchema,
} from '../withdrawal.schema';

export const relationsSchema = z.object({
  transactions: z.union([z.string().array(), transactionSchema.array()]),
  withdrawals: withdrawalSchema.array(),
});

export const relationsBigIntFromStringSchema = z.object({
  transactions: z.union([
    z.string().array(),
    transactionBigIntFromStringSchema.array(),
  ]),
  withdrawals: withdrawalBigIntFromStringSchema.array(),
});

export const relationsBigIntAsStringSchema = z.object({
  transactions: z.union([
    z.string().array(),
    transactionBigIntAsStringSchema.array(),
  ]),
  withdrawals: withdrawalBigIntAsStringSchema.array(),
});

export const relationsBigIntToStringSchema = z.object({
  transactions: z.union([
    z.string().array(),
    transactionBigIntToStringSchema.array(),
  ]),
  withdrawals: withdrawalBigIntToStringSchema.array(),
});
