import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaClient } from '@prisma/client';
import { user_role } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;
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
      password: 'password',
      firstname: 'firstname',
      lastname: 'lastname',
      role: user_role.STUDENT,
      classGroupId: 10,
    };
    await prisma.user.deleteMany();

    testUser.email = `test${Date.now()}@example.com`;
    const createdUser = await prisma.user.create({
      data: testUser,
    });
    testUserId = createdUser.id;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();
    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    await prisma.$disconnect();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('return a user if a valid id is provided', async () => {
      const { id, ...user } = await service.findOne({ email: testUser.email });
      expect(user).toEqual(testUser);
    });
  });

  describe('findAll', () => {
    it('return an array of users', async () => {
      const users = await service.findAll({});
      expect(users.map(({ id, ...user }) => user)).toEqual([testUser]);
    });
  });

  describe('findOneByEmail', () => {
    it('return a user if a valid email is provided', async () => {
      const { id, ...user } = await service.findOneByEmail(testUser.email);
      expect(user).toEqual(testUser);
    });
  });

  describe('create', () => {
    it('create a new user', async () => {
      const newUser: CreateUserDto = {
        email: `new${Date.now()}@example.com`,
        password: 'newpassword',
        firstname: 'newfirstname',
        lastname: 'newlastname',
        role: user_role.STUDENT,
        classGroupId: 11,
      };
      const { id, ...user } = await service.create(newUser);
      expect(user).toEqual(newUser);
    });
  });

  describe('delete', () => {
    it('delete an existing user', async () => {
      const { id, ...deletedUser } = await service.delete({ email: testUser.email });
      expect(deletedUser).toEqual(testUser);
    });
  });

  describe('update', () => {
    it('update a user', async () => {
      const data: UpdateUserDto = {
        email: `updated${Date.now()}@example.com`,
        password: 'updatedpassword',
        firstname: 'updatedfirstname',
        lastname: 'updatedlastname',
        role: user_role.STUDENT,
      };
      const { id, ...user } = await service.update({
        where: { id: testUserId },
        data: { ...data, email: testUser.email },
      });
      expect(user).toEqual({ ...testUser, ...data, email: testUser.email });
    });
  });

  describe('updateClassGroup', () => {
    it('update the class of a user', async () => {
      const newClassGroupId = 12;
      const { id, ...user } = await service.updateClassGroup(testUserId, newClassGroupId);
      expect(user).toEqual({ ...testUser, classGroupId: newClassGroupId });
    });
  });
});
