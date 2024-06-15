import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NexoTransactionWatcherConfiguration } from '@nexo-monorepo/nexo-transaction-watcher-api';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import {
  BlockHeaders,
  TransactionBigIntToStringType,
  WithdrawalBigIntToStringType,
  blockHeadersBigIntToStringSchema,
  transactionBigIntAsStringSchema,
  withdrawalBigIntAsStringSchema,
} from '@nexo-monorepo/ethereum-shared';
import { subsetCheckerMany } from '@nexo-monorepo/shared';
import { TransactionFilterService } from '../transaction/transaction.service';
import { WithdrawalFilterService } from '../withdrawal/withdrawal.service';
import { TransactionRepository } from '../transaction/transaction.repository';
import { WithdrawalRepository } from '../withdrawal/withdrawal.repository';

@Injectable()
export class WatcherService implements OnModuleInit {
  private INFURA_WSS_NETWORK: string;
  private INFURA_API_KEY: string;

  private INFURA_WSS_URL: string;

  private web3: Web3<RegisteredSubscription>;
  private readonly logger = new Logger(WatcherService.name);

  constructor(
    private readonly configService: ConfigService<NexoTransactionWatcherConfiguration>,
    private readonly transactionFilterService: TransactionFilterService,
    private readonly withdrawalFilterService: WithdrawalFilterService,
    private readonly transactionRepository: TransactionRepository,
    private readonly withdrawalRepository: WithdrawalRepository,
  ) {}

  onModuleInit() {
    this.INFURA_WSS_NETWORK =
      this.configService.getOrThrow<NexoTransactionWatcherConfiguration['INFURA_WSS_NETWORK']>('INFURA_WSS_NETWORK');

    this.INFURA_API_KEY =
      this.configService.getOrThrow<NexoTransactionWatcherConfiguration['INFURA_API_KEY']>('INFURA_API_KEY');

    this.INFURA_WSS_URL = `${this.INFURA_WSS_NETWORK}${this.INFURA_API_KEY}`;

    this.web3 = new Web3(new Web3.providers.WebsocketProvider(this.INFURA_WSS_URL));

    this.subscribeToNewBlockHeaders();
  }

  async subscribeToNewBlockHeaders() {
    const subscription = await this.web3.eth.subscribe('newBlockHeaders', (error: unknown) => {
      if (error) throw error;
    });

    this.logger.log(`Listening for data on ${this.INFURA_WSS_NETWORK}{API-KEY}`);
    subscription.on('data', async (blockHeader) => {
      const block: BlockHeaders = await this.web3.eth.getBlock(blockHeader.hash, true);
      if (block) {
        const result = blockHeadersBigIntToStringSchema.safeParse(block);

        if (result.success) {
          this.findAndSaveTransactionIntersections(result.data.transactions);
          this.findAndSaveWithdrawalIntersections(result.data.withdrawals);
        } else {
          //If reach this we have our alidation schema setup incorrectly. It needs to be readjusted
          this.logger.error(`Error saving into database, issue with validation schema: ${result.error.message}`);
        }
      }
    });
  }

  async findAndSaveTransactionIntersections(transactions?: TransactionBigIntToStringType[] | string[]): Promise<void> {
    if (!transactions) return; // Will be removed when a definitive type for transactions is written

    const parsedTransactions = transactionBigIntAsStringSchema.array().safeParse(transactions); // the string[] case will not be handleded for now

    if (!parsedTransactions.data) return;

    const filters = await this.transactionFilterService.getFilters();

    parsedTransactions.data.forEach(async (transaction) => {
      const subsets = subsetCheckerMany(transaction, filters);

      if (subsets.length !== 0) {
        const saved = await this.transactionRepository.save({ ...transaction, transactionFilters: subsets });
        this.logger.log(`New transaction (${saved.id}) matches (${subsets.length}) filters`);
      }
    });
  }

  async findAndSaveWithdrawalIntersections(withdrawals?: WithdrawalBigIntToStringType[] | string[]): Promise<void> {
    if (!withdrawals) return; // Will be removed when a definitive type for transactions is written
    const parsedWithdrawals = withdrawalBigIntAsStringSchema.array().safeParse(withdrawals); // the string[] case will not be handleded for now

    if (!parsedWithdrawals.data) return;

    const filters = await this.withdrawalFilterService.getFilters();

    parsedWithdrawals.data.forEach(async (withdrawal) => {
      const subsets = subsetCheckerMany(withdrawal, filters);

      if (subsets.length !== 0) {
        const saved = await this.withdrawalRepository.save({ ...withdrawal, withdrawalFilters: subsets });
        this.logger.log(`New withdrawal (${saved.id}) matches (${subsets.length}) filters`);
      }
    });
  }
}
