import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { RoleEnum } from '../role/role.entity';

describe('AuthService', () => {
  let authService: AuthService;
  let userRepository: Repository<User>;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => 'mockToken'),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should register a new user', async () => {
    const mockUser = { username: 'testuser', password: 'hashedPassword' };
    jest.spyOn(userRepository, 'create').mockReturnValue(mockUser as User);
    jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser as User);

    const result = await authService.register('testuser', 'password');
    expect(result).toEqual(mockUser);
    expect(bcrypt.hash).toHaveBeenCalledWith('password', 10);
  });

  it('should log in a user and return a JWT token', async () => {
    const mockUser = {
      id: 1,
      username: 'testuser',
      password: 'hashedPassword',
      role: RoleEnum.Admin,
    };
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser as User);
    jest
      .spyOn(bcrypt, 'compare')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .mockImplementation(async (data: string, encrypted: string) => true);

    const result = await authService.login('testuser', 'password');
    expect(result).toEqual({ accessToken: 'mockToken' });
    expect(jwtService.sign).toHaveBeenCalledWith(
      {
        username: 'testuser',
        sub: 1,
        role: RoleEnum.Admin,
      },
      { expiresIn: '1h' },
    );
  });

  it('should throw an error for invalid login credentials', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(null);

    await expect(authService.login('invaliduser', 'password')).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should log out a user successfully', async () => {
    const result = await authService.logout();
    expect(result).toEqual({ message: 'Logout successful' });
  });
});
