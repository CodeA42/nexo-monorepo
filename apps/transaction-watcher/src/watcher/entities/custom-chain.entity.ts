import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class CustomChainEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column('bigint')
  networkId: bigint;

  @Column('bigint')
  chainId: bigint;
}
