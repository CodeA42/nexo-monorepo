import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionFilterEntity } from './entities/transation-filter.entity';

@Injectable()
export class TransactionFilterRepository extends Repository<TransactionFilterEntity> {
  constructor(
    @InjectRepository(TransactionFilterEntity) private readonly repository: Repository<TransactionFilterEntity>,
  ) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
