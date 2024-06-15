import { z } from 'nestjs-zod/z';

export const baseSchema = z.object({
  name: z.string(),
});
