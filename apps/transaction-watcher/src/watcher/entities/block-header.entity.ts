import { Entity, Column, ObjectIdColumn, ObjectId, ManyToMany } from 'typeorm';
import { WithdrawalEntity } from './withdrawal.entity';
import { TransactionEntity } from './transaction.entity';
import { TransactionsValidator } from './validators/transactions.validator';
import { Validate } from 'class-validator';
import { FilterEntity } from './filter.entity';

@Entity()
export class BlockHeaderEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  parentBeaconBlockRoot: string;

  @Column()
  blobGasUsed: string;

  @Column()
  excessBlobGas: string;

  @Column()
  parentHash: string;

  @Column()
  sha3Uncles: string;

  @Column()
  miner: string;

  @Column()
  stateRoot: string;

  @Column()
  transactionsRoot: string;

  @Column()
  receiptsRoot: string;

  @Column()
  logsBloom: string;

  @Column()
  difficulty: string;

  @Column()
  number: string;

  @Column()
  gasLimit: string;

  @Column()
  gasUsed: string;

  @Column()
  timestamp: string;

  @Column()
  extraData: string;

  @Column()
  mixHash: string;

  @Column()
  nonce: string;

  @Column()
  totalDifficulty: string;

  @Column()
  baseFeePerGas: string;

  @Column()
  size: string;

  @Validate(TransactionsValidator)
  @Column('simple-json', {
    transformer: {
      to(values: string[] | TransactionEntity[]): string[] {
        //We validate the arrays in the Validator above no need to check every element again
        if (values[0] instanceof TransactionEntity) return values.map((entry) => JSON.stringify(entry));
        return values as string[]; //In the previous step we return the Transaction entitites stringified
      },
      from(value: string[]): unknown[] {
        return value.map((v) => {
          try {
            return JSON.parse(v);
          } catch {
            return v;
          }
        });
      },
    },
    nullable: true,
  })
  transactions: (string | TransactionEntity)[];

  @Column('simple-array')
  uncles: string[];

  @Column()
  hash: string;

  @Column(() => WithdrawalEntity)
  withdrawals: WithdrawalEntity[];

  @Column()
  withdrawalsRoot: string;

  @ManyToMany(() => FilterEntity, (filter) => filter.blockHeaders)
  filters: FilterEntity[];
}
