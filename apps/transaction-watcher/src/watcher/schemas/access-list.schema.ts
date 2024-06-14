import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class AccessList {
  @Prop()
  address: string;

  @Prop()
  storageKeys: string[];
}

export const AccessListSchema = SchemaFactory.createForClass(AccessList);
