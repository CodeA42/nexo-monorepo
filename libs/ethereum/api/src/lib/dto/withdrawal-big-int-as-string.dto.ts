import { withdrawalBigIntAsStringSchema } from '@nexo-monorepo/ethereum-shared';
import { createZodDto } from 'nestjs-zod';

export class WithdrawalBigIntAsStringDto extends createZodDto(
  withdrawalBigIntAsStringSchema,
) {}
