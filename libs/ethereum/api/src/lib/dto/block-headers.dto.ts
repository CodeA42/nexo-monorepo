import { blockHeadersSimplifiedSchema } from '@nexo-monorepo/ethereum-shared';
import { createZodDto } from 'nestjs-zod';

export class BlockHeadersSimplifiedDto extends createZodDto(
  blockHeadersSimplifiedSchema,
) {}
