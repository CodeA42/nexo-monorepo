import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class WithdrawalEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  address: string;

  @Column('bigint')
  amount: bigint;

  @Column('bigint')
  index: bigint;

  @Column('bigint')
  validatorIndex: bigint;
}
