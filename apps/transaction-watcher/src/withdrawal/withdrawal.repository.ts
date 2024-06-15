import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WithdrawalEntity } from './entities/withdrawal.entity';

@Injectable()
export class WithdrawalRepository extends Repository<WithdrawalEntity> {
  constructor(@InjectRepository(WithdrawalEntity) private readonly repository: Repository<WithdrawalEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
