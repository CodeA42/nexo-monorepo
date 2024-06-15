import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { TransactionBigIntAsStringType, transactionBigIntAsStringSchema } from '@nexo-monorepo/ethereum-shared';
import { IdDto } from '@nexo-monorepo/api';
import { ObjectId } from 'mongodb';
import { isEmptyObject } from '@nexo-monorepo/shared';
import { TransactionBigIntAsStringDto } from '@nexo-monorepo/ethereum-api';
import { TransactionFilterEntity } from './entities/transation-filter.entity';
import { TransactionFilterRepository } from './transaction-filter.repository';
import { TransactionEntity } from './entities/transaction.entity';
import _ from 'lodash';

@Injectable()
export class TransactionFilterService {
  private readonly logger = new Logger(TransactionFilterService.name);

  constructor(private readonly transactionFilterRepository: TransactionFilterRepository) {}

  async newFilter(newFilter: TransactionBigIntAsStringDto): Promise<TransactionFilterEntity> {
    if (isEmptyObject(newFilter)) {
      //This is just for the demo, since the validation is not fully implemented
      //we just make sure that the objects that are being sent are not empty,
      //when the validation is complete an empty object will not pass the validation
      //courtesy of "No time till deadline, its Friday and we drink in 1 hour Inc."
      throw new BadRequestException('Filter is empty');
    }

    return await this.transactionFilterRepository.save(newFilter);
  }

  async deleteFilter(id: IdDto['id']): Promise<void> {
    await this.transactionFilterRepository.findOne({ where: { id: new ObjectId(id) } });
  }

  async getFilters(): Promise<TransactionBigIntAsStringType[]> {
    const filterEntities = await this.transactionFilterRepository.find();

    const filters = filterEntities.map((filter) => {
      const result = transactionBigIntAsStringSchema.safeParse(filter);
      if (result.success) return result.data;
      this.logger.error(`DB inconsistency at: (${filter.id}) table (${TransactionEntity.name})`);
      return undefined;
    });

    return filters.filter((filter) => !!filter) as TransactionBigIntAsStringType[];
  }

  async save(transaction: TransactionFilterEntity | TransactionFilterEntity[]) {
    return this.transactionFilterRepository.save(_.castArray(transaction));
  }
}
