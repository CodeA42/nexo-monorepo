import { z } from 'nestjs-zod/z';

export const errorResponseItemSchema = z.object({
  code: z.string().optional().describe('Unique error identifier'),
  title: z
    .string()
    .optional()
    .describe(
      'Short, human-readable summary of the problem that SHOULD NOT change from occurrence to occurrence of the problem, except for purposes of localization.',
    ),
  detail: z.string().optional().describe('Human-readable explanation'),
  status: z.number().optional().describe('HTTP status code'),
  meta: z.record(z.any()).optional().describe('Meta object'),
});

export type ErrorResponseItem = z.infer<typeof errorResponseItemSchema>;
