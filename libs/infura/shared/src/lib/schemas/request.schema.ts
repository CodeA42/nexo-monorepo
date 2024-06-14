import { z } from 'nestjs-zod/z';
import { infuraTraceCallSchema } from './trace-call.schema';
import { infuraTraceFilterSchema } from './trace-filter.schema';
import { infuraEthNewFilterSchema } from './eth/new-filter.schema';
import { infuraEthGetFilterChangesSchema } from './eth/get-filter-changes.schema';
import { infuraWssSubscibeSchema } from './wss-subscribe.schema';

export const infuraRequestSchema = z.union([
  infuraTraceCallSchema,
  infuraTraceFilterSchema,
  infuraEthNewFilterSchema,
  infuraEthGetFilterChangesSchema,
  infuraWssSubscibeSchema,
]);

export type InfuraRequestType = z.infer<typeof infuraRequestSchema>;
