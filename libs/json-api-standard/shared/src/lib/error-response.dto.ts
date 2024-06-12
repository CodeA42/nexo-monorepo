import { errorResponseItemSchema } from './error-response-item.dto';
import { z } from 'nestjs-zod/z';

export const errorResponseSchema = z.object({
  errors: z
    .array(errorResponseItemSchema)
    .describe(
      'Error objects provide additional information about problems encountered while performing an operation',
    ),
  meta: z
    .record(z.any())
    .describe('Meta object that contains non-standard meta-information.'),
});

export type ErrorResponse = z.infer<typeof errorResponseSchema>;
