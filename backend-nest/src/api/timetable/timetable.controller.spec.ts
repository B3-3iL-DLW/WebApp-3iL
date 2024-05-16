import { Test, TestingModule } from '@nestjs/testing';
import { TimetableService } from './timetable.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('TimetableService', () => {
  let service: TimetableService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimetableService,
        {
          provide: PrismaService,
          useValue: {
            timetable: {
              findMany: jest.fn(),
              upsert: jest.fn(),
              // add other methods as needed
            },
            // add other Prisma models as needed
          },
        },
      ],
    }).compile();

    service = module.get<TimetableService>(TimetableService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
