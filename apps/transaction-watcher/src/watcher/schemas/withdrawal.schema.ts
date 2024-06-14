import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Withdrawal {
  @Prop()
  address: string;

  @Prop()
  amount: bigint;

  @Prop()
  index: bigint;

  @Prop()
  validatorIndex: bigint;
}

export const WithdrawalSchema = SchemaFactory.createForClass(Withdrawal);
