import { Module } from '@nestjs/common';
import { WatcherService } from './watcher.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BlockHeader, BlockHeaderSchema } from './schemas/block-header.schema';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    MongooseModule.forFeature([{ name: BlockHeader.name, schema: BlockHeaderSchema }]),
  ],
  controllers: [],
  providers: [WatcherService],
  exports: [WatcherService],
})
export class WatcherModule {}
