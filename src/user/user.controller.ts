import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { RoleEnum } from '../role/role.entity';

@Controller('users')
@UseGuards(RolesGuard) // Attach the RolesGuard to this controller
export class UserController {
  @Get('all')
  @Roles(RoleEnum.Admin) // Only Admins can access this route
  getAllUsers() {
    return 'List of all users';
  }
}
