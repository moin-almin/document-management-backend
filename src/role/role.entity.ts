import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user/user.entity';

export enum RoleEnum {
  Admin = 'Admin',
  Editor = 'Editor',
  Viewer = 'Viewer',
}

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: RoleEnum;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
