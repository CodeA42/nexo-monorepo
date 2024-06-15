import { Body, Controller, Delete, HttpCode, Post, Query, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionBigIntAsStringDto } from '@nexo-monorepo/ethereum-api';
import { IdDto } from '@nexo-monorepo/api';
import { ZodValidationPipe } from 'nestjs-zod';
import { TransactionFilterService } from './transaction.service';
import { TransactionFilterEntity } from './entities/transation-filter.entity';

@ApiTags('Transaction filter')
@Controller('/transaction')
@UsePipes()
@UsePipes(ZodValidationPipe)
export class TransactionFilterController {
  constructor(private readonly transactionFilterService: TransactionFilterService) {}

  @Post('/filter')
  @ApiOperation({ summary: 'Returns the created filter' })
  @ApiResponse({ status: 201 })
  async newFilter(@Body() newFilter: TransactionBigIntAsStringDto): Promise<TransactionFilterEntity> {
    return await this.transactionFilterService.newFilter(newFilter);
  }

  @Delete('/filter')
  @ApiOperation({ summary: 'Deletes a filter' })
  @ApiResponse({ status: 200 })
  @HttpCode(200)
  deleteFilter(@Query() query: IdDto): Promise<void> {
    return this.transactionFilterService.deleteFilter(query.id);
  }
}
