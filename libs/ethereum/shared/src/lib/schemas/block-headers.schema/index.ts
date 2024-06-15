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

export const blockHeadersSchema = baseSchema
  .merge(bigIntSchema)
  .merge(relationsSchema)
  .partial();

export type BlockHeadersType = z.infer<typeof blockHeadersSchema>;

export const blockHeadersBigIntFromStringSchema = baseSchema
  .merge(bigIntFromStringSchema)
  .merge(relationsBigIntFromStringSchema)
  .partial();

export type BlockHeadersBigIntFromStringType = z.infer<
  typeof blockHeadersBigIntFromStringSchema
>;

export const blockHeadersBigIntAsStringSchema = baseSchema
  .merge(bigIntAsStringSchema)
  .merge(relationsBigIntAsStringSchema)
  .partial();

export type BlockHeadersBigIntAsStringType = z.infer<
  typeof blockHeadersBigIntAsStringSchema
>;

export const blockHeadersBigIntToStringSchema = baseSchema
  .merge(bigIntToStringSchema)
  .merge(relationsBigIntToStringSchema)
  .partial();

export type BlockHeadersBigIntToStringType = z.infer<
  typeof blockHeadersBigIntToStringSchema
>;
