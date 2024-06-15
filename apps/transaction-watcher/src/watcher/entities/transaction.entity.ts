import { Entity, Column, ObjectIdColumn, ObjectId, OneToOne, JoinColumn } from 'typeorm';
import { CommonEntity } from './common.entity';
import { AccessListEntity } from './access-list.entity';

@Entity()
export class TransactionEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  blockHash: string;

  @Column('bigint')
  blockNumber: bigint;

  @Column()
  from: string;

  @Column()
  hash: string;

  @Column()
  transactionIndex: string;

  @Column()
  to: string;

  @Column('bigint')
  value: bigint;

  @Column(() => AccessListEntity)
  accessList: AccessListEntity[];

  @OneToOne(() => CommonEntity, { cascade: true })
  @JoinColumn()
  common: CommonEntity;

  @Column('bigint')
  gas: bigint;

  @Column('bigint')
  gasPrice: bigint;

  @Column('bigint')
  type: bigint;

  @Column('bigint')
  maxFeePerGas: bigint;

  @Column('bigint')
  maxPriorityFeePerGas: bigint;

  @Column()
  data: string;

  @Column()
  input: string;

  @Column('bigint')
  nonce: bigint;

  @Column('int')
  chain: number;

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

  @Column('bigint')
  chainId: bigint;

  @Column('int')
  networkId: number;

  @Column('bigint')
  gasLimit: bigint;

  @Column('int')
  yParity: number;

  @Column('bigint')
  v: bigint;

  @Column()
  r: string;

  @Column()
  s: string;
}
