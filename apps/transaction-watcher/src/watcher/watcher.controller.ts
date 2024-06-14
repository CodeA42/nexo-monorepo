import { Controller, Put, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WatcherService } from './watcher.service';

@ApiTags('Watcher')
@Controller('watcher')
@UsePipes()
export class EntitlementController {
  constructor(private readonly watcherService: WatcherService) {}

  @Put('/update-filters')
  @ApiOperation({ summary: 'Returns ok when the filters are updated' })
  @ApiResponse({ status: 200 })
  updateFilters(): Promise<void> {
    return this.watcherService.updateFilters();
  }
}
