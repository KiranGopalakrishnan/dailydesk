import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('Users')
export class UserEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  status: 'active';
}
