import { Entity, Column, ObjectIdColumn, ObjectId, ManyToMany } from 'typeorm';
import { WithdrawalEntity } from './withdrawal.entity';

@Entity()
export class WithdrawalFilterEntity {
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

  @ManyToMany(() => WithdrawalEntity, (withdrawalEntity) => withdrawalEntity.withdrawalFilters)
  withdrawals: WithdrawalEntity[];
}
