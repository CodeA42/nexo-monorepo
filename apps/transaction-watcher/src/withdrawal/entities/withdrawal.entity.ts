import { Entity, Column, ObjectIdColumn, ObjectId, ManyToMany } from 'typeorm';
import { WithdrawalFilterEntity } from './withdrawal-filter.entity';

@Entity()
export class WithdrawalEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  address: string;

  @Column()
  amount: string;

  @Column()
  index: string;

  @Column()
  validatorIndex: string;

  @ManyToMany(() => WithdrawalFilterEntity, (withDrawalfilterEntity) => withDrawalfilterEntity.withdrawals)
  withdrawalFilters: WithdrawalFilterEntity[];
}
