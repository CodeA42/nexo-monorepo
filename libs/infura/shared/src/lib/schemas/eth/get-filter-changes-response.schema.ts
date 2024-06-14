import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from '../json-rpc-version.schema';
import { hexNSchema, hexSchema } from '@nexo-monorepo/shared';

export const infuraEthGetFilterChangesObjectSchema = z.object({
  address: hexNSchema(20),
  blockHash: z.union([hexNSchema(32), z.null()]),
  blockNumber: z.union([hexSchema, z.null()]),
  data: hexSchema,
  logIndex: hexSchema,
  removed: z.boolean(),
  topics: hexNSchema(32).array().min(0).max(4),
  transactionHash: z.union([hexNSchema(32), z.null()]),
  transactionIndex: z.union([hexSchema, z.null()]),
});

export const infuraEthGetFilterChangesResponseSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  id: z.number(),
  result: z.tuple([infuraEthGetFilterChangesObjectSchema]),
});

export type InfuraEthGetFilterChangesResponse = z.infer<
  typeof infuraEthGetFilterChangesResponseSchema
>;
