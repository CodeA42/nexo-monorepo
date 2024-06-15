import { Module } from '@nestjs/common';
import { WatcherService } from './watcher.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WatcherController } from './watcher.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilterEntity } from './entities/filter.entity';
import { BlockHeaderEntity } from './entities/block-header.entity';
import { BlockHeaderRepository } from './repositories/block-header.repository';
import { FilterRepository } from './repositories/filter.repository';

@Module({
  imports: [HttpModule, ConfigModule, TypeOrmModule.forFeature([FilterEntity, BlockHeaderEntity])],
  controllers: [WatcherController],
  providers: [WatcherService, BlockHeaderRepository, FilterRepository],
  exports: [WatcherService],
})
export class WatcherModule {}
