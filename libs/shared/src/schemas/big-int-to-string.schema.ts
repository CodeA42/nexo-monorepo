import { z } from 'nestjs-zod/z';

export const bigIntToString = z.bigint().transform((value) => value.toString());
