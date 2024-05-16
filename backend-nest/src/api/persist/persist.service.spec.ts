import { Test, TestingModule } from '@nestjs/testing';
import { PersistService } from './persist.service';
import { ClassgroupsService } from '../classgroups/classgroups.service';
import { ApiService } from '../api.service';
import { TimetableService } from '../timetable/timetable.service';

describe('PersistService', () => {
  let service: PersistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PersistService,
        {
          provide: ApiService,
          useValue: {
            getClasses: jest.fn(),
            getTimetableByClassFile: jest.fn(),
            // add other methods as needed
          },
        },
        {
          provide: ClassgroupsService,
          useValue: {
            upsert: jest.fn(),
            findAll: jest.fn(),
            // add other methods as needed
          },
        },
        {
          provide: TimetableService,
          useValue: {
            upsert: jest.fn(),
            // add other methods as needed
          },
        },
      ],
    }).compile();

    service = module.get<PersistService>(PersistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
