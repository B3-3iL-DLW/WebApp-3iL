import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from '@prisma/client';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('return a user if a valid id is provided', async () => {
      const userId = 1;
      const user = await service.findOne({ id: userId });
      expect(user).not.toBeNull();
      expect(user).not.toBeUndefined();
      expect(user.email).not.toBeNull();
      expect(user.email).not.toBeUndefined();
      expect(user.password).not.toBeNull();
      expect(user.password).not.toBeUndefined();
      expect(user.firstname).not.toBeNull();
      expect(user.firstname).not.toBeUndefined();
      expect(user.lastname).not.toBeNull();
      expect(user.lastname).not.toBeUndefined();
      expect(user.role).not.toBeNull();
      expect(user.role).not.toBeUndefined();
      expect(user.classGroupId).not.toBeNull();
      expect(user.classGroupId).not.toBeUndefined();
    });
  });

  describe('findAll', () => {
    it('return an array of users', async () => {
      const users = await service.findAll({});
      expect(users).not.toBeNull();
      expect(users).not.toBeUndefined();
      expect(users.length).toBeGreaterThan(0);
      users.forEach((user) => {
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('password');
        expect(user).toHaveProperty('firstname');
        expect(user).toHaveProperty('lastname');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('classGroupId');
      });
    });
  });

  describe('findOneByEmail', () => {
    it('return a user if a valid email is provided', async () => {
      const users = await service.findAll({});
      for (const user of users) {
        const foundUser = await service.findOneByEmail(user.email);
        expect(foundUser).not.toBeNull();
        expect(foundUser).not.toBeUndefined();
        expect(foundUser.email).not.toBeNull();
      }
    });
  });

  /*describe('create', () => {
    it('create a new user', async () => {
      const newUser: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstname: 'Jules',
        lastname: 'ARTAUD',
        role: Role.STUDENT,
      };
      const user = await service.create(newUser);
      expect(user).not.toBeNull();
      expect(user).not.toBeUndefined();
      expect(user.email).toBe(newUser.email);
      expect(user.password).toBe(newUser.password);
      expect(user.firstname).toBe(newUser.firstname);
      expect(user.lastname).toBe(newUser.lastname);
      expect(user.role).toBe(newUser.role);
      expect(user.classGroupId).not.toBeNull();
    });
  });*/

  describe('update', () => {
    it('update a user', async () => {
      const userId = 1;
      const user = await service.findOne({ id: userId });
      const updatedUser = await service.update({

      }
  });

  describe('updateClassGroup', () => {
    it('update the class of a user', async () => {
      const userId = 1;
      const classGroupId = 12;
      const user = await service.updateClassGroup(userId, classGroupId);
      expect(user).not.toBeNull();
      expect(user).not.toBeUndefined();
      expect(user.classGroupId).toBe(classGroupId);
    });
  });
});
