import { z } from 'nestjs-zod/z';
import { baseSchema } from './base';
import {
  bigIntAsStringSchema,
  bigIntFromStringSchema,
  bigIntSchema,
  bigIntToStringSchema,
} from './big-int-fields';
import {
  relationsBigIntAsStringSchema,
  relationsBigIntFromStringSchema,
  relationsBigIntToStringSchema,
  relationsSchema,
} from './relations';

export const transactionSchema = baseSchema
  .merge(bigIntSchema)
  .merge(relationsSchema)
  .partial();

export type Transaction = z.infer<typeof transactionSchema>;

export const transactionBigIntFromStringSchema = baseSchema
  .merge(bigIntFromStringSchema)
  .merge(relationsBigIntFromStringSchema)
  .partial();

export type TransactionBigIntFromStringType = z.infer<typeof transactionSchema>;

export const transactionBigIntAsStringSchema = baseSchema
  .merge(bigIntAsStringSchema)
  .merge(relationsBigIntAsStringSchema)
  .partial();

export type TransactionBigIntAsStringType = z.infer<
  typeof transactionBigIntAsStringSchema
>;

export const transactionBigIntToStringSchema = baseSchema
  .merge(bigIntToStringSchema)
  .merge(relationsBigIntToStringSchema)
  .partial();

export type TransactionBigIntToStringType = z.infer<
  typeof transactionBigIntToStringSchema
>;
