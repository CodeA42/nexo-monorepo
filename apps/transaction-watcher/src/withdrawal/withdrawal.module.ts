import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WithdrawalEntity } from './entities/withdrawal.entity';
import { WithdrawalFilterEntity } from './entities/withdrawal-filter.entity';
import { WithdrawalFilterService } from './withdrawal.service';
import { WithdrawalFilterRepository } from './withdrawal-filter.repository';
import { WithdrawalRepository } from './withdrawal.repository';
import { WithdrawalFilterController } from './withdrawal-filter.controller';

@Module({
  imports: [HttpModule, ConfigModule, TypeOrmModule.forFeature([WithdrawalEntity, WithdrawalFilterEntity])],
  controllers: [WithdrawalFilterController],
  providers: [WithdrawalFilterService, WithdrawalRepository, WithdrawalFilterRepository],
  exports: [WithdrawalFilterService, WithdrawalFilterRepository, WithdrawalRepository],
})
export class WithdrawalModule {}
