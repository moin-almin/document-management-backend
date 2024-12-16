import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register UserRepository
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService], // Export UserService if it is used in other modules
})
export class UserModule {}
