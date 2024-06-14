import { hexNSchema, hexSchema } from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';
import { InfuraMethod } from '../enums/http-request-method.enum';
import { infuraJsonRpcVersionSchema } from './json-rpc-version.schema';

const transactionCallObjectSchema = z.object({
  from: hexNSchema(20),
  to: hexNSchema(20),
  gas: hexSchema.optional(),
  gasPrice: hexSchema.optional(),
  maxPriorityFeePerGas: z.string().optional(),
  maxFeePerGas: z.string().optional(),
  value: hexSchema.optional(),
  data: z.string().optional(),
});

const blockParameterSchema = z.union([
  z.literal('latest'),
  z.literal('earliest'),
  z.literal('pending'),
  hexSchema,
]);

const tracingOptionsSchema = z
  .union([z.literal('trace'), z.literal('stateDiff')])
  .array();

export const infuraTraceCallSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  method: z.literal(InfuraMethod.TraceCall),
  params: z.tuple([
    transactionCallObjectSchema,
    tracingOptionsSchema,
    blockParameterSchema,
  ]),
  id: z.number(),
});

export type InfuraTraceCall = z.infer<typeof infuraTraceCallSchema>;
