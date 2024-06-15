import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

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
}
