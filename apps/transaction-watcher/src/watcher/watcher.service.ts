import { BadRequestException, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NexoTransactionWatcherConfiguration } from '@nexo-monorepo/nexo-transaction-watcher-api';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import { BlockHeaders, blockHeadersSimplifiedSaveSchema } from '@nexo-monorepo/ethereum-shared';
import { BlockHeadersSimplifiedSaveDto } from '@nexo-monorepo/ethereum-api';
import { IdDto } from '@nexo-monorepo/api';
import { isEmptyObject } from '@nexo-monorepo/shared';
import { BlockHeaderRepository } from './repositories/block-header.repository';
import { FilterRepository } from './repositories/filter.repository';
import { FilterEntity } from './entities/filter.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class WatcherService implements OnModuleInit {
  private INFURA_WSS_NETWORK: string;
  private INFURA_API_KEY: string;

  private INFURA_WSS_URL: string;

  private web3: Web3<RegisteredSubscription>;
  private readonly logger = new Logger(WatcherService.name);

  constructor(
    private readonly configService: ConfigService<NexoTransactionWatcherConfiguration>,
    private readonly blockHeaderRepository: BlockHeaderRepository,
    private readonly filterRepository: FilterRepository,
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

    subscription.on('data', async (blockHeader) => {
      const block: BlockHeaders = await this.web3.eth.getBlock(blockHeader.hash, true);
      if (block) {
        const result = blockHeadersSimplifiedSaveSchema.safeParse(block);
        if (result.success) {
          const saved = await this.blockHeaderRepository.save(result.data);
          this.logger.log(`New block, ${saved.id}`);
        } else {
          //If reach this we have our alidation schema setup incorrectly. It needs to be readjusted
          this.logger.error(`Error saving into database, issue with validation schema: ${result.error.message}`);
        }
      }
    });
  }

  async newFilter(newFilter: BlockHeadersSimplifiedSaveDto): Promise<FilterEntity> {
    if (isEmptyObject(newFilter)) {
      //This is just for the demo, since the validation is not fully implemented
      //we just make sure that the objects that are being sent are not empty,
      //when the validation is complete an empty object will not pass the validation
      //courtesy of "No time till deadline, its Friday and we drink in 1 hour Inc."
      throw new BadRequestException('Filter is empty');
    }

    return await this.filterRepository.save(newFilter);
  }

  async deleteFilter(id: IdDto['id']): Promise<void> {
    await this.filterRepository.findOne({ where: { id: new ObjectId(id) } });
  }

  async getFilters(): Promise<FilterEntity[]> {
    return this.filterRepository.find();
  }
}
