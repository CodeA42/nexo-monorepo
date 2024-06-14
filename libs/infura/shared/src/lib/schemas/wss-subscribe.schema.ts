import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from './json-rpc-version.schema';
import { InfuraMethod } from '../enums/http-request-method.enum';

export const infuraWssSubscibeSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  id: z.number(),
  method: z.literal(InfuraMethod.EthSubscribe),
  params: z.tuple([
    z.union([
      z.literal('newPendingTransactions'),
      z.literal('newHeads'),
      z.literal('logs'),
    ]),
  ]),
});

export type InfuraWssSubscibe = z.infer<typeof infuraWssSubscibeSchema>;
