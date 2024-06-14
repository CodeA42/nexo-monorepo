import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Withdrawal, WithdrawalSchema } from './withdrawal.schema';

@Schema()
export class Filter {
  @Prop()
  parentBeaconBlockRoot: string;

  @Prop()
  blobGasUsed: bigint;

  @Prop()
  excessBlobGas: bigint;

  @Prop()
  parentHash: string;

  @Prop()
  sha3Uncles: string;

  @Prop()
  miner: string;

  @Prop()
  stateRoot: string;

  @Prop()
  transactionsRoot: string;

  @Prop()
  receiptsRoot: string;

  @Prop()
  logsBloom: string;

  @Prop()
  difficulty: bigint;

  @Prop()
  number: bigint;

  @Prop()
  gasLimit: bigint;

  @Prop()
  gasUsed: bigint;

  @Prop()
  timestamp: bigint;

  @Prop()
  extraData: string;

  @Prop()
  mixHash: string;

  @Prop()
  nonce: bigint;

  @Prop()
  totalDifficulty: bigint;

  @Prop()
  baseFeePerGas: bigint;

  @Prop()
  size: bigint;

  @Prop({
    type: [mongoose.Schema.Types.Mixed],
    validate: {
      validator: function (value: unknown[]) {
        return value.every((v) => typeof v === 'string' || typeof v === 'object');
      },
      message: 'Transactions must be either strings or transaction objects',
    },
  })
  transactions: unknown[];

  @Prop()
  uncles: string[];

  @Prop()
  hash: string;

  @Prop({ type: [WithdrawalSchema] })
  withdrawals: Withdrawal[];

  @Prop()
  withdrawalsRoot: string;
}

export const FilterSchema = SchemaFactory.createForClass(Filter);
