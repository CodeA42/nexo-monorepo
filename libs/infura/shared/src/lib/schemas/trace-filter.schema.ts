import { hexSchema } from '@nexo-monorepo/shared';
import { z } from 'nestjs-zod/z';
import { InfuraMethod } from '../enums/http-request-method.enum';
import { infuraJsonRpcVersionSchema } from './json-rpc-version.schema';

const infuraTraceFilterObjectSchema = z.object({
  fromBlock: hexSchema.optional(),
  toBlock: hexSchema.optional(),
  fromAddress: hexSchema.array().optional(),
  toAddess: hexSchema.array().optional(),
  after: z.number().optional(),
  count: z.number().optional(),
});

export type InfuraTraceFilterObjectType = z.infer<
  typeof infuraTraceFilterObjectSchema
>;

export const infuraTraceFilterSchema = z.object({
  jsonrpc: infuraJsonRpcVersionSchema,
  method: z.literal(InfuraMethod.TraceFilter),
  params: z.tuple([infuraTraceFilterObjectSchema]),
  id: z.number(),
});

export type InfuraTraceFilterType = z.infer<typeof infuraTraceFilterSchema>;
