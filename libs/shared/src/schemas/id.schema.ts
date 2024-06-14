import { z } from 'nestjs-zod/z';

export const idSchema = z.object({
  id: z.string(),
});
