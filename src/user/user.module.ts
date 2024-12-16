import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Role } from '../role/role.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])], // Add Role here
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if it is used in other modules
})
export class UserModule {}
