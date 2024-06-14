import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from '../../json-rpc-version.schema';
import { hexSchema } from '@nexo-monorepo/shared';
import { InfuraMethod } from '../../../enums/http-request-method.enum';

export const infuraEthNewHeadsEventSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  method: z.literal(InfuraMethod.EthSubscribe),
  params: z.object({
    result: z.object({
      difficulty: hexSchema,
      extraData: hexSchema,
      gasLimit: hexSchema,
      gasUsed: hexSchema,
      logsBloom: hexSchema,
      miner: hexSchema,
      nonce: hexSchema,
      number: hexSchema,
      parentHash: hexSchema,
      receiptRoot: hexSchema,
      sha3Uncles: hexSchema,
      stateRoot: hexSchema,
      timestamp: hexSchema,
      transactionsRoot: hexSchema,
    }),
    subscription: hexSchema,
  }),
});

export type InfuraEthNewHeadsEvent = z.infer<
  typeof infuraEthNewHeadsEventSchema
>;
