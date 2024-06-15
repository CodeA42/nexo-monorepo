import { Entity, Column, ObjectIdColumn, ObjectId, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { CommonEntity } from './common.entity';
import { AccessListEntity } from './access-list.entity';
import { TransactionFilterEntity } from './transation-filter.entity';

@Entity()
export class TransactionEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  blockHash: string;

  @Column()
  blockNumber: string;

  @Column()
  from: string;

  @Column()
  hash: string;

  @Column()
  transactionIndex: string;

  @Column()
  to: string;

  @Column()
  value: string;

  @Column(() => AccessListEntity)
  accessList: AccessListEntity[];

  @OneToOne(() => CommonEntity, { cascade: true })
  @JoinColumn()
  common: CommonEntity;

  @Column()
  gas: string;

  @Column()
  gasPrice: string;

  @Column()
  type: string;

  @Column()
  maxFeePerGas: string;

  @Column()
  maxPriorityFeePerGas: string;

  @Column()
  data: string;

  @Column()
  input: string;

  @Column()
  nonce: string;

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

  @Column()
  chainId: string;

  @Column('int')
  networkId: number;

  @Column()
  gasLimit: string;

  @Column('int')
  yParity: number;

  @Column()
  v: string;

  @Column()
  r: string;

  @Column()
  s: string;

  @ManyToMany(() => TransactionFilterEntity, (transactionFilterEntity) => transactionFilterEntity.transactions)
  transactionFilters: TransactionFilterEntity[];
}
