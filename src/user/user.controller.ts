import {
  Controller,
  Get,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.gaurd';
import { RoleEnum } from '../role/role.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('User Management')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'List all users (Admin-only)' })
  @Roles(RoleEnum.Admin) // Admin-only
  async listUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.userService.listUsers(page, limit);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user (Admin-only)' })
  @Roles(RoleEnum.Admin) // Admin-only
  async deleteUser(@Param('id') id: number) {
    return this.userService.deleteUser(id);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update user role (Admin-only)' })
  @Roles(RoleEnum.Admin) // Admin-only
  async updateUserRole(@Param('id') id: number, @Body('role') role: RoleEnum) {
    return this.userService.updateUserRole(id, role);
  }
}
