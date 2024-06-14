import { z } from 'nestjs-zod/z';
import { infuraJsonRpcVersionSchema } from './json-rpc-version.schema';
import { hexSchema } from '@nexo-monorepo/shared';

export const infuraTraceFilterResponseSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  id: z.number(),
  result: z
    .object({
      action: z.object({
        callType: z.string(),
        from: hexSchema,
        gas: hexSchema,
        input: hexSchema,
        to: hexSchema,
        value: hexSchema,
      }),
      blockHash: hexSchema,
      blockNumber: z.number(),
      result: z.object({
        gasUsed: hexSchema,
        output: hexSchema,
      }),
      subtraces: z.number(),
      traceAddress: hexSchema.array(),
      transactionHash: hexSchema,
      transactionPosition: z.number(),
      type: z.string(),
    })
    .array(),
});

export type InfuraTraceFilterResponse = z.infer<
  typeof infuraTraceFilterResponseSchema
>;
