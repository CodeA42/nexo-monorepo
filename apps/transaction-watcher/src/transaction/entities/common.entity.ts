import { Entity, Column, ObjectIdColumn, ObjectId, OneToOne, JoinColumn } from 'typeorm';
import { CustomChainEntity } from './custom-chain.entity';

@Entity()
export class CommonEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @OneToOne(() => CustomChainEntity, { cascade: true })
  @JoinColumn()
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
