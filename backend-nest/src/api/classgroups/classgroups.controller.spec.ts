import { Test, TestingModule } from '@nestjs/testing';
import { ClassgroupsController } from './classgroups.controller';
import { ClassgroupsService } from './classgroups.service';
import { JwtService } from '@nestjs/jwt';

describe('ClassgroupsController', () => {
  let controller: ClassgroupsController;
  let service: ClassgroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassgroupsController],
      providers: [
        JwtService,
        {
          provide: ClassgroupsService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ClassgroupsController>(ClassgroupsController);
    service = module.get<ClassgroupsService>(ClassgroupsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('create a classgroup', () => {
      const dto = {
        file: 'file1.xml',
        name: 'file1',
      };
      controller.create(dto);
      expect(service.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('return all classgroups', () => {
      controller.findAll();
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('return one classgroup', () => {
      controller.findOne(1);
      expect(service.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('delete', () => {
    it('delete a classgroup', () => {
      controller.delete(1);
      expect(service.delete).toHaveBeenCalledWith(1);
    });
  });
});
