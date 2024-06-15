import { blockHeadersSimplifiedSaveSchema } from '@nexo-monorepo/ethereum-shared';
import { createZodDto } from 'nestjs-zod';

export class BlockHeadersSimplifiedSaveDto extends createZodDto(
  blockHeadersSimplifiedSaveSchema,
) {}
