import { z } from 'nestjs-zod/z';

export const baseSchema = z.object({
  blockHash: z.string(),
  from: z.string(),
  hash: z.string(),
  transactionIndex: z.string(),
  data: z.string(),
  input: z.string(),
  chain: z.number(),
  to: z.string(),
  networkId: z.number(),
  yParity: z.number(),
  r: z.string(),
  s: z.string(),
});
