import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawalFilterEntity } from './entities/withdrawal-filter.entity';

@Injectable()
export class WithdrawalFilterRepository extends Repository<WithdrawalFilterEntity> {
  constructor(
    @InjectRepository(WithdrawalFilterEntity) private readonly repository: Repository<WithdrawalFilterEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
