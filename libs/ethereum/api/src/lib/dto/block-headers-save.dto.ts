import { blockHeadersBigIntAsStringSchema } from '@nexo-monorepo/ethereum-shared';
import { createZodDto } from 'nestjs-zod';

export class BlockHeadersBigIntAsStringDto extends createZodDto(
  blockHeadersBigIntAsStringSchema,
) {}
