import { z } from 'nestjs-zod/z';

export const transformToBooleanSchema = z
  .union([z.boolean(), z.literal('true'), z.literal('false')])
  .transform((value) => value === true || value === 'true');
