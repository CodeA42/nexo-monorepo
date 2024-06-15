import { transformToBooleanSchema } from '@nexo-monorepo/shared';
import * as z from 'zod';

const logLevelSchema = z.enum(['error', 'warn', 'info', 'debug']);
4;

export const environmentSchema = z.enum(['development', 'test']);

const nexoTransactionWatcherConfigurationSchema = z.object({
  NODE_ENV: environmentSchema,
  DD_LOG_LEVEL: logLevelSchema.optional(),
  OMIT_DEBUG_META_IN_RESPONSE: transformToBooleanSchema.optional(),
  NEXO_TRANSACTION_WATCHER_PORT: z.string().optional(),
  DATABASE_MIGRATION_RUN: transformToBooleanSchema.optional(),
  DATABASE_LOGGING: z.array(z.string()).optional(),
  INFURA_REQUEST_NETWORK: z.string().url(),
  INFURA_API_KEY: z.string(),
  INFURA_WSS_NETWORK: z.string(),
  MONGO_URL: z.string(),
});

export type NexoTransactionWatcherConfiguration = z.infer<
  typeof nexoTransactionWatcherConfigurationSchema
>;

/** Solution based on the
 * https://docs.nestjs.com/techniques/configuration#custom-validate-function
 */
export function validate(
  config: Record<string, unknown>,
): NexoTransactionWatcherConfiguration {
  const validatedConfig =
    nexoTransactionWatcherConfigurationSchema.safeParse(config);
  if (validatedConfig.success === false) {
    throw new Error(validatedConfig.error.message);
  }

  return validatedConfig.data;
}
