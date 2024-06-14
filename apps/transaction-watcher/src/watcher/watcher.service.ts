import { HttpService } from '@nestjs/axios';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NexoTransactionWatcherConfiguration } from '@nexo-monorepo/nexo-transaction-watcher-api';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';
import { BlockHeaders } from '@nexo-monorepo/ethereum-shared';
import { InjectModel } from '@nestjs/mongoose';
import { BlockHeader } from './schemas/block-header.schema';
import { Model } from 'mongoose';

@Injectable()
export class WatcherService implements OnModuleInit {
  private INFURA_REQUEST_NETWORK: string;
  private INFURA_WSS_NETWORK: string;
  private INFURA_API_KEY: string;

  private INFURA_REQUEST_URL: string;
  private INFURA_WSS_URL: string;

  private web3: Web3<RegisteredSubscription>;
  constructor(
    private readonly configService: ConfigService<NexoTransactionWatcherConfiguration>,
    private readonly httpService: HttpService,
    @InjectModel(BlockHeader.name) private readonly blockHeaderModel: Model<BlockHeader>,
  ) {}

  onModuleInit() {
    this.INFURA_REQUEST_NETWORK =
      this.configService.getOrThrow<NexoTransactionWatcherConfiguration['INFURA_REQUEST_NETWORK']>(
        'INFURA_REQUEST_NETWORK',
      );

    this.INFURA_WSS_NETWORK =
      this.configService.getOrThrow<NexoTransactionWatcherConfiguration['INFURA_WSS_NETWORK']>('INFURA_WSS_NETWORK');

    this.INFURA_API_KEY =
      this.configService.getOrThrow<NexoTransactionWatcherConfiguration['INFURA_API_KEY']>('INFURA_API_KEY');

    this.INFURA_REQUEST_URL = `${this.INFURA_REQUEST_NETWORK}${this.INFURA_API_KEY}`;
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
        console.log(block);
        const newBlockHeader = new this.blockHeaderModel(block);
        console.log(newBlockHeader.save());
      }
    });
  }
}
