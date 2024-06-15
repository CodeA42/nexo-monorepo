import { z } from 'nestjs-zod/z';
import {
  accessListBigIntAsStringSchema,
  accessListBigIntFromStringSchema,
  accessListBigIntToStringSchema,
  accessListSchema,
} from '../access-list.schema';
import {
  commonSchema,
  commonBigIntFromStringSchema,
  commonBigIntAsStringSchema,
  commonBigIntToStringSchema,
} from '../common.schema';
import { validHardForkSchema } from '../valid-hard-fork.schema';

const baseRelations = z.object({
  hardfork: validHardForkSchema,
});

export const relationsSchema = baseRelations.merge(
  z.object({
    accessList: accessListSchema.array(),
    common: commonSchema,
  }),
);

export const relationsBigIntFromStringSchema = baseRelations.merge(
  z.object({
    accessList: accessListBigIntFromStringSchema.array(),
    common: commonBigIntFromStringSchema,
  }),
);

export const relationsBigIntAsStringSchema = baseRelations.merge(
  z.object({
    accessList: accessListBigIntAsStringSchema.array(),
    common: commonBigIntAsStringSchema,
  }),
);

export const relationsBigIntToStringSchema = baseRelations.merge(
  z.object({
    accessList: accessListBigIntToStringSchema.array(),
    common: commonBigIntToStringSchema,
  }),
);
