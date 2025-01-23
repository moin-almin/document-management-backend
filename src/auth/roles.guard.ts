import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RoleEnum } from '../role/role.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<RoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    console.log('Required Roles:', requiredRoles); // Debug required roles

    const { user } = context.switchToHttp().getRequest();
    console.log('User Info:', user); // Debug user from request

    if (!requiredRoles) {
      return true; // If no roles are required, grant access
    }

    const hasRole = requiredRoles.some((role) => user?.role === role);
    console.log('Has Required Role:', hasRole); // Debug role matching result

    return hasRole;
  }
}
