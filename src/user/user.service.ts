import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role, RoleEnum } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async listUsers(page: number, limit: number) {
    const [users, total] = await this.userRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      relations: ['role'], // Ensure role is loaded
    });

    return {
      data: users,
      total,
      page,
      limit,
    };
  }

  async deleteUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.delete(id);

    return { message: `User with ID ${id} has been deleted` };
  }

  async updateUserRole(id: number, roleName: RoleEnum) {
    // Find the user
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['role'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    // Find the new role
    const newRole = await this.roleRepository.findOne({
      where: { name: roleName },
    });

    if (!newRole) {
      throw new HttpException('Role not found', HttpStatus.NOT_FOUND);
    }

    // Update the user's role
    user.role = newRole;
    await this.userRepository.save(user);

    return {
      message: `User with ID ${id} role updated to ${roleName}`,
      user: user,
    };
  }
}
