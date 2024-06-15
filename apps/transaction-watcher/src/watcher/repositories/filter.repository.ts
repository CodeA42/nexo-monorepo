import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterEntity } from '../entities/filter.entity';

@Injectable()
export class FilterRepository extends Repository<FilterEntity> {
  constructor(@InjectRepository(FilterEntity) private readonly repository: Repository<FilterEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
