import { z } from 'nestjs-zod/z';
import { baseSchema } from './base';

export const accessListSchema = baseSchema.partial();

export type AccessList = z.infer<typeof accessListSchema>;

export const accessListBigIntFromStringSchema = accessListSchema; // This one is the same but to not get confused it will sit like this

export type AccessListBigIntFromString = z.infer<typeof accessListSchema>;

export const accessListBigIntAsStringSchema = accessListSchema; // Same as last one

export type AccessListBigIntAsStringType = z.infer<
  typeof accessListBigIntAsStringSchema
>;

export const accessListBigIntToStringSchema = accessListSchema; // Same

export type AccessListBigIntToStringType = z.infer<
  typeof accessListBigIntAsStringSchema
>;
