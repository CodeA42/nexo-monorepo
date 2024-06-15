import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { WithdrawalFilterRepository } from './withdrawal-filter.repository';
import { WithdrawalBigIntAsStringType, withdrawalBigIntAsStringSchema } from '@nexo-monorepo/ethereum-shared';
import { IdDto } from '@nexo-monorepo/api';
import { ObjectId } from 'mongodb';
import { WithdrawalEntity } from './entities/withdrawal.entity';
import { isEmptyObject } from '@nexo-monorepo/shared';
import { WithdrawalBigIntAsStringDto } from '@nexo-monorepo/ethereum-api';
import { WithdrawalFilterEntity } from './entities/withdrawal-filter.entity';

@Injectable()
export class WithdrawalFilterService {
  private readonly logger = new Logger(WithdrawalFilterService.name);

  constructor(private readonly withdrawalFilterRepository: WithdrawalFilterRepository) {}

  async newFilter(newFilter: WithdrawalBigIntAsStringDto): Promise<WithdrawalFilterEntity> {
    if (isEmptyObject(newFilter)) {
      //This is just for the demo, since the validation is not fully implemented
      //we just make sure that the objects that are being sent are not empty,
      //when the validation is complete an empty object will not pass the validation
      //courtesy of "No time till deadline, its Friday and we drink in 1 hour Inc."
      throw new BadRequestException('Filter is empty');
    }

    return await this.withdrawalFilterRepository.save(newFilter);
  }

  async deleteFilter(id: IdDto['id']): Promise<void> {
    await this.withdrawalFilterRepository.findOne({ where: { id: new ObjectId(id) } });
  }

  async getFilters(): Promise<WithdrawalBigIntAsStringType[]> {
    const filterEntities = await this.withdrawalFilterRepository.find();

    const filters = filterEntities.map((filter) => {
      const result = withdrawalBigIntAsStringSchema.safeParse(filter);
      if (result.success) return result.data;
      this.logger.error(`DB inconsistency at: (${filter.id}) table (${WithdrawalEntity.name})`);
      return undefined;
    });

    return filters.filter((filter) => !!filter) as WithdrawalBigIntAsStringType[];
  }
}
