import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({}),
            findOneByEmail: jest.fn().mockResolvedValue({}),
            findAll: jest.fn().mockResolvedValue([]),
            create: jest.fn().mockResolvedValue({}),
            delete: jest.fn().mockResolvedValue({}),
            update: jest.fn().mockResolvedValue({}),
            updateClassGroup: jest.fn().mockResolvedValue({}),
          },
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        email: 'test@example.com',
        password: 'password',
        firstname: 'Test',
        lastname: 'User',
        role: 'STUDENT',
      };
      await controller.create(createUserDto);
      expect(service.create).toHaveBeenCalledWith(createUserDto);
    });
  });
  describe('findAll', () => {
    it('should return an array of users', async () => {
      await controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });
  describe('findOne', () => {
    it('should return a user', async () => {
      const userId = '1';
      await controller.findOne(userId);
      expect(service.findOne).toHaveBeenCalledWith({ id: 1 });
    });
  });
  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        email: 'updated@example.com',
        password: 'updatedpassword',
        firstname: 'Updated',
        lastname: 'User',
        role: 'STUDENT',
      };
      const userId = '1';
      await controller.update(userId, updateUserDto);
      expect(service.update).toHaveBeenCalledWith({
        where: { id: Number(userId) },
        data: updateUserDto,
      });
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      const userId = '1';
      await controller.delete(userId);
      expect(service.delete).toHaveBeenCalledWith({ id: Number(userId) });
    });
  });

  describe('updateClassGroup', () => {
    it('should update the class group of a user', async () => {
      const userId = '1';
      const classGroupId = '1';
      await controller.updateClassGroup(userId, classGroupId);
      expect(service.updateClassGroup).toHaveBeenCalledWith(
        Number(userId),
        Number(classGroupId),
      );
    });
  });
});
