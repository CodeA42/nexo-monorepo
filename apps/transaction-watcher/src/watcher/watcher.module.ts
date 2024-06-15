import { Module } from '@nestjs/common';
import { WatcherService } from './watcher.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionFilterEntity } from '../transaction/entities/transation-filter.entity';
import { TransactionEntity } from '../transaction/entities/transaction.entity';
import { WithdrawalEntity } from '../withdrawal/entities/withdrawal.entity';
import { WithdrawalFilterEntity } from '../withdrawal/entities/withdrawal-filter.entity';
import { WithdrawalModule } from '../withdrawal/withdrawal.module';
import { TransactionModule } from '../transaction/transaction.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    TypeOrmModule.forFeature([TransactionFilterEntity, TransactionEntity, WithdrawalEntity, WithdrawalFilterEntity]),
    WithdrawalModule,
    TransactionModule,
  ],
  controllers: [],
  providers: [WatcherService],
  exports: [WatcherService],
})
export class WatcherModule {}
