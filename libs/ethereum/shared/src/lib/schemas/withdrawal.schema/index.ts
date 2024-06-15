import { z } from 'nestjs-zod/z';
import {
  bigIntAsStringSchema,
  bigIntFromStringSchema,
  bigIntSchema,
  bigIntToStringSchema,
} from './big-int-fields';
import { baseSchema } from './base';

export const withdrawalSchema = baseSchema.merge(bigIntSchema).partial();

export type WithdrawalType = z.infer<typeof withdrawalSchema>;

export const withdrawalBigIntFromStringSchema = baseSchema
  .merge(bigIntFromStringSchema)
  .partial();

export type WithdrawalBigIntFromStringType = z.infer<
  typeof withdrawalBigIntFromStringSchema
>;

export const withdrawalBigIntAsStringSchema = baseSchema
  .merge(bigIntAsStringSchema)
  .partial();

export type WithdrawalBigIntAsStringType = z.infer<
  typeof withdrawalBigIntAsStringSchema
>;

export const withdrawalBigIntToStringSchema = baseSchema
  .merge(bigIntToStringSchema)
  .partial();

export type WithdrawalBigIntToStringType = z.infer<
  typeof withdrawalBigIntToStringSchema
>;
