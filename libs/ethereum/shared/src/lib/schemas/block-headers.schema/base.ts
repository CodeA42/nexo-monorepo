import { z } from 'nestjs-zod/z';

export const baseSchema = z.object({
  parentBeaconBlockRoot: z.string(),
  parentHash: z.string(),
  sha3Uncles: z.string(),
  miner: z.string(),
  stateRoot: z.string(),
  transactionsRoot: z.string(),
  receiptsRoot: z.string(),
  logsBloom: z.string(),
  extraData: z.string(),
  mixHash: z.string(),
  uncles: z.string().array(),
  hash: z.string(),
  withdrawalsRoot: z.string(),
});
