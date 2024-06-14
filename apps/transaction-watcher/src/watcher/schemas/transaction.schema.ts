import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Common, CommonSchema } from './common.schema';
import { AccessList, AccessListSchema } from './access-list.schema';

@Schema()
export class Transaction {
  @Prop()
  blockHash: string;

  @Prop()
  blockNumber: bigint;

  @Prop()
  from: string;

  @Prop()
  hash: string;

  @Prop()
  transactionIndex: string;

  @Prop()
  to: string;

  @Prop()
  value: bigint;

  @Prop({ type: [{ type: AccessListSchema }] })
  accessList: AccessList[];

  @Prop({ type: CommonSchema })
  common: Common;

  @Prop()
  gas: bigint;

  @Prop()
  gasPrice: bigint;

  @Prop()
  type: bigint;

  @Prop()
  maxFeePerGas: bigint;

  @Prop()
  maxPriorityFeePerGas: bigint;

  @Prop()
  data: string;

  @Prop()
  input: string;

  @Prop()
  nonce: bigint;

  @Prop()
  chain: number;

  @Prop({
    enum: [
      'chainstart',
      'frontier',
      'homestead',
      'dao',
      'tangerineWhistle',
      'spuriousDragon',
      'byzantium',
      'constantinople',
      'petersburg',
      'istanbul',
      'muirGlacier',
      'berlin',
      'london',
      'altair',
      'arrowGlacier',
      'grayGlacier',
      'bellatrix',
      'merge',
      'capella',
      'shanghai',
    ],
  })
  hardfork: string;

  @Prop()
  chainId: bigint;

  @Prop()
  networkId: number;

  @Prop()
  gasLimit: bigint;

  @Prop()
  yParity: number;

  @Prop()
  v: bigint;

  @Prop()
  r: string;

  @Prop()
  s: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
