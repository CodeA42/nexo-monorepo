import { Body, Controller, Delete, HttpCode, Post, Query, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { WithdrawalBigIntAsStringDto } from '@nexo-monorepo/ethereum-api';
import { IdDto } from '@nexo-monorepo/api';
import { ZodValidationPipe } from 'nestjs-zod';
import { WithdrawalFilterService } from './withdrawal.service';
import { WithdrawalFilterEntity } from './entities/withdrawal-filter.entity';

@ApiTags('Withdrawal filter')
@Controller('/withdrawal')
@UsePipes()
@UsePipes(ZodValidationPipe)
export class WithdrawalFilterController {
  constructor(private readonly withdrawalService: WithdrawalFilterService) {}

  @Post('/filter')
  @ApiOperation({ summary: 'Returns the created filter' })
  @ApiResponse({ status: 201 })
  async newFilter(@Body() newFilter: WithdrawalBigIntAsStringDto): Promise<WithdrawalFilterEntity> {
    return await this.withdrawalService.newFilter(newFilter);
  }

  @Delete('/filter')
  @ApiOperation({ summary: 'Deletes a filter' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  deleteFilter(@Query() query: IdDto): Promise<void> {
    return this.withdrawalService.deleteFilter(query.id);
  }
}
