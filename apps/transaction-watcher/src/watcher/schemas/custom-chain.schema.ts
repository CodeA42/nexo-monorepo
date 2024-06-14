import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class CustomChain {
  @Prop()
  name: string;

  @Prop()
  networkId: bigint;

  @Prop()
  chainId: bigint;
}

export const CustomChainSchema = SchemaFactory.createForClass(CustomChain);
