import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NexoTransactionWatcherConfiguration } from '@nexo-monorepo/nexo-transaction-watcher-api';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import { BlockHeaders } from '@nexo-monorepo/ethereum-shared';
import { InjectModel } from '@nestjs/mongoose';
import { BlockHeader } from './schemas/block-header.schema';
import { Model } from 'mongoose';
import { BlockHeadersSimplifiedDto } from '@nexo-monorepo/ethereum-api';
import { Filter } from './schemas/last-filter.schema';
import { MongooseSaved } from '../util/mongoose-saved';
import { isMongooseCastError } from '../util/is-mongoose-cast-error';
import { IdDto } from '@nexo-monorepo/api';
import { isEmptyObject } from '@nexo-monorepo/shared';

@Injectable()
export class WatcherService implements OnModuleInit {
  private INFURA_WSS_NETWORK: string;
  private INFURA_API_KEY: string;

  private INFURA_WSS_URL: string;

  private web3: Web3<RegisteredSubscription>;
  constructor(
    private readonly configService: ConfigService<NexoTransactionWatcherConfiguration>,
    @InjectModel(BlockHeader.name) private readonly blockHeaderModel: Model<BlockHeader>,
    @InjectModel(Filter.name) private readonly filterModel: Model<Filter>,
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
        const newBlockHeader = new this.blockHeaderModel(block);
        console.log(newBlockHeader.save());
      }
    });
  }

  async newFilter(newFilter: BlockHeadersSimplifiedDto): Promise<string> {
    if (isEmptyObject(newFilter)) {
      //This is just for the demo, since the validation is not fully implemented
      //we just make sure that the objects that are being sent are not empty,
      //when the validation is complete an empty object will not pass the validation
      //courtesy of "No time till deadline, its Friday and we drink in 1 hour Inc."
      throw new BadRequestException('Filter is empty');
    }

    const newBlockHeaderFilter = new this.filterModel(newFilter);
    const saved: MongooseSaved<Filter> = await newBlockHeaderFilter.save();

    const id = saved._id.toString();
    return id;
  }

  async deleteFilter(id: IdDto['id']): Promise<void> {
    try {
      await this.filterModel.findByIdAndDelete(id);
    } catch (error: unknown) {
      if (isMongooseCastError(error)) {
        throw new BadRequestException('Id in improper format'); //Again no validation, this will not happen when validation is fully implemented
      }

      throw error;
    }
  }
}
