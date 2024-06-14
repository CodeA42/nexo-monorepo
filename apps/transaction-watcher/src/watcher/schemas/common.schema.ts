import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CustomChain, CustomChainSchema } from './custom-chain.schema';

@Schema()
export class Common {
  @Prop({
    type: CustomChainSchema,
  })
  customChain: CustomChain;

  @Prop({
    enum: ['goerli', 'kovan', 'mainnet', 'rinkeby', 'ropsten', 'sepolia'],
  })
  baseChain: string;

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
}

export const CommonSchema = SchemaFactory.createForClass(Common);
