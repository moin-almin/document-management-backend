import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../role/role.entity';

export const Roles = (...roles: RoleEnum[]) => SetMetadata('roles', roles);
