import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { user_role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;
  let prisma: PrismaClient;
  let testUser: CreateUserDto;
  let testUserId: number;

  beforeEach(async () => {
    prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL_TEST,
        },
      },
    });

    testUser = {
      email: `test${Date.now()}@example.com`,
      password: await bcrypt.hash('bobpassword', await bcrypt.genSalt()),
      firstname: 'firstname',
      lastname: 'lastname',
      role: user_role.STUDENT,
      classGroupId: 55,
    };

    const createdUser = await prisma.user.create({
      data: testUser,
    });
    testUserId = createdUser.id;

    testUser.password = 'bobpassword';

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByEmail: jest.fn().mockImplementation((email) => {
              return email === testUser.email
                ? { id: testUserId, password: testUser.password, ...testUser }
                : null;
            }),
          },
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockImplementation((payload) => {
              return 'test_token';
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
