import { Entity, Column, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class AccessListEntity {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  address: string;

  @Column('simple-array')
  storageKeys: string[];
}
