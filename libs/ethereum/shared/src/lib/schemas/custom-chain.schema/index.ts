import { z } from 'nestjs-zod/z';
import { baseSchema } from './base';
import {
  bigIntSchema,
  bigIntFromStringSchema,
  bigIntAsStringSchema,
  bigIntToStringSchema,
} from './big-int-fields';

export const customChainSchema = baseSchema.merge(bigIntSchema).partial();

export type CustomChain = z.infer<typeof customChainSchema>;

export const customChainBigIntFromStringSchema = baseSchema
  .merge(bigIntFromStringSchema)
  .partial();

export type CustomChainBigIntFromStringType = z.infer<
  typeof customChainBigIntFromStringSchema
>;

export const customChainBigIntAsStringSchema = baseSchema
  .merge(bigIntAsStringSchema)
  .partial();

export type CustomChainBigIntAsStringType = z.infer<
  typeof customChainBigIntAsStringSchema
>;

export const customChainBigIntToStringSchema = baseSchema
  .merge(bigIntToStringSchema)
  .partial();

export type CustomChainBigIntToStringType = z.infer<
  typeof customChainBigIntToStringSchema
>;
