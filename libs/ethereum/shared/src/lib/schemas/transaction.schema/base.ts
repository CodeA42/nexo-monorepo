import { z } from 'nestjs-zod/z';

export const baseSchema = z.object({
  blockHash: z.string(),
  from: z.string(),
  hash: z.string(),
  data: z.string(),
  input: z.string(),
  chain: z.number(),
  to: z
    .union([z.string(), z.null()])
    .transform((value) => (value === null ? '' : value)),
  networkId: z.number(),
  yParity: z.number(),
  r: z.string(),
  s: z.string(),
});
