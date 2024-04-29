import { Test, TestingModule } from '@nestjs/testing';
import { ClassgroupsController } from './classgroups.controller';
import { ClassgroupsService } from './classgroups.service';

describe('ClassgroupsController', () => {
  let controller: ClassgroupsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClassgroupsController],
      providers: [ClassgroupsService],
    }).compile();

    controller = module.get<ClassgroupsController>(ClassgroupsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
