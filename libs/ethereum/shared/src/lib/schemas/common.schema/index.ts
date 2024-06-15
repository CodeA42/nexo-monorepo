import { z } from 'nestjs-zod/z';
import { baseSchema } from './base';
import {
  relationsBigIntAsStringSchema,
  relationsBigIntFromStringSchema,
  relationsBigIntToStringSchema,
  relationsSchema,
} from './relations';

export const commonSchema = baseSchema.merge(relationsSchema).partial();

export type CommonType = z.infer<typeof commonSchema>;

export const commonBigIntFromStringSchema = baseSchema
  .merge(relationsBigIntFromStringSchema)
  .partial();

export type CommonBigIntFromStringType = z.infer<
  typeof commonBigIntFromStringSchema
>;

export const commonBigIntAsStringSchema = baseSchema
  .merge(relationsBigIntAsStringSchema)
  .partial();

export type CommonBigIntAsStringType = z.infer<
  typeof commonBigIntAsStringSchema
>;

export const commonBigIntToStringSchema = baseSchema
  .merge(relationsBigIntToStringSchema)
  .partial();

export type CommonBigIntToStringType = z.infer<
  typeof commonBigIntToStringSchema
>;
