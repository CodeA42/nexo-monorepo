import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from '../json-rpc-version.schema';
import { InfuraMethod } from '../../enums/http-request-method.enum';
import { hexSchema } from '@nexo-monorepo/shared';

export const infuraEthGetFilterChangesSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  method: z.literal(InfuraMethod.EthGetFilterChanges),
  params: z.tuple([hexSchema]),
  id: z.number(),
});

export type InfuraEthGetFilterChanges = z.infer<
  typeof infuraEthGetFilterChangesSchema
>;
