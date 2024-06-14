import { z } from 'nestjs-zod/z';
import { ZodType } from 'zod';

export function isValidZodSchema<Schema extends ZodType<unknown>>(
  validationTarget: unknown,
  schema: Schema,
): validationTarget is z.infer<Schema> {
  return schema.safeParse(validationTarget).success;
}
