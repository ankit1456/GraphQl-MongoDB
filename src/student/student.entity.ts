import { Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('students')
export class Student {
  @ObjectIdColumn()
  _id: string;

  @Column()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;
}
