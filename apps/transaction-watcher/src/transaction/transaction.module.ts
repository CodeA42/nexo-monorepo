import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionFilterRepository } from './transaction-filter.repository';
import { TransactionRepository } from './transaction.repository';
import { TransactionFilterService } from './transaction.service';
import { TransactionFilterController } from './transaction-filter.controller';
import { TransactionEntity } from './entities/transaction.entity';
import { TransactionFilterEntity } from './entities/transation-filter.entity';

@Module({
  imports: [HttpModule, ConfigModule, TypeOrmModule.forFeature([TransactionEntity, TransactionFilterEntity])],
  controllers: [TransactionFilterController],
  providers: [TransactionFilterService, TransactionRepository, TransactionFilterRepository],
  exports: [TransactionFilterService, TransactionFilterRepository, TransactionRepository],
})
export class TransactionModule {}
