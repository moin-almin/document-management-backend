import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role, RoleEnum } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  role: RoleEnum;
}
