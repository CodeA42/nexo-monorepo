import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BlockHeaderEntity } from '../entities/block-header.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BlockHeaderRepository extends Repository<BlockHeaderEntity> {
  constructor(@InjectRepository(BlockHeaderEntity) private readonly repository: Repository<BlockHeaderEntity>) {
    super(repository.target, repository.manager, repository.queryRunner);
  }
}
