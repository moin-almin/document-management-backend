import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';

describe('RolesGuard', () => {
  it('should be defined', () => {
    const reflector = new Reflector(); // Mock Reflector dependency
    const rolesGuard = new RolesGuard(reflector);
    expect(rolesGuard).toBeDefined();
  });
});
