import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';
import { CustomChainEntity } from './custom-chain.entity';

@Entity()
export class CommonEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column(() => CustomChainEntity)
  customChain: CustomChainEntity;

  @Column({
    type: 'enum',
    enum: ['goerli', 'kovan', 'mainnet', 'rinkeby', 'ropsten', 'sepolia'],
  })
  baseChain: string;

  @Column({
    type: 'enum',
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
