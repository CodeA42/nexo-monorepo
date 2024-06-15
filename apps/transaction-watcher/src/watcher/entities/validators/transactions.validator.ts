import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { TransactionEntity } from '../transaction.entity';
import { isStringArray } from '@nexo-monorepo/shared';

@ValidatorConstraint({ name: 'transaction', async: false })
export class TransactionsValidator implements ValidatorConstraintInterface {
  validate(data: unknown) {
    if (!Array.isArray(data)) return false;
    if (isStringArray(data) || isTransactionArray(data)) return true;
    return false;
  }
}

function isTransactionArray(data: unknown[]): data is TransactionEntity[] {
  return data.every((entry) => entry instanceof TransactionEntity);
}
