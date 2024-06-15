import { z } from 'nestjs-zod/z';

export const baseSchema = z.object({
  address: z.string(),
});
