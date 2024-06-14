import { idSchema } from '@nexo-monorepo/shared';
import { createZodDto } from 'nestjs-zod';

export class IdDto extends createZodDto(idSchema) {}
