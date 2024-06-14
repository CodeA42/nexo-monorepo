import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from '../json-rpc-version.schema';
import { hexSchema } from '@nexo-monorepo/shared';

export const infuraEthNewFilterResponseShema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  id: z.number(),
  result: hexSchema,
});

export type InfuraEthNewFilterResponse = z.infer<
  typeof infuraEthNewFilterResponseShema
>;
