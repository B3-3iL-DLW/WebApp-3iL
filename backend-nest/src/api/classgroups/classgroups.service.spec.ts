import { Test, TestingModule } from '@nestjs/testing';
import { ClassgroupsService } from './classgroups.service';

describe('ClassgroupsService', () => {
  let service: ClassgroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClassgroupsService],
    }).compile();

    service = module.get<ClassgroupsService>(ClassgroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
