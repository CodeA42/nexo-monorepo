import { transactionBigIntAsStringSchema } from '@nexo-monorepo/ethereum-shared';
import { createZodDto } from 'nestjs-zod';

export class TransactionBigIntAsStringDto extends createZodDto(
  transactionBigIntAsStringSchema,
) {}
