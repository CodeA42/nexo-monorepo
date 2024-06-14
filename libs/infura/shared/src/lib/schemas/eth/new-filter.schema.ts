import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from '../json-rpc-version.schema';
import { InfuraMethod } from '../../enums/http-request-method.enum';
import { hexNSchema, hexSchema } from '@nexo-monorepo/shared';

export const infuraEthNewFilterFilterObjectSchema = z.object({
  address: hexSchema.optional(),
  fromBlock: hexSchema.optional(),
  toBlock: z.union([hexSchema, z.string()]).optional(),
  topics: z
    .union([hexNSchema(32), hexNSchema(32).array(), z.null()])
    .optional(),
});

export type InfuraEthNewFilterObject = z.infer<
  typeof infuraEthNewFilterFilterObjectSchema
>;

export const infuraEthNewFilterSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  method: z.literal(InfuraMethod.EthNewFilter),
  params: z.tuple([infuraEthNewFilterFilterObjectSchema]),
  id: z.number(),
});

export type InfuraEthNewFilter = z.infer<typeof infuraEthNewFilterSchema>;
