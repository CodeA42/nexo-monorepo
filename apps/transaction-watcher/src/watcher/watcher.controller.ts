import { Body, Controller, Delete, HttpCode, Post, Query, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BlockHeadersSimplifiedDto } from '@nexo-monorepo/ethereum-api';
import { WatcherService } from './watcher.service';
import { IdDto } from '@nexo-monorepo/api';
import { ZodValidationPipe } from 'nestjs-zod';
import { FilterEntity } from './entities/filter.entity';

@ApiTags('Watcher')
@Controller('watcher')
@UsePipes()
@UsePipes(ZodValidationPipe)
export class WatcherController {
  constructor(private readonly watcherService: WatcherService) {}

  @Post('/filter')
  @ApiOperation({ summary: 'Returns the created filter' })
  @ApiResponse({ status: 201 })
  async newFilter(@Body() newFilter: BlockHeadersSimplifiedDto): Promise<FilterEntity> {
    return await this.watcherService.newFilter(newFilter);
  }

  @Delete('/filter')
  @ApiOperation({ summary: 'Deletes a filter' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  deleteFilter(@Query() query: IdDto): Promise<void> {
    return this.watcherService.deleteFilter(query.id);
  }
}
