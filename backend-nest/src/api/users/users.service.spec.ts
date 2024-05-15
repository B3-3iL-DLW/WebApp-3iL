import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { user_role } from '@prisma/client';

function createNewUser(): CreateUserDto {
  return {
    email: `create${Math.random()}@example.com`,
    password: 'createpassword',
    firstname: 'createfirstname',
    lastname: 'cretelastname',
    role: user_role.STUDENT,
    classGroupId: 1,
  };
}

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findOne', () => {
  //   it('return a user if a valid id is provided', async () => {
  //     const userId = 11;
  //     const user = await service.findOne({ id: userId });
  //     expect(user).not.toBeNull();
  //     expect(user).not.toBeUndefined();
  //     expect(user.email).not.toBeNull();
  //     expect(user.email).not.toBeUndefined();
  //     expect(user.password).not.toBeNull();
  //     expect(user.password).not.toBeUndefined();
  //     expect(user.firstname).not.toBeNull();
  //     expect(user.firstname).not.toBeUndefined();
  //     expect(user.lastname).not.toBeNull();
  //     expect(user.lastname).not.toBeUndefined();
  //     expect(user.role).not.toBeNull();
  //     expect(user.role).not.toBeUndefined();
  //     expect(user.classGroupId).not.toBeNull();
  //     expect(user.classGroupId).not.toBeUndefined();
  //   });
  // });

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

  describe('create', () => {
    it('create a new user', async () => {
      const newUser = createNewUser();
      const user = await service.create(newUser);
      expect(user).not.toBeNull();
      expect(user).not.toBeUndefined();
      expect(user.email).toBe(newUser.email);
      expect(user.password).toBe(newUser.password);
      expect(user.firstname).toBe(newUser.firstname);
      expect(user.lastname).toBe(newUser.lastname);
      expect(user.role).toBe(newUser.role);
    });
  });

  describe('update', () => {
    let existingUser;

    beforeEach(async () => {
      const newUser = createNewUser();
      existingUser = await service.create(newUser);
    });

    it('update a user', async () => {
      const data: UpdateUserDto = {
        email: existingUser.email, // Use the existing user's email
        password: 'updatedpassword',
        firstname: 'updatedfirstname',
        lastname: 'updatedlastname',
        role: user_role.STUDENT,
      };
      const user = await service.update({
        where: { id: existingUser.id },
        data,
      });
      expect(user).not.toBeNull();
      expect(user).toHaveProperty('email', data.email);
      expect(user).toHaveProperty('password', data.password);
      expect(user).toHaveProperty('firstname', data.firstname);
      expect(user).toHaveProperty('lastname', data.lastname);
      expect(user).toHaveProperty('role', data.role);
    });
  });

  describe('delete', () => {
    let existingUser;

    beforeEach(async () => {
      const newUser = createNewUser();
      existingUser = await service.create(newUser);
    });

    it('delete an existing user', async () => {
      const deletedUser = await service.delete({ id: existingUser.id });
      expect(deletedUser).toEqual(existingUser);
    });
  });

  describe('updateClassGroup', () => {
    it('update the class of a user', async () => {
      const userId = 11;
      const classGroupId = 11;
      const user = await service.updateClassGroup(userId, classGroupId);
      expect(user).not.toBeNull();
      expect(user).not.toBeUndefined();
      expect(user.classGroupId).toBe(classGroupId);
    });
  });
});
