import { Module } from '@nestjs/common';
import { WatcherService } from './watcher.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockHeader, BlockHeaderSchema } from './schemas/block-header.schema';
import { Filter, FilterSchema } from './schemas/last-filter.schema';
import { WatcherController } from './watcher.controller';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([
      { name: BlockHeader.name, schema: BlockHeaderSchema },
      { name: Filter.name, schema: FilterSchema },
    ]),
  ],
  controllers: [WatcherController],
  providers: [WatcherService],
  exports: [WatcherService],
})
export class WatcherModule {}
